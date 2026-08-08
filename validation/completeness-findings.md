# Spec Completeness & Consistency — Validation Findings

**Plan:** `docs/superpowers/plans/2026-08-08-hawiyat-ai-infrastructure-rebrand-implementation.md`
**Spec:** `docs/superpowers/specs/2026-08-08-ai-infrastructure-rebrand-design.md` (source of truth)
**Verdict:** **PASS_WITH_CONDITIONS** (1 BLOCKER + 7 IMPORTANT resolved before/during execution; coverage otherwise complete — every spec §2–§10 bullet maps to at least one task)

## BLOCKER

**B1 — Spec §6 `/services` metadata + JSON-LD not covered (Task 6 wrong file).**
`app/services/layout.tsx` (not `page.tsx`) exports `createMetadata({ title: "AI Subscriptions and Managed Services in Algeria", … })` and injects a JSON-LD `serviceSchema` ItemList naming "Hawiyat Composer and Claude Code" and "LLM Credit". Task 6's Files list and Step 6 target only `app/services/page.tsx`. No task touches layout.tsx; `npx tsc --noEmit` + `pnpm build` pass; T9 S3's regex `Hawiyat Composer\+Claude` does not match "Hawiyat Composer **and** Claude Code" (the "and" form in the schema). End state ships the old reseller title and forbidden Claude-Code branding in structured data — GC1/GC8 + spec §6 unmet.
**Fix:** add `app/services/layout.tsx` to Task 6 Files; update metadata title/description and the ItemList names to "Hawiyat AI Composer" / "AI Composer access"; add `and Claude Code|LLM Credit` to T9 S3 regex.

## IMPORTANT

- **I1 — Phantom identifier `tagStyleMap` (Task 6 Step 4).** `services-catalog.tsx` has no `tagStyleMap`; ordering is `CARD_ORDER` (line 77), tag colors are inline `cn()` ternary chain keyed on `tag`. Fix: reference `CARD_ORDER` + the tag-color `cn()` block explicitly.
- **I2 — Numbers-policy leak: `60+ live clients` survives (GC5).** In `lib/data/services.ts` seoContent: n8n (L167), hosting-basic (L344), evolution-api (L473), hosting-vip (L758). Task 6 rewrites composer entries only; T9 S3 regex has no `60\+` pattern. Fix: add scrub step for legacy client-count claims; extend T9 S3 regex.
- **I3 — Launch-price removal scoped too narrow (spec §6 catalog-wide).** n8n-hosting Freelance (`originalPrice: "15,000"` + launchNote) and evolution-api (`originalPrice: "14,000"` + launchNote) still render strikethrough after T6. Fix: scope removal to all services or justify keeping.
- **I4 — Home section disposition contradiction (Task 7 Step 8 vs Interfaces).** Interfaces excludes benefits/prebuilt/additional/one-subscription; Step 8 says "restyle… or drop … decide by lean-home principle" — no hard decision; DESIGN.md §Page Structure mandates a 15-section home. Fix: state per component — the four are removed from home; their content is owned by `/composer` (T5 S4/S5/S7); keep CTA + newsletter restyled.
- **I5 — Task 9 Step 5 "design audit" is unverifiable** ("reuse the three validator briefs from the earlier review" — artifact not present). Fix: inline the audit checklist (tokens-only; exactly 2 fonts; lucide-only; CTA `--signal` fill + `--signal-text`; proof-band TODO/verified numbers; "Hawiyat AI Composer" naming; no refs to removed routes).
- **I6 — WhatsApp widget (primary contact, GC9) not preserved in T7 S1 rewrite.** Fix: explicitly keep `WhatsAppWidget` + `ScrollAnimations` + Footer in the rewritten page.
- **I7 — T9 S3 rename audit regex misses plain "Hawiyat Composer".** Only matches `Hawiyat Composer\+Claude`. Fix: add pattern `Hawiyat Composer(?! AI)` or separate grep.

## MINOR

- M1: T1 "components/schedule/ (all 3 files)" — actually 4 files. Deleting whole dir fine; count wrong.
- M2: T4 S5 sitemap edit doesn't mention dropping the `SECTIONS` import from `@/app/guides/claude/_data` (sitemap.ts L3) — deleting `app/guides/` in S1 breaks the build unless import removed same task.
- M3: T3 Interfaces declare `showTelemetry?: boolean`; Step 2 code defines only `stages/active/telemetry/className`. Align.
- M4: T2 new `--border`/`--muted` hex tokens overwrite shadcn HSL vars; opacity modifiers (`border-border/60`) must be validated against var() colors (Tailwind ≥3.4 color-mix).
- M5: T7 S6 `trusted-brands.tsx` StatCard animates integers with `+` prefix (`useCounter`) — cannot render `2.6M` or `TODO` strings; needs string/format-aware rework. Also ships fabricated "300 Templates"/"10 Resellers" today — replaced by S6.
- M6: legacy CSS (`.purple-bg-grad`, `.gradient-text`) inventoried (T2 S1) but never explicitly deleted from globals.css.
- M7: T4 S7 verification regex omits `/hawiyat-composer`; leftover links (benefits-section L40/L59) wouldn't be flagged. Moot if I4 removes them.
- M8: `components/video-modal.tsx` exists, imported nowhere, no task mentions it — dead file remains.
- M9: T8 S3 delete list contains self-debating `app/dcma (keep? no — keep /dcma)` noise.
- M10: T1 lists `components/services-teaser.tsx` under Modify but only deleted in T8; misleading.
- M11: T1 S2 Waitlist restore should verify model satisfies `prisma.waitlist` usage (ipAddress, userAgent, createdAt, unique email).
- M12: hero eyebrow differs DESIGN.md §2 vs spec §4.1; plan follows spec — note deliberate override.
- M13: DESIGN.md is stale vs approved spec (metrics `+60 clients`/`+50B tokens`, enterprise CTA → /schedule, §12b tier naming, 15-section home) — plan correctly follows spec; document so implementers don't "fix" back.

## Verified-consistent
- Token hex values match DESIGN.md §Palette exactly (light+dark).
- Service ids composer-pro/max5x/max20x exist; getServiceBySlug (L869); createMetadata/SITE_URL in lib/seo.ts.
- schema.prisma currently has exactly Order/EmailSubscription/BootcampRegistration; Waitlist is drift; seed.ts is broken copy of availability route — T1 diagnosis accurate.
- Schedule-model usage confined to app/api/schedule/* + seed — T1 removal complete.
- testimonials.tsx imported-but-commented (page.tsx L46) — T7 S1 drops import, T8 deletes: safe ordering.
- /dcma = permanentRedirect("/dmca") ✓ GC9.

---

**Verdict:** PASS_WITH_CONDITIONS
**BLOCKER:** B1 — `/services/layout.tsx` metadata + JSON-LD ItemList ("Hawiyat Composer and Claude Code", "LLM Credit") never updated; T6 targets wrong file; ships reseller branding in structured data.
**IMPORTANT:** I1 `tagStyleMap` phantom; I2 `60+ clients` leak; I3 launch-price scope; I4 home component disposition contradiction; I5 unverifiable design audit; I6 WhatsApp widget not preserved; I7 rename regex gap.
