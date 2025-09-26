const fs = require('fs');
const path = require('path');

// PWA Validation Script for DSAMate v2
// This script validates the PWA implementation and provides recommendations

const validationResults = {
  manifest: { passed: 0, failed: 0, warnings: 0, issues: [] },
  icons: { passed: 0, failed: 0, warnings: 0, issues: [] },
  serviceWorker: { passed: 0, failed: 0, warnings: 0, issues: [] },
  metaTags: { passed: 0, failed: 0, warnings: 0, issues: [] },
  overall: { score: 0, grade: 'F' }
};

// Required icon sizes for PWA
const REQUIRED_ICON_SIZES = [
  { size: '72x72', purpose: 'any' },
  { size: '96x96', purpose: 'any' },
  { size: '128x128', purpose: 'any' },
  { size: '144x144', purpose: 'any' },
  { size: '152x152', purpose: 'any' },
  { size: '192x192', purpose: 'any' },
  { size: '384x384', purpose: 'any' },
  { size: '512x512', purpose: 'any' },
  { size: '192x192', purpose: 'maskable' },
  { size: '512x512', purpose: 'maskable' }
];

// Required Apple Touch Icon sizes
const REQUIRED_APPLE_ICONS = [
  '57x57', '60x60', '72x72', '76x76', '114x114', 
  '120x120', '144x144', '152x152', '180x180'
];

// Required favicon sizes
const REQUIRED_FAVICON_SIZES = ['16x16', '32x32', '48x48'];

// Required Microsoft Tile sizes
const REQUIRED_MS_TILES = ['70x70', '144x144', '150x150', '310x150', '310x310'];

function validateManifest() {
  console.log('🔍 Validating PWA Manifest...');
  
  const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
  
  if (!fs.existsSync(manifestPath)) {
    validationResults.manifest.failed++;
    validationResults.manifest.issues.push('❌ manifest.json not found');
    return;
  }
  
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // Required fields
    const requiredFields = [
      'name', 'short_name', 'description', 'start_url', 
      'display', 'background_color', 'theme_color', 'icons'
    ];
    
    requiredFields.forEach(field => {
      if (manifest[field]) {
        validationResults.manifest.passed++;
      } else {
        validationResults.manifest.failed++;
        validationResults.manifest.issues.push(`❌ Missing required field: ${field}`);
      }
    });
    
    // Validate display mode
    const validDisplayModes = ['fullscreen', 'standalone', 'minimal-ui', 'browser'];
    if (validDisplayModes.includes(manifest.display)) {
      validationResults.manifest.passed++;
    } else {
      validationResults.manifest.failed++;
      validationResults.manifest.issues.push(`❌ Invalid display mode: ${manifest.display}`);
    }
    
    // Validate orientation
    const validOrientations = ['portrait', 'landscape', 'portrait-primary', 'landscape-primary', 'any'];
    if (validOrientations.includes(manifest.orientation)) {
      validationResults.manifest.passed++;
    } else {
      validationResults.manifest.warnings++;
      validationResults.manifest.issues.push(`⚠️ Consider specifying orientation: ${manifest.orientation || 'not specified'}`);
    }
    
    // Validate categories
    if (manifest.categories && Array.isArray(manifest.categories) && manifest.categories.length > 0) {
      validationResults.manifest.passed++;
    } else {
      validationResults.manifest.warnings++;
      validationResults.manifest.issues.push('⚠️ Consider adding categories for better app store visibility');
    }
    
    // Validate shortcuts
    if (manifest.shortcuts && Array.isArray(manifest.shortcuts) && manifest.shortcuts.length > 0) {
      validationResults.manifest.passed++;
    } else {
      validationResults.manifest.warnings++;
      validationResults.manifest.issues.push('⚠️ Consider adding app shortcuts for better UX');
    }
    
    console.log('✅ Manifest validation complete');
    
  } catch (error) {
    validationResults.manifest.failed++;
    validationResults.manifest.issues.push(`❌ Invalid JSON in manifest.json: ${error.message}`);
  }
}

function validateIcons() {
  console.log('🔍 Validating Icons...');
  
  const iconsDir = path.join(__dirname, '..', 'public', 'icons');
  const appleDir = path.join(__dirname, '..', 'public', 'icons', 'apple');
  const microsoftDir = path.join(__dirname, '..', 'public', 'icons', 'microsoft');
  
  // Check if icons directory exists
  if (!fs.existsSync(iconsDir)) {
    validationResults.icons.failed++;
    validationResults.icons.issues.push('❌ Icons directory not found');
    return;
  }
  
  // Validate PWA icons
  REQUIRED_ICON_SIZES.forEach(icon => {
    const filename = `icon-${icon.size}${icon.purpose === 'maskable' ? '-maskable' : ''}.png`;
    const filePath = path.join(iconsDir, filename);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > 0) {
        validationResults.icons.passed++;
      } else {
        validationResults.icons.failed++;
        validationResults.icons.issues.push(`❌ Empty icon file: ${filename}`);
      }
    } else {
      validationResults.icons.failed++;
      validationResults.icons.issues.push(`❌ Missing icon: ${filename}`);
    }
  });
  
  // Validate Apple Touch Icons
  if (fs.existsSync(appleDir)) {
    REQUIRED_APPLE_ICONS.forEach(size => {
      const filename = `apple-touch-icon-${size}.png`;
      const filePath = path.join(appleDir, filename);
      
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        if (stats.size > 0) {
          validationResults.icons.passed++;
        } else {
          validationResults.icons.failed++;
          validationResults.icons.issues.push(`❌ Empty Apple icon: ${filename}`);
        }
      } else {
        validationResults.icons.warnings++;
        validationResults.icons.issues.push(`⚠️ Missing Apple icon: ${filename}`);
      }
    });
  } else {
    validationResults.icons.warnings++;
    validationResults.icons.issues.push('⚠️ Apple icons directory not found');
  }
  
  // Validate Microsoft Tiles
  if (fs.existsSync(microsoftDir)) {
    REQUIRED_MS_TILES.forEach(size => {
      const filename = `mstile-${size}.png`;
      const filePath = path.join(microsoftDir, filename);
      
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        if (stats.size > 0) {
          validationResults.icons.passed++;
        } else {
          validationResults.icons.failed++;
          validationResults.icons.issues.push(`❌ Empty Microsoft tile: ${filename}`);
        }
      } else {
        validationResults.icons.warnings++;
        validationResults.icons.issues.push(`⚠️ Missing Microsoft tile: ${filename}`);
      }
    });
  } else {
    validationResults.icons.warnings++;
    validationResults.icons.issues.push('⚠️ Microsoft tiles directory not found');
  }
  
  // Validate favicons
  const publicDir = path.join(__dirname, '..', 'public');
  REQUIRED_FAVICON_SIZES.forEach(size => {
    const filename = `favicon-${size}.png`;
    const filePath = path.join(publicDir, filename);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > 0) {
        validationResults.icons.passed++;
      } else {
        validationResults.icons.failed++;
        validationResults.icons.issues.push(`❌ Empty favicon: ${filename}`);
      }
    } else {
      validationResults.icons.warnings++;
      validationResults.icons.issues.push(`⚠️ Missing favicon: ${filename}`);
    }
  });
  
  // Check for SVG favicon
  const svgFavicon = path.join(publicDir, 'favicon.svg');
  if (fs.existsSync(svgFavicon)) {
    validationResults.icons.passed++;
  } else {
    validationResults.icons.warnings++;
    validationResults.icons.issues.push('⚠️ Consider adding SVG favicon for better scalability');
  }
  
  console.log('✅ Icons validation complete');
}

function validateServiceWorker() {
  console.log('🔍 Validating Service Worker...');
  
  const swPath = path.join(__dirname, '..', 'public', 'sw.js');
  const swEnhancedPath = path.join(__dirname, '..', 'public', 'sw-enhanced.js');
  
  if (fs.existsSync(swPath)) {
    const stats = fs.statSync(swPath);
    if (stats.size > 0) {
      validationResults.serviceWorker.passed++;
    } else {
      validationResults.serviceWorker.failed++;
      validationResults.serviceWorker.issues.push('❌ Empty service worker file');
    }
  } else {
    validationResults.serviceWorker.failed++;
    validationResults.serviceWorker.issues.push('❌ Service worker not found');
  }
  
  if (fs.existsSync(swEnhancedPath)) {
    validationResults.serviceWorker.passed++;
  } else {
    validationResults.serviceWorker.warnings++;
    validationResults.serviceWorker.issues.push('⚠️ Enhanced service worker not found');
  }
  
  console.log('✅ Service Worker validation complete');
}

function validateMetaTags() {
  console.log('🔍 Validating Meta Tags...');
  
  const layoutPath = path.join(__dirname, '..', 'app', 'layout.tsx');
  
  if (!fs.existsSync(layoutPath)) {
    validationResults.metaTags.failed++;
    validationResults.metaTags.issues.push('❌ Layout file not found');
    return;
  }
  
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  // Check for essential meta tags
  const essentialTags = [
    'apple-mobile-web-app-capable',
    'apple-mobile-web-app-status-bar-style',
    'apple-mobile-web-app-title',
    'mobile-web-app-capable',
    'msapplication-config',
    'msapplication-TileColor'
  ];
  
  essentialTags.forEach(tag => {
    if (layoutContent.includes(tag)) {
      validationResults.metaTags.passed++;
    } else {
      validationResults.metaTags.warnings++;
      validationResults.metaTags.issues.push(`⚠️ Consider adding meta tag: ${tag}`);
    }
  });
  
  // Check for favicon links
  const faviconLinks = [
    'favicon.ico',
    'favicon.svg',
    'apple-touch-icon',
    'mask-icon'
  ];
  
  faviconLinks.forEach(link => {
    if (layoutContent.includes(link)) {
      validationResults.metaTags.passed++;
    } else {
      validationResults.metaTags.warnings++;
      validationResults.metaTags.issues.push(`⚠️ Consider adding favicon link: ${link}`);
    }
  });
  
  console.log('✅ Meta Tags validation complete');
}

function calculateOverallScore() {
  const totalPassed = Object.values(validationResults)
    .filter(result => result.passed !== undefined)
    .reduce((sum, result) => sum + result.passed, 0);
  
  const totalFailed = Object.values(validationResults)
    .filter(result => result.failed !== undefined)
    .reduce((sum, result) => sum + result.failed, 0);
  
  const totalWarnings = Object.values(validationResults)
    .filter(result => result.warnings !== undefined)
    .reduce((sum, result) => sum + result.warnings, 0);
  
  const total = totalPassed + totalFailed + totalWarnings;
  const score = total > 0 ? Math.round((totalPassed / total) * 100) : 0;
  
  let grade = 'F';
  if (score >= 90) grade = 'A';
  else if (score >= 80) grade = 'B';
  else if (score >= 70) grade = 'C';
  else if (score >= 60) grade = 'D';
  
  validationResults.overall.score = score;
  validationResults.overall.grade = grade;
  
  return { score, grade, totalPassed, totalFailed, totalWarnings };
}

function generateReport() {
  console.log('\n📊 PWA Validation Report');
  console.log('='.repeat(50));
  
  const { score, grade, totalPassed, totalFailed, totalWarnings } = calculateOverallScore();
  
  console.log(`\n🎯 Overall Score: ${score}% (Grade: ${grade})`);
  console.log(`✅ Passed: ${totalPassed}`);
  console.log(`❌ Failed: ${totalFailed}`);
  console.log(`⚠️ Warnings: ${totalWarnings}`);
  
  console.log('\n📋 Detailed Results:');
  
  Object.entries(validationResults).forEach(([category, result]) => {
    if (category === 'overall') return;
    
    console.log(`\n${category.toUpperCase()}:`);
    if (result.issues.length > 0) {
      result.issues.forEach(issue => console.log(`  ${issue}`));
    } else {
      console.log('  ✅ All checks passed!');
    }
  });
  
  console.log('\n🚀 Recommendations:');
  
  if (score < 80) {
    console.log('  • Fix all failed checks first');
    console.log('  • Address warnings for better PWA experience');
    console.log('  • Run icon generation script: npm run generate:icons');
  } else if (score < 90) {
    console.log('  • Address remaining warnings');
    console.log('  • Consider adding more advanced PWA features');
  } else {
    console.log('  • Excellent PWA implementation!');
    console.log('  • Consider adding advanced features like push notifications');
  }
  
  console.log('\n📚 PWA Testing Checklist:');
  console.log('  • Test installation on mobile devices');
  console.log('  • Verify offline functionality');
  console.log('  • Check app shortcuts work');
  console.log('  • Test on different browsers (Chrome, Safari, Edge)');
  console.log('  • Validate with Lighthouse PWA audit');
  
  return validationResults;
}

// Main validation function
function validatePWA() {
  console.log('🚀 Starting PWA Validation for DSAMate v2...\n');
  
  validateManifest();
  validateIcons();
  validateServiceWorker();
  validateMetaTags();
  
  const report = generateReport();
  
  // Save report to file
  const reportPath = path.join(__dirname, '..', 'pwa-validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Report saved to: ${reportPath}`);
  
  return report;
}

// Run validation if called directly
if (require.main === module) {
  validatePWA();
}

module.exports = { validatePWA, validationResults };
