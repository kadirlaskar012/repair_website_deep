import { Metadata } from 'next';
import { Language, Category, BlogPost, FAQItem, SiteSettings } from './types';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://acrepairservice.com';

export function buildPageMetadata({
  title,
  description,
  path = '',
  lang = 'en',
  ogImage = '/og-image.jpg',
  noIndex = false
}: {
  title: string;
  description: string;
  path?: string;
  lang?: Language;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const enUrl = `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;
  const bnUrl = `${SITE_URL}/bn${cleanPath === '/' ? '' : cleanPath}`;
  const canonicalUrl = lang === 'bn' ? bnUrl : enUrl;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': enUrl,
        'bn': bnUrl,
        'x-default': enUrl
      }
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'AC Repair Service',
      locale: lang === 'bn' ? 'bn_IN' : 'en_IN',
      type: 'website',
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`]
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
          }
        }
  };
}

export function generateLocalBusinessSchema(settings: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: settings.businessName,
    url: SITE_URL,
    telephone: settings.phone,
    email: settings.email,
    priceRange: '₹₹',
    image: `${SITE_URL}/icon-512.png`,
    logo: `${SITE_URL}/logo.svg`,
    slogan: 'Doorstep AC & Appliance Repair in West Bengal | 90-Min Response • 90-Day Warranty',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Salt Lake Sector V',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      postalCode: '700091',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '22.5804',
      longitude: '88.4378'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '08:00',
        closes: '21:00'
      }
    ],
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'West Bengal' },
      { '@type': 'City', name: 'Kolkata' },
      { '@type': 'City', name: 'Howrah' },
      { '@type': 'City', name: 'Durgapur' },
      { '@type': 'City', name: 'Siliguri' },
      { '@type': 'City', name: 'Asansol' }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Doorstep Appliance Repair Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AC Repair & Diagnosis',
            description: 'Doorstep air conditioner inspection, gas refill and cooling repair.'
          },
          price: '299',
          priceCurrency: 'INR'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Refrigerator Repair',
            description: 'Doorstep fridge repair, defrost problem and compressor inspection.'
          },
          price: '299',
          priceCurrency: 'INR'
        }
      ]
    }
  };
}

export function generateServiceSchema(category: Category, lang: Language) {
  const isBn = lang === 'bn';
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: isBn ? category.nameBn : category.name,
    name: isBn ? category.nameBn : category.name,
    description: isBn ? category.fullDescBn : category.fullDesc,
    provider: {
      '@type': 'LocalBusiness',
      name: 'AC Repair Service',
      url: SITE_URL
    },
    areaServed: {
      '@type': 'State',
      name: 'West Bengal'
    },
    offers: {
      '@type': 'Offer',
      price: '299',
      priceCurrency: 'INR',
      description: 'Standard doorstep inspection and diagnostic assessment fee'
    }
  };
}

export function generateFAQSchema(faqs: FAQItem[], lang: Language) {
  const isBn = lang === 'bn';
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: isBn ? f.questionBn : f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isBn ? f.answerBn : f.answer
      }
    }))
  };
}

export function generateArticleSchema(post: BlogPost, lang: Language) {
  const isBn = lang === 'bn';
  const postUrl = `${SITE_URL}${isBn ? '/bn' : ''}/blog/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isBn ? post.titleBn : post.title,
    description: isBn ? post.excerptBn : post.excerpt,
    url: postUrl,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: {
      '@type': 'Person',
      name: post.author || 'AC Repair Service Technical Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'AC Repair Service',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl
    }
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}
