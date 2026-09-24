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
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '16px'
          }}
        >
          {brands.map((b) => (
            <div
              key={b.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '20px 16px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-xs)',
                transition: 'transform 0.15s, border-color 0.15s'
              }}
              className="card-hover"
            >
              {b.logoUrl ? (
                <img
                  src={b.logoUrl}
                  alt={b.name}
                  style={{ maxHeight: '36px', maxWidth: '100%', objectFit: 'contain' }}
                />
              ) : (
                <span
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: 'var(--color-text-main)',
                    textTransform: 'uppercase'
                  }}
                >
                  {b.name}
                </span>
              )}
            </div>
          ))}
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
