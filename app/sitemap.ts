import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"
import { SECTIONS } from "@/app/guides/claude/_data"
import { getAllServiceSlugs } from "@/lib/data/services"

const routes = [
  "",
  "/ai-algeria",
  "/hawiyat-composer",
  "/cyber-security",
  "/services",
  "/about",
  "/guides",
  "/guides/claude",
  "/bootcamp",
  "/privacy",
  "/terms",
  "/dmca",
  ...SECTIONS.map((section) => `/guides/claude/${section.id}`),
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route.startsWith("/guides") ? "monthly" : route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/ai-algeria" || route === "/hawiyat-composer" || route === "/services" ? 0.9 : 0.7,
  }))

  // Add all service pages so search engines discover them via the sitemap
  const servicePages: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages]
}
