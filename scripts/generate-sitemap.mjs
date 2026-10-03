import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.applianceseva.com';
const today = new Date().toISOString().split('T')[0];

const staticPaths = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'locations', priority: '0.85', changefreq: 'daily' },
  { path: 'blog', priority: '0.8', changefreq: 'daily' },
  { path: 'reviews', priority: '0.9', changefreq: 'daily' },
  { path: 'track', priority: '0.7', changefreq: 'daily' },
  { path: 'privacy-policy', priority: '0.3', changefreq: 'monthly' },
  { path: 'terms-of-service', priority: '0.3', changefreq: 'monthly' }
];

const categorySlugs = [
  'ac-repair',
  'fridge-repair',
  'washing-machine-repair',
  'microwave-repair',
  'led-tv-repair'
];

const blogSlugs = [
  'home-appliance-care-india-doorstep-repair-service-guide',
  'ac-not-cooling-top-reasons-solutions-kolkata',
  'refrigerator-maintenance-tips-prevent-food-spoilage',
  'ac-gas-refill-price-leakage-repair-cost-guide',
  'refrigerator-not-cooling-light-is-on-repair-guide',
  'washing-machine-not-spinning-or-draining-fix-guide',
  'microwave-oven-not-heating-food-repair-guide',
  'led-tv-sound-ok-no-picture-black-screen-fix'
];

const brandSlugs = [
  'o-general', 'lloyd', 'blue-star', 'hitachi', 'daikin', 'carrier', 'voltas',
  'mitsubishi', 'panasonic', 'lg', 'samsung', 'whirlpool', 'godrej', 'haier',
  'ifb', 'bosch', 'siemens', 'electrolux', 'toshiba', 'tcl', 'sony', 'onida',
  'sansui', 'bpl', 'videocon', 'kelvinator', 'singer', 'kenstar',
  'akai', 'midea', 'marq', 'croma'
];

const locationSlugs = [
  'salt-lake', 'new-town', 'rajarhat', 'behala', 'garia', 'jadavpur',
  'tollygunge', 'ballygunge', 'alipore', 'park-street', 'kasba', 'thakurpukur',
  'dumdum', 'ultadanga', 'shyambazar', 'baranagar', 'belgharia', 'sodepur',
  'khardah', 'barrackpur', 'naihati', 'kaikhali', 'birati', 'madhyamgram',
  'barasat', 'habra', 'kalyani', 'howrah', 'salkia', 'uttarpara'
];

const items = [];

// 1. Static Pages (EN & BN)
for (const p of staticPaths) {
  const enUrl = p.path ? `${SITE_URL}/${p.path}` : `${SITE_URL}/`;
  const bnUrl = `${SITE_URL}/bn${p.path ? `/${p.path}` : ''}`;
  items.push({
    url: enUrl,
    lastmod: today,
    changefreq: p.changefreq,
    priority: p.priority,
    alternate: bnUrl
  });
  items.push({
    url: bnUrl,
    lastmod: today,
    changefreq: p.changefreq,
    priority: (parseFloat(p.priority) * 0.9).toFixed(1),
    alternate: enUrl
  });
}

// 2. Categories
for (const slug of categorySlugs) {
  const enUrl = `${SITE_URL}/${slug}`;
  const bnUrl = `${SITE_URL}/bn/${slug}`;
  items.push({
    url: enUrl,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.9',
    alternate: bnUrl
  });
  items.push({
    url: bnUrl,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.85',
    alternate: enUrl
  });
}

// 3. Blog Posts
for (const slug of blogSlugs) {
  const enUrl = `${SITE_URL}/blog/${slug}`;
  const bnUrl = `${SITE_URL}/bn/blog/${slug}`;
  items.push({
    url: enUrl,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.7',
    alternate: bnUrl
  });
  items.push({
    url: bnUrl,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.65',
    alternate: enUrl
  });
}

// 4. Brands
for (const slug of brandSlugs) {
  const enUrl = `${SITE_URL}/brands/${slug}`;
  const bnUrl = `${SITE_URL}/bn/brands/${slug}`;
  items.push({
    url: enUrl,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.85',
    alternate: bnUrl
  });
  items.push({
    url: bnUrl,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.8',
    alternate: enUrl
  });
}

// 5. Locations (30 Local Hubs)
for (const slug of locationSlugs) {
  const enUrl = `${SITE_URL}/locations/${slug}`;
  const bnUrl = `${SITE_URL}/bn/locations/${slug}`;
  items.push({
    url: enUrl,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.85',
    alternate: bnUrl
  });
  items.push({
    url: bnUrl,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.8',
    alternate: enUrl
  });
}

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${items
  .map((item) => {
    const isBengali = item.url.includes('/bn');
    const enUrl = isBengali && item.alternate ? item.alternate : item.url;
    const bnUrl = !isBengali && item.alternate ? item.alternate : item.url;

    return `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>${
      item.alternate
        ? `\n    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />\n    <xhtml:link rel="alternate" hreflang="bn" href="${bnUrl}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />`
        : ''
    }
  </url>`;
  })
  .join('\n')}
</urlset>
`;

const publicDir = path.resolve(__dirname, '../public');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xmlContent, 'utf-8');

console.log(`Generated public/sitemap.xml with ${items.length} total URLs.`);
