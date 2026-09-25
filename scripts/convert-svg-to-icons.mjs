import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function main() {
  const svgPath = path.resolve('public/logo-icon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  const targets = [
    { dest: 'public/logo-icon.png', size: 512 },
    { dest: 'public/icon-512.png', size: 512 },
    { dest: 'public/icon-192.png', size: 192 },
    { dest: 'public/apple-touch-icon.png', size: 180 },
    { dest: 'src/app/apple-icon.png', size: 180 },
    { dest: 'public/favicon-48.png', size: 48 },
    { dest: 'src/app/icon.png', size: 48 },
    { dest: 'public/favicon.png', size: 32 },
  ];

  for (const t of targets) {
    await sharp(svgBuffer)
      .resize(t.size, t.size)
      .png()
      .toFile(path.resolve(t.dest));
    console.log(`Generated ${t.dest} (${t.size}x${t.size})`);
  }
}

main().catch(console.error);
