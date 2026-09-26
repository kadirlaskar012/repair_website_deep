'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Settings,
  X,
  ChevronUp,
  Languages,
  Sun,
  Moon,
  MessageCircle,
  Check
} from 'lucide-react';

interface FloatingActionSuiteProps {
  whatsappNumber?: string;
}

export default function FloatingActionSuite({
  whatsappNumber = '6291674186'
}: FloatingActionSuiteProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const popoverRef = useRef<HTMLDivElement>(null);
  const settingsBtnRef = useRef<HTMLButtonElement>(null);

  // Initialize theme & listen to scroll with hysteresis (prevents flickering)
  useEffect(() => {
    setMounted(true);
    const activeTheme =
      document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    setTheme(activeTheme);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Hysteresis buffer (show > 280, hide < 150) to completely eliminate flashing/flickering
          setShowScrollTop((prev) => {
            if (scrollY > 280) return true;
            if (scrollY < 150) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (window.scrollY > 280) {
      setShowScrollTop(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close settings popover on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSettingsOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        settingsBtnRef.current &&
        !settingsBtnRef.current.contains(event.target as Node)
      ) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsOpen]);

  // Don't render on Admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  // Calculate Language paths
  const isBn = pathname.startsWith('/bn');
  const targetEnPath = pathname.replace(/^\/bn/, '') || '/';
  const targetBnPath = pathname === '/' ? '/bn' : `/bn${pathname}`;

  // Theme switch handler
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (e) {}
  };

  // Scroll to top handler
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // WhatsApp pre-filled text
  const cleanNumber = whatsappNumber.replace(/[^\d]/g, '');
  const waNumberWithCountry = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;
  const waGreeting = isBn
    ? 'নমস্কার! আমি হোম অ্যাপ্লায়েন্স মেরামত পরিষেবা সম্পর্কে জানতে চাই।'
    : 'Hello! I would like to inquire about home appliance repair service.';
  const waUrl = `https://wa.me/${waNumberWithCountry}?text=${encodeURIComponent(waGreeting)}`;

  if (!mounted) return null;

  return (
    <aside className="floating-action-suite" aria-label="Quick Actions & Settings">
      {/* 1. Floating WhatsApp CTA Button (TOP-MOST) */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn floating-whatsapp-btn"
        aria-label={isBn ? 'হোয়াটসঅ্যাপে তাৎক্ষণিক চ্যাট করুন' : 'Chat on WhatsApp'}
        title={isBn ? 'হোয়াটসঅ্যাপে চ্যাট' : 'Chat on WhatsApp'}
      >
        <span className="wa-radar-ring" aria-hidden="true" />
        <MessageCircle size={22} className="wa-icon" />
        <span className="wa-tooltip-pill">
          {isBn ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}
        </span>
      </a>

      {/* 2. Floating Settings Button & Popover (MIDDLE) */}
      <div className="floating-settings-wrapper">
        {isSettingsOpen && (
          <div
            ref={popoverRef}
            className="floating-settings-popover"
            role="dialog"
            aria-label={isBn ? 'ওয়েবসাইট সেটিংস' : 'Website Preferences'}
          >
            <div className="floating-popover-header">
              <div className="floating-popover-title">
                <Settings size={18} className="popover-title-icon" />
                <span>{isBn ? 'ওয়েবসাইট সেটিংস' : 'Preferences'}</span>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="floating-popover-close"
                aria-label="Close settings"
              >
                <X size={16} />
              </button>
            </div>

            <div className="floating-popover-body">
              {/* Language Switcher */}
              <div className="floating-setting-group">
                <div className="floating-setting-label">
                  <Languages size={15} />
                  <span>{isBn ? 'ভাষা নির্বাচন (Language)' : 'Language (ভাষা)'}</span>
                </div>
                <div className="floating-pill-toggle">
                  <Link
                    href={targetEnPath}
                    prefetch={true}
                    scroll={false}
                    onClick={() => setIsSettingsOpen(false)}
                    className={`floating-pill-btn ${!isBn ? 'active' : ''}`}
                  >
                    {!isBn && <Check size={14} className="pill-check-icon" />}
                    <span>English (EN)</span>
                  </Link>
                  <Link
                    href={targetBnPath}
                    prefetch={true}
                    scroll={false}
                    onClick={() => setIsSettingsOpen(false)}
                    className={`floating-pill-btn ${isBn ? 'active' : ''}`}
                  >
                    {isBn && <Check size={14} className="pill-check-icon" />}
                    <span>বাংলা (BN)</span>
                  </Link>
                </div>
              </div>

              {/* Theme Switcher */}
              <div className="floating-setting-group">
                <div className="floating-setting-label">
                  {theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
                  <span>{isBn ? 'থিম মুড (Theme)' : 'Theme (Appearance)'}</span>
                </div>
                <div className="floating-pill-toggle">
                  <button
                    type="button"
                    onClick={() => handleThemeChange('light')}
                    className={`floating-pill-btn ${theme === 'light' ? 'active' : ''}`}
                  >
                    <Sun size={14} />
                    <span>{isBn ? 'লাইট (Light)' : 'Light'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleThemeChange('dark')}
                    className={`floating-pill-btn ${theme === 'dark' ? 'active' : ''}`}
                  >
                    <Moon size={14} />
                    <span>{isBn ? 'ডার্ক (Dark)' : 'Dark'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          ref={settingsBtnRef}
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`floating-btn floating-settings-btn ${isSettingsOpen ? 'active' : ''}`}
          aria-label={isBn ? 'সেটিংস ও ভাষা পরিবর্তন' : 'Settings & Language Preferences'}
          title={isBn ? 'সেটিংস ও ভাষা' : 'Settings & Language'}
          aria-expanded={isSettingsOpen}
        >
          <Settings size={22} className="settings-gear-icon" />
        </button>
      </div>

      {/* 3. Go To Top Button (BOTTOM - AKDAM NICHE) */}
      <div className={`floating-top-wrapper ${showScrollTop ? 'visible' : ''}`}>
        <button
          onClick={handleScrollToTop}
          className="floating-btn floating-top-btn"
          aria-label={isBn ? 'উপরে যান' : 'Scroll to top'}
          title={isBn ? 'উপরে যান' : 'Scroll to top'}
          tabIndex={showScrollTop ? 0 : -1}
        >
          <ChevronUp size={22} strokeWidth={2.5} />
        </button>
      </div>
    </aside>
  );
}
