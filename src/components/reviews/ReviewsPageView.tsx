'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Star, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Header from '@/components/header/Header';
import LocationBar from '@/components/header/LocationBar';
import Footer from '@/components/footer/Footer';
import ReviewsSection from '@/components/home/ReviewsSection';
import CtaBanner from '@/components/home/CtaBanner';
import BookingModal from '@/components/modal/BookingModal';
import SearchModal from '@/components/search/SearchModal';
import {
  Category,
  Brand,
  LocationItem,
  SiteSettings,
  SearchKeywordItem,
  Review,
  Language
} from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface ReviewsPageViewProps {
  reviews: Review[];
  categories: Category[];
  brands: Brand[];
  locations: LocationItem[];
  settings: SiteSettings;
  keywords: SearchKeywordItem[];
  lang: Language;
}

export default function ReviewsPageView({
  reviews,
  categories,
  brands,
  locations,
  settings,
  keywords,
  lang
}: ReviewsPageViewProps) {
  const isBn = lang === 'bn';
  const t = getDictionary(lang);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <LocationBar locations={locations} lang={lang} phone={settings.phone} />
      <Header
        categories={categories}
        lang={lang}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        phone={settings.phone}
        whatsapp={settings.whatsapp}
      />

      <main>
        {/* Breadcrumb & Hero Banner */}
        <section
          style={{
            backgroundColor: 'var(--color-bg-warm)',
            paddingTop: '28px',
            paddingBottom: '32px',
            borderBottom: '1px solid var(--color-border-light)'
          }}
        >
          <div className="container">
            {/* Breadcrumbs */}
            <nav
              aria-label="Breadcrumb"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8125rem',
                color: 'var(--color-text-muted)',
                marginBottom: '20px'
              }}
            >
              <Link
                href={isBn ? '/bn' : '/'}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'inherit' }}
              >
                <Home size={14} />
                <span>{t.home}</span>
              </Link>
              <ChevronRight size={14} />
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                {isBn ? 'গ্রাহক রিভিউ ও রেটিং' : 'Customer Reviews'}
              </span>
            </nav>

            <div style={{ maxWidth: '800px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(245, 158, 11, 0.12)',
                  color: '#B45309',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  marginBottom: '14px'
                }}
              >
                <Award size={16} />
                <span>{isBn ? '১০০% আসল ও যাচাইকৃত গ্রাহক অভিজ্ঞতা' : '100% Genuine Verified Doorstep Reviews'}</span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 800,
                  color: 'var(--color-text-main)',
                  lineHeight: 1.2,
                  marginBottom: '12px'
                }}
              >
                {isBn
                  ? 'কলকাতা ও পশ্চিমবঙ্গের গ্রাহকদের বাস্তব মতামত ও রেটিং'
                  : 'Customer Reviews & Real Feedback Across West Bengal'}
              </h1>

              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                {isBn
                  ? 'আমাদের টেকনিশিয়ানদের সময়ানুবর্তিতা, মেরামতের গুণমান, ৯০ দিনের ওয়ারেন্টি এবং স্বচ্ছ সাশ্রয়ী সার্ভিস চার্জ সম্পর্কে সরাসরি গৃহস্থ গ্রাহকদের মূল্যায়ন দেখুন।'
                  : 'Read genuine reviews from families across Kolkata, Salt Lake, Howrah, and districts regarding technician punctuality, transparent upfront pricing, and 90-day spare parts warranty.'}
              </p>
            </div>
          </div>
        </section>

        {/* Dedicated Reviews Section with Filters, Overview & Submission Modal */}
        <ReviewsSection reviews={reviews} lang={lang} />

        {/* Final Booking Call to Action */}
        <CtaBanner
          lang={lang}
          onOpenBooking={() => setIsBookingOpen(true)}
          phone={settings.phone}
          whatsapp={settings.whatsapp}
        />
      </main>

      <Footer
        settings={settings}
        categories={categories}
        locations={locations}
        lang={lang}
      />

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        categories={categories}
        problems={[]}
        keywords={keywords}
        lang={lang}
        onSelectProblem={() => setIsBookingOpen(true)}
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
