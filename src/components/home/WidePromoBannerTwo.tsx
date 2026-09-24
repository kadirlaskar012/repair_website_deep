'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { Language } from '@/lib/types';
import homepageImages from '@/lib/homepage-images.json';

interface WidePromoBannerTwoProps {
  lang: Language;
  onOpenBooking: () => void;
}

export default function WidePromoBannerTwo({ lang, onOpenBooking }: WidePromoBannerTwoProps) {
  const isBn = lang === 'bn';

  return (
    <section style={{ padding: '36px 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <div
          style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            minHeight: '260px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Real Background Photo */}
          <Image
            src={homepageImages.promo_banner_2 || "/images/expert_banner_modern.jpg"}
            alt="Appliance Repair Specialists"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          />

          {/* Dark Modern Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(20, 108, 91, 0.95) 0%, rgba(20, 108, 91, 0.85) 45%, rgba(20, 108, 91, 0.35) 100%)',
              zIndex: 1
            }}
          />

          {/* Content */}
          <div className="promo-banner-content">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                marginBottom: '16px'
              }}
            >
              <Award size={14} />
              <span>{isBn ? 'গুণমানের প্রতিশ্রুতি' : 'Quality Commitment'}</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.375rem)',
                fontWeight: 800,
                lineHeight: 1.22,
                color: '#FFFFFF',
                marginBottom: '12px'
              }}
            >
              {isBn
                ? '১০০% জেনুইন পার্টস ও ৩০ দিনের সার্ভিস গ্যারান্টি'
                : '100% Genuine Spare Parts & 30-Day Guarantee'}
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.875rem, 1.4vw, 1rem)',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.6,
                marginBottom: '22px'
              }}
            >
              {isBn
                ? 'কোনো গোপন চার্জ নেই। টেকনিশিয়ানের পরিদর্শনের পর আপনার অনুমোদনের পরেই কাজ শুরু হয়। প্রতিটি পার্টসে ব্র্যান্ড ওয়ারেন্টি।'
                : 'Zero hidden charges. No repair begins without your prior quote approval. Original brand components with replacement warranty.'}
            </p>

            <button
              onClick={onOpenBooking}
              className="btn btn-accent btn-md"
              style={{
                borderRadius: '10px',
                fontWeight: 800,
                boxShadow: '0 4px 14px rgba(232, 163, 61, 0.4)'
              }}
            >
              <span>{isBn ? 'টেকনিশিয়ান বুক করুন' : 'Schedule Doorstep Visit'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
