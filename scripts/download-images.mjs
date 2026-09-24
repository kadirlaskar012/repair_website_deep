import fs from 'fs';
import path from 'path';

const images = {
  'microwave_service.jpg': 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?q=80&w=1200&auto=format&fit=crop',
  'led_tv_service.jpg': 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&auto=format&fit=crop',
  'ac_unit.jpg': 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=800&auto=format&fit=crop',
  'fridge_unit.jpg': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=800&auto=format&fit=crop',
  'washing_unit.jpg': 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=800&auto=format&fit=crop',
  'microwave_unit.jpg': 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=800&auto=format&fit=crop',
  'tv_unit.jpg': 'https://images.unsplash.com/photo-1577979749830-f1d742b96791?q=80&w=800&auto=format&fit=crop',
  'banner_comfort.jpg': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
  'banner_expert.jpg': 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1600&auto=format&fit=crop',
  'technician_trust.jpg': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop'
};

const dir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function download(filename, url) {
  const dest = path.join(dir, filename);
  console.log(`Downloading ${filename}...`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buffer);
    console.log(`Saved ${filename} (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`Error downloading ${filename}:`, err.message);
  }
}

async function run() {
  for (const [filename, url] of Object.entries(images)) {
    await download(filename, url);
  }
  console.log('All images downloaded successfully.');
}

run();
