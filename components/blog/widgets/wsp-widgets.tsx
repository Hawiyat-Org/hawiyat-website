"use client"

/**
 * Weight-Space Programming figures (hawiyat.org/blog/weight-space-programming-small-local-models)
 *
 * Every figure is a <figure> with a mono title bar and a source note, so the
 * article reads as a sequence of exhibits instead of floating blocks.
 *
 * WspStatBand     the four headline numbers
 * WspFlow         weights as text -> a model that reasons -> new numbers
 * WspVerbs        read / fix / write, with the measured evidence under each
 * WspLayerMap     which of the 24 layers the edit lands in
 * WspLoop         schematic: the loop, and the path out of it
 * WspPatchSlider  full checkpoint vs a 0.016% weight patch, at 16-bit
 * WspFwdBars      Qwen3.5-0.8B benchmarks per forward-pass budget
 *
 * Every number is the source's own, or arithmetic on it stated in the caption.
 * Source: raw/articles/2026-11-02-weight-space-programming.md
 */

import { ReactNode, useEffect, useRef, useState } from "react"

/* ── Shared frame ─────────────────────────────────────────────────────── */

function Figure({
  title,
  note,
  children,
  scroll = true,
}: {
  title: string
  note: string
  children: ReactNode
  scroll?: boolean
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-dim/70 px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">{title}</span>
        <span className="font-mono text-[10px] text-muted-ink">Takehi et al. 2026</span>
      </div>
      <div className={`w-full min-w-0 px-4 py-5 ${scroll ? "overflow-x-auto" : ""}`}>{children}</div>
      <figcaption className="border-t border-border px-4 py-2.5 font-mono text-[10px] leading-relaxed text-muted-ink">
        {note}
      </figcaption>
    </figure>
  )
}

function ArrowHead({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
  )
}

/* ── 1. Headline figures ──────────────────────────────────────────────── */

const STATS = [
  { k: "Weights read as text", v: ["17,253", ""], d: "which game? 4 of 4 networks named" },
  { k: "Car task, one edit", v: ["0%", "100%"], d: "3.5% of weights, no tools, 1,024 episodes" },
  { k: "MATH-500, one edit", v: ["7.9%", "48.1%"], d: "0.016% of Qwen3.5-0.8B's weights" },
  { k: "Forward passes used", v: ["50", ""], d: "CPU kernel, no gradients, no GPU" },
]

export function WspStatBand() {
  return (
    <Figure
      title="The four numbers"
      note="The first cell is the read experiment, the second the Kinetix car, the third and fourth Experiment 8. Same sampling settings before and after every edit."
      scroll={false}
    >
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.k} className="min-w-0 bg-surface px-4 py-4 sm:px-5">
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
    </Figure>
  )
}

/* ── 2. How the trick works ───────────────────────────────────────────── */

function TensorBlock({ x, y, cols, rows, edited }: { x: number; y: number; cols: number; rows: number; edited?: boolean }) {
  const cell = 16
  const gap = 3
  return (
    <g>
      {Array.from({ length: cols }).map((_, c) =>
        Array.from({ length: rows }).map((_, r) => (
          <rect
            key={`${c}-${r}`}
            x={x + c * (cell + gap)}
            y={y + r * (cell + gap)}
            width={cell}
            height={cell}
            rx="1.5"
            className={edited ? "hw-blink fill-hw-cool/70 stroke-hw-cool" : "hw-blink fill-surface stroke-border"}
            strokeWidth={0.8}
            style={{ animationDelay: `${c * 80 + r * 10}ms` }}
          />
        )),
      )}
    </g>
  )
}

export function WspFlow() {
  const id = "hwArrWspFlow"
  const cols = 8
  const rows = 6
  const blockW = cols * 16 + (cols - 1) * 3
  const rightX = 680 - 26 - blockW

  return (
    <Figure
      title="Weights in, weights out"
      note="Schematic. The grid stands for the experiment's 17,253 numbers, which the model reads as text, not as a picture. Nothing is trained: the model reasons about what each block should compute and writes the numbers back."
    >
      <svg className="mx-auto block h-auto w-full min-w-[520px]" viewBox="0 0 680 224" role="img" aria-label="Weights as text are read by a language model, which writes new weights back">
        <ArrowHead id={id} />

        <text x="26" y="30" className="fill-muted-ink font-mono text-[10px] uppercase tracking-widest">
          the weights, as text
        </text>
        <TensorBlock x={26} y={44} cols={cols} rows={rows} />

        <text x="248" y="30" className="fill-muted-ink font-mono text-[10px] uppercase tracking-widest">
          one model, one prompt
        </text>
        <rect x="248" y="56" width="184" height="104" rx="8" className="fill-signal stroke-signal" strokeWidth={1} />
        <text x="340" y="94" textAnchor="middle" className="fill-signal-text font-mono text-[12px]">frontier model</text>
        <text x="340" y="114" textAnchor="middle" className="fill-signal-text/80 font-mono text-[9.5px]">reads the numbers,</text>
        <text x="340" y="130" textAnchor="middle" className="fill-signal-text/80 font-mono text-[9.5px]">reasons about the job</text>

        <text x={rightX} y="30" className="fill-muted-ink font-mono text-[10px] uppercase tracking-widest">
          new numbers
        </text>
        <TensorBlock x={rightX} y={44} cols={cols} rows={rows} edited />

        <line x1="190" y1="108" x2="242" y2="108" className="hw-dash stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />
        <line x1="438" y1="108" x2="490" y2="108" className="hw-dash stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />

        <text x="26" y="192" className="fill-ink font-mono text-[11px]">17,253 weights in</text>
        <text x="654" y="192" textAnchor="end" className="fill-ink font-mono text-[11px]">3.5% of them changed</text>
        <text x="26" y="212" className="fill-muted-ink font-mono text-[10px]">no dataset &#183; no loss &#183; no backward pass</text>
      </svg>
    </Figure>
  )
}

/* ── 3. Read / fix / write ────────────────────────────────────────────── */

export function WspVerbs() {
  const id = "hwArrWsp"
  const nodes = [
    { x: 24, tag: "01", title: "READ", sub: "what it learned", ev: "4/4 games \u00b7 3/3 shapes \u00b7 3/3 languages", hi: false },
    { x: 248, tag: "02", title: "FIX", sub: "remove a failure", ev: "3.5% edited \u00b7 0% \u2192 100% success", hi: true },
    { x: 472, tag: "03", title: "WRITE", sub: "from zero", ev: "beats PPO-100M on 3 of 3 games", hi: false },
  ]
  return (
    <Figure
      title="Three verbs, one interface"
      note="The measured result under each verb. READ and WRITE keep the weights in the prompt; FIX and the language-model result add a Python sandbox and a forward-pass budget, which is what the bottom axis tracks."
    >
      <svg className="mx-auto block h-auto w-full min-w-[520px]" viewBox="0 0 680 208" role="img" aria-label="Read, fix and write, with the measured result under each">
        <ArrowHead id={id} />
        {nodes.map((n, i) => (
          <g key={n.title}>
            <text x={n.x + 8} y="26" className="fill-muted-ink font-mono text-[10px] tracking-widest">
              {n.tag}
            </text>
            <rect
              x={n.x}
              y="38"
              width="184"
              height="96"
              rx="8"
              className={n.hi ? "fill-signal stroke-signal" : "fill-surface stroke-border"}
              strokeWidth={1}
            />
            <text x={n.x + 92} y="68" textAnchor="middle" className={n.hi ? "fill-signal-text font-mono text-[17px] tracking-wide" : "fill-ink font-mono text-[17px] tracking-wide"}>
              {n.title}
            </text>
            <text x={n.x + 92} y="90" textAnchor="middle" className={n.hi ? "fill-signal-text/80 font-mono text-[11px]" : "fill-muted-ink font-mono text-[11px]"}>
              {n.sub}
            </text>
            <text x={n.x + 92} y="116" textAnchor="middle" className={n.hi ? "fill-signal-text/80 font-mono text-[9.5px]" : "fill-muted-ink font-mono text-[9.5px]"}>
              {n.ev}
            </text>
            {i < nodes.length - 1 && (
              <line
                x1={n.x + 190}
                y1="86"
                x2={n.x + 218}
                y2="86"
                className="hw-dash stroke-muted-ink fill-none"
                strokeWidth={1.4}
                markerEnd={`url(#${id})`}
              />
            )}
          </g>
        ))}
        <line x1="24" y1="164" x2="656" y2="164" className="hw-dash stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />
        <text x="24" y="186" className="fill-muted-ink font-mono text-[10px]">
          weights in the prompt, no tools
        </text>
        <text x="656" y="186" textAnchor="end" className="fill-muted-ink font-mono text-[10px]">
          python sandbox, forward-pass budget
        </text>
      </svg>
    </Figure>
  )
}

/* ── 4. Where the edit lands ──────────────────────────────────────────── */

const LAYERS = 24
const EDITED_LAYERS = new Set([15, 19])
const CELL = 25
const X0 = 40

export function WspLayerMap() {
  const id = "hwArrWspLayers"
  return (
    <Figure
      title="Where the 0.016% lands"
      note="Qwen3.5-0.8B has 24 layers. The edit subtracts one direction from 64 output columns in layers 15 and 19: 131,072 of 0.8 billion weights. Everything else in the model is untouched."
    >
      <svg className="mx-auto block h-auto w-full min-w-[520px]" viewBox="0 0 680 214" role="img" aria-label="24 layers of Qwen3.5-0.8B, with layers 15 and 19 edited">
        <ArrowHead id={id} />
        <text x="40" y="30" className="fill-muted-ink font-mono text-[10px] uppercase tracking-widest">
          24 transformer layers
        </text>
        <text x="638" y="30" textAnchor="end" className="fill-muted-ink font-mono text-[10px] uppercase tracking-widest">
          read as one model
        </text>

        <line x1="40" y1="46" x2="646" y2="46" className="hw-dash stroke-muted-ink/60 fill-none" strokeWidth={1.2} markerEnd={`url(#${id})`} />

        {Array.from({ length: LAYERS }, (_, i) => {
          const x = X0 + i * CELL
          const hi = EDITED_LAYERS.has(i)
          return (
            <g key={i}>
              <rect
                x={x}
                y="62"
                width="23"
                height="46"
                rx="2"
                className={hi ? "hw-blink fill-signal stroke-signal" : "fill-surface stroke-border"}
                strokeWidth={1}
                style={hi ? { animationDelay: `${i === 15 ? 0 : 420}ms` } : undefined}
              />
              {hi && (
                <text x={x + 11.5} y="90" textAnchor="middle" className="fill-signal-text font-mono text-[9px]">
                  {i}
                </text>
              )}
            </g>
          )
        })}

        <text x="40" y="126" className="fill-muted-ink font-mono text-[9px]">0</text>
        <text x="638" y="126" textAnchor="end" className="fill-muted-ink font-mono text-[9px]">23</text>

        <path d="M426 116 L426 132 L526 132 L526 116" className="stroke-hw-cool fill-none" strokeWidth={1.2} />
        <text x="476" y="152" textAnchor="middle" className="fill-ink font-mono text-[10px]">
          one direction, 64 columns each
        </text>

        <text x="40" y="180" className="fill-ink font-mono text-[11px]">
          131,072 weights changed
        </text>
        <text x="638" y="180" textAnchor="end" className="fill-muted-ink font-mono text-[11px]">
          0.016% of 0.8 billion
        </text>
        <text x="40" y="202" className="fill-muted-ink font-mono text-[10px]">
          50 forward passes, no gradients, no GPU
        </text>
      </svg>
    </Figure>
  )
}

/* ── 5. The loop the edit removed (schematic) ─────────────────────────── */

export function WspLoop() {
  const id = "hwArrWspLoop"
  return (
    <Figure
      title="What the edit removed"
      note="Schematic, not a measured trajectory. The base model circles: it repeats the same text and runs to the 32,768-token limit. After the direction is subtracted from layers 15 and 19, the same path continues to an answer."
    >
      <svg className="mx-auto block h-auto w-full min-w-[520px]" viewBox="0 0 680 214" role="img" aria-label="Schematic: the base model loops, the edited model exits with an answer">
        <ArrowHead id={id} />

        <rect x="24" y="18" width="300" height="132" rx="8" className="fill-surface stroke-border" strokeWidth={1} />
        <text x="40" y="40" className="fill-muted-ink font-mono text-[10px] uppercase tracking-widest">Base</text>
        <circle cx="174" cy="92" r="34" className="stroke-hw-hot/50 fill-none" strokeWidth={1.2} strokeDasharray="4 6" />
        <circle cx="174" cy="92" r="34" className="hw-dash stroke-hw-hot fill-none" strokeWidth={1.6} />
        <path d="M174 58 A34 34 0 0 1 206 84" className="stroke-hw-hot fill-none" strokeWidth={1.8} markerEnd={`url(#${id})`} />
        <text x="174" y="96" textAnchor="middle" className="fill-ink font-mono text-[10px]">loop</text>
        <text x="40" y="138" className="fill-muted-ink font-mono text-[9.5px]">same text again, no answer</text>

        <rect x="356" y="18" width="300" height="132" rx="8" className="fill-surface stroke-border" strokeWidth={1} />
        <text x="372" y="40" className="fill-muted-ink font-mono text-[10px] uppercase tracking-widest">Edited</text>
        <line x1="376" y1="92" x2="564" y2="92" className="hw-dash stroke-hw-cool fill-none" strokeWidth={1.6} markerEnd={`url(#${id})`} />
        <circle cx="470" cy="92" r="3.5" className="hw-blink fill-hw-cool" />
        <rect x="570" y="74" width="70" height="36" rx="6" className="fill-signal stroke-signal" strokeWidth={1} />
        <text x="605" y="96" textAnchor="middle" className="fill-signal-text font-mono text-[10px]">answer</text>
        <text x="372" y="138" className="fill-muted-ink font-mono text-[9.5px]">direction removed, path continues</text>

        <text x="24" y="178" className="fill-ink font-mono text-[11px]">93.0% hit the token limit</text>
        <text x="656" y="178" textAnchor="end" className="fill-ink font-mono text-[11px]">33.1% after the edit</text>
        <text x="24" y="200" className="fill-muted-ink font-mono text-[10px]">
          MATH-500, 32,768-token ceiling, thinking on
        </text>
      </svg>
    </Figure>
  )
}

/* ── 6. Patch against a full checkpoint ───────────────────────────────── */

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
    <Figure
      title="The size of a customization"
      note="16-bit weights. The 0.8B row is the measured case: 131,072 of 0.8 billion weights changed, 262,144 bytes. Every other row applies the same 0.016% share to a different parameter count, so those rows are arithmetic, not measurements."
      scroll={false}
    >
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
          className="h-5 min-w-[140px] flex-1 accent-hw-cool"
        />
        <span className="min-w-[3.5rem] text-right font-mono text-lg font-semibold tabular-nums text-ink">
          {SIZES[i].label}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded border border-border bg-surface-dim/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-ink">Full checkpoint</p>
          <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">{bytes(full)}</p>
          <div className="mt-2 h-2 overflow-hidden rounded bg-surface-dim">
            <div className="h-full w-full bg-ink/50" />
          </div>
        </div>
        <div className="rounded border border-border bg-surface-dim/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-ink">Weight patch</p>
          <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-hw-cool">{bytes(patch)}</p>
          <div className="mt-2 h-2 overflow-hidden rounded bg-surface-dim">
            <div className="h-full bg-hw-cool" style={{ width: "5%" }} />
          </div>
        </div>
        <div className="rounded border border-border bg-surface-dim/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-ink">Ratio</p>
          <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">1 : {ratio.toLocaleString("en-US")}</p>
          <p className="mt-2 font-mono text-[10px] text-muted-ink">patch to full model</p>
        </div>
      </div>

      <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-ink">
        The patch bar is drawn at the minimum readable width: at true scale, 0.016% is well under one pixel.
      </p>
    </Figure>
  )
}

/* ── 7. Benchmarks per forward-pass budget ────────────────────────────── */

type Row = { label: string; v: number[]; better: "up" | "down" }
const STEPS = ["Base", "10", "25", "50"]
const ROWS: Row[] = [
  { label: "MATH-500", v: [7.9, 12.3, 14.1, 48.1], better: "up" },
  { label: "GSM8K", v: [13.8, 25.7, 25.1, 67.1], better: "up" },
  { label: "IFEval", v: [21.0, 49.0, 39.9, 62.3], better: "up" },
  { label: "Answers hitting the token limit", v: [93.0, 87.2, 86.4, 33.1], better: "down" },
]

/** Animate a number from its previous value to the next one. */
function useCountUp(value: number, ms = 520) {
  const [shown, setShown] = useState(value)
  const fromRef = useRef(value)
  useEffect(() => {
    const from = fromRef.current
    if (from === value) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / ms, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setShown(from + (value - from) * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else fromRef.current = value
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, ms])
  return shown
}

function RowBar({ row, step, index }: { row: Row; step: number; index: number }) {
  const shown = useCountUp(row.v[step])
  return (
    <div className="border-b border-border py-3 last:border-b-0">
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="font-mono text-[12px] text-ink">{row.label}</span>
        <span className="font-mono text-[10px] text-muted-ink">{row.better === "up" ? "higher is better" : "lower is better"}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-3 flex-1 overflow-hidden rounded bg-surface-dim">
          <div
            key={step}
            className={`hw-grow h-full ${row.better === "up" ? "bg-hw-cool" : "bg-hw-hot"}`}
            style={{ width: `${row.v[step]}%`, animationDelay: `${index * 70}ms` }}
          />
        </div>
        <span className="w-14 shrink-0 text-right font-mono text-[11px] tabular-nums text-ink">{shown.toFixed(1)}%</span>
      </div>
    </div>
  )
}

export function WspFwdBars() {
  const [step, setStep] = useState(3)
  return (
    <Figure
      title="The budget curve"
      note="Qwen3.5-0.8B, thinking on, up to 32,768 tokens, sampling at temperature 0.6 / top-p 0.95 / top-k 20 / presence penalty 1.5. Press a budget to see the same four rows. 10 and 25 passes barely touch the loop rate; 50 does."
      scroll={false}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-muted-ink">Forward passes</span>
        {STEPS.map((s, i) => (
          <button
            key={s}
            type="button"
            aria-pressed={i === step}
            onClick={() => setStep(i)}
            className={`rounded border px-3 py-1.5 font-mono text-[11px] tabular-nums transition-colors ${
              i === step ? "border-signal bg-signal text-signal-text" : "border-border bg-surface text-muted-ink hover:text-ink"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col">
        {ROWS.map((r, i) => (
          <RowBar key={r.label} row={r} step={step} index={i} />
        ))}
      </div>
    </Figure>
  )
}
