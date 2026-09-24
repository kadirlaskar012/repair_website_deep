import fs from 'fs';
import path from 'path';

async function download(url, filename) {
  const dest = path.join(process.cwd(), 'public', 'images', filename);
  console.log(`Downloading ${filename}...`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log(`Saved ${filename} (${buf.length} bytes)`);
}

async function run() {
  // 1. Copy Sanyo clean split AC to ac_unit.jpg
  const altAcPath = path.join(process.cwd(), 'public', 'images', 'ac_unit_alt.jpg');
  const acDest = path.join(process.cwd(), 'public', 'images', 'ac_unit.jpg');
  if (fs.existsSync(altAcPath)) {
    fs.copyFileSync(altAcPath, acDest);
    console.log('Copied clean Split AC to ac_unit.jpg');
  }

  // 2. Download Samsung smart double door refrigerator
  const fridgeUrl = 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Samsung_smart_refrigerator_-_The_Talking_Fridge.jpg';
  await download(fridgeUrl, 'fridge_unit.jpg');
}

run();
