import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"
import { getAllServiceSlugs } from "@/lib/data/services"

const routes = [
  "",
  "/composer",
  "/ai-api-algeria",
  "/services",
  "/pricing",
  "/faq",
  "/about",
  "/privacy",
  "/terms",
  "/dmca",
]

const lastModified = "2026-08-09"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/composer" || route === "/services"
          ? 0.9
          : route === "/faq"
            ? 0.8
            : 0.7,
  }))

  // Add all service pages so search engines discover them via the sitemap
  const servicePages: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages]
}
