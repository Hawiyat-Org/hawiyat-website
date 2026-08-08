import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"
import { SECTIONS } from "@/app/guides/claude/_data"

const routes = [
  "",
  "/ai-algeria",
  "/hawiyat-composer",
  "/cyber-security",
  "/services",
  "/about",
  "/guides",
  "/guides/claude",
  "/schedule",
  "/bootcamp",
  "/privacy",
  "/terms",
  "/dmca",
  ...SECTIONS.map((section) => `/guides/claude/${section.id}`),
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route.startsWith("/guides") ? "monthly" : route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/ai-algeria" || route === "/hawiyat-composer" || route === "/services" ? 0.9 : 0.7,
  }))
}
