'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Language } from '@/lib/types';
import homepageImages from '@/lib/homepage-images.json';

interface SpotlightCardsProps {
  lang: Language;
  onOpenBooking: () => void;
}

export default function SpotlightCards({ lang, onOpenBooking }: SpotlightCardsProps) {
  const isBn = lang === 'bn';

  const cards = [
    {
      id: 'ac',
      title: isBn ? 'এসি ডিপ ক্লিন ও গ্যাস রিফিল' : 'AC Deep Cleaning & Gas Refill',
      subtitle: isBn ? 'সার্টিফাইড বিশেষজ্ঞ টেকনিশিয়ান' : 'Certified AC Technicians',
      priceTag: isBn ? '₹২৯৯ পরিদর্শন' : '₹299 Visit Fee',
      image: homepageImages.hero_ac || '/images/ac_service.jpg',
      slug: 'ac-repair'
    },
    {
      id: 'fridge',
      title: isBn ? 'নির্ভরযোগ্য ফ্রিজ মেরামত' : 'Reliable Refrigerator Repair',
      subtitle: isBn ? 'সিঙ্গেল ও ডাবল ডোর স্পেশালিস্ট' : 'Single & Double Door Care',
      priceTag: isBn ? '₹২৯৯ পরিদর্শন' : '₹299 Visit Fee',
      image: homepageImages.hero_fridge || '/images/fridge_service.jpg',
      slug: 'fridge-repair'
    },
    {
      id: 'washing',
      title: isBn ? 'ওয়াশিং মেশিন পেশাদার সেবা' : 'Professional Washing Machine Care',
      subtitle: isBn ? 'ফ্রন্ট ও টপ লোড ড্রাম সমাধান' : 'Front & Top Load Specialists',
      priceTag: isBn ? '₹২৯৯ পরিদর্শন' : '₹299 Visit Fee',
      image: homepageImages.hero_washing || '/images/washing_service.jpg',
      slug: 'washing-machine-repair'
    }
  ];

  return (
    <section style={{ backgroundColor: 'var(--color-bg-base)', paddingBottom: '48px' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '24px',
                color: '#FFFFFF'
              }}
            >
              {/* Real Background Photo */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{
                  objectFit: 'cover',
                  zIndex: 0
                }}
                priority
              />

              {/* Gradient Dark Overlay for Crisp Contrast */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.75) 75%, rgba(0, 0, 0, 0.9) 100%)',
                  zIndex: 1
                }}
              />

              {/* Content on Top of Real Photo */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: 'var(--color-primary)',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    marginBottom: '8px'
                  }}
                >
                  {card.priceTag}
                </span>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.25,
                    marginBottom: '4px'
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'rgba(255, 255, 255, 0.85)',
                    marginBottom: '16px'
                  }}
                >
                  {card.subtitle}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={onOpenBooking}
                    className="btn btn-primary btn-sm"
                    style={{
                      borderRadius: '8px',
                      padding: '8px 18px',
                      fontWeight: 700
                    }}
                  >
                    <span>{isBn ? 'বুক করুন' : 'Book Now'}</span>
                    <ArrowRight size={14} />
                  </button>

                  <Link
                    href={isBn ? `/bn/${card.slug}` : `/${card.slug}`}
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px'
                    }}
                  >
                    {isBn ? 'বিস্তারিত' : 'View Details'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
