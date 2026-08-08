# Marketing Validation Findings — Hawiyat AI Infrastructure Rebrand

**Validator:** Marketing validator (subagent) · **Date:** 2026-08-08
**Plan:** `docs/superpowers/plans/2026-08-08-hawiyat-ai-infrastructure-rebrand-implementation.md`
**Verdict:** **PASS_WITH_CONDITIONS**

Positioning discipline is genuine and consistent (execution layer everywhere, `+50B` ban enforced, verified-only proof numbers), conversion flow defensible. Passes on condition: (1) `/ai-algeria` gets a redirect + the Algeria band carries its trust content; (2) LLM Credit rename is actually de-resellerized in copy; (3) a copy-review acceptance checklist is added; (4) `.agents/product-marketing.md` gap acknowledged/mitigated.

## BLOCKER
None. No task ships fabricated stats. Positioning constraint is a hard Global Constraint enforced across tasks.

## IMPORTANT

**I1. `/ai-algeria` deleted with NO redirect and no SEO mitigation — indexed URLs 404 and the "AI in Algeria" wedge dies for search.**
- Task 4 Step 1 deletes `app/ai-algeria/`; only `/hawiyat-composer` gets a redirect. `/ai-algeria` has priority 0.9 in sitemap, canonical, 4 Q&A, real long-tail keywords ("ai algerie", "intelligence artificielle algerie"). The Algeria band is a home section with no URL/metadata/sitemap entry.
- **Fix:** (a) add `{ source: "/ai-algeria", destination: "/", permanent: true }` to Task 4 redirects; (b) Task 7 Step 5 band must inherit the deleted page's trust payload — registered Algerian société, facturation, model-ownership disclaimer — not just "DZD, Algiers HQ, Itihad + Label, AR/FR/EN"; (c) optionally keep a sitemap-able home anchor with id.

**I2. `LLM Credit → "AI Composer access"` is a rename-only reframe; the SKU and copy stay reseller-shaped.**
- Current llm-credit entry: "OpenAI credits served through Hawiyat Composer", "2500 DA for 10 USD credits", features "OpenAI model access… Token usage optimization". Renaming without rewriting the pricing unit ships the old positioning under a new label — a literal LLM reseller SKU.
- **Fix:** in Task 6, explicitly rewrite llm-credit copy: price the layer in DZD (per-task cost line), drop "OpenAI credits"/"10 USD"/"Token usage optimization", rewrite seoContent/faq. Add "llm-credit" to T9 S3 grep file set.

**I3. Copy is under-specified for subagent execution: no copy-review acceptance criteria; Task 9 audit is string-grep only.**
- Bulk shipping copy (proof-band descriptions, enterprise section, Why-not-DIY, 6 capability card bodies, Algeria band body, FAQ answers, entire 8-entry services rewrite) left to voice rules. T9 S3 grep catches forbidden strings, not positioning drift. Non-composer entries have no owning copy task: hosting-basic ships "cheap hosting algeria"/"hebergement pas cher algerie" keywords which the grep WILL flag but no task fixes.
- **Fix:** add a copy-review acceptance checklist to Task 9 (no claim without source; no cheap/affordable opener; models as routes not SKU; "is this the execution layer talking?"; AI Composer naming; keywords pruned). Extend audit grep to `affordable|unlimited|cheapest|pas cher|credits|10 USD` across all 8 entries.

**I4. Missing `.agents/product-marketing.md` — plan ships full marketing build with no validated product-context doc.**
- Confirmed absent. Copy quality depends on whether each subagent reads DESIGN.md §1 & §9.
- **Fix:** before Task 5, create `.agents/product-marketing.md` distilled from DESIGN.md §Identity & Positioning + vision report (positioning statement, 3 ICP segments with pains, proof points with sources, objection handling, "what we are NOT"). Add "Copy tasks MUST read .agents/product-marketing.md (or DESIGN.md §1/§9)" to Tasks 5/6/7.

**I5. DESIGN.md itself still documents the forbidden proof stat — a faithful subagent will re-ship `+50B`.**
- DESIGN.md line 203 (TrustedBrands spec): "Add second strip: metrics (`+60 clients`, `+50B tokens`, `p95 latency`, `DZD checkout`)". Task 7 Step 6 rebuilds trusted-brands.tsx and cites DESIGN.md as source of truth. GC5 bans `+50B` but the component spec contains it verbatim.
- **Fix:** add to GC5/T7 S6: "DESIGN.md §4 TrustedBrands spec is SUPERSEDED by GC5 — do not copy `+50B tokens`/`+60 clients` from it." Optionally patch DESIGN.md line 203 in the same commit.

## MINOR

- M1: Pricing-before-proof is defensible for technical operators (DZD anchor doubles as positioning); flag for A/B later. Consider one verified stat in hero telemetry.
- M2: Shipping visible `TODO:` placeholders on a production marketing site looks unfinished. Render only the two verified stats (`100+ clients`, `2.6M DA ARR`) + logos; hide non-verified metrics entirely. Add T9 gate: "no literal `TODO` string renders on any page."
- M3: Enterprise card needs "Custom pricing" label; WhatsApp CTA should be prefilled ("Hello, we need the full stack — Composer + n8n + Evolution + Platform…"); add mailto fallback; confirm the business WhatsApp line is staffed for sales.
- M4: "Trusted by" mixes clients and partners (Itihad=incubator, ESTIN=university). Title strip "Partners & early customers" or verify usage consent.
- M5: Render "≈2.6M DZD ARR" with `≈` and `DZD` always attached (international readers misparse as USD); keep MRR off the public band.
- M6: MAX 5X/20X names carry credit-multiplier residue. In card copy define the unit ("5X base execution capacity — more parallel runs/tasks"), never "5x Claude credits".
- M7: Meta Pixel Purchase fires on order submission, not payment (pre-existing; note as follow-up, don't block).
- M8: layout.tsx keywords still contain "reduce ai costs", "llm caching", "vps pas cher algerie", "hebergement pas cher algerie" — Task 2 Step 6 should prune/reframe keyword list.

## What validates well
- Positioning consistency: all concrete headlines execution-layer & model-agnostic. No proposed copy reads "cheap AI" except LLM Credit gap.
- Proof & claims discipline: GC5 verified-only policy, `+50B` ban, T9 proof audit strong; plan correctly identifies/removes currently-shipped fabricated `+50B` and "10 Resellers/300 Templates".
- Enterprise full-stack narrative present on /composer, home Enterprise card, reordered catalog.
- Audience fit: DZD pricing, WhatsApp-first, facturation, AR/FR/EN support, Algeria band.

---

**Verdict:** PASS_WITH_CONDITIONS
**BLOCKER:** none.
**IMPORTANT:** I1 /ai-algeria deleted with no redirect + band must inherit trust content; I2 LLM Credit rename-only reframe stays reseller-shaped; I3 no copy-review acceptance checklist + grep-only audit; I4 missing product-marketing.md; I5 DESIGN.md line 203 still documents forbidden `+50B tokens`/`+60 clients`.
