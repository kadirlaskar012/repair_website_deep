'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Home,
  ChevronRight,
  Search,
  Truck,
  CheckCircle2,
  Calendar,
  Wrench,
  Clock,
  Phone,
  MessageCircle,
  AlertCircle,
  ShieldCheck,
  User,
  MapPin,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react';
import Header from '@/components/header/Header';
import LocationBar from '@/components/header/LocationBar';
import Footer from '@/components/footer/Footer';
import BookingModal from '@/components/modal/BookingModal';
import SearchModal from '@/components/search/SearchModal';
import {
  Category,
  Brand,
  LocationItem,
  SiteSettings,
  SearchKeywordItem,
  Booking,
  Language
} from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface TrackPageViewProps {
  categories: Category[];
  brands: Brand[];
  locations: LocationItem[];
  settings: SiteSettings;
  keywords: SearchKeywordItem[];
  lang: Language;
}

export default function TrackPageView({
  categories,
  brands,
  locations,
  settings,
  keywords,
  lang
}: TrackPageViewProps) {
  const isBn = lang === 'bn';
  const t = getDictionary(lang);
  const searchParams = useSearchParams();

  const [bookingIdInput, setBookingIdInput] = useState(searchParams?.get('id') || '');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const queryId = searchParams?.get('id');
    if (queryId) {
      setBookingIdInput(queryId);
      handleTrack(queryId);
    }
  }, [searchParams]);

  const handleTrack = async (targetIdInput?: string) => {
    const targetId = (targetIdInput || bookingIdInput).trim();
    if (!targetId) return;

    setLoading(true);
    setErrorMessage('');
    setBooking(null);

    try {
      const res = await fetch(`/api/bookings/${encodeURIComponent(targetId)}`, {
        cache: 'no-store'
      });
      const data = await res.json();

      if (!res.ok || !data.success || !data.booking) {
        setErrorMessage(
          isBn
            ? `বুকিং নম্বর "${targetId}" খুঁজে পাওয়া যায়নি। অনুগ্রহ করে আইডি যাচাই করুন অথবা সরাসরি হেল্পলাইনে ফোন করুন।`
            : `Booking ID "${targetId}" not found in our database. Please check your reference code or call our helpline.`
        );
        return;
      }

      setBooking(data.booking);
    } catch (e) {
      setErrorMessage(
        isBn
          ? 'সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।'
          : 'Unable to connect to database. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'cancelled':
        return -1;
      case 'completed':
        return 4;
      case 'in_progress':
      case 'in-progress':
        return 3;
      case 'confirmed':
        return 2;
      case 'pending':
      default:
        return 1;
    }
  };

  const currentStep = getStatusStep(booking?.status);

  const steps = [
    {
      step: 1,
      title: isBn ? 'বুকিং গৃহীত হয়েছে' : 'Booking Received',
      desc: isBn ? 'রিয়েলটাইম সিস্টেমে সংরক্ষিত' : 'Order logged in realtime DB'
    },
    {
      step: 2,
      title: isBn ? 'বুকিং নিশ্চিত ও টেকনিশিয়ান বরাদ্দ' : 'Confirmed & Tech Allocated',
      desc: isBn ? 'নিকটবর্তী টেকনিশিয়ান নির্ধারিত হচ্ছে' : 'Field engineer queued'
    },
    {
      step: 3,
      title: isBn ? 'ডোরস্টেপ পরিদর্শন ও ডায়াগনোসিস' : 'Inspection / In Progress',
      desc: isBn ? 'স্বচ্ছ ₹২৯৯ পরিদর্শন ফি' : 'Doorstep ₹299 inspection'
    },
    {
      step: 4,
      title: isBn ? 'মেরামত সম্পন্ন ও ৯০ দিনের ওয়ারেন্টি' : 'Completed & 90-Day Warranty',
      desc: isBn ? 'বিল ও ওয়ারেন্টি সক্রিয়' : 'Service invoice & warranty active'
    }
  ];

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

      <main style={{ minHeight: '65vh', backgroundColor: 'var(--color-bg-warm)', paddingBottom: '60px' }}>
        {/* Breadcrumb Header */}
        <section style={{ paddingTop: '28px', paddingBottom: '24px' }}>
          <div className="container">
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
              <Link href={isBn ? '/bn' : '/'} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'inherit' }}>
                <Home size={14} />
                <span>{t.home}</span>
              </Link>
              <ChevronRight size={14} />
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                {isBn ? 'বুকিং ট্র্যাকিং' : 'Track Booking'}
              </span>
            </nav>

            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(15, 118, 110, 0.12)',
                  color: 'var(--color-primary-dark)',
                  border: '1px solid rgba(15, 118, 110, 0.25)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  marginBottom: '14px'
                }}
              >
                <Truck size={16} />
                <span>{isBn ? 'লাইভ টেকনিশিয়ান ট্র্যাকিং' : 'Real-Time Technician Tracking'}</span>
              </div>

              <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.35rem)', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '10px' }}>
                {isBn ? 'আপনার বুকিং স্ট্যাটাস ট্র্যাক করুন' : 'Track Your Appliance Repair Booking'}
              </h1>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                {isBn
                  ? 'বুকিং সম্পন্ন হওয়ার পর প্রাপ্ত AS- (৮ সংখ্যার কোড) লিখে তাৎক্ষণিক কাজের অগ্রগতি দেখুন।'
                  : 'Enter your 8-digit Booking ID to check real-time service updates, technician arrival, and warranty.'}
              </p>
            </div>
          </div>
        </section>

        {/* Tracking Card Component */}
        <div className="container" style={{ maxWidth: '640px' }}>
          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderRadius: '20px',
              padding: '24px 28px',
              border: '1.5px solid var(--color-border)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)'
            }}
          >
            {/* Search Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleTrack();
              }}
              style={{ marginBottom: '22px' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}
              >
                <label
                  htmlFor="track-page-input"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--color-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Search size={15} style={{ color: 'var(--color-primary)' }} />
                  <span>{isBn ? 'আপনার বুকিং নম্বরটি লিখুন:' : 'Booking Reference ID:'}</span>
                </label>

                {bookingIdInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setBookingIdInput('');
                      setBooking(null);
                      setErrorMessage('');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-text-muted)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    {isBn ? 'মুছে ফেলুন' : 'Clear'}
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ position: 'relative', flex: '1 1 240px' }}>
                  <input
                    id="track-page-input"
                    type="text"
                    value={bookingIdInput}
                    onChange={(e) => setBookingIdInput(e.target.value)}
                    placeholder={isBn ? 'উদা: AS-84920147 বা ACR-XXXX' : 'e.g. AS-84920147 or ACR-XXXX'}
                    className="form-control"
                    style={{
                      paddingLeft: '14px',
                      paddingRight: '14px',
                      height: '48px',
                      fontSize: '16px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      borderColor: 'var(--color-border)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
                    }}
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !bookingIdInput.trim()}
                  className="btn btn-primary"
                  style={{
                    minHeight: '48px',
                    padding: '8px 24px',
                    fontWeight: 700,
                    flexShrink: 0,
                    borderRadius: 'var(--radius-md)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 3px 12px rgba(15, 118, 110, 0.25)'
                  }}
                >
                  {loading ? (
                    <>
                      <RotateCcw size={16} className="animate-spin" />
                      <span>{isBn ? 'খোঁজা হচ্ছে...' : 'Tracking...'}</span>
                    </>
                  ) : (
                    <>
                      <Search size={16} />
                      <span>{isBn ? 'লাইভ ট্র্যাক করুন' : 'Track Status'}</span>
                    </>
                  )}
                </button>
              </div>

              <div style={{ marginTop: '6px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                {isBn
                  ? '💡 বুকিং করার সময় প্রাপ্ত রেফারেন্স নম্বর (যেমন: AS-84920147) দিন'
                  : '💡 Enter the booking reference code provided upon appointment confirmation'}
              </div>
            </form>

            {/* Error Message Alert */}
            {errorMessage && (
              <div
                style={{
                  padding: '14px 16px',
                  backgroundColor: '#FEE2E2',
                  border: '1.5px solid #FCA5A5',
                  borderRadius: '12px',
                  color: '#991B1B',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  marginBottom: '20px',
                  lineHeight: 1.5
                }}
              >
                <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '2px' }}>{isBn ? 'তথ্য পাওয়া যায়নি' : 'Booking Not Found'}</div>
                  <div>{errorMessage}</div>
                  <div style={{ marginTop: '8px' }}>
                    <a
                      href="tel:6291674186"
                      style={{ color: 'var(--color-primary-dark)', fontWeight: 700, textDecoration: 'underline' }}
                    >
                      {isBn ? 'সরাসরি হেল্পলাইনে ফোন করুন: 6291674186' : 'Call Helpline: 6291674186'}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Found Booking Card */}
            {booking && (
              <div>
                {/* Top Status Header */}
                <div
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    border: '1.5px solid var(--color-border)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      {isBn ? 'বুকিং রেফারেন্স নম্বর' : 'Booking Reference'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                      <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '0.04em' }}>
                        {booking.bookingId}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(booking.bookingId)}
                        title={isBn ? 'কপি করুন' : 'Copy ID'}
                        style={{
                          background: 'none',
                          border: '1px solid var(--color-border)',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '0.75rem',
                          color: 'var(--color-text-muted)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {copied ? <Check size={14} color="var(--color-success)" /> : <Copy size={14} />}
                        <span>{copied ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি' : 'Copy')}</span>
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '24px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      backgroundColor:
                        booking.status === 'completed'
                          ? 'rgba(16, 185, 129, 0.15)'
                          : booking.status === 'cancelled'
                          ? 'rgba(239, 68, 68, 0.15)'
                          : 'rgba(245, 158, 11, 0.15)',
                      color:
                        booking.status === 'completed'
                          ? '#065F46'
                          : booking.status === 'cancelled'
                          ? '#991B1B'
                          : '#92400E'
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor:
                          booking.status === 'completed'
                            ? '#10B981'
                            : booking.status === 'cancelled'
                            ? '#EF4444'
                            : '#F59E0B'
                      }}
                    />
                    <span>
                      {booking.status === 'completed'
                        ? isBn ? 'সম্পন্ন (Completed)' : 'Completed'
                        : booking.status === 'cancelled'
                        ? isBn ? 'বাতিল (Cancelled)' : 'Cancelled'
                        : booking.status === 'confirmed'
                        ? isBn ? 'নিশ্চিত (Confirmed)' : 'Confirmed'
                        : isBn ? 'অপেক্ষমান (Pending)' : 'Pending'}
                    </span>
                  </div>
                </div>

                {/* Customer & Appliance Details Card (Requested by user) */}
                <div
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    border: '1.5px solid var(--color-border)',
                    borderRadius: '16px',
                    padding: '18px 20px',
                    marginBottom: '16px',
                    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--color-primary-dark)',
                      marginBottom: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid var(--color-border-light)',
                      paddingBottom: '8px'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={15} />
                      <span>{isBn ? 'গ্রাহক ও অ্যাপ্লায়েন্স বিবরণ' : 'Customer & Appliance Details'}</span>
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(16, 185, 129, 0.12)',
                        color: '#065F46',
                        padding: '3px 8px',
                        borderRadius: '12px'
                      }}
                    >
                      <ShieldCheck size={12} />
                      <span>{isBn ? '৯০ দিন ওয়ারেন্টি' : '90-Day Warranty'}</span>
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '12px',
                      fontSize: '0.875rem'
                    }}
                  >
                    {/* Customer Name */}
                    <div
                      style={{
                        padding: '10px 12px',
                        backgroundColor: 'var(--color-bg-warm)',
                        borderRadius: '10px',
                        border: '1px solid var(--color-border-light)'
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <User size={13} />
                        <span>{isBn ? 'গ্রাহকের নাম' : 'Customer Name'}</span>
                      </div>
                      <div style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: '0.9375rem' }}>
                        {booking.name}
                      </div>
                    </div>

                    {/* Customer Mobile */}
                    <div
                      style={{
                        padding: '10px 12px',
                        backgroundColor: 'var(--color-bg-warm)',
                        borderRadius: '10px',
                        border: '1px solid var(--color-border-light)'
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Phone size={13} />
                        <span>{isBn ? 'মোবাইল নম্বর' : 'Phone Number'}</span>
                      </div>
                      <div>
                        <a
                          href={`tel:${booking.mobile}`}
                          style={{
                            fontWeight: 700,
                            color: 'var(--color-primary)',
                            fontSize: '0.9375rem',
                            textDecoration: 'none'
                          }}
                        >
                          {booking.mobile}
                        </a>
                      </div>
                    </div>

                    {/* Appliance Category & Brand */}
                    <div
                      style={{
                        padding: '10px 12px',
                        backgroundColor: 'var(--color-bg-warm)',
                        borderRadius: '10px',
                        border: '1px solid var(--color-border-light)'
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Wrench size={13} />
                        <span>{isBn ? 'অ্যাপ্লায়েন্স ও ব্র্যান্ড' : 'Service & Brand'}</span>
                      </div>
                      <div style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: '0.9375rem' }}>
                        {booking.serviceName || booking.service} {booking.brand ? `• ${booking.brand}` : ''}
                      </div>
                    </div>

                    {/* Problem / Issue */}
                    <div
                      style={{
                        padding: '10px 12px',
                        backgroundColor: 'var(--color-bg-warm)',
                        borderRadius: '10px',
                        border: '1px solid var(--color-border-light)'
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <AlertCircle size={13} />
                        <span>{isBn ? 'সমস্যা / ইস্যু' : 'Reported Issue'}</span>
                      </div>
                      <div style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: '0.9375rem' }}>
                        {booking.problem || (isBn ? 'সাধারণ পরিদর্শন ও মেরামত' : 'General repair & inspection')}
                      </div>
                    </div>
                  </div>

                  {/* Service Address & Schedule */}
                  <div
                    style={{
                      marginTop: '12px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '10px'
                    }}
                  >
                    {booking.address && (
                      <div
                        style={{
                          padding: '10px 12px',
                          backgroundColor: 'var(--color-bg-warm)',
                          borderRadius: '10px',
                          border: '1px solid var(--color-border-light)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px'
                        }}
                      >
                        <MapPin size={15} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                        <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-main)' }}>
                          <strong style={{ color: 'var(--color-text-muted)' }}>{isBn ? 'ঠিকানা: ' : 'Address: '}</strong>
                          {booking.address}
                        </div>
                      </div>
                    )}

                    <div
                      style={{
                        padding: '10px 12px',
                        backgroundColor: 'var(--color-bg-warm)',
                        borderRadius: '10px',
                        border: '1px solid var(--color-border-light)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px'
                      }}
                    >
                      <Clock size={15} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-main)' }}>
                        <strong style={{ color: 'var(--color-text-muted)' }}>{isBn ? 'সার্ভিস শিডিউল: ' : 'Schedule: '}</strong>
                        {booking.preferredTime || (isBn ? 'জরুরি / দ্রুততম সময়ে' : 'Immediate / ASAP')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Stepper Timeline */}
                {booking.status !== 'cancelled' && (
                  <div
                    style={{
                      backgroundColor: 'var(--color-bg-alt)',
                      border: '1px solid var(--color-border-light)',
                      borderRadius: '14px',
                      padding: '18px 16px',
                      marginBottom: '16px'
                    }}
                  >
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '16px' }}>
                      {isBn ? 'কাজের অগ্রগতি (Status Timeline):' : 'Status Timeline:'}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {steps.map((st) => {
                        const isDone = currentStep >= st.step;
                        const isCurrent = currentStep === st.step;

                        return (
                          <div key={st.step} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <div
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: isDone ? 'var(--color-primary)' : 'var(--color-border)',
                                color: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                flexShrink: 0,
                                marginTop: '2px',
                                boxShadow: isCurrent ? '0 0 0 4px rgba(15, 118, 110, 0.2)' : 'none'
                              }}
                            >
                              {isDone ? <CheckCircle2 size={16} /> : st.step}
                            </div>

                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '0.875rem', fontWeight: isDone ? 700 : 500, color: isDone ? 'var(--color-text-main)' : 'var(--color-text-muted)' }}>
                                {st.title}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                {st.desc}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Direct WhatsApp & Call Buttons */}
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'rgba(37, 211, 102, 0.08)',
                    border: '1px solid rgba(37, 211, 102, 0.3)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#0F5132', fontSize: '0.875rem' }}>
                      {isBn ? 'টেকনিশিয়ান আপডেট চান?' : 'Need Live Technician Updates?'}
                    </div>
                    <div style={{ fontSize: '0.78125rem', color: '#155724' }}>
                      {isBn ? 'সরাসরি হেল্পডেস্ক বা টেকনিশিয়ানের সাথে চ্যাট করুন' : 'Connect instantly with our coordination desk'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a
                      href={`https://wa.me/916291674186?text=${encodeURIComponent(
                        isBn
                          ? `নমস্কার Appliance Seva,\nআমার বুকিং নম্বর: ${booking.bookingId}\nগ্রাহক: ${booking.name}\nমোবাইল: ${booking.mobile}\nসার্ভিস: ${booking.serviceName || booking.service} (${booking.brand})\nসমস্যা: ${booking.problem || 'সাধারণ মেরামত'}\n\nদয়া করে টেকনিশিয়ান আপডেট দিন।`
                          : `Hello Appliance Seva,\nBooking ID: ${booking.bookingId}\nCustomer: ${booking.name}\nMobile: ${booking.mobile}\nService: ${booking.serviceName || booking.service} (${booking.brand})\nIssue: ${booking.problem || 'General Repair'}\n\nPlease share technician arrival update.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{
                        backgroundColor: '#25D366',
                        color: '#FFFFFF',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        padding: '9px 16px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        borderRadius: '8px',
                        textDecoration: 'none'
                      }}
                    >
                      <MessageCircle size={16} />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href="tel:6291674186"
                      className="btn btn-outline"
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        padding: '9px 16px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        borderRadius: '8px'
                      }}
                    >
                      <Phone size={15} />
                      <span>{isBn ? 'কল করুন' : 'Call'}</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer settings={settings} categories={categories} locations={locations} lang={lang} />

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
