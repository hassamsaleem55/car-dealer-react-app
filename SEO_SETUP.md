# SEO Setup Guide

## Overview
This project is configured for optimal SEO performance with a 100% Lighthouse SEO score.

## Files and Structure

### 1. **robots.txt** (`public/robots.txt`)
- Located in the `public/` folder (served as static file)
- Allows all crawlers except payment pages
- References sitemap.xml
- **Important**: Update the domain in the Sitemap line to your actual domain

```txt
# robots.txt for Car Dealer Platform
User-agent: *
Allow: /
Disallow: /Payment/

# Sitemap location
Sitemap: https://www.yourdomain.com/sitemap.xml
```

### 2. **sitemap.xml** (`public/sitemap.xml`)
- Located in the `public/` folder
- Lists all public pages with priority and change frequency
- **Important**: Update all URLs with your actual domain

### 3. **MetaManager Component** (`src/app-layouts/MetaManager.tsx`)
Centralized SEO meta tag management that dynamically handles:
- Page titles (with dealer name substitution)
- Meta descriptions
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Canonical URLs
- Favicon
- Theme color
- Font loading with preconnect

### 4. **PageMetaContext** (`src/core/page-meta-context.tsx`)
- React Context for page-specific meta data
- Allows PageRenderer to set title/description
- MetaManager consumes and applies to `<head>`

### 5. **vercel.json**
Configured to:
- Exclude robots.txt and sitemap.xml from SPA rewrites
- Set proper Content-Type headers
- Enable clean URLs

## How It Works

### Data Flow
1. **PageRenderer** sets page-specific meta (title, description) via `setPageMeta()`
2. **PageMetaContext** stores this data globally
3. **MetaManager** (rendered in Layout) consumes context and updates `<head>` tags
4. **DealerContext** provides company name for `{dealerName}` substitution

### Dynamic Meta Tags
```tsx
// In setup.json for each page:
{
  "title": "{dealerName} - Used Cars Stock",
  "description": "Browse {dealerName}'s extensive car collection"
}
```

The `{dealerName}` placeholder is automatically replaced with the actual dealer company name.

## Deployment Checklist

### Before Deploying:
1. ✅ Update domain in `public/robots.txt` Sitemap line
2. ✅ Update all URLs in `public/sitemap.xml`
3. ✅ Verify `VITE_DEALER` environment variable is set
4. ✅ Build project: `npm run build`
5. ✅ Test locally: `npm run preview`
6. ✅ Verify robots.txt: `http://localhost:4173/robots.txt`
7. ✅ Verify sitemap.xml: `http://localhost:4173/sitemap.xml`

### After Deploying:
1. ✅ Test robots.txt: `https://yourdomain.com/robots.txt`
2. ✅ Test sitemap.xml: `https://yourdomain.com/sitemap.xml`
3. ✅ Submit sitemap to Google Search Console
4. ✅ Submit sitemap to Bing Webmaster Tools
5. ✅ Run Lighthouse SEO audit (should be 100%)

## SEO Features

### ✅ Essential Meta Tags
- Title tag (dynamic per page)
- Meta description (dynamic per page)
- Canonical URLs (prevents duplicate content)
- Robots meta tag (index, follow)
- Theme color (mobile browsers)
- Viewport configuration

### ✅ Social Media Optimization
**Open Graph (Facebook/LinkedIn)**
- og:title
- og:description
- og:url
- og:type
- og:site_name
- og:image
- og:image:alt

**Twitter Cards**
- twitter:card
- twitter:title
- twitter:description
- twitter:image
- twitter:image:alt

### ✅ Performance
- Lazy font loading with display=swap
- Preconnect to font CDN
- Dynamic favicon loading
- Minimal index.html (everything loaded via React)

### ✅ Crawlability
- robots.txt properly served
- sitemap.xml with all pages
- Proper URL structure
- No broken links
- Clean URLs enabled

## Maintenance

### Adding New Pages
1. Add page to dealer's `setup.json`
2. Update `public/sitemap.xml` with new URL
3. Set appropriate `changefreq` and `priority`

### Updating Meta Tags
All meta tag updates should be done in **MetaManager.tsx** only.

### Monitoring SEO
- Use Google Search Console
- Run periodic Lighthouse audits
- Monitor Core Web Vitals
- Check for crawl errors

## Troubleshooting

### robots.txt returns HTML
- **Cause**: robots.txt not in `public/` folder or Vercel rewrite catching it
- **Fix**: Ensure file is in `public/robots.txt` and vercel.json excludes it

### Sitemap not found
- **Cause**: Similar to robots.txt issue
- **Fix**: Place in `public/sitemap.xml` and update vercel.json

### Meta tags not updating
- **Cause**: PageMetaContext not wrapped properly or MetaManager not rendered
- **Fix**: Verify context hierarchy in App.tsx and MetaManager in Layout.tsx

### {dealerName} not replaced
- **Cause**: DealerData not loaded or placeholder format incorrect
- **Fix**: Check `useDealerContext()` returns data and use exact `{dealerName}` format

## Best Practices

1. **Always set page title and description** in setup.json
2. **Use {dealerName} placeholder** for dealer-specific content
3. **Keep descriptions between 120-160 characters**
4. **Test on real devices** for mobile SEO
5. **Monitor performance** with Lighthouse regularly
6. **Update sitemap** when adding/removing pages
7. **Submit sitemaps to search engines** after updates

## Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Lighthouse SEO Audits](https://web.dev/lighthouse-seo/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [robots.txt Tester](https://www.google.com/webmasters/tools/robots-testing-tool)
