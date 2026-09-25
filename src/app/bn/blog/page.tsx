import React from 'react';
import { Metadata } from 'next';
import BlogListView from '@/components/blog/BlogListView';
import {
  getBlogPosts,
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
    title: 'অ্যাপ্লায়েন্স মেরামত ও রক্ষণাবেক্ষণ ব্লগ | অ্যাপ্লায়েন্স সেবা',
    description: 'পশ্চিমবঙ্গের আবহাওয়ায় এসি, ফ্রিজ ও হোম অ্যাপ্লায়েন্সের যত্ন এবং সমস্যা সমাধানের সম্পূর্ণ নির্দেশিকা।',
    path: '/blog',
    lang: 'bn'
  });
}

export default async function BengaliBlogPage() {
  const [posts, categories, brands, locations, settings] = await Promise.all([
    getBlogPosts(true), // published only
    getCategories(),
    getBrands(),
    getLocations(),
    getSiteSettings()
  ]);

  return (
    <BlogListView
      posts={posts}
      categories={categories}
      brands={brands}
      locations={locations}
      settings={settings}
      keywords={initialSearchKeywords}
      lang="bn"
    />
  );
}
