import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TrackPageView from '@/components/booking/TrackPageView';
import {
  getCategories,
  getBrands,
  getLocations,
  getSiteSettings
} from '@/lib/db';
import { initialSearchKeywords } from '@/lib/seed-data';
import { buildPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildPageMetadata({
    title: `Track Appliance Repair Booking Status | ${settings.businessName}`,
    description: `Track real-time status of your doorstep AC, Refrigerator, Washing Machine, Microwave, and TV repair booking with your 8-digit Booking ID.`,
    path: '/track',
    lang: 'en'
  });
}

export default async function EnglishTrackPage() {
  const [categories, brands, locations, settings] = await Promise.all([
    getCategories(),
    getBrands(),
    getLocations(),
    getSiteSettings()
  ]);

  return (
    <Suspense fallback={<div style={{ padding: '80px 20px', textAlign: 'center' }}>Loading booking tracker...</div>}>
      <TrackPageView
        categories={categories}
        brands={brands}
        locations={locations}
        settings={settings}
        keywords={initialSearchKeywords}
        lang="en"
      />
    </Suspense>
  );
}
