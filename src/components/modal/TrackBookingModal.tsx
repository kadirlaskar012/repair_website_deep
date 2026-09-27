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
  RotateCcw
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
      desc: isBn ? 'ডোরস্টেপ পরিদর্শন ও ডায়াগনোসিস' : 'Doorstep ₹299 inspection'
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
            style={{ marginBottom: '20px' }}
          >
            <label
              htmlFor="tracking-input"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--color-text-main)',
                marginBottom: '8px'
              }}
            >
              {isBn ? 'বুকিং নম্বর লিখুন:' : 'Enter Booking Number:'}
            </label>

            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  id="tracking-input"
                  type="text"
                  value={bookingIdInput}
                  onChange={(e) => setBookingIdInput(e.target.value)}
                  placeholder={isBn ? 'উদা: AS-84920147' : 'e.g. AS-84920147'}
                  className="form-control"
                  style={{
                    paddingLeft: '14px',
                    fontSize: '16px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase'
                  }}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={loading || !bookingIdInput.trim()}
                className="btn btn-primary"
                style={{
                  minHeight: '44px',
                  padding: '8px 20px',
                  fontWeight: 700,
                  flexShrink: 0
                }}
              >
                {loading ? (
                  <span>{isBn ? 'খোঁজা হচ্ছে...' : 'Tracking...'}</span>
                ) : (
                  <>
                    <Search size={16} />
                    <span>{isBn ? 'ট্র্যাক করুন' : 'Track'}</span>
                  </>
                )}
              </button>
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
                  borderRadius: '14px',
                  padding: '16px 18px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    {isBn ? 'বুকিং রেফারেন্স আইডি' : 'Booking Reference'}
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '0.04em' }}>
                    {booking.bookingId}
                  </div>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '20px',
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

              {/* Progress Stepper Timeline */}
              {booking.status !== 'cancelled' && (
                <div
                  style={{
                    backgroundColor: 'var(--color-bg-alt)',
                    border: '1px solid var(--color-border-light)',
                    borderRadius: '14px',
                    padding: '18px 16px',
                    marginBottom: '20px'
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

              {/* Booking Key Info Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px',
                  marginBottom: '20px'
                }}
              >
                <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border-light)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                    <Wrench size={13} />
                    <span>{isBn ? 'অ্যাপ্লায়েন্স ও ব্র্যান্ড' : 'Service & Brand'}</span>
                  </div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                    {booking.serviceName || booking.service} {booking.brand ? `(${booking.brand})` : ''}
                  </div>
                </div>

                <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border-light)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                    <Calendar size={13} />
                    <span>{isBn ? 'নির্ধারিত তারিখ ও সময়' : 'Appointment Slot'}</span>
                  </div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                    {booking.preferredDate} • {booking.preferredTime}
                  </div>
                </div>
              </div>

              {/* Customer Care Direct Actions */}
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'rgba(37, 211, 102, 0.08)',
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: '#0F5132', fontSize: '0.875rem' }}>
                    {isBn ? 'বুকিং সংক্রান্ত প্রশ্ন আছে?' : 'Have Questions About This Booking?'}
                  </div>
                  <div style={{ fontSize: '0.78125rem', color: '#155724' }}>
                    {isBn ? 'আমাদের টিম তাৎক্ষণিক সাহায্য করবে' : 'Our team can assist with technician status'}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <a
                    href={`https://wa.me/916291674186?text=${encodeURIComponent(
                      `Hello Appliance Seva, I want an update regarding my booking ID ${booking.bookingId} (${booking.serviceName || booking.service}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                      backgroundColor: '#25D366',
                      color: '#FFFFFF',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      padding: '8px 14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      borderRadius: '8px',
                      textDecoration: 'none'
                    }}
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="tel:6291674186"
                    className="btn btn-outline"
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      padding: '8px 14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      borderRadius: '8px'
                    }}
                  >
                    <Phone size={15} />
                    <span>Call</span>
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
