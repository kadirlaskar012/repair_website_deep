'use client';

import React, { useState } from 'react';
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
  Wrench
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { href: '/admin/bookings', label: 'Booking Leads', icon: <Calendar size={18} /> },
    { href: '/admin/categories', label: 'Categories', icon: <Layers size={18} /> },
    { href: '/admin/problems', label: 'Problems & Symptoms', icon: <AlertTriangle size={18} /> },
    { href: '/admin/brands', label: 'Brands & Logos', icon: <Award size={18} /> },
    { href: '/admin/locations', label: 'West Bengal Locations', icon: <MapPin size={18} /> },
    { href: '/admin/reviews', label: 'Customer Reviews', icon: <Star size={18} /> },
    { href: '/admin/blog', label: 'Blog & Articles', icon: <FileText size={18} /> },
    { href: '/admin/ai-settings', label: 'AI Configuration', icon: <Sparkles size={18} /> },
    { href: '/admin/media', label: 'Media Assets', icon: <ImageIcon size={18} /> },
    { href: '/admin/settings', label: 'Site Settings & Content', icon: <Settings size={18} /> }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F4F6F5' }}>
      {/* Sidebar Desktop */}
      <aside
        style={{
          width: '260px',
          backgroundColor: '#0F2620',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0
        }}
        className="admin-sidebar-desktop"
      >
        {/* Brand */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
            <Wrench size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF', lineHeight: 1.1 }}>
              AC Repair Service
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)' }}>
              Admin Control Panel
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#FFFFFF' : '#9EB5AF',
                  backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                  transition: 'all 0.15s'
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8125rem',
              color: '#B5CBC5',
              padding: '6px 0'
            }}
          >
            <ExternalLink size={15} />
            <span>View Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8125rem',
              color: '#FF8A8A',
              padding: '8px 0',
              textAlign: 'left'
            }}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header */}
        <header
          style={{
            height: '64px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--color-border)',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                padding: '6px',
                borderRadius: '6px',
                background: 'var(--color-bg-alt)'
              }}
              className="admin-menu-toggle"
            >
              <Menu size={20} />
            </button>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Management Portal
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              href="/"
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8125rem',
                color: 'var(--color-primary)',
                fontWeight: 600,
                padding: '6px 12px',
                borderRadius: '6px',
                background: 'var(--color-primary-light)'
              }}
            >
              <span>Live Site</span>
              <ExternalLink size={13} />
            </Link>

            <button
              onClick={handleLogout}
              style={{
                fontSize: '0.8125rem',
                color: 'var(--color-danger)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div style={{ padding: 'clamp(20px, 4vw, 32px)', flex: 1 }}>
          {children}
        </div>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex' }}
          onClick={() => setSidebarOpen(false)}
        >
          <div
            style={{ width: '280px', backgroundColor: '#0F2620', height: '100%', color: '#FFFFFF', padding: '20px', display: 'flex', flexDirection: 'column' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ fontWeight: 800 }}>AC Repair Admin</div>
              <button onClick={() => setSidebarOpen(false)} style={{ color: '#FFFFFF' }}>
                <X size={20} />
              </button>
            </div>
            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    color: pathname === item.href ? '#FFFFFF' : '#9EB5AF',
                    backgroundColor: pathname === item.href ? 'var(--color-primary)' : 'transparent'
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
