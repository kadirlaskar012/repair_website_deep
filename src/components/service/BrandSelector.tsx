'use client';

import React, { useState } from 'react';
import { Search, Check } from 'lucide-react';
import { Brand, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface BrandSelectorProps {
  brands: Brand[];
  selectedBrand: string;
  onSelectBrand: (brandName: string) => void;
  lang: Language;
}

export default function BrandSelector({
  brands,
  selectedBrand,
  onSelectBrand,
  lang
}: BrandSelectorProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'clamp(20px, 4vw, 32px)', marginBottom: '40px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: 'var(--color-text-main)' }}>
          {t.selectBrand}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          {isBn ? 'আপনার অ্যাপ্লায়েন্সের ব্র্যান্ড বেছে নিন যাতে উপযুক্ত যন্ত্রাংশ ও টেকনিশিয়ান পাঠানো যায়:' : 'Select your brand to ensure certified specialists and genuine spare parts:'}
        </p>
      </div>

      {/* 1. Brand Search / Dropdown Input */}
      <div style={{ position: 'relative', marginBottom: '24px', maxWidth: '480px' }}>
        <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }}>
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t.searchBrand}
          className="form-control"
          style={{ paddingLeft: '42px', fontSize: '0.9375rem' }}
        />
      </div>

      {/* 2. Brand Logo / Badge Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '12px'
        }}
      >
        {filteredBrands.map((b) => {
          const isSelected = selectedBrand === b.name;
          return (
            <button
              key={b.id}
              onClick={() => onSelectBrand(isSelected ? '' : b.name)}
              style={{
                padding: '14px 10px',
                borderRadius: 'var(--radius-md)',
                border: isSelected ? '2px solid var(--color-primary)' : '1.5px solid var(--color-border-light)',
                backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-bg-warm)',
                color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-text-main)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontWeight: 700,
                fontSize: '0.9375rem',
                letterSpacing: '0.02em',
                transition: 'all 0.15s',
                position: 'relative'
              }}
            >
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Check size={10} strokeWidth={3} />
                </div>
              )}
              {b.logoUrl ? (
                <img
                  src={b.logoUrl}
                  alt={b.name}
                  style={{ maxHeight: '28px', maxWidth: '100%', objectFit: 'contain' }}
                />
              ) : (
                <span>{b.name}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
