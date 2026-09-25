import React from 'react';
import { Metadata } from 'next';
import PrivacyPolicyView from '@/components/legal/PrivacyPolicyView';
import { getCategories, getBrands, getLocations, getSiteSettings } from '@/lib/db';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: 'Privacy Policy | Appliance Seva',
    description: 'Privacy policy and data protection standards for Appliance Seva operations across West Bengal.',
    path: '/privacy-policy',
    lang: 'en'
  });
}

export default async function PrivacyPolicyPage() {
  const [categories, brands, locations, settings] = await Promise.all([
    getCategories(),
    getBrands(),
    getLocations(),
    getSiteSettings()
  ]);

  return (
    <PrivacyPolicyView
      categories={categories}
      brands={brands}
      locations={locations}
      settings={settings}
      lang="en"
    />
  );
}
