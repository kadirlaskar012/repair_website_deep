'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Category } from '@/lib/types';
import { Layers, Edit3, Check, Save } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCategory)
      });
      if (res.ok) {
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? editingCategory : c))
        );
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2000);
        setEditingCategory(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '4px' }}>
            Service Categories
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Manage the 5 primary appliance services (English & Bengali content, descriptions & SEO)
          </p>
        </div>

        {savedSuccess && (
          <div style={{ backgroundColor: '#DEF7EC', color: '#03543F', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
            Category updated successfully!
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {categories.map((c) => (
            <div
              key={c.id}
              className="card"
              style={{
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '3px 8px', borderRadius: '4px' }}>
                    /{c.slug}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: c.isActive ? 'var(--color-success)' : 'var(--color-text-light)', fontWeight: 600 }}>
                    {c.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1875rem', color: 'var(--color-text-main)', marginBottom: '4px' }}>
                  {c.name}
                </h3>
                <div style={{ fontSize: '0.9375rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '12px' }}>
                  {c.nameBn}
                </div>

                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                  {c.shortDesc}
                </p>
              </div>

              <div style={{ paddingTop: '14px', borderTop: '1px solid var(--color-border-light)' }}>
                <button
                  onClick={() => setEditingCategory({ ...c })}
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%' }}
                >
                  <Edit3 size={14} />
                  <span>Edit Bilingual Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Category Modal */}
        {editingCategory && (
          <div className="modal-overlay" onClick={() => setEditingCategory(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                  Edit Category: {editingCategory.name}
                </h3>
                <button onClick={() => setEditingCategory(null)}>✕</button>
              </div>

              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">English Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingCategory.name}
                      onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Bengali Name (বাংলা)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingCategory.nameBn}
                      onChange={(e) => setEditingCategory({ ...editingCategory, nameBn: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">English Short Description</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={editingCategory.shortDesc}
                    onChange={(e) => setEditingCategory({ ...editingCategory, shortDesc: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Bengali Short Description (বাংলা)</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={editingCategory.shortDescBn}
                    onChange={(e) => setEditingCategory({ ...editingCategory, shortDescBn: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Full Description (English)</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={editingCategory.fullDesc}
                    onChange={(e) => setEditingCategory({ ...editingCategory, fullDesc: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Full Description (বাংলা)</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={editingCategory.fullDescBn}
                    onChange={(e) => setEditingCategory({ ...editingCategory, fullDescBn: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <button type="button" onClick={() => setEditingCategory(null)} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn btn-primary">
                    <Save size={16} />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
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
