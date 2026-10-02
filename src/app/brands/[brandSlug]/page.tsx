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
  generateBreadcrumbSchema,
  SITE_URL
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
    title: `${brandDetail.name} Service Centre Support & Repair in Kolkata | ₹299 Visit`,
    description: brandDetail.subheadlineEn,
    path: `/brands/${brandDetail.slug}`,
    lang: 'en',
    keywords: brandDetail.searchedKeywords.join(', ')
  });
}

export default async function BrandPage({
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
      question: f.qEn,
      questionBn: f.qBn,
      answer: f.aEn,
      answerBn: f.aBn
    })),
    'en'
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Brands', url: '/#brands' },
    { name: brandDetail.name, url: `/brands/${brandDetail.slug}` }
  ]);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `${brandDetail.name} Appliance Repair and Servicing`,
    provider: {
      '@type': 'LocalBusiness',
      name: `${settings.businessName} - ${brandDetail.name} Support`,
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
      description: `Doorstep inspection and multi-point diagnostics for ${brandDetail.name} appliances.`
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
        lang="en"
      />
    </>
  );
}
