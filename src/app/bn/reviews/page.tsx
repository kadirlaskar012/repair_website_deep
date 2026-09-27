import React from 'react';
import { Metadata } from 'next';
import ReviewsPageView from '@/components/reviews/ReviewsPageView';
import {
  getReviews,
  getCategories,
  getBrands,
  getLocations,
  getSiteSettings
} from '@/lib/db';
import { initialSearchKeywords } from '@/lib/seed-data';
import { buildPageMetadata } from '@/lib/seo';

export const revalidate = 1800; // ISR 30 mins

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildPageMetadata({
    title: `গ্রাহকদের রিভিউ ও রেটিং | ${settings.businessNameBn || settings.businessName}`,
    description: `কলকাতা, হাওড়া ও সমগ্র পশ্চিমবঙ্গের গ্রাহকদের আসল মতামত ও রেটিং। এসি, ফ্রিজ, ওয়াশিং মেশিন ও টিভির বিশ্বস্ত ডোরস্টেপ মেরামত।`,
    path: '/reviews',
    lang: 'bn'
  });
}

export default async function BengaliReviewsPage() {
  const [reviews, categories, brands, locations, settings] = await Promise.all([
    getReviews(),
    getCategories(),
    getBrands(),
    getLocations(),
    getSiteSettings()
  ]);

  return (
    <ReviewsPageView
      reviews={reviews}
      categories={categories}
      brands={brands}
      locations={locations}
      settings={settings}
      keywords={initialSearchKeywords}
      lang="bn"
    />
  );
}
