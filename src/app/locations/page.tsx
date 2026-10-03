import React from 'react';
import { Metadata } from 'next';
import LocationsIndexView from '@/components/location/LocationsIndexView';
import { getLocations, getCategories, getBrands, getSiteSettings } from '@/lib/db';
import { buildPageMetadata, generateBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: 'Service Areas & Regional Hubs in Kolkata, Howrah & West Bengal | Appliance Seva',
    description: 'Explore all 30 doorstep service hubs across Kolkata, Salt Lake, New Town, Howrah, North & South 24 Parganas. Fast 45-60 min arrival for AC, Fridge, Washing Machine, Microwave & TV repair.',
    path: '/locations',
    lang: 'en'
  });
}

export default async function LocationsIndexPage() {
  const [locations, categories, brands, settings] = await Promise.all([
    getLocations(),
    getCategories(),
    getBrands(),
    getSiteSettings()
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LocationsIndexView
        locations={locations}
        categories={categories}
        brands={brands}
        settings={settings}
        lang="en"
      />
    </>
  );
}
