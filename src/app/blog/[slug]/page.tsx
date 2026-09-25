import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPostView from '@/components/blog/BlogPostView';
import {
  getBlogPosts,
  getBlogPostBySlug,
  getCategories,
  getBrands,
  getLocations,
  getSiteSettings
} from '@/lib/db';
import { initialSearchKeywords } from '@/lib/seed-data';
import {
  buildPageMetadata,
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema
} from '@/lib/seo';

export const revalidate = 1800;

export async function generateStaticParams() {
  const posts = await getBlogPosts(true);
  return posts.map((p) => ({
    slug: p.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return buildPageMetadata({
    title: post.metaTitle || `${post.title} | Appliance Seva`,
    description: post.metaDesc || post.excerpt,
    path: `/blog/${post.slug}`,
    lang: 'en',
    ogImage: post.featuredImageUrl || '/og-image.jpg'
  });
}

export default async function EnglishBlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  const [categories, brands, locations, settings] = await Promise.all([
    getCategories(),
    getBrands(),
    getLocations(),
    getSiteSettings()
  ]);

  const articleSchema = generateArticleSchema(post, 'en');
  const faqSchema = post.faqs && post.faqs.length > 0 ? generateFAQSchema(post.faqs, 'en') : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostView
        post={post}
        categories={categories}
        brands={brands}
        locations={locations}
        settings={settings}
        keywords={initialSearchKeywords}
        lang="en"
      />
    </>
  );
}
