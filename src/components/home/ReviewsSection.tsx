import React from 'react';
import { Star, ShieldCheck, MapPin } from 'lucide-react';
import { Review, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface ReviewsSectionProps {
  reviews: Review[];
  lang: Language;
}

export default function ReviewsSection({ reviews, lang }: ReviewsSectionProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-bg-warm)', borderTop: '1px solid var(--color-border-light)' }}>
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-badge">
            <span>{isBn ? 'গ্রাহক সন্তুষ্টি' : 'Customer Feedback'}</span>
          </div>
          <h2 className="section-title">{t.reviewsHeading}</h2>
          <p className="section-subtitle">{t.reviewsSubtitle}</p>
        </div>

        {/* Demo Notice Banner */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto 32px auto',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--color-text-light)',
            padding: '6px 12px',
            background: 'rgba(0, 0, 0, 0.03)',
            borderRadius: 'var(--radius-full)'
          }}
        >
          {t.demoReviewNotice}
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {reviews.map((r) => (
            <div
              key={r.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px'
              }}
            >
              <div>
                {/* Rating Stars & Category Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '3px', color: '#F59E0B' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < r.rating ? '#F59E0B' : 'none'}
                        stroke="#F59E0B"
                      />
                    ))}
                  </div>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: 'var(--color-primary-light)',
                      color: 'var(--color-primary-dark)',
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    {r.serviceCategory}
                  </span>
                </div>

                {/* Comment */}
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-main)', lineHeight: 1.6, marginBottom: '20px' }}>
                  &ldquo;{isBn ? r.commentBn : r.comment}&rdquo;
                </p>
              </div>

              {/* Author & Verified Tag */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--color-border-light)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-text-main)' }}>
                    {r.customerName}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                    <MapPin size={12} />
                    <span>{r.location}</span>
                  </div>
                </div>

                {r.isVerified && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      color: 'var(--color-success)',
                      fontWeight: 600
                    }}
                  >
                    <ShieldCheck size={14} />
                    <span>{t.verifiedCustomer}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
