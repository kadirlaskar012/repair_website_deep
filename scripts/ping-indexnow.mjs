import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'www.applianceseva.com';
const KEY = '6f8c2e1b4a9d7e3f5c0b8a2d1e4f6a8b';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function notifyIndexNow() {
  try {
    const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      console.log('[IndexNow] sitemap.xml not found, skipping.');
      return;
    }

    const xml = fs.readFileSync(sitemapPath, 'utf-8');
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

    if (!urls.length) {
      console.log('[IndexNow] No URLs found in sitemap, skipping.');
      return;
    }

    console.log(`[IndexNow] Preparing automated search engine ping for ${urls.length} URLs...`);

    const payload = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls.slice(0, 1000) // Send up to 1,000 URLs per batch
    });

    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      console.log(`[IndexNow] Response status: ${res.statusCode} ${res.statusMessage}`);
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log('[IndexNow] ✓ Successfully notified search engines of latest URLs!');
      } else {
        console.log(`[IndexNow] Ping acknowledged with status ${res.statusCode}.`);
      }
      res.resume();
    });

    req.on('error', (err) => {
      // Don't fail the build if IndexNow API is unreachable during local/offline build
      console.warn(`[IndexNow] Note: Search engine ping network warning: ${err.message}`);
    });

    req.on('timeout', () => {
      req.destroy();
      console.warn('[IndexNow] Note: Search engine ping timed out (non-blocking).');
    });

    req.write(payload);
    req.end();
  } catch (err) {
    console.warn(`[IndexNow] Ping warning (non-blocking): ${err.message}`);
  }
}

notifyIndexNow();
