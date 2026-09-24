import { MetadataRoute } from 'next';
import { getCategories, getBlogPosts } from '@/lib/db';
import { SITE_URL } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, blogPosts] = await Promise.all([
    getCategories(),
    getBlogPosts(true)
  ]);

  const now = new Date();

  // Static Pages
  const staticPaths = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: 'privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: 'terms-of-service', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: 'blog', priority: 0.8, changeFrequency: 'daily' as const }
  ];

  const staticUrls: MetadataRoute.Sitemap = [];

  for (const item of staticPaths) {
    const enUrl = `${SITE_URL}${item.path ? `/${item.path}` : ''}`;
    const bnUrl = `${SITE_URL}/bn${item.path ? `/${item.path}` : ''}`;

    staticUrls.push({
      url: enUrl,
      lastModified: now,
      changeFrequency: item.changeFrequency,
      priority: item.priority,
      alternates: {
        languages: {
          en: enUrl,
          bn: bnUrl
        }
      }
    });

    staticUrls.push({
      url: bnUrl,
      lastModified: now,
      changeFrequency: item.changeFrequency,
      priority: item.priority * 0.9,
      alternates: {
        languages: {
          en: enUrl,
          bn: bnUrl
        }
      }
    });
  }

  // Categories (5 primary services)
  const categoryUrls: MetadataRoute.Sitemap = [];
  for (const cat of categories) {
    const enUrl = `${SITE_URL}/${cat.slug}`;
    const bnUrl = `${SITE_URL}/bn/${cat.slug}`;

    categoryUrls.push({
      url: enUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: enUrl,
          bn: bnUrl
        }
      }
    });

    categoryUrls.push({
      url: bnUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
      alternates: {
        languages: {
          en: enUrl,
          bn: bnUrl
        }
      }
    });
  }

  // Blog Posts
  const blogUrls: MetadataRoute.Sitemap = [];
  for (const post of blogPosts) {
    const enUrl = `${SITE_URL}/blog/${post.slug}`;
    const bnUrl = `${SITE_URL}/bn/blog/${post.slug}`;
    const postDate = new Date(post.updatedAt || post.createdAt);

    blogUrls.push({
      url: enUrl,
      lastModified: postDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: enUrl,
          bn: bnUrl
        }
      }
    });

    blogUrls.push({
      url: bnUrl,
      lastModified: postDate,
      changeFrequency: 'monthly',
      priority: 0.65,
      alternates: {
        languages: {
          en: enUrl,
          bn: bnUrl
        }
      }
    });
  }

  return [...staticUrls, ...categoryUrls, ...blogUrls];
}
