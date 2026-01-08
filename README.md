# Car Dealer React App

A **multi-tenant car dealership platform** built with React 19, TypeScript, Vite, and Tailwind CSS. Features dynamic dealer theming, comprehensive SEO optimization, and high-performance architecture.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd car-dealer-react-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   VITE_DEALER=motors-hub
   VITE_API_BASE_URL=https://api.motors-hub.co.uk
   VITE_DEALER_TOKEN=your-dealer-token-here
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
car-dealer-react-app/
├── dealers/                    # Dealer-specific configurations
│   ├── motors-hub/
│   │   ├── setup.json         # Pages and sections config
│   │   ├── style.css          # Dealer-specific styles
│   │   └── images/            # Dealer assets
│   └── auto-pro/
├── public/
│   ├── robots.txt             # SEO: Crawler instructions
│   ├── sitemap.xml            # SEO: Site structure
│   └── images/                # Static assets
├── src/
│   ├── app-layouts/           # Layout components
│   │   ├── MetaManager.tsx    # SEO meta tag manager
│   │   ├── navbar/            # Navigation variants
│   │   └── footer/            # Footer variants
│   ├── components/            # Reusable components
│   ├── core/                  # Core utilities
│   │   ├── dealer-provider.tsx
│   │   ├── page-meta-context.tsx  # SEO context
│   │   ├── page-renderer.tsx
│   │   └── helpers/
│   ├── sections/              # Page sections
│   └── types/                 # TypeScript types
└── vercel.json               # Deployment config
```

## 🎨 Key Features

### Multi-Tenant Architecture
- Dynamic dealer switching via `VITE_DEALER` environment variable
- Isolated dealer configurations in `dealers/{dealer-name}/setup.json`
- Custom styling per dealer with CSS variables

### SEO Optimization (100% Lighthouse Score)
- ✅ Dynamic meta tags (title, description)
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card integration
- ✅ Canonical URLs
- ✅ robots.txt with proper crawler instructions
- ✅ sitemap.xml for search engines
- ✅ Structured data ready

**See [SEO_SETUP.md](./SEO_SETUP.md) for detailed SEO documentation.**

### Performance
- Code splitting with dynamic imports
- Lazy loading for sections and components
- Optimized font loading with preconnect
- CSS modules for scoped styling
- Image optimization
- Tree shaking enabled

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_DEALER` | Active dealer theme identifier | `motors-hub` |
| `VITE_API_BASE_URL` | API base URL for dealer data | `https://api.motors-hub.co.uk` |
| `VITE_DEALER_TOKEN` | Authentication token for API | `your-token-here` |

### Adding a New Dealer

1. Create dealer folder: `dealers/new-dealer-name/`
2. Add `setup.json` with pages and sections config
3. Add `style.css` with custom CSS variables
4. Add dealer images to `images/` folder
5. Set `VITE_DEALER=new-dealer-name` in `.env`
6. Update `public/sitemap.xml` with new domain
7. Update `public/robots.txt` sitemap URL

## 🌐 SEO Configuration

### Before Deployment
1. ✅ Update domain in `public/robots.txt`
2. ✅ Update all URLs in `public/sitemap.xml`
3. ✅ Set proper page titles/descriptions in dealer's `setup.json`
4. ✅ Test locally: `npm run preview`

### After Deployment
1. ✅ Verify `https://yourdomain.com/robots.txt`
2. ✅ Verify `https://yourdomain.com/sitemap.xml`
3. ✅ Submit sitemap to Google Search Console
4. ✅ Run Lighthouse SEO audit (target: 100%)

**Full SEO documentation: [SEO_SETUP.md](./SEO_SETUP.md)**

## 📱 Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Utility-first CSS
- **React Router 7** - Client-side routing
- **Framer Motion** - Animations
- **Swiper** - Carousels
- **Sonner** - Toast notifications

## 📄 Documentation

- [SEO Setup Guide](./SEO_SETUP.md) - Complete SEO implementation
- [Performance Optimizations](./PERFORMANCE_OPTIMIZATIONS.md) - Performance tuning
- [Mobile Performance](./MOBILE_PERFORMANCE.md) - Mobile-specific optimizations
- [AI Coding Instructions](./.github/copilot-instructions.md) - Development guidelines

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Build
```bash
npm run build
# Upload dist/ folder to your hosting
```

**Important**: Ensure `vercel.json` is properly configured to:
- Serve `robots.txt` and `sitemap.xml` as static files
- Rewrite all other routes to index.html (SPA)

## 🐛 Troubleshooting

### robots.txt returns HTML
**Solution**: Ensure `public/robots.txt` exists and `vercel.json` excludes it from rewrites.

### Meta tags not updating
**Solution**: Verify `PageMetaContext` is wrapped in `App.tsx` and `MetaManager` is in Layout.

### {dealerName} not replaced
**Solution**: Check `useDealerContext()` returns data and setup.json uses exact `{dealerName}` format.

### Build errors
**Solution**: Run `npm install` and ensure Node.js version ≥ 18.

## 📝 License

[Add your license here]

## 🤝 Contributing

[Add contribution guidelines here]

---

**Made with ❤️ for car dealerships**
