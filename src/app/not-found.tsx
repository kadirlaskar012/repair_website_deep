'use client';

import React from 'react';
import Link from 'next/link';
import { Wrench, Home, Search, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-warm)', padding: '20px' }}>
      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '48px 32px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-border)'
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}
        >
          <Wrench size={32} />
        </div>

        <span style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1 }}>
          404
        </span>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main)', marginTop: '8px', marginBottom: '12px' }}>
          Page Not Found / পৃষ্ঠাটি পাওয়া যায়নি
        </h1>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '28px' }}>
          The appliance service or page you are looking for might have been moved or does not exist. Please navigate back to our homepage or select an appliance category.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link href="/" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            <Home size={18} />
            <span>Return to Homepage (হোমপেজ)</span>
          </Link>
          <Link href="/ac-repair" className="btn btn-outline" style={{ width: '100%' }}>
            <span>Explore AC Repair Services</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
