# Bundle Size Optimization Notes

## Large Bundle Alert

The `moment-CyVMhh_6.js` chunk is 792.98 kB, which is significantly larger than our 250 KB target.

## Recommendations for Further Optimization

### 1. Replace Moment.js with date-fns or dayjs
Moment.js is a large library. Consider replacing it with a smaller alternative:

**Option A: date-fns** (modular, tree-shakeable)
```bash
npm install date-fns
```

**Option B: dayjs** (Moment.js API compatible, 2KB)
```bash
npm install dayjs
```

### 2. If keeping Moment.js, use moment-locales-webpack-plugin
Add to vite.config.ts plugins:
```typescript
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';

// In plugins array:
MomentLocalesPlugin({
  localesToKeep: ['en-gb'], // Keep only needed locales
})
```

### 3. Lazy load moment.js where possible
```tsx
// Instead of:
import moment from 'moment-timezone';

// Use:
const moment = await import('moment-timezone');
```

### 4. Split moment.js further
If moment is only used in specific pages, ensure those pages are properly code-split.

## Current Bundle Analysis

| Chunk | Size | Status |
|-------|------|--------|
| moment.js | 792.98 KB | ⚠️ Too large |
| react-dom | 180.42 KB | ✅ Acceptable |
| details | 93.50 KB | ✅ Good |
| swiper | 92.82 KB | ✅ Good |
| framer-motion | 85.20 KB | ✅ Good |
| router | 79.68 KB | ✅ Good |
| shared-c | 64.97 KB | ✅ Good |

## Action Items

1. **High Priority**: Replace moment.js with dayjs (saves ~790 KB)
2. **Medium Priority**: Further split shared-c chunk if possible
3. **Low Priority**: Review and optimize vendor chunk

## Expected Improvements

After replacing moment.js with dayjs:
- Initial bundle size: -790 KB (~97% reduction)
- Time to Interactive: -1.5s improvement
- Lighthouse Performance: +10-15 points
