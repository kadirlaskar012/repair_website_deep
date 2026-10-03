'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, User, Phone, MapPin, Wrench, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Category, Brand, Problem, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface BookingFormProps {
  categories: Category[];
  brands: Brand[];
  initialCategory?: string;
  initialBrand?: string;
  initialProblem?: string;
  lang: Language;
  onSuccess?: (bookingId: string) => void;
}

export default function BookingForm({
  categories,
  brands,
  initialCategory = '',
  initialBrand = '',
  initialProblem = '',
  lang,
  onSuccess
}: BookingFormProps) {
  const router = useRouter();
  const t = getDictionary(lang);
  const isBn = lang === 'bn';

  // Form states
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [service, setService] = useState(initialCategory || (categories[0]?.id || 'ac-repair'));
  const [brand, setBrand] = useState(initialBrand || '');
  const [problem, setProblem] = useState(initialProblem || '');
  const [address, setAddress] = useState('');
  
  const todayStr = new Date().toISOString().split('T')[0];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Update initial fields if props change
  useEffect(() => {
    if (initialCategory) setService(initialCategory);
    if (initialBrand) setBrand(initialBrand);
    if (initialProblem) setProblem(initialProblem);
  }, [initialCategory, initialBrand, initialProblem]);

  // Validation checks: Name, Mobile, Category (Service) and Brand enable the booking button
  const isNameValid = name.trim().length >= 2;
  // Indian 10-digit mobile number: starts with 6, 7, 8, 9, followed by 9 digits
  const cleanMobile = mobile.replace(/[^\d]/g, '');
  const isMobileValid = /^[6-9]\d{9}$/.test(cleanMobile);
  const isServiceValid = Boolean(service);
  const isBrandValid = Boolean(brand.trim());

  // Form is valid and booking button is enabled as soon as name, number, category and brand are selected
  const isFormValid =
    isNameValid &&
    isMobileValid &&
    isServiceValid &&
    isBrandValid;

  // Filtered brands for selected service
  const availableBrands = brands.filter(
    (b) => !service || b.categoryIds.includes(service)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const selectedCat = categories.find((c) => c.id === service);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          mobile: cleanMobile,
          service,
          serviceName: selectedCat ? (isBn ? selectedCat.nameBn : selectedCat.name) : service,
          brand: brand.trim(),
          problem: problem.trim() || (isBn ? 'সাধারণ পরিদর্শন ও মেরামত' : 'General repair & inspection'),
          address: address.trim() || (isBn ? 'ফোনে ঠিকানা জানানো হবে' : 'Address to be confirmed on phone call'),
          preferredDate: todayStr,
          preferredTime: isBn ? 'জরুরি / দ্রুততম সময়ে' : 'Immediate / ASAP',
          lang
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit booking. Please try again.');
      }

      const booking = data.booking;
      const bookingId = booking.bookingId;
      try {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(`booking_${bookingId}`, JSON.stringify(booking));
        }
      } catch (e) {}

      if (onSuccess) {
        onSuccess(bookingId);
      } else {
        const targetUrl = isBn ? `/bn/booking-success?id=${bookingId}` : `/booking-success?id=${bookingId}`;
        router.push(targetUrl);
      }
    } catch (err: any) {
      console.error('Booking submission error:', err);
      setSubmitError(err.message || 'Something went wrong. Please call helpline directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form-container">
      {submitError && (
        <div
          style={{
            backgroundColor: '#FDF2F2',
            border: '1px solid #F8B4B4',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            color: '#9B1C1C',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <AlertCircle size={18} />
          <span>{submitError}</span>
        </div>
      )}

      {/* Row 1: Name & Mobile */}
      <div className="booking-form-grid">
        <div className="form-group" style={{ margin: 0 }}>
          <label htmlFor="booking-name" className="form-label">
            {t.fullName} <span className="required">*</span>
          </label>
          <input
            id="booking-name"
            name="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.fullNamePlaceholder}
            autoComplete="name"
            required
          />
          {name && !isNameValid && (
            <div className="form-error">{isBn ? 'কমপক্ষে ২ অক্ষরের নাম লিখুন' : 'Please enter at least 2 characters'}</div>
          )}
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label htmlFor="booking-mobile" className="form-label">
            {t.mobileNumber} <span className="required">*</span>
          </label>
          <input
            id="booking-mobile"
            name="mobile"
            type="tel"
            className="form-control"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder={t.mobilePlaceholder}
            autoComplete="tel"
            maxLength={10}
            required
          />
          {mobile && !isMobileValid && (
            <div className="form-error">{isBn ? 'সঠিক ১০-সংখ্যার ভারতীয় মোবাইল নম্বর দিন' : 'Enter valid 10-digit mobile number'}</div>
          )}
        </div>
      </div>

      {/* Row 2: Service & Brand */}
      <div className="booking-form-grid">
        <div className="form-group" style={{ margin: 0 }}>
          <label htmlFor="booking-service" className="form-label">
            {t.selectService} <span className="required">*</span>
          </label>
          <select
            id="booking-service"
            name="service"
            className="form-control"
            value={service}
            onChange={(e) => {
              setService(e.target.value);
              setBrand('');
            }}
            required
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {isBn ? c.nameBn : c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label htmlFor="booking-brand" className="form-label">
            {t.selectBrand} <span className="required">*</span>
          </label>
          <select
            id="booking-brand"
            name="brand"
            className="form-control"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          >
            <option value="">{t.selectBrandPlaceholder}</option>
            {availableBrands.map((b) => (
              <option key={b.id} value={b.name}>
                {b.name}
              </option>
            ))}
            <option value="Other Brand">{isBn ? 'অন্যান্য ব্র্যান্ড' : 'Other Brand'}</option>
          </select>
        </div>
      </div>

      {/* Row 3: Problem Description (Optional) */}
      <div className="form-group" style={{ margin: 0 }}>
        <label htmlFor="booking-problem" className="form-label">
          {t.problemDetails} <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>({isBn ? 'ঐচ্ছিক' : 'Optional'})</span>
        </label>
        <input
          id="booking-problem"
          name="problem"
          type="text"
          className="form-control"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder={isBn ? 'সমস্যা লিখুন (ঐচ্ছিক - যেমন: কুলিং হচ্ছে না, অতিরিক্ত শব্দ)' : 'Describe issue (Optional - e.g. Not cooling, making noise)'}
        />
      </div>

      {/* Row 4: Address (Optional) */}
      <div className="form-group" style={{ margin: 0 }}>
        <label htmlFor="booking-address" className="form-label">
          {t.serviceAddress} <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>({isBn ? 'ঐচ্ছিক' : 'Optional'})</span>
        </label>
        <textarea
          id="booking-address"
          name="address"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={isBn ? 'ঠিকানা লিখুন (বাড়ি/এলাকার ঠিকানা বা ফোনেও জানাতে পারেন)' : 'Enter address (or confirm on phone call)'}
          autoComplete="street-address"
          rows={2}
        />
      </div>


      {/* Transparent Pricing Reminder */}
      <div
        style={{
          background: 'var(--color-primary-light)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 14px',
          fontSize: '0.8125rem',
          color: 'var(--color-primary-dark)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
        <span>
          <strong>{isBn ? 'স্বচ্ছ মূল্য:' : 'Transparent Pricing:'}</strong> {isBn ? 'ফোনে কথা বলে সঠিক খরচের ধারণা নিন। কাজ শুরুর আগেই সম্পূর্ণ কোটেশন জানিয়ে অনুমোদন নেওয়া হয়।' : 'Discuss on call for estimate. Total repair quotation confirmed upfront before work starts.'}
        </span>
      </div>

      {/* Submit Button (DISABLED until all mandatory fields are valid) */}
      <div style={{ marginTop: '8px' }}>
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="btn btn-primary btn-lg"
          style={{ width: '100%' }}
        >
          {isSubmitting ? (
            <span>{t.submitting}</span>
          ) : (
            <>
              <Calendar size={18} />
              <span>{t.confirmBookingBtn}</span>
            </>
          )}
        </button>

        {!isFormValid && (
          <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            {isBn ? 'নাম, ১০ সংখ্যার মোবাইল নম্বর, সার্ভিস ও ব্র্যান্ড নির্বাচন করলেই বুকিং বাটন সক্রিয় হবে' : 'Enter Name, 10-digit Mobile, Service and Brand to enable booking'}
          </div>
        )}
      </div>
    </form>
  );
}
