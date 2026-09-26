import { NextResponse } from 'next/server';
import { getCategories, getBlogPosts } from '@/lib/db';
import { SITE_URL } from '@/lib/seo';
import { brandSeoCatalog } from '@/lib/brand-seo-data';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache 1 hour

export async function GET() {
  const [categories, blogPosts] = await Promise.all([
    getCategories(),
    getBlogPosts(true)
  ]);

  const now = new Date().toISOString();

  type SitemapItem = {
    url: string;
    lastmod: string;
    changefreq: string;
    priority: string;
    alternate?: string;
  };

  const items: SitemapItem[] = [];

  // 1. Static Pages
  const staticPaths = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: 'blog', priority: '0.8', changefreq: 'daily' },
    { path: 'privacy-policy', priority: '0.3', changefreq: 'monthly' },
    { path: 'terms-of-service', priority: '0.3', changefreq: 'monthly' }
  ];

  for (const p of staticPaths) {
    const enUrl = `${SITE_URL}${p.path ? `/${p.path}` : ''}`;
    const bnUrl = `${SITE_URL}/bn${p.path ? `/${p.path}` : ''}`;

    items.push({
      url: enUrl,
      lastmod: now,
      changefreq: p.changefreq,
      priority: p.priority,
      alternate: bnUrl
    });

    items.push({
      url: bnUrl,
      lastmod: now,
      changefreq: p.changefreq,
      priority: (parseFloat(p.priority) * 0.9).toFixed(1),
      alternate: enUrl
    });
  }

  // 2. Categories
  for (const cat of categories) {
    const enUrl = `${SITE_URL}/${cat.slug}`;
    const bnUrl = `${SITE_URL}/bn/${cat.slug}`;

    items.push({
      url: enUrl,
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.9',
      alternate: bnUrl
    });

    items.push({
      url: bnUrl,
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.85',
      alternate: enUrl
    });
  }

  // 3. Blog Posts
  for (const post of blogPosts) {
    const enUrl = `${SITE_URL}/blog/${post.slug}`;
    const bnUrl = `${SITE_URL}/bn/blog/${post.slug}`;
    const postDate = new Date(post.updatedAt || post.createdAt).toISOString();

    items.push({
      url: enUrl,
      lastmod: postDate,
      changefreq: 'monthly',
      priority: '0.7',
      alternate: bnUrl
    });

    items.push({
      url: bnUrl,
      lastmod: postDate,
      changefreq: 'monthly',
      priority: '0.65',
      alternate: enUrl
    });
  }

  // 4. Brands
  const brandSlugs = Object.keys(brandSeoCatalog);
  for (const slug of brandSlugs) {
    const cleanSlug = slug.trim().toLowerCase().replace(/\s+/g, '-');
    const enUrl = `${SITE_URL}/brands/${cleanSlug}`;
    const bnUrl = `${SITE_URL}/bn/brands/${cleanSlug}`;

    items.push({
      url: enUrl,
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.85',
      alternate: bnUrl
    });

    items.push({
      url: bnUrl,
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.8',
      alternate: enUrl
    });
  }

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${items
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>${
      item.alternate
        ? `\n    <xhtml:link rel="alternate" hreflang="${item.url.includes('/bn') ? 'en' : 'bn'}" href="${item.alternate}" />`
        : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}
