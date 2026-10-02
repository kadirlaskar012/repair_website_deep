import { Metadata } from 'next';
import { Language, Category, BlogPost, FAQItem, SiteSettings } from './types';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.applianceseva.com').replace(/\/+$/, '');

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
  const rawPath = path.startsWith('/') ? path : `/${path}`;
  const strippedPath = rawPath.replace(/^\/bn(\/|$)/, '/');
  const cleanPath = strippedPath.startsWith('/') ? strippedPath : `/${strippedPath}`;
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
      siteName: 'Home Appliance Care India',
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
    name: 'Home Appliance Care India',
    legalName: 'Home Appliance Care India',
    alternateName: [
      'home Appliance Care India',
      'Home Appliance Care India',
      'Home appliance care india near me',
      'home appliance repair service',
      'Home appliance care india reviews',
      'Home appliance care india customer care number',
      'Home appliance care india Kolkata',
      'HomeApplianceCareIndia',
      'Appliance Seva'
    ],
    description: 'Home Appliance Care India: India and West Bengal’s trusted multi-brand doorstep home appliance repair and maintenance service network. Rated 4.9/5 by 1280+ verified customers. Certified engineers for AC, Refrigerator, Washing Machine, Microwave & TV.',
    url: SITE_URL,
    telephone: settings.phone,
    email: settings.email,
    priceRange: '₹₹',
    image: `${SITE_URL}/icon-512.png`,
    logo: `${SITE_URL}/logo.svg`,
    slogan: 'Home Appliance Care India | Doorstep Home Appliance Repair Service Near Me | 90-Min Response • 90-Day Warranty',
    hasMap: 'https://maps.app.goo.gl/ftLwKsuLEC5a3DZB9',
    sameAs: [
      'https://maps.app.goo.gl/ftLwKsuLEC5a3DZB9',
      'https://www.google.com/maps/place/Home+Appliance+Care+India/@22.5001566,88.3178919,12z/data=!4m7!3m6!1s0x3a027ba01cb2e381:0xb455147ce984c87e!8m2!3d22.5001566!4d88.3178919'
    ],
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
      latitude: '22.5001566',
      longitude: '88.3178919'
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
      { '@type': 'Country', name: 'India' },
      { '@type': 'AdministrativeArea', name: 'West Bengal' },
      { '@type': 'City', name: 'Kolkata' },
      { '@type': 'Place', name: 'Barrackpur', postalCode: '700120' },
      { '@type': 'Place', name: 'Behala', postalCode: '700034' },
      { '@type': 'Place', name: 'Barasat', postalCode: '700124' },
      { '@type': 'Place', name: 'Habra', postalCode: '743263' },
      { '@type': 'Place', name: 'Garia', postalCode: '700084' },
      { '@type': 'Place', name: 'New Town', postalCode: '700156' },
      { '@type': 'Place', name: 'Dumdum', postalCode: '700028' },
      { '@type': 'Place', name: 'Park Street', postalCode: '700016' },
      { '@type': 'Place', name: 'Howrah', postalCode: '711101' }
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

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Home Appliance Care India',
    alternateName: [
      'home Appliance Care India',
      'Home Appliance Care India Doorstep Service',
      'Home Appliance Care India Near Me'
    ],
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateBrandSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: 'Home Appliance Care India',
    alternateName: 'home Appliance Care India',
    description: 'Premier multi-brand doorstep home appliance repair and maintenance service network.',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    slogan: 'India’s Trusted Doorstep Home Appliance Repair & Care Network',
    sameAs: [
      'https://maps.app.goo.gl/ftLwKsuLEC5a3DZB9'
    ]
  };
}

export function generateSiteNavigationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Home Appliance Care India Navigation',
    itemListElement: [
      {
        '@type': 'SiteNavigationElement',
        position: 1,
        name: 'AC Repair & Servicing',
        description: 'Doorstep air conditioner inspection, jet cleaning, gas charging and PCB repair in Kolkata & West Bengal.',
        url: `${SITE_URL}/ac-repair`
      },
      {
        '@type': 'SiteNavigationElement',
        position: 2,
        name: 'Refrigerator Repair',
        description: 'Frost-free and inverter fridge repair, gas charging, defrost kit and compressor service.',
        url: `${SITE_URL}/fridge-repair`
      },
      {
        '@type': 'SiteNavigationElement',
        position: 3,
        name: 'Washing Machine Repair',
        description: 'Front load and top load washing machine repair, drain error, drum rotation and motor service.',
        url: `${SITE_URL}/washing-machine-repair`
      },
      {
        '@type': 'SiteNavigationElement',
        position: 4,
        name: 'Microwave Oven Repair',
        description: 'Convection and grill microwave heating, magnetron replacement and touch panel fixing.',
        url: `${SITE_URL}/microwave-repair`
      },
      {
        '@type': 'SiteNavigationElement',
        position: 5,
        name: 'Smart LED TV Repair',
        description: 'LED TV display backlight replacement, black screen sound ok, and motherboard repair.',
        url: `${SITE_URL}/led-tv-repair`
      },
      {
        '@type': 'SiteNavigationElement',
        position: 6,
        name: '1,280+ Customer Reviews',
        description: 'Verified 4.9★ ratings and customer testimonials across West Bengal.',
        url: `${SITE_URL}/reviews`
      },
      {
        '@type': 'SiteNavigationElement',
        position: 7,
        name: 'Track Booking Status',
        description: 'Real-time live technician dispatch and service booking tracking desk.',
        url: `${SITE_URL}/track`
      }
    ]
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
      name: 'Home Appliance Care India',
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
      name: post.author || 'Home Appliance Care India Technical Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Home Appliance Care India',
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
