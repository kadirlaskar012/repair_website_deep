import fs from 'fs';
import path from 'path';

const curatedUnits = {
  // Modern Split AC unit
  'ac_unit.jpg': 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=800&auto=format&fit=crop',
  // Modern Stainless Steel Double-Door Refrigerator
  'fridge_unit.jpg': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=800&auto=format&fit=crop',
  // Modern Front-Load Washing Machine
  'washing_unit.jpg': 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=800&auto=format&fit=crop',
  // Modern Countertop Microwave
  'microwave_unit.jpg': 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?q=80&w=800&auto=format&fit=crop',
  // Modern Smart 4K LED TV
  'tv_unit.jpg': 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop'
};

const dir = path.join(process.cwd(), 'public', 'images');

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
  for (const [filename, url] of Object.entries(curatedUnits)) {
    await download(filename, url);
  }
  console.log('Curated exact units downloaded.');
}

run();
