'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { Category, Language } from '@/lib/types';

interface ApplianceCategoriesProps {
  categories: Category[];
  lang: Language;
}

export default function ApplianceCategories({ categories, lang }: ApplianceCategoriesProps) {
  const isBn = lang === 'bn';

  // Map category slugs to our curated real appliance product shots
  const categoryImages: Record<string, string> = {
    'ac-repair': '/images/split_ac_unit.jpg',
    'fridge-repair': '/images/samsung_fridge_unit.jpg',
    'washing-machine-repair': '/images/front_load_washer.jpg',
    'microwave-repair': '/images/microwave_oven_unit.jpg',
    'led-tv-repair': '/images/smart_led_tv_unit.jpg'
  };

  return (
    <section style={{ backgroundColor: '#FFFFFF', padding: '48px 0' }} id="appliance-repair">
      <div className="container">
        {/* Header with View All */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '0.05em', marginBottom: '4px' }}>
              <span>{isBn ? 'ক্যাটাগরি অনুযায়ী পরিষেবা' : 'Category Discovery'}</span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>
              {isBn ? 'অ্যাপ্লায়েন্স মেরামত সেবা' : 'Appliance Repair Services'}
            </h2>
          </div>

          <Link
            href={isBn ? '/bn/ac-repair' : '/ac-repair'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
              textDecoration: 'none'
            }}
          >
            <span>{isBn ? 'সব ক্যাটাগরি' : 'View All'}</span>
            <ChevronRight size={18} />
          </Link>
        </div>

        {/* 5 Real Product Cards Grid (Responsive 5-column grid on desktop, swipeable on mobile) */}
        <div className="five-col-grid">
          {categories.map((c) => {
            const imgPath = categoryImages[c.slug] || '/images/ac_unit.jpg';

            return (
              <Link
                key={c.id}
                href={isBn ? `/bn/${c.slug}` : `/${c.slug}`}
                className="card card-hover"
                style={{
                  textDecoration: 'none',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#FFFFFF',
                  border: '1px solid var(--color-border-light)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                {/* Real Appliance Unit Photo */}
                <div style={{ position: 'relative', width: '100%', height: '160px', overflow: 'hidden', backgroundColor: '#F1F5F9' }}>
                  <Image
                    src={imgPath}
                    alt={isBn ? c.nameBn : c.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    style={{ objectFit: 'cover' }}
                  />

                  {/* Visit Fee Pill */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: 'var(--color-primary-dark)',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {isBn ? '₹২৯৯ ভিজিট' : '₹299 Visit'}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--color-text-main)',
                        marginBottom: '6px'
                      }}
                    >
                      {isBn ? c.nameBn : c.name}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.45,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {isBn ? c.shortDescBn : c.shortDesc}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '12px',
                      marginTop: '12px',
                      borderTop: '1px solid var(--color-border-light)',
                      color: 'var(--color-primary)',
                      fontSize: '0.8125rem',
                      fontWeight: 700
                    }}
                  >
                    <span>{isBn ? 'সার্ভিস দেখুন' : 'Explore Service'}</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
