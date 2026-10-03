import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import LocationPageView from '@/components/location/LocationPageView';
import {
  getLocations,
  getLocationBySlug,
  getCategories,
  getBrands,
  getSiteSettings
} from '@/lib/db';
import {
  buildPageMetadata,
  generateFAQSchema,
  generateBreadcrumbSchema,
  SITE_URL
} from '@/lib/seo';

export const revalidate = 3600;

export async function generateStaticParams() {
  const locations = await getLocations();
  return locations.map((loc) => ({
    locationSlug: loc.hashSlug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locationSlug: string }>;
}): Promise<Metadata> {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  if (!location) return {};

  const title = `${location.nameBn}-এ ডোরস্টেপ এসি ও অ্যাপ্লায়েন্স মেরামত | ৪৫-৬০ মিনিটে টেকনিশিয়ান`;
  const description = `${location.nameBn} (পিন: ${location.pincode || 'কলকাতা'}) এলাকায় এসি, ফ্রিজ, ওয়াশিং মেশিন, মাইক্রোওয়েভ ও টিভির নির্ভরযোগ্য ডোরস্টেপ মেরামত। ৪৫-৬০ মিনিটে আগমন, আসল পার্টস ও ৯০ দিনের ওয়ারেন্টি।`;

  return buildPageMetadata({
    title,
    description,
    path: `/locations/${location.hashSlug}`,
    lang: 'bn'
  });
}

export default async function LocationPageBn({
  params
}: {
  params: Promise<{ locationSlug: string }>;
}) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);

  if (!location) {
    notFound();
  }

  const [locations, categories, brands, settings] = await Promise.all([
    getLocations(),
    getCategories(),
    getBrands(),
    getSiteSettings()
  ]);

  const rawFaqs = [
    {
      q: `${location.nameBn} এলাকায় টেকনিশিয়ান কত তাড়াতাড়ি আমার বাড়ি পৌঁছাবে?`,
      a: `আমাদের ডেডিকেটেড ${location.nameBn} সার্ভিস হাব থেকে বুকিং কনফার্ম হওয়ার ${location.responseTimeBn || '৪৫ থেকে ৬০ মিনিটের'} মধ্যে আমাদের সার্টিফাইড টেকনিশিয়ান আপনার বাড়িতে পৌঁছে যাবে।`
    },
    {
      q: `${location.nameBn} (পিন: ${location.pincode}) অঞ্চলে আপনারা কোন কোন অ্যাপ্লায়েন্স মেরামত করেন?`,
      a: `আমরা ${location.nameBn} এলাকায় স্প্লিট/ইনভার্টার এসি, ফ্রস্ট-ফ্রি ও ডিরেক্ট-কুল ফ্রিজ, ফ্রন্ট ও টপ লোড ওয়াশিং মেশিন, কনভেকশন মাইক্রোওভেন এবং স্মার্ট এলইডি টিভির সম্পূর্ণ ডোরস্টেপ সার্ভিস প্রদান করি।`
    },
    {
      q: `${location.nameBn}-এ কাজের উপর কোনো সার্ভিস ওয়ারেন্টি দেওয়া হয়?`,
      a: `হ্যাঁ, সমস্ত সম্পন্ন কাজের উপর ৩০ থেকে ৯০ দিনের অফিসিয়াল ওয়ারেন্টি এবং নতুন অরিজিনাল পার্টসের উপর কোম্পানি ম্যানুফ্যাকচারার ওয়ারেন্টি দেওয়া হয়।`
    },
    {
      q: `${location.nameBn} এলাকায় পরিদর্শন ও মেরামত চার্জ কীভাবে হিসাব করা হয়?`,
      a: `আমরা সম্পূর্ণ স্বচ্ছ রেট বজায় রাখি। টেকনিশিয়ান বাড়ি এসে মাল্টিমিটার টেস্ট করে অগ্রিম লিখিত কোটেশন দেন। আপনার সম্মতি পাওয়ার পরই মেরামত করা হয়। মেরামত করালে ভিজিট চার্জ বিলের সাথে অ্যাডজাস্ট করা হয়।`
    }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'হোম', url: '/bn' },
    { name: 'সার্ভিস এরিয়া', url: '/bn/locations' },
    { name: location.nameBn, url: `/bn/locations/${location.hashSlug}` }
  ]);

  const faqSchema = generateFAQSchema(
    rawFaqs.map((f) => ({ question: f.q, questionBn: f.q, answer: f.a, answerBn: f.a })),
    'bn'
  );

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `Appliance Seva - ${location.nameBn} সার্ভিস হাব`,
    url: `${SITE_URL}/bn/locations/${location.hashSlug}`,
    telephone: settings.phone,
    email: settings.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.addressBn || location.address || `${location.name}, Kolkata`,
      addressLocality: location.name,
      addressRegion: 'West Bengal',
      postalCode: location.pincode || '700001',
      addressCountry: 'IN'
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${location.name}, West Bengal`
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1280',
      bestRating: '5',
      worstRating: '1'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <LocationPageView
        location={location}
        locations={locations}
        categories={categories}
        brands={brands}
        settings={settings}
        faqs={rawFaqs}
        lang="bn"
      />
    </>
  );
}
