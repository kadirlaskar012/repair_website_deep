import { Metadata } from 'next';
import { Language, Category, BlogPost, FAQItem, SiteSettings } from './types';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://applianceseva.com';

export function buildPageMetadata({
  title,
  description,
  path = '',
  lang = 'en',
  ogImage = '/og-image.jpg',
  noIndex = false,
  keywords
}: {
  title: string;
  description: string;
  path?: string;
  lang?: Language;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string | string[];
}): Metadata {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const enUrl = `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;
  const bnUrl = `${SITE_URL}/bn${cleanPath === '/' ? '' : cleanPath}`;
  const canonicalUrl = lang === 'bn' ? bnUrl : enUrl;

  return {
    title,
    description,
    keywords,
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
      siteName: 'Appliance Seva',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1280',
      bestRating: '5',
      worstRating: '1'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: settings.phone,
      email: settings.email,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Bengali', 'Hindi']
    },
    knowsAbout: [
      'Air Conditioner Repair and Jet Servicing',
      'Split AC Installation and Gas Refilling',
      'Inverter AC PCB Board Repair',
      'Double Door and Single Door Refrigerator Repair',
      'Fridge Cooling Restoration and Gas Charging',
      'Front Load and Top Load Washing Machine Repair',
      'Washing Machine Drum and Motor Replacement',
      'Microwave Oven Heating and Magnetron Repair',
      'LED TV Display Panel and Motherboard Repair'
    ],
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
      { '@type': 'City', name: 'Hooghly' },
      { '@type': 'City', name: 'Barasat' }
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
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Washing Machine Repair',
            description: 'Front load and top load washer repair, drain error, drum rotation and spin fix.'
          },
          price: '299',
          priceCurrency: 'INR'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Microwave Oven Repair',
            description: 'Microwave heating issue, spark in cavity, touch keypad and turntable repair.'
          },
          price: '299',
          priceCurrency: 'INR'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Smart LED TV Repair',
            description: 'LED TV display backlight replacement, black screen sound ok, and motherboard service.'
          },
          price: '299',
          priceCurrency: 'INR'
        }
      ]
    }
  };
}

export function generateServiceSchema(category: Category, lang: Language, phone?: string) {
  const isBn = lang === 'bn';
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: isBn ? category.nameBn : category.name,
    name: isBn ? category.nameBn : category.name,
    description: isBn ? category.fullDescBn : category.fullDesc,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Appliance Seva',
      telephone: phone || '+91 6291674186',
      url: SITE_URL,
      priceRange: '₹299'
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'West Bengal'
    },
    offers: {
      '@type': 'Offer',
      price: '299',
      priceCurrency: 'INR',
      description: 'Standard doorstep inspection and diagnostic assessment fee'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '520',
      bestRating: '5',
      worstRating: '1'
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
  const imageUrl = post.featuredImageUrl
    ? post.featuredImageUrl.startsWith('http')
      ? post.featuredImageUrl
      : `${SITE_URL}${post.featuredImageUrl}`
    : `${SITE_URL}/og-image.jpg`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isBn ? post.titleBn : post.title,
    description: isBn ? post.excerptBn : post.excerpt,
    url: postUrl,
    image: imageUrl,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: {
      '@type': 'Person',
      name: post.author || 'Appliance Seva Technical Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Appliance Seva',
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
