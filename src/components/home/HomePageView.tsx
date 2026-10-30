'use client';

import React from 'react';
import OfficialLandingPage from './OfficialLandingPage';
import {
  Category,
  Problem,
  Brand,
  LocationItem,
  TrustItem,
  Review,
  SiteSettings,
  SearchKeywordItem,
  Language
} from '@/lib/types';

interface HomePageViewProps {
  categories: Category[];
  problems: Problem[];
  brands: Brand[];
  locations: LocationItem[];
  trustItems: TrustItem[];
  reviews: Review[];
  settings: SiteSettings;
  keywords: SearchKeywordItem[];
  lang: Language;
}

export default function HomePageView({
  categories,
  brands,
  locations,
  reviews,
  settings,
  lang
}: HomePageViewProps) {
  return (
    <OfficialLandingPage
      categories={categories}
      brands={brands}
      locations={locations}
      settings={settings}
      reviews={reviews}
      lang={lang}
    />
  );
}
