'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Snowflake,
  Refrigerator,
  Disc3,
  Radio,
  Tv,
  Clock,
  Sparkles
} from 'lucide-react';
import { Category, Language } from '@/lib/types';
import homepageImages from '@/lib/homepage-images.json';

interface ApplianceCategoriesProps {
  categories: Category[];
  lang: Language;
}

export default function ApplianceCategories({ categories, lang }: ApplianceCategoriesProps) {
  const isBn = lang === 'bn';

  // Category specific curated metadata
  const categoryMeta: Record<
    string,
    {
      img: string;
      badge: string;
      badgeBn: string;
      pills: string[];
      pillsBn: string[];
      icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
      accentColor: string;
    }
  > = {
    'ac-repair': {
      img: homepageImages.cat_ac || '/images/split_ac_unit.jpg',
      badge: 'Split & Window AC',
      badgeBn: 'স্প্লিট ও উইন্ডো এসি',
      pills: ['Jet Pump Cleaning', 'Gas Leakage Refill', 'PCB Repair'],
      pillsBn: ['জেট পাম্প ক্লিনিং', 'গ্যাস লিকেজ রিফিল', 'পিসিবি সার্কিট মেরামত'],
      icon: Snowflake,
      accentColor: '#0284C7'
    },
    'fridge-repair': {
      img: homepageImages.cat_fridge || '/images/samsung_fridge_unit.jpg',
      badge: 'Single & Double Door',
      badgeBn: 'সিঙ্গেল ও ডাবল ডোর',
      pills: ['Cooling Coil Gas', 'Compressor Relay', 'Excess Frost Fix'],
      pillsBn: ['কুলিং গ্যাস চার্জিং', 'কম্প্রেসার রিলে', 'অতিরিক্ত বরফ সমাধান'],
      icon: Refrigerator,
      accentColor: '#0D9488'
    },
    'washing-machine-repair': {
      img: homepageImages.cat_washing || '/images/front_load_washer.jpg',
      badge: 'Front & Top Load',
      badgeBn: 'ফ্রন্ট ও টপ লোড',
      pills: ['Motor & Belt Fix', 'Drum Noise / Vibration', 'OE Drain Error'],
      pillsBn: ['মোটর ও বেল্ট মেরামত', 'ড্রাম ভাইব্রেশন ও শব্দ', 'ড্রেনেজ ও ই এরর'],
      icon: Disc3,
      accentColor: '#6366F1'
    },
    'microwave-repair': {
      img: homepageImages.cat_microwave || '/images/microwave_oven_unit.jpg',
      badge: 'Solo, Grill & Convection',
      badgeBn: 'গ্রিল ও কনভেকশন',
      pills: ['Magnetron Heating', 'Spark Inside Chamber', 'Touch Panel / Keypad'],
      pillsBn: ['ম্যাগনেট্রন হিটিং ফিক্স', 'স্পার্কিং ও শর্ট সার্কিট', 'টাচ প্যানেল ও কিপ্যাড'],
      icon: Radio,
      accentColor: '#EA580C'
    },
    'led-tv-repair': {
      img: homepageImages.cat_led_tv || '/images/smart_led_tv_unit.jpg',
      badge: 'Smart LED, 4K & OLED',
      badgeBn: 'স্মার্ট ৪কে ও ওএলইডি',
      pills: ['Black Screen / Backlight', 'Motherboard Power Supply', 'Sound Only No Picture'],
      pillsBn: ['ব্ল্যাক স্ক্রিন ব্যাকলাইট', 'মাদারবোর্ড ও পাওয়ার', 'ছবি নেই কেবল শব্দ'],
      icon: Tv,
      accentColor: '#8B5CF6'
    }
  };

  return (
    <section
      style={{
        backgroundColor: 'var(--color-bg-base)',
        padding: '52px 0',
        borderBottom: '1px solid var(--color-border-light)'
      }}
      id="appliance-repair"
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary-dark)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px'
            }}
          >
            <Sparkles size={16} />
            <span>{isBn ? 'ডোরস্টেপ মেরামত ক্যাটাগরি' : 'Doorstep Repair Categories'}</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.375rem)',
              fontWeight: 800,
              color: 'var(--color-text-main)',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
              marginBottom: '12px'
            }}
          >
            {isBn ? 'আমাদের প্রধান ৫টি বিশেষায়িত অ্যাপ্লায়েন্স মেরামত সেবা' : 'Our 5 Specialized Appliance Repair Services'}
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.55,
              margin: 0
            }}
          >
            {isBn
              ? 'নিচের যেকোনো ক্যাটাগরিতে ক্লিক করে সমস্যা নির্বাচন করুন। অভিজ্ঞ টেকনিশিয়ানের ডোরস্টেপ ভিজিট মাত্র ₹২৯৯ এবং রয়েছে ৩০ দিনের গ্যারান্টি।'
              : 'Click any category below to explore dedicated problem diagnostics, transparent ₹299 inspection charges, and instant doorstep booking across Kolkata & West Bengal.'}
          </p>
        </div>

        {/* 5 Real Product Cards Grid (Responsive 5-column grid on desktop, 2-column on mobile) */}
        <div className="five-col-grid">
          {categories.map((c) => {
            const meta = categoryMeta[c.slug] || {
              img: '/images/ac_unit.jpg',
              badge: 'Appliance Care',
              badgeBn: 'অ্যাপ্লায়েন্স সেবা',
              pills: ['Inspection', 'Original Spares', 'Doorstep Fix'],
              pillsBn: ['পরিদর্শন', 'অরিজিনাল পার্টস', 'ডোরস্টেপ সমাধান'],
              icon: ShieldCheck,
              accentColor: 'var(--color-primary)'
            };

            const IconComponent = meta.icon;

            return (
              <Link
                key={c.id}
                href={isBn ? `/bn/${c.slug}` : `/${c.slug}`}
                className="card card-hover"
                style={{
                  textDecoration: 'none',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--color-bg-card)',
                  border: '1.5px solid var(--color-border-light)',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s, border-color 0.25s'
                }}
              >
                {/* Real Appliance Unit Photo Container */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '175px',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-bg-alt)'
                  }}
                >
                  <Image
                    src={meta.img}
                    alt={isBn ? c.nameBn : c.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.45) 0%, transparent 60%)'
                    }}
                  />

                  {/* Top-Left: Visit Fee Badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: 'var(--color-primary-dark)',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      padding: '4px 9px',
                      borderRadius: 'var(--radius-full)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                      letterSpacing: '0.02em',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    {isBn ? '₹২৯৯ ভিজিট' : '₹299 Visit'}
                  </span>

                  {/* Top-Right: Appliance Type Pill */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(15, 23, 42, 0.85)',
                      color: '#FFFFFF',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      backdropFilter: 'blur(6px)'
                    }}
                  >
                    {isBn ? meta.badgeBn : meta.badge}
                  </span>

                  {/* Bottom Icon Avatar */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '12px',
                      width: '34px',
                      height: '34px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: meta.accentColor
                    }}
                  >
                    <IconComponent size={18} />
                  </div>
                </div>

                {/* Content Body */}
                <div
                  style={{
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: '1.0625rem',
                        fontWeight: 800,
                        color: 'var(--color-text-main)',
                        marginBottom: '6px',
                        lineHeight: 1.3
                      }}
                    >
                      {isBn ? c.nameBn : c.name}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.78125rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.45,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        marginBottom: '10px'
                      }}
                    >
                      {isBn ? c.shortDescBn : c.shortDesc}
                    </p>

                    {/* Micro Highlights Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {(isBn ? meta.pillsBn : meta.pills).slice(0, 2).map((pill, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            color: 'var(--color-text-muted)',
                            backgroundColor: 'var(--color-bg-alt)',
                            border: '1px solid var(--color-border-light)',
                            padding: '2px 7px',
                            borderRadius: '4px'
                          }}
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '12px',
                      borderTop: '1px solid var(--color-border-light)',
                      color: 'var(--color-primary)',
                      fontSize: '0.8125rem',
                      fontWeight: 700
                    }}
                  >
                    <span>{isBn ? 'সার্ভিস ও বুকিং দেখুন' : 'Explore Service'}</span>
                    <ArrowRight size={15} />
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

