'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Language } from '@/lib/types';
import { homeFaqs } from '@/lib/seo-data';

interface HomeFaqSectionProps {
  lang: Language;
}

export default function HomeFaqSection({ lang }: HomeFaqSectionProps) {
  const isBn = lang === 'bn';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      aria-label="Frequently Asked Questions"
      style={{
        backgroundColor: 'var(--color-bg-warm)',
        padding: 'clamp(44px, 6vw, 68px) 0',
        borderBottom: '1px solid var(--color-border-light)'
      }}
    >
      <div className="container" style={{ maxWidth: '880px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary-dark)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              marginBottom: '12px'
            }}
          >
            <HelpCircle size={15} />
            <span>{isBn ? 'সাধারণ প্রশ্নাবলী' : 'Frequently Asked Questions'}</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3.2vw, 2.25rem)',
              fontWeight: 800,
              color: 'var(--color-text-main)',
              letterSpacing: '-0.02em',
              lineHeight: 1.25
            }}
          >
            {isBn
              ? 'হোম অ্যাপ্লায়েন্স মেরামত সম্পর্কিত সাধারণ জিজ্ঞাস্য'
              : 'Everything You Need to Know About Our Doorstep Service'}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            {isBn
              ? 'পরিদর্শন ফি, সময়সূচি, আসল পার্টস ও ওয়ারেন্টি সংক্রান্ত সমস্ত তথ্য'
              : 'Answers to common questions about technician arrival, ₹299 inspection fee, and warranties'}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {homeFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const questionText = isBn ? faq.questionBn : faq.question;
            const answerText = isBn ? faq.answerBn : faq.answer;

            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border-light)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                  boxShadow: isOpen ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: isOpen ? 'var(--color-primary)' : 'var(--color-text-main)',
                      lineHeight: 1.35
                    }}
                  >
                    {questionText}
                  </span>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'var(--color-primary-light)' : 'var(--color-bg-alt)',
                      color: isOpen ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--transition-fast)'
                    }}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 22px 20px 22px',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.65,
                      borderTop: '1px solid var(--color-border-light)',
                      paddingTop: '14px'
                    }}
                  >
                    <p style={{ margin: 0 }}>{answerText}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
