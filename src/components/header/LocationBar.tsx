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
  const defaultLoc = locations[0] || null;
  const [selectedLoc, setSelectedLoc] = useState<LocationItem | null>(defaultLoc);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedSlug = localStorage.getItem('preferred_location_slug');
    const savedId = localStorage.getItem('preferred_location_id');

    let match = savedSlug ? locations.find((l) => l.hashSlug === savedSlug || l.name.toLowerCase() === savedSlug) : null;
    if (!match && savedId) {
      match = locations.find((l) => l.id === savedId) || null;
    }

    const active = match || defaultLoc;
    if (active) {
      setSelectedLoc(active);
    }

    const handleSync = (e: any) => {
      if (e.detail?.id) {
        const found = locations.find((l) => l.id === e.detail.id);
        if (found) setSelectedLoc(found);
      }
    };
    window.addEventListener('appliance_location_changed', handleSync);
    return () => window.removeEventListener('appliance_location_changed', handleSync);
  }, [locations, defaultLoc]);

  const handleSelect = (loc: LocationItem) => {
    setSelectedLoc(loc);
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred_location_id', loc.id);
      localStorage.setItem('preferred_location_slug', loc.hashSlug);
      localStorage.setItem('preferred_location_name', loc.name);

      // Instant zero-latency cross-component update without white flash or network reload
      window.dispatchEvent(
        new CustomEvent('appliance_location_changed', {
          detail: { id: loc.id, name: loc.name, nameBn: loc.nameBn, slug: loc.hashSlug }
        })
      );
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
            <span>
              {selectedLoc
                ? lang === 'bn'
                  ? `${selectedLoc.nameBn}${selectedLoc.pincode ? ` (${selectedLoc.pincode})` : ''}`
                  : `${selectedLoc.name}${selectedLoc.pincode ? ` (${selectedLoc.pincode})` : ''}`
                : lang === 'bn'
                ? 'ব্যারাকপুর (৭০০১২০)'
                : 'Barrackpur (700120)'}
            </span>
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{lang === 'bn' ? loc.nameBn : loc.name}</span>
                        {loc.pincode && (
                          <span style={{ fontSize: '0.6875rem', opacity: 0.75, background: 'rgba(0,0,0,0.06)', padding: '1px 5px', borderRadius: '4px' }}>
                            {loc.pincode}
                          </span>
                        )}
                      </div>
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
            {lang === 'bn' ? 'স্বচ্ছ ও সাশ্রয়ী সার্ভিস চার্জ' : 'Transparent & Affordable Pricing'}
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
