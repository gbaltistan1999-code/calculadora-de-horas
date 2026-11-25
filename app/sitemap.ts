import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { calculatorLinks, legalLinks } from "@/lib/site-config";

export const dynamic = "force-static";

/** Only canonical, indexable pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-25");
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    ...calculatorLinks.map((l) => ({
      url: absoluteUrl(l.href),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/perguntas-frequentes"), lastModified, changeFrequency: "yearly", priority: 0.4 },
    ...legalLinks.map((l) => ({
      url: absoluteUrl(l.href),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
