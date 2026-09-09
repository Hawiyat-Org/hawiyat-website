import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

const AI_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "OAI-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
]

const DISALLOWED = ["/api/", "/admin/", "/_next/"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOWED },
      ...AI_CRAWLERS.map((crawler) => ({
        userAgent: crawler,
        allow: "/",
        disallow: DISALLOWED,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
