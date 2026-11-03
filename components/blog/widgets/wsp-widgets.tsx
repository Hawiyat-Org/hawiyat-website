"use client"

/**
 * Weight-Space Programming figures (hawiyat.org/blog/weight-space-programming-small-local-models)
 *
 * WspStatBand     the four headline numbers from the MIT CSAIL post
 * WspVerbs        read / fix / write, with the measured evidence under each verb
 * WspPatchSlider  full checkpoint vs a 0.016% weight patch, at 16-bit
 * WspFwdBars      Qwen3.5-0.8B benchmarks per forward-pass budget (10 / 25 / 50)
 *
 * Every number here is the source's own number, or arithmetic on it stated in
 * the caption. See raw/articles/2026-11-02-weight-space-programming.md.
 */

import { useState } from "react"

/* ── 1. Headline figures ──────────────────────────────────────────────── */

const STATS = [
  { k: "Weights read as text", v: ["17,253", ""], d: "which game? 4 of 4 networks named" },
  { k: "Car task, one edit", v: ["0%", "100%"], d: "3.5% of weights, no tools, 1,024 episodes" },
  { k: "MATH-500, one edit", v: ["7.9%", "48.1%"], d: "0.016% of Qwen3.5-0.8B's weights" },
  { k: "Forward passes used", v: ["50", ""], d: "CPU kernel, no gradients, no GPU" },
]

export function WspStatBand() {
  return (
    <div className="my-8 grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-surface lg:grid-cols-4">
      {STATS.map((s, i) => (
        <div
          key={s.k}
          className={`min-w-0 border-border px-4 py-4 sm:px-5 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""}`}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-ink">{s.k}</p>
          <p className="mt-2 font-mono text-xl font-semibold tabular-nums text-ink sm:text-2xl">
            {s.v[0]}
            {s.v[1] && <span className="px-1.5 text-base font-normal text-muted-ink">&rarr;</span>}
            {s.v[1] && <span className="text-hw-cool">{s.v[1]}</span>}
          </p>
          <p className="mt-1 break-words font-mono text-[10px] leading-snug text-muted-ink">{s.d}</p>
        </div>
      ))}
    </div>
  )
}

/* ── 2. Read / fix / write ────────────────────────────────────────────── */

function WspArrowHead({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
  )
}

export function WspVerbs() {
  const id = "hwArrWsp"
  const nodes = [
    { x: 24, tag: "01", title: "READ", sub: "what it learned", ev: "4/4 games \u00b7 3/3 shapes \u00b7 3/3 languages", hi: false },
    { x: 248, tag: "02", title: "FIX", sub: "remove a failure", ev: "3.5% edited \u00b7 0% \u2192 100% success", hi: true },
    { x: 472, tag: "03", title: "WRITE", sub: "from zero", ev: "beats PPO-100M on 3 of 3 games", hi: false },
  ]
  return (
    <div className="my-6 w-full min-w-0 overflow-x-auto rounded-lg border border-border bg-surface-dim/40 px-4 py-5">
      <svg className="mx-auto block h-auto w-full min-w-[520px]" viewBox="0 0 680 214" role="img">
        <WspArrowHead id={id} />
        {nodes.map((n, i) => (
          <g key={n.title}>
            <text x={n.x + 8} y="30" className="fill-muted-ink font-mono text-[10px] tracking-widest">
              {n.tag}
            </text>
            <rect
              x={n.x}
              y="42"
              width="184"
              height="96"
              rx="8"
              className={n.hi ? "fill-signal stroke-signal" : "fill-surface stroke-border"}
              strokeWidth={1}
            />
            <text x={n.x + 92} y="72" textAnchor="middle" className={n.hi ? "fill-signal-text font-mono text-[17px] tracking-wide" : "fill-ink font-mono text-[17px] tracking-wide"}>
              {n.title}
            </text>
            <text x={n.x + 92} y="94" textAnchor="middle" className={n.hi ? "fill-signal-text/80 font-mono text-[11px]" : "fill-muted-ink font-mono text-[11px]"}>
              {n.sub}
            </text>
            <text x={n.x + 92} y="120" textAnchor="middle" className={n.hi ? "fill-signal-text/80 font-mono text-[10px]" : "fill-muted-ink font-mono text-[10px]"}>
              {n.ev}
            </text>
            {i < nodes.length - 1 && (
              <line
                x1={n.x + 190}
                y1="90"
                x2={n.x + 218}
                y2="90"
                className="stroke-muted-ink fill-none"
                strokeWidth={1.4}
                markerEnd={`url(#${id})`}
              />
            )}
          </g>
        ))}
        <line x1="24" y1="170" x2="656" y2="170" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />
        <text x="24" y="192" className="fill-muted-ink font-mono text-[10px]">
          weights in the prompt, no tools
        </text>
        <text x="656" y="192" textAnchor="end" className="fill-muted-ink font-mono text-[10px]">
          python sandbox, forward-pass budget
        </text>
      </svg>
    </div>
  )
}

/* ── 3. Patch against a full checkpoint ───────────────────────────────── */

const SIZES = [
  { label: "0.27B", p: 0.27 },
  { label: "0.8B", p: 0.8 },
  { label: "1.7B", p: 1.7 },
  { label: "3B", p: 3 },
  { label: "4B", p: 4 },
  { label: "8B", p: 8 },
]
const EDIT_SHARE = 131072 / 800000000 // 0.0164% measured on Qwen3.5-0.8B

function bytes(n: number) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)} GB`
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)} MB`
  return `${Math.round(n / 1024)} KiB`
}

export function WspPatchSlider() {
  const [i, setI] = useState(1)
  const params = SIZES[i].p * 1e9
  const full = params * 2
  const patch = params * EDIT_SHARE * 2
  const ratio = Math.round(full / patch)

  return (
    <div className="my-6 rounded-lg border border-border bg-surface p-5">
      <div className="flex flex-wrap items-center gap-4">
        <label htmlFor="hw-wsp-size" className="shrink-0 font-mono text-[11px] text-muted-ink">
          Base model size
        </label>
        <input
          id="hw-wsp-size"
          type="range"
          min={0}
          max={SIZES.length - 1}
          step={1}
          value={i}
          onChange={(e) => setI(Number(e.target.value))}
          aria-label="Base model size in billions of parameters"
          className="h-5 min-w-[160px] flex-1 accent-hw-cool"
        />
        <span className="min-w-[3.5rem] text-right font-mono text-lg font-semibold tabular-nums text-ink">
          {SIZES[i].label}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded border border-border bg-surface-dim/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-ink">Full checkpoint</p>
          <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">{bytes(full)}</p>
          <p className="mt-1 font-mono text-[10px] text-muted-ink">16-bit weights</p>
        </div>
        <div className="rounded border border-border bg-surface-dim/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-ink">Weight patch</p>
          <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-hw-cool">{bytes(patch)}</p>
          <p className="mt-1 font-mono text-[10px] text-muted-ink">same 0.016% edit share</p>
        </div>
        <div className="rounded border border-border bg-surface-dim/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-ink">Ratio</p>
          <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">1 : {ratio.toLocaleString("en-US")}</p>
          <p className="mt-1 font-mono text-[10px] text-muted-ink">patch to full model</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-3 w-full overflow-hidden rounded bg-surface-dim">
          <div className="h-full bg-ink/60" style={{ width: "100%" }} />
        </div>
        <div className="mt-1 h-3 overflow-hidden rounded bg-surface-dim">
          <div className="h-full bg-hw-cool" style={{ width: "0.35%" }} />
        </div>
        <p className="mt-2 font-mono text-[10px] leading-relaxed text-muted-ink">
          Top bar = the whole model. Bottom bar = the edited weights, drawn to scale (0.016% is below one pixel,
          so it is shown at the minimum visible width). The 0.8B row is the measured case: 131,072 of 0.8 billion
          weights changed in Experiment 8, 262,144 bytes at 16-bit. Other rows apply the same share to a different
          parameter count; they are arithmetic, not measurements.
        </p>
      </div>
    </div>
  )
}

/* ── 4. Benchmarks per forward-pass budget ────────────────────────────── */

type Row = { label: string; v: number[]; better: "up" | "down" }
const STEPS = ["Base", "10", "25", "50"]
const ROWS: Row[] = [
  { label: "MATH-500", v: [7.9, 12.3, 14.1, 48.1], better: "up" },
  { label: "GSM8K", v: [13.8, 25.7, 25.1, 67.1], better: "up" },
  { label: "IFEval", v: [21.0, 49.0, 39.9, 62.3], better: "up" },
  { label: "Answers hitting the token limit", v: [93.0, 87.2, 86.4, 33.1], better: "down" },
]

export function WspFwdBars() {
  const [step, setStep] = useState(3)
  return (
    <div className="my-6 rounded-lg border border-border bg-surface p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-muted-ink">Forward passes</span>
        {STEPS.map((s, i) => (
          <button
            key={s}
            type="button"
            aria-pressed={i === step}
            onClick={() => setStep(i)}
            className={`rounded border px-3 py-1 font-mono text-[11px] tabular-nums transition-colors ${
              i === step ? "border-signal bg-signal text-signal-text" : "border-border bg-surface text-muted-ink hover:text-ink"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col">
        {ROWS.map((r) => (
          <div key={r.label} className="border-b border-border py-3 last:border-b-0">
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="font-mono text-[12px] text-ink">{r.label}</span>
              <span className="font-mono text-[10px] text-muted-ink">{r.better === "up" ? "higher is better" : "lower is better"}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 flex-1 overflow-hidden rounded bg-surface-dim">
                <div
                  className={`h-full transition-[width] duration-500 ${r.better === "up" ? "bg-hw-cool" : "bg-hw-hot"}`}
                  style={{ width: `${r.v[step]}%` }}
                />
              </div>
              <span className="w-14 shrink-0 text-right font-mono text-[11px] tabular-nums text-ink">{r.v[step].toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted-ink">
        Qwen3.5-0.8B, thinking on, up to 32,768 tokens, sampling at temperature 0.6 / top-p 0.95 / top-k 20 /
        presence penalty 1.5. The edit touches 131,072 weights, 0.016% of the model. Sequence: 7.9, 12.3, 14.1,
        48.1 on MATH-500 as the budget goes 0, 10, 25, 50. The last row is the share of MATH-500 answers that ran
        to the token limit, which is the loop the edit removed.
      </p>
    </div>
  )
}
