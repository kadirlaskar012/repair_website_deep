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
    title: 'Home Appliance Care India | Doorstep Home Appliance Repair Service',
    description: 'Home Appliance Care India by Appliance Seva: Top-rated doorstep home appliance repair service across India & West Bengal. 4.9★ reviews from 1280+ customers. Expert technicians near me for AC, Refrigerator, Washing Machine, Microwave & TV. ₹299 inspection & 90-day warranty.',
    keywords: [
      'Home Appliance Care India',
      'Home appliance care india reviews',
      'Home appliance care india near me',
      'home appliance repair service',
      'home appliance repair service near me',
      'Doorstep AC repair Kolkata',
      'Refrigerator repair near me',
      'Washing machine service near me',
      'Appliance Seva'
    ],
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
