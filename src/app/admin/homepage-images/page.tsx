'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Image as ImageIcon,
  Upload,
  GitBranch,
  GitCommit,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ExternalLink,
  Layers,
  Zap,
  Info
} from 'lucide-react';
import { ImageSlotMeta } from '@/lib/homepage-images-metadata';

interface GitStatus {
  available: boolean;
  branch: string;
  lastCommit: string;
  hasUncommittedChanges: boolean;
  statusSummary: string;
}

export default function HomepageImagesAdminPage() {
  const [slots, setSlots] = useState<ImageSlotMeta[]>([]);
  const [images, setImages] = useState<Record<string, string>>({});
  const [gitStatus, setGitStatus] = useState<GitStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoGit, setAutoGit] = useState(true);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [syncingGit, setSyncingGit] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [cacheBuster, setCacheBuster] = useState<number>(Date.now());

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 6000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/homepage-images');
      const data = await res.json();
      if (data.success) {
        setSlots(data.slots || []);
        setImages(data.images || {});
        setGitStatus(data.gitStatus || null);
        setCacheBuster(Date.now());
      } else {
        showToast('error', data.error || 'Failed to load images');
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error fetching data';
      showToast('error', msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFileUpload = async (slotId: string, file: File) => {
    try {
      setUploadingSlot(slotId);
      const formData = new FormData();
      formData.append('slotId', slotId);
      formData.append('file', file);
      formData.append('autoGit', autoGit ? 'true' : 'false');

      const res = await fetch('/api/admin/homepage-images', {
        method: 'POST',
        body: formData
      });

      const result = await res.json();
      if (result.success) {
        setImages((prev) => ({
          ...prev,
          [slotId]: result.path
        }));
        setCacheBuster(Date.now());
        if (result.gitStatus) {
          setGitStatus(result.gitStatus);
        }
        let msg = result.message;
        if (result.gitResult && result.gitResult.success) {
          msg += ' & pushed to GitHub (Vercel is rebuilding!)';
        }
        showToast('success', msg);
      } else {
        showToast('error', result.error || 'Upload failed');
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Upload failed';
      showToast('error', msg);
    } finally {
      setUploadingSlot(null);
    }
  };

  const handleGitSync = async () => {
    try {
      setSyncingGit(true);
      const res = await fetch('/api/admin/homepage-images/git-sync', {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', data.message);
        loadData();
      } else {
        showToast('error', data.error || 'Git sync failed');
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Git sync failed';
      showToast('error', msg);
    } finally {
      setSyncingGit(false);
    }
  };

  // Group slots by section
  const sections = Array.from(new Set(slots.map((s) => s.section)));
  const filteredSlots = selectedSection === 'all'
    ? slots
    : slots.filter((s) => s.section === selectedSection);

  return (
    <AdminLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '60px' }}>
        {/* Toast Alert */}
        {toast && (
          <div
            style={{
              position: 'fixed',
              top: '24px',
              right: '24px',
              zIndex: 9999,
              padding: '14px 20px',
              borderRadius: '10px',
              backgroundColor: toast.type === 'success' ? '#146C5B' : toast.type === 'error' ? '#DC2626' : '#2563EB',
              color: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 600,
              maxWidth: '450px',
              animation: 'modalSlideUp 0.2s ease-out'
            }}
          >
            {toast.type === 'success' && <CheckCircle2 size={18} />}
            {toast.type === 'error' && <AlertCircle size={18} />}
            {toast.type === 'info' && <Info size={18} />}
            <span style={{ fontSize: '0.875rem' }}>{toast.message}</span>
          </div>
        )}

        {/* Header Title */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ImageIcon size={26} style={{ color: 'var(--color-primary)' }} />
              Homepage Image Manager
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', marginTop: '4px' }}>
              Change and customize every image on the homepage. Files are saved directly into the project repository for hardcoded Vercel deployment.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ExternalLink size={15} />
              <span>View Live Website</span>
            </a>
            <button
              onClick={loadData}
              disabled={loading}
              className="btn btn-outline btn-sm"
              title="Refresh"
            >
              <RefreshCw size={15} className={loading ? 'spin' : ''} />
            </button>
          </div>
        </div>

        {/* Git Sync & Vercel Deployment Bar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '28px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: gitStatus?.hasUncommittedChanges ? '#EAB308' : '#10B981'
                }}
              />
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                {gitStatus?.statusSummary || 'Git Status'}
              </span>
            </div>

            {gitStatus?.branch && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', background: '#F1F5F9', fontSize: '0.8125rem', color: '#475569' }}>
                <GitBranch size={13} />
                <span>Branch: <strong>{gitStatus.branch}</strong></span>
              </div>
            )}

            {gitStatus?.lastCommit && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', background: '#F8FAFC', fontSize: '0.8125rem', color: '#64748B' }}>
                <GitCommit size={13} />
                <span>Last Commit: {gitStatus.lastCommit}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--color-text-main)', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={autoGit}
                onChange={(e) => setAutoGit(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
              />
              <span>Auto Push to Git on Upload</span>
            </label>

            <button
              onClick={handleGitSync}
              disabled={syncingGit}
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Zap size={15} />
              <span>{syncingGit ? 'Pushing to Git...' : 'Sync & Push to Git (Vercel Deploy)'}</span>
            </button>
          </div>
        </div>

        {/* Section Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
          <button
            onClick={() => setSelectedSection('all')}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 600,
              backgroundColor: selectedSection === 'all' ? 'var(--color-primary)' : '#E2E8F0',
              color: selectedSection === 'all' ? '#FFFFFF' : 'var(--color-text-main)',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap'
            }}
          >
            All Sections ({slots.length})
          </button>
          {sections.map((sec) => {
            const count = slots.filter((s) => s.section === sec).length;
            const isSel = selectedSection === sec;
            return (
              <button
                key={sec}
                onClick={() => setSelectedSection(sec)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  backgroundColor: isSel ? 'var(--color-primary)' : '#E2E8F0',
                  color: isSel ? '#FFFFFF' : 'var(--color-text-main)',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {sec} ({count})
              </button>
            );
          })}
        </div>

        {/* Image Slots Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredSlots.map((slot) => {
            const currentImg = images[slot.slotId] || slot.defaultPath;
            const isUploading = uploadingSlot === slot.slotId;
            const previewUrl = `${currentImg}?t=${cacheBuster}`;

            return (
              <div
                key={slot.slotId}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Image Preview Box */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '210px',
                    backgroundColor: '#1E293B',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={previewUrl}
                    alt={slot.title}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />

                  {/* Section Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(6px)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    {slot.section}
                  </div>

                  {isUploading && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        gap: '8px',
                        zIndex: 10
                      }}
                    >
                      <RefreshCw size={24} className="spin" />
                      <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                        {autoGit ? 'Saving & Pushing to Git...' : 'Saving asset...'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Info & Controls */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
                      {slot.title}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '14px', lineHeight: 1.4 }}>
                      {slot.description}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px', fontSize: '0.78rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                        <span>Recommended:</span>
                        <strong style={{ color: 'var(--color-text-main)' }}>{slot.recommendedSize}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', wordBreak: 'break-all' }}>
                        <span>Hardcoded Path:</span>
                        <code style={{ backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem' }}>
                          {currentImg}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Upload Controls */}
                  <div style={{ paddingTop: '14px', borderTop: '1px solid var(--color-border-light)' }}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-bg-alt)',
                        border: '1.5px dashed var(--color-border-dark)',
                        color: 'var(--color-primary-dark)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        cursor: isUploading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Upload size={16} />
                      <span>{isUploading ? 'Uploading...' : 'Replace This Image'}</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        style={{ display: 'none' }}
                        disabled={isUploading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(slot.slotId, file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
