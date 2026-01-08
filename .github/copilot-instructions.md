# Car Dealer React App - Development Guide

## Architecture Overview

A **multi-tenant car dealership platform** built with React 19, TypeScript, Vite, and Tailwind CSS. The app dynamically renders dealer-specific content and themes.

### Multi-Dealer System

**How it works:**
1. `VITE_DEALER` env variable → determines active dealer (e.g., `motors-hub`)
2. `dealers/{dealer}/setup.json` → defines pages, sections, navbar/footer variants
3. `@dealers-dir` path alias → resolves to `./dealers/${VITE_DEALER}` at build time

**Critical**: Never hardcode dealer paths. Always use `@dealers-dir` alias.

## Path Aliases

```typescript
@dealers-dir/*    → dealers/{VITE_DEALER}/*  (dynamic per dealer)
@app-layout-dir/* → src/app-layouts/*
@components-dir/* → src/components/*
@core-dir/*       → src/core/*
@elements-dir/*   → src/elements/*
@sections-dir/*   → src/sections/*
@types-dir/*      → src/types/*
```

**Always use aliases** - never use relative paths like `../../`.

## Component Patterns

### 1. Section Structure

```
src/sections/{page}/{section}/
  ├── layouts/{layout}/
  │   ├── index.tsx
  │   └── css/*.module.css
  └── variants/index.tsx  # Named exports: HeroDefault, FeaturedDark, etc.
```

**Adding a variant:**
```tsx
// variants/index.tsx
import type { DealerSectionProps } from "@types-dir/dealer-props";

export function FeaturedDark({ props }: { props: DealerSectionProps }) {
  return <FeaturedOne heading={props.heading || ""} styles={darkStyles} />;
}
```

**Register in setup.json:**
```json
{
  "folderName": "featured",
  "variant": "FeaturedDark",
  "props": { "heading": "Latest Stock" }
}
```

### 2. CSS Modules

```tsx
import styles from "./css/default.module.css";

<CarCardOne car={car} styles={styles} />

// Access: styles.carCard or styles["car-card"]
```

### 3. Lazy Loading

All sections auto-lazy load. Export named functions in `variants/index.tsx` matching your `variant` name in setup.json.

## Data & API

### Dealer Context
```tsx
const { dealerConfig, dealerAuthToken, dealerData } = useDealerContext();
```
- `dealerConfig` - Static setup.json
- `dealerAuthToken` - JWT for API (can be null)
- `dealerData` - Company info, logo, contact, schedules

### API Calls
```tsx
import { fetchApi, postApi } from "@core-dir/services/Api.service";

const data = await fetchApi("/stocks/list", dealerAuthToken);
const result = await postApi("/appointment", body, dealerAuthToken);
```

### Data Processing
```tsx
import { processCarCardData } from "@core-dir/helpers/CarCardDataProcessor";
const cars = processCarCardData(rawApiData);
```

## Key Files

- `src/App.tsx` - Router built from dealerConfig.pages
- `src/core/dealer-provider.tsx` - Fetches dealer data, provides context
- `src/core/page-renderer.tsx` - Dynamically loads sections
- `src/core/layout-renderer.tsx` - Loads navbar/footer variants
- `src/core/ErrorBoundary.tsx` - Global error handler
- `src/types/dealer-props.ts` - Core TypeScript types

## Development

### Commands
```bash
npm install      # Install dependencies
npm run dev      # Dev server (http://localhost:5173)
npm run build    # Production build
npm run preview  # Preview build
```

### Environment (.env)
```env
VITE_DEALER=motors-hub
VITE_API_BASE_URL=https://api.motors-hub.co.uk
VITE_DEALER_TOKEN=your-token
```

### Adding a Dealer
1. Create `dealers/{dealer}/setup.json`
2. Create `dealers/{dealer}/style.css`
3. Add `dealers/{dealer}/images/`
4. Set `VITE_DEALER={dealer}` in `.env`

## Common Patterns

```tsx
// Dealer assets
import logo from "@dealers-dir/images/logo.png";
import config from "@dealers-dir/setup.json";

// Styles
<CarCardOne car={car} styles={CarCardStyles} />

// Section props (always use DealerSectionProps type)
import type { DealerSectionProps } from "@types-dir/dealer-props";

export function MySection({ props }: { props: DealerSectionProps }) {
  return <div>{props.heading || "Default"}</div>;
}
```

## Code Conventions

- **Files**: kebab-case folders, PascalCase components
- **Exports**: Named exports for variants (not default)
- **Imports**: Use path aliases (`@core-dir/*`), not relative paths
- **Styling**: CSS modules + Tailwind (no inline styles)
- **Types**: Use proper types, avoid `any`
- **Errors**: Wrap console.error in `if (process.env.NODE_ENV === 'development')`

## Tech Stack

- React 19 + TypeScript
- Vite 7 (build tool)
- Tailwind CSS 4
- React Router 7
- Framer Motion (animations)
- Swiper (carousels)
- Sonner (toasts)
- Lucide React (icons)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Section not found | Check `folderName` and `variant` match in setup.json |
| Path alias error | Run `npm run build` to verify |
| Missing dealer data | Check `VITE_DEALER_TOKEN` is valid |
| Styles not applying | Ensure CSS module passed as `styles` prop |
| TypeScript errors | Run `npm run build` to see all errors |
