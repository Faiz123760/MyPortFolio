/**
 * convert-images.mjs
 * Converts all PNG images in src/assets (recursively) to WebP using sharp.
 * Saves them alongside the originals so existing imports still resolve.
 * Run: node scripts/convert-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '..', 'src', 'assets');
const QUALITY = 82; // good balance of quality vs size

async function getAllPngs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllPngs(fullPath));
    } else if (extname(entry.name).toLowerCase() === '.png') {
      files.push(fullPath);
    }
  }
  return files;
}

async function convert(pngPath) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp');
  const before = (await stat(pngPath)).size;
  await sharp(pngPath).webp({ quality: QUALITY }).toFile(webpPath);
  const after = (await stat(webpPath)).size;
  const saved = (((before - after) / before) * 100).toFixed(1);
  console.log(`✓ ${basename(pngPath)} → ${basename(webpPath)}  ${(before/1024).toFixed(0)}kB → ${(after/1024).toFixed(0)}kB  (-${saved}%)`);
}

const pngs = await getAllPngs(ASSETS_DIR);
console.log(`\nConverting ${pngs.length} PNG files to WebP (quality ${QUALITY})...\n`);
await Promise.all(pngs.map(convert));
console.log(`\n✅ Done! Update your imports from .png → .webp to use the smaller files.\n`);
