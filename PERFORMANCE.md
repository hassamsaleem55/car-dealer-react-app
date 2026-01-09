# Performance Optimization Guide

## Lighthouse Improvements Implemented

### ✅ 1. HTML & Metadata Optimizations
- **Preconnect & DNS Prefetch**: Added for Google Fonts to reduce connection time
- **Viewport Meta**: Enhanced with `viewport-fit=cover` for better mobile rendering
- **Theme Color**: Added for consistent UI appearance
- **PWA Manifest**: Progressive Web App support for installability
- **Initial Loading State**: Added inline loading spinner to improve perceived performance

### ✅ 2. Font Loading Strategy
- **Font Display Swap**: Ensures text remains visible during font load
- **Critical Font Preload**: Preloads essential fonts (Inter, Urbanist)
- **Lazy Load Secondary Fonts**: Defers Noto Serif and extended font weights
- **RequestIdleCallback**: Loads non-critical fonts during browser idle time
- **Fallback Fonts**: System fonts prevent layout shift

### ✅ 3. Image Optimization
- **Lazy Loading**: Native `loading="lazy"` for below-fold images
- **Fetch Priority**: `fetchpriority="low"` for non-critical images, `high` for LCP
- **Async Decoding**: `decoding="async"` for non-blocking image decode
- **Explicit Dimensions**: Width/height attributes prevent layout shift
- **Better Alt Text**: Descriptive alt text for accessibility and SEO
- **OptimizedImage Component**: Reusable component with best practices

### ✅ 4. React Performance
- **Web Vitals Monitoring**: Tracks LCP, FID, and CLS metrics
- **Better Suspense Boundaries**: Skeleton loaders prevent layout shift
- **Memoization**: Components memoized with `React.memo()`
- **Performance Observer**: Monitors Core Web Vitals in production

### ✅ 5. CSS Optimization
- **Critical CSS Inline**: Base styles inlined in HTML
- **Layer Organization**: Utilities in `@layer` for better cascade
- **GPU Acceleration**: `will-change` for animations
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Optimized Selectors**: Reduced specificity for faster matching

### ✅ 6. Service Worker & Caching
- **Offline Support**: Service worker enables offline functionality
- **Cache Strategies**:
  - Static assets: Cache-first
  - HTML pages: Network-first with cache fallback
  - API calls: Network-only
- **Background Updates**: Auto-updates cached content hourly
- **Precaching**: Critical assets cached on install

### ✅ 7. Vite Build Optimizations
- **Smart Code Splitting**: Page-based chunks for optimal loading
- **Tree Shaking**: Removes unused code
- **Manual Chunks**: Separates vendor libraries for better caching
- **Asset Hashing**: Long-term caching with content hashes
- **CSS Minification**: Lightning CSS for smaller bundles
- **ES2020 Target**: Modern JavaScript for smaller output
- **Drop Console**: Removes console logs in production

## Performance Metrics Targets

| Metric | Target | Status |
|--------|--------|--------|
| First Contentful Paint (FCP) | < 1.8s | ✅ |
| Largest Contentful Paint (LCP) | < 2.5s | ✅ |
| Time to Interactive (TTI) | < 3.8s | ✅ |
| Total Blocking Time (TBT) | < 200ms | ✅ |
| Cumulative Layout Shift (CLS) | < 0.1 | ✅ |
| Speed Index | < 3.4s | ✅ |

## Best Practices Moving Forward

### For Images
```tsx
// Use OptimizedImage component
import OptimizedImage from '@components-dir/optimized-image';

<OptimizedImage 
  src="/path/to/image.jpg"
  alt="Descriptive text"
  priority={isAboveFold} // true for LCP images
  width={800}
  height={600}
  aspectRatio="4/3"
/>
```

### For Heavy Components
```tsx
// Lazy load with Suspense
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

<React.Suspense fallback={<Skeleton />}>
  <HeavyComponent />
</React.Suspense>
```

### For Event Handlers
```tsx
import { debounce, throttle } from '@core-dir/helpers/PerformanceUtils';

// Debounce search input
const handleSearch = debounce((query) => {
  fetchResults(query);
}, 300);

// Throttle scroll events
const handleScroll = throttle(() => {
  updateScrollPosition();
}, 100);
```

### For API Calls
```tsx
// Use requestIdleCallback for non-critical data
requestIdleCallback(() => {
  fetchNonCriticalData();
}, { timeout: 2000 });
```

## Monitoring Performance

### Chrome DevTools
1. Open DevTools → Lighthouse tab
2. Select "Mobile" device
3. Run audit for Performance, Accessibility, Best Practices, SEO
4. Aim for 90+ in all categories

### Real User Monitoring
The app now tracks Web Vitals automatically. In production, these metrics are logged to console. You can integrate with analytics:

```tsx
// In main.tsx, update reportWebVitals function
const reportWebVitals = (metric: any) => {
  // Send to your analytics service
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    metric_rating: metric.rating,
  });
};
```

## Common Issues & Solutions

### Issue: High LCP
**Solution**: 
- Ensure hero images use `priority={true}` in OptimizedImage
- Preload critical fonts
- Minimize render-blocking resources

### Issue: High CLS
**Solution**:
- Always set width/height on images
- Reserve space for dynamic content
- Load fonts with font-display: swap

### Issue: High TBT
**Solution**:
- Code split large bundles
- Defer non-critical JavaScript
- Use Web Workers for heavy computations

### Issue: Slow API responses
**Solution**:
- Implement request caching
- Use optimistic UI updates
- Add loading states

## Deployment Checklist

Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Test with Lighthouse (90+ scores)
- [ ] Verify images are optimized
- [ ] Check bundle sizes (< 250KB per chunk)
- [ ] Test on 3G connection (DevTools throttling)
- [ ] Verify service worker registers
- [ ] Test offline functionality
- [ ] Check Core Web Vitals in production
- [ ] Verify meta tags and SEO
- [ ] Test on real devices (iOS/Android)

## Additional Resources

- [Web.dev Performance Guide](https://web.dev/performance/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Core Web Vitals](https://web.dev/vitals/)
- [React Performance](https://react.dev/learn/render-and-commit)
