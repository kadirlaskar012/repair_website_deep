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
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { Category, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);
    const activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    setTheme(activeTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('theme', nextTheme);
    } catch (e) {}
  };

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => {
      if (mobileMenuOpen) unlockScroll();
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

  const getNavParts = (slug: string, fullLabel: string, isBengali: boolean) => {
    if (isBengali) {
      if (slug === 'ac-repair') return { prefix: 'এসি', suffix: 'মেরামত' };
      if (slug === 'fridge-repair') return { prefix: 'ফ্রিজ', suffix: 'মেরামত' };
      if (slug === 'washing-machine-repair') return { prefix: 'ওয়াশিং মেশিন', suffix: '' };
      if (slug === 'microwave-repair') return { prefix: 'মাইক্রোওয়েভ', suffix: '' };
      if (slug === 'led-tv-repair') return { prefix: 'এলইডি টিভি', suffix: '' };
      return { prefix: fullLabel, suffix: '' };
    }
    if (slug === 'ac-repair') return { prefix: 'AC', suffix: 'Repair' };
    if (slug === 'fridge-repair') return { prefix: 'Fridge', suffix: 'Repair' };
    if (slug === 'washing-machine-repair') return { prefix: 'Washing Machine', suffix: 'Repair' };
    if (slug === 'microwave-repair') return { prefix: 'Microwave', suffix: 'Oven' };
    if (slug === 'led-tv-repair') return { prefix: 'LED TV', suffix: 'Repair' };
    return { prefix: fullLabel, suffix: '' };
  };

  const navLinks = [
    { href: isBn ? '/bn' : '/', label: t.home, prefix: t.home, suffix: '' },
    ...categories.map((c) => {
      const parts = getNavParts(c.slug, isBn ? c.nameBn : c.name, isBn);
      return {
        href: isBn ? `/bn/${c.slug}` : `/${c.slug}`,
        label: isBn ? c.nameBn : c.name,
        prefix: parts.prefix,
        suffix: parts.suffix
      };
    })
  ];

  return (
    <header className="header-sticky">
      <div className="header-container">
        {/* Brand Logo */}
        <Link
          href={isBn ? '/bn' : '/'}
          prefetch={true}
          scroll={true}
          className="header-brand-logo"
          aria-label="Appliance Seva Home"
        >
          <div className="header-logo-icon">
            <img
              src="/logo-icon.svg"
              alt="Appliance Seva"
              width={50}
              height={50}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div className="header-logo-text">
            <div className="header-logo-title">
              <span>APPLIANCE</span> <span className="logo-accent">SEVA</span>
            </div>
            <div className="header-logo-sub">
              {isBn ? (
                <>
                  <span>ডোরস্টেপ কেয়ার</span>
                  <span className="verified-dot" />
                  <span>পশ্চিমবঙ্গ</span>
                </>
              ) : (
                <>
                  <span>DOORSTEP REPAIR</span>
                  <span className="verified-dot" />
                  <span>WEST BENGAL</span>
                </>
              )}
            </div>
          </div>
        </Link>

        {/* Right Group: Navbar -> Search -> EN-BN Language Toggle -> Theme Toggle -> Book CTA */}
        <div className="header-right-group">
          {/* Desktop Navigation (Right Aligned, Fluid Responsive) */}
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
                  prefetch={true}
                  scroll={true}
                  className={`desktop-nav-link ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-prefix">{link.prefix}</span>
                  {link.suffix ? <span className="nav-suffix">&nbsp;{link.suffix}</span> : null}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="header-actions">
            {/* Language Toggle Button: EN-BN without extra text */}
            <Link
              href={targetLangPath}
              prefetch={true}
              scroll={true}
              className="header-lang-toggle"
              title={isBn ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
              aria-label="Switch Language EN-BN"
            >
              <span className={`lang-pill ${!isBn ? 'active' : ''}`}>EN</span>
              <span className="lang-sep">-</span>
              <span className={`lang-pill ${isBn ? 'active' : ''}`}>BN</span>
            </Link>

            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="header-icon-btn"
              aria-label={t.search}
              title={t.search}
            >
              <Search size={18} />
            </button>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="header-icon-btn theme-toggle-btn"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {mounted && theme === 'dark' ? (
                <Sun size={19} className="theme-toggle-icon theme-sun" />
              ) : (
                <Moon size={19} className="theme-toggle-icon theme-moon" />
              )}
            </button>

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
                <div className="header-logo-icon" style={{ width: '44px', height: '44px' }}>
                  <img
                    src="/logo-icon.svg"
                    alt="Appliance Seva"
                    width={44}
                    height={44}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-text-main)', lineHeight: 1.15 }}>
                    APPLIANCE <span style={{ color: 'var(--color-primary)' }}>SEVA</span>
                  </div>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                    {isBn ? 'ডোরস্টেপ কেয়ার • পশ্চিমবঙ্গ' : 'Doorstep Repair • West Bengal'}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={toggleTheme}
                  className="header-icon-btn theme-toggle-btn"
                  aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {mounted && theme === 'dark' ? (
                    <Sun size={18} className="theme-toggle-icon theme-sun" />
                  ) : (
                    <Moon size={18} className="theme-toggle-icon theme-moon" />
                  )}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-drawer-close-btn"
                  aria-label="Close Navigation Menu"
                >
                  <X size={20} />
                </button>
              </div>
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
                    prefetch={true}
                    scroll={true}
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
                prefetch={true}
                scroll={true}
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
                  setTimeout(() => {
                    onOpenBooking();
                  }, 50);
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
