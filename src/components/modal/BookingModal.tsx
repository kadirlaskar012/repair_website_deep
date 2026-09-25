'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar } from 'lucide-react';
import { Category, Brand, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bulletproof background scroll locking
  useEffect(() => {
    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => {
      if (isOpen) unlockScroll();
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="modal-overlay booking-modal-overlay"
      onClick={onClose}
      onTouchMove={(e) => {
        // Prevent background touch scrolling if touching backdrop directly
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="modal-dialog booking-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Bar */}
        <div className="modal-drag-indicator" aria-hidden="true">
          <div className="modal-drag-pill" />
        </div>

        {/* Modal Sticky Header */}
        <div className="booking-modal-header">
          <div className="booking-modal-header-left">
            <div className="booking-modal-icon-badge" aria-hidden="true">
              <Calendar size={18} />
            </div>
            <div>
              <h3 id="booking-modal-title" className="booking-modal-title">
                {t.bookingFormTitle}
              </h3>
              <p className="booking-modal-subtitle">
                {t.bookingFormSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="booking-modal-close-btn"
            aria-label={t.modalClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Form Body */}
        <div className="booking-modal-body">
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

  return createPortal(modalContent, document.body);
}
