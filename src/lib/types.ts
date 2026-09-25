export type Language = 'en' | 'bn';

export interface SiteSettings {
  id?: number;
  businessName: string;
  businessNameBn: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  addressBn: string;
  serviceArea: string;
  serviceAreaBn: string;
  workingHours: string;
  workingHoursBn: string;
  visitFee: number;
  currency: string;
  pricingDisclaimer: string;
  pricingDisclaimerBn: string;
  emergencyNotice: string;
  emergencyNoticeBn: string;
}

export interface Category {
  id: string; // e.g. 'ac-repair'
  slug: string; // 'ac-repair'
  name: string; // 'AC Repair'
  nameBn: string; // 'এসি মেরামত'
  shortDesc: string;
  shortDescBn: string;
  fullDesc: string;
  fullDescBn: string;
  iconName: string; // 'air-vent' | 'refrigerator' | 'washing-machine' | 'microwave' | 'tv'
  imageUrl?: string;
  sortOrder: number;
  isActive: boolean;
  metaTitle: string;
  metaTitleBn: string;
  metaDesc: string;
  metaDescBn: string;
}

export interface Problem {
  id: string;
  categoryId: string; // references Category.id
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  symptoms: string[];
  symptomsBn: string[];
  commonCauses: string;
  commonCausesBn: string;
  solutionNote: string;
  solutionNoteBn: string;
  diagnosticFeeNote: string;
  diagnosticFeeNoteBn: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl?: string; // If empty, renders clean text badge
  categoryIds: string[]; // List of category IDs supported
  sortOrder: number;
  isActive: boolean;
  isPopular?: boolean;
}

export interface LocationItem {
  id: string;
  name: string;
  nameBn: string;
  hashSlug: string; // e.g. 'kolkata', 'howrah'
  state: string; // 'West Bengal'
  stateBn: string; // 'পশ্চিমবঙ্গ'
  sortOrder: number;
  isActive: boolean;
}

export interface TrustItem {
  id: string;
  title: string;
  titleBn: string;
  subtitle: string;
  subtitleBn: string;
  iconName: string; // 'shield-check' | 'badge-percent' | 'clock-check'
  sortOrder: number;
}

export interface Review {
  id: string;
  customerName: string;
  location: string;
  serviceCategory: string;
  rating: number; // 1 - 5
  comment: string;
  commentBn: string;
  isVerified: boolean;
  isDemo: boolean;
  date: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Booking {
  id?: number;
  bookingId: string; // e.g. 'ACR-2026-9281'
  name: string;
  mobile: string;
  service: string;
  serviceName?: string;
  brand: string;
  problem: string;
  address: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // e.g. '09:00 AM - 12:00 PM'
  status: 'pending' | 'confirmed' | 'technician_assigned' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface FAQItem {
  question: string;
  questionBn: string;
  answer: string;
  answerBn: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  content: string; // Markdown or HTML
  contentBn: string;
  excerpt: string;
  excerptBn: string;
  featuredImageUrl?: string;
  category?: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDesc: string;
  ogTitle?: string;
  ogDesc?: string;
  faqs?: FAQItem[];
  status: 'draft' | 'published';
  author: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchKeywordItem {
  id: string;
  keyword: string;
  keywordBn: string;
  categoryId: string;
  problemId?: string;
  targetUrl: string;
}

export interface AISettings {
  provider: 'gemini' | 'openai';
  geminiApiKey: string;
  geminiModel: string;
  openaiApiKey: string;
  openaiModel: string;
}

export interface AdminUser {
  id: number;
  email: string;
  phone?: string;
  passwordHash: string;
  name: string;
  createdAt: string;
}

export interface MediaAsset {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  altText: string;
  createdAt: string;
}
