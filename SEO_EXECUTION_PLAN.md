# SEO/GEO Execution Plan for Hawiyat Services

**Created:** 2026-08-07  
**Target:** Fix all SEO metadata issues and optimize for AI search (GEO)  
**Estimated time:** 4-6 hours for a junior developer

---

## ✅ Implementation Status — 2026-08-08: ALL ITEMS IMPLEMENTED

| Section | Item | Status |
|---------|------|--------|
| 1.1 | Metadata on `/services` page | ✅ Done (`app/services/page.tsx`) |
| 1.2 | Service slugs in sitemap | ✅ Done (`app/sitemap.ts`) |
| 2.1 | Service-specific OG images | ✅ Done (`lib/seo.ts` + slug page) |
| 2.2 | Enhanced Service schema | ✅ Done (slug page) |
| 2.3 | BreadcrumbList schema | ✅ Done (slug page) |
| 3.1 | Citable content blocks (all 8 services) | ✅ Done (`lib/data/services.ts` + slug page render) |
| 3.2 | Keywords woven into visible content | ✅ Done (inside seoContent blocks) |
| 3.3 | datePublished / dateModified | ✅ Done (meta tags + schema) |
| 4.1 | FAQ sections (all 8 services) | ✅ Done (`lib/data/services.ts` + slug page render) |
| 4.2 | OG locale → fr_DZ | ✅ Done (`app/layout.tsx`) |

**Notes for the record:**
- `createMetadata` in `lib/seo.ts` gained optional `image`, `publishedTime`, `modifiedTime` params (backward compatible — all existing callers unaffected).
- `datePublished` set to `2026-01-01` for all services; update to actual per-service launch dates when known.
- `app/services/layout.tsx` already supplied metadata + ItemList schema for `/services`; page-level metadata now takes precedence (standard Next.js merge behavior). No changes needed there.
- Not run: `pnpm build` (per user constraint). Verify via `pnpm dev` + view-source and Google Rich Results Test.

---

---

## Table of Contents

1. [Critical Fixes (Do First)](#1-critical-fixes-do-first)
2. [High Priority Fixes](#2-high-priority-fixes)
3. [Medium Priority Fixes](#3-medium-priority-fixes)
4. [Low Priority Enhancements](#4-low-priority-enhancements)
5. [Verification Checklist](#5-verification-checklist)

---

## 1. Critical Fixes (Do First)

These block indexing or cause immediate SEO problems.

### 1.1 Add Metadata to `/services` Page

**Problem:** The `/services` page has no `generateMetadata` export. It inherits the layout's generic title: *"AI Provider in Algeria and Hawiyat Composer | Hawiyat"* — which has nothing to do with services.

**File to edit:** `app/services/page.tsx`

**What to do:**

Add this import at the top of the file (after the existing imports):

```typescript
import type { Metadata } from "next"
import { createMetadata } from "@/lib/seo"
```

Add this function **before** the `export default function ServicesPage` line:

```typescript
export const metadata: Metadata = createMetadata({
  title: "AI Services in Algeria | n8n, Claude Code, WhatsApp API, Hosting | Hawiyat",
  description: "Browse all Hawiyat services: n8n workflow automation (8,000 DA/year), Hawiyat Composer Claude subscriptions (6,000-30,000 DA/month), Evolution API WhatsApp hosting (7,000 DA/year), OpenAI credits, and web hosting. Priced in Algerian dinars, local support in Arabic, French, and English.",
  path: "/services",
})
```

**Why this matters:** Google needs a unique, descriptive title and description for each page. The current generic title tells Google nothing about what's on `/services`.

**Expected result:** Google will show "AI Services in Algeria | n8n, Claude Code, WhatsApp API, Hosting | Hawiyat" in search results instead of the generic layout title.

---

### 1.2 Add Service Slugs to Sitemap

**Problem:** The sitemap at `app/sitemap.ts` lists `/services` but **none of the 8 individual service pages** (`/services/n8n-hosting`, `/services/composer-pro`, etc.). Google won't discover them via sitemap.

**File to edit:** `app/sitemap.ts`

**What to do:**

Add this import at the top (after the existing imports):

```typescript
import { getAllServiceSlugs } from "@/lib/data/services"
```

Replace the entire `export default function sitemap()` function with this:

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const serviceSlugs = getAllServiceSlugs()
  
  const staticRoutes = [
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
  
  const staticPages = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route.startsWith("/guides") ? "monthly" : route === "" ? "weekly" : "monthly" as const,
    priority: route === "" ? 1 : route === "/ai-algeria" || route === "/hawiyat-composer" || route === "/services" ? 0.9 : 0.7,
  }))
  
  // Add all service pages
  const servicePages = serviceSlugs.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8, // Service pages are important but slightly below /services hub
    lastModified: new Date(), // Will be updated when content changes
  }))
  
  return [...staticPages, ...servicePages]
}
```

**Why this matters:** Sitemaps are Google's primary discovery mechanism. Without service pages in the sitemap, Google has to find them through internal links only, which is slower and less reliable.

**Expected result:** All 8 service pages appear in `https://www.hawiyat.org/sitemap.xml` with priority 0.8.

---

## 2. High Priority Fixes

These significantly impact rankings and rich results eligibility.

### 2.1 Use Service-Specific OG Images

**Problem:** Every service page's Open Graph image is `/hawiyat.png` (the generic site image). When someone shares `/services/n8n-hosting` on social media or WhatsApp, the preview shows the Hawiyat logo — not the n8n image.

**File to edit:** `lib/seo.ts`

**What to do:**

Update the `createMetadata` function signature to accept an optional `image` parameter:

```typescript
export function createMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string
  description: string
  path: `/${string}` | "/"
  image?: string // Optional: service-specific image
}): Metadata {
  // Use the provided image, or fall back to the default
  const ogImage = image || "/hawiyat.png"
  
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: ogImage, width: 2000, height: 2000, alt: "Hawiyat AI services in Algeria" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}
```

**File to edit:** `app/services/[slug]/page.tsx`

**What to do:**

Update the `generateMetadata` function to pass the service's image:

```typescript
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}

  // Use the first image from the service, or the default
  const serviceImage = service.images?.[0] || service.image

  return createMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${params.slug}` as `/${string}`,
    image: serviceImage, // Pass the service-specific image
  })
}
```

**Why this matters:** When someone shares a service page on WhatsApp, Facebook, or Twitter, the preview image is now the actual product image (n8n logo, Claude logo, etc.) instead of the generic Hawiyat logo. This increases click-through rate.

**Expected result:** Social media previews for `/services/n8n-hosting` show the n8n logo, not the Hawiyat logo.

---

### 2.2 Enhance Service Schema Markup

**Problem:** The current `Service` schema is minimal and missing key properties that Google expects for rich results.

**File to edit:** `app/services/[slug]/page.tsx`

**What to do:**

Replace the `serviceSchema` object (around line 35-55) with this enhanced version:

```typescript
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  url: `${SITE_URL}/services/${service.slug}`,
  image: service.images?.[0] || service.image || `${SITE_URL}/hawiyat.png`,
  provider: {
    "@type": "Organization",
    name: "Hawiyat",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    telephone: "+213-55-955-5951",
  },
  areaServed: {
    "@type": "Country",
    name: "Algeria",
  },
  serviceType: service.category,
  hasOfferCatalog: service.plans && service.plans.length > 0 ? {
    "@type": "OfferCatalog",
    name: `${service.name} Plans`,
    itemListElement: service.plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: plan.price.replace(/,/g, ""), // Remove commas for schema
      priceCurrency: "DZD",
      description: plan.tagline,
      availability: "https://schema.org/InStock",
    })),
  } : {
    "@type": "Offer",
    price: service.price.replace(/,/g, ""),
    priceCurrency: "DZD",
    availability: "https://schema.org/InStock",
  },
  datePublished: "2026-01-01", // Update this to the actual launch date
  dateModified: new Date().toISOString().split("T")[0], // Today's date
}
```

**Why this matters:** 
- `url` and `image` are required properties for Service schema validation
- `hasOfferCatalog` with multiple offers tells Google this is a multi-tier service (n8n has Freelance/Startup/Enterprise)
- `datePublished` and `dateModified` signal freshness to AI search systems
- `serviceType` helps Google categorize the page

**Expected result:** Google Search Console shows valid Service schema with rich result eligibility. AI search systems see freshness signals.

---

### 2.3 Add BreadcrumbList Schema

**Problem:** No breadcrumb schema. Google expects this for product/service pages to show the navigation path in search results.

**File to edit:** `app/services/[slug]/page.tsx`

**What to do:**

Add this import at the top (after existing imports):

```typescript
import { SITE_URL as SITE_URL_CONST } from "@/lib/seo"
```

Add this breadcrumb schema **after** the `serviceSchema` definition (around line 55):

```typescript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL_CONST,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: `${SITE_URL_CONST}/services`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: service.name,
      item: `${SITE_URL_CONST}/services/${service.slug}`,
    },
  ],
}
```

Update the `<script>` tag that renders the schema (around line 68) to include both schemas:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ 
    __html: JSON.stringify([serviceSchema, breadcrumbSchema]) 
  }}
/>
```

**Why this matters:** Breadcrumbs help Google understand the site hierarchy and may show "Home > Services > n8n Hosting" in search results, improving click-through rate.

**Expected result:** Google Search Console shows valid BreadcrumbList schema. Search results may display breadcrumb navigation.

---

## 3. Medium Priority Fixes

These improve AI search citability and on-page relevance.

### 3.1 Add Citable Content Blocks to Service Pages

**Problem:** Each service page has ~150 words of indexable content. For AI Overviews to cite these pages, they need **134-167 word self-contained answer blocks** with specific facts.

**File to edit:** `lib/data/services.ts`

**What to do:**

For each service, add a new `seoContent` field to the `Service` interface:

```typescript
export interface Service {
  // ... existing fields ...
  seoContent?: {
    whatIs: string // 134-167 word "What is X?" answer block
    whyChoose: string // 134-167 word "Why choose Hawiyat for X?" block
    howItWorks: string // 134-167 word "How does X work?" block
  }
}
```

Then add content for each service. Example for n8n:

```typescript
{
  id: "n8n-hosting",
  // ... existing fields ...
  seoContent: {
    whatIs: "n8n hosting in Algeria is a managed workflow automation platform that lets you connect apps, automate tasks, and build AI pipelines without managing servers. Hawiyat provides fully managed n8n instances with 99.9% uptime, automatic updates, and local support in Arabic, French, and English. You get PostgreSQL database, unlimited workflows, custom domain support, and webhook endpoints for external integrations. Starting at 8,000 DA/year for freelancers (up to 8 concurrent workflows) or 30,000 DA/year for startups (worker-based setup, unlimited executions). Enterprise plan at 80,000 DA/year includes automatic backups, 99.9% uptime SLA with compensation, and WhatsApp support. All plans include SSL certificates, daily backups (Enterprise only), and priority support. Based in Algeria, Hawiyat serves developers and businesses across Algeria with local infrastructure and timezone-aligned support.",
    whyChoose: "Hawiyat is the only n8n hosting provider based in Algeria with local support in Arabic, French, and English. Unlike international providers, we offer pricing in Algerian dinars (DZD), same-timezone support, and infrastructure optimized for Algerian businesses. Our team has deployed n8n for 60+ live clients, so you get production-tested infrastructure, not experimental setups. We handle deployment, scaling, monitoring, and maintenance so you focus on building automations. Our Freelance plan at 8,000 DA/year is 47% cheaper than the regular 15,000 DA/year price until August 31, 2026. We provide WhatsApp support (Enterprise plan), automatic backups (Enterprise plan), and 99.9% uptime SLA with compensation if we miss it. All plans include unlimited workflows, PostgreSQL database, custom domain support, and API access. We're based in Algiers and serve customers across Algeria.",
    howItWorks: "Getting started with n8n hosting at Hawiyat takes three steps. First, choose your plan: Freelance (8,000 DA/year, up to 8 concurrent workflows), Startup (30,000 DA/year, worker-based setup, unlimited executions), or Enterprise (80,000 DA/year, backups, 99.9% uptime SLA, WhatsApp support). Second, submit your order through our website with your preferred payment method (CCP, Baridi Mob, or USD). Third, our team deploys your n8n instance within 24 hours with automatic updates, SSL certificates, and monitoring enabled. You get access to the latest n8n version with all core nodes, unlimited workflows and executions (Startup and Enterprise), webhook endpoints for external integrations, and API access for programmatic control. We handle server management, scaling, and maintenance. You build automations for WhatsApp replies, CRM connections, AI pipelines, and scheduled tasks. Support is available by email (all plans) or WhatsApp (Enterprise plan).",
  },
}
```

**File to edit:** `app/services/[slug]/page.tsx`

**What to do:**

Add a new section in the left column (after the "Ideal For" section, around line 137) to render the SEO content:

```typescript
{/* SEO Content Blocks for AI Search */}
{service.seoContent && (
  <div className="space-y-8 pt-8 border-t border-border/40">
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-3">What is {service.name}?</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {service.seoContent.whatIs}
      </p>
    </div>
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-3">Why Choose Hawiyat for {service.name}?</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {service.seoContent.whyChoose}
      </p>
    </div>
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-3">How Does {service.name} Work?</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {service.seoContent.howItWorks}
      </p>
    </div>
  </div>
)}
```

**Why this matters:** AI Overviews cite pages with **134-167 word self-contained answer blocks** that directly answer "What is X?", "Why choose X?", and "How does X work?" questions. The current 150-word pages are too sparse for AI citation.

**Expected result:** Each service page now has 400+ words of citable content. AI Overviews are more likely to cite these pages for queries like "what is n8n hosting in algeria" or "how to get claude code in algeria".

**Note:** You need to write the `seoContent` blocks for all 8 services. Use the n8n example above as a template. Each block should be 134-167 words with specific facts, prices, and features.

---

### 3.2 Weave Keywords into Visible Content

**Problem:** Each service defines 10+ keywords in `service.seo.keywords` (e.g., `"n8n hosting algeria"`, `"whatsapp api algeria"`), but these are never rendered anywhere. They're dead data.

**File to edit:** `lib/data/services.ts`

**What to do:**

This is already partially addressed by the `seoContent` blocks in 3.1. When writing the `seoContent` blocks, naturally include the keywords from `service.seo.keywords`.

Example: If `service.seo.keywords` includes `"n8n hosting algeria"`, `"workflow automation algeria"`, and `"managed n8n"`, make sure these phrases appear in the `seoContent.whatIs`, `seoContent.whyChoose`, or `seoContent.howItWorks` blocks.

**Why this matters:** Keywords in meta tags are ignored by Google. Keywords need to appear in visible headings and body text for on-page relevance.

**Expected result:** Keywords like "n8n hosting algeria" appear in the "What is n8n Hosting?" heading and body text, improving on-page SEO.

---

### 3.3 Add datePublished and dateModified to Service Pages

**Problem:** No service page has date metadata. AI search systems heavily weight recency — pages without dates lose citation eligibility after ~6 months stale.

**File to edit:** `app/services/[slug]/page.tsx`

**What to do:**

This is already addressed in fix 2.2 (Enhanced Service Schema). The `serviceSchema` now includes:

```typescript
datePublished: "2026-01-01", // Update this to the actual launch date
dateModified: new Date().toISOString().split("T")[0], // Today's date
```

**Additional step:** Add meta tags to the `generateMetadata` function:

```typescript
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}

  const serviceImage = service.images?.[0] || service.image

  return createMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${params.slug}` as `/${string}`,
    image: serviceImage,
  })
}
```

Then in the `createMetadata` function in `lib/seo.ts`, add:

```typescript
return {
  title,
  description,
  alternates: { canonical: path },
  // Add these meta tags
  other: {
    "article:published_time": "2026-01-01T00:00:00+01:00", // Update to actual launch date
    "article:modified_time": new Date().toISOString(),
  },
  openGraph: {
    // ... existing openGraph fields ...
    publishedTime: "2026-01-01T00:00:00+01:00",
    modifiedTime: new Date().toISOString(),
  },
  // ... rest of the metadata ...
}
```

**Why this matters:** AI search systems (Google AI Overviews, ChatGPT, Perplexity) weight content freshness heavily. Pages without dates lose citation eligibility after 6 months.

**Expected result:** Service pages show publication and modification dates in meta tags. AI search systems see freshness signals.

---

## 4. Low Priority Enhancements

These are nice-to-have improvements.

### 4.1 Add FAQ Sections (Content, Not Schema)

**Problem:** No FAQ sections on service pages. FAQ content (not schema) helps with long-tail keyword capture.

**File to edit:** `lib/data/services.ts`

**What to do:**

Add a `faq` field to the `Service` interface:

```typescript
export interface Service {
  // ... existing fields ...
  faq?: Array<{
    question: string
    answer: string
  }>
}
```

Add FAQ content for each service. Example for n8n:

```typescript
{
  id: "n8n-hosting",
  // ... existing fields ...
  faq: [
    {
      question: "What is the difference between Freelance, Startup, and Enterprise plans?",
      answer: "Freelance (8,000 DA/year) is for solo developers with up to 8 concurrent workflows. Startup (30,000 DA/year) uses worker-based setup for unlimited executions and is best for small companies. Enterprise (80,000 DA/year) includes automatic backups, 99.9% uptime SLA with compensation, and WhatsApp support for scale.",
    },
    {
      question: "Do you provide support in Arabic and French?",
      answer: "Yes, Hawiyat provides support in Arabic, French, and English. We're based in Algeria and serve customers across the country with local timezone-aligned support.",
    },
    {
      question: "Can I upgrade my plan later?",
      answer: "Yes, you can upgrade from Freelance to Startup or Enterprise at any time. Contact us via email or WhatsApp (Enterprise plan) to discuss your requirements.",
    },
  ],
}
```

**File to edit:** `app/services/[slug]/page.tsx`

**What to do:**

Add a FAQ section in the left column (after the SEO content blocks):

```typescript
{/* FAQ Section */}
{service.faq && service.faq.length > 0 && (
  <div className="space-y-4 pt-8 border-t border-border/40">
    <h2 className="text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
    <div className="space-y-4">
      {service.faq.map((item, idx) => (
        <div key={idx}>
          <h3 className="text-base font-medium text-foreground mb-2">{item.question}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
        </div>
      ))}
    </div>
  </div>
)}
```

**Why this matters:** FAQ content helps capture long-tail keywords like "what is the difference between n8n freelance and enterprise plans". Note: Google retired FAQ rich results for commercial sites, so we're adding FAQ **content**, not FAQPage schema.

**Expected result:** Service pages capture long-tail keyword traffic. Users find answers to common questions without contacting support.

---

### 4.2 Consider fr_DZ as Primary OG Locale

**Problem:** The layout sets `locale: "en_US"` with `alternateLocale: ["fr_DZ"]`. For a site targeting Algerian developers, `fr_DZ` or `ar_DZ` should arguably be the primary locale.

**File to edit:** `app/layout.tsx`

**What to do:**

Update the `openGraph` metadata (around line 69-89):

```typescript
openGraph: {
  title: `${APP_NAME}: Built to Ship`,
  description:
    "AI services in Algeria: Hawiyat Composer, subscriptions in DZD, automation, hosting, and local technical support.",
  url: SITE_URL,
  siteName: APP_NAME,
  images: [
    {
      url: `${SITE_URL}/hawiyat.png`,
      width: 2000,
      height: 2000,
      alt: `${APP_NAME} Platform`,
    },
  ],
  locale: "fr_DZ", // Changed from en_US
  alternateLocale: ["en_US", "ar_DZ"], // Added English and Arabic as alternates
  type: "website",
},
```

**Why this matters:** If most visitors are French or Arabic speakers, the primary locale should reflect that. This helps social media platforms show the correct language version.

**Expected result:** Social media platforms show the French version of the site by default for Algerian users.

**Note:** This is a judgment call. If your analytics show most traffic is English-speaking, keep `en_US`. If most traffic is French or Arabic, switch to `fr_DZ` or `ar_DZ`.

---

## 5. Verification Checklist

After implementing all fixes, verify:

### Metadata Verification

- [ ] `/services` page has unique title and description in view-source
- [ ] All 8 service pages appear in `https://www.hawiyat.org/sitemap.xml`
- [ ] Service pages show service-specific images in social media previews (test with Facebook Sharing Debugger)
- [ ] Service pages have `datePublished` and `dateModified` in meta tags

### Schema Verification

- [ ] Service schema validates in Google Rich Results Test
- [ ] BreadcrumbList schema validates in Google Rich Results Test
- [ ] Service schema includes `url`, `image`, `hasOfferCatalog` (for multi-plan services)
- [ ] Service schema includes `datePublished` and `dateModified`

### Content Verification

- [ ] Each service page has 400+ words of citable content (3 blocks × 134-167 words)
- [ ] Keywords from `service.seo.keywords` appear in visible headings and body text
- [ ] FAQ sections (if added) capture long-tail keywords

### AI Search Verification

- [ ] Test with ChatGPT: "what is n8n hosting in algeria" — does it cite hawiyat.org?
- [ ] Test with Perplexity: "how to get claude code in algeria" — does it cite hawiyat.org?
- [ ] Test with Google AI Overviews: "n8n hosting algeria" — does it cite hawiyat.org?

---

## Summary of Changes

| File | Changes | Priority |
|------|---------|----------|
| `app/services/page.tsx` | Add `generateMetadata` with services-specific title/description | Critical |
| `app/sitemap.ts` | Add all service slugs to sitemap with priority 0.8 | Critical |
| `lib/seo.ts` | Add optional `image` parameter to `createMetadata` | High |
| `app/services/[slug]/page.tsx` | Pass service image to `createMetadata` | High |
| `app/services/[slug]/page.tsx` | Enhance `serviceSchema` with `url`, `image`, `hasOfferCatalog`, dates | High |
| `app/services/[slug]/page.tsx` | Add `breadcrumbSchema` | High |
| `lib/data/services.ts` | Add `seoContent` field with 3 citable blocks per service | Medium |
| `app/services/[slug]/page.tsx` | Render `seoContent` blocks | Medium |
| `lib/seo.ts` | Add `datePublished` and `dateModified` to meta tags | Medium |
| `lib/data/services.ts` | Add `faq` field with FAQ content per service | Low |
| `app/services/[slug]/page.tsx` | Render FAQ section | Low |
| `app/layout.tsx` | Change OG locale to `fr_DZ` (optional) | Low |

---

## Estimated Time

- **Critical fixes (1.1, 1.2):** 30 minutes
- **High priority fixes (2.1, 2.2, 2.3):** 1 hour
- **Medium priority fixes (3.1, 3.2, 3.3):** 2-3 hours (writing SEO content for 8 services)
- **Low priority fixes (4.1, 4.2):** 1 hour

**Total:** 4-6 hours for a junior developer

---

## Notes for the Executor

1. **Do not run builds** — the user explicitly said "dont do builds please". Just make the code changes.
2. **Test with view-source** — after changes, right-click the page → "View Page Source" to verify meta tags and schema are present.
3. **Use Google Rich Results Test** — paste the URL into https://search.google.com/test/rich-results to validate schema.
4. **Write SEO content carefully** — the `seoContent` blocks need to be 134-167 words each with specific facts, prices, and features. Don't just copy-paste the service description.
5. **Update dates** — the `datePublished` should be the actual launch date of each service, not "2026-01-01".

---

**End of Plan**
