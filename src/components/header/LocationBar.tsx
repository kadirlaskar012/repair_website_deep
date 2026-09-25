'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown, Check, Phone } from 'lucide-react';
import { LocationItem, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface LocationBarProps {
  locations: LocationItem[];
  lang: Language;
  phone?: string;
}

export default function LocationBar({ locations, lang, phone = '+91 6291674186' }: LocationBarProps) {
  const t = getDictionary(lang);
  // Default to Kolkata immediately
  const kolkata = locations.find((l) => l.id === 'loc-kol' || l.name.toLowerCase() === 'kolkata') || locations[0] || null;
  const [selectedLoc, setSelectedLoc] = useState<LocationItem | null>(kolkata);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedSlug = localStorage.getItem('preferred_location_slug');
    const savedId = localStorage.getItem('preferred_location_id');
    const hash = window.location.hash.replace('#', '').toLowerCase();

    // Check hash first, then saved preference, fallback to Kolkata
    const target = hash || savedSlug;
    let match = target ? locations.find((l) => l.hashSlug === target || l.name.toLowerCase() === target) : null;
    if (!match && savedId) {
      match = locations.find((l) => l.id === savedId) || null;
    }

    const active = match || kolkata;
    if (active) {
      setSelectedLoc(active);
      localStorage.setItem('preferred_location_id', active.id);
      localStorage.setItem('preferred_location_slug', active.hashSlug);
      localStorage.setItem('preferred_location_name', active.name);
    }
  }, [locations]);

  const handleSelect = (loc: LocationItem) => {
    setSelectedLoc(loc);
    setIsOpen(false);
    setIsUpdating(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred_location_id', loc.id);
      localStorage.setItem('preferred_location_slug', loc.hashSlug);
      localStorage.setItem('preferred_location_name', loc.name);
      window.location.hash = loc.hashSlug;
      // Reload page so user sees site updating location-wise
      setTimeout(() => {
        window.location.reload();
      }, 150);
    }
  };

  return (
    <div className="location-bar">
      <div className="container location-bar-inner">
        <div className="location-bar-left">
          <MapPin size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
          <span className="location-bar-label">
            {lang === 'bn' ? 'সেবা অঞ্চল:' : 'Service Area:'}
          </span>

          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.8125rem',
              background: 'rgba(255, 255, 255, 0.12)',
              padding: '3px 8px',
              borderRadius: '4px',
              transition: 'background 0.15s'
            }}
            aria-expanded={isOpen}
            aria-label={t.selectLocation}
          >
            <span>{selectedLoc ? (lang === 'bn' ? selectedLoc.nameBn : selectedLoc.name) : (lang === 'bn' ? 'কলকাতা' : 'Kolkata')}</span>
            <ChevronDown size={13} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>

          {isOpen && (
            <>
              <div
                style={{ position: 'fixed', inset: 0, zIndex: 600 }}
                onClick={() => setIsOpen(false)}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '6px',
                  background: 'var(--color-bg-card)',
                  color: 'var(--color-text-main)',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--color-border)',
                  minWidth: '220px',
                  zIndex: 700,
                  maxHeight: '300px',
                  overflowY: 'auto',
                  padding: '6px'
                }}
              >
                <div style={{ padding: '8px 10px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border-light)' }}>
                  {t.selectLocation}
                </div>
                {locations.map((loc) => {
                  const isCur = selectedLoc?.id === loc.id;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => handleSelect(loc)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        fontSize: '0.8125rem',
                        fontWeight: isCur ? 700 : 500,
                        color: isCur ? 'var(--color-primary)' : 'inherit',
                        background: isCur ? 'var(--color-primary-light)' : 'transparent',
                        borderRadius: '4px',
                        textAlign: 'left'
                      }}
                    >
                      <span>{lang === 'bn' ? loc.nameBn : loc.name}</span>
                      {isCur && <Check size={14} />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="location-bar-right">
          <span className="location-promo-text">
            {lang === 'bn' ? 'ফ্ল্যাট ₹২৯৯ পরিদর্শন ও ডায়াগনোসিস' : 'Flat ₹299 Visit & Inspection'}
          </span>
          <a
            href={`tel:${phone.replace(/[^\d+]/g, '')}`}
            className="location-phone-link"
          >
            <Phone size={12} style={{ opacity: 0.9 }} />
            <span>{phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
