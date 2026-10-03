'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Copy,
  Check,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  Wrench,
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { Booking, Language, SiteSettings } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface BookingSuccessViewProps {
  booking: Booking | null;
  bookingId: string;
  settings: SiteSettings;
  lang: Language;
}

export default function BookingSuccessView({
  booking,
  bookingId,
  settings,
  lang
}: BookingSuccessViewProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';
  const [activeBooking, setActiveBooking] = useState<Booking | null>(booking);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!activeBooking && bookingId) {
      // 1. Check client session storage for instant data
      try {
        const stored = sessionStorage.getItem(`booking_${bookingId}`);
        if (stored) {
          setActiveBooking(JSON.parse(stored));
          return;
        }
      } catch (e) {}

      // 2. Fetch from real-time API
      fetch(`/api/bookings/${encodeURIComponent(bookingId)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.booking) {
            setActiveBooking(data.booking);
          }
        })
        .catch(() => {});
    }
  }, [bookingId, activeBooking]);

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappMsg = activeBooking
    ? isBn
      ? `নমস্কার Appliance Seva,\nআমি একটি সার্ভিস বুকিং করেছি।\n\n📌 বুকিং নম্বর: ${bookingId}\n👤 গ্রাহকের নাম: ${activeBooking.name}\n📞 মোবাইল নম্বর: ${activeBooking.mobile}\n🛠️ সার্ভিস: ${activeBooking.serviceName || activeBooking.service}\n🏷️ ব্র্যান্ড: ${activeBooking.brand}\n⚠️ সমস্যা: ${activeBooking.problem || 'সাধারণ পরিদর্শন ও মেরামত'}\n📍 ঠিকানা: ${activeBooking.address || 'ফোনে জানানো হবে'}\n\nঅনুগ্রহ করে টেকনিশিয়ান ভিজিট দ্রুত নিশ্চিত করুন। ধন্যবাদ!`
      : `Hello Appliance Seva,\nI have scheduled a service appointment.\n\n📌 Booking ID: ${bookingId}\n👤 Customer Name: ${activeBooking.name}\n📞 Mobile Number: ${activeBooking.mobile}\n🛠️ Service: ${activeBooking.serviceName || activeBooking.service}\n🏷️ Brand: ${activeBooking.brand}\n⚠️ Issue / Problem: ${activeBooking.problem || 'General Inspection & Repair'}\n📍 Address: ${activeBooking.address || 'Address confirmed on call'}\n\nPlease confirm my technician visit at the earliest. Thank you!`
    : isBn
      ? `নমস্কার Appliance Seva,\nআমার বুকিং নম্বর: ${bookingId}। অনুগ্রহ করে টেকনিশিয়ান ভিজিট নিশ্চিত করুন।`
      : `Hello Appliance Seva, I have scheduled booking ID: ${bookingId}. Please confirm my technician appointment.`;

  const whatsappText = encodeURIComponent(whatsappMsg);

  return (
    <div style={{ padding: '60px 0', backgroundColor: 'var(--color-bg-warm)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        <div
          style={{
            backgroundColor: 'var(--color-bg-card)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-md)',
            padding: 'clamp(28px, 6vw, 48px)',
            textAlign: 'center'
          }}
        >
          {/* Animated Green Checkmark */}
          <div
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 4px 16px rgba(20, 108, 91, 0.15)'
            }}
          >
            <CheckCircle2 size={44} strokeWidth={2.5} />
          </div>

          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '8px' }}>
            {t.bookingSuccessTitle}
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '28px' }}>
            {t.bookingSuccessSubtitle}
          </p>

          {/* Booking ID Highlight Card */}
          <div
            style={{
              backgroundColor: 'var(--color-primary-light)',
              border: '1.5px dashed var(--color-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-dark)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {t.yourBookingId}
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {bookingId}
              </div>
            </div>

            <button
              onClick={handleCopy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '6px',
                backgroundColor: 'var(--color-bg-card)',
                color: 'var(--color-primary)',
                border: '1px solid rgba(20, 108, 91, 0.25)',
                fontWeight: 600,
                fontSize: '0.8125rem'
              }}
            >
              {copied ? <Check size={16} style={{ color: 'var(--color-success)' }} /> : <Copy size={16} />}
              <span>{copied ? t.copied : t.copyBookingId}</span>
            </button>
          </div>

          {/* Appointment Summary if booking details present */}
          {activeBooking && (
            <div
              style={{
                backgroundColor: 'var(--color-bg-warm)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                marginBottom: '32px',
                textAlign: 'left'
              }}
            >
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '14px', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '8px' }}>
                {t.summaryDetails}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '0.875rem' }}>
                <div>
                  <span style={{ color: 'var(--color-text-muted)' }}>{isBn ? 'গ্রাহকের নাম:' : 'Customer Name:'}</span>{' '}
                  <strong style={{ color: 'var(--color-text-main)' }}>{activeBooking.name}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)' }}>{isBn ? 'মোবাইল নম্বর:' : 'Mobile:'}</span>{' '}
                  <strong style={{ color: 'var(--color-text-main)' }}>{activeBooking.mobile}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)' }}>{isBn ? 'অ্যাপ্লায়েন্স ও ব্র্যান্ড:' : 'Service & Brand:'}</span>{' '}
                  <strong style={{ color: 'var(--color-text-main)' }}>{activeBooking.serviceName || activeBooking.service} ({activeBooking.brand})</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)' }}>{isBn ? 'সমস্যা / ইস্যু:' : 'Reported Issue:'}</span>{' '}
                  <strong style={{ color: 'var(--color-text-main)' }}>{activeBooking.problem || (isBn ? 'সাধারণ পরিদর্শন ও মেরামত' : 'General inspection & repair')}</strong>
                </div>
              </div>

              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--color-border-light)', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{isBn ? 'ঠিকানা:' : 'Address:'}</span> {activeBooking.address}
              </div>

              <div style={{ marginTop: '10px', fontSize: '0.8125rem', color: 'var(--color-primary-dark)', fontWeight: 600 }}>
                {isBn
                  ? '⚡ সার্ভিস শিডিউল: জরুরি / দ্রুততম সময়ে টেকনিশিয়ান ভিজিট (স্বচ্ছ ও সাশ্রয়ী সার্ভিস চার্জ)'
                  : '⚡ Service Schedule: Immediate / ASAP Doorstep Technician Visit (Transparent Upfront Pricing)'}
              </div>
            </div>
          )}

          {/* Primary Immediate Actions: Track Live, Call Coordinator & WhatsApp Desk */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <Link
              href={isBn ? `/bn/track?id=${bookingId}` : `/track?id=${bookingId}`}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Truck size={20} />
              <span>{isBn ? 'লাইভ বুকিং স্ট্যাটাস ট্র্যাক করুন' : 'Track Booking Status Live'}</span>
            </Link>

            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              style={{ width: '100%' }}
            >
              <MessageCircle size={20} />
              <span>{isBn ? 'হোয়াটসঅ্যাপে বুকিং নিশ্চিত করুন' : 'Confirm on WhatsApp with Booking ID'}</span>
            </a>

            <a
              href={`tel:${settings.phone}`}
              className="btn btn-outline btn-lg"
              style={{ width: '100%' }}
            >
              <Phone size={18} />
              <span>{isBn ? `সমন্বয়কারীকে সরাসরি কল করুন (${settings.phone})` : `Call Coordination Desk (${settings.phone})`}</span>
            </a>
          </div>

          {/* Return Home Link */}
          <div>
            <Link
              href={isBn ? '/bn' : '/'}
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-primary)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{isBn ? 'হোমপেজে ফিরে যান' : 'Return to Homepage'}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
