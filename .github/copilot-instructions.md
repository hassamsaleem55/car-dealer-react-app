# Car Dealer React App - AI Coding Instructions

## Project Architecture

This is a **multi-tenant car dealership platform** built with React 19, TypeScript, Vite, and Tailwind CSS. The app dynamically renders dealer-specific themes and content based on configuration.

### Core Concept: Dynamic Multi-Dealer System

The entire app structure is controlled by:
1. **`VITE_DEALER` environment variable** - Determines active dealer (e.g., `motors-hub`)
2. **`dealers/{dealer-name}/setup.json`** - Defines pages, sections, navbar/footer variants
3. **Path alias `@dealers-dir`** - Dynamically resolved to `./dealers/${VITE_DEALER}` at build time

**Critical**: `@dealers-dir` is a Vite alias that resolves differently per dealer. Never hardcode dealer paths.

## Path Aliases (Use These Always)

```typescript
@dealers-dir/*      → dealers/{VITE_DEALER}/*  (dynamic!)
@app-layout-dir/*   → src/app-layouts/*
@components-dir/*   → src/components/*
@core-dir/*         → src/core/*
@elements-dir/*     → src/elements/*
@sections-dir/*     → src/sections/*
@types-dir/*        → src/types/*
```

## Component Architecture Patterns

### 1. Section Variants System

Sections follow a **layout → variant** pattern:
```
src/sections/{page-name}/{section-name}/
  ├── layouts/           # Reusable layout components
  │   └── {layout-name}/
  │       ├── index.tsx
  │       └── css/
  │           ├── base.module.css
  │           └── {variant}.module.css
  └── variants/
      └── index.tsx      # Named exports like HeroOneHorizontal, FeaturedDefault
```

**Example**: Adding a new section variant
```tsx
// src/sections/shared/featured/variants/index.tsx
export function FeaturedDefault({ props }: { props: DealerSectionProps }) {
  return <FeaturedOne heading={props.heading || ""} />;
}

export function FeaturedDark({ props }: { props: DealerSectionProps }) {
  return <FeaturedOne heading={props.heading || ""} styles={darkStyles} />;
}
```

**Registration**: Add variant name to `dealers/{dealer}/setup.json`:
```json
{
  "isShared": true,
  "folderName": "featured",
  "variant": "FeaturedDark",
  "props": { "heading": "Latest Stock" }
}
```

### 2. CSS Module Pattern

Components use **CSS modules** with variant-specific styles:
```tsx
import BaseStyles from "./css/base.module.css";
import DarkStyles from "./css/dark.module.css";

// Styles passed as props for swapping
<CarCardOne car={car} styles={DarkStyles} />
```

Access styles: `styles["car-card__image-wrapper"]` or `styles.carCardImageWrapper`

### 3. Lazy Loading & Dynamic Imports

All sections/layouts are lazy loaded:
```tsx
const sectionModules = import.meta.glob("../sections/**/variants/index.tsx");
const Section = React.lazy(async () => {
  const m = await loader() as Record<string, React.ComponentType<any>>;
  const Comp = m[variant]; // Named export from variants/index.tsx
  return { default: Comp };
});
```

**When adding new sections**: Export named functions matching the `variant` field in setup.json.

## Data Flow

### 1. Dealer Context (Global State)
```tsx
const { dealerConfig, dealerAuthToken, dealerData } = useDealerContext();
```

- **`dealerConfig`**: Static setup.json (pages, navbar/footer variants)
- **`dealerAuthToken`**: JWT for API calls
- **`dealerData`**: Dynamic dealer info (company name, logo, contact, schedules)

### 2. API Service Pattern
```typescript
// Always use with authToken from context
import { fetchApi, postApi } from "@core-dir/services/Api.service";

const data = await fetchApi("/Vehicles/GetCars", dealerAuthToken);
const result = await postApi("/Appointment/Book", body, dealerAuthToken);
```

Base URL from `VITE_API_BASE_URL` env variable.

### 3. Data Processing Helpers
```typescript
// Transform raw API data to typed components
import { processCarCardData } from "@core-dir/helpers/CarCardDataProcessor";
const cars = processCarCardData(rawApiData);
```

Located in `src/core/helpers/` - sanitize, format, and type data before rendering.

## Key Files for Understanding

- **`src/App.tsx`**: Router config built from `dealerConfig.pages`
- **`src/core/page-renderer.tsx`**: Dynamically loads sections per page
- **`src/core/layout-renderer.tsx`**: Loads navbar/footer variants
- **`src/core/dealer-provider.tsx`**: Fetches dealer data on mount
- **`src/types/dealer-props.ts`**: Core types (DealerConfig, DealerSectionProps)

## Development Workflow

### Build & Run
```bash
npm install
npm run dev      # Dev server (http://localhost:5173)
npm run build    # TypeScript check + production build
npm run preview  # Preview production build
```

### Environment Setup
Create `.env`:
```
VITE_DEALER=motors-hub
VITE_API_BASE_URL=https://api.motors-hub.co.uk
VITE_DEALER_TOKEN=<dealer-specific-token>
```

### Adding a New Dealer
1. Create `dealers/{dealer-name}/setup.json` (copy existing structure)
2. Add `dealers/{dealer-name}/style.css` for custom CSS variables
3. Set `VITE_DEALER={dealer-name}` in `.env`

## Common Patterns

### Passing Styles to Components
```tsx
<FilterOne styles={FilterOneVerticalStyles} />
<CarCardOne car={car} styles={CarCardStyles} />
```

### Accessing Dealer-Specific Assets
```tsx
import dealerLogo from "@dealers-dir/images/logo.png";
import dealerConfig from "@dealers-dir/setup.json";
```

### Type-Safe Section Props
```tsx
import type { DealerSectionProps } from "@types-dir/dealer-props";

export function MySection({ props }: { props: DealerSectionProps }) {
  const heading = props.heading || "Default Heading";
  const points = props.points || [];
}
```

## Deployment

Deployed to Vercel with SPA routing:
```json
// vercel.json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

## Conventions

- **File naming**: Use kebab-case for folders, PascalCase for React components
- **Exports**: Named exports for variants (not default)
- **Imports**: Always use path aliases, never relative paths across directories
- **Styling**: CSS modules + Tailwind utility classes (avoid inline styles)
- **State**: Use React Router's `useOutletContext` for cross-component state (see `AppOutlet.tsx`)

## Key Dependencies

- **React Router 7**: Client-side routing with data passing
- **Framer Motion**: Animation library (see `@components-dir/framer-motion`)
- **Swiper**: Carousels/sliders (see `@components-dir/swiper`)
- **Sonner**: Toast notifications
- **Lucide React**: Icon library
- **Tailwind CSS 4**: Utility-first styling with `@tailwindcss/vite`

## Troubleshooting

- **"Section not found"**: Check `folderName` and `variant` in setup.json match folder/export names
- **Path alias errors**: Run `npm run build` to verify TypeScript + Vite resolve aliases
- **Missing dealer data**: Verify `VITE_DEALER_TOKEN` is valid and API is accessible
- **Style not applying**: Ensure CSS module imported and passed as `styles` prop
