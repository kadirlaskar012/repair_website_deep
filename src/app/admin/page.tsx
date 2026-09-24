import React from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { getDashboardStats } from '@/lib/db';
import {
  Calendar,
  Layers,
  Award,
  MapPin,
  Star,
  FileText,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Image as ImageIcon
} from 'lucide-react';

export const revalidate = 0; // dynamic admin dashboard

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { title: 'Total Bookings', value: stats.bookings, icon: <Calendar size={22} />, color: '#146C5B', link: '/admin/bookings', note: 'Customer service leads' },
    { title: 'Homepage Images', value: '16 Slots', icon: <ImageIcon size={22} />, color: '#0284C7', link: '/admin/homepage-images', note: 'Hardcoded assets & Git sync' },
    { title: 'Categories', value: stats.categories, icon: <Layers size={22} />, color: '#2563EB', link: '/admin/categories', note: 'Primary repair hubs' },
    { title: 'Brands Serviced', value: stats.brands, icon: <Award size={22} />, color: '#7C3AED', link: '/admin/brands', note: 'Supported appliances' },
    { title: 'West Bengal Locations', value: stats.locations, icon: <MapPin size={22} />, color: '#EA580C', link: '/admin/locations', note: 'Serving districts' },
    { title: 'Customer Reviews', value: stats.reviews, icon: <Star size={22} />, color: '#D97706', link: '/admin/reviews', note: 'Homepage ratings' },
    { title: 'Published Blog Posts', value: stats.publishedBlog, icon: <FileText size={22} />, color: '#059669', link: '/admin/blog', note: 'Live SEO articles' },
    { title: 'Draft Articles', value: stats.draftBlog, icon: <Clock size={22} />, color: '#6B7280', link: '/admin/blog', note: 'Ready for review' }
  ];

  return (
    <AdminLayout>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Welcome Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '28px 32px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
              Welcome back, Admin
            </h1>
            <p style={{ color: '#D2E8E3', fontSize: '0.9375rem' }}>
              All 5 appliance services, locations, and bilingual settings are active across West Bengal.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link
              href="/admin/blog"
              className="btn btn-accent btn-sm"
            >
              <Sparkles size={16} />
              <span>AI Blog Writer</span>
            </Link>
            <Link
              href="/admin/bookings"
              className="btn btn-sm"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF' }}
            >
              <Calendar size={16} />
              <span>View Leads</span>
            </Link>
          </div>
        </div>

        {/* Content Statistics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '20px',
            marginBottom: '36px'
          }}
        >
          {cards.map((c, idx) => (
            <Link
              key={idx}
              href={c.link}
              className="card card-hover"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                    {c.title}
                  </span>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: `${c.color}15`,
                      color: c.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {c.icon}
                  </div>
                </div>

                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-main)', lineHeight: 1, marginBottom: '6px' }}>
                  {c.value}
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                  {c.note}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: c.color,
                  marginTop: '16px',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--color-border-light)'
                }}
              >
                <span>Manage</span>
                <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Instructions & System Summary */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '14px', color: 'var(--color-text-main)' }}>
            System Status & Configuration
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Bilingual Routing:</strong> Active for English (`/`) and Bengali (`/bn/`) with SEO canonicals and hreflang tags.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Hostinger Database:</strong> MySQL schema initialized with support for automated connection pooling and in-memory fallback.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>AI Blog Generator:</strong> Integrated with Gemini and OpenAI APIs with draft-first manual review policy.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Standard Diagnosis Fee:</strong> Configured at flat ₹299 across all categories with customer-approval disclaimer.
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
