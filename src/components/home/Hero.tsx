'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, ArrowRight, Wrench, Snowflake, Refrigerator, Disc3, Radio, Tv, Flame, Sparkles, ChevronDown } from 'lucide-react';
import { Category, LocationItem, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface HeroProps {
  categories: Category[];
  locations: LocationItem[];
  lang: Language;
  onOpenSearch: () => void;
  onOpenBooking: () => void;
  phone: string;
}

export default function Hero({ categories, locations, lang, onOpenSearch, onOpenBooking, phone }: HeroProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';
  const kolkata = locations.find((l) => l.name.toLowerCase() === 'kolkata' || l.id === 'loc-kol') || locations[0];
  const [selectedCity, setSelectedCity] = useState<string>(kolkata ? kolkata.name : 'Kolkata');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedName = localStorage.getItem('preferred_location_name');
    if (savedName && locations.some((l) => l.name === savedName)) {
      setSelectedCity(savedName);
    } else if (kolkata) {
      setSelectedCity(kolkata.name);
    }

    const handleSync = (e: any) => {
      if (e.detail?.name) {
        setSelectedCity(e.detail.name);
      }
    };
    window.addEventListener('appliance_location_changed', handleSync);
    return () => window.removeEventListener('appliance_location_changed', handleSync);
  }, [locations, kolkata]);

  // Quick categories matching the circular icon row in reference screenshot
  const quickItems = [
    {
      id: 'ac',
      title: isBn ? 'এসি রিপেয়ার' : 'AC Repair',
      slug: 'ac-repair',
      icon: Snowflake,
      color: '#0284C7',
      bg: '#E0F2FE'
    },
    {
      id: 'fridge',
      title: isBn ? 'রেফ্রিজারেটর' : 'Refrigerator',
      slug: 'fridge-repair',
      icon: Refrigerator,
      color: '#0D9488',
      bg: '#CCFBF1'
    },
    {
      id: 'washing',
      title: isBn ? 'ওয়াশিং মেশিন' : 'Washing Machine',
      slug: 'washing-machine-repair',
      icon: Disc3,
      color: '#6366F1',
      bg: '#EEF2FF'
    },
    {
      id: 'microwave',
      title: isBn ? 'মাইক্রোওয়েভ' : 'Microwave Oven',
      slug: 'microwave-repair',
      icon: Radio,
      color: '#EA580C',
      bg: '#FFEDD5'
    },
    {
      id: 'tv',
      title: isBn ? 'এলইডি টিভি' : 'LED TV Repair',
      slug: 'led-tv-repair',
      icon: Tv,
      color: '#8B5CF6',
      bg: '#F3E8FF'
    },
    {
      id: 'gas',
      title: isBn ? 'গ্যাস রিফিল' : 'Gas Refill',
      slug: 'ac-repair',
      icon: Flame,
      color: '#DC2626',
      bg: '#FEE2E2'
    },
    {
      id: 'diagnosis',
      title: isBn ? '₹২৯৯ পরিদর্শন' : '₹299 Diagnosis',
      slug: '#pricing',
      icon: Sparkles,
      color: '#D97706',
      bg: '#FEF3C7'
    }
  ];

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    const loc = locations.find((l) => l.name === city);
    if (loc && typeof window !== 'undefined') {
      localStorage.setItem('preferred_location_id', loc.id);
      localStorage.setItem('preferred_location_slug', loc.hashSlug);
      localStorage.setItem('preferred_location_name', loc.name);

      // Instant cross-component sync
      window.dispatchEvent(
        new CustomEvent('appliance_location_changed', {
          detail: { id: loc.id, name: loc.name, nameBn: loc.nameBn, slug: loc.hashSlug }
        })
      );
    }
  };

  return (
    <section
      style={{
        backgroundColor: 'var(--color-bg-base)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '48px',
        paddingBottom: '36px'
      }}
    >
      {/* Decorative Organic Backdrop Shapes (Inspired by HomeTriangle Kolkata) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-40px',
          right: '0',
          maxWidth: '100%',
          width: '340px',
          height: '340px',
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          background: 'radial-gradient(circle, rgba(20, 108, 91, 0.12) 0%, rgba(20, 108, 91, 0.02) 70%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20px',
          left: '-40px',
          width: '180px',
          height: '180px',
          backgroundImage: 'radial-gradient(rgba(20, 108, 91, 0.18) 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
          opacity: 0.7,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* SEO Optimized Trust & Tagline Pill Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary-dark)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              marginBottom: '16px',
              border: '1px solid rgba(20, 108, 91, 0.2)',
              boxShadow: '0 1px 3px rgba(20, 108, 91, 0.08)'
            }}
          >
            <Sparkles size={14} style={{ color: 'var(--color-accent)' }} />
            <span>
              {isBn
                ? `${selectedCity === 'Howrah' ? 'হাওড়া' : selectedCity === 'Hooghly' ? 'হুগলি' : selectedCity === 'Barasat' ? 'বারাসাত' : 'কলকাতা'}-য় #১ বিশ্বস্ত ডোরস্টেপ সার্ভিস • ৯০ মিনিটে আগমন`
                : `#1 Doorstep Appliance Repair in ${selectedCity} • 90-Min Response`}
            </span>
          </div>

          {/* Main Title - Home Appliance Care India */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              fontWeight: 800,
              color: 'var(--color-text-main)',
              letterSpacing: '-0.03em',
              lineHeight: 1.18,
              marginBottom: '14px'
            }}
          >
            {isBn
              ? 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া'
              : 'Home Appliance Care India'}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(0.9375rem, 1.8vw, 1.125rem)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '0 auto 28px auto'
            }}
          >
            {isBn
              ? 'কলকাতা, হাওড়া, হুগলি ও বারাসাত জুড়ে স্প্লিট এসি, ফ্রিজ, ওয়াশিং মেশিন, ওভেন ও টিভির ডোরস্টেপ সার্ভিস। মাত্র ₹২৯৯ পরিদর্শনে সার্টিফাইড বিশেষজ্ঞ ও ৯০ দিনের ওয়ারেন্টি।'
              : 'Expert doorstep technicians across Kolkata, Howrah, Hooghly & Barasat for AC, Refrigerator, Washing Machine, Microwave & TV. 90-day warranty with flat ₹299 inspection fee.'}
          </p>

          {/* HomeTriangle-Style Unified Search & Location Bar */}
          <div className="hero-search-bar">
            {/* Left Segment: Location Selector */}
            <div className="hero-search-location">
              <MapPin size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              <div style={{ textAlign: 'left', flex: 1, minWidth: 0 }}>
                <label
                  htmlFor="hero-city-select"
                  style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-light)', textTransform: 'uppercase', cursor: 'pointer' }}
                >
                  {isBn ? 'শহর / অবস্থান' : 'Location'}
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <select
                    id="hero-city-select"
                    name="selectedCity"
                    aria-label={isBn ? 'শহর / অবস্থান নির্বাচন' : 'Select city or location'}
                    value={selectedCity}
                    onChange={handleCityChange}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: 'var(--color-text-main)',
                      outline: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      padding: 0
                    }}
                  >
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {isBn ? loc.nameBn : loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Right Segment: Search Trigger */}
            <div
              onClick={onOpenSearch}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') onOpenSearch(); }}
              className="hero-search-trigger"
            >
              <Search size={18} style={{ color: 'var(--color-text-light)', flexShrink: 0 }} />
              <span className="hero-search-placeholder">
                {isBn
                  ? 'এসি গ্যাস রিফিল, ফ্রিজ ঠান্ডা না হওয়া, ওয়াশিং মেশিন মেরামত খুঁজুন...'
                  : 'Search for AC repair, fridge cooling, washing machine noise...'}
              </span>

              <button
                type="button"
                className="btn btn-primary btn-sm hero-search-button"
              >
                <span>{isBn ? 'খুঁজুন' : 'Search'}</span>
              </button>
            </div>
          </div>

          {/* Quick Category Icons - Responsive Grid (NO SLIDER) */}
          <div className="quick-icons-grid">
            {quickItems.map((item) => {
              const IconComp = item.icon;
              const isAnchor = item.slug.startsWith('#');
              const href = isAnchor
                ? item.slug
                : (isBn ? `/bn/${item.slug}` : `/${item.slug}`);

              return (
                <Link
                  key={item.id}
                  href={href}
                  prefetch={true}
                  scroll={true}
                  className="quick-icon-item"
                >
                  <div
                    className="quick-icon-circle"
                    style={{
                      backgroundColor: item.bg,
                      color: item.color
                    }}
                  >
                    <IconComp size={24} />
                  </div>
                  <span className="quick-icon-label">
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
