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
  Receipt,
  FileSpreadsheet,
  FilePlus,
  Users,
  Package,
  CreditCard,
  BarChart3,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Sliders
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

  const [invoicesOpen, setInvoicesOpen] = useState(true);

  // Auto-expand invoice section if user is on any /admin/invoices route
  useEffect(() => {
    if (pathname && pathname.startsWith('/admin/invoices')) {
      setInvoicesOpen(true);
    }
  }, [pathname]);

  const coreMenuItems = [
    { href: '/admin/bookings', label: 'Booking Leads', icon: <Calendar size={18} /> },
    { href: '/admin/reviews', label: 'Customer Reviews', icon: <Star size={18} /> }
  ];

  const invoiceSubmenus = [
    { href: '/admin/invoices', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { href: '/admin/invoices/create', label: 'Create Invoice', icon: <FilePlus size={16} /> },
    { href: '/admin/invoices/all', label: 'All Invoices', icon: <FileSpreadsheet size={16} /> },
    { href: '/admin/invoices/customers', label: 'Customers', icon: <Users size={16} /> },
    { href: '/admin/invoices/services', label: 'Service Catalog', icon: <Wrench size={16} /> },
    { href: '/admin/invoices/spare-parts', label: 'Spare Parts', icon: <Package size={16} /> },
    { href: '/admin/invoices/payments', label: 'Payments', icon: <CreditCard size={16} /> },
    { href: '/admin/invoices/reports', label: 'Reports', icon: <BarChart3 size={16} /> },
    { href: '/admin/invoices/settings', label: 'Invoice Settings', icon: <Sliders size={16} /> }
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
                src="/logo-icon.svg"
                alt="Appliance Seva"
                width={36}
                height={36}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            {!collapsed && (
              <div className="admin-brand-text">
                <div className="admin-brand-title">APPLIANCE SEVA</div>
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
          <div className="admin-nav-group-title">
            {!collapsed && <span>Operations</span>}
          </div>
          {coreMenuItems.map((item) => {
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

          {/* Dedicated Invoice Management Section */}
          <div className="admin-nav-group-title" style={{ marginTop: '16px' }}>
            {!collapsed && <span>Billing &amp; Invoices</span>}
          </div>

          <div className="admin-nav-parent-group">
            <button
              type="button"
              onClick={() => !collapsed && setInvoicesOpen(!invoicesOpen)}
              className={`admin-nav-item admin-nav-parent-item ${
                pathname.startsWith('/admin/invoices') ? 'active-parent' : ''
              } ${collapsed ? 'item-collapsed' : ''}`}
              title={collapsed ? 'Invoice Management' : undefined}
            >
              <div className="admin-nav-icon">
                <Receipt size={18} />
              </div>
              {!collapsed && (
                <>
                  <span className="admin-nav-label" style={{ fontWeight: 700 }}>
                    Invoice Management
                  </span>
                  <div className="admin-nav-chevron">
                    {invoicesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </>
              )}
            </button>

            {/* Submenus */}
            {(!collapsed ? invoicesOpen : false) && (
              <div className="admin-nav-submenus">
                {invoiceSubmenus.map((sub) => {
                  const isSubActive =
                    sub.href === '/admin/invoices'
                      ? pathname === '/admin/invoices'
                      : pathname === sub.href || pathname.startsWith(`${sub.href}/`);
                  return (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={`admin-nav-subitem ${isSubActive ? 'subitem-active' : ''}`}
                    >
                      <div className="admin-subnav-icon">{sub.icon}</div>
                      <span>{sub.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
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
                    src="/logo-icon.svg"
                    alt="Appliance Seva"
                    width={36}
                    height={36}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div className="admin-brand-text">
                  <div className="admin-brand-title">APPLIANCE SEVA</div>
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
              <div className="admin-drawer-section-title">Operations</div>
              {coreMenuItems.map((item) => {
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

              <div className="admin-drawer-section-title" style={{ marginTop: '16px' }}>
                Invoice &amp; Billing
              </div>
              {invoiceSubmenus.map((sub) => {
                const isSubActive =
                  sub.href === '/admin/invoices'
                    ? pathname === '/admin/invoices'
                    : pathname === sub.href || pathname.startsWith(`${sub.href}/`);
                return (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`admin-drawer-link ${isSubActive ? 'active' : ''}`}
                  >
                    <div className="admin-nav-icon">{sub.icon}</div>
                    <span>{sub.label}</span>
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
