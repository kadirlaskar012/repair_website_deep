'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Review } from '@/lib/types';
import { Star, Plus, Edit3, Trash2, Save } from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingRev, setEditingRev] = useState<Review | null>(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/admin/reviews');
      const data = await res.json();
      if (data.success) setReviews(data.reviews || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRev) return;

    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingRev)
      });
      if (res.ok) {
        setReviews((prev) => {
          const idx = prev.findIndex((r) => r.id === editingRev.id);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = editingRev;
            return copy;
          }
          return [...prev, editingRev];
        });
        setEditingRev(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '4px' }}>
              Customer Reviews (Homepage Only)
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Manage ratings, customer feedback, and demo indicators
            </p>
          </div>

          <button
            onClick={() =>
              setEditingRev({
                id: `rev-${Date.now()}`,
                customerName: '',
                location: 'Kolkata',
                serviceCategory: 'AC Repair',
                rating: 5,
                comment: '',
                commentBn: '',
                isVerified: true,
                isDemo: false,
                date: new Date().toISOString().split('T')[0],
                isActive: true,
                sortOrder: reviews.length + 1
              })
            }
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} />
            <span>Add Review</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {reviews.map((r) => (
            <div
              key={r.id}
              className="card"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', color: '#F59E0B' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < r.rating ? '#F59E0B' : 'none'} stroke="#F59E0B" />
                    ))}
                  </div>
                  <strong style={{ fontSize: '1rem', color: 'var(--color-text-main)' }}>{r.customerName}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>({r.location})</span>
                  {r.isDemo && (
                    <span style={{ fontSize: '0.7rem', background: '#F3F4F6', color: '#6B7280', padding: '2px 6px', borderRadius: '4px' }}>Demo</span>
                  )}
                </div>

                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-main)', marginBottom: '4px' }}>
                  &ldquo;{r.comment}&rdquo;
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-primary-dark)' }}>
                  &ldquo;{r.commentBn}&rdquo;
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setEditingRev({ ...r })}
                  className="btn btn-outline btn-sm"
                >
                  <Edit3 size={13} />
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="btn btn-outline btn-sm"
                  style={{ color: 'var(--color-danger)' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {editingRev && (
          <div className="modal-overlay" onClick={() => setEditingRev(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', padding: '24px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>
                {editingRev.customerName ? `Edit Review: ${editingRev.customerName}` : 'Add Review'}
              </h3>
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Customer Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingRev.customerName}
                      onChange={(e) => setEditingRev({ ...editingRev, customerName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Location (e.g. Salt Lake, Kolkata)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingRev.location}
                      onChange={(e) => setEditingRev({ ...editingRev, location: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Service Category</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingRev.serviceCategory}
                      onChange={(e) => setEditingRev({ ...editingRev, serviceCategory: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Rating (1 to 5)</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      className="form-control"
                      value={editingRev.rating}
                      onChange={(e) => setEditingRev({ ...editingRev, rating: parseInt(e.target.value, 10) || 5 })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Review Comment (English)</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={editingRev.comment}
                    onChange={(e) => setEditingRev({ ...editingRev, comment: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Review Comment (বাংলা)</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={editingRev.commentBn}
                    onChange={(e) => setEditingRev({ ...editingRev, commentBn: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem' }}>
                    <input
                      type="checkbox"
                      checked={editingRev.isDemo}
                      onChange={(e) => setEditingRev({ ...editingRev, isDemo: e.target.checked })}
                    />
                    <span>Mark as Demo Preview</span>
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <button type="button" onClick={() => setEditingRev(null)} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} />
                    <span>Save Review</span>
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
