'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/header/Header';
import LocationBar from '@/components/header/LocationBar';
import Footer from '@/components/footer/Footer';
import SearchModal from '@/components/search/SearchModal';
import BookingModal from '@/components/modal/BookingModal';
import {
  BlogPost,
  Category,
  Brand,
  LocationItem,
  SiteSettings,
  SearchKeywordItem,
  Language
} from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import {
  Calendar,
  User,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar as CalendarIcon,
  Phone,
  MessageCircle,
  HelpCircle,
  Tag
} from 'lucide-react';

interface BlogPostViewProps {
  post: BlogPost;
  categories: Category[];
  brands: Brand[];
  locations: LocationItem[];
  settings: SiteSettings;
  keywords: SearchKeywordItem[];
  lang: Language;
}

export default function BlogPostView({
  post,
  categories,
  brands,
  locations,
  settings,
  keywords,
  lang
}: BlogPostViewProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const title = isBn ? post.titleBn : post.title;
  const content = isBn ? post.contentBn : post.content;
  const excerpt = isBn ? post.excerptBn : post.excerpt;

  // Simple clean markdown-to-HTML parser for safe rendering
  const renderFormattedContent = (text: string) => {
    // If text already has HTML or markdown
    const paragraphs = text.split('\n\n');
    return paragraphs.map((para, i) => {
      const p = para.trim();
      if (p.startsWith('### ')) {
        return (
          <h3 key={i} style={{ fontSize: '1.25rem', fontWeight: 700, margin: '24px 0 10px 0', color: 'var(--color-text-main)' }}>
            {p.replace('### ', '')}
          </h3>
        );
      }
      if (p.startsWith('## ')) {
        return (
          <h2 key={i} style={{ fontSize: '1.5rem', fontWeight: 800, margin: '32px 0 14px 0', color: 'var(--color-primary-dark)' }}>
            {p.replace('## ', '')}
          </h2>
        );
      }
      if (p.startsWith('- ') || p.startsWith('* ')) {
        const items = p.split('\n').filter(Boolean);
        return (
          <ul key={i} style={{ margin: '12px 0 20px 24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {items.map((item, idx) => (
              <li key={idx} style={{ fontSize: '1rem', lineHeight: 1.6 }}>
                {item.replace(/^[-*]\s+/, '')}
              </li>
            ))}
          </ul>
        );
      }
      if (p.startsWith('---')) {
        return <hr key={i} style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '32px 0' }} />;
      }
      return (
        <p key={i} style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: '#2C3A37', marginBottom: '18px' }}>
          {p}
        </p>
      );
    });
  };

  return (
    <>
      <LocationBar locations={locations} lang={lang} />
      <Header
        categories={categories}
        lang={lang}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        phone={settings.phone}
        whatsapp={settings.whatsapp}
      />

      <main style={{ backgroundColor: 'var(--color-bg-warm)', paddingBottom: '64px' }}>
        {/* Breadcrumb Bar */}
        <div style={{ backgroundColor: 'var(--color-bg-base)', borderBottom: '1px solid var(--color-border-light)', padding: '14px 0' }}>
          <div className="container" style={{ maxWidth: '840px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }} aria-label="Breadcrumb">
              <Link href={isBn ? '/bn' : '/'} style={{ color: 'inherit' }}>
                {t.home}
              </Link>
              <ChevronRight size={14} />
              <Link href={isBn ? '/bn/blog' : '/blog'} style={{ color: 'inherit' }}>
                {isBn ? 'ব্লগ' : 'Blog'}
              </Link>
              <ChevronRight size={14} />
              <span style={{ color: 'var(--color-primary)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>
                {title}
              </span>
            </nav>
          </div>
        </div>

        {/* Article Container */}
        <div className="container" style={{ maxWidth: '840px', marginTop: '40px' }}>
          <article
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              padding: 'clamp(24px, 5vw, 48px)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            {/* Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} />
                <span>{post.publishedAt || post.createdAt.split('T')[0]}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} />
                <span>{post.author}</span>
              </div>
              {post.focusKeyword && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                  <Tag size={12} />
                  <span>{post.focusKeyword}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 'clamp(1.85rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--color-text-main)',
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                marginBottom: '20px'
              }}
            >
              {title}
            </h1>

            {/* Excerpt Lead */}
            <div
              style={{
                fontSize: '1.125rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
                paddingLeft: '16px',
                borderLeft: '4px solid var(--color-primary)',
                marginBottom: '32px',
                fontStyle: 'italic'
              }}
            >
              {excerpt}
            </div>

            {/* Optional Featured Image */}
            {post.featuredImageUrl && (
              <div style={{ marginBottom: '32px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <img
                  src={post.featuredImageUrl}
                  alt={title}
                  style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
                />
              </div>
            )}

            {/* Main Article Body */}
            <div style={{ color: 'var(--color-text-main)' }}>
              {renderFormattedContent(content)}
            </div>

            {/* Article FAQs if present */}
            {post.faqs && post.faqs.length > 0 && (
              <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--color-border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <HelpCircle size={22} style={{ color: 'var(--color-primary)' }} />
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>
                    {isBn ? 'এই বিষয়ক সাধারণ প্রশ্নোত্তর' : 'Frequently Asked Questions'}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {post.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: 'var(--color-bg-warm)',
                        borderRadius: 'var(--radius-md)',
                        padding: '18px 20px',
                        border: '1px solid var(--color-border-light)'
                      }}
                    >
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--color-text-main)' }}>
                        {isBn ? faq.questionBn : faq.question}
                      </h4>
                      <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                        {isBn ? faq.answerBn : faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* In-Article Doorstep Booking Banner */}
            <div
              style={{
                marginTop: '48px',
                padding: '28px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-primary-light)',
                border: '1.5px solid rgba(20, 108, 91, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-primary-dark)' }}>
                {isBn ? 'পশ্চিমবঙ্গে ডোরস্টেপ রোগ নির্ণয় প্রয়োজন?' : 'Facing Appliance Issues in West Bengal?'}
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', maxWidth: '540px', lineHeight: 1.5 }}>
                {isBn
                  ? 'আমাদের সার্টিফাইড টেকনিশিয়ান আপনার দরজায় এসে পরীক্ষা করবেন মাত্র ₹২৯৯ ফি-তে। কাজের পূর্বে সম্পূর্ণ কোটেশন প্রদান করা হয়।'
                  : 'Certified technicians at your doorstep across Kolkata & West Bengal. Complete physical inspection at a flat ₹299 fee.'}
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="btn btn-primary"
                >
                  <CalendarIcon size={16} />
                  <span>{t.bookNow}</span>
                </button>
                <a href={`tel:${settings.phone}`} className="btn btn-outline">
                  <Phone size={16} />
                  <span>{settings.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer
        settings={settings}
        categories={categories}
        locations={locations}
        lang={lang}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        categories={categories}
        problems={[]}
        keywords={keywords}
        lang={lang}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        categories={categories}
        brands={brands}
        lang={lang}
      />
    </>
  );
}
