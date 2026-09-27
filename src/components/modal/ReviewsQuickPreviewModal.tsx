'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import {
  X,
  Star,
  ShieldCheck,
  MapPin,
  Wrench,
  Search,
  PenSquare,
  ArrowRight,
  Sparkles,
  Check
} from 'lucide-react';
import { Language, Review } from '@/lib/types';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';
import { initialReviews } from '@/lib/reviews-data';

interface ReviewsQuickPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWriteReview: () => void;
  lang: Language;
}

export default function ReviewsQuickPreviewModal({
  isOpen,
  onClose,
  onOpenWriteReview,
  lang
}: ReviewsQuickPreviewModalProps) {
  const isBn = lang === 'bn';
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Background scroll lock
  useEffect(() => {
    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => {
      if (isOpen) unlockScroll();
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Quick categories
  const categories = [
    { id: 'all', label: isBn ? 'সব (All)' : 'All' },
    { id: 'ac', label: isBn ? 'এসি রিপেয়ার' : 'AC Repair' },
    { id: 'fridge', label: isBn ? 'ফ্রিজ' : 'Refrigerator' },
    { id: 'washing', label: isBn ? 'ওয়াশিং মেশিন' : 'Washing Machine' },
    { id: 'microwave', label: isBn ? 'মাইক্রোওয়েভ' : 'Microwave' }
  ];

  // Instantly filter from static in-memory reviews (0ms delay, no loading spinner)
  const filteredReviews = useMemo(() => {
    let list = initialReviews;

    if (selectedCategory !== 'all') {
      const catMap: Record<string, string> = {
        ac: 'ac repair',
        fridge: 'refrigerator',
        washing: 'washing machine',
        microwave: 'microwave'
      };
      const target = catMap[selectedCategory] || '';
      list = list.filter((r) =>
        r.serviceCategory.toLowerCase().includes(target)
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (r) =>
          r.customerName.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.comment.toLowerCase().includes(q) ||
          (r.commentBn && r.commentBn.toLowerCase().includes(q))
      );
    }

    // Return first 30 reviews for ultra-fast, smooth scrolling
    return list.slice(0, 30);
  }, [selectedCategory, searchQuery]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reviews-preview-title"
    >
      <div
        className="modal-dialog review-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '580px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden'
        }}
      >
        {/* Mobile Drag Indicator */}
        <div className="modal-drag-indicator" aria-hidden="true">
          <div className="modal-drag-pill" />
        </div>

        {/* Modal Header */}
        <div
          className="booking-modal-header"
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--color-border)',
            flexShrink: 0
          }}
        >
          <div className="booking-modal-header-left" style={{ gap: '12px' }}>
            <div
              className="booking-modal-icon-badge"
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFFFFF'
              }}
              aria-hidden="true"
            >
              <Star size={20} fill="#FFFFFF" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3
                  id="reviews-preview-title"
                  className="booking-modal-title"
                  style={{ fontSize: '1.15rem' }}
                >
                  {isBn ? 'গ্রাহকদের রিভিউ ও রেটিং' : 'Customer Reviews & Ratings'}
                </h3>
                <span
                  style={{
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    color: '#B45309',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  ★ 4.9 / 5
                </span>
              </div>
              <p className="booking-modal-subtitle" style={{ fontSize: '0.8125rem' }}>
                {isBn
                  ? '৫০০+ ভেরিফায়েড গ্রাহকের সন্তুষ্টি ও মতামত'
                  : 'Based on 500+ verified doorstep customer reviews'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="booking-modal-close-btn"
            aria-label={isBn ? 'বন্ধ করুন' : 'Close'}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search & Category Filter Chips */}
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: 'var(--color-bg-card)',
            borderBottom: '1px solid var(--color-border-light)',
            flexShrink: 0
          }}
        >
          {/* Quick Search Input */}
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <Search
              size={15}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isBn
                  ? 'লোকেশন বা গ্রাহকের নাম দিয়ে খুঁজুন (যেমন: Salt Lake, Rajarhat)...'
                  : 'Search by locality or customer (e.g. Salt Lake, Rajarhat)...'
              }
              className="form-control"
              style={{
                paddingLeft: '34px',
                height: '38px',
                fontSize: '0.84rem',
                borderRadius: '8px'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  padding: '2px'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Chips Bar */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '2px',
              scrollbarWidth: 'none'
            }}
          >
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: selectedCategory === c.id ? 700 : 500,
                  backgroundColor:
                    selectedCategory === c.id
                      ? 'var(--color-primary)'
                      : 'var(--color-bg-alt)',
                  color:
                    selectedCategory === c.id
                      ? '#FFFFFF'
                      : 'var(--color-text-main)',
                  border:
                    selectedCategory === c.id
                      ? '1px solid var(--color-primary)'
                      : '1px solid var(--color-border)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Reviews List */}
        <div
          className="review-modal-body"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 18px',
            backgroundColor: 'var(--color-bg-warm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {filteredReviews.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 16px',
                color: 'var(--color-text-muted)'
              }}
            >
              <Star size={32} style={{ opacity: 0.3, margin: '0 auto 8px auto' }} />
              <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                {isBn ? 'কোনো রিভিউ পাওয়া যায়নি' : 'No Reviews Found'}
              </div>
              <p style={{ fontSize: '0.8125rem', marginTop: '4px' }}>
                {isBn
                  ? 'অন্য ক্যাটাগরি বা কিওয়ার্ড দিয়ে সার্চ করুন।'
                  : 'Try searching with a different locality or category.'}
              </p>
            </div>
          ) : (
            filteredReviews.map((r) => {
              const commentText = isBn && r.commentBn ? r.commentBn : r.comment;

              return (
                <div
                  key={r.id}
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    padding: '14px 16px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                  }}
                >
                  {/* Top Bar: Customer + Rating */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      flexWrap: 'wrap',
                      gap: '6px'
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: '0.9375rem',
                          color: 'var(--color-text-main)'
                        }}
                      >
                        {r.customerName}
                      </span>
                      {r.isVerified && (
                        <span
                          style={{
                            marginLeft: '6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                            backgroundColor: 'rgba(16, 185, 129, 0.12)',
                            color: '#065F46',
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: '10px'
                          }}
                        >
                          <ShieldCheck size={11} />
                          <span>{isBn ? 'যাচাইকৃত' : 'Verified'}</span>
                        </span>
                      )}
                    </div>

                    {/* Star Rating */}
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < r.rating ? '#F59E0B' : '#E5E7EB'}
                          color={i < r.rating ? '#F59E0B' : '#E5E7EB'}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Location & Appliance Tag */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-muted)',
                      marginBottom: '8px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <MapPin size={12} style={{ color: 'var(--color-primary)' }} />
                      <span>{r.location}</span>
                    </span>
                    <span>•</span>
                    <span
                      style={{
                        color: 'var(--color-primary-dark)',
                        fontWeight: 600
                      }}
                    >
                      {r.serviceCategory}
                    </span>
                  </div>

                  {/* Comment */}
                  <p
                    style={{
                      fontSize: '0.84rem',
                      lineHeight: 1.5,
                      color: 'var(--color-text-main)',
                      margin: 0
                    }}
                  >
                    "{commentText}"
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Sticky Bottom Action Footer (Requested by user) */}
        <div
          style={{
            padding: '14px 18px',
            backgroundColor: 'var(--color-bg-card)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexShrink: 0
          }}
        >
          <Link
            href={isBn ? '/bn/reviews' : '/reviews'}
            onClick={onClose}
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'none'
            }}
          >
            <span>{isBn ? 'সব ৫০০+ রিভিউ দেখুন' : 'All 500+ Reviews'}</span>
            <ArrowRight size={14} />
          </Link>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenWriteReview();
            }}
            className="btn btn-primary"
            style={{
              padding: '10px 20px',
              fontSize: '0.875rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 3px 12px rgba(15, 118, 110, 0.25)'
            }}
          >
            <PenSquare size={16} />
            <span>{isBn ? 'রিভিউ বা মতামত লিখুন ★' : 'Write a Review ★'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
