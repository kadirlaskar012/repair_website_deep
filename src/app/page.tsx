import React from 'react';
import { Metadata } from 'next';
import HomePageView from '@/components/home/HomePageView';
import {
  getCategories,
  getAllProblemsAdmin,
  getBrands,
  getLocations,
  getTrustItems,
  getReviews,
  getSiteSettings
} from '@/lib/db';
import { initialSearchKeywords } from '@/lib/seed-data';
import { homeFaqs } from '@/lib/seo-data';
import { buildPageMetadata, generateLocalBusinessSchema, generateFAQSchema } from '@/lib/seo';

export const revalidate = 3600; // ISR 1 hour

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildPageMetadata({
    title: `${settings.businessName} | Doorstep Appliance Repair in West Bengal | ₹299 Visit`,
    description: 'Expert doorstep appliance repair across Kolkata & West Bengal. Certified technicians for AC, Refrigerator, Washing Machine, Microwave, and LED TV. Transparent ₹299 visit fee.',
    path: '/',
    lang: 'en'
  });
}

export default async function EnglishHomePage() {
  const [categories, problems, brands, locations, trustItems, reviews, settings] = await Promise.all([
    getCategories(),
    getAllProblemsAdmin(),
    getBrands(),
    getLocations(),
    getTrustItems(),
    getReviews(),
    getSiteSettings()
  ]);

  const localBusinessSchema = generateLocalBusinessSchema(settings);
  const faqSchema = generateFAQSchema(homeFaqs, 'en');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePageView
        categories={categories}
        problems={problems}
        brands={brands}
        locations={locations}
        trustItems={trustItems}
        reviews={reviews}
        settings={settings}
        keywords={initialSearchKeywords}
        lang="en"
      />
    </>
  );
}
