# Spec: Hawiyat Monochrome Home Redesign

> Status: DRAFT for founder review. Source research: `.superpowers/sdd/2026-08-08-hawiyat-monochrome-redesign/{design,engineering,frontend,marketing,seo,legal}-findings.md`. Branch: `rebrand/ai-infrastructure-identity`. This is a **strategic merge** — the old hawiyat.org layout already exists in git history (commit `f547cca`); we restore LAYOUT MECHANISMS only, never the reseller copy.

## Objective

Rework the Hawiyat site to the founder's monochrome, humanified, hawiyat.org-faithful aesthetic **while keeping the execution-layer positioning** (Hawiyat AI Composer, no reseller framing). Deliver: full black-to-white accent scale (keep dark mode), simple hero (title + subtitle + two buttons), partners marquee carousel, switchable MAX pricing cards, "Our Numbers" stat band, newsletter removed, Algeria band moved to `/about`, minimal motion, less border-radius, and the header theme-toggle hydration error fixed.

**Success criteria:**
- No chromatic accent tokens remain except `--danger` (red) and `--ok` (green); everything else is black→white scale.
- Home order is exactly: Hero → Partners marquee → Our Numbers → Pricing (PRO / switchable MAX 5X-20X / Enterprise) → FAQ → CTA → Footer.
- Newsletter component + `/api/subscribe` + `EmailSubscription` Prisma model removed; privacy policy §4 updated.
- Algeria band renders on `/about` only.
- Hydration error ("Expected `<circle>` in `<svg>`") gone — verified in browser with dark mode + reload.
- Build green: `npx tsc --noEmit`, `pnpm lint`, `pnpm build`.
- No "2x Claude credits"/reseller copy reintroduced anywhere (execution-layer copy retained).

## Tech Stack
Next.js 14 App Router (`next@^14.2.32`) · React 18 · TypeScript · Tailwind CSS · Prisma/Postgres · shadcn/ui · lucide-react · GSAP (composer-only scroll) · framer-motion (dependency present, **not** used by new motion budget).

## Commands
```
pnpm dev              # Dev server (localhost:3000)
pnpm build            # Production build (runs prisma generate)
pnpm lint             # Next.js linting
pnpm db:push          # Push schema to DB + seed (Docker PG: postgres:postgres@localhost:5432/hawiyat_db)
pnpm prisma generate  # Generate Prisma client only
npx tsc --noEmit      # Type check (build ignores TS — run this explicitly)
```

## Project Structure (relevant to this change)
```
app/
  page.tsx                    # Home rebuild: Hero → PartnersMarquee → Pricing → OurNumbers → FAQ → CTA → Footer
  about/page.tsx              # + AlgeriaBand section (moved from home)
  composer/page.tsx           # Unchanged structurally (execution details)
  api/subscribe/route.ts      # DELETE (newsletter teardown)
  globals.css                 # Token VALUES → monochrome; radius lowered; #dashboard block removed
components/
  header.tsx                  # Hydration fix (mounted-guard theme toggle) + nav (Pricing → /#pricing) + mono pill CTA
  hero-section.tsx            # Strip console + #dashboard → simple centered title/sub/2 buttons
  ai-playground.tsx           # DELETE (only hero imported it)
  partners-marquee.tsx        # NEW — marquee mechanism from f547cca + current partner data + ItemList JSON-LD
  our-numbers.tsx             # NEW — static 4 verified stats (monochrome, string-safe)
  trusted-brands.tsx          # REMOVE (split into the two above)
  pricing.tsx                 # Restyle: rounded-lg, ink buttons, no glow/scale; keep data-driven switchable MAX
  newsletter.tsx              # DELETE
  algeria-band.tsx            # Keep file; mount on /about instead of home
  faq.tsx, call-to-action.tsx, footer.tsx, whatsapp-widget.tsx  # Restyle to monochrome/radius
  scroll-animations.tsx       # Remove #dashboard refs; keep reveal-up + trace-line (composer uses)
  animated-text.tsx, animated-counter.tsx  # DELETE (dead code)
prisma/schema.prisma          # Remove EmailSubscription model
tailwind.config.js            # Add signal-hover key; radius scale
```

## Code Style
- **Tokens only, no raw hex in components.** All color changes happen in `app/globals.css` + `tailwind.config.js`.
- Keep token NAMES (`--signal*`/`--ember*`), re-point VALUES to grayscale — minimizes churn; semantic meaning shifts to "primary action fill"/"secondary gray accent".
- `text-muted-ink` for muted text (GC13); `bg-signal text-signal-text` for primary CTAs.
- Monochrome button spec: primary = `bg-signal text-signal-text rounded-lg hover:bg-signal-hover`; secondary = outline `border border-ink text-ink hover:bg-ink hover:text-paper` (inverts in dark via tokens).
- Radius: `rounded-lg` cards/buttons, `rounded-md` inputs, `rounded-full` ONLY tiny pills/toggles.
- No `hover:scale-*` transitions in the new motion budget. Keep `.marquee` CSS + `prefers-reduced-motion` guard.
- Humanified copy per `.agents/product-marketing.md` + marketing findings (implementation-ready strings).

## Testing Strategy
No formal suite (per AGENTS.md). Manual + gates:
- `npx tsc --noEmit` (exit 0), `pnpm lint` (0 errors), `pnpm build` (25/25).
- `pnpm db:push` against Docker Postgres after EmailSubscription removal.
- Browser check: `/` home order + monochrome in light+dark; `/about` has Algeria band; `/composer` unchanged & token-correct; hydration error gone (dark mode + reload); marquee scrolls + pauses on hover + respects reduced-motion; pricing switchable MAX works; newsletter gone from home + footer.
- `rg` gates: no `bi-`, no raw `bg-[#`, no `font-serif`, no `2x Claude|LLM Credit|Claude Code|cheap|50B|60+|300 Templates` in renderable files.

## Boundaries
- **Always:** run tsc + lint + build after each task; keep `lib/data/services.ts` untouched (pricing source of truth); keep `lib/rate-limiter.ts`; keep execution-layer copy; preserve `prefers-reduced-motion`; use tokens only.
- **Ask first:** any Prisma schema change beyond EmailSubscription removal; deleting prod `email_subscriptions` table rows; renaming token names vs re-pointing values; moving sections not in this spec.
- **Never:** reintroduce reseller copy or `f547cca` keyword-stuffed JSON-LD; add new hex in components; delete `/composer` functionality; add new framer-motion/GSAP animations; reintroduce `bi-*`/Bootstrap icons.

## Open Questions
- Newsletter teardown: confirm prod `email_subscriptions` rows should be deleted (legal recommends yes; needs owner sign-off).
- `EmailSubscription` model removal is a schema change — confirmed in scope by founder (newsletter removal).
