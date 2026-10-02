/**
 * generate-assets.cjs
 *
 * Generates all app icons + tray icons from assets/favicon.svg using sharp.
 * Run via: npm run assets
 *
 * Outputs (into desktop/assets/):
 *   icon.png            512x512   (Linux + source)
 *   icon.ico            multi-size (Windows installer + app)
 *   icon.icns           multi-size (macOS — via png-to-icns fallback if available)
 *   installer-icon.png  256x256   (NSIS sidebar)
 *   tray.png            32x32     (Windows/Linux tray)
 *   trayTemplate.png    32x32     (macOS template tray, black + alpha)
 *   pwa-icons/          (optional PWA set — remove if unused)
 *     icon-192x192.png
 *     icon-512x512.png
 */

const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const SRC_SVG = path.join(ROOT, 'assets', 'favicon.svg');
const OUT_DIR = path.join(ROOT, 'assets');
const PWA_DIR = path.join(OUT_DIR, 'pwa-icons');

const ICO_SIZES = [16, 24, 32, 48, 64, 128, 256];
const ICNS_SIZES = [16, 32, 64, 128, 256, 512, 1024];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function renderPng(size, outPath, { background } = {}) {
  let pipeline = sharp(SRC_SVG, { density: 384 }).resize(size, size, {
    fit: 'contain',
    background: background || { r: 0, g: 0, b: 0, alpha: 0 },
  });

  if (background) {
    pipeline = pipeline.flatten({ background });
  }

  await pipeline.png({ compressionLevel: 9 }).toFile(outPath);
  console.log(`  ✓ ${path.relative(ROOT, outPath)} (${size}px)`);
}

async function renderBuffer(size) {
  return sharp(SRC_SVG, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

/**
 * Build a multi-size .ico manually (sharp can't emit .ico natively).
 * ICO format: header (6 bytes) + N directory entries (16 bytes each) + PNG blobs.
 */
async function buildIco(sizes, outPath) {
  const pngs = await Promise.all(sizes.map((s) => renderBuffer(s)));

  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * pngs.length;
  let dataOffset = headerSize + dirSize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = icon
  header.writeUInt16LE(pngs.length, 4); // count

  const dirEntries = Buffer.alloc(dirSize);
  pngs.forEach((png, i) => {
    const size = sizes[i];
    const off = i * dirEntrySize;
    dirEntries.writeUInt8(size >= 256 ? 0 : size, off + 0); // width (0 = 256)
    dirEntries.writeUInt8(size >= 256 ? 0 : size, off + 1); // height
    dirEntries.writeUInt8(0, off + 2); // color palette
    dirEntries.writeUInt8(0, off + 3); // reserved
    dirEntries.writeUInt16LE(1, off + 4); // color planes
    dirEntries.writeUInt16LE(32, off + 6); // bpp
    dirEntries.writeUInt32LE(png.length, off + 8); // size
    dirEntries.writeUInt32LE(dataOffset, off + 12); // offset
    dataOffset += png.length;
  });

  const out = Buffer.concat([header, dirEntries, ...pngs]);
  fs.writeFileSync(outPath, out);
  console.log(`  ✓ ${path.relative(ROOT, outPath)} (${sizes.join(', ')}px)`);
}

/**
 * .icns builder. Sharp can't emit .icns either.
 * ICNS format: 'icns' magic + total length + typed chunks.
 * We use the 'ic07' (128), 'ic08' (256), 'ic09' (512), 'ic10' (1024) PNG-based types.
 */
async function buildIcns(sizes, outPath) {
  const typeForSize = {
    16: 'icp4',
    32: 'icp5',
    64: 'icp6',
    128: 'ic07',
    256: 'ic08',
    512: 'ic09',
    1024: 'ic10',
  };

  const chunks = [];
  for (const size of sizes) {
    const type = typeForSize[size];
    if (!type) continue;
    const png = await renderBuffer(size);
    const chunkHeader = Buffer.alloc(8);
    chunkHeader.write(type, 0, 4, 'ascii');
    chunkHeader.writeUInt32BE(png.length + 8, 4);
    chunks.push(chunkHeader, png);
  }

  const body = Buffer.concat(chunks);
  const header = Buffer.alloc(8);
  header.write('icns', 0, 4, 'ascii');
  header.writeUInt32BE(body.length + 8, 4);

  fs.writeFileSync(outPath, Buffer.concat([header, body]));
  console.log(`  ✓ ${path.relative(ROOT, outPath)} (${sizes.join(', ')}px)`);
}

async function renderTrayTemplate(outPath, size = 32) {
  // macOS template icon: black glyph on transparent. We render to grayscale + alpha.
  const buf = await sharp(SRC_SVG, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .toBuffer();

  // Convert any non-transparent pixels to pure black, keep alpha
  const { data, info } = await sharp(buf)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    const a = out[i + 3];
    if (a > 0) {
      out[i] = 0; // R
      out[i + 1] = 0; // G
      out[i + 2] = 0; // B
    }
  }

  await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log(`  ✓ ${path.relative(ROOT, outPath)} (${size}px template)`);
}

async function main() {
  if (!fs.existsSync(SRC_SVG)) {
    console.error(`✗ Source SVG not found: ${SRC_SVG}`);
    process.exit(1);
  }

  ensureDir(OUT_DIR);
  console.log(`Source: ${path.relative(ROOT, SRC_SVG)}`);
  console.log(`Output: ${path.relative(ROOT, OUT_DIR)}`);
  console.log('');

  // 1. Master PNGs
  await renderPng(512, path.join(OUT_DIR, 'icon.png'));
  await renderPng(256, path.join(OUT_DIR, 'installer-icon.png'));

  // 2. Windows .ico (multi-size)
  await buildIco(ICO_SIZES, path.join(OUT_DIR, 'icon.ico'));

  // 3. macOS .icns (multi-size)
  await buildIcns(ICNS_SIZES, path.join(OUT_DIR, 'icon.icns'));

  // 4. Tray icons
  await renderPng(32, path.join(OUT_DIR, 'tray.png'));
  await renderTrayTemplate(path.join(OUT_DIR, 'trayTemplate.png'), 32);

  // 5. PWA icon set (only if /pwa-icons is expected by the client)
  ensureDir(PWA_DIR);
  await renderPng(192, path.join(PWA_DIR, 'icon-192x192.png'));
  await renderPng(512, path.join(PWA_DIR, 'icon-512x512.png'));

  console.log('');
  console.log('All assets generated.');
}

main().catch((err) => {
  console.error('Asset generation failed:', err);
  process.exit(1);
});