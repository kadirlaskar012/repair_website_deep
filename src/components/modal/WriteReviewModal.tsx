'use client';

import React, { useState, useEffect } from 'react';
import { Star, X, CheckCircle2, ShieldCheck, MapPin, Wrench, User, Phone } from 'lucide-react';
import { Language, Review } from '@/lib/types';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onReviewSubmitted: (newReview: Review) => void;
}

export default function WriteReviewModal({
  isOpen,
  onClose,
  lang,
  onReviewSubmitted
}: WriteReviewModalProps) {
  const isBn = lang === 'bn';

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [serviceCategory, setServiceCategory] = useState('AC Repair');
  const [comment, setComment] = useState('');
  const [mobile, setMobile] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Background scroll lock
  useEffect(() => {
    if (isOpen) {
      lockScroll();
      setIsSuccess(false);
      setErrorMsg('');
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

  if (!isOpen) return null;

  const ratingLabels: Record<number, { en: string; bn: string }> = {
    1: { en: 'Poor Experience', bn: 'সন্তোষজনক নয়' },
    2: { en: 'Fair / Below Average', bn: 'মোটামুটি' },
    3: { en: 'Good Service', bn: 'ভালো পরিষেবা' },
    4: { en: 'Very Good & Prompt', bn: 'খুব ভালো ও দ্রুত' },
    5: { en: 'Excellent & Highly Recommended!', bn: 'অসাধারণ ও বিশ্বস্ত!' }
  };

  const currentStar = hoverRating || rating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (name.trim().length < 2) {
      setErrorMsg(isBn ? 'অনুগ্রহ করে আপনার সঠিক নাম লিখুন।' : 'Please enter your valid name.');
      return;
    }
    if (location.trim().length < 2) {
      setErrorMsg(isBn ? 'অনুগ্রহ করে আপনার এলাকা বা শহর লিখুন।' : 'Please enter your locality or area.');
      return;
    }
    if (comment.trim().length < 8) {
      setErrorMsg(
        isBn
          ? 'অনুগ্রহ করে সার্ভিসের অভিজ্ঞতা সম্পর্কে অন্তত ৮ অক্ষর লিখুন।'
          : 'Please write at least 8 characters about your service experience.'
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name.trim(),
          location: location.trim(),
          serviceCategory,
          rating,
          comment: comment.trim(),
          mobile: mobile.trim() || undefined
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setIsSuccess(true);
      if (data.review) {
        onReviewSubmitted(data.review);
      }

      // Auto close after 2.2 seconds
      setTimeout(() => {
        onClose();
      }, 2200);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error occurred while saving review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="write-review-title"
      style={{ zIndex: 1000 }}
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '540px',
          width: '100%',
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: '20px',
          padding: 0,
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
          border: '1px solid var(--color-border)'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: 'var(--color-bg-warm)',
            borderBottom: '1px solid var(--color-border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--color-primary)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '2px'
              }}
            >
              <Star size={14} fill="var(--color-primary)" />
              <span>{isBn ? 'গ্রাহক মতামত' : 'Customer Feedback'}</span>
            </div>
            <h2
              id="write-review-title"
              style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--color-text-main)'
              }}
            >
              {isBn ? 'আপনার অভিজ্ঞতা শেয়ার করুন' : 'Write a Customer Review'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="header-icon-btn"
            style={{ width: '36px', height: '36px' }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '36px 12px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '8px' }}>
                {isBn ? 'অসংখ্য ধন্যবাদ!' : 'Thank You So Much!'}
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                {isBn
                  ? 'আপনার মূল্যবান রিভিউটি সফলভাবে প্রকাশিত হয়েছে। এটি অন্যান্য গ্রাহকদের সিদ্ধান্ত নিতে সাহায্য করবে।'
                  : 'Your review has been successfully submitted and helps other families find verified repair care.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Star Rating Interactive Bar */}
              <div
                style={{
                  textAlign: 'center',
                  padding: '16px',
                  backgroundColor: 'var(--color-bg-alt)',
                  borderRadius: '14px',
                  border: '1px solid var(--color-border-light)',
                  marginBottom: '20px'
                }}
              >
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                  {isBn ? 'সার্ভিস কেমন ছিল? রেটিং দিন:' : 'How was your repair experience?'}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginBottom: '6px'
                  }}
                >
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '4px',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease'
                      }}
                      aria-label={`${s} Stars`}
                    >
                      <Star
                        size={32}
                        fill={s <= currentStar ? '#F59E0B' : 'none'}
                        color={s <= currentStar ? '#F59E0B' : 'var(--color-text-light)'}
                        strokeWidth={1.5}
                        style={{
                          transform: s <= currentStar ? 'scale(1.1)' : 'scale(1)',
                          transition: 'all 0.15s ease'
                        }}
                      />
                    </button>
                  ))}
                </div>

                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#D97706' }}>
                  {ratingLabels[currentStar]?.[isBn ? 'bn' : 'en']}
                </div>
              </div>

              {/* Error Message if any */}
              {errorMsg && (
                <div
                  style={{
                    padding: '10px 14px',
                    backgroundColor: '#FEE2E2',
                    border: '1px solid #FCA5A5',
                    color: '#B91C1C',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    marginBottom: '16px'
                  }}
                >
                  {errorMsg}
                </div>
              )}

              {/* Form Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                {/* Name */}
                <div>
                  <label className="form-label">
                    <User size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    {isBn ? 'আপনার নাম' : 'Your Full Name'} <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isBn ? 'উদা: সৌমেন ব্যানার্জী' : 'e.g. Soumen Banerjee'}
                    className="form-control"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="form-label">
                    <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    {isBn ? 'এলাকা / শহর' : 'Locality / Area'} <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={isBn ? 'উদা: সল্টলেক, সেক্টর ৫' : 'e.g. Salt Lake, Sector 5'}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Service Category & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label className="form-label">
                    <Wrench size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    {isBn ? 'পরিষেবা ক্যাটাগরি' : 'Appliance Serviced'} <span className="required">*</span>
                  </label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="form-control"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="AC Repair">{isBn ? 'এসি মেরামত ও সার্ভিসিং' : 'AC Repair & Service'}</option>
                    <option value="Refrigerator Repair">{isBn ? 'ফ্রিজ মেরামত' : 'Refrigerator Repair'}</option>
                    <option value="Washing Machine Repair">{isBn ? 'ওয়াশিং মেশিন মেরামত' : 'Washing Machine Repair'}</option>
                    <option value="Microwave Oven Repair">{isBn ? 'মাইক্রোওয়েভ ওভেন মেরামত' : 'Microwave Oven Repair'}</option>
                    <option value="LED TV Repair">{isBn ? 'স্মার্ট এলইডি টিভি মেরামত' : 'Smart LED TV Repair'}</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">
                    <Phone size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    {isBn ? 'মোবাইল নম্বর (গোপনীয়)' : 'Mobile No (Private)'}
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/[^\d]/g, '').slice(0, 10))}
                    placeholder={isBn ? '১০ সংখ্যার নম্বর (ঐচ্ছিক)' : '10-digit number (optional)'}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div style={{ marginBottom: '20px' }}>
                <label className="form-label">
                  {isBn ? 'আপনার অভিজ্ঞতা ও টেকনিশিয়ানের কাজ কেমন লেগেছে লিখুন' : 'Detailed Review / Feedback'}{' '}
                  <span className="required">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={
                    isBn
                      ? 'টেকনিশিয়ানের সময়ানুবর্তিতা, মেরামতের মান এবং আপনার অভিজ্ঞতা সম্পর্কে বিস্তারিত জানান...'
                      : 'Share your honest feedback on technician punctuality, service quality, and pricing...'
                  }
                  className="form-control"
                  style={{ resize: 'vertical', minHeight: '80px' }}
                />
              </div>

              {/* Submit CTA & Trust Note */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  <ShieldCheck size={16} color="var(--color-success)" />
                  <span>{isBn ? '১০০% আসল ও বিশ্বস্ত গ্রাহক পর্যালোচনা' : '100% genuine verified customer review'}</span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-ghost"
                    style={{ minHeight: '42px', padding: '8px 16px' }}
                  >
                    {isBn ? 'বাতিল' : 'Cancel'}
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{ minHeight: '42px', padding: '8px 22px' }}
                  >
                    {isSubmitting ? (
                      <span>{isBn ? 'জমা হচ্ছে...' : 'Submitting...'}</span>
                    ) : (
                      <span>{isBn ? 'রিভিউ সাবমিট করুন' : 'Submit Review'}</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
