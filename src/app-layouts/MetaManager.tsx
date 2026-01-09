import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDealerContext } from "@core-dir/dealer-provider";
import { usePageMeta } from "@core-dir/page-meta-context";

// Types
interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

// Constants
const FONTS = {
  // Critical font - preload immediately with display=swap
  BASE: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700&display=swap",
  // Secondary fonts - load with higher swap period
  DEALER: "https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap",
  SERIF: "https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap",
} as const;

const PRECONNECTS = [
  { href: "https://fonts.googleapis.com", crossorigin: false },
  { href: "https://fonts.gstatic.com", crossorigin: true },
] as const;

// Helper Functions
const addPreconnect = (href: string, crossorigin?: boolean): void => {
  if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) return;
  
  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = href;
  if (crossorigin) link.setAttribute("crossorigin", "");
  document.head.appendChild(link);
};

const loadFonts = (fontUrl: string, id: string, preload = false): void => {
  if (document.getElementById(id)) return;

  // Preload critical fonts
  if (preload) {
    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.as = "style";
    preloadLink.href = fontUrl;
    document.head.appendChild(preloadLink);
  }

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = fontUrl;
  link.media = "print";
  link.onload = function() {
    (this as HTMLLinkElement).media = "all";
  };

  // Add noscript fallback
  const noscript = document.createElement("noscript");
  const noscriptLink = document.createElement("link");
  noscriptLink.rel = "stylesheet";
  noscriptLink.href = fontUrl;
  noscript.appendChild(noscriptLink);
  document.head.appendChild(noscript);

  document.head.appendChild(link);
};

const updateMetaTag = (attribute: "name" | "property", key: string, content: string): void => {
  const selector = `meta[${attribute}="${key}"]`;
  let tag = document.querySelector(selector) as HTMLMetaElement;
  
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  
  tag.content = content;
};

const updateLink = (rel: string, href: string): void => {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  
  link.href = href;
};

const applyMetaTags = (tags: MetaTag[]): void => {
  tags.forEach(({ name, property, content }) => {
    if (name) {
      updateMetaTag("name", name, content);
    } else if (property) {
      updateMetaTag("property", property, content);
    }
  });
};

// Main Component
export default function MetaManager() {
  const { dealerData } = useDealerContext();
  const { pageMeta } = usePageMeta();
  const location = useLocation();

  useEffect(() => {
    if (!dealerData) return;

    const companyName = dealerData.CompanyName || "Dealers Hub";
    const baseUrl = window.location.origin;
    const currentUrl = `${baseUrl}${location.pathname}`;
    const logoUrl = dealerData.LogoUrl || `${baseUrl}/vite.svg`;
    
    // Use page-specific meta or fallback to dealer defaults
    const pageTitle = pageMeta.title
      ? `${pageMeta.title.replace("{dealerName}", companyName)}`
      : `${companyName} - Quality Used Cars & Expert Service`;
    
    const pageDescription = pageMeta.description
      ? pageMeta.description.replace("{dealerName}", companyName)
      : `Browse ${companyName}'s extensive collection of quality used cars. Expert service, competitive financing, and reliable vehicles you can trust.`;

    // Setup Preconnects
    PRECONNECTS.forEach(({ href, crossorigin }) => addPreconnect(href, crossorigin));

    // Load Fonts - preload critical, lazy load others
    loadFonts(FONTS.BASE, "base-fonts", true); // Preload critical fonts
    
    // Lazy load secondary fonts using requestIdleCallback
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        loadFonts(FONTS.DEALER, "dealer-font");
        loadFonts(FONTS.SERIF, "serif-font");
      }, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        loadFonts(FONTS.DEALER, "dealer-font");
        loadFonts(FONTS.SERIF, "serif-font");
      }, 100);
    }

    // Update Title
    document.title = pageTitle.toUpperCase();

    // Update Basic Meta Tags
    applyMetaTags([
      { name: "description", content: pageDescription },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#ffffff" },
    ]);

    // Update Canonical Link
    updateLink("canonical", currentUrl);

    // Update Favicon
    updateLink("icon", logoUrl);

    // Update Open Graph Tags
    applyMetaTags([
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:url", content: currentUrl },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: companyName },
      { property: "og:image", content: logoUrl },
      { property: "og:image:alt", content: `${companyName} Logo` },
    ]);

    // Update Twitter Card Tags
    applyMetaTags([
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
      { name: "twitter:image", content: logoUrl },
      { name: "twitter:image:alt", content: `${companyName} Logo` },
    ]);
  }, [dealerData, location.pathname, pageMeta]);

  return null;
}
