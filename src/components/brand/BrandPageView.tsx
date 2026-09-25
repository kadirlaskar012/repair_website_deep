'use client';

import React, { useState } from 'react';
import Header from '@/components/header/Header';
import LocationBar from '@/components/header/LocationBar';
import Footer from '@/components/footer/Footer';
import SearchModal from '@/components/search/SearchModal';
import BookingModal from '@/components/modal/BookingModal';
import {
  Category,
  Problem,
  Brand,
  LocationItem,
  SiteSettings,
  SearchKeywordItem,
  Language
} from '@/lib/types';
import { BrandSeoDetail } from '@/lib/brand-seo-data';
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
  ChevronDown,
  MapPin,
  Check,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface BrandPageViewProps {
  brandDetail: BrandSeoDetail;
  brand: Brand;
  categories: Category[];
  problems: Problem[];
  brands: Brand[];
  locations: LocationItem[];
  settings: SiteSettings;
  keywords: SearchKeywordItem[];
  lang: Language;
}

export default function BrandPageView({
  brandDetail,
  brand,
  categories,
  problems,
  brands,
  locations,
  settings,
  keywords,
  lang
}: BrandPageViewProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';

  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [initialProblemNote, setInitialProblemNote] = useState('');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  const phoneHref = `tel:${settings.phone.replace(/\s+/g, '')}`;
  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    isBn
      ? `নমস্কার, আমি ${brand.name} অ্যাপ্লায়েন্স সার্ভিসিং ও মেরামতের জন্য টেকনিশিয়ান বুক করতে চাই।`
      : `Hello, I would like to book a doorstep technician for my ${brand.name} appliance.`
  )}`;

  const handleOpenBooking = (issueNote?: string) => {
    setInitialProblemNote(issueNote || `${brand.name} Repair & Service`);
    setIsBookingOpen(true);
  };

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const logoSrc = brand.logoUrl || `/images/brands/${brand.id}.svg`;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      {/* Header & Sub-Bar */}
      <Header
        categories={categories}
        lang={lang}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
        phone={settings.phone}
        whatsapp={settings.whatsapp}
      />
      <LocationBar locations={locations} lang={lang} />

      {/* Breadcrumbs Navigation */}
      <nav
        aria-label="Breadcrumb"
        style={{
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-bg-card)',
          padding: '10px 0',
          fontSize: '0.85rem'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-light)' }}>
          <Link href={isBn ? '/bn' : '/'} style={{ color: 'inherit', textDecoration: 'none' }} className="hover:underline">
            {isBn ? 'হোম' : 'Home'}
          </Link>
          <ChevronRight size={14} />
          <span>{isBn ? 'ব্র্যান্ড সাপোর্ট' : 'Brands'}</span>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{brand.name}</span>
        </div>
      </nav>

      {/* HERO SECTION - Smart, Flat, High Conversion */}
      <section
        style={{
          padding: '36px 0 44px',
          background: 'linear-gradient(180deg, var(--color-bg-alt) 0%, var(--color-bg) 100%)',
          borderBottom: '1px solid var(--color-border)'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
            {/* Top Brand Logo & Trust Pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '18px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--color-border)',
                  borderRadius: '10px',
                  padding: '6px 16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                <img
                  src={logoSrc}
                  alt={`${brand.name} logo`}
                  style={{ maxHeight: '32px', maxWidth: '110px', width: 'auto', objectFit: 'contain' }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'inline';
                    }
                  }}
                />
                <span style={{ display: 'none', fontWeight: 800, color: 'var(--color-primary-dark)' }}>{brand.name}</span>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(30, 64, 175, 0.08)',
                  color: 'var(--color-primary-dark)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
              >
                <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
                <span>{isBn ? 'সার্টিফাইড মাল্টি-ব্র্যান্ড ডোরস্টেপ সাপোর্ট' : 'Doorstep Multi-Brand Service & Repair Partner'}</span>
              </div>
            </div>

            {/* H1 Primary Title */}
            <h1
              style={{
                fontSize: 'clamp(1.65rem, 3.8vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--color-text)',
                lineHeight: 1.25,
                marginBottom: '14px',
                letterSpacing: '-0.02em'
              }}
            >
              {isBn ? brandDetail.headlineBn : brandDetail.headlineEn}
            </h1>

            {/* Subheadline description */}
            <p
              style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
                maxWidth: '780px',
                margin: '0 auto 26px'
              }}
            >
              {isBn ? brandDetail.subheadlineBn : brandDetail.subheadlineEn}
            </p>

            {/* CTA BUTTONS - Large, Prominent, Easy Click on Mobile */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '32px'
              }}
            >
              <a
                href={phoneHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  padding: '14px 26px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(220, 38, 38, 0.35)',
                  transition: 'all 0.2s ease',
                  minHeight: '48px'
                }}
                className="hover-lift"
              >
                <Phone size={20} />
                <span>{isBn ? `কল করুন: ${settings.phone}` : `Call Now: ${settings.phone}`}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  padding: '14px 22px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
                  transition: 'all 0.2s ease',
                  minHeight: '48px'
                }}
                className="hover-lift"
              >
                <MessageCircle size={20} />
                <span>{isBn ? 'হোয়াটসঅ্যাপ সহায়তা' : 'WhatsApp Us'}</span>
              </a>

              <button
                type="button"
                onClick={() => handleOpenBooking()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '1rem',
                  padding: '14px 22px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(26, 86, 219, 0.25)',
                  transition: 'all 0.2s ease',
                  minHeight: '48px'
                }}
                className="hover-lift"
              >
                <Calendar size={18} />
                <span>{isBn ? 'অনলাইনে টেকনিশিয়ান বুক করুন' : 'Book Doorstep Visit'}</span>
              </button>
            </div>

            {/* FLAT TRUST MARKERS - Single level, NO card in card */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                borderTop: '1px solid var(--color-border)',
                paddingTop: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                <Clock size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text)' }}>
                    {isBn ? '৯০ মিনিটে ডোরস্টেপ' : '90-Min Arrival'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                    {isBn ? 'সমগ্র কলকাতা ও শহরতলী' : 'Across Kolkata & Suburbs'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                <CheckCircle2 size={20} style={{ color: '#16a34a', flexShrink: 0 }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text)' }}>
                    {isBn ? 'মাত্র ₹২৯৯ পরিদর্শন ফি' : 'Flat ₹299 Visit Fee'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                    {isBn ? 'স্বচ্ছ ও আগাম মূল্য' : 'Transparent Diagnostic'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                <ShieldCheck size={20} style={{ color: '#0284c7', flexShrink: 0 }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text)' }}>
                    {isBn ? '৩০ দিনের ওয়ারেন্টি' : '30-Day Warranty'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                    {isBn ? 'প্রতিটি সম্পন্ন মেরামতে' : 'On All Completed Repairs'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                <Wrench size={20} style={{ color: '#d97706', flexShrink: 0 }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text)' }}>
                    {isBn ? 'আসল OEM যন্ত্রাংশ' : 'Genuine OEM Parts'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                    {isBn ? '১০০% আসল ও টেস্টেড' : 'Multi-Brand Compatibility'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW & SPECIALIZED EXPERTISE - Clean single-level container */}
      <section style={{ padding: '40px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--color-text)',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Cpu size={22} style={{ color: 'var(--color-primary)' }} />
              <span>{isBn ? `${brand.name} মেরামত ও ডায়াগনোসিস স্পেশালিটি` : `${brand.name} Engineering & Diagnostic Expertise`}</span>
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
              {isBn ? brandDetail.coverageDescBn : brandDetail.coverageDescEn}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'rgba(239, 68, 68, 0.06)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '0.9rem',
                color: 'var(--color-text)'
              }}
            >
              <AlertCircle size={20} style={{ color: '#dc2626', flexShrink: 0 }} />
              <div>
                <strong>{isBn ? 'জরুরি কলিং সাপোর্ট:' : 'Emergency Assistance:'}</strong>{' '}
                {isBn
                  ? `আপনার ${brand.name} অ্যাপ্লায়েন্স সম্পূর্ণ বন্ধ হলে সরাসরি আমাদের হেল্পলাইনে কল করুন `
                  : `If your ${brand.name} unit has stopped cooling, dripping water or displaying error codes, call our 24x7 desk: `}
                <a href={phoneHref} style={{ color: '#dc2626', fontWeight: 700, textDecoration: 'none' }}>
                  {settings.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ERROR CODES & DIAGNOSTIC SOLUTIONS SECTION - Flat single-level rows, NO card in card */}
      <section style={{ padding: '44px 0', backgroundColor: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ maxWidth: '920px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(26, 86, 219, 0.1)',
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  marginBottom: '8px'
                }}
              >
                {isBn ? 'সমস্যা ও তাৎক্ষণিক সমাধান' : 'Symptom & Error Code Diagnostics'}
              </div>
              <h2 style={{ fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)', fontWeight: 800, color: 'var(--color-text)', margin: '0 0 8px' }}>
                {isBn ? `${brand.name} সাধারণ সমস্যা ও ডোরস্টেপ সমাধান` : `Common ${brand.name} Issues & Field Solutions`}
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', margin: 0 }}>
                {isBn
                  ? 'আমাদের অভিজ্ঞ টেকনিশিয়ানরা যেসকল সমস্যার দ্রুত অন-সাইট সমাধান করেন:'
                  : 'Diagnosed and restored on-site using calibrated multimeters, manifold gauges and genuine components:'}
              </p>
            </div>

            {/* Flat single-level error items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {brandDetail.errorCodes.map((err, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          backgroundColor: '#fee2e2',
                          color: '#dc2626',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: '1px solid #fecaca'
                        }}
                      >
                        {err.code}
                      </span>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                        {isBn ? err.issueBn : err.issueEn}
                      </h3>
                    </div>

                    <a
                      href={phoneHref}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#dc2626',
                        textDecoration: 'none',
                        padding: '6px 12px',
                        backgroundColor: '#fff1f2',
                        borderRadius: '6px',
                        border: '1px solid #ffe4e6'
                      }}
                    >
                      <Phone size={14} />
                      <span>{isBn ? 'সমাধানের জন্য কল করুন' : 'Call for Solution'}</span>
                    </a>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    <Wrench size={16} style={{ color: 'var(--color-primary)', marginTop: '4px', flexShrink: 0 }} />
                    <div>
                      <strong style={{ color: 'var(--color-text)' }}>{isBn ? 'টেকনিশিয়ান সমাধান: ' : 'Certified Resolution: '}</strong>
                      {isBn ? err.solutionBn : err.solutionEn}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action under diagnostics */}
            <div style={{ textAlign: 'center', marginTop: '28px' }}>
              <button
                type="button"
                onClick={() => handleOpenBooking(`${brand.name} Diagnostic & Error Code Fix`)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Calendar size={16} />
                <span>{isBn ? `₹২৯৯ পরিদর্শনে ${brand.name} মেরামত বুক করুন` : `Book ₹299 Diagnostic for ${brand.name}`}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTED APPLIANCES & CATEGORIES - Flat Pill Grid */}
      <section style={{ padding: '40px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px' }}>
              {isBn ? `${brand.name} সমর্থিত পণ্য বিভাগসমূহ` : `Supported ${brand.name} Appliance Models`}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '22px' }}>
              {isBn
                ? 'আমরা সমস্ত মডেলের ইনভার্টার এবং নন-ইনভার্টার ইউনিটের জন্য বিশেষজ্ঞ পরিষেবা প্রদান করি:'
                : 'Complete repair, gas filling and annual maintenance across residential & commercial units:'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {[
                'Inverter Split AC (1 Ton / 1.5 Ton / 2 Ton)',
                '5-Star Heavy Duty Window AC',
                'Cassette & Commercial VRF / Ductable Units',
                'Double Door Frost-Free Refrigerator',
                'Single Door Direct Cool Fridge',
                'Front Load Fully-Automatic Washing Machine',
                'Top Load Smart Inverter Washer',
                'Convection & Grill Microwave Oven'
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Check size={14} style={{ color: '#16a34a' }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE PROCEDURE & PRICING TRANSPARENCY - Flat 3-step row, NO card in card */}
      <section style={{ padding: '44px 0', backgroundColor: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ maxWidth: '920px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 800, color: 'var(--color-text)', margin: '0 0 8px' }}>
                {isBn ? 'সহজ ৩ ধাপে নির্ভরযোগ্য ডোরস্টেপ সার্ভিস' : 'Simple 3-Step Doorstep Repair Process'}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>
                {isBn
                  ? 'কোনো লুকানো চার্জ নেই। সম্পূর্ণ স্বচ্ছ ডায়াগনোসিস এবং লিখিত ওয়ারেন্টি।'
                  : 'Zero hidden surprises. 100% upfront pricing with written 30-day warranty.'}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px'
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '24px 20px',
                  textAlign: 'left'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                    fontSize: '1rem'
                  }}
                >
                  1
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px' }}>
                  {isBn ? '১. কল বা অনলাইন বুকিং' : '1. Call or Book Online'}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {isBn
                    ? `সরাসরি আমাদের হেল্পলাইনে ${settings.phone} কল করুন অথবা সুবিধাজনক সময় স্লটে টেকনিশিয়ান বুক করুন।`
                    : `Call directly at ${settings.phone} or book online. Instant technician dispatch within 90 minutes.`}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '24px 20px',
                  textAlign: 'left'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                    fontSize: '1rem'
                  }}
                >
                  2
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px' }}>
                  {isBn ? '২. মাত্র ₹২৯৯ ডায়াগনোসিস' : '2. Flat ₹299 Diagnosis'}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {isBn
                    ? 'টেকনিশিয়ান বাড়িতে এসে নিখুঁত পরীক্ষা করবেন এবং মেরামতের আগে সঠিক খরচের হিসাব প্রদান করবেন।'
                    : 'Certified engineer visits your home, inspects gas/PCB/load, and provides fixed quote before any work.'}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '24px 20px',
                  textAlign: 'left'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                    fontSize: '1rem'
                  }}
                >
                  3
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px' }}>
                  {isBn ? '৩. মেরামত ও ওয়ারেন্টি' : '3. Repair & Warranty'}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {isBn
                    ? 'আপনার অনুমোদনে জেনুইন যন্ত্রাংশ দিয়ে মেরামত সম্পন্ন হবে এবং ৩০ দিনের লিখিত ওয়ারেন্টি মিলবে।'
                    : 'Job completed on-site with genuine spare parts and covered by our official 30-day service guarantee.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR SEARCH QUERIES / SERVICE CLUSTER (SEO Keywords) */}
      <section style={{ padding: '36px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '14px', textAlign: 'center' }}>
              {isBn ? `${brand.name} কাস্টমার পরিষেবা সম্পর্কিত অনুসন্ধান` : `Popular ${brand.name} Customer Support Searches`}
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {brandDetail.searchedKeywords.map((kw, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleOpenBooking(`${brand.name}: ${kw}`)}
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '20px',
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="hover-card"
                  title={`Book service for ${kw}`}
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRAND FAQS ACCORDION - Clean, single-level items, NO card in card */}
      <section style={{ padding: '44px 0', backgroundColor: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(26, 86, 219, 0.1)',
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  marginBottom: '8px'
                }}
              >
                {isBn ? 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী' : 'Frequently Asked Questions'}
              </div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.6vw, 1.75rem)', fontWeight: 800, color: 'var(--color-text)', margin: '0 0 6px' }}>
                {isBn ? `${brand.name} পরিষেবা সম্পর্কিত সাধারণ প্রশ্নোত্তর` : `${brand.name} Service & Support FAQ`}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {brandDetail.faqs.map((faq, index) => {
                const isOpen = activeFaqIndex === index;
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.98rem',
                        fontWeight: 700,
                        color: 'var(--color-text)',
                        gap: '12px'
                      }}
                    >
                      <span>{isBn ? faq.qBn : faq.qEn}</span>
                      <ChevronDown
                        size={18}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          flexShrink: 0,
                          color: 'var(--color-primary)'
                        }}
                      />
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          padding: '0 20px 16px',
                          fontSize: '0.92rem',
                          color: 'var(--color-text-muted)',
                          lineHeight: 1.65,
                          borderTop: '1px solid var(--color-border-light)'
                        }}
                      >
                        {isBn ? faq.aBn : faq.aEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* INDEPENDENT SERVICE DISCLAIMER */}
      <section style={{ padding: '24px 0', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
            {isBn ? (
              <p style={{ margin: 0 }}>
                *দাবিত্যাগ: আমরা একটি স্বাধীন মাল্টি-ব্র্যান্ড ডোরস্টেপ অ্যাপ্লায়েন্স মেরামত এবং রক্ষণাবেক্ষণ পরিষেবা প্রদানকারী।{' '}
                <strong>{brand.name}</strong> ট্রেডমার্ক, লোগো এবং ব্র্যান্ডের নামগুলি তাদের নিজ নিজ মালিকদের সম্পত্তি। আমরা জেনুইন
                ও প্রত্যয়িত যন্ত্রাংশ ব্যবহার করে মানসম্পন্ন পোস্ট-ওয়ারেন্টি সেবা প্রদান করি।
              </p>
            ) : (
              <p style={{ margin: 0 }}>
                *Disclaimer: We are an independent multi-brand doorstep appliance service and repair company. All product names, logos,
                and trademarks including <strong>{brand.name}</strong> are property of their respective owners. We provide post-warranty
                maintenance and repairs using certified technicians and genuine OEM-grade replacement parts.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FINAL HIGH-CONVERTING BOTTOM HERO CTA */}
      <section
        style={{
          padding: '48px 0',
          background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)',
          color: '#ffffff',
          textAlign: 'center'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, margin: '0 0 12px', color: '#ffffff' }}>
              {isBn ? `আজই ${brand.name} টেকনিশিয়ান বুক করুন` : `Need Fast ${brand.name} Doorstep Service Today?`}
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', margin: '0 0 24px', lineHeight: 1.6 }}>
              {isBn
                ? `মাত্র ₹২৯৯ ভিজিট ফিতে ৯০ মিনিটের মধ্যে অভিজ্ঞ টেকনিশিয়ান পান। সরাসরি কল করুন আমাদের হেল্পলাইনে:`
                : `Senior certified technicians arriving at your doorstep in 90 minutes. Flat ₹299 inspection with 30-day warranty.`}
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={phoneHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  color: 'var(--color-primary-dark)',
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  padding: '14px 28px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                }}
              >
                <Phone size={20} style={{ color: '#dc2626' }} />
                <span>{settings.phone}</span>
              </a>

              <button
                type="button"
                onClick={() => handleOpenBooking()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  padding: '14px 24px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  cursor: 'pointer'
                }}
              >
                <Calendar size={18} />
                <span>{isBn ? 'অনলাইন স্লট বুক করুন' : 'Schedule Doorstep Visit'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer categories={categories} locations={locations} settings={settings} lang={lang} />

      {/* FIXED MOBILE BOTTOM CTA BAR */}
      <div
        className="mobile-only-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderTop: '1px solid var(--color-border)',
          padding: '10px 16px',
          display: 'flex',
          gap: '10px',
          zIndex: 99,
          boxShadow: '0 -4px 16px rgba(0,0,0,0.1)'
        }}
      >
        <a
          href={phoneHref}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: '#dc2626',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.95rem',
            padding: '12px',
            borderRadius: '8px',
            textDecoration: 'none',
            textAlign: 'center'
          }}
        >
          <Phone size={18} />
          <span>{isBn ? 'কল করুন' : 'Call Now'}</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: '#25D366',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.95rem',
            padding: '12px',
            borderRadius: '8px',
            textDecoration: 'none',
            textAlign: 'center'
          }}
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* SEARCH MODAL */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        categories={categories}
        problems={problems}
        keywords={keywords}
        lang={lang}
      />

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        categories={categories}
        brands={brands}
        initialBrand={brand.id}
        initialProblem={initialProblemNote}
        lang={lang}
      />
    </div>
  );
}
