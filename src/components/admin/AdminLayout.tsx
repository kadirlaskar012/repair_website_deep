'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Layers,
  AlertTriangle,
  Award,
  MapPin,
  Star,
  FileText,
  Sparkles,
  Settings,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Wrench,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load persisted collapse state
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('admin_sidebar_collapsed');
    if (saved === 'true') {
      setCollapsed(true);
    }
  }, []);

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('admin_sidebar_collapsed', next ? 'true' : 'false');
      return next;
    });
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileDrawerOpen]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={19} /> },
    { href: '/admin/homepage-images', label: 'Homepage Images', icon: <ImageIcon size={19} /> },
    { href: '/admin/bookings', label: 'Booking Leads', icon: <Calendar size={19} /> },
    { href: '/admin/categories', label: 'Categories', icon: <Layers size={19} /> },
    { href: '/admin/problems', label: 'Problems & Symptoms', icon: <AlertTriangle size={19} /> },
    { href: '/admin/brands', label: 'Brands & Logos', icon: <Award size={19} /> },
    { href: '/admin/locations', label: 'West Bengal Locations', icon: <MapPin size={19} /> },
    { href: '/admin/reviews', label: 'Customer Reviews', icon: <Star size={19} /> },
    { href: '/admin/blog', label: 'Blog & Articles', icon: <FileText size={19} /> },
    { href: '/admin/ai-settings', label: 'AI Configuration', icon: <Sparkles size={19} /> },
    { href: '/admin/media', label: 'Media Assets', icon: <Layers size={19} /> },
    { href: '/admin/settings', label: 'Site Settings & Content', icon: <Settings size={19} /> }
  ];

  return (
    <div className="admin-root-container">
      {/* =========================================================
          1. FIXED DESKTOP SIDEBAR (>= 1024px)
          - Pinned strictly to top 0, height 100vh
          - Never stretches or scrolls with main page
          - Collapsible to compact icon-only mode
          - Bottom actions (Logout) ALWAYS pinned on screen
          ========================================================= */}
      <aside
        className={`admin-sidebar-desktop ${collapsed ? 'collapsed' : 'expanded'}`}
        aria-label="Admin Navigation Sidebar"
      >
        {/* Top Brand Header */}
        <div className="admin-sidebar-header">
          <Link href="/admin" className="admin-brand-link">
            <div className="admin-brand-icon" style={{ padding: 0, overflow: 'hidden' }}>
              <img
                src="/logo-icon.png"
                alt="AC Repair Service"
                width={36}
                height={36}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            {!collapsed && (
              <div className="admin-brand-text">
                <div className="admin-brand-title">AC REPAIR SERVICE</div>
                <div className="admin-brand-subtitle">Admin Control Panel</div>
              </div>
            )}
          </Link>

          {/* Collapse / Unhide Toggle Button */}
          <button
            onClick={toggleCollapse}
            className="admin-sidebar-toggle-btn"
            title={collapsed ? 'Expand Sidebar (Ctrl+B)' : 'Collapse Sidebar'}
            aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        {/* Middle Scrollable Nav Items */}
        <nav className="admin-sidebar-nav">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${isActive ? 'active' : ''} ${collapsed ? 'item-collapsed' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <div className="admin-nav-icon">{item.icon}</div>
                {!collapsed && <span className="admin-nav-label">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Pinned Actions: Live Site, Logout & Collapse Switcher */}
        <div className="admin-sidebar-footer">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={`admin-footer-link ${collapsed ? 'footer-collapsed' : ''}`}
            title="View Live Public Website"
          >
            <ExternalLink size={16} />
            {!collapsed && <span>Live Website</span>}
          </Link>

          <button
            onClick={handleLogout}
            className={`admin-footer-logout ${collapsed ? 'footer-collapsed' : ''}`}
            title="Sign Out of Admin Portal"
          >
            <LogOut size={16} />
            {!collapsed && <span>Sign Out</span>}
          </button>

          {/* Quick Footer Collapse Button */}
          <button
            onClick={toggleCollapse}
            className="admin-footer-collapse-bar"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
            {!collapsed && <span>{collapsed ? 'Expand' : 'Collapse Menu'}</span>}
          </button>
        </div>
      </aside>

      {/* =========================================================
          2. MAIN CONTENT AREA (Independent Scrolling)
          - Takes full remaining width
          - Scrolls independently of sidebar
          - Has sticky top bar with quick actions
          ========================================================= */}
      <div className="admin-main-wrapper">
        {/* Sticky Top Header */}
        <header className="admin-top-header">
          <div className="admin-header-left">
            {/* Mobile Menu Button (< 1024px) */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="admin-mobile-menu-trigger"
              aria-label="Open Admin Menu"
            >
              <Menu size={20} />
            </button>

            {/* Desktop Quick Collapse Button (visible on desktop) */}
            <button
              onClick={toggleCollapse}
              className="admin-desktop-top-toggle"
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>

            <div className="admin-header-title">
              Management Portal
            </div>
          </div>

          <div className="admin-header-right">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm admin-top-live-btn"
            >
              <ExternalLink size={14} />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="admin-top-logout-btn"
              title="Sign Out"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Main Body Content */}
        <main className="admin-content-body">
          {children}
        </main>
      </div>

      {/* =========================================================
          3. MOBILE OFF-CANVAS DRAWER (< 1024px)
          - Full touch-friendly slide-over menu
          ========================================================= */}
      {mobileDrawerOpen && (
        <div
          className="admin-mobile-overlay"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="admin-mobile-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="admin-drawer-header">
              <div className="admin-brand-link">
                <div className="admin-brand-icon" style={{ padding: 0, overflow: 'hidden' }}>
                  <img
                    src="/logo-icon.png"
                    alt="AC Repair Service"
                    width={36}
                    height={36}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div className="admin-brand-text">
                  <div className="admin-brand-title">AC REPAIR SERVICE</div>
                  <div className="admin-brand-subtitle">Admin Portal</div>
                </div>
              </div>

              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="admin-drawer-close-btn"
                aria-label="Close Admin Menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Nav List */}
            <nav className="admin-drawer-nav">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`admin-drawer-link ${isActive ? 'active' : ''}`}
                  >
                    <div className="admin-nav-icon">{item.icon}</div>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer Actions */}
            <div className="admin-drawer-footer">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileDrawerOpen(false)}
                className="admin-footer-link"
              >
                <ExternalLink size={16} />
                <span>View Public Website</span>
              </Link>

              <button
                onClick={handleLogout}
                className="admin-footer-logout"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
