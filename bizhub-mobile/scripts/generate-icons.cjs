const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../assets');
const SVG_PATH = path.join(ASSETS_DIR, 'favicon.svg');   // ← your source

const BRAND = {
  primary:     '#1a73e8',
  primaryDark: '#0d47a1',
  white:       '#ffffff',
};

const svgBuffer = fs.readFileSync(SVG_PATH);

// ============================================================
// ICONS
// ============================================================
const icons = [
  // iOS
  { size: 1024, name: 'icon.png',              description: 'iOS App Store' },
  { size: 180,  name: 'icon-180.png',          description: 'iOS 180' },
  { size: 120,  name: 'icon-120.png',          description: 'iOS 120' },
  { size: 76,   name: 'icon-76.png',           description: 'iOS 76' },

  // Android
  { size: 1024, name: 'adaptive-icon.png',     description: 'Android adaptive foreground' },
  { size: 512,  name: 'adaptive-icon-512.png', description: 'Android adaptive 512' },
  { size: 192,  name: 'android-icon-192.png',  description: 'Android 192' },
  { size: 144,  name: 'android-icon-144.png',  description: 'Android 144' },
  { size: 96,   name: 'android-icon-96.png',   description: 'Android 96' },
  { size: 72,   name: 'android-icon-72.png',   description: 'Android 72' },
  { size: 48,   name: 'android-icon-48.png',   description: 'Android 48' },

  // Web / PWA
  { size: 512,  name: 'favicon-512.png',       description: 'PWA 512' },
  { size: 384,  name: 'favicon-384.png',       description: 'PWA 384' },
  { size: 256,  name: 'favicon-256.png',       description: 'PWA 256' },
  { size: 192,  name: 'favicon.png',           description: 'Web favicon 192' },
  { size: 128,  name: 'favicon-128.png',       description: 'Web 128' },
  { size: 64,   name: 'favicon-64.png',        description: 'Web 64' },
  { size: 32,   name: 'favicon-32.png',        description: 'Web 32' },
  { size: 16,   name: 'favicon-16.png',        description: 'Web 16' },
];

// ============================================================
// SPLASHES
// ============================================================
const splashes = [
  { width: 2048, height: 2048, name: 'splash-icon.png' },
  { width: 2732, height: 2732, name: 'splash-2732.png' },
  { width: 2048, height: 2048, name: 'splash-2048.png' },
  { width: 1242, height: 2436, name: 'splash-1242x2436.png' },
  { width: 1242, height: 2208, name: 'splash-1242x2208.png' },
  { width: 1080, height: 1920, name: 'splash-1080x1920.png' },
];

// ============================================================
// Splash SVG — embeds your favicon as-is
// ============================================================
function buildSplashSVG(width, height) {
  const cx = width / 2;
  const cy = height / 2;

  const logoSize = Math.round(Math.min(width, height) * 0.22);
  const logoX = cx - logoSize / 2;
  const logoY = cy - logoSize / 2 - logoSize * 0.35;

  const titleY      = logoY + logoSize + logoSize * 0.30;
  const taglineY    = titleY + logoSize * 0.22;
  const titleSize   = Math.round(logoSize * 0.26);
  const taglineSize = Math.round(logoSize * 0.11);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${BRAND.primary}"/>
          <stop offset="100%" stop-color="${BRAND.primaryDark}"/>
        </linearGradient>
      </defs>

      <rect width="${width}" height="${height}" fill="url(#bg)"/>

      <!-- Favicon embedded at scale -->
      <g transform="translate(${logoX}, ${logoY})">
        <svg width="${logoSize}" height="${logoSize}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#1a73e8"/>
          <path d="M8 10h6v12H8zm10-4h6v16h-6z" fill="white"/>
          <circle cx="22" cy="8" r="2" fill="white" fill-opacity="0.5"/>
          <circle cx="22" cy="20" r="2" fill="white" fill-opacity="0.5"/>
        </svg>
      </g>

      <text x="${cx}" y="${titleY}"
            text-anchor="middle" fill="${BRAND.white}"
            font-size="${titleSize}" font-weight="700"
            font-family="Inter, Arial, sans-serif"
            letter-spacing="0.5">BizHub</text>

      <text x="${cx}" y="${taglineY}"
            text-anchor="middle" fill="${BRAND.white}" fill-opacity="0.75"
            font-size="${taglineSize}"
            font-family="Inter, Arial, sans-serif"
            letter-spacing="1.5">MANAGE EVERYTHING. ONE APP.</text>
    </svg>
  `;
}

// ============================================================
// GENERATORS
// ============================================================
async function generateIcons() {
  console.log('🎨 Icons...\n');
  for (const icon of icons) {
    try {
      const isAdaptive = icon.name.startsWith('adaptive-icon');

      // For Android adaptive icons: transparent bg, the favicon sits inside
      // the 66% safe zone so launcher masks don't clip the mark.
      // For everything else: render the favicon 1:1 on the target size.
      if (isAdaptive) {
        const safeSize = Math.round(icon.size * 0.66);
        const offset = Math.round((icon.size - safeSize) / 2);

        const composed = await sharp({
          create: {
            width: icon.size,
            height: icon.size,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          },
        })
          .composite([
            {
              input: await sharp(svgBuffer).resize(safeSize, safeSize).png().toBuffer(),
              top: offset,
              left: offset,
            },
          ])
          .png()
          .toBuffer();

        await fs.promises.writeFile(path.join(ASSETS_DIR, icon.name), composed);
      } else {
        await sharp(svgBuffer)
          .resize(icon.size, icon.size, { fit: 'contain' })
          .png()
          .toFile(path.join(ASSETS_DIR, icon.name));
      }

      console.log(`✅ ${icon.name} (${icon.size}) — ${icon.description}`);
    } catch (e) {
      console.error(`❌ ${icon.name}:`, e.message);
    }
  }
}

async function generateSplashes() {
  console.log('\n🎨 Splashes...\n');
  for (const s of splashes) {
    try {
      const svg = buildSplashSVG(s.width, s.height);
      await sharp(Buffer.from(svg))
        .resize(s.width, s.height)
        .png()
        .toFile(path.join(ASSETS_DIR, s.name));
      console.log(`✅ ${s.name} (${s.width}x${s.height})`);
    } catch (e) {
      console.error(`❌ ${s.name}:`, e.message);
    }
  }
}

async function generateNotificationIcons() {
  console.log('\n🎨 Notification icons (white on transparent)...\n');

  // Android notification icons must be white silhouette on transparent.
  // Strip the blue squircle — keep only the two white bars (no circles,
  // since at 24px the 0.5-opacity circles disappear anyway).
  const notifSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path d="M8 10h6v12H8zm10-4h6v16h-6z" fill="#ffffff"/>
    </svg>
  `;

  for (const size of [96, 72, 48, 24]) {
    try {
      await sharp(Buffer.from(notifSVG))
        .resize(size, size, { fit: 'contain' })
        .png()
        .toFile(path.join(ASSETS_DIR, `notification-icon-${size}.png`));
      console.log(`✅ notification-icon-${size}.png`);
    } catch (e) {
      console.error(`❌ notification-icon-${size}:`, e.message);
    }
  }
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('🚀 BizHub icon generation\n');
  console.log(`📁 Source: ${SVG_PATH}\n`);

  if (!fs.existsSync(SVG_PATH)) {
    console.error(`❌ Missing source: ${SVG_PATH}`);
    process.exit(1);
  }

  await generateIcons();
  await generateSplashes();
  await generateNotificationIcons();

  console.log('\n✨ Done. Ready for Expo build.');
  console.log('   Next: npx expo prebuild  OR  eas build');
}

main().catch((e) => { console.error(e); process.exit(1); });