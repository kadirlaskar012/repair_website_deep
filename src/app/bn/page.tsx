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
import { buildPageMetadata, generateLocalBusinessSchema } from '@/lib/seo';

export const revalidate = 3600; // ISR 1 hour

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildPageMetadata({
    title: `${settings.businessNameBn} | পশ্চিমবঙ্গে আপনার দরজায় অ্যাপ্লায়েন্স সার্ভিস | ₹২৯৯ ফি`,
    description: 'কলকাতা ও পশ্চিমবঙ্গ জুড়ে বিশ্বস্ত হোম অ্যাপ্লায়েন্স মেরামত পরিষেবা। এসি, ফ্রিজ, ওয়াশিং মেশিন, ওভেন ও টিভি মেরামত। মাত্র ₹২৯৯ স্বচ্ছ ডায়াগনোসিস ফি।',
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
