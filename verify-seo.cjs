#!/usr/bin/env node

/**
 * SEO Verification Script
 * Checks that all SEO-related files are properly configured
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
};

let hasErrors = false;

console.log('\n🔍 SEO Configuration Verification\n');

// Check robots.txt
log.info('Checking robots.txt...');
const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  
  if (robotsContent.includes('yourdomain.com')) {
    log.warn('robots.txt still contains placeholder domain "yourdomain.com"');
    log.info('  → Update the Sitemap URL with your actual domain');
    hasErrors = true;
  } else {
    log.success('robots.txt exists and domain is configured');
  }
  
  if (!robotsContent.includes('Sitemap:')) {
    log.error('robots.txt missing Sitemap directive');
    hasErrors = true;
  }
} else {
  log.error('robots.txt not found in public/ folder');
  hasErrors = true;
}

// Check sitemap.xml
log.info('\nChecking sitemap.xml...');
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  
  if (sitemapContent.includes('yourdomain.com')) {
    log.warn('sitemap.xml still contains placeholder domain "yourdomain.com"');
    log.info('  → Update all <loc> URLs with your actual domain');
    hasErrors = true;
  } else {
    log.success('sitemap.xml exists and domain is configured');
  }
  
  if (!sitemapContent.includes('<?xml')) {
    log.error('sitemap.xml is not valid XML');
    hasErrors = true;
  }
} else {
  log.error('sitemap.xml not found in public/ folder');
  hasErrors = true;
}

// Check vercel.json
log.info('\nChecking vercel.json...');
const vercelPath = path.join(process.cwd(), 'vercel.json');
if (fs.existsSync(vercelPath)) {
  const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  
  if (vercelConfig.rewrites && vercelConfig.rewrites.length > 0) {
    const rewrite = vercelConfig.rewrites[0];
    if (rewrite.source.includes('robots\\.txt') || rewrite.source.includes('sitemap\\.xml')) {
      log.success('vercel.json excludes robots.txt and sitemap.xml from rewrites');
    } else {
      log.error('vercel.json may rewrite robots.txt and sitemap.xml to index.html');
      log.info('  → Update regex to exclude these files');
      hasErrors = true;
    }
  }
} else {
  log.warn('vercel.json not found (ok if not deploying to Vercel)');
}

// Check MetaManager.tsx
log.info('\nChecking MetaManager.tsx...');
const metaManagerPath = path.join(process.cwd(), 'src', 'app-layouts', 'MetaManager.tsx');
if (fs.existsSync(metaManagerPath)) {
  const metaContent = fs.readFileSync(metaManagerPath, 'utf8');
  
  const checks = [
    { pattern: 'og:title', name: 'Open Graph title' },
    { pattern: 'twitter:card', name: 'Twitter Card' },
    { pattern: 'canonical', name: 'Canonical URL' },
    { pattern: 'theme-color', name: 'Theme color' },
  ];
  
  checks.forEach(({ pattern, name }) => {
    if (metaContent.includes(pattern)) {
      log.success(`${name} meta tag configured`);
    } else {
      log.error(`${name} meta tag missing`);
      hasErrors = true;
    }
  });
} else {
  log.error('MetaManager.tsx not found');
  hasErrors = true;
}

// Check PageMetaContext
log.info('\nChecking PageMetaContext...');
const contextPath = path.join(process.cwd(), 'src', 'core', 'page-meta-context.tsx');
if (fs.existsSync(contextPath)) {
  log.success('PageMetaContext exists');
} else {
  log.error('page-meta-context.tsx not found');
  hasErrors = true;
}

// Check index.html
log.info('\nChecking index.html...');
const indexPath = path.join(process.cwd(), 'index.html');
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  if (indexContent.includes('<title>') && !indexContent.includes('<title></title>')) {
    log.warn('index.html has hardcoded title (should be managed by MetaManager)');
  } else {
    log.success('index.html is clean (meta tags managed by React)');
  }
  
  if (indexContent.includes('charset="UTF-8"')) {
    log.success('Charset meta tag present');
  }
  
  if (indexContent.includes('viewport')) {
    log.success('Viewport meta tag present');
  }
} else {
  log.error('index.html not found');
  hasErrors = true;
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  log.error('Some SEO configuration issues found');
  log.info('Please review the warnings and errors above');
  log.info('\nRefer to SEO_SETUP.md for detailed instructions');
  process.exit(1);
} else {
  log.success('All SEO checks passed!');
  log.info('\nNext steps:');
  log.info('1. Update domain in robots.txt and sitemap.xml');
  log.info('2. Build: npm run build');
  log.info('3. Test: npm run preview');
  log.info('4. Deploy and verify on production');
  log.info('5. Submit sitemap to search engines');
  log.info('\nRun Lighthouse audit to verify 100% SEO score');
}
console.log('='.repeat(50) + '\n');
