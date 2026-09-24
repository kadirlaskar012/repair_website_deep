'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { MediaAsset } from '@/lib/types';
import { Image as ImageIcon, Upload, Trash2, Copy, Check, ExternalLink } from 'lucide-react';

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/media');
      const data = await res.json();
      if (data.success) {
        setAssets(data.assets || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('altText', file.name);

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.asset) {
        setAssets((prev) => [data.asset, ...prev]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (asset: MediaAsset) => {
    if (!confirm(`Delete ${asset.filename}?`)) return;
    try {
      const res = await fetch(`/api/admin/media?id=${asset.id}&filename=${asset.filename}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setAssets((prev) => prev.filter((a) => a.id !== asset.id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyUrl = (asset: MediaAsset) => {
    navigator.clipboard.writeText(asset.url);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '4px' }}>
              Media Assets & Uploads
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Hostinger local filesystem storage (/public/uploads) for brand logos, category graphics, and illustrations
            </p>
          </div>

          <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
            <Upload size={16} />
            <span>{uploading ? 'Uploading...' : 'Upload Image File'}</span>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading media files...</div>
        ) : assets.length === 0 ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px dashed var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '60px 20px',
              textAlign: 'center'
            }}
          >
            <ImageIcon size={48} style={{ color: 'var(--color-text-light)', margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '1.1875rem', marginBottom: '6px' }}>No media assets uploaded yet</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '16px' }}>
              Upload brand logos, appliance diagrams, or featured blog images directly to Hostinger storage.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="card"
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ height: '140px', backgroundColor: 'var(--color-bg-alt)', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                  <img
                    src={asset.url}
                    alt={asset.altText}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </div>

                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '2px' }}>
                    {asset.originalName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '10px' }}>
                    {(asset.sizeBytes / 1024).toFixed(1)} KB
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid var(--color-border-light)', paddingTop: '10px' }}>
                  <button
                    onClick={() => handleCopyUrl(asset)}
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1, padding: '4px 8px', fontSize: '0.75rem' }}
                    title="Copy URL"
                  >
                    {copiedId === asset.id ? <Check size={14} style={{ color: 'var(--color-success)' }} /> : <Copy size={14} />}
                    <span>{copiedId === asset.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    style={{ padding: '4px 8px' }}
                    title="Open Image"
                  >
                    <ExternalLink size={14} />
                  </a>

                  <button
                    onClick={() => handleDelete(asset)}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '4px 8px', color: 'var(--color-danger)' }}
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
