import React from 'react';
import { Metadata } from 'next';
import TermsOfServiceView from '@/components/legal/TermsOfServiceView';
import { getCategories, getBrands, getLocations, getSiteSettings } from '@/lib/db';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: 'Terms of Service | AC Repair Service',
    description: 'Terms of service, ₹299 inspection fee explanation, and 30-day warranty policy for AC Repair Service.',
    path: '/terms-of-service',
    lang: 'en'
  });
}

export default async function TermsOfServicePage() {
  const [categories, brands, locations, settings] = await Promise.all([
    getCategories(),
    getBrands(),
    getLocations(),
    getSiteSettings()
  ]);

  return (
    <TermsOfServiceView
      categories={categories}
      brands={brands}
      locations={locations}
      settings={settings}
      lang="en"
    />
  );
}
