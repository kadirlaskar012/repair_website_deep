'use client';

import React, { useState } from 'react';
import Header from '@/components/header/Header';
import LocationBar from '@/components/header/LocationBar';
import Hero from '@/components/home/Hero';
import SpotlightCards from '@/components/home/SpotlightCards';
import MostBookedServices from '@/components/home/MostBookedServices';
import WidePromoBanner from '@/components/home/WidePromoBanner';
import ApplianceCategories from '@/components/home/ApplianceCategories';
import WidePromoBannerTwo from '@/components/home/WidePromoBannerTwo';
import TrustSection from '@/components/home/TrustSection';
import BrandsSection from '@/components/home/BrandsSection';
import PricingSection from '@/components/home/PricingSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import CtaBanner from '@/components/home/CtaBanner';
import Footer from '@/components/footer/Footer';
import SearchModal from '@/components/search/SearchModal';
import ServiceDetailsModal from '@/components/modal/ServiceDetailsModal';
import BookingModal from '@/components/modal/BookingModal';
import {
  Category,
  Problem,
  Brand,
  LocationItem,
  TrustItem,
  Review,
  SiteSettings,
  SearchKeywordItem,
  Language
} from '@/lib/types';

interface HomePageViewProps {
  categories: Category[];
  problems: Problem[];
  brands: Brand[];
  locations: LocationItem[];
  trustItems: TrustItem[];
  reviews: Review[];
  settings: SiteSettings;
  keywords: SearchKeywordItem[];
  lang: Language;
}

export default function HomePageView({
  categories,
  problems,
  brands,
  locations,
  trustItems,
  reviews,
  settings,
  keywords,
  lang
}: HomePageViewProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [bookingProblem, setBookingProblem] = useState<string>('');

  const handleOpenBookingWithProblem = (p: Problem) => {
    setSelectedProblem(null);
    setBookingProblem(lang === 'bn' ? p.titleBn : p.title);
    setIsBookingOpen(true);
  };

  const handleDirectBooking = () => {
    setBookingProblem('');
    setIsBookingOpen(true);
  };

  return (
    <>
      <LocationBar locations={locations} lang={lang} />
      <Header
        categories={categories}
        lang={lang}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBooking={handleDirectBooking}
        phone={settings.phone}
        whatsapp={settings.whatsapp}
      />

      <main>
        {/* 1. Hero with Organic Graphics, Dual Search/Location Pill & Quick Icons */}
        <Hero
          categories={categories}
          locations={locations}
          lang={lang}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenBooking={handleDirectBooking}
          phone={settings.phone}
        />

        {/* 2. Top 3 Spotlight Banner Cards (Real Photos) */}
        <SpotlightCards
          lang={lang}
          onOpenBooking={handleDirectBooking}
        />

        {/* 3. Most Booked Services (Real Photos & Badges) */}
        <MostBookedServices
          categories={categories}
          problems={problems}
          lang={lang}
          onSelectProblem={(p) => setSelectedProblem(p)}
          onOpenBooking={handleDirectBooking}
        />

        {/* 4. Wide Feature Banner #1 (Sudden Breakdown) */}
        <WidePromoBanner
          lang={lang}
          onOpenBooking={handleDirectBooking}
          phone={settings.phone}
        />

        {/* 5. Appliance Repair by Category (Real Appliance Unit Photos) */}
        <ApplianceCategories
          categories={categories}
          lang={lang}
        />

        {/* 6. Wide Feature Banner #2 (Genuine Spares & 30-Day Guarantee) */}
        <WidePromoBannerTwo
          lang={lang}
          onOpenBooking={handleDirectBooking}
        />

        {/* 7. Brands We Service with Brand Selector */}
        <BrandsSection
          brands={brands}
          lang={lang}
        />

        {/* 8. Trust Section (Verified Techs, Transparent, Warranty) */}
        <TrustSection
          items={trustItems}
          lang={lang}
        />

        {/* 9. Pricing / Diagnosis Explanation (₹299 Visit Fee) */}
        <PricingSection
          lang={lang}
          onOpenBooking={handleDirectBooking}
        />

        {/* 10. Customer Reviews (Homepage only) */}
        <ReviewsSection
          reviews={reviews}
          lang={lang}
        />

        {/* 11. Final Contact / Booking CTA */}
        <CtaBanner
          lang={lang}
          onOpenBooking={handleDirectBooking}
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
        problems={problems}
        keywords={keywords}
        lang={lang}
        onSelectProblem={(p) => setSelectedProblem(p)}
      />

      <ServiceDetailsModal
        problem={selectedProblem}
        category={categories.find((c) => c.id === selectedProblem?.categoryId)}
        isOpen={Boolean(selectedProblem)}
        onClose={() => setSelectedProblem(null)}
        onBookNow={handleOpenBookingWithProblem}
        phone={settings.phone}
        whatsapp={settings.whatsapp}
        lang={lang}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        categories={categories}
        brands={brands}
        initialProblem={bookingProblem}
        lang={lang}
      />
    </>
  );
}
