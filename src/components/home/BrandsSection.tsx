import React from 'react';
import { Brand, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface BrandsSectionProps {
  brands: Brand[];
  lang: Language;
}

export default function BrandsSection({ brands, lang }: BrandsSectionProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-badge">
            <span>{isBn ? 'মাল্টি-ব্র্যান্ড বিশেষজ্ঞ' : 'All Major Brands'}</span>
          </div>
          <h2 className="section-title">{t.brandsHeading}</h2>
          <p className="section-subtitle">{t.brandsSubtitle}</p>
        </div>

        {/* Brand Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 150px), 1fr))',
            gap: '16px'
          }}
        >
          {brands.map((b) => {
            const logoSrc = b.logoUrl || `/images/brands/${b.id}.svg`;

            return (
              <div
                key={b.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '16px 18px',
                  minHeight: '82px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.2s ease',
                  cursor: 'default'
                }}
                className="card-hover"
                title={`${b.name} Authorized Multi-Brand Service`}
              >
                <img
                  src={logoSrc}
                  alt={`${b.name} Official Brand Logo`}
                  style={{
                    maxHeight: '40px',
                    maxWidth: '128px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    transition: 'transform 0.2s ease'
                  }}
                  onError={(e) => {
                    // graceful text fallback if image path ever fails
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'block';
                    }
                  }}
                />
                <span
                  style={{
                    display: 'none',
                    fontSize: '1rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    color: 'var(--color-primary-dark)',
                    textTransform: 'uppercase'
                  }}
                >
                  {b.name}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
          {isBn
            ? '*আমরা সমস্ত প্রধান ভারতীয় এবং আন্তর্জাতিক অ্যাপ্লায়েন্স ব্র্যান্ডের জন্য প্রত্যয়িত টেকনিশিয়ান সরবরাহ করি।'
            : '*Certified multi-brand technicians equipped with genuine OEM-grade spare parts.'}
        </div>
      </div>
    </section>
  );
}
