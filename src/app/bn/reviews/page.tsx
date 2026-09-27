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
    title: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া রিভিউ | ৪.৯★ রেটিং ও কাস্টমার ফিডব্যাক',
    description: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া (Home Appliance Care India reviews): ১২৮০+ পরিবারের বিশ্বস্ত ডোরস্টেপ সার্ভিস রিভিউ। এসি, ফ্রিজ, ওয়াশিং মেশিন, ওভেন ও টিভি মেরামতের যাচাইকৃত মতামত।',
    keywords: [
      'Home appliance care india reviews',
      'Home Appliance Care India',
      'Home appliance care india near me',
      'home appliance repair service reviews',
      'অ্যাপ্লায়েন্স সেবা রিভিউ',
      'কলকাতা এসি মেরামত রিভিউ'
    ],
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

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Home Appliance Care India - Customer Reviews (Bangla)',
    url: 'https://www.applianceseva.com/bn/reviews',
    telephone: settings.phone,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: reviews.length.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    review: reviews.slice(0, 15).map((r) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.customerName
      },
      datePublished: r.date,
      reviewBody: r.commentBn || r.comment,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: '5',
        worstRating: '1'
      }
    }))
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
        lang="bn"
      />
    </>
  );
}
