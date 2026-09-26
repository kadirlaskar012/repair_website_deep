import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    'GPTBot',
    'ChatGPT-User',
    'Google-Extended',
    'PerplexityBot',
    'ClaudeBot',
    'anthropic-ai',
    'Applebot-Extended',
    'cohere-ai',
    'Bytespider',
    'CCBot'
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/admin', '/api/admin/*']
      },
      ...aiBots.map((bot) => ({
        userAgent: bot,
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/admin', '/api/admin/*']
      }))
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap_index.xml`
    ]
  };
}
