import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import LocationPageView from '@/components/location/LocationPageView';
import {
  getLocations,
  getLocationBySlug,
  getCategories,
  getBrands,
  getSiteSettings
} from '@/lib/db';
import {
  buildPageMetadata,
  generateFAQSchema,
  generateBreadcrumbSchema,
  SITE_URL
} from '@/lib/seo';

export const revalidate = 3600;

export async function generateStaticParams() {
  const locations = await getLocations();
  return locations.map((loc) => ({
    locationSlug: loc.hashSlug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locationSlug: string }>;
}): Promise<Metadata> {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  if (!location) return {};

  const title = `Doorstep AC & Appliance Repair in ${location.name}, Kolkata | 45-60 Min Response`;
  const description = `Certified doorstep repair for AC, Refrigerator, Washing Machine, Microwave & TV in ${location.name} (PIN: ${location.pincode || 'Kolkata'}). 45-60 min arrival, 100% genuine parts, transparent prices & 90-day warranty. Book now!`;

  return buildPageMetadata({
    title,
    description,
    path: `/locations/${location.hashSlug}`,
    lang: 'en'
  });
}

export default async function LocationPage({
  params
}: {
  params: Promise<{ locationSlug: string }>;
}) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);

  if (!location) {
    notFound();
  }

  const [locations, categories, brands, settings] = await Promise.all([
    getLocations(),
    getCategories(),
    getBrands(),
    getSiteSettings()
  ]);

  const rawFaqs = [
    {
      q: `How quickly can an appliance technician reach my doorstep in ${location.name}?`,
      a: `Through our dedicated ${location.name} service hub, our certified technician typically arrives within ${location.responseTime || '45 to 60 minutes'} of booking confirmation.`
    },
    {
      q: `Which appliances do you repair in ${location.name} (PIN: ${location.pincode})?`,
      a: `We provide complete doorstep repair and maintenance for Air Conditioners (Split, Window, Inverter), Frost-Free & Direct-Cool Refrigerators, Front-Load & Top-Load Washing Machines, Convection Microwave Ovens, and Smart LED TVs across ${location.name}.`
    },
    {
      q: `Do you provide a service warranty on repairs completed in ${location.name}?`,
      a: `Yes, every completed repair is backed by our official written 30-day to 90-day workmanship warranty, plus manufacturer warranty on all new genuine replacement parts.`
    },
    {
      q: `How are diagnostic and repair charges calculated in ${location.name}?`,
      a: `We maintain 100% transparent pricing. Our technician performs a multi-point on-site electrical diagnosis and gives you an upfront written estimate before starting work. If you proceed with the repair, the diagnostic fee is adjusted against the final bill.`
    }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' },
    { name: location.name, url: `/locations/${location.hashSlug}` }
  ]);

  const faqSchema = generateFAQSchema(
    rawFaqs.map((f) => ({ question: f.q, questionBn: f.q, answer: f.a, answerBn: f.a })),
    'en'
  );

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `Appliance Seva - ${location.name} Service Hub`,
    url: `${SITE_URL}/locations/${location.hashSlug}`,
    telephone: settings.phone,
    email: settings.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address || `${location.name}, Kolkata`,
      addressLocality: location.name,
      addressRegion: 'West Bengal',
      postalCode: location.pincode || '700001',
      addressCountry: 'IN'
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${location.name}, West Bengal`
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1280',
      bestRating: '5',
      worstRating: '1'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <LocationPageView
        location={location}
        locations={locations}
        categories={categories}
        brands={brands}
        settings={settings}
        faqs={rawFaqs}
        lang="en"
      />
    </>
  );
}
