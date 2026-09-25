import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BrandPageView from '@/components/brand/BrandPageView';
import {
  getCategories,
  getAllProblemsAdmin,
  getBrands,
  getLocations,
  getSiteSettings
} from '@/lib/db';
import { brandSeoCatalog } from '@/lib/brand-seo-data';
import { initialSearchKeywords } from '@/lib/seed-data';
import {
  buildPageMetadata,
  generateFAQSchema,
  generateBreadcrumbSchema
} from '@/lib/seo';

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(brandSeoCatalog).map((slug) => ({
    brandSlug: slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ brandSlug: string }>;
}): Promise<Metadata> {
  const { brandSlug } = await params;
  const brandDetail = brandSeoCatalog[brandSlug];
  if (!brandDetail) return {};

  return buildPageMetadata({
    title: `${brandDetail.name} সার্ভিস সেন্টার সাপোর্ট ও মেরামত কলকাতা | ₹২৯৯ পরিদর্শন`,
    description: brandDetail.subheadlineBn,
    path: `/bn/brands/${brandDetail.slug}`,
    lang: 'bn',
    keywords: brandDetail.searchedKeywords.join(', ')
  });
}

export default async function BrandPageBn({
  params
}: {
  params: Promise<{ brandSlug: string }>;
}) {
  const { brandSlug } = await params;
  const brandDetail = brandSeoCatalog[brandSlug];

  if (!brandDetail) {
    notFound();
  }

  const [categories, problems, brands, locations, settings] = await Promise.all([
    getCategories(),
    getAllProblemsAdmin(),
    getBrands(),
    getLocations(),
    getSiteSettings()
  ]);

  const brand = brands.find((b) => b.id === brandSlug) || {
    id: brandDetail.slug,
    name: brandDetail.name,
    logoUrl: `/images/brands/${brandDetail.slug}.svg`,
    categoryIds: ['ac-repair'],
    sortOrder: 1,
    isActive: true,
    isPopular: true
  };

  const faqSchema = generateFAQSchema(
    brandDetail.faqs.map((f) => ({
      question: f.qBn,
      questionBn: f.qBn,
      answer: f.aBn,
      answerBn: f.aBn
    })),
    'bn'
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'হোম', url: '/bn' },
    { name: 'ব্র্যান্ড সাপোর্ট', url: '/bn#brands' },
    { name: brandDetail.name, url: `/bn/brands/${brandDetail.slug}` }
  ]);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `${brandDetail.name} অ্যাপ্লায়েন্স মেরামত ও সার্ভিসিং`,
    provider: {
      '@type': 'LocalBusiness',
      name: `${settings.businessNameBn} - ${brandDetail.name} ডোরস্টেপ সাপোর্ট`,
      telephone: settings.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kolkata',
        addressRegion: 'West Bengal',
        addressCountry: 'IN'
      },
      priceRange: '₹299'
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'West Bengal'
    },
    offers: {
      '@type': 'Offer',
      price: '299',
      priceCurrency: 'INR',
      description: `${brandDetail.name} এসির ডোরস্টেপ পরিদর্শন ও ডায়াগনোসিস ফি মাত্র ₹২৯৯।`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BrandPageView
        brandDetail={brandDetail}
        brand={brand}
        categories={categories}
        problems={problems}
        brands={brands}
        locations={locations}
        settings={settings}
        keywords={initialSearchKeywords}
        lang="bn"
      />
    </>
  );
}
