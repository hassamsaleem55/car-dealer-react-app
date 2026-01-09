# Mobile Performance Optimization Guide

## Current Status
**Target Score:** 90+ on mobile Lighthouse
**Previous Score:** 71/100

## Issues Addressed

### 1. Largest Contentful Paint (LCP) - 4.7s → Target: <2.5s
**Problem:** Slow-loading hero images and render-blocking resources

**Solutions Implemented:**
- ✅ Added critical font preloading with `fetchpriority="high"`
- ✅ Implemented WebP image format with fallback
- ✅ Added responsive image support with `srcset` and `sizes`
- ✅ Optimized hero video with `preload="metadata"` and gradient poster
- ✅ Enhanced critical CSS to prevent layout shifts
- ✅ Improved image compression with automated WebP generation

### 2. Speed Index - 7.4s → Target: <3.4s
**Problem:** Slow content rendering and large JavaScript bundles

**Solutions Implemented:**
- ✅ Enabled Brotli and Gzip compression
- ✅ Optimized chunk splitting (200KB limit per chunk)
- ✅ Improved module preloading strategy
- ✅ Added image optimization pipeline
- ✅ Lazy loading for secondary fonts
- ✅ Optimized service worker caching strategy

### 3. First Contentful Paint (FCP) - 2.0s → Target: <1.8s
**Problem:** Render-blocking resources and slow font loading

**Solutions Implemented:**
- ✅ Added DNS prefetch for API endpoints
- ✅ Preconnect to critical origins (fonts, API)
- ✅ Preload critical Inter font
- ✅ Inline critical CSS in HTML
- ✅ Optimized font loading with `font-display: swap`
- ✅ Reduced initial bundle size with better code splitting

### 4. Total Blocking Time (TBT) - 140ms ✓
**Status:** Already within target (<200ms)

### 5. Cumulative Layout Shift (CLS) - 0.079 ✓
**Status:** Already within target (<0.1)
**Additional Improvements:**
- ✅ Reserved space for hero section
- ✅ Added width/height to images
- ✅ Optimized font loading to prevent FOUT

## Key Changes Made

### 1. index.html Optimizations
```html
<!-- Added preload for critical fonts -->
<link rel="preload" href="..." as="font" type="font/woff2" crossorigin />

<!-- Added API DNS prefetch -->
<link rel="dns-prefetch" href="https://api.motors-hub.co.uk" />

<!-- Expanded critical CSS -->
- Added reset styles
- Added typography defaults
- Reserved space for hero section
- Optimized loader styles
```

### 2. Vite Configuration Enhancements
```typescript
// Added compression plugins
- Brotli compression (better ratio)
- Gzip compression (fallback)

// Added image optimization
- JPEG optimization (quality: 80)
- PNG optimization (quality: 70-80)
- Automatic WebP generation (quality: 75)

// Improved chunk splitting
- Reduced chunk size limit to 200KB
- Better preloading strategy
- Optimized manual chunks
```

### 3. OptimizedImage Component
```tsx
// New features
- Responsive images with srcset/sizes
- Automatic WebP fallback with <picture>
- Priority preloading for LCP images
- Width/height attributes for CLS prevention
- Improved fetchpriority handling
```

### 4. MetaManager Optimizations
```tsx
// Font loading improvements
- Preload critical fonts with high priority
- Lazy load secondary fonts with requestIdleCallback
- Reduced idle timeout (2000ms → 1000ms)
- Added API preconnect
- Added DNS prefetch helper
```

### 5. Hero Section Optimization
```tsx
// Video optimization
- Changed preload from "none" to "metadata"
- Improved gradient poster image
- Added aria-hidden for accessibility
```

### 6. Service Worker Improvements
```javascript
// Enhanced caching strategy
- Stale-while-revalidate for images
- Cache-first for scripts/styles/fonts
- Better error handling
- Runtime cache optimization
```

## Build Commands

```bash
# Development with hot reload
npm run dev

# Production build with optimizations
npm run build

# Production build with full optimization
npm run build:optimized

# Preview production build
npm run preview
```

## Performance Checklist

### Before Deployment
- [ ] Run `npm run build:optimized`
- [ ] Test on 3G network throttling
- [ ] Verify WebP images are generated
- [ ] Check bundle sizes (< 200KB per chunk)
- [ ] Test service worker caching
- [ ] Validate Lighthouse score on mobile
- [ ] Check Core Web Vitals in PageSpeed Insights

### Image Optimization
```bash
# Images are automatically optimized during build
# Originals: .jpg, .png
# Generated: .webp versions
# Location: dist/assets/images/
```

### Font Loading Strategy
1. **Critical fonts** (Inter): Preload immediately
2. **Secondary fonts** (Urbanist, Noto Serif): Lazy load after idle
3. **Display strategy**: `swap` to prevent invisible text

### Compression
- **Brotli**: Primary compression (best ratio)
- **Gzip**: Fallback for older browsers
- **Threshold**: Files > 1KB
- **Location**: Generated `.br` and `.gz` files

## Expected Improvements

| Metric | Before | After | Target | Status |
|--------|--------|-------|--------|--------|
| Performance | 71 | 85-92 | 90+ | 🟡 |
| LCP | 4.7s | ~2.0s | <2.5s | ✅ |
| Speed Index | 7.4s | ~3.0s | <3.4s | ✅ |
| FCP | 2.0s | ~1.5s | <1.8s | ✅ |
| TBT | 140ms | ~120ms | <200ms | ✅ |
| CLS | 0.079 | ~0.05 | <0.1 | ✅ |

## Monitoring

### Development
```javascript
// Performance monitoring is enabled in development
// Check console for metrics on page unload
```

### Production
- Use PageSpeed Insights for real-world data
- Monitor Core Web Vitals in Google Search Console
- Check bundle sizes with `vite-bundle-visualizer`

## Additional Recommendations

### 1. CDN Configuration (Vercel/Netlify)
```javascript
// Ensure these headers are set:
Cache-Control: public, max-age=31536000, immutable  // Static assets
Cache-Control: public, max-age=0, must-revalidate   // HTML
```

### 2. Image Best Practices
- Use `priority={true}` for above-the-fold images
- Add `width` and `height` to prevent CLS
- Use `loading="lazy"` for below-the-fold images
- Prefer WebP format (75% smaller than JPEG)

### 3. JavaScript Optimizations
- Code split by route
- Lazy load non-critical components
- Use dynamic imports for heavy libraries
- Tree shake unused code

### 4. Future Optimizations
- [ ] Consider using AVIF format (even better than WebP)
- [ ] Implement HTTP/2 Server Push
- [ ] Add prefetch for next likely pages
- [ ] Consider using a CDN for images
- [ ] Implement progressive image loading

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist .vite
npm install
npm run build
```

### Images Not Optimized
- Check that images are in supported formats (.jpg, .png)
- Verify imagemin plugins are installed
- Check Vite build logs for errors

### Fonts Not Loading
- Verify preconnect tags in index.html
- Check network tab for 404 errors
- Ensure font URLs are correct

### Service Worker Issues
```bash
# Clear service worker cache
# In DevTools > Application > Clear Storage
```

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Vite Optimization Guide](https://vitejs.dev/guide/build.html)
- [Image Optimization](https://web.dev/optimize-images/)
- [Font Loading](https://web.dev/font-best-practices/)
