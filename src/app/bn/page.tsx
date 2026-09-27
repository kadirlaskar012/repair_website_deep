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
    title: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া | ডোরস্টেপ হোম অ্যাপ্লায়েন্স রিপেয়ার সার্ভিস',
    description: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া (Home Appliance Care India): পশ্চিমবঙ্গ ও কলকাতা জুড়ে #১ ডোরস্টেপ সার্ভিস। ৪.৯★ গ্রাহক রিভিউ (reviews)। আপনার নিকটবর্তী (near me) দক্ষ টেকনিশিয়ান। এসি, ফ্রিজ, ওয়াশিং মেশিন, ওভেন ও টিভি মেরামত মাত্র ₹২৯৯ ফি ও ৯০ দিনের ওয়ারেন্টি।',
    keywords: [
      'Home Appliance Care India',
      'Home appliance care india reviews',
      'Home appliance care india near me',
      'home appliance repair service',
      'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া',
      'ডোরস্টেপ হোম অ্যাপ্লায়েন্স সার্ভিস',
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
  const faqSchema = generateFAQSchema(homeFaqs, 'bn');

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
        lang="bn"
      />
    </>
  );
}
