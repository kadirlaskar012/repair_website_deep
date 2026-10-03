'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/header/Header';
import LocationBar from '@/components/header/LocationBar';
import Footer from '@/components/footer/Footer';
import SearchModal from '@/components/search/SearchModal';
import BookingModal from '@/components/modal/BookingModal';
import { Category, Brand, LocationItem, SiteSettings, Language } from '@/lib/types';
import { MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface LocationsIndexViewProps {
  locations: LocationItem[];
  categories: Category[];
  brands: Brand[];
  settings: SiteSettings;
  lang: Language;
}

export default function LocationsIndexView({
  locations,
  categories,
  brands,
  settings,
  lang
}: LocationsIndexViewProps) {
  const isBn = lang === 'bn';
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-light)' }}>
      <Header
        categories={categories}
        lang={lang}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBooking={() => setBookingOpen(true)}
        phone={settings.phone}
        whatsapp={settings.whatsapp}
      />
      <LocationBar locations={locations} lang={lang} phone={settings.phone} />

      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', padding: '36px 16px 64px', width: '100%' }}>
        {/* Header Banner */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(30, 58, 138, 0.08)', color: 'var(--color-primary)', padding: '5px 14px', borderRadius: '20px', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '12px' }}>
            <MapPin size={14} />
            <span>{isBn ? 'গ্রেটার কলকাতা জুড়ে ৩০টি ডোরস্টেপ সার্ভিস হাব' : '30 Doorstep Hubs Across Greater Kolkata'}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            {isBn ? 'আমাদের সার্ভিস এরিয়া ও ডোরস্টেপ কভারেজ হাবসমূহ' : 'Our Service Areas & Doorstep Coverage Hubs'}
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            {isBn
              ? 'Appliance Seva কলকাতা, সল্টলেক, নিউ টাউন, হাওড়া, হুগলি, উত্তর ও দক্ষিণ ২৪ পরগনা জুড়ে ৩০টি ডেডিকেটেড হাবের মাধ্যমে মাত্র ৪৫-৬০ মিনিটে ডোরস্টেপ টেকনিশিয়ান সার্ভিস প্রদান করে।'
              : 'Appliance Seva provides decentralized 45-60 minute technician dispatch across 30 dedicated hubs covering Kolkata, Salt Lake, New Town, Howrah, Hooghly, North & South 24 Parganas.'}
          </p>
        </div>

        {/* 30 Locations Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px'
          }}
        >
          {locations.map((loc) => {
            const locName = isBn ? loc.nameBn : loc.name;
            const localities = (isBn ? loc.popularLocalitiesBn : loc.popularLocalities) || [];
            const responseText = isBn ? (loc.responseTimeBn || '৪৫-৬০ মিনিট') : (loc.responseTime || '45-60 Mins');
            const locAddress = isBn ? (loc.addressBn || loc.address) : (loc.address || loc.addressBn);
            const locLink = isBn ? `/bn/locations/${loc.hashSlug}` : `/locations/${loc.hashSlug}`;

            return (
              <div
                key={loc.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                      <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>
                        {locName}
                      </h2>
                    </div>
                    {loc.pincode && (
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          backgroundColor: 'rgba(232, 163, 61, 0.15)',
                          color: '#B45309',
                          padding: '2px 8px',
                          borderRadius: '8px'
                        }}
                      >
                        {isBn ? `পিন: ${loc.pincode}` : `PIN: ${loc.pincode}`}
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '12px', lineHeight: 1.4 }}>
                    {locAddress}
                  </p>

                  {localities.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
                      {localities.slice(0, 4).map((area, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            backgroundColor: 'var(--color-bg-warm)',
                            border: '1px solid var(--color-border-light)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            color: 'var(--color-text-main)'
                          }}
                        >
                          {area}
                        </span>
                      ))}
                      {localities.length > 4 && (
                        <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                          +{localities.length - 4} {isBn ? 'আরও' : 'more'}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-light)', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>
                    <Clock size={12} />
                    <span>{responseText}</span>
                  </div>

                  <Link
                    href={locLink}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                      textDecoration: 'none'
                    }}
                  >
                    <span>{isBn ? 'হাব বিবরণ' : 'View Hub'}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer settings={settings} categories={categories} locations={locations} lang={lang} />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        categories={categories}
        problems={[]}
        keywords={[]}
        lang={lang}
      />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        categories={categories}
        brands={brands}
        lang={lang}
      />
    </div>
  );
}
