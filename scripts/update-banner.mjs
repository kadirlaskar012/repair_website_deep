import fs from 'fs';
import path from 'path';

async function updateBanner() {
  const dest = path.join(process.cwd(), 'public', 'images', 'banner_expert.jpg');
  const url = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop';
  console.log('Downloading modern technician banner...');
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log('Updated banner_expert.jpg successfully');
}

updateBanner();
