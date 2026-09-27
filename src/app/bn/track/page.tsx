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
    title: `বুকিং স্ট্যাটাস লাইভ ট্র্যাক করুন | ${settings.businessNameBn || settings.businessName}`,
    description: `আপনার ৮ সংখ্যার বুকিং আইডি দিয়ে ডোরস্টেপ এসি, ফ্রিজ, ওয়াশিং মেশিন ও টিভি মেরামত বুকিংয়ের লাইভ অগ্রগতি ট্র্যাক করুন।`,
    path: '/track',
    lang: 'bn'
  });
}

export default async function BengaliTrackPage() {
  const [categories, brands, locations, settings] = await Promise.all([
    getCategories(),
    getBrands(),
    getLocations(),
    getSiteSettings()
  ]);

  return (
    <Suspense fallback={<div style={{ padding: '80px 20px', textAlign: 'center' }}>ট্র্যাকার লোড হচ্ছে...</div>}>
      <TrackPageView
        categories={categories}
        brands={brands}
        locations={locations}
        settings={settings}
        keywords={initialSearchKeywords}
        lang="bn"
      />
    </Suspense>
  );
}
