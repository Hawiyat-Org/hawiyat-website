# Hawiyat — Product Marketing Context

> **Copy-context source for every marketing page.** Read this before writing any page, section, card, headline, sub, or metadata (Tasks 5/6/7). Distilled from `DESIGN.md` §Identity & Positioning + §Copy & Voice and the rebrand spec `docs/superpowers/specs/2026-08-08-ai-infrastructure-rebrand-design.md`. There is no separate vision-report file in the repo; these two docs are the source of truth.

---

## 1. Positioning statement

**North star:** *"Whatever AI exists tomorrow, businesses will need a layer that decides how to use it. That layer could be Hawiyat."*

**One-sentence definition:** Hawiyat is an **AI infrastructure platform** — the execution layer between frontier AI models (GPT, Claude, Gemini, open models) and business systems (WhatsApp, CRM, ERP, email, databases, workflows) — and it decides the best way to accomplish each task.

**The one thing a visitor must be able to say after leaving:** *"Hawiyat is the execution layer that runs my AI between any model and my systems."*

**The website's single job:** convert the belief that "AI in emerging markets is messy, fragmented and expensive" into "Hawiyat executes my AI — correctly and reliably, in DZD, close to home." Cost is the **final proof point**, never the opener.

**Product naming:** the product is **Hawiyat AI Composer** (shorthand "Composer" is fine in UI labels). It is the execution engine. "Composer" = the engine; "Execution Console" = the UI. A unit of work shipped by Hawiyat is a **run** (`task → plan → route → execute → evaluate`).

---

## 2. What we are NOT (always render as our counter in copy)

- ❌ An **agency** — we are infrastructure, not services.
- ❌ An **automation tool** — we *execute*, not just compose.
- ❌ An **LLM cost optimizer** — cost is a *benefit*; Composer is an *engine*.
- ❌ A **vendor wrapper / LLM reseller** — we are model-independent. Models (GPT, Claude, Gemini, Llama, open) appear as *routes*, never as SKUs.

---

## 3. Audiences (ICP segments) & pains

### Segment A — E-commerce / WhatsApp operators (primary)
**Who:** Algerian & North-African founders running customer support, sales, and back-office on WhatsApp; small e-commerce operators.
**Pains:**
- Support and order workflows live inside WhatsApp chat — fragmented, manual, slow.
- "AI" feels like a subscription to one chatbot, not something that actually *works* with their stack.
- Paying in USD/forex for models, thinking in DZD for their business.
- No local support when something breaks; answers from a ticket queue, not a team.
**What we sell them:** a run they can point at — a WhatsApp task that gets *executed* (model + context + tools + fallbacks), evaluated, and returned to their system. Priced in DZD, supported in AR/FR/EN.

### Segment B — Developers & AI agencies
**Who:** dev teams and automation agencies building AI-powered products or delivering automations to clients.
**Pains:**
- Gluing OpenAI + Claude + n8n + WhatsApp API + a DB together by hand — each integration a liability.
- No evaluation layer: they ship things they can't measure or debug when a model misbehaves.
- Lock-in fear: one vendor's model or pricing change can break a deliverable.
**What we sell them:** one layer that routes, executes, falls back, and evaluates — so their deliverable is the business outcome, not the plumbing. Agency-friendly: you bring the flow, Composer runs the layer.

### Segment C — Infrastructure / DevOps teams
**Who:** technical operators who already run services and care about control, telemetry, and contracts.
**Pains:**
- Five vendors, five invoices, five dashboards, USD cards, forex drift.
- No single view of what each AI call costs or how often it succeeds.
- Reliability: one dead API key or degraded model takes down the whole flow.
**What we sell them:** the full stack under one contract (Composer + n8n + Evolution API + Platform), a control-plane view of the layer (telemetry, evaluation logs, cost in DZD), and fallbacks that absorb model outages.

---

## 4. Proof points (verified — may ship)

Numbers policy (implementation plan GC5 / spec §4.3): **only verified numbers ship.** Hidden, never shown as "TODO".

| Proof point | Exact figure | Source |
|---|---|---|
| Clients | `100+ clients` (108 paying) | Rebrand spec §4.3 (Rami's dashboard) |
| Revenue | `≈2.6M DZD ARR` (ARR ≈ 2,621,906 DA; MRR ≈ 218,492 DA) — always render `≈` + `DZD` suffix | Rebrand spec §4.3 |
| Founded / HQ | Founded in Algiers; HQ at Itihad Campus, Boumerdes | About page |
| Incubation | Itihad accelerator incubation | About page |
| Government label | Label Projet Innovant — Ministry of Knowledge Economy | About page |
| Delivered builds | Green Duty AI delivered via Composer | About page |
| Operator creds | Oracle DevOps Certified; CKE (Certified Kubernetes Expert) | About page |
| Regional partners | Itihad, ESTIN, IT Solutions (label as partners/customers) | Trusted brands |

**FORBIDDEN (never ship):** `+50B tokens`, `+60 clients`, "10 Resellers", "300 Templates" — unverified or fabricated.

---

## 5. Objection handling (copy positions)

- **"Is Hawiyat tied to one AI model?"** No. Models are routes, chosen per task by quality, latency, and cost. The layer outlives any single model.
- **"Why not just use ChatGPT/Claude directly?"** A chatbot answers a prompt; Composer executes a business task against your systems, with context, tools, fallbacks, and an evaluation. Different job.
- **"Why not build it ourselves with n8n + OpenAI + WhatsApp + DB?"** Because the fragments are the trap: five vendors to wire, none of it evaluated, all of it yours to keep alive. Composer runs the layer; you run the business.
- **"What about my data?"** Your data is not used to train models. Runs carry your context; logs are yours to audit.
- **"How do costs work?"** In DZD. Caching, compression, budgets, and a transparent per-task cost — measured, not guessed.
- **"Why Hawiyat and not a cheaper provider?"** We don't sell cheap; we sell reliability and control, locally supported, in DZD. Money is the final proof point, never the opener.

---

## 6. Copy rules (hard — see `DESIGN.md` §Copy & Voice)

1. **Active voice, builder-to-builder.** "Route your task", "Run your pipeline", "Bill in DZD".
2. **Specific > clever.** Tokens, numbers, model names, system names — concrete.
3. **No "cheap" / no cost-opener.** Cost only as the *final* proof point.
4. **Models are routes, never SKUs.** No "Claude subscription", no credit-multiplier framing.
5. **Every sentence passes the test:** "Is this the execution layer talking?"
6. **Naming:** "Hawiyat AI Composer" full name; "Composer" shorthand; never "Hawiyat Composer" alone when the full name matters (metadata, services data, JSON-LD).
7. **Muted text renders with the Hawiyat `--muted` token** (`text-muted-ink`), never the shadcn `text-muted` (near-invisible on `bg-surface-dim`).
