const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.resolve(__dirname, '../../assets');
const PUBLIC_DIR = path.resolve(__dirname, '../../public');

// Ensure directories exist
[ASSETS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Read the SVG from public folder
const svgPath = path.join(PUBLIC_DIR, 'favicon.svg');
const svgBuffer = fs.readFileSync(svgPath);

// ============================================
// Generate PNGs
// ============================================

// 512x512 (base for all)
sharp(svgBuffer)
  .resize(512, 512)
  .png()
  .toFile(path.join(ASSETS_DIR, 'icon.png'))
  .then(() => console.log('✅ icon.png (512x512)'))
  .catch(err => console.error('❌ icon.png:', err));

// 256x256
sharp(svgBuffer)
  .resize(256, 256)
  .png()
  .toFile(path.join(ASSETS_DIR, 'icon-256.png'))
  .then(() => console.log('✅ icon-256.png'));

// 128x128
sharp(svgBuffer)
  .resize(128, 128)
  .png()
  .toFile(path.join(ASSETS_DIR, 'icon-128.png'))
  .then(() => console.log('✅ icon-128.png'));

// 64x64
sharp(svgBuffer)
  .resize(64, 64)
  .png()
  .toFile(path.join(ASSETS_DIR, 'icon-64.png'))
  .then(() => console.log('✅ icon-64.png'));

// 48x48
sharp(svgBuffer)
  .resize(48, 48)
  .png()
  .toFile(path.join(ASSETS_DIR, 'icon-48.png'))
  .then(() => console.log('✅ icon-48.png'));

// 32x32
sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(path.join(ASSETS_DIR, 'icon-32.png'))
  .then(() => console.log('✅ icon-32.png'));

// 16x16
sharp(svgBuffer)
  .resize(16, 16)
  .png()
  .toFile(path.join(ASSETS_DIR, 'icon-16.png'))
  .then(() => console.log('✅ icon-16.png'));

// ============================================
// Generate ICO (Windows) - requires png-to-ico or similar
// Using sharp to create a multi-size PNG, then convert
// For now, use 256x256 as base .ico
// ============================================

sharp(svgBuffer)
  .resize(256, 256)
  .png()
  .toFile(path.join(ASSETS_DIR, 'icon.ico'))
  .then(() => console.log('✅ icon.ico (256x256 - needs proper ico conversion)'))
  .catch(err => console.error('❌ icon.ico:', err));

// ============================================
// Generate ICNS (macOS) - creates a PNG, needs iconutil for proper .icns
// ============================================

sharp(svgBuffer)
  .resize(1024, 1024)
  .png()
  .toFile(path.join(ASSETS_DIR, 'icon.icns'))
  .then(() => console.log('✅ icon.icns (1024x1024 - needs proper icns conversion)'))
  .catch(err => console.error('❌ icon.icns:', err));

// ============================================
// Generate Tray Icon (small, monochrome-ish)
// ============================================

sharp(svgBuffer)
  .resize(16, 16)
  .png()
  .toFile(path.join(ASSETS_DIR, 'tray-icon.png'))
  .then(() => console.log('✅ tray-icon.png (16x16)'));

sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(path.join(ASSETS_DIR, 'tray-icon@2x.png'))
  .then(() => console.log('✅ tray-icon@2x.png (32x32)'));

// ============================================
// Generate installer images
// ============================================

// Windows installer banner (164x314)
sharp(svgBuffer)
  .resize(164, 314, { fit: 'contain', background: { r: 26, g: 115, b: 232, alpha: 1 } })
  .png()
  .toFile(path.join(ASSETS_DIR, 'installer-banner.png'))
  .then(() => console.log('✅ installer-banner.png (164x314)'));

console.log('\n📝 Note: For proper .ico and .icns files, use:');
console.log('   Windows: https://convertico.com/ or png-to-ico package');
console.log('   macOS: iconutil -c icns icon.iconset/');
console.log('   Or install: npm install png-to-ico\n');