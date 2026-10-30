import React from 'react';
import { Metadata } from 'next';
import OfficialLandingPage from '@/components/home/OfficialLandingPage';
import {
  getCategories,
  getBrands,
  getLocations,
  getReviews,
  getSiteSettings
} from '@/lib/db';

export const revalidate = 0; // Dynamic for reference preview

export const metadata: Metadata = {
  title: 'Official Corporate Service Portal Reference | Home Appliance Care India',
  description: 'Clean, non-carded, official corporate reference design for Home Appliance Care India doorstep service.',
};

export default async function ReferenceLandingPage() {
  const [categories, brands, locations, reviews, settings] = await Promise.all([
    getCategories(),
    getBrands(),
    getLocations(),
    getReviews(),
    getSiteSettings()
  ]);

  return (
    <OfficialLandingPage
      categories={categories}
      brands={brands}
      locations={locations}
      settings={settings}
      reviews={reviews}
    />
  );
}

