import React from 'react';
import { Check, AlertCircle, ShieldAlert, ArrowRight } from 'lucide-react';
import { Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface PricingSectionProps {
  lang: Language;
  onOpenBooking: () => void;
}

export default function PricingSection({ lang, onOpenBooking }: PricingSectionProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';

  return (
    <section className="section" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-badge">
            <span>{isBn ? 'স্বচ্ছ মূল্য নীতি' : 'Pricing Transparency'}</span>
          </div>
          <h2 className="section-title">{t.pricingHeading}</h2>
          <p className="section-subtitle">{t.pricingSubtitle}</p>
        </div>

        {/* Pricing Card & Clarification Box */}
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div
            style={{
              backgroundColor: 'var(--color-bg-warm)',
              border: '2px solid var(--color-primary-light)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(24px, 5vw, 44px)',
              boxShadow: 'var(--shadow-md)',
              position: 'relative'
            }}
          >
            {/* Top Tag */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
              <span
                style={{
                  background: 'var(--color-primary)',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                {isBn ? 'প্রমিত ডোরস্টেপ ফি' : 'Standard Doorstep Fee'}
              </span>

              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                {isBn ? 'সপ্তাহের ৭ দিনই প্রযোজ্য' : 'All 7 Days Across West Bengal'}
              </span>
            </div>

            {/* Price Headline */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>
                ₹299
              </span>
              <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                {isBn ? 'ভিজিট ও ডায়াগনোসিস ফি' : 'Visit & Diagnosis Fee'}
              </span>
            </div>

            {/* Mandatory Clear Disclaimer Box */}
            <div
              style={{
                backgroundColor: 'var(--color-accent-light)',
                border: '1.5px solid rgba(232, 163, 61, 0.4)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 20px',
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}
            >
              <AlertCircle size={22} style={{ color: 'var(--color-accent-dark)', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.9375rem', color: '#68450F', lineHeight: 1.5 }}>
                <strong>{isBn ? 'গুরুত্বপূর্ণ স্পষ্টীকরণ:' : 'Important Notice:'}</strong>{' '}
                {isBn
                  ? '₹২৯৯ শুধুমাত্র বাড়িতে এসে টেকনিশিয়ানের পুঙ্খানুপুঙ্খ পরিদর্শন এবং রোগ নির্ণয় ফি। মেরামতের আসল খরচ টেকনিশিয়ান স্পটেই পরীক্ষা করে কোটেশন দেন এবং আপনার সম্পূর্ণ অনুমোদনের পরেই যেকোনো মেরামতের কাজ শুরু হয়।'
                  : '₹299 is ONLY the visit, inspection & diagnosis fee. It is NOT the repair price. Repair cost is confirmed after technician diagnosis and strictly upon customer approval before any repair work begins.'}
              </div>
            </div>

            {/* Checklist of What's Included */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '14px', color: 'var(--color-text-main)' }}>
                {isBn ? '₹২৯৯ ডায়াগনোসিস ফির মধ্যে অন্তর্ভুক্ত:' : 'What is included in the ₹299 inspection:'}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  t.pricingPoint1,
                  t.pricingPoint2,
                  t.pricingPoint3,
                  t.pricingPoint4,
                  t.pricingPoint5
                ].map((pt, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9375rem' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking Trigger */}
            <button
              onClick={onOpenBooking}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <span>{isBn ? 'মাত্র ₹২৯৯-এ পরিদর্শন বুক করুন' : 'Book Technician Diagnosis at ₹299'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
