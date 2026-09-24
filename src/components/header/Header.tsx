'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  Phone,
  MessageCircle,
  Wrench,
  Calendar,
  Languages,
  ChevronRight
} from 'lucide-react';
import { Category, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';

interface HeaderProps {
  categories: Category[];
  lang: Language;
  onOpenSearch: () => void;
  onOpenBooking: () => void;
  phone: string;
  whatsapp: string;
}

export default function Header({
  categories,
  lang,
  onOpenSearch,
  onOpenBooking,
  phone,
  whatsapp
}: HeaderProps) {
  const pathname = usePathname();
  const t = getDictionary(lang);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Compute alternate language path
  const isBn = lang === 'bn';
  let targetLangPath = '/';
  if (isBn) {
    targetLangPath = pathname.replace(/^\/bn/, '') || '/';
  } else {
    targetLangPath = pathname === '/' ? '/bn' : `/bn${pathname}`;
  }

  const navLinks = [
    { href: isBn ? '/bn' : '/', label: t.home },
    ...categories.map((c) => ({
      href: isBn ? `/bn/${c.slug}` : `/${c.slug}`,
      label: isBn ? c.nameBn : c.name
    }))
  ];

  return (
    <header className="header-sticky">
      <div className="container header-container">
        {/* Brand Logo */}
        <Link
          href={isBn ? '/bn' : '/'}
          className="header-brand-logo"
          aria-label="AC Repair Service Home"
        >
          <div className="header-logo-icon">
            <Wrench size={20} />
          </div>
          <div className="header-logo-text">
            <div className="header-logo-title">
              AC Repair Service
            </div>
            <div className="header-logo-sub">
              {isBn ? 'পশ্চিমবঙ্গ ডোরস্টেপ সার্ভিস' : 'West Bengal Doorstep Care'}
            </div>
          </div>
        </Link>

        {/* Right Group: Navbar -> Search -> EN-BN Language Toggle -> Book CTA */}
        <div className="header-right-group">
          {/* Desktop Navigation (Right Aligned) */}
          <nav
            className="desktop-nav"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`desktop-nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="header-actions">
            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="header-icon-btn"
              aria-label={t.search}
              title={t.search}
            >
              <Search size={18} />
            </button>

            {/* Language Toggle Button: EN-BN without extra text */}
            <Link
              href={targetLangPath}
              className="header-lang-toggle"
              title={isBn ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
              aria-label="Switch Language EN-BN"
            >
              <span className={`lang-pill ${!isBn ? 'active' : ''}`}>EN</span>
              <span className="lang-sep">-</span>
              <span className={`lang-pill ${isBn ? 'active' : ''}`}>BN</span>
            </Link>

            {/* Direct Book CTA (Tablet & Desktop >= 768px) */}
            <button
              onClick={onOpenBooking}
              className="btn btn-primary btn-sm desktop-book-btn"
            >
              <Calendar size={15} />
              <span>{t.bookNow}</span>
            </button>

            {/* Mobile / Tablet Menu Trigger (< 1140px) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="header-icon-btn mobile-menu-btn"
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Rendered via Portal to body) */}
      {mounted && mobileMenuOpen && createPortal(
        <div
          className="mobile-drawer-overlay"
          onClick={() => setMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          <div
            className="mobile-drawer-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top */}
            <div className="mobile-drawer-header">
              <div className="mobile-drawer-brand">
                <div className="header-logo-icon" style={{ width: '34px', height: '34px', borderRadius: '8px' }}>
                  <Wrench size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-primary)', lineHeight: 1.15 }}>
                    AC Repair Service
                  </div>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                    {isBn ? 'পশ্চিমবঙ্গ ডোরস্টেপ সার্ভিস' : 'West Bengal Doorstep Care'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-drawer-close-btn"
                aria-label="Close Navigation Menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Language Switch Inside Mobile Drawer */}
            <div className="mobile-drawer-lang-box">
              <Link
                href={targetLangPath}
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-drawer-lang-link"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Languages size={17} />
                  <span>{isBn ? 'Language' : 'ভাষা / Language'}:</span>
                </div>
                <span style={{ fontWeight: 800, textDecoration: 'underline' }}>
                  {isBn ? 'English (EN)' : 'বাংলা (BN)'}
                </span>
              </Link>
            </div>

            {/* Section Title */}
            <div className="mobile-drawer-section-title">
              {isBn ? 'পরিষেবাসমূহ' : 'All Repair Services'}
            </div>

            {/* Nav Links */}
            <nav className="mobile-drawer-nav">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={15} style={{ opacity: isActive ? 1 : 0.4 }} />
                  </Link>
                );
              })}

              <Link
                href={isBn ? '/bn/blog' : '/blog'}
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-drawer-link"
                style={{ marginTop: '6px', borderTop: '1px solid var(--color-border-light)', paddingTop: '14px' }}
              >
                <span>{isBn ? 'মেরামত ব্লগ ও গাইড' : 'Repair Blog & Guides'}</span>
                <ChevronRight size={15} style={{ opacity: 0.4 }} />
              </Link>
            </nav>

            {/* Drawer Bottom Actions */}
            <div className="mobile-drawer-footer">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px 16px' }}
              >
                <Calendar size={18} />
                <span>{t.bookNow}</span>
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <a
                  href={`tel:${phone}`}
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Phone size={14} />
                  <span>{t.callNow}</span>
                </a>
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
