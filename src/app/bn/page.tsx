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
    title: 'Home Appliance Care India - হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া | ডোরস্টেপ রিপেয়ার',
    description: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া (Home Appliance Care India): ভারত ও পশ্চিমবঙ্গের #১ ডোরস্টেপ হোম অ্যাপ্লায়েন্স রিপেয়ার সার্ভিস। ৪.৯★ গ্রাহক রিভিউ (reviews)। আপনার নিকটবর্তী (near me) দক্ষ টেকনিশিয়ান। এসি, ফ্রিজ, ওয়াশিং মেশিন, ওভেন ও টিভি মেরামত মাত্র ₹২৯৯ ফি ও ৯০ দিনের ওয়ারেন্টি।',
    keywords: [
      'home Appliance Care India',
      'Home Appliance Care India',
      'Home appliance care india near me',
      'Home appliance care india reviews',
      'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া',
      'home appliance repair service',
      'ডোরস্টেপ হোম অ্যাপ্লায়েন্স সার্ভিস',
      'হোম অ্যাপ্লায়েন্স সার্ভিস নিকটবর্তী',
      'অ্যাপ্লায়েন্স সেবা',
      'AC repair near me'
    ],
    path: '/',
    lang: 'bn'
  });
}

export default async function BengaliHomePage() {
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
  const faqSchema = generateFAQSchema(homeFaqs, 'bn');

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
        lang="bn"
      />
    </>
  );
}
