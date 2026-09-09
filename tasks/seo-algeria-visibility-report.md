# Hawiyat.org — SEO & Algeria Search-Visibility Report
**Date:** 2026-09-09 · **Data:** Google Search Console export 2026-06-07 → 2026-09-06 (Coverage + Performance) · **Scope:** free-methods audit (no DataForSEO key, no OpenSEO setup, Search Console property newly created)

## Executive summary

Hawiyat owns its brand in Algeria and earns nothing from anyone else. ~460 clicks in 3 months, effectively 100% navigational (`hawiyat`, `hawiyat composer`, misspellings). Non-brand clicks: zero. Google already surfaces the site for commercial Algerian queries (`chatgpt algeria` pos 7, `baridimob api` pos 8, `plateforme cloud` pos 1) but there is no landing page to capture them, so the impressions leak to competitors. The site is technically healthy; the gap is content and click-through, not crawling.

## 1. Demand picture (Performance data)

| Segment | Clicks | Impressions | CTR | Avg position |
|---|---|---|---|---|
| Total (3 mo) | ~460 | ~2,500 | ~18% | mixed |
| Brand queries | ~460 | ~700 | ~60% | ~1.2 |
| Non-brand queries | 0 | ~1,800 | 0% | 8–30 |
| Algeria | 425 | 913 | 46.5% | 2.7 |
| France (diaspora) | 6 | 40 | 15% | 11.5 |
| Mobile | 190 | 539 | 35% | 4.9 |
| Desktop | 268 | 1,991 | 13% | 18.6 |

- **Brand dependence is total.** Top queries: `hawiyat` (277 clicks, pos 1.07), `hawiyat composer` (27), `hawiyat cloud` (19), plus ~20 misspellings (`hawyat`, `hawiyati`, …) that all resolve correctly. Good moat, zero acquisition.
- **The US impression pile (982 imp, 3 clicks, pos 28.5) is bot noise**: `site:.org "chat.whatsapp.com"` spam-operator queries and dev-framework docs tail. Ignore it; do not chase it.
- **Trend is flat**: ~5–10 brand clicks/day since mid-June with a mid-June impression spike that settled. No growth engine running.
- **Devices skew mobile for converting traffic** (35% CTR mobile vs 13% desktop) — brand searches on phones. Keep mobile LCP/UX a priority.

## 2. Technical health (Coverage data + live checks)

| Issue | Pages | Verdict |
|---|---|---|
| Page with redirect | 38 | Expected (legacy aliases: `/hawiyat-composer`, `/services`→`/pricing`, removed pages). Keep. |
| Not found (404) | 8 | Correct for removed pages (`/templates`, `/guides`, `/schedule`). Keep as 404, except `/templates` (see §3). |
| Alternate page with proper canonical | 4 | Monitor only. |
| Duplicate without user-selected canonical | 2 | Fix: `/dcma` serves HTTP 200 as a duplicate of `/dmca` (see §3). |
| Server error (5xx) | 3 | Watch for recurrence; if it repeats, pull the URLs from GSC and fix. |
| Blocked by robots.txt | 2 | Expected (`/api/`, admin). Fine. |
| Crawled / Discovered, currently not indexed | 6 + 2 | Normal for a small site; resolves as crawl budget allows. |
| Indexed without content | 3 | Find the 3 URLs in GSC → noindex or add real content. |
| Sitemap | 30 URLs | Clean — no removed pages listed. Good. |

Live verification 2026-09-09: apex→www 308 ✓, `/guides` + `/schedule` 404 ✓, `/dcma` **200 (bug)** ✗, `/templates` **404 with 1,280 impressions (waste)** ✗.

## 3. Quick wins (hours, direct impact)

1. **301 `/dcma` → `/dmca`.** A live duplicate page with 346 impressions. One redirect rule in `next.config.mjs`. Kills the duplicate-canonical coverage hits.
2. **301 `/templates` → `/pricing`.** A dead page holding 1,280 impressions at pos 22 with 0.55% CTR — the site's largest wasted impression pool. Same intent as `/pricing`; mirror the existing `/services`→`/pricing` rule.
3. **Rewrite titles + meta descriptions for the zero-click page-1 pages**: `/pricing` (pos 2.67, 97 imp, 0 clicks), `/faq` (pos 1.68, 120 imp, 0 clicks), `/services/composer` (pos 2.57, 135 imp, 0 clicks). Ranking 1–3 with 0% CTR is a snippet problem, not a ranking problem. Add the DZD-price hook and French terms (e.g. "…à partir de 6 000 DA/mois · paiement CCP/BaridiMob").
4. **Confirm canonical consolidation**: apex→www 308 exists; ensure every canonical tag points at `www`, then let history consolidate the 279-vs-147 click split.

## 4. Algeria acquisition plan (the actual growth work)

Google proves demand exists; supply (landing pages) does not.

1. **French commercial pages first** — Algeria buys in French. No page targets: `API IA Algérie`, `ChatGPT Algérie prix`, `WhatsApp Business API Algérie`, `BaridiMob API paiement`, `n8n Algérie`. The blog guides hit page 1 with zero effort, so competition is thin; 4–5 focused pages should rank within weeks.
2. **One Arabic hub.** Arabic queries (`هاست vue`, `ماهو`-style tails) rank 30–97 with no Arabic content to catch them. A single well-built Arabic page 10x's those positions.
3. **France diaspora page/angle** (pos 11.5, page 2): same French pages plus diaspora payment angle (cards for diaspora vs CCP/BaridiMob local).
4. **Keep publishing Algeria guides.** `/blog/n8n-hosting-algeria-guide` converts 16% CTR from 12 impressions — the format works. One guide per month on the money queries above.
5. **Measure in the new Search Console**: watch non-brand impressions/clicks (Performance → filter out `hawiyat*`), indexation of new pages, and CTR on rewritten titles. Tie landing-page views to PostHog (`service_page_viewed` already fires) to connect search → order funnel.

## 5. What was deliberately not done

- **OpenSEO/DataForSEO**: skipped — no API key, and the user chose the free path. Revisit when rank-tracking competitors/backlinks justifies the spend.
- **US/international chasing**: the impression volume there is spam/bot noise, not demand.
- **Production deploy of the preview branch**: all on-site fixes above are still unshipped (branch `feat/agentic-analytics-preview`, `main` untouched). The `/dcma`, `/templates`, and title work in §3 can ship independently of the analytics work.

## Appendix — raw signals used

- Queries: 45 distinct, top non-brand `chatgpt algeria` (1 imp, pos 7), `baridimob api` (1 imp, pos 8); ~20 brand misspellings all pos 1–3.
- Pages: `/` + `/` (www) 426 clicks combined; `/dcma` 346 imp; `/templates` 1,280 imp; docs subdomain carries the dev-query tail.
- Countries: DZ 425 clicks; FR 6; 60+ countries with impressions and 0 clicks (bot/long-tail noise).
- Trend: mid-June spike (131 imp/day, pos ~30) settling to ~25 imp/day, pos 3–15; stable brand baseline ~5–10 clicks/day.
