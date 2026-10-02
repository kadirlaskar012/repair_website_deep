'use client';

import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, MapPin, Edit3, CheckCircle2, Filter, Award, MessageSquare, Search, X, ChevronDown } from 'lucide-react';
import { Review, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import WriteReviewModal from '@/components/modal/WriteReviewModal';

import { sortReviewsNewestFirst } from '@/lib/review-utils';

interface ReviewsSectionProps {
  reviews: Review[];
  lang: Language;
}

export default function ReviewsSection({ reviews, lang }: ReviewsSectionProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';

  const [reviewsList, setReviewsList] = useState<Review[]>(() => sortReviewsNewestFirst(reviews || []));
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(18);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Keep reviewsList synced with reviews prop and always sorted newest first
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      setReviewsList(sortReviewsNewestFirst(reviews));
    }
  }, [reviews]);

  // Real-time client mount sync to ensure newly submitted reviews appear immediately
  useEffect(() => {
    let isMounted = true;
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviewsList(sortReviewsNewestFirst(data.reviews));
        }
      })
      .catch((err) => console.warn('Could not refresh reviews:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter tabs definition covering all categories
  const filterTabs = [
    { id: 'all', label: isBn ? 'সকল রিভিউ (500+)' : 'All Reviews (500+)' },
    { id: 'ac', label: isBn ? 'এসি সার্ভিস (AC)' : 'AC Repair', match: 'AC' },
    { id: 'fridge', label: isBn ? 'ফ্রিজ (Fridge)' : 'Refrigerator', match: 'Fridge' },
    { id: 'washing', label: isBn ? 'ওয়াশিং মেশিন' : 'Washing Machine', match: 'Washing' },
    { id: 'microwave', label: isBn ? 'মাইক্রোওয়েভ' : 'Microwave', match: 'Microwave' },
    { id: 'ro', label: isBn ? 'ওয়াটার পিউরিফায়ার (RO)' : 'Water Purifier (RO)', match: 'Water Purifier' },
    { id: 'chimney', label: isBn ? 'কিচেন চিমনি' : 'Kitchen Chimney', match: 'Chimney' },
    { id: 'tv', label: isBn ? 'এলইডি টিভি (TV)' : 'LED Smart TV', match: 'TV' },
    { id: 'geyser', label: isBn ? 'গিজার হিটার' : 'Geyser & Heater', match: 'Geyser' }
  ];

  // Filtered reviews by category & instant search query
  const filteredReviews = reviewsList.filter((r) => {
    // Category match
    if (selectedFilter !== 'all') {
      const tab = filterTabs.find((t) => t.id === selectedFilter);
      if (tab && tab.match && !r.serviceCategory.toLowerCase().includes(tab.match.toLowerCase())) {
        return false;
      }
    }
    // Search query match (name, location, category, comment, commentBn)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = r.customerName.toLowerCase().includes(q);
      const matchLoc = r.location.toLowerCase().includes(q);
      const matchCat = r.serviceCategory.toLowerCase().includes(q);
      const matchComment = r.comment.toLowerCase().includes(q);
      const matchCommentBn = (r.commentBn || '').toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchCat && !matchComment && !matchCommentBn) {
        return false;
      }
    }
    return true;
  });

  const displayedReviews = filteredReviews.slice(0, visibleCount);

  const handleFilterChange = (tabId: string) => {
    setSelectedFilter(tabId);
    setVisibleCount(18);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(18);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 18, filteredReviews.length));
  };

  const handleReviewSubmitted = (newReview: Review) => {
    // Put newly posted review at the very top (sobar age dekhabe)
    setReviewsList((prev) => {
      const remaining = prev.filter((r) => r.id !== newReview.id);
      return sortReviewsNewestFirst([newReview, ...remaining]);
    });
    setSelectedFilter('all');
    setSearchQuery('');
  };

  return (
    <section
      className="section"
      id="customer-reviews"
      style={{
        backgroundColor: 'var(--color-bg-warm)',
        borderTop: '1px solid var(--color-border-light)'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrap" style={{ marginBottom: '32px' }}>
          <div className="section-badge">
            <Award size={14} />
            <span>{isBn ? 'গ্রাহক সন্তুষ্টি ও ট্রাস্ট রেটিং' : 'Customer Trust & Verified Reviews'}</span>
          </div>
          <h2 className="section-title">{t.reviewsHeading}</h2>
          <p className="section-subtitle">{t.reviewsSubtitle}</p>
        </div>

        {/* Rating Trust Overview Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1.5px solid var(--color-border)',
            borderRadius: '20px',
            padding: '24px 28px',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          {/* Left: Score & Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.25rem)',
                fontWeight: 900,
                color: 'var(--color-primary-dark)',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'baseline',
                gap: '4px'
              }}
            >
              <span>4.9</span>
              <span style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>/5</span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#F59E0B" color="#F59E0B" />
                ))}
                <span
                  style={{
                    marginLeft: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 800,
                    color: 'var(--color-text-main)'
                  }}
                >
                  {isBn ? '১২৫০+ ভেরিফায়েড গ্রাহক' : '1,250+ Verified Ratings'}
                </span>
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                {isBn
                  ? 'কলকাতা, হাওড়া, হুগলি ও উত্তর ২৪ পরগনার সম্মানিত পরিবারের অভিজ্ঞতা'
                  : 'Across Kolkata, Howrah, Hooghly & Barasat doorstep services'}
              </div>
            </div>
          </div>

          {/* Right: Actions (Write Review & Google Review) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Google Reviews Badge */}
            <a
              href="https://maps.app.goo.gl/ftLwKsuLEC5a3DZB9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{
                padding: '10px 18px',
                fontSize: '0.875rem',
                minHeight: '44px',
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-bg-base)'
              }}
              title="View & Review on Google"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{isBn ? 'Google রিভিউ' : 'Google Reviews'}</span>
            </a>

            {/* Write a Review Button */}
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="btn btn-primary"
              style={{
                padding: '10px 22px',
                fontSize: '0.875rem',
                minHeight: '44px',
                boxShadow: '0 4px 14px rgba(20, 108, 91, 0.3)'
              }}
            >
              <Edit3 size={16} />
              <span>{isBn ? 'রিভিউ দিন' : 'Write a Review'}</span>
            </button>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '24px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: isActive ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-bg-card)',
                  color: isActive ? '#FFFFFF' : 'var(--color-text-muted)',
                  transition: 'all 0.18s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(20, 108, 91, 0.25)' : 'none'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Instant Search Bar */}
        <div
          style={{
            position: 'relative',
            maxWidth: '540px',
            marginBottom: '28px'
          }}
        >
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)',
              pointerEvents: 'none'
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={
              isBn
                ? 'নাম, শহর বা ব্র্যান্ড দিয়ে রিভিউ খুঁজুন (যেমন: Howrah, Daikin, গ্যাস লিক...)'
                : 'Search reviews by customer name, city, brand or issue (e.g. Salt Lake, Samsung, drain)...'
            }
            style={{
              width: '100%',
              padding: '12px 42px 12px 44px',
              borderRadius: '30px',
              border: '1.5px solid var(--color-border)',
              backgroundColor: 'var(--color-bg-base)',
              fontSize: '0.875rem',
              color: 'var(--color-text-main)',
              outline: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'border-color 0.2s ease'
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setVisibleCount(18);
              }}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                padding: '4px'
              }}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '48px 24px',
              backgroundColor: 'var(--color-bg-card)',
              borderRadius: '16px',
              border: '1px solid var(--color-border)'
            }}
          >
            <MessageSquare size={36} style={{ color: 'var(--color-text-light)', margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '6px' }}>
              {isBn ? 'এই ক্যাটাগরিতে এখনও কোনো রিভিউ যোগ হয়নি' : 'No reviews in this category yet'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              {isBn ? 'আপনি কি এই সার্ভিসের সেবা নিয়েছেন? প্রথম রিভিউ দিন!' : 'Have you used this service? Be the first to share your feedback!'}
            </p>
            <button onClick={() => setIsWriteModalOpen(true)} className="btn btn-primary btn-sm">
              <Edit3 size={15} />
              <span>{isBn ? 'প্রথম রিভিউ লিখুন' : 'Write First Review'}</span>
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {displayedReviews.map((r) => {
              const initials = r.customerName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={r.id}
                  className="card card-hover"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '24px',
                    borderRadius: '16px',
                    position: 'relative'
                  }}
                >
                  <div>
                    {/* Top Row: Stars + Category Pill */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '14px',
                        flexWrap: 'wrap',
                        gap: '6px'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '3px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < r.rating ? '#F59E0B' : 'none'}
                            color="#F59E0B"
                          />
                        ))}
                      </div>

                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          background: 'var(--color-primary-light)',
                          color: 'var(--color-primary-dark)',
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        {r.serviceCategory}
                      </span>
                    </div>

                    {/* Comment */}
                    <p
                      style={{
                        fontSize: '0.9375rem',
                        color: 'var(--color-text-main)',
                        lineHeight: 1.6,
                        marginBottom: '20px',
                        fontStyle: 'italic'
                      }}
                    >
                      &ldquo;{isBn ? r.commentBn || r.comment : r.comment}&rdquo;
                    </p>
                  </div>

                  {/* Author Card Footer */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '16px',
                      borderTop: '1px solid var(--color-border-light)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {/* Avatar Circle */}
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-primary)',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '0.8125rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {initials}
                      </div>

                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: '0.9375rem',
                            color: 'var(--color-text-main)',
                            lineHeight: 1.2
                          }}
                        >
                          {r.customerName}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.78125rem',
                            color: 'var(--color-text-muted)',
                            marginTop: '2px'
                          }}
                        >
                          <MapPin size={11} />
                          <span>{r.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Verified Badge */}
                    {r.isVerified && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.75rem',
                          color: 'var(--color-success)',
                          fontWeight: 700,
                          backgroundColor: 'rgba(30, 130, 76, 0.08)',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-full)'
                        }}
                        title="Verified Doorstep Service Customer"
                      >
                        <ShieldCheck size={14} />
                        <span>{isBn ? 'ভেরিফায়েড' : 'Verified'}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button & Progress Counter */}
        {filteredReviews.length > visibleCount && (
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
                marginBottom: '12px',
                fontWeight: 600
              }}
            >
              <span>
                {isBn
                  ? `মোট ${filteredReviews.length}টি ভেরিফায়েড রিভিউর মধ্যে ${displayedReviews.length}টি প্রদর্শিত`
                  : `Showing ${displayedReviews.length} of ${filteredReviews.length} verified customer reviews`}
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div
              style={{
                maxWidth: '280px',
                height: '6px',
                backgroundColor: 'rgba(0,0,0,0.06)',
                borderRadius: '10px',
                margin: '0 auto 20px auto',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${Math.round((displayedReviews.length / filteredReviews.length) * 100)}%`,
                  height: '100%',
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: '10px',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>

            <div>
              <button
                type="button"
                onClick={handleLoadMore}
                className="btn btn-outline"
                style={{
                  padding: '12px 32px',
                  borderRadius: '30px',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  backgroundColor: 'var(--color-bg-base)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(20, 108, 91, 0.12)',
                  cursor: 'pointer'
                }}
              >
                <span>{isBn ? 'আরও রিভিউ দেখুন (+১৮)' : 'Load More Reviews (+18)'}</span>
                <ChevronDown size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Modal for Submitting Review */}
        <WriteReviewModal
          isOpen={isWriteModalOpen}
          onClose={() => setIsWriteModalOpen(false)}
          lang={lang}
          onReviewSubmitted={handleReviewSubmitted}
        />
      </div>
    </section>
  );
}
