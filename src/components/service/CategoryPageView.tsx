'use client';

import React, { useState } from 'react';
import Header from '@/components/header/Header';
import LocationBar from '@/components/header/LocationBar';
import Footer from '@/components/footer/Footer';
import SearchModal from '@/components/search/SearchModal';
import ServiceDetailsModal from '@/components/modal/ServiceDetailsModal';
import BookingModal from '@/components/modal/BookingModal';
import BrandSelector from '@/components/service/BrandSelector';
import ProblemsList from '@/components/service/ProblemsList';
import FAQAccordion from '@/components/service/FAQAccordion';
import {
  Category,
  Problem,
  Brand,
  LocationItem,
  SiteSettings,
  SearchKeywordItem,
  Language
} from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import {
  ShieldCheck,
  Phone,
  MessageCircle,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  Wrench
} from 'lucide-react';

interface CategoryPageViewProps {
  category: Category;
  categories: Category[];
  problems: Problem[];
  brands: Brand[];
  locations: LocationItem[];
  settings: SiteSettings;
  keywords: SearchKeywordItem[];
  faqs: { q: string; a: string }[];
  lang: Language;
}

export default function CategoryPageView({
  category,
  categories,
  problems,
  brands,
  locations,
  settings,
  keywords,
  faqs,
  lang
}: CategoryPageViewProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  // Brand selection
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [bookingProblem, setBookingProblem] = useState<string>('');

  const handleOpenBookingWithProblem = (p: Problem) => {
    setSelectedProblem(null);
    setBookingProblem(isBn ? p.titleBn : p.title);
    setIsBookingOpen(true);
  };

  const handleDirectBook = () => {
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
        onOpenBooking={handleDirectBook}
        phone={settings.phone}
        whatsapp={settings.whatsapp}
      />

      <main>
        {/* Category Hero with Real Photography */}
        <section
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--color-border-light)',
            paddingTop: '40px',
            paddingBottom: '48px',
            position: 'relative'
          }}
        >
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '36px',
                alignItems: 'center'
              }}
            >
              {/* Left Column: Text & CTAs */}
              <div>
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
                    marginBottom: '16px'
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>{isBn ? `${category.nameBn} বিশেষজ্ঞ` : `Certified ${category.name} Specialists`}</span>
                </div>

                <h1
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 800,
                    color: 'var(--color-text-main)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    marginBottom: '16px'
                  }}
                >
                  {isBn ? `${category.nameBn} - ডোরস্টেপ রোগ নির্ণয় ও মেরামত` : `Professional ${category.name} at Your Doorstep in West Bengal`}
                </h1>

                <p
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '24px'
                  }}
                >
                  {isBn ? category.fullDescBn : category.fullDesc}
                </p>

                {/* Fixed ₹299 Visit Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--color-accent-light)',
                    border: '1px solid rgba(232, 163, 61, 0.4)',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    color: '#7A5212',
                    fontWeight: 600,
                    marginBottom: '24px'
                  }}
                >
                  <span>{isBn ? 'স্থির ডোরস্টেপ ভিজিট ও রোগ নির্ণয় ফি:' : 'Doorstep Inspection & Diagnostic Fee:'}</span>
                  <strong style={{ color: '#000000', fontSize: '1rem' }}>₹299</strong>
                </div>

                {/* CTAs: 3 channels (Book, Call, WhatsApp) */}
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <button
                    onClick={handleDirectBook}
                    className="btn btn-primary btn-md"
                    style={{ minWidth: '180px' }}
                  >
                    <Calendar size={18} />
                    <span>{isBn ? 'সার্ভিস বুক করুন' : 'Book Service'}</span>
                  </button>

                  <a
                    href={`tel:${settings.phone}`}
                    className="btn btn-outline btn-md"
                  >
                    <Phone size={18} />
                    <span>{t.callNow}</span>
                  </a>

                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`Hi, I need assistance with ${category.name} in West Bengal.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-md"
                  >
                    <MessageCircle size={18} />
                    <span>{t.whatsappChat}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Real Category Service Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '340px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)'
                }}
              >
                <img
                  src={
                    category.slug === 'ac-repair'
                      ? '/images/ac_service.jpg'
                      : category.slug === 'fridge-repair'
                      ? '/images/fridge_service.jpg'
                      : category.slug === 'washing-machine-repair'
                      ? '/images/washing_service.jpg'
                      : category.slug === 'microwave-repair'
                      ? '/images/microwave_service.jpg'
                      : '/images/led_tv_service.jpg'
                  }
                  alt={category.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    right: '16px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.8125rem',
                    fontWeight: 600
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={18} style={{ color: 'var(--color-accent)' }} />
                    <span>{isBn ? 'সার্টিফাইড টেকনিশিয়ান' : 'Verified Technician'}</span>
                  </div>
                  <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>
                    {isBn ? '৩০ দিনের ওয়ারেন্টি' : '30-Day Guarantee'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Content Body */}
        <section className="section" style={{ backgroundColor: 'var(--color-bg-warm)' }}>
          <div className="container" style={{ maxWidth: '980px' }}>
            {/* 1. Brand Selector (Both search + grid) */}
            <BrandSelector
              brands={brands}
              selectedBrand={selectedBrand}
              onSelectBrand={setSelectedBrand}
              lang={lang}
            />

            {/* 2. Common Problems / Symptoms List */}
            <ProblemsList
              problems={problems}
              onSelectProblem={(p) => setSelectedProblem(p)}
              lang={lang}
            />

            {/* 3. ₹299 Pricing / Diagnosis Explanation Box */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid var(--color-primary-light)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(20px, 4vw, 36px)',
                marginBottom: '40px',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ background: 'var(--color-primary)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  {isBn ? 'মূল্য নীতি' : 'Pricing Protocol'}
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  {isBn ? 'স্বচ্ছ ₹২৯৯ পরিদর্শন ও ডায়াগনোসিস ফি' : 'Transparent ₹299 Inspection & Diagnosis Fee'}
                </span>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-accent-light)',
                  border: '1px solid rgba(232, 163, 61, 0.4)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 18px',
                  marginBottom: '20px',
                  fontSize: '0.9375rem',
                  color: '#6E490E',
                  lineHeight: 1.5,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}
              >
                <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>{isBn ? 'গুরুত্বপূর্ণ বিজ্ঞপ্তি:' : 'Important Notice:'}</strong>{' '}
                  {isBn
                    ? '₹২৯৯ শুধুমাত্র বাড়িতে এসে টেকনিশিয়ানের পুঙ্খানুপুঙ্খ পরিদর্শন এবং রোগ নির্ণয় ফি। কোনো মেরামতের কাজ শুরু করার আগে টেকনিশিয়ান স্পটেই সম্পূর্ণ কোটেশন জানিয়ে আপনার অনুমোদন নেবেন।'
                    : '₹299 is ONLY the visit and diagnosis fee. Repair cost is confirmed after technician diagnosis and strictly upon customer approval before any repair work begins.'}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-primary)' }} />
                  <span>{isBn ? 'মাল্টিমিটার ও প্রেশার গেজ টেস্ট' : 'Multi-point electrical & pressure test'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-primary)' }} />
                  <span>{isBn ? 'শুধুমাত্র আসল জেনুইন পার্টস' : '100% genuine OEM-grade spare parts'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-primary)' }} />
                  <span>{isBn ? '৩০ দিনের পূর্ণ সার্ভিস ওয়ারেন্টি' : '30-Day complete service warranty'}</span>
                </div>
              </div>
            </div>

            {/* 4. Category FAQ Accordion */}
            <FAQAccordion faqs={faqs} lang={lang} />

            {/* 5. Bottom Booking CTA Card */}
            <div
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(28px, 5vw, 44px)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <h3 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', color: '#FFFFFF', fontWeight: 800, marginBottom: '12px' }}>
                {isBn ? `আজই আপনার ${category.nameBn} মেরামত করান` : `Need Expert ${category.name} in West Bengal Today?`}
              </h3>
              <p style={{ fontSize: '1rem', color: '#D4E8E3', maxWidth: '620px', margin: '0 auto 28px auto', lineHeight: 1.5 }}>
                {isBn
                  ? 'কলকাতা ও পশ্চিমবঙ্গের সমস্ত প্রধান জেলায় একই দিনে অভিজ্ঞ টেকনিশিয়ান পাওয়া যায়। মাত্র ₹২৯৯ পরিদর্শনে সমস্যা চিহ্নিত করুন।'
                  : 'Same-day technician visit across Kolkata and major West Bengal districts. Get complete multi-point diagnosis at just ₹299.'}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '14px' }}>
                <button
                  onClick={handleDirectBook}
                  className="btn btn-accent btn-lg"
                  style={{ minWidth: '220px' }}
                >
                  <Calendar size={18} />
                  <span>{t.bookOnline}</span>
                </button>

                <a
                  href={`tel:${settings.phone}`}
                  className="btn btn-lg"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    border: '1.5px solid rgba(255, 255, 255, 0.4)',
                    minWidth: '180px'
                  }}
                >
                  <Phone size={18} />
                  <span>{settings.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg"
                  style={{ minWidth: '200px' }}
                >
                  <MessageCircle size={18} />
                  <span>{t.whatsappBooking}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
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
        category={category}
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
        initialCategory={category.id}
        initialBrand={selectedBrand}
        initialProblem={bookingProblem}
        lang={lang}
      />
    </>
  );
}
