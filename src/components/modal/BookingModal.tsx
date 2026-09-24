'use client';

import React, { useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { Category, Brand, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import BookingForm from '../booking/BookingForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  brands: Brand[];
  initialCategory?: string;
  initialBrand?: string;
  initialProblem?: string;
  lang: Language;
}

export default function BookingModal({
  isOpen,
  onClose,
  categories,
  brands,
  initialCategory,
  initialBrand,
  initialProblem,
  lang
}: BookingModalProps) {
  const t = getDictionary(lang);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', padding: '0', overflow: 'hidden' }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-bg-warm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--color-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, color: 'var(--color-text-main)', lineHeight: 1.2 }}>
                {t.bookingFormTitle}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                {t.bookingFormSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ padding: '6px', borderRadius: '6px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
            aria-label={t.modalClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '24px', maxHeight: '78vh', overflowY: 'auto' }}>
          <BookingForm
            categories={categories}
            brands={brands}
            initialCategory={initialCategory}
            initialBrand={initialBrand}
            initialProblem={initialProblem}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
}
