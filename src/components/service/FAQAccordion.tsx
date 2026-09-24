'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface FAQAccordionProps {
  faqs: { q: string; a: string }[];
  lang: Language;
}

export default function FAQAccordion({ faqs, lang }: FAQAccordionProps) {
  const t = getDictionary(lang);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'clamp(20px, 4vw, 36px)', marginBottom: '40px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--color-text-main)', marginBottom: '6px' }}>
          {t.faqsHeading}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          {t.faqsSubtitle}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              style={{
                border: '1px solid var(--color-border-light)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: isOpen ? 'var(--color-bg-warm)' : 'var(--color-bg-card)',
                transition: 'background-color 0.15s'
              }}
            >
              <button
                onClick={() => toggle(idx)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  color: 'var(--color-text-main)',
                  gap: '12px'
                }}
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                    color: 'var(--color-primary)',
                    flexShrink: 0
                  }}
                />
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '0 20px 18px 20px',
                    fontSize: '0.9375rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.6
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
