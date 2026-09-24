'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Phone, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { Language } from '@/lib/types';

interface WidePromoBannerProps {
  lang: Language;
  onOpenBooking: () => void;
  phone: string;
}

export default function WidePromoBanner({ lang, onOpenBooking, phone }: WidePromoBannerProps) {
  const isBn = lang === 'bn';

  return (
    <section style={{ padding: '36px 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <div
          style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            minHeight: '280px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Real Background Photo */}
          <Image
            src="/images/banner_comfort.jpg"
            alt="Appliance Repair in West Bengal"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />

          {/* Clean Modern Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.82) 45%, rgba(15, 23, 42, 0.3) 100%)',
              zIndex: 1
            }}
          />

          {/* Banner Content */}
          <div className="promo-banner-content">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(232, 163, 61, 0.2)',
                border: '1px solid #E8A33D',
                color: '#E8A33D',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                marginBottom: '16px'
              }}
            >
              <Clock size={14} />
              <span>{isBn ? 'আজকেই ডোরস্টেপ সমাধান' : 'Same-Day Doorstep Fix'}</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                color: '#FFFFFF',
                marginBottom: '12px'
              }}
            >
              {isBn ? 'হঠাৎ ফ্রিজ বা এসি নষ্ট? আজই মেরামত করুন।' : 'Sudden Breakdown? We Fix It Today.'}
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                color: 'rgba(255, 255, 255, 0.88)',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}
            >
              {isBn
                ? 'কলকাতা ও পশ্চিমবঙ্গের যে কোনো প্রান্তে মাত্র ৬০ মিনিটে সার্টিফাইড টেকনিশিয়ান। স্বচ্ছ ₹২৯৯ পরিদর্শনে ১০০% জেনুইন পার্টসের নিশ্চয়তা।'
                : 'Certified doorstep appliance specialists across Kolkata, Howrah & West Bengal. Fixed ₹299 inspection with genuine spare parts warranty.'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <button
                onClick={onOpenBooking}
                className="btn btn-accent btn-md"
                style={{
                  borderRadius: '10px',
                  fontWeight: 800,
                  boxShadow: '0 4px 14px rgba(232, 163, 61, 0.4)'
                }}
              >
                <span>{isBn ? 'এখনই বুক করুন' : 'Book Technician Now'}</span>
                <ArrowRight size={16} />
              </button>

              <a
                href={`tel:${phone}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'rgba(255, 255, 255, 0.16)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  backdropFilter: 'blur(6px)',
                  transition: 'background 0.2s'
                }}
              >
                <Phone size={16} />
                <span>{phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
