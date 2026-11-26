'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle } from 'lucide-react';

/**
 * Global mobile sticky call bar (visual-only UI chrome).
 * Labels are rendered via CSS (data-label) and aria-label so that no
 * new crawlable body text is introduced; hrefs reuse the existing
 * tel:/wa.me targets already present on every page.
 */
export default function StickyCallBar() {
  const pathname = usePathname() || '/';
  const isExcluded =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/invoice') ||
    pathname.includes('/track') ||
    pathname.includes('/booking-success');
  if (isExcluded) return null;

  const isBn = pathname.startsWith('/bn');
  const callLabel = isBn ? 'কল করুন' : 'Call Now';
  const waLabel = 'WhatsApp';
  const phoneDisplay = '+91 6291674186';

  return (
    <div className="rd-sticky-bar" role="region" aria-label={isBn ? 'দ্রুত যোগাযোগ' : 'Quick contact'}>
      <a
        href="tel:+91 6291674186"
        className="rd-sticky-call"
        aria-label={`${callLabel} ${phoneDisplay}`}
      >
        <Phone size={20} aria-hidden="true" />
        <span className="rd-sticky-text" aria-hidden="true">
          <span className="rd-cta-label" data-label={callLabel} />
          <span className="rd-cta-sub" data-label={phoneDisplay} />
        </span>
      </a>
      <a
        href="https://wa.me/916291674186"
        target="_blank"
        rel="noopener noreferrer"
        className="rd-sticky-wa"
        aria-label={waLabel}
      >
        <MessageCircle size={20} aria-hidden="true" />
        <span className="rd-cta-label" aria-hidden="true" data-label={waLabel} />
      </a>
    </div>
  );
}
