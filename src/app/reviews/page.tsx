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
    title: `Customer Reviews & Ratings | ${settings.businessName}`,
    description: `Read verified customer reviews for doorstep AC, Refrigerator, Washing Machine, Microwave and LED TV repair across Kolkata & West Bengal by ${settings.businessName}.`,
    path: '/reviews',
    lang: 'en'
  });
}

export default async function EnglishReviewsPage() {
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
      lang="en"
    />
  );
}
