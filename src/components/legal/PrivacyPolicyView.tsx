'use client';

import React, { useState } from 'react';
import Header from '@/components/header/Header';
import LocationBar from '@/components/header/LocationBar';
import Footer from '@/components/footer/Footer';
import SearchModal from '@/components/search/SearchModal';
import BookingModal from '@/components/modal/BookingModal';
import { Category, Brand, LocationItem, SiteSettings, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface PrivacyPolicyViewProps {
  categories: Category[];
  brands: Brand[];
  locations: LocationItem[];
  settings: SiteSettings;
  lang: Language;
}

export default function PrivacyPolicyView({
  categories,
  brands,
  locations,
  settings,
  lang
}: PrivacyPolicyViewProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <LocationBar locations={locations} lang={lang} />
      <Header
        categories={categories}
        lang={lang}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        phone={settings.phone}
        whatsapp={settings.whatsapp}
      />

      <main style={{ backgroundColor: 'var(--color-bg-warm)', padding: '48px 0' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              padding: 'clamp(24px, 5vw, 48px)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '8px' }}>
              {isBn ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy'}
            </h1>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
              {isBn ? 'সর্বশেষ আপডেট: সেপ্টেম্বর ২০২৬' : 'Last Updated: September 2026'}
            </div>

            <div style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: '#2C3A37', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p>
                {isBn
                  ? `AC Repair Service (acrepairservice.com) এ আমরা আপনার ব্যক্তিগত গোপনীয়তাকে সর্বোচ্চ অগ্রাধিকার প্রদান করি। এই নীতিমালায় আমরা ব্যাখ্যা করেছি কীভাবে পশ্চিমবঙ্গ জুড়ে আমাদের ডোরস্টেপ অ্যাপ্লায়েন্স মেরামত পরিষেবা প্রদানের সময় আপনার তথ্য সংগ্রহ ও ব্যবহার করা হয়।`
                  : `At AC Repair Service (acrepairservice.com), we respect and protect the privacy of our customers. This Privacy Policy details how we collect, store, and utilize your personal information when scheduling doorstep appliance repair visits across West Bengal.`}
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                {isBn ? '১. যে তথ্য আমরা সংগ্রহ করি' : '1. Information We Collect'}
              </h2>
              <p>
                {isBn
                  ? `যখন আপনি আমাদের ওয়েবসাইটে ডোরস্টেপ সার্ভিস বুক করেন, আমরা আপনার নাম, ১০-ডিজিটের মোবাইল নম্বর, মেরামতের সম্পূর্ণ ঠিকানা, অ্যাপ্লায়েন্সের ধরন এবং পছন্দের তারিখ/সময় সংগ্রহ করি।`
                  : `When you schedule a technician visit through our booking form, we collect your full name, 10-digit mobile contact number, physical service address, appliance category/brand, and preferred service date and time.`}
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                {isBn ? '২. তথ্যের ব্যবহার' : '2. How We Use Your Information'}
              </h2>
              <p>
                {isBn
                  ? `সংগৃহীত তথ্য শুধুমাত্র টেকনিশিয়ান সমন্বয়, সময় স্লট নিশ্চিতকরণ, আপনার ঠিকানায় পৌঁছানো এবং মেরামতের বিল ও ওয়ারেন্টি সেবা প্রদানের কাজে ব্যবহৃত হয়। আমরা কখনোই কোনো তৃতীয় পক্ষের কাছে আপনার ডেটা বিক্রি বা আদান-প্রদান করি না।`
                  : `Your information is strictly utilized to coordinate certified technicians, confirm service appointments via telephone/WhatsApp, reach your premises, and validate our 30-day service warranty. We never sell, rent, or trade customer contact details.`}
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                {isBn ? '৩. ডেটা নিরাপত্তা' : '3. Data Security'}
              </h2>
              <p>
                {isBn
                  ? `আমাদের সমস্ত যোগাযোগ SSL এনক্রিপশনের মাধ্যমে সুরক্ষিত এবং ডেটা নিরাপদ সার্ভারে সংরক্ষিত থাকে।`
                  : `All booking leads and inquiries are transmitted over encrypted TLS/SSL connections and stored in secure MySQL infrastructure with industry-standard access restrictions.`}
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                {isBn ? '৪. যোগাযোগ' : '4. Contacting Us'}
              </h2>
              <p>
                {isBn
                  ? `আপনার তথ্য সংক্রান্ত যেকোনো প্রশ্নের জন্য আমাদের সাথে যোগাযোগ করুন: ${settings.email} অথবা ফোন করুন: ${settings.phone}।`
                  : `If you have any questions or wish to update your service records, contact our desk at ${settings.email} or call ${settings.phone}.`}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer
        settings={settings}
        categories={categories}
        locations={locations}
        lang={lang}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        categories={categories}
        problems={[]}
        keywords={[]}
        lang={lang}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        categories={categories}
        brands={brands}
        lang={lang}
      />
    </>
  );
}
