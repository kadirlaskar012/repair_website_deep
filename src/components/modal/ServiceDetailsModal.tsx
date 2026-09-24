'use client';

import React, { useEffect } from 'react';
import { X, Phone, MessageCircle, Calendar, AlertCircle, CheckCircle2, Wrench } from 'lucide-react';
import { Problem, Category, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface ServiceDetailsModalProps {
  problem: Problem | null;
  category?: Category;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (problem: Problem) => void;
  phone: string;
  whatsapp: string;
  lang: Language;
}

export default function ServiceDetailsModal({
  problem,
  category,
  isOpen,
  onClose,
  onBookNow,
  phone,
  whatsapp,
  lang
}: ServiceDetailsModalProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';

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

  if (!isOpen || !problem) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '0', overflow: 'hidden' }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid var(--color-border-light)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
            background: 'var(--color-bg-warm)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary-dark)',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}
              >
                {category ? (isBn ? category.nameBn : category.name) : 'Diagnosis'}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                {isBn ? 'ডোরস্টেপ পরিদর্শন' : 'Doorstep Inspection'}
              </span>
            </div>

            <h3 style={{ fontSize: '1.35rem', color: 'var(--color-text-main)', lineHeight: 1.3 }}>
              {isBn ? problem.titleBn : problem.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '6px',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)'
            }}
            aria-label={t.modalClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px', maxHeight: '60vh', overflowY: 'auto' }}>
          {/* Problem Explanation */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
              {isBn ? 'সমস্যার বিবরণ' : 'Problem Overview'}
            </h4>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
              {isBn ? problem.descriptionBn : problem.description}
            </p>
          </div>

          {/* Common Symptoms List */}
          {((isBn ? problem.symptomsBn : problem.symptoms) || []).length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                {isBn ? 'সাধারণ লক্ষণসমূহ' : 'Key Symptoms'}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {(isBn ? problem.symptomsBn : problem.symptoms).map((s, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Probable Cause & Solution Note */}
          <div style={{ backgroundColor: 'var(--color-bg-alt)', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
              {isBn ? 'সম্ভাব্য কারণ ও প্রযুক্তিগত সমাধান:' : 'Root Cause & Technician Procedure:'}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '8px' }}>
              {isBn ? problem.commonCausesBn : problem.commonCauses}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
              {isBn ? problem.solutionNoteBn : problem.solutionNote}
            </div>
          </div>

          {/* Mandatory ₹299 Visit & Diagnosis Notice */}
          <div
            style={{
              backgroundColor: 'var(--color-primary-light)',
              border: '1.5px solid rgba(20, 108, 91, 0.25)',
              borderRadius: '8px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}
          >
            <AlertCircle size={20} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '2px' }}>
                {isBn ? '₹২৯৯ পরিদর্শন ও ডায়াগনোসিস ফি' : 'Fixed ₹299 Visit & Diagnosis Fee'}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                {isBn ? problem.diagnosticFeeNoteBn : problem.diagnosticFeeNote}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with 3 Actions: Call, WhatsApp, Book Now */}
        <div
          style={{
            padding: '16px 28px',
            borderTop: '1px solid var(--color-border-light)',
            backgroundColor: 'var(--color-bg-card)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <button
            onClick={() => onBookNow(problem)}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            <Calendar size={18} />
            <span>{isBn ? 'এই সমস্যার জন্য সার্ভিস বুক করুন' : 'Book Technician For This Problem'}</span>
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <a
              href={`tel:${phone}`}
              className="btn btn-outline btn-sm"
              style={{ width: '100%' }}
            >
              <Phone size={15} />
              <span>{t.callNow}</span>
            </a>

            <a
              href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`Hi, I need assistance regarding: ${problem.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{ width: '100%' }}
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
