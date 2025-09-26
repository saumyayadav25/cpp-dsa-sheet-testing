const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// High-quality icon generation script using fav.jpg as source
// This script creates professional-quality icons for all platforms

const sourceImage = path.join(__dirname, '..', 'public', 'fav.jpg');

// Icon configuration
const iconConfig = {
  // Standard PWA icon sizes
  pwa: [
    { size: 72, filename: 'icon-72x72.png' },
    { size: 96, filename: 'icon-96x96.png' },
    { size: 128, filename: 'icon-128x128.png' },
    { size: 144, filename: 'icon-144x144.png' },
    { size: 152, filename: 'icon-152x152.png' },
    { size: 192, filename: 'icon-192x192.png' },
    { size: 384, filename: 'icon-384x384.png' },
    { size: 512, filename: 'icon-512x512.png' }
  ],
  
  // Maskable icons (for Android adaptive icons)
  maskable: [
    { size: 192, filename: 'icon-192x192-maskable.png' },
    { size: 512, filename: 'icon-512x512-maskable.png' }
  ],
  
  // Apple Touch Icons
  apple: [
    { size: 57, filename: 'apple-touch-icon-57x57.png' },
    { size: 60, filename: 'apple-touch-icon-60x60.png' },
    { size: 72, filename: 'apple-touch-icon-72x72.png' },
    { size: 76, filename: 'apple-touch-icon-76x76.png' },
    { size: 114, filename: 'apple-touch-icon-114x114.png' },
    { size: 120, filename: 'apple-touch-icon-120x120.png' },
    { size: 144, filename: 'apple-touch-icon-144x144.png' },
    { size: 152, filename: 'apple-touch-icon-152x152.png' },
    { size: 180, filename: 'apple-touch-icon-180x180.png' }
  ],
  
  // Favicon sizes
  favicon: [
    { size: 16, filename: 'favicon-16x16.png' },
    { size: 32, filename: 'favicon-32x32.png' },
    { size: 48, filename: 'favicon-48x48.png' }
  ],
  
  // Microsoft Tiles
  microsoft: [
    { size: 70, filename: 'mstile-70x70.png' },
    { size: 144, filename: 'mstile-144x144.png' },
    { size: 150, filename: 'mstile-150x150.png' },
    { size: 310, filename: 'mstile-310x310.png' }
  ],
  
  // Shortcut icons
  shortcuts: [
    { name: 'practice', filename: 'shortcut-practice.png', size: 96 },
    { name: 'progress', filename: 'shortcut-progress.png', size: 96 },
    { name: 'flashcards', filename: 'shortcut-flashcards.png', size: 96 }
  ]
};

const outputDirs = {
  icons: path.join(__dirname, '..', 'public', 'icons'),
  favicons: path.join(__dirname, '..', 'public'),
  apple: path.join(__dirname, '..', 'public', 'icons', 'apple'),
  microsoft: path.join(__dirname, '..', 'public', 'icons', 'microsoft'),
  shortcuts: path.join(__dirname, '..', 'public', 'icons', 'shortcuts')
};

// Ensure all directories exist
Object.values(outputDirs).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${path.basename(dir)}`);
  }
});

// Check if ImageMagick is available
function checkImageMagick() {
  try {
    execSync('magick -version', { stdio: 'ignore' });
    return 'magick';
  } catch (error) {
    try {
      execSync('convert -version', { stdio: 'ignore' });
      return 'convert';
    } catch (error) {
      return null;
    }
  }
}

// Generate high-quality icon using ImageMagick
function generateHighQualityIcon(inputPath, outputPath, size, options = {}) {
  const { background = 'transparent', quality = 95, sharpen = true } = options;
  
  try {
    const command = `magick "${inputPath}" -resize ${size}x${size} -quality ${quality} -unsharp 0x0.75+0.75+0.008 -background transparent "${outputPath}"`;
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch (error) {
    try {
      const command = `convert "${inputPath}" -resize ${size}x${size} -quality ${quality} -unsharp 0x0.75+0.75+0.008 -background transparent "${outputPath}"`;
      execSync(command, { stdio: 'ignore' });
      return true;
    } catch (error) {
      console.error(`❌ Failed to generate ${outputPath}:`, error.message);
      return false;
    }
  }
}

// Create maskable icon (with padding for Android adaptive icons)
function generateMaskableIcon(inputPath, outputPath, size) {
  const padding = Math.round(size * 0.1); // 10% padding
  const iconSize = size - (padding * 2);
  
  try {
    const command = `magick "${inputPath}" -resize ${iconSize}x${iconSize} -quality 95 -unsharp 0x0.75+0.75+0.008 -background transparent -gravity center -extent ${size}x${size} "${outputPath}"`;
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch (error) {
    try {
      const command = `convert "${inputPath}" -resize ${iconSize}x${iconSize} -quality 95 -unsharp 0x0.75+0.75+0.008 -background transparent -gravity center -extent ${size}x${size} "${outputPath}"`;
      execSync(command, { stdio: 'ignore' });
      return true;
    } catch (error) {
      console.error(`❌ Failed to generate maskable icon ${outputPath}:`, error.message);
      return false;
    }
  }
}

// Generate favicon.ico with multiple sizes
function generateFavicon(inputPath, outputPath) {
  try {
    const command = `magick "${inputPath}" -resize 32x32 -quality 95 -unsharp 0x0.75+0.75+0.008 "${outputPath}"`;
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch (error) {
    try {
      const command = `convert "${inputPath}" -resize 32x32 -quality 95 -unsharp 0x0.75+0.75+0.008 "${outputPath}"`;
      execSync(command, { stdio: 'ignore' });
      return true;
    } catch (error) {
      console.error(`❌ Failed to generate favicon.ico:`, error.message);
      return false;
    }
  }
}

// Generate Apple Touch Icon with white background
function generateAppleIcon(inputPath, outputPath, size) {
  try {
    const command = `magick "${inputPath}" -resize ${size}x${size} -quality 95 -unsharp 0x0.75+0.75+0.008 -background white -gravity center -extent ${size}x${size} "${outputPath}"`;
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch (error) {
    try {
      const command = `convert "${inputPath}" -resize ${size}x${size} -quality 95 -unsharp 0x0.75+0.75+0.008 -background white -gravity center -extent ${size}x${size} "${outputPath}"`;
      execSync(command, { stdio: 'ignore' });
      return true;
    } catch (error) {
      console.error(`❌ Failed to generate Apple icon ${outputPath}:`, error.message);
      return false;
    }
  }
}

// Generate Microsoft Tile with dark background
function generateMicrosoftTile(inputPath, outputPath, size) {
  try {
    const command = `magick "${inputPath}" -resize ${size}x${size} -quality 95 -unsharp 0x0.75+0.75+0.008 -background "#0f172a" -gravity center -extent ${size}x${size} "${outputPath}"`;
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch (error) {
    try {
      const command = `convert "${inputPath}" -resize ${size}x${size} -quality 95 -unsharp 0x0.75+0.75+0.008 -background "#0f172a" -gravity center -extent ${size}x${size} "${outputPath}"`;
      execSync(command, { stdio: 'ignore' });
      return true;
    } catch (error) {
      console.error(`❌ Failed to generate Microsoft tile ${outputPath}:`, error.message);
      return false;
    }
  }
}

// Generate wide Microsoft tile (310x150)
function generateWideMicrosoftTile(inputPath, outputPath) {
  try {
    const command = `magick "${inputPath}" -resize 150x150 -quality 95 -unsharp 0x0.75+0.75+0.008 -background "#0f172a" -gravity center -extent 310x150 "${outputPath}"`;
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch (error) {
    try {
      const command = `convert "${inputPath}" -resize 150x150 -quality 95 -unsharp 0x0.75+0.75+0.008 -background "#0f172a" -gravity center -extent 310x150 "${outputPath}"`;
      execSync(command, { stdio: 'ignore' });
      return true;
    } catch (error) {
      console.error(`❌ Failed to generate wide Microsoft tile:`, error.message);
      return false;
    }
  }
}

// Main generation function
async function generateAllIcons() {
  console.log('🚀 Starting high-quality icon generation from fav.jpg...');
  
  // Check if source image exists
  if (!fs.existsSync(sourceImage)) {
    console.error('❌ Source image fav.jpg not found!');
    return;
  }
  
  const imageMagickCommand = checkImageMagick();
  if (!imageMagickCommand) {
    console.error('❌ ImageMagick not found! Please install ImageMagick:');
    console.log('   Windows: choco install imagemagick');
    console.log('   macOS: brew install imagemagick');
    console.log('   Ubuntu: sudo apt-get install imagemagick');
    return;
  }
  
  console.log(`✅ Using ImageMagick (${imageMagickCommand}) for high-quality generation`);
  console.log(`📁 Source image: ${path.basename(sourceImage)}`);
  
  let successCount = 0;
  let totalCount = 0;
  
  // Generate PWA icons
  console.log('\n📱 Generating high-quality PWA icons...');
  for (const icon of iconConfig.pwa) {
    totalCount++;
    const outputPath = path.join(outputDirs.icons, icon.filename);
    
    if (generateHighQualityIcon(sourceImage, outputPath, icon.size)) {
      console.log(`✅ Generated: ${icon.filename} (${icon.size})`);
      successCount++;
    } else {
      console.log(`❌ Failed: ${icon.filename}`);
    }
  }
  
  // Generate maskable icons
  console.log('\n🎭 Generating maskable icons...');
  for (const icon of iconConfig.maskable) {
    totalCount++;
    const outputPath = path.join(outputDirs.icons, icon.filename);
    
    if (generateMaskableIcon(sourceImage, outputPath, icon.size)) {
      console.log(`✅ Generated: ${icon.filename} (${icon.size})`);
      successCount++;
    } else {
      console.log(`❌ Failed: ${icon.filename}`);
    }
  }
  
  // Generate Apple Touch Icons
  console.log('\n🍎 Generating Apple Touch Icons...');
  for (const icon of iconConfig.apple) {
    totalCount++;
    const outputPath = path.join(outputDirs.apple, icon.filename);
    
    if (generateAppleIcon(sourceImage, outputPath, icon.size)) {
      console.log(`✅ Generated: ${icon.filename} (${icon.size})`);
      successCount++;
    } else {
      console.log(`❌ Failed: ${icon.filename}`);
    }
  }
  
  // Generate favicons
  console.log('\n🌐 Generating favicons...');
  for (const icon of iconConfig.favicon) {
    totalCount++;
    const outputPath = path.join(outputDirs.favicons, icon.filename);
    
    if (generateHighQualityIcon(sourceImage, outputPath, icon.size)) {
      console.log(`✅ Generated: ${icon.filename} (${icon.size})`);
      successCount++;
    } else {
      console.log(`❌ Failed: ${icon.filename}`);
    }
  }
  
  // Generate favicon.ico
  totalCount++;
  const faviconPath = path.join(outputDirs.favicons, 'favicon.ico');
  if (generateFavicon(sourceImage, faviconPath)) {
    console.log(`✅ Generated: favicon.ico`);
    successCount++;
  } else {
    console.log(`❌ Failed: favicon.ico`);
  }
  
  // Generate Microsoft Tiles
  console.log('\n🪟 Generating Microsoft Tiles...');
  for (const tile of iconConfig.microsoft) {
    totalCount++;
    const outputPath = path.join(outputDirs.microsoft, tile.filename);
    
    if (generateMicrosoftTile(sourceImage, outputPath, tile.size)) {
      console.log(`✅ Generated: ${tile.filename} (${tile.size})`);
      successCount++;
    } else {
      console.log(`❌ Failed: ${tile.filename}`);
    }
  }
  
  // Generate wide Microsoft tile
  totalCount++;
  const wideTilePath = path.join(outputDirs.microsoft, 'mstile-310x150.png');
  if (generateWideMicrosoftTile(sourceImage, wideTilePath)) {
    console.log(`✅ Generated: mstile-310x150.png (310x150)`);
    successCount++;
  } else {
    console.log(`❌ Failed: mstile-310x150.png`);
  }
  
  // Generate shortcut icons
  console.log('\n⚡ Generating shortcut icons...');
  for (const icon of iconConfig.shortcuts) {
    totalCount++;
    const outputPath = path.join(outputDirs.shortcuts, icon.filename);
    
    if (generateHighQualityIcon(sourceImage, outputPath, icon.size)) {
      console.log(`✅ Generated: ${icon.filename} (${icon.size})`);
      successCount++;
    } else {
      console.log(`❌ Failed: ${icon.filename}`);
    }
  }
  
  console.log('\n📊 Generation Summary:');
  console.log(`✅ Successfully generated: ${successCount}/${totalCount} high-quality icons`);
  console.log(`🎯 Quality: 95% JPEG quality with sharpening applied`);
  console.log(`📱 Source: fav.jpg (high-quality original)`);
  
  if (successCount === totalCount) {
    console.log('\n🎉 All icons generated successfully!');
    console.log('📝 Next steps:');
    console.log('   1. Test PWA installation on different devices');
    console.log('   2. Run PWA validation: npm run pwa:validate');
    console.log('   3. Check icon quality on various platforms');
  } else {
    console.log('\n⚠️ Some icons failed to generate. Check ImageMagick installation.');
  }
}

// Run the generation
if (require.main === module) {
  generateAllIcons().catch(console.error);
}

module.exports = { generateAllIcons, iconConfig, outputDirs };
