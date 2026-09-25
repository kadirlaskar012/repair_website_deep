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
  Wrench,
  ChevronRight,
  Zap,
  Award,
  ThumbsUp,
  MapPin
} from 'lucide-react';
import Link from 'next/link';

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

  // Appliance sub-types supported
  const subTypes: Record<string, { en: string[]; bn: string[] }> = {
    'ac-repair': {
      en: ['Split AC', 'Window AC', 'Inverter AC', 'Cassette / Commercial AC'],
      bn: ['স্প্লিট এসি', 'উইন্ডো এসি', 'ইনভার্টার এসি', 'ক্যাসেট ও কমার্শিয়াল এসি']
    },
    'fridge-repair': {
      en: ['Single Door', 'Double Door', 'Side-by-Side', 'Frost-Free / Inverter'],
      bn: ['সিঙ্গেল ডোর', 'ডাবল ডোর', 'সাইড-বাই-সাইড', 'ফ্রস্ট-ফ্রি ইনভার্টার']
    },
    'washing-machine-repair': {
      en: ['Front Load', 'Top Load', 'Semi-Automatic', 'Washer-Dryer Combo'],
      bn: ['ফ্রন্ট লোড', 'টপ লোড', 'সেমি-অটোমেটিক', 'ওয়াশার-ড্রায়ার কম্বো']
    },
    'microwave-repair': {
      en: ['Solo Microwave', 'Grill Microwave', 'Convection Oven', 'Built-in OTG'],
      bn: ['সোলো মাইক্রোওয়েভ', 'গ্রিল মাইক্রোওয়েভ', 'কনভেকশন ওভেন', 'বিল্ট-ইন ওটিজি']
    },
    'led-tv-repair': {
      en: ['Smart LED TV', '4K Ultra HD', 'OLED / QLED TV', 'Android TV'],
      bn: ['স্মার্ট এলইডি টিভি', '৪কে আল্ট্রা এইচডি', 'ওএলইডি / কিউএলইডি', 'অ্যান্ড্রয়েড টিভি']
    }
  };

  const currentSubTypes = subTypes[category.slug] || {
    en: ['Doorstep Inspection', 'Genuine Spares', 'Emergency Fix', 'Multi-point Test'],
    bn: ['ডোরস্টেপ পরিদর্শন', 'আসল পার্টস', 'জরুরি মেরামত', 'মাল্টি-পয়েন্ট টেস্ট']
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
        {/* Category Hero with Real Photography & Breadcrumbs */}
        <section
          style={{
            backgroundColor: 'var(--color-bg-base)',
            borderBottom: '1px solid var(--color-border-light)',
            paddingTop: '32px',
            paddingBottom: '48px',
            position: 'relative'
          }}
        >
          <div className="container">
            {/* Breadcrumb Navigation */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8125rem',
                color: 'var(--color-text-muted)',
                marginBottom: '20px'
              }}
            >
              <Link href={isBn ? '/bn' : '/'} style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                {isBn ? 'হোম' : 'Home'}
              </Link>
              <ChevronRight size={14} />
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                {isBn ? `${category.nameBn} সার্ভিস` : `${category.name} Service`}
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '36px',
                alignItems: 'center'
              }}
            >
              {/* Left Column: Headline, Description & CTAs */}
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
                    marginBottom: '14px'
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>{isBn ? `সার্টিফাইড ${category.nameBn} স্পেশালিস্ট` : `Certified ${category.name} Specialists`}</span>
                </div>

                <h1
                  style={{
                    fontSize: 'clamp(2rem, 3.8vw, 2.625rem)',
                    fontWeight: 800,
                    color: 'var(--color-text-main)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.22,
                    marginBottom: '14px'
                  }}
                >
                  {isBn
                    ? `${category.nameBn} - ডোরস্টেপ রোগ নির্ণয় ও মেরামত পরিষেবা`
                    : `Professional ${category.name} at Your Doorstep in Kolkata & West Bengal`}
                </h1>

                <p
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '20px'
                  }}
                >
                  {isBn ? category.fullDescBn : category.fullDesc}
                </p>

                {/* Sub-types Pills Strip */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {(isBn ? currentSubTypes.bn : currentSubTypes.en).map((type, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.78125rem',
                        fontWeight: 600,
                        color: 'var(--color-text-main)',
                        backgroundColor: 'var(--color-bg-card)',
                        border: '1px solid var(--color-border-light)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        boxShadow: 'var(--shadow-xs)'
                      }}
                    >
                      ✓ {type}
                    </span>
                  ))}
                </div>

                {/* Fixed ₹299 Visit Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: 'var(--color-accent-light)',
                    border: '1px solid rgba(232, 163, 61, 0.45)',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    color: '#7A5212',
                    fontWeight: 600,
                    marginBottom: '24px'
                  }}
                >
                  <span>{isBn ? 'স্থির ডোরস্টেপ ভিজিট ও রোগ নির্ণয় ফি:' : 'Fixed Doorstep Inspection Fee:'}</span>
                  <strong style={{ color: '#000000', fontSize: '1.0625rem', fontWeight: 800 }}>₹299</strong>
                  <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>({isBn ? 'স্বচ্ছ কোটেশন' : 'Upfront Quote'})</span>
                </div>

                {/* CTAs: 3 channels (Book, Call, WhatsApp) */}
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <button
                    onClick={handleDirectBook}
                    className="btn btn-primary btn-md"
                    style={{ minWidth: '180px' }}
                  >
                    <Calendar size={18} />
                    <span>{isBn ? 'সার্ভিস বুক করুন' : 'Book Doorstep Service'}</span>
                  </button>

                  <a
                    href={`tel:${settings.phone}`}
                    className="btn btn-outline btn-md"
                  >
                    <Phone size={18} />
                    <span>{t.callNow}</span>
                  </a>

                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`Hi, I need assistance with ${category.name} in Kolkata/West Bengal.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-md"
                  >
                    <MessageCircle size={18} />
                    <span>{t.whatsappChat}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Real Category Service Image with Trust Badges */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '350px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 14px 36px rgba(0, 0, 0, 0.12)'
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
                    background: 'rgba(15, 23, 42, 0.88)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.8125rem',
                    fontWeight: 600
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={18} style={{ color: 'var(--color-accent)' }} />
                    <span>{isBn ? 'ভেরিফায়েড বিশেষজ্ঞ' : 'Verified Technician'}</span>
                  </div>
                  <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>
                    {isBn ? '৩০ দিনের পূর্ণ গ্যারান্টি' : '30-Day Guarantee'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars Trust Strip */}
        <section style={{ backgroundColor: 'var(--color-bg-card)', borderBottom: '1px solid var(--color-border-light)', padding: '24px 0' }}>
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)', flexShrink: 0 }}>
                  <Zap size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
                    {isBn ? '৯০ মিনিটে আগমন' : '90-Min Quick Arrival'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {isBn ? 'কলকাতা ও পার্শ্ববর্তী অঞ্চলে' : 'Across Kolkata & suburbs'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7A5212', flexShrink: 0 }}>
                  <Award size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
                    {isBn ? '৩০ দিনের ওয়ারেন্টি' : '30-Day Guarantee'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {isBn ? 'সম্পূর্ণ নির্ভরযোগ্য সার্ভিস' : 'On all completed repairs'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(99, 102, 241, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366F1', flexShrink: 0 }}>
                  <Wrench size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
                    {isBn ? '১০০% আসল পার্টস' : '100% Genuine Spares'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {isBn ? 'ব্র্যান্ডেড ওইএম যন্ত্রাংশ' : 'Direct OEM certified'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', flexShrink: 0 }}>
                  <ThumbsUp size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
                    {isBn ? 'স্বচ্ছ ₹২৯৯ পরিদর্শন' : '₹299 Upfront Visit'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {isBn ? 'কোনো গোপন চার্জ নেই' : 'No hidden fee protocol'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Content Body */}
        <section className="section" style={{ backgroundColor: 'var(--color-bg-warm)' }}>
          <div className="container" style={{ maxWidth: '980px' }}>
            {/* 1. Brand Selector for this Appliance */}
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

            {/* 3. Simple 4-Step Repair Process */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-light)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(24px, 4vw, 36px)',
                marginBottom: '40px',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {isBn ? 'সহজ প্রক্রিয়া' : 'Easy 4-Step Workflow'}
                </span>
                <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-text-main)', marginTop: '4px' }}>
                  {isBn ? `আমাদের ${category.nameBn} মেরামত যেভাবে কাজ করে` : `How Our ${category.name} Service Works`}
                </h3>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px'
                }}
              >
                <div style={{ textAlign: 'center', padding: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                    1
                  </div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '6px', color: 'var(--color-text-main)' }}>
                    {isBn ? 'স্লট বুক করুন' : 'Book or Call'}
                  </h4>
                  <p style={{ fontSize: '0.78125rem', color: 'var(--color-text-muted)', lineHeight: 1.45 }}>
                    {isBn ? 'ওয়েবসাইটে ফর্ম পূরণ করুন অথবা ফোনে স্লট নিশ্চিত করুন।' : 'Select your problem online or call us directly.'}
                  </p>
                </div>

                <div style={{ textAlign: 'center', padding: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                    2
                  </div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '6px', color: 'var(--color-text-main)' }}>
                    {isBn ? 'ডোরস্টেপ ডায়াগনোসিস' : 'Doorstep Visit'}
                  </h4>
                  <p style={{ fontSize: '0.78125rem', color: 'var(--color-text-muted)', lineHeight: 1.45 }}>
                    {isBn ? 'দক্ষ টেকনিশিয়ান ₹২৯৯ ফিতে আপনার বাড়ি এসে সমস্যা চিহ্নিত করবেন।' : 'Certified tech arrives to inspect at ₹299 flat fee.'}
                  </p>
                </div>

                <div style={{ textAlign: 'center', padding: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                    3
                  </div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '6px', color: 'var(--color-text-main)' }}>
                    {isBn ? 'স্বচ্ছ কোটেশন' : 'Upfront Quote'}
                  </h4>
                  <p style={{ fontSize: '0.78125rem', color: 'var(--color-text-muted)', lineHeight: 1.45 }}>
                    {isBn ? 'কাজের অনুমোদন দিলে তবেই মেরামতের কাজ শুরু হবে।' : 'Exact repair & parts quote provided for your approval.'}
                  </p>
                </div>

                <div style={{ textAlign: 'center', padding: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                    4
                  </div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '6px', color: 'var(--color-text-main)' }}>
                    {isBn ? 'অন-স্পট ফিক্স' : 'Fix & Warranty'}
                  </h4>
                  <p style={{ fontSize: '0.78125rem', color: 'var(--color-text-muted)', lineHeight: 1.45 }}>
                    {isBn ? 'আসল পার্টসে তাৎক্ষণিক কাজ এবং ৩০ দিনের সার্ভিস ওয়ারেন্টি।' : 'Instant fix backed by our 30-day service warranty.'}
                  </p>
                </div>
              </div>
            </div>

            {/* 4. ₹299 Pricing / Diagnosis Explanation Box */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-card)',
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

            {/* Supported Brands for this Category (Interlinking Hub) */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-light)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                marginBottom: '40px',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '1.0625rem', fontWeight: 800, margin: 0, color: 'var(--color-text-main)' }}>
                  {isBn ? `${category.nameBn} এর জন্য শীর্ষ সমর্থিত ব্র্যান্ডসমূহ` : `Supported Brands for ${category.name}`}
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>
                  {isBn
                    ? 'নির্দিষ্ট ব্র্যান্ডের ডায়াগনোসিস ও এরর কোড দেখতে ক্লিক করুন'
                    : 'Click any brand to view dedicated error code diagnostics & doorstep booking'}
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                  gap: '10px'
                }}
              >
                {(brands.filter((b) => b.categoryIds.includes(category.id)).length > 0
                  ? brands.filter((b) => b.categoryIds.includes(category.id))
                  : brands.slice(0, 12)
                ).map((b) => {
                  const targetUrl = isBn ? `/bn/brands/${b.id}` : `/brands/${b.id}`;
                  return (
                    <Link
                      key={b.id}
                      href={targetUrl}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-bg-base)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-main)',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                      className="hover-card"
                    >
                      <span>{b.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 5. Service Areas / Localities Strip */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-light)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                marginBottom: '40px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <MapPin size={18} style={{ color: 'var(--color-primary)' }} />
                <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--color-text-main)' }}>
                  {isBn ? `${category.nameBn} কভারেজ এরিয়া (কলকাতা, হাওড়া, হুগলি ও বারাসাত)` : `${category.name} Coverage Areas (Kolkata, Howrah, Hooghly & Barasat)`}
                </h4>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {locations.map((loc) => (
                  <span
                    key={loc.id}
                    style={{
                      fontSize: '0.78125rem',
                      fontWeight: 600,
                      backgroundColor: 'var(--color-bg-alt)',
                      color: 'var(--color-text-main)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--color-border-light)'
                    }}
                  >
                    📍 {isBn ? loc.nameBn : loc.name}
                  </span>
                ))}
              </div>
            </div>

            {/* 6. Category FAQ Accordion */}
            <FAQAccordion faqs={faqs} lang={lang} />

            {/* 7. Bottom Booking CTA Card */}
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

      {/* Sticky Mobile Quick Action Bar */}
      <div
        className="mobile-sticky-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'var(--color-bg-card)',
          borderTop: '1px solid var(--color-border-light)',
          padding: '10px 16px',
          display: 'none',
          alignItems: 'center',
          gap: '10px',
          zIndex: 90,
          boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.1)'
        }}
      >
        <button
          onClick={handleDirectBook}
          className="btn btn-primary"
          style={{ flex: 1, padding: '10px 12px', fontSize: '0.875rem' }}
        >
          <Calendar size={16} />
          <span>{isBn ? 'বুকিং (₹২৯৯)' : 'Book @ ₹299'}</span>
        </button>
        <a
          href={`tel:${settings.phone}`}
          className="btn btn-outline"
          style={{ padding: '10px 14px' }}
          aria-label="Call Now"
        >
          <Phone size={18} />
        </a>
        <a
          href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp"
          style={{ padding: '10px 14px' }}
          aria-label="WhatsApp"
        >
          <MessageCircle size={18} />
        </a>
      </div>

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
