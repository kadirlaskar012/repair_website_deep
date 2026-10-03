import React from 'react';
import { Metadata } from 'next';
import LocationsIndexView from '@/components/location/LocationsIndexView';
import { getLocations, getCategories, getBrands, getSiteSettings } from '@/lib/db';
import { buildPageMetadata, generateBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: 'কলকাতা ও পশ্চিমবঙ্গের সমস্ত সার্ভিস এরিয়া ও ব্রাঞ্চ হাব | Appliance Seva',
    description: 'কলকাতা, সল্টলেক, নিউ টাউন, হাওড়া, উত্তর ও দক্ষিণ ২৪ পরগনা জুড়ে আমাদের ৩০টি ডোরস্টেপ সার্ভিস হাব। এসি, ফ্রিজ ও ওয়াশিং মেশিন মেরামতে মাত্র ৪৫-৬০ মিনিটে টেকনিশিয়ান।',
    path: '/locations',
    lang: 'bn'
  });
}

export default async function LocationsIndexPageBn() {
  const [locations, categories, brands, settings] = await Promise.all([
    getLocations(),
    getCategories(),
    getBrands(),
    getSiteSettings()
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'হোম', url: '/bn' },
    { name: 'সার্ভিস এরিয়া', url: '/bn/locations' }
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
        lang="bn"
      />
    </>
  );
}
