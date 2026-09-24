'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { BlogPost, FAQItem } from '@/lib/types';
import { FileText, Sparkles, Plus, Edit3, Trash2, Globe, EyeOff, Save, AlertCircle } from 'lucide-react';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // AI Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiCategory, setAiCategory] = useState('AC Repair');
  const [aiAngle, setAiAngle] = useState('Causes of breakdown, symptoms, troubleshooting, and when to call certified technician in West Bengal');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Post Editor Modal State (for manual create or editing draft)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleTogglePublish = async (post: BlogPost) => {
    const nextStatus = post.status === 'published' ? 'draft' : 'published';
    const updatedPost: BlogPost = {
      ...post,
      status: nextStatus,
      publishedAt: nextStatus === 'published' ? (post.publishedAt || new Date().toISOString().split('T')[0]) : post.publishedAt
    };

    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost)
      });
      if (res.ok) {
        setPosts((prev) => prev.map((p) => (p.id === post.id ? updatedPost : p)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleTriggerAiGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic.trim()) return;

    setIsAiGenerating(true);
    setAiError(null);

    try {
      const res = await fetch('/api/admin/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic.trim(),
          category: aiCategory,
          language: 'en',
          specificAngle: aiAngle
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'AI generation failed. Please check AI Configuration API keys.');
      }

      // Close AI modal and open Editor Modal with the generated draft
      // RULE: AI Generate -> Draft -> Admin review/edit -> Manual Publish. NEVER auto-publish.
      const draft = data.draft;
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        slug: draft.slug,
        title: draft.title,
        titleBn: draft.titleBn,
        content: draft.content,
        contentBn: draft.contentBn,
        excerpt: draft.excerpt,
        excerptBn: draft.excerptBn,
        focusKeyword: draft.focusKeyword,
        secondaryKeywords: draft.secondaryKeywords,
        metaTitle: draft.metaTitle,
        metaDesc: draft.metaDesc,
        ogTitle: draft.ogTitle,
        ogDesc: draft.ogDesc,
        faqs: draft.faqs,
        status: 'draft', // Strictly draft!
        author: 'Chief HVAC Technician',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setIsAiModalOpen(false);
      setEditingPost(newPost);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Generation failed. Configure Gemini or OpenAI key in AI Settings.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPost)
      });
      if (res.ok) {
        setPosts((prev) => {
          const idx = prev.findIndex((p) => p.id === editingPost.id);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = editingPost;
            return copy;
          }
          return [editingPost, ...prev];
        });
        setEditingPost(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '4px' }}>
              Blog Articles & Guides
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Manage published articles, AI draft generation, SEO metadata, and bilingual content
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="btn btn-accent btn-sm"
            >
              <Sparkles size={16} />
              <span>Generate with AI</span>
            </button>

            <button
              onClick={() =>
                setEditingPost({
                  id: `post-${Date.now()}`,
                  slug: `guide-${Date.now()}`,
                  title: '',
                  titleBn: '',
                  content: '',
                  contentBn: '',
                  excerpt: '',
                  excerptBn: '',
                  focusKeyword: '',
                  secondaryKeywords: [],
                  metaTitle: '',
                  metaDesc: '',
                  status: 'draft',
                  author: 'Chief HVAC Technician',
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
                })
              }
              className="btn btn-primary btn-sm"
            >
              <Plus size={16} />
              <span>Write Manual Article</span>
            </button>
          </div>
        </div>

        {/* Posts Table */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Loading articles...</div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
              No blog articles created yet. Click &ldquo;Generate with AI&rdquo; or &ldquo;Write Manual Article&rdquo;.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead style={{ backgroundColor: 'var(--color-bg-warm)', borderBottom: '1px solid var(--color-border)' }}>
                <tr>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Article Title</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>URL Slug</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Focus Keyword</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Status</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                    <td style={{ padding: '14px 16px', maxWidth: '320px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '2px' }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>
                        {p.titleBn}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                      <code>/blog/{p.slug}</code>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '0.8125rem' }}>
                      {p.focusKeyword || '-'}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          backgroundColor: p.status === 'published' ? '#DEF7EC' : '#FEF08A',
                          color: p.status === 'published' ? '#03543F' : '#713F12'
                        }}
                      >
                        {p.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleTogglePublish(p)}
                          className="btn btn-outline btn-sm"
                          title={p.status === 'published' ? 'Unpublish to draft' : 'Publish live'}
                        >
                          {p.status === 'published' ? <EyeOff size={14} /> : <Globe size={14} />}
                        </button>
                        <button
                          onClick={() => setEditingPost({ ...p })}
                          className="btn btn-outline btn-sm"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="btn btn-outline btn-sm"
                          style={{ color: 'var(--color-danger)' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* AI Generator Modal */}
        {isAiModalOpen && (
          <div className="modal-overlay" onClick={() => !isAiGenerating && setIsAiModalOpen(false)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={20} style={{ color: 'var(--color-accent)' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                    AI Blog Article Generator
                  </h3>
                </div>
                {!isAiGenerating && (
                  <button onClick={() => setIsAiModalOpen(false)}>✕</button>
                )}
              </div>

              {aiError && (
                <div style={{ backgroundColor: '#FDF2F2', border: '1px solid #F8B4B4', padding: '10px 14px', borderRadius: '6px', color: '#9B1C1C', fontSize: '0.8125rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={16} />
                  <span>{aiError}</span>
                </div>
              )}

              <form onSubmit={handleTriggerAiGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Article Topic / Keyword</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Why Washing Machine Vibrates Excessively During Spin"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Appliance Category</label>
                  <select
                    className="form-control"
                    value={aiCategory}
                    onChange={(e) => setAiCategory(e.target.value)}
                  >
                    <option value="AC Repair">AC Repair</option>
                    <option value="Fridge Repair">Fridge Repair</option>
                    <option value="Washing Machine Repair">Washing Machine Repair</option>
                    <option value="Microwave Oven Repair">Microwave Oven Repair</option>
                    <option value="LED TV Repair">LED TV Repair</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Specific Angle & Context</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={aiAngle}
                    onChange={(e) => setAiAngle(e.target.value)}
                  />
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', background: 'var(--color-bg-warm)', padding: '10px', borderRadius: '6px' }}>
                  <strong>Review Policy:</strong> AI generates title, English & Bengali markdown content, SEO meta description, focus keywords, and FAQs. The output is strictly saved as <em>Draft</em> for your manual review and approval before publishing.
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <button
                    type="button"
                    disabled={isAiGenerating}
                    onClick={() => setIsAiModalOpen(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isAiGenerating}
                    className="btn btn-accent"
                  >
                    <Sparkles size={16} />
                    <span>{isAiGenerating ? 'Generating Bilingual Draft...' : 'Generate AI Draft'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Post Editor Modal (Manual or Reviewing AI Generated Draft) */}
        {editingPost && (
          <div className="modal-overlay" onClick={() => !isSaving && setEditingPost(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '820px', padding: '28px', maxHeight: '90vh' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    ARTICLE EDITOR (DRAFT REVIEW)
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                    {editingPost.title || 'Untitled Article'}
                  </h3>
                </div>
                <button onClick={() => setEditingPost(null)}>✕</button>
              </div>

              <form onSubmit={handleSavePost} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '70vh', overflowY: 'auto', paddingRight: '6px' }}>
                {/* Titles */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">English Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Bengali Title (বাংলা)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingPost.titleBn}
                      onChange={(e) => setEditingPost({ ...editingPost, titleBn: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Slug & Focus Keyword */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">URL Slug</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingPost.slug}
                      onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Focus Keyword</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingPost.focusKeyword || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, focusKeyword: e.target.value })}
                    />
                  </div>
                </div>

                {/* Meta Description */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">SEO Meta Description</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={editingPost.metaDesc || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, metaDesc: e.target.value })}
                  />
                </div>

                {/* Excerpt */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Excerpt (English)</label>
                    <textarea
                      className="form-control"
                      rows={2}
                      value={editingPost.excerpt || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Excerpt (বাংলা)</label>
                    <textarea
                      className="form-control"
                      rows={2}
                      value={editingPost.excerptBn || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, excerptBn: e.target.value })}
                    />
                  </div>
                </div>

                {/* Content English */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Full Article Markdown (English)</label>
                  <textarea
                    className="form-control"
                    rows={8}
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    required
                  />
                </div>

                {/* Content Bengali */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Full Article Markdown (বাংলা)</label>
                  <textarea
                    className="form-control"
                    rows={8}
                    value={editingPost.contentBn}
                    onChange={(e) => setEditingPost({ ...editingPost, contentBn: e.target.value })}
                    required
                  />
                </div>

                {/* Optional Featured Image */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Featured Image URL (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="/uploads/my-article-image.jpg"
                    value={editingPost.featuredImageUrl || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, featuredImageUrl: e.target.value })}
                  />
                  <small style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Article can be published without an image.
                  </small>
                </div>

                {/* Status Selection */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9375rem', fontWeight: 600 }}>
                    <input
                      type="radio"
                      name="status"
                      checked={editingPost.status === 'draft'}
                      onChange={() => setEditingPost({ ...editingPost, status: 'draft' })}
                    />
                    <span>Save as Draft (Offline)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                    <input
                      type="radio"
                      name="status"
                      checked={editingPost.status === 'published'}
                      onChange={() => setEditingPost({ ...editingPost, status: 'published', publishedAt: editingPost.publishedAt || new Date().toISOString().split('T')[0] })}
                    />
                    <span>Publish Live to /blog</span>
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                  <button type="button" onClick={() => setEditingPost(null)} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSaving} className="btn btn-primary">
                    <Save size={16} />
                    <span>{isSaving ? 'Saving...' : 'Save Article'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
