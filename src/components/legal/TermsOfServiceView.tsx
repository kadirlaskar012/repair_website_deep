'use client';

import React, { useState } from 'react';
import Header from '@/components/header/Header';
import LocationBar from '@/components/header/LocationBar';
import Footer from '@/components/footer/Footer';
import SearchModal from '@/components/search/SearchModal';
import BookingModal from '@/components/modal/BookingModal';
import { Category, Brand, LocationItem, SiteSettings, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface TermsOfServiceViewProps {
  categories: Category[];
  brands: Brand[];
  locations: LocationItem[];
  settings: SiteSettings;
  lang: Language;
}

export default function TermsOfServiceView({
  categories,
  brands,
  locations,
  settings,
  lang
}: TermsOfServiceViewProps) {
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
              {isBn ? 'সেবার নিয়মাবলী ও শর্তাবলী (Terms of Service)' : 'Terms of Service'}
            </h1>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
              {isBn ? 'সর্বশেষ আপডেট: সেপ্টেম্বর ২০২৬' : 'Last Updated: September 2026'}
            </div>

            <div style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: '#2C3A37', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p>
                {isBn
                  ? `AC Repair Service (acrepairservice.com) এর মাধ্যমে ডোরস্টেপ সার্ভিস বুক করার মাধ্যমে আপনি নিচের শর্তাবলীতে সম্মতি প্রদান করছেন:`
                  : `By scheduling a doorstep appliance service through AC Repair Service (acrepairservice.com), you acknowledge and agree to the following terms and operational guidelines:`}
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                {isBn ? '১. ₹২৯৯ পরিদর্শন ও ডায়াগনোসিস ফি' : '1. Standard ₹299 Visit & Diagnosis Fee'}
              </h2>
              <p>
                {isBn
                  ? `₹২৯৯ হলো টেকনিশিয়ানের বাড়িতে এসে পুঙ্খানুপুঙ্খ পরীক্ষা এবং রোগ নির্ণয়ের নির্ধারিত ফি। এটি কোনো চূড়ান্ত মেরামতের মূল্য নয়। কোনো যন্ত্রাংশ প্রতিস্থাপন বা মেরামত শুরুর পূর্বে টেকনিশিয়ান স্পটেই সম্পূর্ণ কোটেশন জানিয়ে আপনার অনুমোদন নেবেন। আপনি মেরামতে সম্মতি না দিলেও শুধুমাত্র ₹২৯৯ পরিদর্শন ফি প্রযোজ্য হবে।`
                  : `₹299 represents exclusively the doorstep visit and physical diagnosis fee. It is NOT the repair price. Before any repair work or spare parts replacement begins, our technician provides an itemized quotation. Work commences strictly after your explicit approval. If you decline repair after diagnosis, only the ₹299 inspection fee is payable.`}
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                {isBn ? '২. ৩০ দিনের সার্ভিস ওয়ারেন্টি' : '2. 30-Day Service Warranty'}
              </h2>
              <p>
                {isBn
                  ? `আমাদের টেকনিশিয়ান দ্বারা সফলভাবে সম্পন্ন হওয়া প্রতিটি মেরামতে ৩০ দিনের কাজের ওয়ারেন্টি থাকে। এই সময়ের মধ্যে একই ধরনের সমস্যা পুনরায় দেখা দিলে টেকনিশিয়ান পুনরায় পরীক্ষা করবেন। কোনো যন্ত্রাংশ পরিবর্তন করা হলে প্রস্তুতকারকের গ্যারান্টি প্রযোজ্য হবে।`
                  : `All completed repair work is accompanied by our 30-day workmanship warranty. If the identical fault reoccurs within 30 calendar days of invoice date, technician re-inspection is provided at no extra diagnostic fee. Replaced OEM spare parts carry manufacturer warranty.`}
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                {isBn ? '৩. স্বাধীন পরিষেবা প্রদানকারী' : '3. Independent Service Status'}
              </h2>
              <p>
                {isBn
                  ? `আমরা একটি স্বাধীন মাল্টি-ব্র্যান্ড ডোরস্টেপ মেরামতকারী প্রতিষ্ঠান। উল্লিখিত স্যামসাং, এলজি, ভোল্টাস ইত্যাদি ব্র্যান্ড নাম শুধুমাত্র সামঞ্জস্য ও দক্ষতার তথ্য প্রকাশের উদ্দেশ্যে ব্যবহৃত হয়েছে। সমস্ত ট্রেডমার্ক তাদের মূল স্বত্বাধিকারীর সম্পত্তি।`
                  : `AC Repair Service operates as an independent multi-brand doorstep repair specialist across West Bengal. Brand names such as Samsung, LG, Whirlpool, Voltas, etc. are referenced strictly to indicate compatibility and technician capabilities.`}
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                {isBn ? '৪. হেল্পলাইন' : '4. Support & Grievances'}
              </h2>
              <p>
                {isBn
                  ? `যেকোনো তথ্যের জন্য কল করুন: ${settings.phone} অথবা ইমেল করুন: ${settings.email}।`
                  : `For support inquiries or billing clarifications, call our West Bengal desk at ${settings.phone} or email ${settings.email}.`}
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
