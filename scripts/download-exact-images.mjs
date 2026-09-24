import fs from 'fs';
import path from 'path';

// Exact sleek appliance units matching HomeTriangle's appliance category row
const exactImages = {
  // Sleek split air conditioner
  'ac_unit.jpg': 'https://images.unsplash.com/photo-1590756254933-2873d72a83b6?q=80&w=800&auto=format&fit=crop',
  // Sleek stainless steel double-door refrigerator
  'fridge_unit.jpg': 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop',
  // Sleek front-load washing machine
  'washing_unit.jpg': 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=800&auto=format&fit=crop',
  // Sleek black microwave oven
  'microwave_unit.jpg': 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=800&auto=format&fit=crop',
  // Sleek 4K Smart TV in living room
  'tv_unit.jpg': 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop',
  // Smart LED TV repair service
  'led_tv_service.jpg': 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1200&auto=format&fit=crop',
  // Microwave repair service
  'microwave_service.jpg': 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?q=80&w=1200&auto=format&fit=crop'
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
  for (const [filename, url] of Object.entries(exactImages)) {
    await download(filename, url);
  }
  console.log('Exact images downloaded successfully.');
}

run();
