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
  return buildPageMetadata({
    title: 'Home Appliance Care India Reviews | 4.9★ Customer Ratings & Feedback',
    description: 'Read verified customer reviews for Home Appliance Care India by Appliance Seva. Rated 4.9/5 by 1280+ happy households across West Bengal for doorstep AC, Fridge, Washing Machine, Microwave & TV repair service near me.',
    keywords: [
      'Home appliance care india reviews',
      'Home Appliance Care India',
      'Home appliance care india near me',
      'home appliance repair service reviews',
      'Appliance Seva reviews',
      'AC repair reviews Kolkata'
    ],
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

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Home Appliance Care India - Customer Reviews',
    url: 'https://www.applianceseva.com/reviews',
    telephone: settings.phone,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1280',
      bestRating: '5',
      worstRating: '1'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <ReviewsPageView
        reviews={reviews}
        categories={categories}
        brands={brands}
        locations={locations}
        settings={settings}
        keywords={initialSearchKeywords}
        lang="en"
      />
    </>
  );
}
