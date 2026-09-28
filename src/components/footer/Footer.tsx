import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck, Wrench } from 'lucide-react';
import { Category, LocationItem, SiteSettings, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { brandSeoCatalog } from '@/lib/brand-seo-data';

interface FooterProps {
  settings: SiteSettings;
  categories: Category[];
  locations: LocationItem[];
  lang: Language;
}

export default function Footer({ settings, categories, locations, lang }: FooterProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';

  return (
    <footer style={{ backgroundColor: '#0A251F', color: '#B5C7C3', paddingTop: '64px', paddingBottom: '32px', borderTop: '1px solid #133D34' }}>
      <div className="container">
        {/* Top Feature Bar inside Footer */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '24px 28px',
            marginBottom: '56px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.9375rem' }}>
                {isBn ? 'স্বচ্ছ ₹২৯৯ পরিদর্শন ফি' : 'Fixed ₹299 Diagnosis Fee'}
              </div>
              <div style={{ fontSize: '0.8125rem', opacity: 0.8 }}>
                {isBn ? 'অনুমোদনের পরেই মেরামত শুরু' : 'Quote approved before repair'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
              <Clock size={22} />
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.9375rem' }}>
                {isBn ? 'একই দিনে ডোরস্টেপ ভিজিট' : 'Same-Day Technician Visit'}
              </div>
              <div style={{ fontSize: '0.8125rem', opacity: 0.8 }}>
                {isBn ? 'কলকাতা ও সকল প্রধান অঞ্চলে' : 'Across Kolkata & WB districts'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
              <MessageCircle size={22} />
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.9375rem' }}>
                {isBn ? 'তাৎক্ষণিক হোয়াটসঅ্যাপ সাপোর্ট' : 'Instant WhatsApp Help'}
              </div>
              <div style={{ fontSize: '0.8125rem', opacity: 0.8 }}>
                <a href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#E8F3F1', textDecoration: 'underline' }}>
                  {settings.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px'
          }}
        >
          {/* Brand & About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '56px', height: '56px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src="/logo-icon.svg"
                  alt="Appliance Seva"
                  width={56}
                  height={56}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}
                />
              </div>
              <div>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', display: 'block', lineHeight: 1.15 }}>
                  APPLIANCE <span style={{ color: 'var(--color-accent)' }}>SEVA</span>
                </span>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#34D399', letterSpacing: '0.04em' }}>
                  {isBn ? 'ডোরস্টেপ অ্যাপ্লায়েন্স কেয়ার • পশ্চিমবঙ্গ' : 'DOORSTEP APPLIANCE CARE • WEST BENGAL'}
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '20px' }}>
              {isBn 
                ? 'কলকাতা ও পশ্চিমবঙ্গ জুড়ে ডোরস্টেপ এসি এবং হোম অ্যাপ্লায়েন্স মেরামত। প্রত্যয়িত দক্ষ টেকনিশিয়ান, ৯০ দিনের গ্যারান্টি এবং স্বচ্ছ ₹২৯৯ পরিদর্শন ফি।'
                : 'West Bengal’s trusted doorstep air conditioner and home appliance repair by Appliance Seva. Certified multi-brand engineers, 90-day warranty, and fixed ₹299 inspection fee.'}
            </p>
            <div style={{ fontSize: '0.8125rem', color: '#88A39C', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={15} style={{ color: 'var(--color-accent)' }} />
                <span>{isBn ? settings.workingHoursBn : settings.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1rem', marginBottom: '18px', letterSpacing: '0.02em' }}>
              {t.footerServices}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={isBn ? `/bn/${c.slug}` : `/${c.slug}`}
                    prefetch={true}
                    scroll={true}
                    style={{ color: '#B5C7C3', transition: 'color 0.15s' }}
                    className="footer-link"
                  >
                    {isBn ? c.nameBn : c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Legal */}
          <div>
            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1rem', marginBottom: '18px', letterSpacing: '0.02em' }}>
              {t.footerQuickLinks}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', marginBottom: '20px' }}>
              <li>
                <Link href={isBn ? '/bn' : '/'} prefetch={true} scroll={true} style={{ color: '#B5C7C3' }}>
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href={isBn ? '/bn/blog' : '/blog'} prefetch={true} scroll={true} style={{ color: '#B5C7C3' }}>
                  {isBn ? 'মেরামত ব্লগ' : 'Appliance Repair Blog'}
                </Link>
              </li>
              <li>
                <Link href={isBn ? '/bn/reviews' : '/reviews'} prefetch={true} scroll={true} style={{ color: '#B5C7C3' }}>
                  {isBn ? 'গ্রাহক রিভিউ ও রেটিং' : 'Customer Reviews & Ratings'}
                </Link>
              </li>
              <li>
                <Link href={isBn ? '/bn/track' : '/track'} prefetch={true} scroll={true} style={{ color: '#B5C7C3' }}>
                  {isBn ? 'বুকিং ট্র্যাক করুন (Track Booking)' : 'Track Booking Status'}
                </Link>
              </li>
              <li>
                <Link href={isBn ? '/bn/privacy-policy' : '/privacy-policy'} prefetch={true} scroll={true} style={{ color: '#B5C7C3' }}>
                  {t.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href={isBn ? '/bn/terms-of-service' : '/terms-of-service'} prefetch={true} scroll={true} style={{ color: '#B5C7C3' }}>
                  {t.termsOfService}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1rem', marginBottom: '18px', letterSpacing: '0.02em' }}>
              {isBn ? 'যোগাযোগ ও হেল্পলাইন' : 'Helpline & Office'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={18} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: '#FFFFFF', fontSize: '0.8125rem', marginBottom: '2px' }}>
                    {isBn ? 'প্রধান অফিস (Central HQ):' : 'Central Registered Office:'}
                  </strong>
                  <span>{isBn ? settings.addressBn : settings.address}</span>
                  <div style={{ marginTop: '6px', fontSize: '0.75rem', color: '#34D399', fontWeight: 600 }}>
                    {isBn ? '✓ ৯টি আঞ্চলিক শাখা অফিস ও সার্ভিস হাব' : '✓ 9 Regional Branch Hubs (Details below)'}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <a href={`tel:${settings.phone}`} style={{ color: '#FFFFFF', fontWeight: 600 }}>
                  {settings.phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <a href={`mailto:${settings.email}`} style={{ color: '#B5C7C3' }}>
                  {settings.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Local Branch Offices & Doorstep Hubs Network (Smart Section) */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '28px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={18} style={{ color: 'var(--color-accent)' }} />
                <span>{isBn ? 'আমাদের অফিস ও আঞ্চলিক সার্ভিস হাবসমূহ' : 'Our Office Branches & Local Service Hubs'}</span>
              </div>
              <p style={{ fontSize: '0.78125rem', color: '#88A39C', margin: '4px 0 0 0' }}>
                {isBn
                  ? 'আপনার এলাকার নিকটবর্তী অফিস ও ডোরস্টেপ সার্ভিস সেন্টার থেকে দ্রুততম সময়ে (৯০ মিনিটে) টেকনিশিয়ান আগমন'
                  : 'Fast doorstep technician dispatch (within 90 mins) from our local branch offices and service hubs'}
              </p>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#34D399', fontWeight: 700, background: 'rgba(52, 211, 153, 0.1)', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(52, 211, 153, 0.25)' }}>
              {isBn ? '● ৯টি এলাকায় অফিস সার্ভিস সক্রিয়' : '● 9 Regional Hubs Active'}
            </div>
          </div>

          {/* Responsive Grid of Local Office Hubs */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '14px'
            }}
          >
            {locations.map((loc) => (
              <div
                key={loc.id}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  transition: 'background 0.2s, border-color 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                    <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#FFFFFF' }}>
                      {isBn ? loc.nameBn : loc.name}
                    </span>
                  </div>
                  {loc.pincode && (
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(232, 163, 61, 0.15)',
                        color: 'var(--color-accent)',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        border: '1px solid rgba(232, 163, 61, 0.3)'
                      }}
                    >
                      PIN: {loc.pincode}
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.78125rem', color: '#B5C7C3', lineHeight: 1.5, marginBottom: '8px' }}>
                  {isBn ? (loc.addressBn || loc.address) : (loc.address || loc.addressBn)}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.71875rem' }}>
                  <span style={{ color: '#34D399', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34D399' }} />
                    <span>{isBn ? 'ডোরস্টেপ টেকনিশিয়ান সক্রিয়' : 'Technicians Available'}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('preferred_location_id', loc.id);
                        localStorage.setItem('preferred_location_slug', loc.hashSlug);
                        localStorage.setItem('preferred_location_name', loc.name);
                        window.dispatchEvent(
                          new CustomEvent('appliance_location_changed', {
                            detail: { id: loc.id, name: loc.name, nameBn: loc.nameBn, slug: loc.hashSlug }
                          })
                        );
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-accent)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: 0,
                      textDecoration: 'underline'
                    }}
                  >
                    {isBn ? 'এলাকা বেছে নিন' : 'Select Area'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Brands Directory (Contextual SEO Interlinking) */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
            {isBn ? 'জনপ্রিয় ব্র্যান্ড ডোরস্টেপ সাপোর্ট ও মেরামত:' : 'Top Brand Repair & Doorstep Service:'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '0.8125rem' }}>
            {Object.values(brandSeoCatalog).map((b, idx, arr) => (
              <span key={b.slug} style={{ color: '#88A39C' }}>
                <Link
                  href={isBn ? `/bn/brands/${b.slug}` : `/brands/${b.slug}`}
                  prefetch={true}
                  scroll={true}
                  style={{ color: '#B5C7C3', textDecoration: 'none' }}
                  className="footer-link"
                >
                  {b.name} Service
                </Link>
                {idx < arr.length - 1 && ' • '}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.8125rem'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} {isBn ? settings.businessNameBn : settings.businessName}. {t.allRightsReserved}
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.75 }}>
            {isBn
              ? 'স্বাধীন মাল্টি-ব্র্যান্ড ডোরস্টেপ সেবা প্রদানকারী। সকল ট্রেডমার্ক নিজ নিজ ব্র্যান্ডের সম্পত্তি।'
              : 'Independent doorstep multi-brand service provider. All brand logos are property of respective owners.'}
          </div>
        </div>
      </div>
    </footer>
  );
}
