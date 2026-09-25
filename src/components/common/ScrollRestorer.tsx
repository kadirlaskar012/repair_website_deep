'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * ScrollRestorer
 * Ensures that whenever a user navigates between pages (e.g. from Home to a Brand page,
 * or from Brand page back to Home), the viewport ALWAYS resets instantaneously to the top (0, 0),
 * preventing the browser from getting stuck at the footer or bottom of the page.
 */
export default function ScrollRestorer() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Prevent browser from automatically restoring previous scroll offsets across SPA navigation
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If an explicit anchor hash is targeted (e.g. #faq, #pricing), allow normal anchor behavior
    if (window.location.hash) return;

    // Instantly reset scroll to top on ANY route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Double-check on next animation frame after React finishes painting new DOM
    const frameId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  return null;
}
