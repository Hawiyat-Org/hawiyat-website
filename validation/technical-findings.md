# Technical Feasibility Validation — Hawiyat AI Infrastructure Rebrand Implementation Plan

**Plan:** `docs/superpowers/plans/2026-08-08-hawiyat-ai-infrastructure-rebrand-implementation.md`
**Spec:** `docs/superpowers/specs/2026-08-08-ai-infrastructure-rebrand-design.md`
**Design system:** `DESIGN.md` v2.0
**Date:** 2026-08-08
**Validator role:** Senior Full-Stack Engineer (technical feasibility, READ-ONLY)

---

## Verdict: PASS_WITH_CONDITIONS

The plan is buildable as written: every task maps to real files, the stack claims check out against `package.json`/`tailwind.config.js`/`app/layout.tsx`/`app/globals.css`, the Prisma diagnosis is accurate, all dead-code deletions are verified safe, the redirect mechanism is correct, and all token hex values match DESIGN.md exactly. However, **four IMPORTANT conditions must be resolved** or the plan's own verification gates will fail and/or the shipped UI will be visibly broken:

1. Task 2's token install creates a real `--border`/`--muted` collision with the retained shadcn HSL set (same var names, incompatible value types; the Tailwind snippet also destroys the `muted.foreground` key used by ~30 files).
2. The mandated `npx tsc --noEmit` gate cannot pass: pre-existing dead code `lib/helper.ts` references Prisma models that don't exist, and `test/email-test.ts` imports the email template Task 1 removes.
3. Task 7/8 leave keep/drop decisions for six home components (and `ai-playground.tsx`) unresolved — the Interfaces block and Step 8 contradict each other, and Task 8's deletion list omits the components the lean home makes dead.
4. Task 6 Step 4 references a non-existent `tagStyleMap` identifier.

---

## Findings by severity

### BLOCKER
None. `pnpm build` (which ignores TS/ESLint per `next.config.mjs:3-8`) will succeed across all tasks; nothing prevents the page rebuilds from compiling.

### IMPORTANT

**I-1. `--border` / `--muted` token collision with the shadcn HSL set — Task 2 Steps 2–4 cannot be applied verbatim.**
- Refs: plan lines 80–142; `app/globals.css:47` (`--muted: 0 0% 96.1%`), `:53` (`--border: 0 0% 89.8%`), `:120` (`* { border-color: hsl(var(--border)); }`), `:128–135` (`@layer base`); `tailwind.config.js:20` (`border: "hsl(var(--border))"`), `:37–40` (`muted: { DEFAULT, foreground }`).
- What's wrong:
  - The new token set redefines `--border` and `--muted` as hex while the plan says "keep shadcn HSL set" — two declarations of the same custom property, one an HSL triple, one a hex. The winner depends purely on declaration order; no step says to delete the shadcn declarations. This is exactly the `--border`-defined-twice conflict — it is real.
  - `* { border-color: hsl(var(--border)); }` (globals.css:120) becomes invalid CSS once `--border` is a hex (`hsl(#E4E2DC)`), so border-color only survives via the lower-cascade-priority `@layer base * { @apply border-border }` rule.
  - The Step 4 snippet sets `muted: "var(--muted)"` (plan line 129) while the comment says "keep shadcn mappings unchanged". A string value **replaces** the shadcn `{ DEFAULT, foreground }` object — `text-muted-foreground` (used in ~30 files) and `bg-muted-foreground` utilities would no longer be generated.
  - Because `colors.border`/`colors.muted` are overwritten, every existing `bg-muted` / `bg-muted/30` / `dark:bg-muted` usage flips from shadcn light-gray HSL to the new mid-green text color `#62665F`.
- Why it matters: build passes, but existing pages and the new ExecutionTrace render with broken backgrounds/borders, and `text-muted-foreground` silently vanishes.
- How to fix: (a) explicitly delete the shadcn `--border`/`--muted` HSL declarations from both `:root` and `.dark`, delete the `* { border-color: hsl(var(--border)) }` rule, and keep shadcn's `muted.foreground` mapping by renaming either the shadcn var (`--muted-bg`) or the new token (`--muted-text` — DESIGN.md hard-names `--muted`, so renaming the shadcn side is cleaner); (b) in `tailwind.config.js`, keep `muted: { DEFAULT: ..., foreground: ... }` for shadcn and map the new text-muted token under `muted`-DEFAULT only if every `bg-muted`/`from-muted` consumer is migrated to `bg-surface-dim` in the same task; (c) add a Task 2 Step that runs `rg -n "bg-muted|from-muted|to-muted|text-muted-foreground" components app` and fixes each hit.

**I-2. The `npx tsc --noEmit` gate (Global Constraint 6, Task 1 Step 6, every task) cannot pass with pre-existing dead code untouched.**
- Refs: `lib/helper.ts:67,70,88,136` (`prisma.invoice.count()`, `prisma.invoice.create`, `prisma.payment.create`, `prisma.payment.update`); `prisma/schema.prisma` (no Invoice/Payment — dropped by `prisma/migrations/20250929211139_init/migration.sql`); `tsconfig.json:25` (`include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ...]`); `test/email-test.ts:6` (`import { sendBookingConfirmationEmail } from '../lib/email-utils'`); plan Task 1 Step 5 removes schedule email templates from `lib/email-utils.ts:40–200`.
- What's wrong: `lib/helper.ts` is unimported dead code (verified by rg) referencing Prisma models absent from the schema — tsc errors today, before Task 1 does anything. And Task 1's removal of `sendBookingConfirmationEmail` breaks `test/email-test.ts` (its only other consumer besides the deleted schedule route), which tsc will flag. The plan neither deletes nor fixes either file, so its own gate fails at Task 1 and every task after.
- Why it matters: implementers following the plan verbatim hit an unexplained `tsc` failure with no remediation step.
- How to fix: add to Task 1: "Delete `lib/helper.ts` (dead code referencing dropped models) and update or delete `test/email-test.ts` (imports removed `sendBookingConfirmationEmail`)". Optionally add a Task 1 Step 0: `npx tsc --noEmit` baseline to confirm the pre-existing failures.

**I-3. Task 7/8 keep/drop decisions for home components are contradictory and incomplete.**
- Refs: plan Task 7 Interfaces (home order = Hero→Pricing→Proof band→Algeria band→FAQ→CTA→Newsletter — no Benefits/PrebuiltTools/AdditionalFeatures/OneSubscription/BuildAIApps/Resources) vs Task 7 Step 8 ("restyle to tokens… drop `build-ai-apps.tsx` and `resources.tsx` from home if not needed… decide by lean-home principle") vs Task 8 deletion list (deletes only bootcamp-effects, registration-modal, floating-elements, services-teaser, testimonials, conditional ai-playground, styles/globals.css).
- What's wrong: the Interfaces block defines a lean home that excludes six components, but Step 8 tells the implementer to "decide" and Task 8's cleanup list never lists `benefits-section.tsx`, `prebuilt-tools.tsx`, `additional-features.tsx`, `one-subscription.tsx`, `build-ai-apps.tsx`, `resources.tsx` for deletion — leaving them either dead code or contradicting the Interfaces. Separately, Task 7 Step 3 converts `ai-playground.tsx` into the Execution Console the hero embeds, while Task 8 Step 3 says delete it "if fully replaced — else keep as Execution Console" — deleting it after conversion breaks the hero; the condition is never defined.
- How to fix: make each of the six components an explicit DELETE (add them to Task 8 Step 3, after Task 7 rewrites `app/page.tsx`) or an explicit KEEP-with-new-copy; pin `ai-playground.tsx` as KEEP (it IS the Execution Console after Task 7 Step 3) and remove the conditional deletion from Task 8.

**I-4. Task 6 Step 4 references a non-existent `tagStyleMap`.**
- Refs: plan line 283; `components/services/services-catalog.tsx:30–94` (the ordering mechanism is `CARD_ORDER`, not `tagStyleMap`) and `:204` (category rendered as a plain badge).
- How to fix: reword to "adjust the `CARD_ORDER` map (services-catalog.tsx:77–94) so Composer/execution tiers sort first, and update the category badge rendering (line ~204) for the new `AI Execution` / `Managed Systems` / `Cloud Runtime` categories".

### MINOR

- **M-1.** `/hawiyat-composer` → `/composer` redirect (Task 4) targets a route that doesn't exist until Task 5. Between Tasks 4 and 5, `/hawiyat-composer` 308s to a 404. Mechanism is correct (next.config redirects() permanent → 308). Suggest noting the interim 404 or building a stub `/composer` in Task 4.
- **M-2.** ExecutionTrace interface block (Task 3) declares `showTelemetry?: boolean` but the Step 2 code implements `className` and omits `showTelemetry`. Align the Interfaces block with the code.
- **M-3.** Task 1 wording: schedule models aren't actually in schema.prisma today (only in migrations); `components/schedule/` has 4 files not 3; `lib/date-utils.ts` is dead schedule-helper code not matched by the sweep.
- **M-4.** Transient broken state inside Task 4: Step 1 deletes `app/guides/` while `app/sitemap.ts:3` still imports `@/app/guides/claude/_data` until Step 5. Fine if steps run in order; note it.
- **M-5.** `db:reset` produces a database missing the order tables (no migration creates orders/email_subscriptions/bootcamp_registrations). Pre-existing drift; gate Task 9 on `db:push` only or add corrective migration.
- **M-6.** Task 8 deletion-list editorial artifact `app/dcma (keep? no — keep /dcma)` is noise; `/dcma` stays per GC9.
- **M-7.** `NEXT_PUBLIC_ENTERPRISE_SCHEDULE_URL=https://www.hawiyat.org/schedule` (DESIGN.md line 377) points to a route Task 1 deletes; no plan step updates the env contract.

## Verified-correct claims
- Stack realism: all accurate (`next@14.2.32`, lucide-react, framer-motion, GSAP npm, Prisma 6.x, shadcn). Space Grotesk in layout; Bootstrap CDN at layout:180-186; legacy @imports at globals:1-2; `poly` fontFamily in tailwind.
- Token values: all 14 light + 14 dark hex match DESIGN.md §Palette exactly.
- Prisma/schedule: `seed.ts` is literally the availability API route referencing nonexistent models — `db:push`/`db:reset` fail today; Waitlist restore correct; sequencing sound.
- Redirect: next.config redirects() + permanent:true is correct Next 14; middleware rate-limiter unaffected.
- Dead-code deletion: bootcamp-effects, registration-modal, floating-elements, services-teaser, styles/globals.css zero imports; testimonials imported-but-commented (T7 rewrites page first → T8 safe); all originalPrice render sites guarded.
- Interfaces: service ids composer-pro/max5x/max20x exist; getServiceBySlug/getAllServiceSlugs exist; createMetadata exists in lib/seo.ts.

---

**Verdict:** PASS_WITH_CONDITIONS
**BLOCKER/IMPORTANT:** I-1 `--border`/`--muted` collision with shadcn HSL set breaks `text-muted-foreground`/`bg-muted` across ~30 files; I-2 dead `lib/helper.ts` + `test/email-test.ts` break the mandated `npx tsc --noEmit` gate; I-3 Task 7/8 keep/drop of six home components and `ai-playground.tsx` contradictory; I-4 Task 6 references non-existent `tagStyleMap`.
