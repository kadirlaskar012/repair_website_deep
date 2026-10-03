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
    <section className="section" style={{ backgroundColor: 'var(--color-bg-base)' }}>
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
              backgroundColor: 'var(--color-bg-card)',
              border: '2px solid rgba(20, 108, 91, 0.25)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(24px, 5vw, 44px)',
              boxShadow: '0 12px 36px rgba(20, 108, 91, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)',
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
                {isBn ? 'স্বচ্ছ ও সাশ্রয়ী সার্ভিস' : 'Transparent & Affordable Pricing'}
              </span>

              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                {isBn ? 'সপ্তাহের ৭ দিনই প্রযোজ্য' : 'All 7 Days Across West Bengal'}
              </span>
            </div>

            {/* Price Headline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              <span style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1.2 }}>
                {isBn ? 'স্বচ্ছ ও সাশ্রয়ী মূল্য ব্যবস্থা' : 'Transparent & Honest Pricing'}
              </span>
              <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                {isBn ? 'ফোনে কথা বলে সঠিক খরচের ধারণা নিন • কাজের আগে স্পষ্ট কোটেশন' : 'Discuss on call for initial estimate • Upfront quote before repair begins'}
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
                <strong>{isBn ? 'মূল্য সংক্রান্ত স্বচ্ছতা:' : 'Pricing Transparency:'}</strong>{' '}
                {isBn
                  ? 'আমরা সম্পূর্ণ স্বচ্ছ ও সাশ্রয়ী মূল্যে বিশ্বাসী। আপনি ফোনে কথা বলে প্রাথমিক খরচের ধারণা নিতে পারেন। এরপর টেকনিশিয়ান স্পটেই পুঙ্খানুপুঙ্খ পরীক্ষা করে কাজ শুরুর আগেই সঠিক কোটেশন জানিয়ে অনুমোদন নেন।'
                  : 'We believe in 100% upfront transparency. Discuss your appliance issue over the phone to get an immediate estimate. Our certified technician inspects the unit on-site and provides an exact quotation before any repair begins.'}
              </div>
            </div>

            {/* Checklist of What's Included */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '14px', color: 'var(--color-text-main)' }}>
                {isBn ? 'আমাদের সেবার মধ্যে অন্তর্ভুক্ত:' : 'What is included in our service:'}
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
              <span>{isBn ? 'ডোরস্টেপ টেকনিশিয়ান বুক করুন' : 'Schedule Doorstep Technician'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
