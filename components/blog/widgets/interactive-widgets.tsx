"use client"

/**
 * Blog interactive widgets — the clickable / animated figures from the source
 * teardown, ported as client components.
 *
 * AttentionLab      click a word to see its attention weights
 * RefusalAxis       toggle the ablation and watch the two clusters collapse
 * RequantSlider     drag the refinement iterations, watch leakage vs refusal
 * StatBand          the four headline figures
 */

import { useMemo, useState } from "react"

/* ── Headline figures ─────────────────────────────────────────────────── */

const STATS = [
  { k: "Harmful refusal", v: ["89.1%", "9.4%"], d: "JailbreakBench, held-out" },
  { k: "Over-refusal", v: ["9.4%", "0.0%"], d: "benign prompts wrongly refused" },
  { k: "Capability change", v: ["\u22641.5pp", ""], d: "MMLU, GSM8K, CMMLU" },
  { k: "Matrices edited", v: ["12,479", ""], d: "of 76,108 tensors" },
]

export function StatBand() {
  return (
    <div className="my-8 grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-surface lg:grid-cols-4">
      {STATS.map((s, i) => (
        <div
          key={s.k}
          className={`border-border px-5 py-4 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""}`}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-ink">{s.k}</p>
          <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-ink">
            {s.v[0]}
            {s.v[1] && <span className="px-1.5 text-base font-normal text-muted-ink">&rarr;</span>}
            {s.v[1] && <span className="text-hw-cool">{s.v[1]}</span>}
          </p>
          <p className="mt-1 font-mono text-[10px] text-muted-ink">{s.d}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Interactive attention ────────────────────────────────────────────── */

const WORDS = ["The", "cat", "sat", "on", "mat"]
const WEIGHTS = [
  [0.6, 0.28, 0.05, 0.04, 0.03],
  [0.32, 0.5, 0.1, 0.04, 0.04],
  [0.05, 0.58, 0.14, 0.06, 0.17],
  [0.04, 0.08, 0.3, 0.18, 0.4],
  [0.03, 0.16, 0.22, 0.21, 0.38],
]
const XS = [148, 244, 340, 436, 532]

export function AttentionLab() {
  const [q, setQ] = useState(2)

  const lines = useMemo(
    () =>
      WEIGHTS[q].map((w, j) => ({
        j,
        w,
        x1: XS[j],
        x2: 340,
      })),
    [q],
  )

  return (
    <div>
      <div className="my-6 overflow-x-auto rounded-lg border border-border bg-surface-dim/40 px-4 py-5">
        <svg className="mx-auto block h-auto w-full min-w-[520px]" viewBox="0 0 680 214" role="img">
          <rect x="246" y="28" width="188" height="36" rx="8" className="fill-signal stroke-signal" strokeWidth={1} />
          <text x="340" y="51" textAnchor="middle" className="fill-signal-text font-mono text-[13px]">
            updated &ldquo;{WORDS[q]}&rdquo;
          </text>

          {lines.map((l) => (
            <line
              key={l.j}
              x1={l.x1}
              y1="150"
              x2={l.x2}
              y2="66"
              className="stroke-hw-cool fill-none"
              strokeLinecap="round"
              strokeWidth={(0.6 + l.w * 7).toFixed(2)}
              opacity={(0.2 + l.w * 0.8).toFixed(2)}
            />
          ))}

          {WORDS.map((w, i) => (
            <g key={w} onClick={() => setQ(i)} className="cursor-pointer">
              <rect
                x={XS[i] - 43}
                y="150"
                width="86"
                height="34"
                rx="6"
                className={i === q ? "fill-signal stroke-signal" : "fill-surface stroke-border"}
                strokeWidth={1}
              />
              <text
                x={XS[i]}
                y="172"
                textAnchor="middle"
                className={i === q ? "fill-signal-text font-mono text-[13px]" : "fill-muted-ink font-mono text-[13px]"}
              >
                {w}
              </text>
            </g>
          ))}

          <text x="340" y="206" textAnchor="middle" className="fill-muted-ink font-mono text-[10px]">
            click a word &middot; line thickness = attention weight
          </text>
        </svg>
      </div>
      <p className="text-center font-mono text-[11px] text-hw-cool">click any word to make it the focus</p>
    </div>
  )
}

/* ── Abliteration toggle ──────────────────────────────────────────────── */

export function RefusalAxis() {
  const [ablated, setAblated] = useState(false)
  const harmless = [
    [210, 205],
    [234, 190],
    [190, 193],
    [216, 220],
    [240, 210],
  ]
  const harmful = [
    [430, 106],
    [454, 92],
    [412, 118],
    [440, 128],
    [460, 114],
  ]

  return (
    <div>
      <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-surface-dim/40 px-4 pt-5">
        <svg className="mx-auto block h-auto w-full min-w-[520px]" viewBox="0 0 680 272" role="img">
          <defs>
            <marker id="hwArrAxis" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>
          <rect x="110" y="36" width="460" height="208" rx="10" className="fill-surface stroke-border" strokeWidth={1} />

          {harmless.map(([cx, cy]) => (
            <circle key={`h${cx}${cy}`} cx={cx} cy={cy} r="7" className="fill-hw-cool" />
          ))}
          <text x="205" y="240" textAnchor="middle" className="fill-hw-cool font-mono text-[11px]">harmless</text>

          <line
            x1="214"
            y1="200"
            x2="428"
            y2="110"
            className="stroke-hw-hot fill-none"
            strokeWidth={1.8}
            strokeDasharray="4 3"
            markerEnd="url(#hwArrAxis)"
          />
          <text x="332" y="146" textAnchor="middle" className="fill-muted-ink font-mono text-[11px]">refusal direction (r)</text>

          <g
            className="hw-shift"
            style={{ transform: ablated ? "translate(-215px, 95px)" : "translate(0, 0)" }}
          >
            {harmful.map(([cx, cy]) => (
              <circle key={`x${cx}${cy}`} cx={cx} cy={cy} r="7" className="fill-hw-hot" />
            ))}
            <text x="486" y="100" textAnchor="middle" className="fill-hw-hot font-mono text-[11px]">harmful</text>
          </g>
        </svg>
      </div>
      <button
        type="button"
        aria-pressed={ablated}
        onClick={() => setAblated((v) => !v)}
        className={`mt-3 rounded border px-3.5 py-1.5 font-mono text-[12px] transition-colors ${
          ablated
            ? "border-signal bg-signal text-signal-text"
            : "border-border bg-surface text-ink hover:border-signal"
        }`}
      >
        {ablated ? "Restore" : "Abliterate"}
      </button>
    </div>
  )
}

/* ── Requantization slider ────────────────────────────────────────────── */

function lerp(a: number, b: number, x: number) {
  return a + (b - a) * x
}

export function RequantSlider() {
  const [iters, setIters] = useState(32)
  const x = (iters - 8) / 24
  const leak = lerp(13.4, 5.2, x)
  const refusal = lerp(18.8, 9.4, x)

  return (
    <div className="my-6 rounded-lg border border-border bg-surface p-5">
      <div className="flex flex-wrap items-center gap-4">
        <label htmlFor="hw-iter" className="shrink-0 font-mono text-[11px] text-muted-ink">
          Refinement iterations
        </label>
        <input
          id="hw-iter"
          type="range"
          min={8}
          max={32}
          step={1}
          value={iters}
          onChange={(e) => setIters(Number(e.target.value))}
          aria-label="Refinement iterations"
          className="h-5 min-w-[160px] flex-1 accent-hw-cool"
        />
        <span className="min-w-[3rem] text-right font-mono text-lg font-semibold tabular-nums text-ink">{iters}</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded border border-border bg-surface-dim/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-ink">Residual leakage</p>
          <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-ink">{leak.toFixed(1)}%</p>
          <div className="mt-2 h-2 overflow-hidden rounded bg-surface-dim">
            <div className="h-full bg-hw-hot transition-[width] duration-200" style={{ width: `${(leak / 14) * 100}%` }} />
          </div>
        </div>
        <div className="rounded border border-border bg-surface-dim/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-ink">Resulting harmful refusal</p>
          <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-ink">{refusal.toFixed(1)}%</p>
          <div className="mt-2 h-2 overflow-hidden rounded bg-surface-dim">
            <div className="h-full bg-hw-cool transition-[width] duration-200" style={{ width: `${refusal}%` }} />
          </div>
        </div>
      </div>

      <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted-ink">
        Measured anchors: <b className="font-medium text-ink">8 iterations</b> give 13.4% leakage, 18.8% refusal.{" "}
        <b className="font-medium text-ink">32 iterations</b> give 5.2% leakage, 9.4% refusal. 32 is the shipped point;
        past it, leakage falls slowly while the weights keep drifting.
      </p>
    </div>
  )
}
