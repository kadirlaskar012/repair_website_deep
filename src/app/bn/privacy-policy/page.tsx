import React from 'react';
import { Metadata } from 'next';
import PrivacyPolicyView from '@/components/legal/PrivacyPolicyView';
import { getCategories, getBrands, getLocations, getSiteSettings } from '@/lib/db';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: 'গোপনীয়তা নীতি | অ্যাপ্লায়েন্স সেবা',
    description: 'অ্যাপ্লায়েন্স সেবা এর গোপনীয়তা নীতি ও গ্রাহক তথ্য সুরক্ষার মানদণ্ড।',
    path: '/privacy-policy',
    lang: 'bn'
  });
}

export default async function BengaliPrivacyPolicyPage() {
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
      lang="bn"
    />
  );
}
