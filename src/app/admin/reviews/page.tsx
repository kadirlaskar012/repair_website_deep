'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Review } from '@/lib/types';
import {
  Star,
  Plus,
  Search,
  Trash2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Edit,
  ShieldCheck,
  Eye,
  EyeOff,
  Filter,
  MapPin,
  Wrench,
  Calendar,
  X,
  Check
} from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [starFilter, setStarFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formCategory, setFormCategory] = useState('AC Repair');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');
  const [formCommentBn, setFormCommentBn] = useState('');
  const [formIsVerified, setFormIsVerified] = useState(true);
  const [formIsActive, setFormIsActive] = useState(true);
  const [formDate, setFormDate] = useState('');

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reviews');
      const data = await res.json();
      if (data.success && Array.isArray(data.reviews)) {
        setReviews(data.reviews);
      }
    } catch (e) {
      console.error('Failed to load reviews:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const openAddModal = () => {
    setEditingReview(null);
    setFormName('');
    setFormLocation('Kolkata');
    setFormCategory('AC Repair');
    setFormRating(5);
    setFormComment('');
    setFormCommentBn('');
    setFormIsVerified(true);
    setFormIsActive(true);
    setFormDate(new Date().toISOString().split('T')[0]);
    setModalOpen(true);
  };

  const openEditModal = (review: Review) => {
    setEditingReview(review);
    setFormName(review.customerName);
    setFormLocation(review.location);
    setFormCategory(review.serviceCategory);
    setFormRating(review.rating);
    setFormComment(review.comment);
    setFormCommentBn(review.commentBn || '');
    setFormIsVerified(review.isVerified);
    setFormIsActive(review.isActive);
    setFormDate(review.date || new Date().toISOString().split('T')[0]);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      alert('Please fill in Customer Name and Review Comment.');
      return;
    }

    setSaving(true);
    try {
      const reviewPayload: Review = {
        id: editingReview ? editingReview.id : `rev-${Date.now()}`,
        customerName: formName.trim(),
        location: formLocation.trim() || 'Kolkata',
        serviceCategory: formCategory,
        rating: Number(formRating),
        comment: formComment.trim(),
        commentBn: formCommentBn.trim() || formComment.trim(),
        isVerified: formIsVerified,
        isDemo: false,
        date: formDate || new Date().toISOString().split('T')[0],
        isActive: formIsActive,
        sortOrder: editingReview ? editingReview.sortOrder : 0
      };

      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewPayload)
      });

      const data = await res.json();
      if (data.success) {
        if (editingReview) {
          setReviews((prev) => prev.map((r) => (r.id === reviewPayload.id ? reviewPayload : r)));
        } else {
          setReviews((prev) => [reviewPayload, ...prev]);
        }
        setModalOpen(false);
      } else {
        alert(data.error || 'Failed to save review');
      }
    } catch (e) {
      console.error('Save review error:', e);
      alert('Network error while saving review');
    } finally {
      setSaving(false);
    }
  };

  const toggleVerified = async (review: Review) => {
    const updated: Review = { ...review, isVerified: !review.isVerified };
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        setReviews((prev) => prev.map((r) => (r.id === review.id ? updated : r)));
      }
    } catch (e) {
      console.error('Toggle verified error:', e);
    }
  };

  const toggleActive = async (review: Review) => {
    const updated: Review = { ...review, isActive: !review.isActive };
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        setReviews((prev) => prev.map((r) => (r.id === review.id ? updated : r)));
      }
    } catch (e) {
      console.error('Toggle active error:', e);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete the review by "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/reviews?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } else {
        alert('Failed to delete review');
      }
    } catch (e) {
      console.error('Delete review error:', e);
    } finally {
      setDeletingId(null);
    }
  };

  // Calculations
  const totalCount = reviews.length;
  const verifiedCount = reviews.filter((r) => r.isVerified).length;
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const avgRating =
    totalCount > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalCount).toFixed(1)
      : '5.0';

  // Filtered List
  const filteredReviews = reviews.filter((r) => {
    // Search
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      r.customerName.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.comment.toLowerCase().includes(q) ||
      r.serviceCategory.toLowerCase().includes(q);

    // Category
    const matchesCategory =
      categoryFilter === 'all' ||
      r.serviceCategory.toLowerCase().includes(categoryFilter.toLowerCase());

    // Star
    const matchesStar =
      starFilter === 'all' ||
      (starFilter === '5' && r.rating === 5) ||
      (starFilter === '4' && r.rating === 4) ||
      (starFilter === '3' && r.rating === 3) ||
      (starFilter === 'low' && r.rating <= 2);

    // Status
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && r.isActive) ||
      (statusFilter === 'hidden' && !r.isActive) ||
      (statusFilter === 'verified' && r.isVerified);

    return matchesSearch && matchesCategory && matchesStar && matchesStatus;
  });

  return (
    <AdminLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Page Title & Main Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '1.875rem',
                fontWeight: 800,
                color: 'var(--color-text-main)',
                letterSpacing: '-0.02em',
                marginBottom: '4px'
              }}
            >
              Customer Reviews & Ratings
            </h1>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}>
              Manage customer testimonials, doorstep star ratings, and moderation across Kolkata, Howrah, Hooghly & Barasat
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={openAddModal}
              className="btn btn-primary btn-sm"
              style={{ boxShadow: '0 4px 14px rgba(20, 108, 91, 0.3)' }}
            >
              <Plus size={16} />
              <span>Add Review</span>
            </button>

            <button
              onClick={fetchReviews}
              className="btn btn-outline btn-sm"
              title="Refresh reviews list"
            >
              <RefreshCw size={15} className={loading ? 'spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '28px'
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--color-text-muted)',
                marginBottom: '6px'
              }}
            >
              TOTAL REVIEWS
            </div>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--color-primary)'
              }}
            >
              {totalCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Published & submitted testimonials
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#D97706',
                marginBottom: '6px'
              }}
            >
              AVERAGE RATING
            </div>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{avgRating}</span>
              <span style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />
                ))}
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Overall customer satisfaction score
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#059669',
                marginBottom: '6px'
              }}
            >
              5-STAR RATINGS
            </div>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#059669'
              }}
            >
              {fiveStarCount}{' '}
              <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                ({totalCount > 0 ? Math.round((fiveStarCount / totalCount) * 100) : 100}%)
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Top satisfied door-step clients
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--color-secondary)',
                marginBottom: '6px'
              }}
            >
              VERIFIED REVIEWS
            </div>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--color-secondary)'
              }}
            >
              {verifiedCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Verified authentic service orders
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-card)',
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          {/* Search Input */}
          <div style={{ flex: '1 1 260px', position: 'relative' }}>
            <Search
              size={17}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer, locality or comment..."
              className="input-field"
              style={{
                paddingLeft: '38px',
                paddingRight: search ? '36px' : '14px',
                height: '40px',
                fontSize: '0.875rem'
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-field"
            style={{ width: 'auto', minWidth: '150px', height: '40px', fontSize: '0.875rem' }}
          >
            <option value="all">All Appliances</option>
            <option value="ac">AC Repair</option>
            <option value="fridge">Refrigerator</option>
            <option value="washing">Washing Machine</option>
            <option value="microwave">Microwave Oven</option>
            <option value="tv">LED TV</option>
          </select>

          {/* Star Filter */}
          <select
            value={starFilter}
            onChange={(e) => setStarFilter(e.target.value)}
            className="input-field"
            style={{ width: 'auto', minWidth: '130px', height: '40px', fontSize: '0.875rem' }}
          >
            <option value="all">All Stars</option>
            <option value="5">5 Stars only</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="low">1-2 Stars</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
            style={{ width: 'auto', minWidth: '130px', height: '40px', fontSize: '0.875rem' }}
          >
            <option value="all">All Status</option>
            <option value="active">Active (Visible)</option>
            <option value="hidden">Hidden</option>
            <option value="verified">Verified Only</option>
          </select>
        </div>

        {/* Reviews List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-muted)' }}>
            <RefreshCw size={32} className="spin" style={{ margin: '0 auto 12px' }} />
            <p>Loading reviews...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed var(--color-border)',
              padding: '60px 20px',
              textAlign: 'center'
            }}
          >
            <Star size={40} style={{ color: 'var(--color-text-muted)', margin: '0 auto 14px' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '6px' }}>
              No Reviews Found
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '18px' }}>
              No reviews match your search or filter criteria.
            </p>
            <button onClick={openAddModal} className="btn btn-primary btn-sm">
              <Plus size={15} />
              <span>Add First Review</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredReviews.map((review) => {
              const initial = review.customerName.charAt(0).toUpperCase();

              return (
                <div
                  key={review.id}
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    border: '1.5px solid var(--color-border)',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: 'var(--shadow-xs)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    opacity: review.isActive ? 1 : 0.65,
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                >
                  {/* Top Bar: Customer Info + Rating + Badges + Actions */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}
                  >
                    {/* Left: Avatar & Customer info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, var(--color-primary-bg), #d1fae5)',
                          color: 'var(--color-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '1.125rem',
                          border: '1.5px solid rgba(20, 108, 91, 0.2)'
                        }}
                      >
                        {initial}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-text-main)' }}>
                            {review.customerName}
                          </span>

                          {review.isVerified && (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                background: 'rgba(16, 185, 129, 0.1)',
                                color: '#059669',
                                padding: '2px 8px',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.6875rem',
                                fontWeight: 700
                              }}
                            >
                              <CheckCircle2 size={12} />
                              Verified
                            </span>
                          )}

                          {!review.isActive && (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                background: '#F3F4F6',
                                color: '#6B7280',
                                padding: '2px 8px',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.6875rem',
                                fontWeight: 700
                              }}
                            >
                              Hidden
                            </span>
                          )}
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginTop: '3px',
                            fontSize: '0.8125rem',
                            color: 'var(--color-text-muted)'
                          }}
                        >
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={13} color="var(--color-primary)" />
                            {review.location}
                          </span>
                          <span>•</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Wrench size={13} color="var(--color-secondary)" />
                            {review.serviceCategory}
                          </span>
                          {review.date && (
                            <>
                              <span>•</span>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <Calendar size={13} />
                                {review.date}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Stars & Action Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {/* Visual Stars */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          background: 'rgba(245, 158, 11, 0.1)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={15}
                            fill={i < review.rating ? '#F59E0B' : 'transparent'}
                            color={i < review.rating ? '#F59E0B' : '#D1D5DB'}
                          />
                        ))}
                        <span
                          style={{
                            fontSize: '0.8125rem',
                            fontWeight: 800,
                            color: '#B45309',
                            marginLeft: '4px'
                          }}
                        >
                          {review.rating}.0
                        </span>
                      </div>

                      {/* Toggle Active Button */}
                      <button
                        onClick={() => toggleActive(review)}
                        title={review.isActive ? 'Hide from public site' : 'Show on public site'}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '6px 10px', height: '34px' }}
                      >
                        {review.isActive ? <Eye size={15} color="#059669" /> : <EyeOff size={15} color="#6B7280" />}
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => openEditModal(review)}
                        title="Edit review"
                        className="btn btn-outline btn-sm"
                        style={{ padding: '6px 10px', height: '34px' }}
                      >
                        <Edit size={15} />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(review.id, review.customerName)}
                        title="Delete review"
                        disabled={deletingId === review.id}
                        className="btn btn-outline btn-sm"
                        style={{
                          padding: '6px 10px',
                          height: '34px',
                          color: '#DC2626',
                          borderColor: '#FECACA'
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: '1.6',
                      color: 'var(--color-text-main)',
                      backgroundColor: 'var(--color-bg-base)',
                      padding: '14px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--color-border-light)'
                    }}
                  >
                    &ldquo;{review.comment}&rdquo;
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add / Edit Review Modal */}
        {modalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--color-bg-card)',
                width: '100%',
                maxWidth: '560px',
                borderRadius: '20px',
                border: '1.5px solid var(--color-border)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden'
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--color-bg-warm)'
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                    {editingReview ? 'Edit Customer Review' : 'Add Verified Customer Review'}
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    Publish authentic doorstep repair ratings
                  </p>
                </div>

                <button
                  onClick={() => setModalOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer',
                    padding: '6px'
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSave} style={{ padding: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Subir Chakraborty"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>
                      Locality / Area *
                    </label>
                    <input
                      type="text"
                      required
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="e.g. Salt Lake, Sector 2"
                      className="input-field"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>
                      Service Category *
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="input-field"
                    >
                      <option value="AC Repair & Jet Cleaning">AC Repair</option>
                      <option value="Refrigerator Double Door">Refrigerator</option>
                      <option value="Washing Machine Front Load">Washing Machine</option>
                      <option value="Microwave Oven Heating">Microwave Oven</option>
                      <option value="LED TV Panel Repair">LED TV</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>
                      Rating (Stars) *
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '42px' }}>
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setFormRating(starVal)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px',
                            display: 'flex'
                          }}
                        >
                          <Star
                            size={24}
                            fill={starVal <= formRating ? '#F59E0B' : 'transparent'}
                            color={starVal <= formRating ? '#F59E0B' : '#D1D5DB'}
                          />
                        </button>
                      ))}
                      <span style={{ fontSize: '0.875rem', fontWeight: 800, marginLeft: '6px', color: '#B45309' }}>
                        {formRating}.0
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>
                    Review Comment (English / Bengali) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    placeholder="Write detailed customer feedback..."
                    className="input-field"
                    style={{ height: 'auto', resize: 'vertical' }}
                  />
                </div>

                {/* Checkboxes: Verified & Active */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={formIsVerified}
                      onChange={(e) => setFormIsVerified(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                    />
                    <span>Verified Customer Badge</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={formIsActive}
                      onChange={(e) => setFormIsActive(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                    />
                    <span>Publish (Active on Website)</span>
                  </label>
                </div>

                {/* Footer buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn btn-outline btn-sm"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary btn-sm"
                  >
                    {saving ? 'Saving...' : editingReview ? 'Update Review' : 'Publish Review'}
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
