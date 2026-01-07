# Quick Mobile Performance Checklist

Run these commands after building:

```bash
# 1. Build optimized version
npm run build

# 2. Preview locally
npm run preview

# 3. Test with Lighthouse (mobile)
npx lighthouse http://localhost:4173 --emulated-form-factor=mobile --throttling-method=simulate --only-categories=performance
```

## What Changed:

✅ Font loading: 21 weights → 4 weights (-70% font size)
✅ Minification: Terser with aggressive compression
✅ Animations: Auto-disabled on low-power devices
✅ Video: preload="metadata" instead of "auto" (-2.5MB)
✅ Chunk splitting: Optimized for mobile networks

## Expected Score: 70-80 (from 41)

Test and verify!