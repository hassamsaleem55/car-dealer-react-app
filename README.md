# Car Dealer React App

A **multi-tenant car dealership platform** built with React 19, TypeScript, Vite, and Tailwind CSS. Dynamically renders dealer-specific themes and content with optimized performance and accessibility.

## 🚀 Quick Start

**Prerequisites:** Node.js 18+

```bash
# 1. Clone and install
git clone <repository-url>
cd car-dealer-react-app
npm install

# 2. Create .env file
VITE_DEALER=motors-hub
VITE_API_BASE_URL=https://api.motors-hub.co.uk
VITE_DEALER_TOKEN=your-token

# 3. Start dev server
npm run dev
# Open http://localhost:5173
```

## 📁 Structure

```
car-dealer-react-app/
├── dealers/              # Multi-tenant configs
│   ├── motors-hub/      # Dealer 1
│   │   ├── setup.json   # Pages, sections, variants
│   │   ├── style.css    # Custom CSS variables
│   │   └── images/      # Logos, assets
│   └── auto-pro/        # Dealer 2
├── public/
│   ├── robots.txt       # SEO crawlers
│   ├── sitemap.xml      # SEO sitemap
│   └── images/          # Shared assets
├── src/
│   ├── app-layouts/     # Navbar, footer, meta manager
│   ├── components/      # Reusable UI components
│   ├── core/            # Context, providers, utilities
│   ├── elements/        # Base UI elements
│   ├── sections/        # Page sections with variants
│   └── types/           # TypeScript definitions
└── vercel.json          # Deployment config
```

## ✨ Features

**Multi-Tenant**
- Dynamic dealer switching via `VITE_DEALER`
- Isolated configs in `dealers/{dealer}/setup.json`
- Custom CSS variables per dealer

**Performance**
- ✅ Code splitting & lazy loading
- ✅ Optimized builds (4-5s build time)
- ✅ Tree shaking enabled
- ✅ Image optimization
- ✅ CSS modules

**SEO Optimized**
- ✅ Dynamic meta tags
- ✅ Open Graph & Twitter Cards
- ✅ robots.txt & sitemap.xml
- ✅ Lighthouse SEO: 100%

**Accessibility**
- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Semantic HTML
- ✅ Focus management

## 🛠️ Commands

```bash
npm run dev      # Dev server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # ESLint
```

## 🔧 Configuration

### Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_DEALER` | Dealer identifier (e.g., `motors-hub`) |
| `VITE_API_BASE_URL` | API endpoint |
| `VITE_DEALER_TOKEN` | Auth token |

### Adding a New Dealer

1. Create `dealers/{dealer}/setup.json`
2. Create `dealers/{dealer}/style.css`
3. Add `dealers/{dealer}/images/`
4. Set `VITE_DEALER={dealer}` in `.env`
5. Update `public/sitemap.xml` with dealer domain

### SEO Setup

**Before deployment:**
- Update domain in `public/robots.txt`
- Update URLs in `public/sitemap.xml`
- Set titles/descriptions in `setup.json`

**After deployment:**
- Verify `/robots.txt` and `/sitemap.xml` are accessible
- Submit sitemap to Google Search Console
- Run Lighthouse audit

## 📱 Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- React Router 7
- Framer Motion
- Swiper
- Sonner

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Manual
```bash
npm run build
# Upload dist/ to hosting
```

**Note**: `vercel.json` configured for SPA routing + static assets.

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| robots.txt returns HTML | Check `public/robots.txt` exists and `vercel.json` excludes it |
| Meta tags not updating | Verify `PageMetaContext` wraps app and `MetaManager` in Layout |
| Build errors | Run `npm install`, ensure Node.js ≥ 18 |
| Section not found | Check `folderName` and `variant` match in setup.json |
| TypeScript errors | Run `npm run build` to see all errors |

## 📚 Documentation

See [.github/copilot-instructions.md](./.github/copilot-instructions.md) for detailed development guide.

---

**License:** [Add your license]
**Contributing:** [Add guidelines]

**Made with ❤️ for car dealerships**
