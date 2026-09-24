import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Category, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface CategoryGridProps {
  categories: Category[];
  lang: Language;
}

export default function CategoryGrid({ categories, lang }: CategoryGridProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';

  // Custom crafted appliance SVG visuals
  const renderApplianceVisual = (iconName: string) => {
    switch (iconName) {
      case 'air-vent':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="10" width="40" height="20" rx="3" fill="#EAF4F2" stroke="#146C5B" strokeWidth="2.5" />
            <line x1="10" y1="24" x2="38" y2="24" stroke="#146C5B" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="16" x2="20" y2="16" stroke="#146C5B" strokeWidth="2" strokeLinecap="round" />
            <circle cx="37" cy="16" r="2" fill="#E8A33D" />
            <path d="M12 34C14 37 17 39 20 39" stroke="#146C5B" strokeWidth="2" strokeLinecap="round" />
            <path d="M22 34C24 37 27 39 30 39" stroke="#146C5B" strokeWidth="2" strokeLinecap="round" />
            <path d="M32 34C34 37 37 39 40 39" stroke="#146C5B" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'refrigerator':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="4" width="28" height="40" rx="4" fill="#EAF4F2" stroke="#146C5B" strokeWidth="2.5" />
            <line x1="10" y1="18" x2="38" y2="18" stroke="#146C5B" strokeWidth="2.5" />
            <line x1="15" y1="10" x2="15" y2="14" stroke="#E8A33D" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="15" y1="24" x2="15" y2="32" stroke="#E8A33D" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="30" cy="11" r="2" fill="#146C5B" />
          </svg>
        );
      case 'washing-machine':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="4" width="32" height="40" rx="4" fill="#EAF4F2" stroke="#146C5B" strokeWidth="2.5" />
            <line x1="8" y1="12" x2="40" y2="12" stroke="#146C5B" strokeWidth="2" />
            <circle cx="16" cy="8" r="2" fill="#E8A33D" />
            <circle cx="22" cy="8" r="2" fill="#146C5B" />
            <circle cx="24" cy="27" r="10" fill="#FFFFFF" stroke="#146C5B" strokeWidth="2.5" />
            <path d="M20 27C22 25 26 29 28 27" stroke="#146C5B" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'microwave':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="10" width="40" height="28" rx="4" fill="#EAF4F2" stroke="#146C5B" strokeWidth="2.5" />
            <rect x="8" y="15" width="22" height="18" rx="2" fill="#FFFFFF" stroke="#146C5B" strokeWidth="2" />
            <line x1="35" y1="16" x2="39" y2="16" stroke="#E8A33D" strokeWidth="2" strokeLinecap="round" />
            <line x1="35" y1="21" x2="39" y2="21" stroke="#146C5B" strokeWidth="2" strokeLinecap="round" />
            <circle cx="37" cy="28" r="3" fill="#146C5B" />
          </svg>
        );
      case 'tv':
      default:
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="8" width="40" height="26" rx="3" fill="#EAF4F2" stroke="#146C5B" strokeWidth="2.5" />
            <rect x="8" y="12" width="32" height="18" rx="1" fill="#FFFFFF" />
            <line x1="24" y1="34" x2="24" y2="40" stroke="#146C5B" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="16" y1="40" x2="32" y2="40" stroke="#146C5B" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="39" cy="30" r="1.5" fill="#E8A33D" />
          </svg>
        );
    }
  };

  return (
    <section className="section" id="services">
      <div className="container">
        {/* Section Title */}
        <div className="section-title-wrap">
          <div className="section-badge">
            <span>{isBn ? 'ডোরস্টেপ সেবা' : 'Doorstep Specialization'}</span>
          </div>
          <h2 className="section-title">{t.ourCategories}</h2>
          <p className="section-subtitle">{t.categoriesSubtitle}</p>
        </div>

        {/* 5 Primary Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {categories.map((c) => (
            <Link
              key={c.id}
              href={isBn ? `/bn/${c.slug}` : `/${c.slug}`}
              className="card card-hover"
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                {/* Visual Icon & Diagnosis Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '12px',
                      background: 'var(--color-primary-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {renderApplianceVisual(c.iconName)}
                  </div>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: 'var(--color-accent-light)',
                      color: 'var(--color-accent-dark)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {isBn ? '₹২৯৯ পরিদর্শন' : '₹299 Diagnosis'}
                  </span>
                </div>

                {/* Name */}
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--color-text-main)' }}>
                  {isBn ? c.nameBn : c.name}
                </h3>

                {/* Short Description */}
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                  {isBn ? c.shortDescBn : c.shortDesc}
                </p>
              </div>

              {/* Card Footer: CTA Arrow */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--color-border-light)',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              >
                <span>{t.viewDetails}</span>
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
