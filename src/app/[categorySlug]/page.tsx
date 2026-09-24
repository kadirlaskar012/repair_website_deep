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
    title: category.metaTitle || `${category.name} in West Bengal | ₹299 Doorstep Diagnosis`,
    description: category.metaDesc || category.shortDesc,
    path: `/${category.slug}`,
    lang: 'en'
  });
}

export default async function CategoryPage({
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

  const rawFaqs = initialCategoryFaqs[category.id]?.en || [
    {
      q: `What does the ₹299 inspection fee for ${category.name} include?`,
      a: 'The ₹299 fee covers on-site multi-point diagnostics by a certified technician. Any repair work or parts replacement is quoted upfront and done only after your approval.'
    },
    {
      q: `Do you provide a service warranty on ${category.name}?`,
      a: 'Yes, we provide a 30-day workmanship warranty on all completed repairs, along with manufacturer warranty on genuine spare parts.'
    }
  ];

  const serviceSchema = generateServiceSchema(category, 'en');
  const faqSchema = generateFAQSchema(
    rawFaqs.map((f) => ({ question: f.q, questionBn: f.q, answer: f.a, answerBn: f.a })),
    'en'
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: category.name, url: `/${category.slug}` }
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
        lang="en"
      />
    </>
  );
}
