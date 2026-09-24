'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShieldCheck, ChevronRight, ArrowRight } from 'lucide-react';
import { Category, Problem, Language } from '@/lib/types';
import homepageImages from '@/lib/homepage-images.json';

interface MostBookedServicesProps {
  categories: Category[];
  problems: Problem[];
  lang: Language;
  onSelectProblem: (problem: Problem) => void;
  onOpenBooking: () => void;
}

export default function MostBookedServices({
  categories,
  problems,
  lang,
  onSelectProblem,
  onOpenBooking
}: MostBookedServicesProps) {
  const isBn = lang === 'bn';

  const featured = [
    {
      id: 'ac-jet',
      title: isBn ? 'স্প্লিট এসি জেট সার্ভিস ও গ্যাস চেক' : 'Split AC Jet Service & Gas Check',
      categorySlug: 'ac-repair',
      categoryId: 'ac-repair',
      image: homepageImages.service_ac || '/images/ac_service.jpg',
      badge: isBn ? 'সর্বাধিক বুকড' : 'Bestseller',
      badgeColor: '#146C5B',
      rating: '4.9',
      reviews: '2.4k',
      problemSnippet: isBn
        ? 'উচ্চ চাপের জেট পাম্পের সাহায্যে ইনডোর ও আউটডোর কয়েল সম্পূর্ণ পরিষ্কার এবং গ্যাস লিকেজ চেক।'
        : 'High-pressure jet wash for indoor & outdoor coils, complete airflow restoration and cooling check.'
    },
    {
      id: 'fridge-cool',
      title: isBn ? 'ডাবল ডোর ফ্রিজ কুলিং মেরামত' : 'Double Door Fridge Cooling Repair',
      categorySlug: 'fridge-repair',
      categoryId: 'fridge-repair',
      image: homepageImages.service_fridge || '/images/fridge_service.jpg',
      badge: isBn ? 'দ্রুত সমাধান' : 'Fast 60-Min',
      badgeColor: '#E8A33D',
      rating: '4.8',
      reviews: '1.8k',
      problemSnippet: isBn
        ? 'কম্প্রেসার রানিং সমস্যা, থার্মোস্ট্যাট সেন্সর ও ডিফ্রস্ট টাইমার ত্রুটি দূর করা।'
        : 'Thermostat sensor diagnosis, compressor check, and defrost timer circuit restoration.'
    },
    {
      id: 'washing-drum',
      title: isBn ? 'ফ্রন্ট লোড ওয়াশার ড্রাম ও মোটর' : 'Front Load Washer Drum & Motor',
      categorySlug: 'washing-machine-repair',
      categoryId: 'washing-machine-repair',
      image: homepageImages.service_washing || '/images/washing_service.jpg',
      badge: isBn ? 'সার্টিফাইড পার্টস' : 'Genuine Spares',
      badgeColor: '#6366F1',
      rating: '4.9',
      reviews: '1.5k',
      problemSnippet: isBn
        ? 'ড্রাম ঘূর্ণন সমস্যা, অতিরিক্ত কম্পন ও পানি নিষ্কাশন ব্লকেজ দ্রুত মেরামত।'
        : 'Drum bearing replacement, spin motor diagnostics, and water drainage pump fix.'
    },
    {
      id: 'micro-heat',
      title: isBn ? 'মাইক্রোওয়েভ হিটিং ও ম্যাগনেট্রন' : 'Microwave Magnetron & Heating',
      categorySlug: 'microwave-repair',
      categoryId: 'microwave-repair',
      image: homepageImages.service_microwave || '/images/microwave_service.jpg',
      badge: isBn ? 'বিশেষজ্ঞ সেবা' : 'Expert Service',
      badgeColor: '#EA580C',
      rating: '4.8',
      reviews: '980',
      problemSnippet: isBn
        ? 'খাবার গরম না হওয়া, স্পার্কিং বা টাচ প্যানেল ত্রুটির নিরাপদ ডোরস্টেপ সমাধান।'
        : 'High-voltage diode, fuse, capacitor and magnetron diagnosis with safe electrical testing.'
    },
    {
      id: 'led-display',
      title: isBn ? 'স্মার্ট এলইডি টিভি স্ক্রিন ও মাদারবোর্ড' : 'Smart LED TV Display & Motherboard',
      categorySlug: 'led-tv-repair',
      categoryId: 'led-tv-repair',
      image: homepageImages.service_led_tv || '/images/led_tv_service.jpg',
      badge: isBn ? 'ওয়ারেন্টি সহ' : 'Warranty Backed',
      badgeColor: '#8B5CF6',
      rating: '4.9',
      reviews: '1.1k',
      problemSnippet: isBn
        ? 'ডিসপ্লেতে দাগ, ব্যাকলাইট অন্ধকার বা সাউন্ড আছে কিন্তু ছবি নেই সমস্যার সমাধান।'
        : 'LED backlight strip replacement, T-Con board diagnostics, and power supply repairs.'
    }
  ];

  const handleCardClick = (item: typeof featured[0]) => {
    // Find matching problem in DB or mock one
    const found = problems.find((p) => p.categoryId === item.categoryId);
    if (found) {
      onSelectProblem(found);
    } else {
      onSelectProblem({
        id: 'mock-' + item.id,
        categoryId: item.categoryId,
        title: item.title,
        titleBn: item.title,
        description: item.problemSnippet,
        descriptionBn: item.problemSnippet,
        symptoms: ['Cooling / Operation fault', 'Noise / performance degradation'],
        symptomsBn: ['কুলিং বা অপারেশন ত্রুটি', 'অতিরিক্ত শব্দ বা পারফরম্যান্স কমে যাওয়া'],
        commonCauses: 'Component wear and tear or electrical sensor drift',
        commonCausesBn: 'যন্ত্রাংশের ক্ষয়ক্ষতি বা বৈদ্যুতিক সেন্সর ত্রুটি',
        solutionNote: 'Certified diagnosis and genuine replacement parts',
        solutionNoteBn: 'সার্টিফাইড রোগ নির্ণয় ও জেনুইন পার্টস প্রতিস্থাপন',
        diagnosticFeeNote: 'Fixed ₹299 inspection fee applies',
        diagnosticFeeNoteBn: 'স্থির ₹২৯৯ পরিদর্শন ও ডায়াগনোসিস ফি প্রযোজ্য',
        sortOrder: 1,
        isActive: true
      });
    }
  };

  return (
    <section style={{ backgroundColor: '#F8FAF9', padding: '48px 0', borderTop: '1px solid var(--color-border-light)' }}>
      <div className="container">
        {/* Section Header with "View All" on the right */}
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
              <span>{isBn ? 'জনপ্রিয় পরিষেবা' : 'Popular Services'}</span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>
              {isBn ? 'সর্বাধিক বুক করা হোম সার্ভিস' : 'Most Booked Services'}
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
            <span>{isBn ? 'সবগুলো দেখুন' : 'View All'}</span>
            <ChevronRight size={18} />
          </Link>
        </div>

        {/* 5 Cards Row (Responsive 5-column grid on desktop, swipeable on mobile) */}
        <div className="five-col-grid">
          {featured.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(item); }}
              className="card card-hover"
              style={{
                cursor: 'pointer',
                borderRadius: '14px',
                overflow: 'hidden',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FFFFFF',
                border: '1px solid var(--color-border-light)'
              }}
            >
              {/* Photo Area with Badge */}
              <div style={{ position: 'relative', width: '100%', height: '145px', overflow: 'hidden' }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  style={{ objectFit: 'cover' }}
                />
                
                {/* Top Badge */}
                <span
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: item.badgeColor,
                    color: '#FFFFFF',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {item.badge}
                </span>

                {/* Rating Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    background: 'rgba(0, 0, 0, 0.75)',
                    color: '#FFFFFF',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}
                >
                  <Star size={11} fill="#F59E0B" color="#F59E0B" />
                  <span>{item.rating}</span>
                </div>
              </div>

              {/* Text Info */}
              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: 700,
                      color: 'var(--color-text-main)',
                      lineHeight: 1.35,
                      marginBottom: '6px'
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.4,
                      marginBottom: '12px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {item.problemSnippet}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--color-border-light)'
                  }}
                >
                  <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    {isBn ? '₹২৯৯ পরিদর্শন' : '₹299 Visit'}
                  </div>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--color-primary-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px'
                    }}
                  >
                    <span>{isBn ? 'বুক' : 'Book'}</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
