import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const serverAppDir = path.join(projectRoot, '.next', 'server', 'app');

function patchHtmlFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('<html lang="en"')) {
    content = content.replace('<html lang="en"', '<html lang="bn"');
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`[patch-html-lang] Patched lang="bn" in: ${path.relative(projectRoot, filePath)}`);
  }
}

function walkAndPatch(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkAndPatch(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      patchHtmlFile(fullPath);
    }
  }
}

// 1. Patch bn.html
const rootBnFile = path.join(serverAppDir, 'bn.html');
patchHtmlFile(rootBnFile);

// 2. Patch all files under .next/server/app/bn/
const bnDir = path.join(serverAppDir, 'bn');
walkAndPatch(bnDir);

console.log('[patch-html-lang] Completed patching Bengali static HTML files with lang="bn".');
