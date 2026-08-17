# Hawiyat Blog — Content Workflow

Blog posts live here as markdown files with YAML frontmatter. Each file becomes
`/blog/<filename>` automatically (sitemap, RSS, and related links update on deploy).

## Review gate (IMPORTANT)

**Every new post is a DRAFT by default** — it is hidden from `/blog`, the sitemap,
RSS, and related-post links, and its URL returns 404.

To publish a post, 0xkatana (or an approved reviewer) must:

1. Review the markdown file (content, prices, claims, no invented numbers).
2. Set the frontmatter flag to published:

```yaml
---
title: "..."
draft: false
---
```

3. Push to `main` (Vercel auto-deploys).

To hide or pull a published post, set `draft: true` and push.

## Frontmatter fields

| Field | Required | Notes |
|-------|----------|-------|
| `title` | yes | Used for the `<title>` tag and H1 |
| `description` | yes | Meta description + card text (120–160 chars) |
| `date` | yes | ISO `YYYY-MM-DD`; posts sort newest first |
| `draft` | no | Omitted = draft (hidden). `false` = published |
| `author` | no | Defaults to "Hawiyat Team" |
| `tags` | no | Used for related-post matching + tag chips |
| `keywords` | no | Used in Article JSON-LD |

## Content conventions

- Target one money keyword per post (Google Trends geo=DZ verified — most
  international keyword tools overstate Algerian demand).
- Prices must match `lib/data/services.ts` exactly — single source of truth.
- Never invent numbers. No "200+ clients" unless owner-verified.
- We sell API keys / the execution layer, never ChatGPT/Claude subscriptions.
  Say so explicitly in posts that compare against chat products.
- Include a `## Frequently asked questions` section with `**Question?** Answer.`
  pairs — these become FAQPage JSON-LD automatically.
- Optional flow diagrams: a fenced code block tagged `flow` renders as a styled
  pipeline diagram:

```flow
Pick a plan → Pay in DZD → Get your key → Ship
```

- Internal links: cross-link 2–3 related posts + the money pages
  (`/pricing`, `/ai-api-algeria`, `/services/*`).
