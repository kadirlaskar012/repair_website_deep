'use client';

import React, { useState } from 'react';
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
  ShieldCheck
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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappText = encodeURIComponent(
    `Hello AC Repair Service, I have scheduled booking ID: ${bookingId}. Please confirm my technician appointment.`
  );

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
          {booking && (
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
                  <strong style={{ color: 'var(--color-text-main)' }}>{booking.name}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)' }}>{isBn ? 'মোবাইল:' : 'Mobile:'}</span>{' '}
                  <strong style={{ color: 'var(--color-text-main)' }}>{booking.mobile}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)' }}>{isBn ? 'অ্যাপ্লায়েন্স:' : 'Service:'}</span>{' '}
                  <strong style={{ color: 'var(--color-text-main)' }}>{booking.serviceName || booking.service} ({booking.brand})</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)' }}>{isBn ? 'তারিখ ও সময়:' : 'Slot:'}</span>{' '}
                  <strong style={{ color: 'var(--color-text-main)' }}>{booking.preferredDate} ({booking.preferredTime})</strong>
                </div>
              </div>

              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--color-border-light)', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{isBn ? 'ঠিকানা:' : 'Address:'}</span> {booking.address}
              </div>

              <div style={{ marginTop: '10px', fontSize: '0.8125rem', color: 'var(--color-primary-dark)', fontWeight: 600 }}>
                {isBn
                  ? 'ডোরস্টেপ পরিদর্শন ফি: ₹২৯৯ (অন-সাইট ডায়াগনোসিসের সময় প্রযোজ্য)'
                  : 'Doorstep Inspection Fee: ₹299 (payable upon physical diagnosis)'}
              </div>
            </div>
          )}

          {/* 2 Primary Immediate Actions: Call Coordinator & WhatsApp Desk */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
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
