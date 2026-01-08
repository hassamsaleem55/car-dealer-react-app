/**
 * Sitemap Generator Helper
 * Dynamically generates sitemap URLs based on dealer configuration
 */

import type { BaseDealerPage } from "@types-dir/dealer-props";

interface SitemapUrl {
  loc: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

export function generateSitemapUrls(
  pages: BaseDealerPage[],
  baseUrl: string
): SitemapUrl[] {
  const urls: SitemapUrl[] = [];

  pages.forEach((page) => {
    // Determine changefreq and priority based on page type
    let changefreq: SitemapUrl["changefreq"] = "weekly";
    let priority = 0.7;

    switch (page.pageName) {
      case "home":
        changefreq = "daily";
        priority = 1.0;
        break;
      case "stock":
        changefreq = "daily";
        priority = 0.9;
        break;
      case "car-details":
        // Skip car details as they're dynamic
        return;
      case "contact":
        changefreq = "monthly";
        priority = 0.8;
        break;
      case "finance":
      case "sell-your-car":
        changefreq = "monthly";
        priority = 0.7;
        break;
      default:
        changefreq = "weekly";
        priority = 0.6;
    }

    urls.push({
      loc: `${baseUrl}${page.path}`,
      changefreq,
      priority,
    });
  });

  return urls;
}

export function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Update robots.txt with correct sitemap URL
 */
export function updateRobotsTxt(sitemapUrl: string): void {
  // This would need to be handled server-side or during build
  // For now, we'll just ensure the sitemap URL is correct in the file
  console.log(`Sitemap URL should be: ${sitemapUrl}`);
}
