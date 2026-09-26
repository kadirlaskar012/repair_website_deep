import React from 'react';
import { ShieldCheck, BadgePercent, ClockCheck, Wrench } from 'lucide-react';
import { TrustItem, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface TrustSectionProps {
  items: TrustItem[];
  lang: Language;
}

export default function TrustSection({ items, lang }: TrustSectionProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';

  const renderIcon = (name: string) => {
    switch (name) {
      case 'badge-percent':
        return <BadgePercent size={28} />;
      case 'clock-check':
        return <ClockCheck size={28} />;
      case 'shield-check':
      default:
        return <ShieldCheck size={28} />;
    }
  };

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-bg-base)', borderTop: '1px solid var(--color-border-light)', borderBottom: '1px solid var(--color-border-light)' }}>
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-badge">
            <span>{isBn ? 'নির্ভরযোগ্যতার অঙ্গীকার' : 'Customer Guarantee'}</span>
          </div>
          <h2 className="section-title">{t.trustHeading}</h2>
          <p className="section-subtitle">{t.trustSubtitle}</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px'
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="card card-hover"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
                padding: '32px 24px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                {renderIcon(item.iconName)}
              </div>

              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--color-text-main)' }}>
                {isBn ? item.titleBn : item.title}
              </h3>

              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                {isBn ? item.subtitleBn : item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
