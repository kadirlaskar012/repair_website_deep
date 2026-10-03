import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CategoryPageView from '@/components/service/CategoryPageView';
import {
  getCategories,
  getCategoryBySlug,
  getProblemsByCategory,
  getBrands,
  getLocations,
  getSiteSettings
} from '@/lib/db';
import { initialCategoryFaqs, initialSearchKeywords } from '@/lib/seed-data';
import {
  buildPageMetadata,
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema
} from '@/lib/seo';

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({
    categorySlug: c.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return {};

  return buildPageMetadata({
    title: category.metaTitleBn || `${category.nameBn} - ডোরস্টেপ সার্ভিস ও মেরামত | নির্ভরযোগ্য সেবা`,
    description: category.metaDescBn || category.shortDescBn,
    path: `/${category.slug}`,
    lang: 'bn'
  });
}

export default async function BengaliCategoryPage({
  params
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const [categories, problems, brands, locations, settings] = await Promise.all([
    getCategories(),
    getProblemsByCategory(category.id),
    getBrands(category.id),
    getLocations(),
    getSiteSettings()
  ]);

  const rawFaqs = initialCategoryFaqs[category.id]?.bn || [
    {
      q: `সার্ভিস ও মেরামতের খরচ কীভাবে নির্ধারিত হয়?`,
      a: 'আমরা সম্পূর্ণ স্বচ্ছ ও সাশ্রয়ী খরচে বিশ্বাসী। ফোনে কথা বলে প্রাথমিক ধারণা নিন এবং টেকনিশিয়ান এসে পুঙ্খানুপুঙ্খ রোগ নির্ণয় করে কাজের আগেই সম্পূর্ণ কোটেশন জানিয়ে অনুমোদন নেন।'
    },
    {
      q: `আপনারা কি মেরামতের ওপর ওয়ারেন্টি দেন?`,
      a: 'হ্যাঁ, প্রতিটি সফল মেরামতে ৩০ দিনের সার্ভিস ওয়ারেন্টি এবং আসল যন্ত্রাংশের ওপর গ্যারান্টি প্রদান করা হয়।'
    }
  ];

  const serviceSchema = generateServiceSchema(category, 'bn', settings.phone);
  const faqSchema = generateFAQSchema(
    rawFaqs.map((f) => ({ question: f.q, questionBn: f.q, answer: f.a, answerBn: f.a })),
    'bn'
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'হোম', url: '/bn' },
    { name: category.nameBn, url: `/bn/${category.slug}` }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CategoryPageView
        category={category}
        categories={categories}
        problems={problems}
        brands={brands}
        locations={locations}
        settings={settings}
        keywords={initialSearchKeywords.filter((k) => k.categoryId === category.id)}
        faqs={rawFaqs}
        lang="bn"
      />
    </>
  );
}
