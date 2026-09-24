'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/header/Header';
import LocationBar from '@/components/header/LocationBar';
import Footer from '@/components/footer/Footer';
import SearchModal from '@/components/search/SearchModal';
import BookingModal from '@/components/modal/BookingModal';
import { BlogPost, Category, Brand, LocationItem, SiteSettings, SearchKeywordItem, Language } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

interface BlogListViewProps {
  posts: BlogPost[];
  categories: Category[];
  brands: Brand[];
  locations: LocationItem[];
  settings: SiteSettings;
  keywords: SearchKeywordItem[];
  lang: Language;
}

export default function BlogListView({
  posts,
  categories,
  brands,
  locations,
  settings,
  keywords,
  lang
}: BlogListViewProps) {
  const t = getDictionary(lang);
  const isBn = lang === 'bn';
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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
        {/* Blog Header */}
        <section style={{ backgroundColor: 'var(--color-bg-base)', borderBottom: '1px solid var(--color-border-light)', padding: '48px 0' }}>
          <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary-dark)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                marginBottom: '16px'
              }}
            >
              <BookOpen size={16} />
              <span>{isBn ? 'প্রযুক্তিগত নির্দেশিকা ও যত্ন' : 'Appliance Care & Guides'}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '14px' }}>
              {isBn ? 'হোম অ্যাপ্লায়েন্স মেরামত ও রক্ষণাবেক্ষণ ব্লগ' : 'Appliance Repair & Maintenance Blog'}
            </h1>

            <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
              {isBn
                ? 'পশ্চিমবঙ্গের আবহাওয়ায় এসি, ফ্রিজ ও অন্যান্য যন্ত্রপাতির সঠিক যত্ন ও সাধারণ সমস্যা সমাধানের বিশেষজ্ঞ পরামর্শ।'
                : 'Expert troubleshooting insights, maintenance tips, and preventative care for household appliances in West Bengal.'}
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section">
          <div className="container" style={{ maxWidth: '980px' }}>
            {posts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <BookOpen size={36} style={{ color: 'var(--color-text-light)', margin: '0 auto 12px auto' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
                  {isBn ? 'বর্তমানে কোনো প্রকাশিত আর্টিকেল নেই' : 'No Published Articles Yet'}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                  {isBn ? 'শীঘ্রই নতুন গাইড যুক্ত করা হবে।' : 'Check back soon for new maintenance guides and tips.'}
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="card card-hover"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '28px',
                      backgroundColor: 'var(--color-bg-card)'
                    }}
                  >
                    <div>
                      {/* Optional Featured Image */}
                      {post.featuredImageUrl && (
                        <div style={{ marginBottom: '18px', borderRadius: '8px', overflow: 'hidden', maxHeight: '180px' }}>
                          <img
                            src={post.featuredImageUrl}
                            alt={isBn ? post.titleBn : post.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      )}

                      {/* Meta info: Date & Author */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={13} />
                          <span>{post.publishedAt || post.createdAt.split('T')[0]}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <User size={13} />
                          <span>{post.author}</span>
                        </div>
                      </div>

                      {/* Post Title */}
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '12px', lineHeight: 1.35 }}>
                        <Link
                          href={isBn ? `/bn/blog/${post.slug}` : `/blog/${post.slug}`}
                          style={{ color: 'inherit' }}
                        >
                          {isBn ? post.titleBn : post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                        {isBn ? post.excerptBn : post.excerpt}
                      </p>
                    </div>

                    {/* Read More Link */}
                    <div style={{ paddingTop: '16px', borderTop: '1px solid var(--color-border-light)' }}>
                      <Link
                        href={isBn ? `/bn/blog/${post.slug}` : `/blog/${post.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: 'var(--color-primary)',
                          fontWeight: 700,
                          fontSize: '0.875rem'
                        }}
                      >
                        <span>{isBn ? 'সম্পূর্ণ আর্টিকেল পড়ুন' : 'Read Full Guide'}</span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
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
