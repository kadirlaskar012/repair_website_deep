'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/header/Header';
import LocationBar from '@/components/header/LocationBar';
import Footer from '@/components/footer/Footer';
import SearchModal from '@/components/search/SearchModal';
import BookingModal from '@/components/modal/BookingModal';
import FAQAccordion from '@/components/service/FAQAccordion';
import {
  Category,
  Brand,
  LocationItem,
  SiteSettings,
  Language
} from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import {
  ShieldCheck,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Wrench,
  ChevronRight,
  Zap,
  Award,
  ThumbsUp,
  MapPin,
  Sparkles,
  ArrowRight,
  Star
} from 'lucide-react';

interface LocationPageViewProps {
  location: LocationItem;
  locations: LocationItem[];
  categories: Category[];
  brands: Brand[];
  settings: SiteSettings;
  faqs: { q: string; a: string }[];
  lang: Language;
}

export default function LocationPageView({
  location,
  locations,
  categories,
  brands,
  settings,
  faqs,
  lang
}: LocationPageViewProps) {
  const isBn = lang === 'bn';
  const dict = getDictionary(lang);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [prefilledCategory, setPrefilledCategory] = useState<string | undefined>();

  const openBookingFor = (catSlug?: string) => {
    setPrefilledCategory(catSlug);
    setBookingOpen(true);
  };

  const locName = isBn ? location.nameBn : location.name;
  const stateName = isBn ? location.stateBn : location.state;
  const responseTimeText = isBn ? (location.responseTimeBn || '৪৫ - ৬০ মিনিট') : (location.responseTime || '45 - 60 Mins');
  const popularAreas = (isBn ? location.popularLocalitiesBn : location.popularLocalities) || [];

  const topBrands = brands.slice(0, 16);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-light)' }}>
      {/* 1. Header & Location Bar */}
      <Header
        categories={categories}
        lang={lang}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBooking={() => openBookingFor()}
        phone={settings.phone}
        whatsapp={settings.whatsapp}
      />
      <LocationBar locations={locations} lang={lang} phone={settings.phone} />

      <main style={{ flex: 1 }}>
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '12px 16px',
            fontSize: '0.8125rem',
            color: 'var(--color-text-muted)'
          }}
        >
          <ol style={{ display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap' }}>
            <li>
              <Link href={isBn ? '/bn' : '/'} style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                {isBn ? 'হোম' : 'Home'}
              </Link>
            </li>
            <li><ChevronRight size={12} /></li>
            <li>
              <Link href={isBn ? '/bn/locations' : '/locations'} style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                {isBn ? 'সার্ভিস এরিয়া' : 'Service Areas'}
              </Link>
            </li>
            <li><ChevronRight size={12} /></li>
            <li aria-current="page" style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
              {locName}
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            color: '#FFFFFF',
            padding: '48px 16px 56px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle background glow */}
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(232, 163, 61, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {/* Top Area Pill Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(232, 163, 61, 0.15)', border: '1px solid rgba(232, 163, 61, 0.35)', color: 'var(--color-accent)', padding: '5px 12px', borderRadius: '24px', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '16px' }}>
              <MapPin size={14} />
              <span>
                {isBn ? `${locName} সার্ভিস হাব • পিন: ${location.pincode || 'Kolkata'}` : `${locName} Service Hub • PIN: ${location.pincode || 'Kolkata'}`}
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 900,
                lineHeight: 1.18,
                marginBottom: '16px',
                letterSpacing: '-0.02em',
                maxWidth: '900px'
              }}
            >
              {isBn
                ? `${locName}-এ ডোরস্টেপ এসি ও হোম অ্যাপ্লায়েন্স মেরামত পরিষেবা`
                : `Doorstep AC & Home Appliance Repair in ${locName}`}
            </h1>

            <p
              style={{
                fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)',
                color: '#CBD5E1',
                lineHeight: 1.6,
                maxWidth: '820px',
                marginBottom: '28px'
              }}
            >
              {isBn
                ? `${locName} (${location.pincode || ''}) এবং সংলগ্ন সমস্ত এলাকায় আমাদের সার্টিফাইড ইঞ্জিনিয়ার মাত্র ${responseTimeText}-র মধ্যে ডোরস্টেপ সার্ভিস প্রদান করে। আসল পার্টস, স্বচ্ছ কোটেশন ও ৯০ দিনের ডিজিটাল ওয়ারেন্টি সহ এসি, ফ্রিজ, ওয়াশিং মেশিন, মাইক্রোওভেন ও টিভি সার্ভিস বুক করুন।`
                : `Certified technician arrival in ${responseTimeText} across ${locName} (PIN: ${location.pincode || ''}) and adjacent localities. 100% genuine parts, transparent upfront pricing, and a written 90-day warranty on all completed repairs.`}
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '32px' }}>
              <a
                href={`tel:${settings.phone}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  padding: '12px 22px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(30, 58, 138, 0.4)'
                }}
              >
                <Phone size={18} />
                <span>{isBn ? 'সরাসরি কল করুন' : 'Call Technician Now'}</span>
              </a>

              <a
                href={`https://wa.me/${(settings.whatsapp || settings.phone).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(isBn ? `নমস্কার, আমি ${locName} থেকে অ্যাপ্লায়েন্স মেরামতের জন্য যোগাযোগ করছি।` : `Hello, I need appliance repair service in ${locName}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)'
                }}
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => openBookingFor()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  cursor: 'pointer'
                }}
              >
                <Calendar size={18} />
                <span>{isBn ? 'অনলাইনে বুক করুন' : 'Book Online'}</span>
              </button>
            </div>

            {/* 4 Trust Feature Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={20} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{responseTimeText}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{isBn ? 'এক্সপ্রেস ডোরস্টেপ আগমন' : 'Express Doorstep Arrival'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={20} style={{ color: '#10B981', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{isBn ? '৯০ দিনের ওয়ারেন্টি' : '90-Day Warranty'}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{isBn ? 'সমস্ত সম্পন্ন কাজে' : 'On Workmanship & Spares'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Award size={20} style={{ color: '#38BDF8', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{isBn ? '১০০% আসল পার্টস' : '100% Genuine Spares'}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{isBn ? 'কোম্পানি অনুমোদিত' : 'OEM Approved Parts'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Star size={20} style={{ color: '#FBBF24', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>4.9/5 Rating</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{isBn ? '১,২৮০+ ভেরিফায়েড রিভিউ' : '1,280+ Verified Reviews'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Micro-Areas & Neighborhoods Covered (Local SEO Cluster) */}
        {popularAreas.length > 0 && (
          <section
            style={{
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid var(--color-border)',
              padding: '32px 16px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={18} style={{ color: 'var(--color-primary)' }} />
                  <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>
                    {isBn
                      ? `${locName} ও ৫-৮ কিমি ব্যাসার্ধে কভার করা সমস্ত পাড়া, মোড় ও মেট্রো স্টেশন:`
                      : `Neighborhoods, Sub-Areas & Metro Stations Covered in & around ${locName}:`}
                  </h2>
                </div>

                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#059669',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  ⚡ {isBn ? '৫-৮ কিমি এক্সপ্রেস ডিসপ্যাচ নিশ্চিত' : '5-8 KM Express Dispatch Radius'}
                </span>
              </div>

              <p style={{ fontSize: '0.84375rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '16px', maxWidth: '900px' }}>
                {isBn
                  ? `আপনি ${locName}-এর যেকোনো প্রান্ত, অ্যাপার্টমেন্ট বা কলোনিতে থাকুন না কেন, আমাদের মোবাইল টেকনিশিয়ান ভ্যান টুলস ও আসল স্পেয়ার্স নিয়ে দ্রুত পৌঁছে যায়:`
                  : `Whether you reside in residential societies, high-rise complexes, or local lanes across ${locName}, our mobile technician units reach your doorstep with genuine spare parts:`}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {popularAreas.map((area, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: 'var(--color-bg-warm)',
                      border: '1px solid var(--color-border)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--color-text-main)',
                      transition: 'border-color 0.2s, background-color 0.2s'
                    }}
                  >
                    <span style={{ color: 'var(--color-primary)', fontSize: '0.875rem' }}>📍</span>
                    <span>{area}</span>
                  </span>
                ))}
              </div>

              <div style={{ marginTop: '14px', fontSize: '0.78125rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                {isBn
                  ? `* আপনার নির্দিষ্ট গলি বা হাউজিং সোসাইটির নাম তালিকায় না থাকলেও চিন্তা নেই—আমরা ${locName} ও পার্শ্ববর্তী সমস্ত পিনকোড কভার করি।`
                  : `* Don't see your specific street or society listed above? We cover all lanes, bye-lanes and PIN codes across ${locName} and surrounding districts.`}
              </div>
            </div>
          </section>
        )}

        {/* Core Services Offered in this Location */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 16px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)' }}>
              {isBn ? 'বিশেষায়িত ডোরস্টেপ সার্ভিস' : 'Specialized Services'}
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.125rem)', fontWeight: 800, color: 'var(--color-text-main)', marginTop: '6px', marginBottom: '10px' }}>
              {isBn ? `${locName}-এ উপলব্ধ অ্যাপ্লায়েন্স মেরামত সেবা` : `Appliance Repair Services Available in ${locName}`}
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
              {isBn
                ? 'আমাদের প্রশিক্ষিত টেকনিশিয়ানরা আধুনিক ডিজিটাল টুলস নিয়ে সরাসরি আপনার বাড়িতে উপস্থিত হয়ে নিখুঁত কাজ সম্পন্ন করে।'
                : 'Our background-verified engineers arrive equipped with digital testing gear and original OEM spares at your doorstep.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {categories.map((cat) => {
              const catName = isBn ? cat.nameBn : cat.name;
              const catDesc = isBn ? cat.shortDescBn : cat.shortDesc;
              const catLink = isBn ? `/bn/${cat.slug}` : `/${cat.slug}`;

              return (
                <div
                  key={cat.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border)',
                    borderRadius: '14px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backgroundColor: 'rgba(30, 58, 138, 0.08)',
                          color: 'var(--color-primary)',
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        {locName} Hub
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10B981' }}>
                        ● {isBn ? 'আজই উপলব্ধ' : 'Available Today'}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px', color: 'var(--color-text-main)' }}>
                      {catName}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '18px' }}>
                      {catDesc}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '16px', display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => openBookingFor(cat.slug)}
                      style={{
                        flex: 1,
                        backgroundColor: 'var(--color-primary)',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.8125rem',
                        cursor: 'pointer'
                      }}
                    >
                      {isBn ? `${locName}-এ বুক করুন` : `Book in ${locName}`}
                    </button>

                    <Link
                      href={catLink}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--color-bg-warm)',
                        color: 'var(--color-text-main)',
                        border: '1px solid var(--color-border)',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.8125rem',
                        textDecoration: 'none'
                      }}
                    >
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Multi-Brand Competency */}
        <section style={{ backgroundColor: '#F8FAFC', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '48px 16px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 28px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '8px' }}>
                {isBn ? `${locName}-এ সার্ভিসকৃত জনপ্রিয় ব্র্যান্ডসমূহ` : `Major Brands Serviced in ${locName}`}
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                {isBn
                  ? 'আমরা ভারতের সমস্ত প্রধান এসি, ফ্রিজ ও ওয়াশিং মেশিন ব্র্যান্ডের ডোরস্টেপ মেরামতে অভিজ্ঞ।'
                  : 'Independent multi-brand support with genuine replacement parts and certified technical expertise.'}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '10px'
              }}
            >
              {topBrands.map((b) => (
                <Link
                  key={b.id}
                  href={isBn ? `/bn/brands/${b.id}` : `/brands/${b.id}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '12px 8px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: 'var(--color-text-main)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    transition: 'border-color 0.2s, transform 0.2s',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Transparent Diagnosis Policy Banner */}
        <section style={{ maxWidth: '1200px', margin: '48px auto', padding: '0 16px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={24} style={{ color: 'var(--color-accent)' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-accent)' }}>
                {isBn ? 'স্বচ্ছ ডায়াগনসিস নিশ্চয়তা' : 'Transparent Diagnostic Guarantee'}
              </span>
            </div>

            <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 800, lineHeight: 1.3 }}>
              {isBn
                ? `${locName}-এ কোনো লুকানো বা অতিরিক্ত চার্জ নেই`
                : `No Hidden Fees & 100% Upfront Quotes in ${locName}`}
            </h3>

            <p style={{ color: '#CBD5E1', fontSize: '0.9375rem', lineHeight: 1.6, maxWidth: '850px', margin: 0 }}>
              {isBn
                ? 'আমাদের টেকনিশিয়ান আপনার বাড়ি এসে সম্পূর্ণ মেশিন চেক করে লিখিত হিসাব দেয়। আপনার অনুমোদন পাওয়ার পরই কেবল কাজ শুরু হয়। কোনো অপ্রয়োজনীয় পার্টস পরিবর্তনের চাপ দেওয়া হয় না।'
                : 'Our engineer visits your doorstep, conducts a thorough multi-point multimeter check, and provides a clear written estimate before starting any work. No surprise charges, ever.'}
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
              <a
                href={`tel:${settings.phone}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--color-accent)',
                  color: '#0F172A',
                  fontWeight: 800,
                  padding: '10px 18px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '0.875rem'
                }}
              >
                <Phone size={16} />
                <span>{isBn ? 'ফোন করে জানুন' : 'Call Support Helpline'}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Local Area FAQs */}
        <section style={{ maxWidth: '900px', margin: '0 auto 48px', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '8px' }}>
              {isBn ? `${locName} সার্ভিস সম্পর্কিত সাধারণ প্রশ্নাবলী` : `Frequently Asked Questions about Service in ${locName}`}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              {isBn ? 'কাস্টমারদের সাধারণ জিজ্ঞাসা ও আমাদের সরাসরি উত্তর' : 'Quick answers about technician arrival, pricing, and warranty in your area.'}
            </p>
          </div>

          <FAQAccordion faqs={faqs} lang={lang} />
        </section>

        {/* Other Service Locations Grid */}
        <section style={{ backgroundColor: '#F8FAFC', borderTop: '1px solid var(--color-border)', padding: '40px 16px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '16px' }}>
              {isBn ? 'অন্যান্য নিকটবর্তী সার্ভিস হাবসমূহ:' : 'Other Nearby Service Hubs Across Kolkata & Bengal:'}
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {locations.filter((l) => l.id !== location.id).map((otherLoc) => (
                <Link
                  key={otherLoc.id}
                  href={isBn ? `/bn/locations/${otherLoc.hashSlug}` : `/locations/${otherLoc.hashSlug}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--color-text-main)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <MapPin size={12} style={{ color: 'var(--color-primary)' }} />
                  <span>{isBn ? otherLoc.nameBn : otherLoc.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        categories={categories}
        locations={locations}
        lang={lang}
      />

      {/* Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        lang={lang}
        categories={categories}
        problems={[]}
        keywords={[]}
      />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        categories={categories}
        brands={brands}
        initialCategory={prefilledCategory}
        lang={lang}
      />
    </div>
  );
}
