import React from 'react';
import { Metadata } from 'next';
import TermsOfServiceView from '@/components/legal/TermsOfServiceView';
import { getCategories, getBrands, getLocations, getSiteSettings } from '@/lib/db';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: 'সেবার নিয়মাবলী ও শর্তাবলী | অ্যাপ্লায়েন্স সেবা',
    description: 'অ্যাপ্লায়েন্স সেবা এর সেবার নিয়মাবলী, ₹২৯৯ পরিদর্শন ফি ও ৩০ দিনের ওয়ারেন্টি নীতি।',
    path: '/terms-of-service',
    lang: 'bn'
  });
}

export default async function BengaliTermsOfServicePage() {
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
      lang="bn"
    />
  );
}
