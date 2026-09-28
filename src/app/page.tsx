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
import {
  buildPageMetadata,
  generateLocalBusinessSchema,
  generateFAQSchema,
  generateWebSiteSchema,
  generateBrandSchema
} from '@/lib/seo';

export const revalidate = 3600; // ISR 1 hour

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildPageMetadata({
    title: 'Home Appliance Care India | #1 Doorstep Home Appliance Repair Service',
    description: 'Home Appliance Care India: Official doorstep home appliance repair and maintenance service across India & West Bengal. Rated 4.9★ by 1,280+ customers. Expert technicians near me for AC, Refrigerator, Washing Machine, Microwave & TV. Flat ₹299 inspection & 90-day warranty.',
    keywords: [
      'home Appliance Care India',
      'Home Appliance Care India',
      'Home appliance care india near me',
      'Home appliance care india reviews',
      'Home appliance care india customer care number',
      'Home appliance care india Kolkata',
      'home appliance repair service',
      'home appliance repair service near me',
      'doorstep appliance repair Kolkata',
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
  const websiteSchema = generateWebSiteSchema();
  const brandSchema = generateBrandSchema();
  const faqSchema = generateFAQSchema(homeFaqs, 'en');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
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
