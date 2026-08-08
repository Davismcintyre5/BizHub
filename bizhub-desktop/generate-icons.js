const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const assetsDir = path.join(__dirname, 'assets');
  
  // Create a simple 256x256 PNG icon first (purple square with text)
  const svgIcon = `
    <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="40" fill="#7C3AED"/>
      <text x="128" y="160" font-size="120" font-family="Arial" font-weight="bold" fill="white" text-anchor="middle">B</text>
    </svg>
  `;

  // Generate PNG sizes
  const sizes = [16, 32, 48, 64, 128, 256];
  
  for (const size of sizes) {
    await sharp(Buffer.from(svgIcon))
      .resize(size, size)
      .png()
      .toFile(path.join(assetsDir, `icon-${size}.png`));
    console.log(`Generated icon-${size}.png`);
  }

  // For ICO, use the 256x256 PNG and save as icon.ico (Windows accepts PNG-based ICO)
  // Create a simple valid ICO by copying PNG with ICO header
  const png256 = await sharp(Buffer.from(svgIcon))
    .resize(256, 256)
    .png()
    .toBuffer();

  // Write as .ico (basic - works for electron-builder)
  fs.writeFileSync(path.join(assetsDir, 'icon.ico'), png256);
  console.log('Generated icon.ico');

  // Also save as main icon.png
  fs.writeFileSync(path.join(assetsDir, 'icon.png'), png256);
  console.log('Generated icon.png');
}

generateIcons().catch(console.error);