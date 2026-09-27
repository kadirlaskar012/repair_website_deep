'use client';

import { useEffect } from 'react';

/**
 * ContentProtection Component
 * Protects website intellectual property, service pricing, and content:
 * - Disables right-click context menu (except form inputs if needed)
 * - Disables developer inspect shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S)
 * - Disables unauthorized copy/cut operations outside editable form fields
 * - Disables drag-and-drop of website imagery
 */
export default function ContentProtection() {
  useEffect(() => {
    // 1. Prevent Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // Allow context menu only if explicitly permitted (optional)
      if (target?.closest('input, textarea')) {
        return; // Allow users to paste their phone or address
      }
      e.preventDefault();
      return false;
    };

    // 2. Prevent Keyboard Inspection Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // F12 (DevTools)
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+I / Cmd+Option+I (Inspect Element)
      // Ctrl+Shift+J / Cmd+Option+J (Console)
      // Ctrl+Shift+C / Cmd+Option+C (Element Picker)
      if (cmdOrCtrl && (e.shiftKey || (isMac && e.altKey))) {
        const key = e.key.toUpperCase();
        if (key === 'I' || key === 'J' || key === 'C') {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }

      // Ctrl+U / Cmd+U (View Page Source)
      if (cmdOrCtrl && (e.key.toUpperCase() === 'U' || e.keyCode === 85)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+S / Cmd+S (Save Page)
      if (cmdOrCtrl && (e.key.toUpperCase() === 'S' || e.keyCode === 83)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 3. Prevent Copy/Cut on Static Content (Preserve input/textarea)
    const handleCopyCut = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, textarea, [contenteditable="true"]')) {
        return; // Allow normal input field copy-paste
      }
      e.preventDefault();
      return false;
    };

    // 4. Prevent Image Dragging
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === 'IMG' || target?.closest('img')) {
        e.preventDefault();
        return false;
      }
    };

    // Attach listeners
    document.addEventListener('contextmenu', handleContextMenu, { capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    document.addEventListener('copy', handleCopyCut, { capture: true });
    document.addEventListener('cut', handleCopyCut, { capture: true });
    document.addEventListener('dragstart', handleDragStart, { capture: true });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.removeEventListener('copy', handleCopyCut, { capture: true });
      document.removeEventListener('cut', handleCopyCut, { capture: true });
      document.removeEventListener('dragstart', handleDragStart, { capture: true });
    };
  }, []);

  return null;
}
