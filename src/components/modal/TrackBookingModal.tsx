'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  Wrench,
  Calendar,
  Phone,
  MessageCircle,
  AlertCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  User,
  MapPin,
  Copy,
  Check
} from 'lucide-react';
import { Language, Booking } from '@/lib/types';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

interface TrackBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialBookingId?: string;
}

export default function TrackBookingModal({
  isOpen,
  onClose,
  lang,
  initialBookingId = ''
}: TrackBookingModalProps) {
  const isBn = lang === 'bn';

  const [bookingIdInput, setBookingIdInput] = useState(initialBookingId);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      lockScroll();
      if (initialBookingId) {
        setBookingIdInput(initialBookingId);
        handleTrack(initialBookingId);
      }
    } else {
      unlockScroll();
    }
    return () => {
      if (isOpen) unlockScroll();
    };
  }, [isOpen, initialBookingId]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTrack = async (idToTrack?: string) => {
    const targetId = (idToTrack || bookingIdInput).trim();
    if (!targetId) {
      setErrorMessage(
        isBn
          ? 'অনুগ্রহ করে বুকিং নম্বর (যেমন: AS-84920147) লিখুন'
          : 'Please enter your Booking ID (e.g. AS-84920147)'
      );
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSearched(true);
    setBooking(null);

    try {
      const res = await fetch(`/api/bookings/${encodeURIComponent(targetId)}`, {
        cache: 'no-store'
      });
      const data = await res.json();

      if (!res.ok || !data.success || !data.booking) {
        setErrorMessage(
          isBn
            ? `বুকিং নম্বর "${targetId}" খুঁজে পাওয়া যায়নি। অনুগ্রহ করে আইডি চেক করুন অথবা হেল্পলাইনে যোগাযোগ করুন।`
            : `Booking ID "${targetId}" not found. Please verify the ID or call our helpline directly.`
        );
        return;
      }

      setBooking(data.booking);
    } catch (err: any) {
      setErrorMessage(
        isBn
          ? 'সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।'
          : 'Failed to connect to real-time server. Please try again.'
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

  // Status timeline steps
  const steps = [
    {
      step: 1,
      title: isBn ? 'বুকিং জমা হয়েছে' : 'Booking Received',
      desc: isBn ? 'সিস্টেমে বুকিং নিবন্ধিত' : 'Order logged in realtime DB'
    },
    {
      step: 2,
      title: isBn ? 'বুকিং নিশ্চিত ও টেকনিশিয়ান বরাদ্দ' : 'Confirmed & Tech Allocated',
      desc: isBn ? 'নিকটবর্তী টেকনিশিয়ান নির্ধারিত হচ্ছে' : 'Field engineer queued'
    },
    {
      step: 3,
      title: isBn ? 'পরিদর্শন ও মেরামত চলছে' : 'Inspection / In Progress',
      desc: isBn ? 'ডোরস্টেপ পরিদর্শন ও ডায়াগনোসিস' : 'Doorstep diagnosis & quote'
    },
    {
      step: 4,
      title: isBn ? 'মেরামত সম্পন্ন ও ওয়ারেন্টি সক্রিয়' : 'Completed & 90-Day Warranty',
      desc: isBn ? 'বিল ও ওয়ারেন্টি অ্যাক্টিভ' : 'Service invoice & warranty active'
    }
  ];

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="track-modal-title"
    >
      <div
        className="modal-dialog review-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '580px' }}
      >
        {/* Mobile Drag Indicator Bar */}
        <div className="modal-drag-indicator" aria-hidden="true">
          <div className="modal-drag-pill" />
        </div>

        {/* Modal Sticky Header */}
        <div className="booking-modal-header">
          <div className="booking-modal-header-left">
            <div
              className="booking-modal-icon-badge"
              style={{
                background: 'linear-gradient(135deg, #0F766E 0%, #0D9488 100%)',
                color: '#FFFFFF'
              }}
              aria-hidden="true"
            >
              <Truck size={20} />
            </div>
            <div>
              <h3 id="track-modal-title" className="booking-modal-title">
                {isBn ? 'লাইভ বুকিং ট্র্যাকিং' : 'Real-Time Booking Status'}
              </h3>
              <p className="booking-modal-subtitle">
                {isBn
                  ? 'আপনার বুকিং নম্বর দিয়ে রিয়েল-টাইম স্ট্যাটাস ট্র্যাক করুন'
                  : 'Track technician dispatch, status & appointment live'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="booking-modal-close-btn"
            aria-label={isBn ? 'বন্ধ করুন' : 'Close'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="review-modal-body">
          {/* Tracking Search Input Bar */}
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
                htmlFor="tracking-input"
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
                <span>{isBn ? 'আপনার বুকিং নম্বরটি লিখুন:' : 'Enter Your Booking ID:'}</span>
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

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                position: 'relative'
              }}
            >
              <div style={{ position: 'relative', flex: '1 1 240px' }}>
                <input
                  id="tracking-input"
                  type="text"
                  value={bookingIdInput}
                  onChange={(e) => setBookingIdInput(e.target.value)}
                  placeholder={isBn ? 'উদা: AS-84920147 বা ACR-XXXX' : 'e.g. AS-84920147 or ACR-XXXX'}
                  className="form-control"
                  style={{
                    paddingLeft: '14px',
                    paddingRight: '14px',
                    height: '46px',
                    fontSize: '15px',
                    fontWeight: 600,
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
                  minHeight: '46px',
                  padding: '8px 22px',
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
                <div style={{ fontWeight: 700, marginBottom: '2px' }}>
                  {isBn ? 'বুকিং পাওয়া যায়নি' : 'Booking Not Found'}
                </div>
                <div>{errorMessage}</div>
                <div style={{ marginTop: '8px' }}>
                  <a
                    href="tel:6291674186"
                    style={{
                      color: 'var(--color-primary-dark)',
                      fontWeight: 700,
                      textDecoration: 'underline'
                    }}
                  >
                    {isBn ? 'সরাসরি হেল্পলাইনে ফোন করুন: 6291674186' : 'Call Helpline: 6291674186'}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Active Booking Card and Status Timeline */}
          {booking && (
            <div>
              {/* Top Status Badge Header */}
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
                  boxShadow: '0 3px 12px rgba(0,0,0,0.04)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    {isBn ? 'বুকিং রেফারেন্স নম্বর' : 'Booking Reference'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '0.04em' }}>
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
                      ? isBn
                        ? 'সম্পন্ন (Completed)'
                        : 'Completed'
                      : booking.status === 'cancelled'
                      ? isBn
                        ? 'বাতিল (Cancelled)'
                        : 'Cancelled'
                      : booking.status === 'confirmed'
                      ? isBn
                        ? 'নিশ্চিত (Confirmed)'
                        : 'Confirmed'
                      : isBn
                      ? 'অপেক্ষমান (Pending)'
                      : 'Pending'}
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
                    {isBn ? 'লাইভ কাজের অগ্রগতি (Progress Timeline):' : 'Live Progress Timeline:'}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {steps.map((st) => {
                      const isDone = currentStep >= st.step;
                      const isCurrent = currentStep === st.step;

                      return (
                        <div
                          key={st.step}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px'
                          }}
                        >
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              backgroundColor: isDone
                                ? 'var(--color-primary)'
                                : 'var(--color-border)',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              flexShrink: 0,
                              marginTop: '2px',
                              boxShadow: isCurrent ? '0 0 0 4px rgba(15, 118, 110, 0.2)' : 'none',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {isDone ? <CheckCircle2 size={16} /> : st.step}
                          </div>

                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: '0.875rem',
                                fontWeight: isDone ? 700 : 500,
                                color: isDone ? 'var(--color-text-main)' : 'var(--color-text-muted)'
                              }}
                            >
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

              {/* Customer Care Direct Actions */}
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

          {/* Quick Info Box when nothing is searched yet */}
          {!booking && !errorMessage && (
            <div
              style={{
                textAlign: 'center',
                padding: '24px 16px',
                backgroundColor: 'var(--color-bg-alt)',
                borderRadius: '12px',
                border: '1px dashed var(--color-border)'
              }}
            >
              <Truck size={36} color="var(--color-primary)" style={{ margin: '0 auto 10px auto', opacity: 0.8 }} />
              <div style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: '0.9375rem', marginBottom: '4px' }}>
                {isBn ? 'আপনার বুকিং নম্বরটি লিখুন' : 'Enter your 8-digit Booking ID'}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', maxWidth: '340px', margin: '0 auto', lineHeight: 1.5 }}>
                {isBn
                  ? 'বুকিং সম্পন্ন হওয়ার পর যে AS-(৮ সংখ্যার কোড) পেয়েছেন, সেটি লিখে ট্র্যাক করুন।'
                  : 'Track technician dispatch, assigned time slot, and warranty status in real time.'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
