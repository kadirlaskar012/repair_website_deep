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
  const samsungFridge = 'https://upload.wikimedia.org/wikipedia/commons/1/14/Samsung_Refrigerator_RF24FSEDBSR.jpg';
  await download(samsungFridge, 'fridge_unit.jpg');
}

run();
