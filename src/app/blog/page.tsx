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
    title: 'Appliance Repair Blog & Troubleshooting Guides | Appliance Seva',
    description: 'Expert maintenance guides, troubleshooting tips, and appliance advice for homes across West Bengal by Appliance Seva.',
    path: '/blog',
    lang: 'en'
  });
}

export default async function EnglishBlogPage() {
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
      lang="en"
    />
  );
}
