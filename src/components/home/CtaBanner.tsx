import React from 'react';
import { Phone, MessageCircle, Calendar, Wrench } from 'lucide-react';
import { Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface CtaBannerProps {
  lang: Language;
  onOpenBooking: () => void;
  phone: string;
  whatsapp: string;
}

export default function CtaBanner({ lang, onOpenBooking, phone, whatsapp }: CtaBannerProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';

  return (
    <section style={{ backgroundColor: 'var(--color-primary)', color: '#FFFFFF', padding: '64px 0' }}>
      <div className="container">
        <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}
          >
            <Wrench size={28} />
          </div>

          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#FFFFFF', marginBottom: '14px', fontWeight: 800 }}>
            {t.ctaBannerTitle}
          </h2>

          <p style={{ fontSize: '1.0625rem', color: '#D2E8E3', marginBottom: '32px', maxWidth: '640px', margin: '0 auto 32px auto', lineHeight: 1.6 }}>
            {t.ctaBannerSubtitle}
          </p>

          {/* 3 Channels: Call, WhatsApp, Online Booking Form */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <button
              onClick={onOpenBooking}
              className="btn btn-accent btn-lg"
              style={{ minWidth: '220px' }}
            >
              <Calendar size={18} />
              <span>{t.bookOnline}</span>
            </button>

            <a
              href={`tel:${phone}`}
              className="btn btn-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                minWidth: '180px'
              }}
            >
              <Phone size={18} />
              <span>{t.emergencyCall}</span>
            </a>

            <a
              href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              style={{ minWidth: '200px' }}
            >
              <MessageCircle size={18} />
              <span>{t.whatsappBooking}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
