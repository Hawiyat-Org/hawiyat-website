# Sequencing & Dependencies — Validation Findings

**Plan:** `docs/superpowers/plans/2026-08-08-hawiyat-ai-infrastructure-rebrand-implementation.md`
**Verdict:** **PASS_WITH_CONDITIONS**

The linear T1→T9 order is topologically sound and buildable as written — every producer/consumer pair verified against the repo; no consumer scheduled before its producer; no build break from any stated ordering. Three conditions must be addressed before execution.

## BLOCKER

**BLOCKER-1 — T1 scope gap fails its own verification gate (`test/email-test.ts`).**
- T1 Step 5 removes schedule email templates from `lib/email-utils.ts` → deletes `sendBookingConfirmationEmail` export. `test/email-test.ts` imports it, and `tsconfig.json` includes `**/*.ts` (exclude only node_modules). T1 Step 6 `npx tsc --noEmit` → fails.
- **Fix:** add `test/email-test.ts` to T1's Files — delete it (tests removed feature) or repoint at `sendOrderConfirmation`/`sendOrderNotification` (which remain).

## IMPORTANT

**IMPORTANT-1 — T5's "Consumes: `lib/data/services.ts`" contradicts its position before T6.**
- T5 runs before T6 (de-resellerize). If `/composer` reads service names/prices, it renders pre-rename reseller data. T5 steps never actually import services data (CTA is a bare link). Fix: drop `lib/data/services.ts` from T5's Consumes (page needs only the `/services` CTA) or move T6 ahead of T5.

**IMPORTANT-2 — Parallelization corrupts shared state if done in one checkout.**
- T1 and T2 both end with `pnpm build` = `prisma generate && next build`. Two concurrent builds in same working tree race on `.next/` + `node_modules/.prisma/client`. Fix: if parallelizing, use git worktrees (one per wave), merge between waves; never run two `pnpm build` in the same tree concurrently.

**IMPORTANT-3 — Intermediate broken-link state between T4 and T5 (and T4→T7).**
- After T4 commits, nav/footer/sitemap/redirect target `/composer` which doesn't exist until T5; home still links `/ai-algeria` (deleted T4) until T7. No build break, but branch not reviewable/deployable in that window. Fix: document (branch-only work) or tighten order to T4 → T5 immediately.

## MINOR

- MINOR-1: T4/T8 double-delete `bootcamp-effects.tsx` + `registration-modal.tsx`. Dedupe — T4 owns orphan API routes, T8 owns file deletions.
- MINOR-2: T1/T4 both touch `components/footer.tsx` + `app/sitemap.ts` — serialization point.
- MINOR-3: T3/T8 both touch `components/scroll-animations.tsx` — keep sequential.
- MINOR-4: T4 Files block says "Create: `app/composer/page.tsx` (redirect target — built in Task 5)" but no T4 step creates it. Reword.
- MINOR-5: T7 Consumes cites "Task 4 policy" for proof numbers — policy is Global Constraint 5, not T4. Fix cross-reference.
- MINOR-6: `lib/date-utils.ts` dead code not in any delete list. Add to T8 Step 3.
- MINOR-7: T2 CDN removal leaves 41 `bi-*` icons broken until later sweeps (visual-only, on branch). Ensure T4/T7/T8 span all 9 files; `video-modal.tsx` not in any task list — T8's rg sweep catches it.
- MINOR-8: T2 legacy-var swap regression window — `.btn`, `.footer-link`, `.purple-bg-grad`, `.hero-bg-gradient` reference replaced vars. T2 Step 1 inventory mitigates but doesn't prevent visual gap until T7/T8.
- MINOR-9: T8's sweep re-derives its list via `rg` (correct) — make explicit so executor doesn't use T2's stale audit list for files T7 rewrote.

## Recommended Task Order

**Linear (safe, matches plan — works as-is after BLOCKER-1/IMPORTANT-1 fixes):**
`T1 → T2 → T3 → T4 → T5 → T6 → T7 → T8 → T9`

**Parallel (separate worktrees per wave, merge between waves; serialized `pnpm build` per tree):**
- Wave 1: T1 ∥ T2 (disjoint file sets)
- Wave 2: T3 ∥ T4 ∥ T6 (T3/T4 need T2; T6 independent)
- Wave 3: T5 ∥ T7 (T5 needs T3+T4; T7 needs T3+T6; merge T5 first)
- Wave 4: T8
- Wave 5: T9

## Interface contract summary (all verified satisfied in plan order)
- `ExecutionTrace` props (T3) → T5/T7 ✓
- tokens/tailwind map (T2) → T3/T4/T5/T6/T7/T8 ✓
- service ids/categories (T6; ids preserved) → T7, sitemap, `/services/[slug]` ✓
- redirect source/dest (T4) → dest created T5 ✓
- `createMetadata` (pre-existing, unmodified) → T5/T6 ✓
- `Waitlist` model (T1) → `app/api/waitlist` (kept in T1) ✓

---

**Verdict:** PASS_WITH_CONDITIONS
**BLOCKER:** T1 deletes `sendBookingConfirmationEmail` but `test/email-test.ts` still imports it → T1's own `tsc --noEmit` gate cannot pass; add the test file to T1's scope.
**IMPORTANT:** T5 lists `lib/data/services.ts` as consumer but runs before T6 — remove claim or move T6 first. Parallelizing T1∥T2 in one checkout corrupts `.next`/Prisma client — use worktrees or stay linear. T4→T5 gap leaves nav/footer/redirect pointing at non-existent `/composer` — document or reorder T5 directly after T4.
