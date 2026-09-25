'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ShieldCheck, Wrench, Clock, CheckCircle2, ChevronRight, Snowflake, Refrigerator, Disc3, Radio, Tv } from 'lucide-react';
import { Language } from '@/lib/types';
import { kolkataTopHubs } from '@/lib/seo-data';

interface HomeSeoContentProps {
  lang: Language;
  onOpenBooking: () => void;
}

export default function HomeSeoContent({ lang, onOpenBooking }: HomeSeoContentProps) {
  const isBn = lang === 'bn';

  const appliances = [
    {
      title: isBn ? 'স্প্লিট ও উইন্ডো এসি মেরামত' : 'Split & Window AC Repair',
      slug: 'ac-repair',
      icon: Snowflake,
      desc: isBn
        ? 'গ্যাস চার্জিং, কুলিং সমস্যা, ওয়াটার লিকেজ, কম্প্রেসর ও পিসিবি রিপেয়ার।'
        : 'Gas refilling (R32/R410A), water leakage fixing, PCB repair, and compressor replacement.'
    },
    {
      title: isBn ? 'রেফ্রিজারেটর মেরামত' : 'Refrigerator Repair',
      slug: 'fridge-repair',
      icon: Refrigerator,
      desc: isBn
        ? 'সিঙ্গেল ও ডাবল ডোর ফ্রিজের কুলিং না হওয়া, ডিফ্রোস্ট ফল্ট এবং গ্যাস লিকেজ সমাধান।'
        : 'Single & double door fridge not cooling, defrost sensor faults, and compressor issues.'
    },
    {
      title: isBn ? 'ওয়াশিং মেশিন সার্ভিস' : 'Washing Machine Repair',
      slug: 'washing-machine-repair',
      icon: Disc3,
      desc: isBn
        ? 'ফ্রন্ট ও টপ লোড ড্রাম নয়েজ, ড্রেন পাম্প সমস্যা, মোটরের কাজ এবং ই-কোড এরর ফিক্স।'
        : 'Front load & top load drum spinning problems, drain motor failure, and error code fixes.'
    },
    {
      title: isBn ? 'মাইক্রোওয়েভ ওভেন মেরামত' : 'Microwave Oven Service',
      slug: 'microwave-repair',
      icon: Radio,
      desc: isBn
        ? 'খাবার গরম না হওয়া, স্পার্কিং, ম্যাগনেট্রন ও টাচপ্যাড বাটন সারভিসিং।'
        : 'Microwave not heating food, sparking inside cavity, magnetron issues, and touchpad repairs.'
    },
    {
      title: isBn ? 'স্মার্ট এলইডি টিভি মেরামত' : 'Smart LED TV Repair',
      slug: 'led-tv-repair',
      icon: Tv,
      desc: isBn
        ? 'ডিসপ্লেতে দাগ, নো-পিকচার সাউন্ড ওকে, ব্যাকলাইট চেঞ্জ এবং মাদারবোর্ড মেরামত।'
        : 'Display vertical lines, sound working but no picture, backlight replacement, and board repair.'
    }
  ];

  return (
    <section
      aria-label="SEO Doorstep Appliance Repair Guide"
      style={{
        backgroundColor: 'var(--color-bg-base)',
        borderTop: '1px solid var(--color-border-light)',
        borderBottom: '1px solid var(--color-border-light)',
        padding: 'clamp(44px, 6vw, 72px) 0'
      }}
    >
      <div className="container">
        {/* SEO Main Heading & Lead Narrative */}
        <div style={{ maxWidth: '920px', margin: '0 auto 48px auto', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary-dark)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              marginBottom: '14px'
            }}
          >
            <ShieldCheck size={16} />
            <span>
              {isBn
                ? 'পশ্চিমবঙ্গ সরকার অনুমোদিত পরিষেবা নেটওয়ার্ক'
                : 'Trusted Doorstep Repair Network • West Bengal'}
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--color-text-main)',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
              marginBottom: '18px'
            }}
          >
            {isBn
              ? 'কলকাতা ও পশ্চিমবঙ্গের #১ বিশ্বস্ত হোম অ্যাপ্লায়েন্স মেরামত পরিষেবা'
              : 'Reliable Doorstep AC & Appliance Repair Services in Kolkata & West Bengal'}
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              textAlign: 'left',
              marginBottom: '16px'
            }}
          >
            {isBn
              ? 'বাড়ির দৈনন্দিন প্রয়োজনীয় যন্ত্রপাতি—যেমন এয়ার কন্ডিশনার, রেফ্রিজারেটর, ওয়াশিং মেশিন, মাইক্রোওয়েভ ওভেন বা স্মার্ট এলইডি টিভি—হঠাৎ বিকল হলে দৈনন্দিন জীবন থমকে যায়। আমাদের লক্ষ্য হল পশ্চিমবঙ্গের প্রতিটি গৃহস্থালীর কাছে দ্রুত, স্বচ্ছ এবং সাশ্রয়ী মূল্যে নির্ভরযোগ্য ডোরস্টেপ সমাধান পৌঁছে দেওয়া। মাত্র ₹২৯৯ পরিদর্শনে সার্টিফাইড বিশেষজ্ঞ টেকনিশিয়ান আপনার বাড়িতে পৌঁছে সম্পূর্ণ ডায়াগনোসিস সম্পন্ন করেন।'
              : 'When critical household appliances breakdown unexpectedly—whether an AC during sweltering Kolkata heat, a non-cooling refrigerator, or a jammed washing machine—finding a prompt and dependable technician is crucial. We bring certified engineering expertise right to your doorstep across Kolkata, Howrah, and West Bengal districts with transparent ₹299 inspection pricing, upfront repair estimates, and guaranteed OEM parts.'}
          </p>

          <p
            style={{
              fontSize: 'clamp(0.875rem, 1.6vw, 1rem)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              textAlign: 'left'
            }}
          >
            {isBn
              ? 'ভোল্টাস, ডাইকিন, এলজি, স্যামসাং, গোদরেজ, ওয়ার্লপুল, আইএফবি, বোশ এবং ব্লু স্টার সহ সমস্ত শীর্ষস্থানীয় ব্র্যান্ডের জন্য আমাদের প্রকৌশলীরা প্রশিক্ষিত। প্রতিটি কাজ সম্পন্ন করার পর গ্রাহক পান ৩০ দিনের লিখিত সার্ভিস ওয়ারেন্টি।'
              : 'Our verified technicians specialize in major brands including Voltas, Daikin, LG, Samsung, Whirlpool, Godrej, IFB, Bosch, Hitachi, Carrier, and Blue Star. Every completed repair comes with a 30-day workmanship warranty and transparent billing.'}
          </p>
        </div>

        {/* 5 Specialized Appliance Service Cards */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
              {isBn ? 'আমাদের ৫টি বিশেষায়িত হোম অ্যাপ্লায়েন্স সার্ভিস' : 'Our 5 Specialized Doorstep Appliance Services'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              {isBn ? 'আপনার প্রয়োজনীয় ক্যাটাগরিতে ক্লিক করে বিস্তারিত জানুন ও বুক করুন' : 'Click any category to view specialized symptom solutions & upfront pricing'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px'
            }}
          >
            {appliances.map((app) => {
              const IconComp = app.icon;
              const linkHref = isBn ? `/bn/${app.slug}` : `/${app.slug}`;
              return (
                <div
                  key={app.slug}
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border-light)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-xs)',
                    transition: 'transform var(--transition-fast), border-color var(--transition-fast)'
                  }}
                >
                  <div>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--color-primary-light)',
                        color: 'var(--color-primary-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px'
                      }}
                    >
                      <IconComp size={22} />
                    </div>

                    <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px' }}>
                      {app.title}
                    </h4>

                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                      {app.desc}
                    </p>
                  </div>

                  <Link
                    href={linkHref}
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
                    <span>{isBn ? 'বিস্তারিত দেখুন ও বুক করুন' : 'View Details & Book'}</span>
                    <ChevronRight size={15} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coverage Hubs & Pincodes Matrix */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-warm)',
            border: '1px solid var(--color-border-light)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(24px, 4vw, 36px)',
            marginBottom: '48px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <MapPin size={22} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>
                {isBn
                  ? 'কলকাতা ও পশ্চিমবঙ্গের প্রধান সেবা এলাকা ও পিনকোড কভারেজ'
                  : 'Doorstep Service Hubs & Pincode Coverage in Kolkata & West Bengal'}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>
                {isBn
                  ? '৯ মিনিটে দ্রুত আগমন নিশ্চিত করতে প্রতিটি প্রধান অঞ্চলে আমাদের নিবেদিত টেকনিশিয়ান হাব প্রস্তুত রয়েছে।'
                  : 'Fast 90-minute technician dispatch network mapped across top residential and commercial hubs.'}
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '12px',
              marginTop: '20px'
            }}
          >
            {kolkataTopHubs.map((hub, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
                  📍 {isBn ? hub.nameBn : hub.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                  PIN: {hub.pin}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Pillars of Trust Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            textAlign: 'center'
          }}
        >
          <div style={{ padding: '16px' }}>
            <Clock size={28} style={{ color: 'var(--color-primary)', margin: '0 auto 10px auto' }} />
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
              {isBn ? '৯০ মিনিটে দ্রুত সেবা' : '90-Min Quick Arrival'}
            </h4>
            <p style={{ fontSize: '0.78125rem', color: 'var(--color-text-muted)' }}>
              {isBn ? 'কলকাতায় একই দিনে দ্রুততম হোম সার্ভিস।' : 'Same-day technician at your doorstep.'}
            </p>
          </div>

          <div style={{ padding: '16px' }}>
            <Wrench size={28} style={{ color: 'var(--color-primary)', margin: '0 auto 10px auto' }} />
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
              {isBn ? '১০০% আসল পার্টস' : '100% Genuine Spares'}
            </h4>
            <p style={{ fontSize: '0.78125rem', color: 'var(--color-text-muted)' }}>
              {isBn ? 'প্রস্তুতকারক অনুমোদিত ওএম যন্ত্রাংশ।' : 'Manufacturer-approved branded parts.'}
            </p>
          </div>

          <div style={{ padding: '16px' }}>
            <ShieldCheck size={28} style={{ color: 'var(--color-primary)', margin: '0 auto 10px auto' }} />
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
              {isBn ? '৩০ দিনের পূর্ণ ওয়ারেন্টি' : '30-Day Work Warranty'}
            </h4>
            <p style={{ fontSize: '0.78125rem', color: 'var(--color-text-muted)' }}>
              {isBn ? 'প্রতিটি সম্পন্ন মেরামতে নিশ্চিন্ত সুরক্ষা।' : 'Complete coverage on completed repairs.'}
            </p>
          </div>

          <div style={{ padding: '16px' }}>
            <CheckCircle2 size={28} style={{ color: 'var(--color-primary)', margin: '0 auto 10px auto' }} />
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
              {isBn ? 'স্বচ্ছ ₹২৯৯ ভিজিট' : 'Flat ₹299 Visit'}
            </h4>
            <p style={{ fontSize: '0.78125rem', color: 'var(--color-text-muted)' }}>
              {isBn ? 'কোনো গোপন চার্জ নেই, সম্পূর্ণ স্বচ্ছতা।' : 'No hidden fee upfront diagnosis.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
