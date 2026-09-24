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
  const acUrl = 'https://upload.wikimedia.org/wikipedia/commons/0/00/Mitsubishi_Heavy_Industries_aircon_indoor_unit_FDKN208C.jpg';
  await download(acUrl, 'ac_unit.jpg');

  const sanyoAc = 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Sanyo_SAP-KRV-93EH.jpg';
  await download(sanyoAc, 'ac_unit_alt.jpg');
}

run();
