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
    <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: 'clamp(20px, 4vw, 32px)', marginBottom: '40px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px', color: '#09090B' }}>
          {t.selectBrand}
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
          {isBn ? 'আপনার অ্যাপ্লায়েন্সের ব্র্যান্ড বেছে নিন যাতে উপযুক্ত আসল যন্ত্রাংশ ও সার্টিফাইড টেকনিশিয়ান পাঠানো যায়:' : 'Select your brand to ensure certified specialists and 100% genuine OEM spare parts:'}
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
        className="rd-brand-grid"
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
                padding: '14px 12px',
                borderRadius: '12px',
                border: isSelected ? '2px solid #09090B' : '1px solid #E2E8F0',
                backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                color: isSelected ? '#09090B' : '#334155',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.875rem',
                letterSpacing: '0.01em',
                transition: 'all 0.15s ease',
                position: 'relative',
                boxShadow: isSelected ? '0 3px 10px rgba(0, 0, 0, 0.08)' : '0 1px 3px rgba(0, 0, 0, 0.03)'
              }}
            >
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#09090B',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Check size={11} strokeWidth={3} />
                </div>
              )}
              {b.logoUrl ? (
                <img
                  src={b.logoUrl}
                  alt={b.name}
                  style={{ maxHeight: '30px', maxWidth: '100%', objectFit: 'contain', filter: 'none', opacity: 1 }}
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
