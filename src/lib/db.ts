import mysql, { Pool } from 'mysql2/promise';
import {
  SiteSettings,
  Category,
  Problem,
  Brand,
  LocationItem,
  TrustItem,
  Review,
  Booking,
  BlogPost,
  AISettings,
  MediaAsset,
  AdminUser
} from './types';
import {
  initialSiteSettings,
  initialCategories,
  initialProblems,
  initialBrands,
  initialLocations,
  initialTrustItems,
  initialReviews,
  initialBlogPosts
} from './seed-data';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {
    // Ignore in read-only environments
  }
}

function loadPersistedBookings(): Booking[] {
  try {
    ensureDataDir();
    if (fs.existsSync(BOOKINGS_FILE)) {
      const content = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Could not read persisted bookings file:', e);
  }
  return [];
}

function savePersistedBookings(bookings: Booking[]) {
  try {
    ensureDataDir();
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Could not write persisted bookings file:', e);
  }
}

function loadPersistedReviews(): Review[] {
  try {
    ensureDataDir();
    if (fs.existsSync(REVIEWS_FILE)) {
      const content = fs.readFileSync(REVIEWS_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } else {
      // First-time initialization
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify(initialReviews, null, 2), 'utf-8');
    }
  } catch (e) {
    console.warn('Could not read persisted reviews file:', e);
  }
  return [...initialReviews];
}

function savePersistedReviews(reviews: Review[]) {
  try {
    ensureDataDir();
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Could not write persisted reviews file:', e);
  }
}

// In-memory runtime state (used as fast fallback & during build if MySQL not connected)
const inMemory = {
  settings: { ...initialSiteSettings },
  categories: [...initialCategories],
  problems: [...initialProblems],
  brands: [...initialBrands],
  locations: [...initialLocations],
  trustItems: [...initialTrustItems],
  reviews: loadPersistedReviews() as Review[],
  blogPosts: [...initialBlogPosts],
  bookings: loadPersistedBookings() as Booking[],
  media: [] as MediaAsset[],
  aiSettings: {
    provider: 'gemini' as const,
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    geminiModel: 'gemini-1.5-flash',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    openaiModel: 'gpt-4o-mini'
  } as AISettings,
  admins: [
    {
      id: 1,
      email: process.env.ADMIN_EMAIL || 'applianceseva@gmail.com',
      phone: process.env.ADMIN_PHONE || '6291674186',
      passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || '6291674186', 10),
      name: 'Super Admin',
      createdAt: new Date().toISOString()
    }
  ] as AdminUser[]
};

let pool: Pool | null = null;
let isConnected = false;
let isInitialized = false;

export function getDbPool(): Pool | null {
  if (pool) return pool;

  const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;

  // 1. Connection via standard DATABASE_URL string (common in Vercel & cloud providers like TiDB, Aiven, PlanetScale)
  if (databaseUrl) {
    try {
      const isSslNeeded = process.env.DB_SSL === 'true' || databaseUrl.includes('ssl') || !databaseUrl.includes('localhost');
      pool = mysql.createPool({
        uri: databaseUrl,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        ssl: isSslNeeded ? { rejectUnauthorized: false } : undefined
      });
      return pool;
    } catch (err) {
      console.warn('MySQL pool creation via DATABASE_URL failed, falling back:', err);
    }
  }

  // 2. Connection via individual environment variables
  const dbHost = process.env.DB_HOST || process.env.MYSQL_HOST;
  const dbUser = process.env.DB_USER || process.env.MYSQL_USER;
  const dbPassword = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD;
  const dbName = process.env.DB_NAME || process.env.MYSQL_DATABASE;
  const dbPort = parseInt(process.env.DB_PORT || process.env.MYSQL_PORT || '3306', 10);
  const dbSsl = process.env.DB_SSL === 'true' || (dbHost && dbHost !== 'localhost' && !dbHost.startsWith('127.'));

  if (!dbHost || !dbUser || !dbName) {
    return null;
  }

  try {
    pool = mysql.createPool({
      host: dbHost,
      user: dbUser,
      password: dbPassword || '',
      database: dbName,
      port: dbPort,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      ssl: dbSsl ? { rejectUnauthorized: false } : undefined
    });
    return pool;
  } catch (err) {
    console.warn('MySQL connection pool creation failed, using fallback store:', err);
    return null;
  }
}

export async function initDatabase(): Promise<boolean> {
  if (isInitialized) return isConnected;
  const p = getDbPool();
  if (!p) {
    isInitialized = true;
    isConnected = false;
    return false;
  }

  try {
    const connection = await p.getConnection();
    try {
      // Create tables if not exist
      await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(191) NOT NULL UNIQUE,
          password_hash VARCHAR(255) NOT NULL,
          name VARCHAR(100) NOT NULL,
          role VARCHAR(50) DEFAULT 'admin',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      await connection.query(`
        CREATE TABLE IF NOT EXISTS site_settings (
          id INT PRIMARY KEY DEFAULT 1,
          business_name VARCHAR(255) NOT NULL,
          business_name_bn VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          whatsapp VARCHAR(50) NOT NULL,
          email VARCHAR(191) NOT NULL,
          address TEXT NOT NULL,
          address_bn TEXT NOT NULL,
          service_area TEXT NOT NULL,
          service_area_bn TEXT NOT NULL,
          working_hours VARCHAR(100) NOT NULL,
          working_hours_bn VARCHAR(100) NOT NULL,
          visit_fee INT NOT NULL DEFAULT 299,
          currency VARCHAR(10) NOT NULL DEFAULT '₹',
          pricing_disclaimer TEXT NOT NULL,
          pricing_disclaimer_bn TEXT NOT NULL,
          emergency_notice TEXT,
          emergency_notice_bn TEXT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      await connection.query(`
        CREATE TABLE IF NOT EXISTS bookings (
          id INT AUTO_INCREMENT PRIMARY KEY,
          booking_id VARCHAR(50) NOT NULL UNIQUE,
          name VARCHAR(150) NOT NULL,
          mobile VARCHAR(25) NOT NULL,
          service VARCHAR(100) NOT NULL,
          service_name VARCHAR(150),
          brand VARCHAR(100) NOT NULL,
          problem TEXT NOT NULL,
          address TEXT NOT NULL,
          preferred_date VARCHAR(20) NOT NULL,
          preferred_time VARCHAR(50) NOT NULL,
          status VARCHAR(50) NOT NULL DEFAULT 'pending',
          notes TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_booking_id (booking_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      await connection.query(`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id VARCHAR(100) PRIMARY KEY,
          slug VARCHAR(191) NOT NULL UNIQUE,
          title VARCHAR(255) NOT NULL,
          title_bn VARCHAR(255) NOT NULL,
          content LONGTEXT NOT NULL,
          content_bn LONGTEXT NOT NULL,
          excerpt TEXT,
          excerpt_bn TEXT,
          featured_image_url VARCHAR(255),
          category VARCHAR(100),
          focus_keyword VARCHAR(255),
          secondary_keywords_json JSON,
          meta_title VARCHAR(255),
          meta_desc TEXT,
          og_title VARCHAR(255),
          og_desc TEXT,
          faqs_json JSON,
          status VARCHAR(20) NOT NULL DEFAULT 'draft',
          author VARCHAR(100) DEFAULT 'Service Team',
          published_at VARCHAR(50),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_slug (slug)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      isConnected = true;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.warn('MySQL init failed, continuing with in-memory store:', err);
    isConnected = false;
  }
  isInitialized = true;
  return isConnected;
}

// ------------------- Data Access Methods ------------------- //

export async function getSiteSettings(): Promise<SiteSettings> {
  const p = getDbPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>('SELECT * FROM site_settings WHERE id = 1');
      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          businessName: r.business_name,
          businessNameBn: r.business_name_bn,
          phone: r.phone,
          whatsapp: r.whatsapp,
          email: r.email,
          address: r.address,
          addressBn: r.address_bn,
          serviceArea: r.service_area,
          serviceAreaBn: r.service_area_bn,
          workingHours: r.working_hours,
          workingHoursBn: r.working_hours_bn,
          visitFee: r.visit_fee,
          currency: r.currency,
          pricingDisclaimer: r.pricing_disclaimer,
          pricingDisclaimerBn: r.pricing_disclaimer_bn,
          emergencyNotice: r.emergency_notice,
          emergencyNoticeBn: r.emergency_notice_bn
        };
      }
    } catch (e) {
      // Fallback
    }
  }
  return inMemory.settings;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  inMemory.settings = { ...inMemory.settings, ...settings };
  const p = getDbPool();
  if (p) {
    try {
      await p.query(
        `INSERT INTO site_settings (
          id, business_name, business_name_bn, phone, whatsapp, email, address, address_bn,
          service_area, service_area_bn, working_hours, working_hours_bn, visit_fee, currency,
          pricing_disclaimer, pricing_disclaimer_bn, emergency_notice, emergency_notice_bn
        ) VALUES (
          1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        ) ON DUPLICATE KEY UPDATE
          business_name = VALUES(business_name),
          business_name_bn = VALUES(business_name_bn),
          phone = VALUES(phone),
          whatsapp = VALUES(whatsapp),
          email = VALUES(email),
          address = VALUES(address),
          address_bn = VALUES(address_bn),
          service_area = VALUES(service_area),
          service_area_bn = VALUES(service_area_bn),
          working_hours = VALUES(working_hours),
          working_hours_bn = VALUES(working_hours_bn),
          visit_fee = VALUES(visit_fee),
          currency = VALUES(currency),
          pricing_disclaimer = VALUES(pricing_disclaimer),
          pricing_disclaimer_bn = VALUES(pricing_disclaimer_bn),
          emergency_notice = VALUES(emergency_notice),
          emergency_notice_bn = VALUES(emergency_notice_bn)`,
        [
          inMemory.settings.businessName,
          inMemory.settings.businessNameBn,
          inMemory.settings.phone,
          inMemory.settings.whatsapp,
          inMemory.settings.email,
          inMemory.settings.address,
          inMemory.settings.addressBn,
          inMemory.settings.serviceArea,
          inMemory.settings.serviceAreaBn,
          inMemory.settings.workingHours,
          inMemory.settings.workingHoursBn,
          inMemory.settings.visitFee,
          inMemory.settings.currency,
          inMemory.settings.pricingDisclaimer,
          inMemory.settings.pricingDisclaimerBn,
          inMemory.settings.emergencyNotice,
          inMemory.settings.emergencyNoticeBn
        ]
      );
    } catch (err) {
      console.warn('MySQL update settings failed:', err);
    }
  }
  return inMemory.settings;
}

export async function getCategories(): Promise<Category[]> {
  return inMemory.categories.filter((c) => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAllCategoriesAdmin(): Promise<Category[]> {
  return inMemory.categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const cat = inMemory.categories.find((c) => c.slug === slug || c.id === slug);
  return cat || null;
}

export async function updateCategory(category: Category): Promise<Category> {
  const idx = inMemory.categories.findIndex((c) => c.id === category.id);
  if (idx >= 0) {
    inMemory.categories[idx] = category;
  } else {
    inMemory.categories.push(category);
  }
  return category;
}

export async function getProblemsByCategory(categoryId: string): Promise<Problem[]> {
  return inMemory.problems
    .filter((p) => p.categoryId === categoryId && p.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAllProblemsAdmin(): Promise<Problem[]> {
  return inMemory.problems;
}

export async function getProblems(): Promise<Problem[]> {
  return inMemory.problems.filter((p) => p.isActive);
}

export async function getProblemById(id: string): Promise<Problem | null> {
  return inMemory.problems.find((p) => p.id === id) || null;
}

export async function saveProblem(problem: Problem): Promise<Problem> {
  const idx = inMemory.problems.findIndex((p) => p.id === problem.id);
  if (idx >= 0) {
    inMemory.problems[idx] = problem;
  } else {
    inMemory.problems.push(problem);
  }
  return problem;
}

export async function deleteProblem(id: string): Promise<boolean> {
  inMemory.problems = inMemory.problems.filter((p) => p.id !== id);
  return true;
}

export async function getBrands(categoryId?: string): Promise<Brand[]> {
  let list = inMemory.brands.filter((b) => b.isActive).map((b) => ({
    ...b,
    logoUrl: b.logoUrl || `/images/brands/${b.id}.svg`
  }));
  if (categoryId) {
    list = list.filter((b) => b.categoryIds.includes(categoryId));
  }
  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAllBrandsAdmin(): Promise<Brand[]> {
  return inMemory.brands.map((b) => ({
    ...b,
    logoUrl: b.logoUrl || `/images/brands/${b.id}.svg`
  }));
}

export async function saveBrand(brand: Brand): Promise<Brand> {
  const idx = inMemory.brands.findIndex((b) => b.id === brand.id);
  if (idx >= 0) {
    inMemory.brands[idx] = brand;
  } else {
    inMemory.brands.push(brand);
  }
  return brand;
}

export async function deleteBrand(id: string): Promise<boolean> {
  inMemory.brands = inMemory.brands.filter((b) => b.id !== id);
  return true;
}

export async function getLocations(): Promise<LocationItem[]> {
  return inMemory.locations.filter((l) => l.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAllLocationsAdmin(): Promise<LocationItem[]> {
  return inMemory.locations;
}

export async function saveLocation(loc: LocationItem): Promise<LocationItem> {
  const idx = inMemory.locations.findIndex((l) => l.id === loc.id);
  if (idx >= 0) {
    inMemory.locations[idx] = loc;
  } else {
    inMemory.locations.push(loc);
  }
  return loc;
}

export async function deleteLocation(id: string): Promise<boolean> {
  inMemory.locations = inMemory.locations.filter((l) => l.id !== id);
  return true;
}

export async function getTrustItems(): Promise<TrustItem[]> {
  return inMemory.trustItems.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function saveTrustItem(item: TrustItem): Promise<TrustItem> {
  const idx = inMemory.trustItems.findIndex((t) => t.id === item.id);
  if (idx >= 0) {
    inMemory.trustItems[idx] = item;
  } else {
    inMemory.trustItems.push(item);
  }
  return item;
}

export async function getReviews(): Promise<Review[]> {
  return inMemory.reviews.filter((r) => r.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAllReviewsAdmin(): Promise<Review[]> {
  return inMemory.reviews;
}

export async function saveReview(review: Review): Promise<Review> {
  const idx = inMemory.reviews.findIndex((r) => r.id === review.id);
  if (idx >= 0) {
    inMemory.reviews[idx] = review;
  } else {
    inMemory.reviews.push(review);
  }
  savePersistedReviews(inMemory.reviews);
  return review;
}

export async function deleteReview(id: string): Promise<boolean> {
  inMemory.reviews = inMemory.reviews.filter((r) => r.id !== id);
  savePersistedReviews(inMemory.reviews);
  return true;
}

export async function createCustomerReview(data: {
  customerName: string;
  location: string;
  serviceCategory: string;
  rating: number;
  comment: string;
  mobile?: string;
}): Promise<Review> {
  const id = `rev-${Date.now()}`;
  const nowStr = new Date().toISOString().split('T')[0];
  const newReview: Review = {
    id,
    customerName: data.customerName.trim(),
    location: data.location.trim(),
    serviceCategory: data.serviceCategory,
    rating: Math.min(5, Math.max(1, data.rating)),
    comment: data.comment.trim(),
    commentBn: data.comment.trim(),
    isVerified: true,
    isDemo: false,
    date: nowStr,
    isActive: true,
    sortOrder: 0
  };

  inMemory.reviews.unshift(newReview);
  savePersistedReviews(inMemory.reviews);
  return newReview;
}

export async function createBooking(data: Omit<Booking, 'bookingId' | 'createdAt' | 'status'>): Promise<Booking> {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
  const bookingId = `AS-${yearMonth}-${randomSuffix}`;

  const newBooking: Booking = {
    ...data,
    bookingId,
    status: 'pending',
    createdAt: now.toISOString()
  };

  inMemory.bookings.unshift(newBooking);
  savePersistedBookings(inMemory.bookings);

  const p = getDbPool();
  if (p) {
    try {
      await p.query(
        `INSERT INTO bookings (
          booking_id, name, mobile, service, service_name, brand, problem,
          address, preferred_date, preferred_time, status, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newBooking.bookingId,
          newBooking.name,
          newBooking.mobile,
          newBooking.service,
          newBooking.serviceName || newBooking.service,
          newBooking.brand,
          newBooking.problem,
          newBooking.address,
          newBooking.preferredDate,
          newBooking.preferredTime,
          newBooking.status,
          newBooking.notes || ''
        ]
      );
    } catch (err) {
      console.warn('MySQL insert booking failed, stored in memory:', err);
    }
  }

  return newBooking;
}

export async function getBookings(): Promise<Booking[]> {
  const p = getDbPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>('SELECT * FROM bookings ORDER BY created_at DESC LIMIT 500');
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          bookingId: r.booking_id,
          name: r.name,
          mobile: r.mobile,
          service: r.service,
          serviceName: r.service_name,
          brand: r.brand,
          problem: r.problem,
          address: r.address,
          preferredDate: r.preferred_date,
          preferredTime: r.preferred_time,
          status: r.status,
          notes: r.notes,
          createdAt: r.created_at
        }));
      }
    } catch (e) {
      // Fallback
    }
  }
  if (inMemory.bookings.length === 0) {
    inMemory.bookings = loadPersistedBookings();
  }
  return inMemory.bookings;
}

export async function getBookingById(bookingId: string): Promise<Booking | null> {
  const p = getDbPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>('SELECT * FROM bookings WHERE booking_id = ? LIMIT 1', [bookingId]);
      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          bookingId: r.booking_id,
          name: r.name,
          mobile: r.mobile,
          service: r.service,
          serviceName: r.service_name,
          brand: r.brand,
          problem: r.problem,
          address: r.address,
          preferredDate: r.preferred_date,
          preferredTime: r.preferred_time,
          status: r.status,
          notes: r.notes,
          createdAt: r.created_at
        };
      }
    } catch (e) {
      // Fallback
    }
  }
  return inMemory.bookings.find((b) => b.bookingId === bookingId) || null;
}

export async function updateBookingStatus(bookingId: string, status: Booking['status']): Promise<boolean> {
  const b = inMemory.bookings.find((item) => item.bookingId === bookingId);
  if (b) b.status = status;
  savePersistedBookings(inMemory.bookings);
  const p = getDbPool();
  if (p) {
    try {
      await p.query('UPDATE bookings SET status = ? WHERE booking_id = ?', [status, bookingId]);
    } catch (e) {
      // Ignore
    }
  }
  return true;
}

export async function deleteBooking(bookingId: string): Promise<boolean> {
  inMemory.bookings = inMemory.bookings.filter((item) => item.bookingId !== bookingId);
  savePersistedBookings(inMemory.bookings);
  const p = getDbPool();
  if (p) {
    try {
      await p.query('DELETE FROM bookings WHERE booking_id = ?', [bookingId]);
    } catch (e) {
      // Ignore
    }
  }
  return true;
}

export async function getBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
  const p = getDbPool();
  if (p) {
    try {
      const query = publishedOnly
        ? "SELECT * FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC"
        : 'SELECT * FROM blog_posts ORDER BY created_at DESC';
      const [rows] = await p.query<any[]>(query);
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          titleBn: r.title_bn,
          content: r.content,
          contentBn: r.content_bn,
          excerpt: r.excerpt,
          excerptBn: r.excerpt_bn,
          featuredImageUrl: r.featured_image_url,
          category: r.category,
          focusKeyword: r.focus_keyword,
          secondaryKeywords: typeof r.secondary_keywords_json === 'string' ? JSON.parse(r.secondary_keywords_json) : r.secondary_keywords_json || [],
          metaTitle: r.meta_title,
          metaDesc: r.meta_desc,
          ogTitle: r.og_title,
          ogDesc: r.og_desc,
          faqs: typeof r.faqs_json === 'string' ? JSON.parse(r.faqs_json) : r.faqs_json || [],
          status: r.status,
          author: r.author,
          publishedAt: r.published_at,
          createdAt: r.created_at,
          updatedAt: r.updated_at
        }));
      }
    } catch (e) {
      // Fallback
    }
  }

  if (publishedOnly) {
    return inMemory.blogPosts.filter((b) => b.status === 'published');
  }
  return inMemory.blogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const p = getDbPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>('SELECT * FROM blog_posts WHERE slug = ? LIMIT 1', [slug]);
      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          slug: r.slug,
          title: r.title,
          titleBn: r.title_bn,
          content: r.content,
          contentBn: r.content_bn,
          excerpt: r.excerpt,
          excerptBn: r.excerpt_bn,
          featuredImageUrl: r.featured_image_url,
          category: r.category,
          focusKeyword: r.focus_keyword,
          secondaryKeywords: typeof r.secondary_keywords_json === 'string' ? JSON.parse(r.secondary_keywords_json) : r.secondary_keywords_json || [],
          metaTitle: r.meta_title,
          metaDesc: r.meta_desc,
          ogTitle: r.og_title,
          ogDesc: r.og_desc,
          faqs: typeof r.faqs_json === 'string' ? JSON.parse(r.faqs_json) : r.faqs_json || [],
          status: r.status,
          author: r.author,
          publishedAt: r.published_at,
          createdAt: r.created_at,
          updatedAt: r.updated_at
        };
      }
    } catch (e) {
      // Fallback
    }
  }
  return inMemory.blogPosts.find((p) => p.slug === slug) || null;
}

export async function saveBlogPost(post: BlogPost): Promise<BlogPost> {
  const idx = inMemory.blogPosts.findIndex((b) => b.id === post.id);
  if (idx >= 0) {
    inMemory.blogPosts[idx] = post;
  } else {
    inMemory.blogPosts.unshift(post);
  }

  const p = getDbPool();
  if (p) {
    try {
      await p.query(
        `INSERT INTO blog_posts (
          id, slug, title, title_bn, content, content_bn, excerpt, excerpt_bn,
          featured_image_url, category, focus_keyword, secondary_keywords_json,
          meta_title, meta_desc, og_title, og_desc, faqs_json, status, author, published_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        ) ON DUPLICATE KEY UPDATE
          slug = VALUES(slug),
          title = VALUES(title),
          title_bn = VALUES(title_bn),
          content = VALUES(content),
          content_bn = VALUES(content_bn),
          excerpt = VALUES(excerpt),
          excerpt_bn = VALUES(excerpt_bn),
          featured_image_url = VALUES(featured_image_url),
          category = VALUES(category),
          focus_keyword = VALUES(focus_keyword),
          secondary_keywords_json = VALUES(secondary_keywords_json),
          meta_title = VALUES(meta_title),
          meta_desc = VALUES(meta_desc),
          og_title = VALUES(og_title),
          og_desc = VALUES(og_desc),
          faqs_json = VALUES(faqs_json),
          status = VALUES(status),
          author = VALUES(author),
          published_at = VALUES(published_at)`,
        [
          post.id,
          post.slug,
          post.title,
          post.titleBn,
          post.content,
          post.contentBn,
          post.excerpt,
          post.excerptBn,
          post.featuredImageUrl || null,
          post.category || null,
          post.focusKeyword,
          JSON.stringify(post.secondaryKeywords || []),
          post.metaTitle,
          post.metaDesc,
          post.ogTitle || null,
          post.ogDesc || null,
          JSON.stringify(post.faqs || []),
          post.status,
          post.author,
          post.publishedAt || null
        ]
      );
    } catch (err) {
      console.warn('MySQL save blog post error:', err);
    }
  }

  return post;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  inMemory.blogPosts = inMemory.blogPosts.filter((b) => b.id !== id);
  const p = getDbPool();
  if (p) {
    try {
      await p.query('DELETE FROM blog_posts WHERE id = ?', [id]);
    } catch (e) {
      // Ignore
    }
  }
  return true;
}

export async function getAISettings(): Promise<AISettings> {
  return inMemory.aiSettings;
}

export async function updateAISettings(settings: Partial<AISettings>): Promise<AISettings> {
  inMemory.aiSettings = { ...inMemory.aiSettings, ...settings };
  return inMemory.aiSettings;
}

export async function getAdminByEmail(identifier: string): Promise<AdminUser | null> {
  const cleanPhone = identifier.replace(/[^\d]/g, '');
  const p = getDbPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>(
        'SELECT * FROM users WHERE email = ? OR REPLACE(phone, "+91", "") = ? OR phone = ? LIMIT 1',
        [identifier, cleanPhone, identifier]
      );
      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          email: r.email,
          phone: r.phone,
          passwordHash: r.password_hash,
          name: r.name,
          createdAt: r.created_at
        };
      }
    } catch (e) {
      // Fallback
    }
  }

  return (
    inMemory.admins.find((a) => {
      const matchEmail = a.email.toLowerCase() === identifier.toLowerCase();
      const aPhoneClean = (a.phone || '').replace(/[^\d]/g, '');
      const matchPhone = Boolean(cleanPhone && (aPhoneClean === cleanPhone || aPhoneClean.endsWith(cleanPhone) || cleanPhone.endsWith(aPhoneClean)));
      return matchEmail || matchPhone;
    }) || null
  );
}

export const getAdminByIdentifier = getAdminByEmail;

export async function getMediaAssets(): Promise<MediaAsset[]> {
  return inMemory.media;
}

export async function saveMediaAsset(asset: MediaAsset): Promise<MediaAsset> {
  inMemory.media.unshift(asset);
  return asset;
}

export async function deleteMediaAsset(id: string): Promise<boolean> {
  inMemory.media = inMemory.media.filter((m) => m.id !== id);
  return true;
}

export async function getDashboardStats() {
  const categories = inMemory.categories.length;
  const brands = inMemory.brands.length;
  const locations = inMemory.locations.length;
  const reviews = inMemory.reviews.length;
  const bookings = (await getBookings()).length;
  const publishedBlog = inMemory.blogPosts.filter((b) => b.status === 'published').length;
  const draftBlog = inMemory.blogPosts.filter((b) => b.status === 'draft').length;

  return {
    categories,
    brands,
    locations,
    reviews,
    bookings,
    publishedBlog,
    draftBlog
  };
}
