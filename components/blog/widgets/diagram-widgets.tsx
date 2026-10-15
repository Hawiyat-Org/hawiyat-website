/**
 * Blog diagram widgets — faithful ports of the source teardown's figures.
 *
 * Each widget is a self-contained SVG/HTML figure with the same geometry,
 * labels and data-ink encoding as the original article, rendered with the
 * site's tokens (plus the two diagram-only accents `hw-hot` / `hw-cool`).
 *
 * Used from a markdown post via a ```widget fence whose first line names the
 * widget. See components/blog/widgets/blog-widget.tsx.
 */

const ARR = "M2 1L8 5L2 9"

/** Shared arrowhead <defs> block. `id` must be unique per widget instance. */
function ArrowHead({ id, width = 6 }: { id: string; width?: number }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth={width}
        markerHeight={width}
        orient="auto-start-reverse"
      >
        <path d={ARR} fill="none" stroke="context-stroke" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
  )
}

function Frame({ children, viewBox }: { children: React.ReactNode; viewBox: string }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border bg-surface-dim/40 px-4 py-5">
      <svg className="mx-auto block h-auto min-w-[520px] w-full" viewBox={viewBox} role="img">
        {children}
      </svg>
    </div>
  )
}

/* ── 1. Residual stream (animated token flow) ─────────────────────────── */

export function StreamFlow() {
  const id = "hwArrStream"
  return (
    <Frame viewBox="0 0 680 340">
      <ArrowHead id={id} />
      <text x="393" y="18" textAnchor="middle" className="fill-muted-ink font-mono text-[11px]">
        predicts the next token
      </text>
      <line x1="393" y1="44" x2="393" y2="26" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />

      <rect x="360" y="46" width="66" height="232" rx="12" className="fill-surface-dim/70 stroke-border" strokeWidth={1} />
      <circle cx="393" cy="258" r="6" className="hw-stream fill-hw-cool" />
      <circle cx="393" cy="258" r="6" className="hw-stream hw-stream-delay fill-hw-cool" />

      <rect x="96" y="58" width="168" height="46" rx="8" className="fill-surface stroke-border" strokeWidth={1} />
      <text x="180" y="81" textAnchor="middle" className="fill-ink font-mono text-[13px]">Layer 45</text>
      <text x="180" y="97" textAnchor="middle" className="fill-muted-ink font-mono text-[11px]">attention + experts</text>

      <rect x="96" y="138" width="168" height="46" rx="8" className="fill-signal stroke-signal" strokeWidth={1} />
      <text x="180" y="161" textAnchor="middle" className="fill-signal-text font-mono text-[13px]">Layer 22</text>
      <text x="180" y="177" textAnchor="middle" className="fill-signal-text/80 font-mono text-[11px]">refusal is read here</text>

      <rect x="96" y="218" width="168" height="46" rx="8" className="fill-surface stroke-border" strokeWidth={1} />
      <text x="180" y="241" textAnchor="middle" className="fill-ink font-mono text-[13px]">Layer 1</text>
      <text x="180" y="257" textAnchor="middle" className="fill-muted-ink font-mono text-[11px]">attention + experts</text>

      <text x="313" y="70" textAnchor="middle" className="fill-muted-ink font-mono text-[10px]">read</text>
      <line x1="358" y1="76" x2="268" y2="76" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />
      <line x1="268" y1="92" x2="358" y2="92" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />
      <text x="313" y="106" textAnchor="middle" className="fill-muted-ink font-mono text-[10px]">add back</text>

      <line x1="358" y1="154" x2="268" y2="154" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />
      <line x1="268" y1="170" x2="358" y2="170" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />
      <line x1="358" y1="234" x2="268" y2="234" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />
      <line x1="268" y1="250" x2="358" y2="250" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />

      <line x1="426" y1="161" x2="446" y2="161" className="stroke-muted-ink fill-none" strokeWidth={1} strokeDasharray="3 3" />
      <text x="452" y="157" className="fill-muted-ink font-mono text-[11px]">the refusal direction</text>
      <text x="452" y="172" className="fill-muted-ink font-mono text-[11px]">is read from the stream here</text>

      {[
        { x: 265, t: "The" },
        { x: 331, t: "cat" },
        { x: 397, t: "sat" },
        { x: 463, t: "on" },
      ].map((tok) => (
        <g key={tok.t}>
          <rect x={tok.x} y="298" width="58" height="26" rx="6" className="fill-surface stroke-border" strokeWidth={1} />
          <text x={tok.x + 29} y="315" textAnchor="middle" className="fill-muted-ink font-mono text-[12px]">{tok.t}</text>
        </g>
      ))}
      <line x1="294" y1="298" x2="384" y2="280" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />
      <line x1="360" y1="298" x2="390" y2="280" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />
      <line x1="426" y1="298" x2="396" y2="280" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />
      <line x1="492" y1="298" x2="402" y2="280" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />
    </Frame>
  )
}

/* ── 2. Mixture-of-experts router ─────────────────────────────────────── */

export function MoeRouter() {
  const id = "hwArrMoe"
  const experts = [0, 1, 2, 3, 4, 5, 6, 7]
  const chosen = [0, 3, 5]
  return (
    <Frame viewBox="0 0 680 170">
      <ArrowHead id={id} />
      <rect x="30" y="70" width="80" height="40" rx="8" className="fill-surface stroke-border" strokeWidth={1} />
      <text x="70" y="94" textAnchor="middle" className="fill-ink font-mono text-[13px]">token</text>
      <line x1="110" y1="90" x2="146" y2="90" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />

      <rect x="150" y="66" width="96" height="48" rx="8" className="fill-signal stroke-signal" strokeWidth={1} />
      <text x="198" y="94" textAnchor="middle" className="fill-signal-text font-mono text-[13px]">router</text>
      <line x1="246" y1="90" x2="296" y2="90" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />

      {experts.map((e) => (
        <rect
          key={e}
          x={300 + e * 40}
          y="73"
          width="34"
          height="34"
          rx="6"
          className={
            chosen.includes(e)
              ? "hw-blink fill-hw-cool stroke-hw-cool"
              : "fill-surface stroke-border"
          }
          strokeWidth={1}
        />
      ))}
      <text x="457" y="140" textAnchor="middle" className="fill-muted-ink font-mono text-[11px]">
        288 experts &middot; 8 chosen per token
      </text>
    </Frame>
  )
}

/* ── 3. Where model safety lives ──────────────────────────────────────── */

export function SafetyLayers() {
  return (
    <Frame viewBox="0 0 680 226">
      <rect x="40" y="26" width="600" height="56" rx="10" className="fill-signal stroke-signal" strokeWidth={1} />
      <text x="60" y="50" className="fill-signal-text font-mono text-[13px]">In the weights</text>
      <text x="60" y="69" className="fill-signal-text/80 font-mono text-[11px]">set during training</text>
      <text x="620" y="60" textAnchor="end" className="fill-signal-text font-mono text-[11px]">ships with open weights</text>

      <rect x="40" y="92" width="600" height="56" rx="10" className="fill-surface stroke-border" strokeWidth={1} />
      <text x="60" y="116" className="fill-ink font-mono text-[13px]">In the serving layer</text>
      <text x="60" y="135" className="fill-muted-ink font-mono text-[11px]">API filters, system prompt</text>
      <text x="620" y="126" textAnchor="end" className="fill-muted-ink font-mono text-[11px]">stripped when self-hosted</text>

      <rect x="40" y="158" width="600" height="56" rx="10" className="fill-surface stroke-border" strokeWidth={1} />
      <text x="60" y="182" className="fill-ink font-mono text-[13px]">In the prompt</text>
      <text x="60" y="201" className="fill-muted-ink font-mono text-[11px]">the current request</text>
      <text x="620" y="192" textAnchor="end" className="fill-muted-ink font-mono text-[11px]">per request</text>
    </Frame>
  )
}

/* ── 4. Vector decomposition of the edit ──────────────────────────────── */

export function VectorDecomp() {
  const id = "hwArrVec"
  return (
    <Frame viewBox="0 0 680 228">
      <ArrowHead id={id} />
      <line x1="470" y1="70" x2="470" y2="188" className="stroke-muted-ink fill-none" strokeWidth={1} strokeDasharray="3 3" />
      <line x1="290" y1="180" x2="440" y2="180" className="stroke-muted-ink fill-none" strokeWidth={1.6} markerEnd={`url(#${id})`} />
      <text x="452" y="184" className="fill-muted-ink font-mono text-[12px]">r</text>
      <line x1="290" y1="192" x2="470" y2="192" className="stroke-hw-hot fill-none" strokeWidth={1.8} strokeDasharray="4 3" markerEnd={`url(#${id})`} />
      <text x="380" y="212" textAnchor="middle" className="fill-hw-hot font-mono text-[11px]">part along r, removed</text>
      <line x1="290" y1="180" x2="290" y2="70" className="stroke-hw-cool fill-none" strokeWidth={2.4} markerEnd={`url(#${id})`} />
      <text x="246" y="72" textAnchor="end" className="fill-hw-cool font-mono text-[12px]">W&prime; kept</text>
      <line x1="290" y1="180" x2="470" y2="70" className="stroke-ink fill-none" strokeWidth={2} markerEnd={`url(#${id})`} />
      <text x="478" y="66" className="fill-ink font-mono text-[12px]">W</text>
    </Frame>
  )
}

/* ── 5. The edit on a single arrow (2D picture) ───────────────────────── */

export function Projection2D() {
  const id = "hwArrProj"
  return (
    <Frame viewBox="0 0 680 300">
      <ArrowHead id={id} />
      <line x1="176" y1="250" x2="540" y2="250" className="stroke-border" strokeWidth={1} />
      <line x1="200" y1="288" x2="200" y2="64" className="stroke-border" strokeWidth={1} />
      <text x="548" y="254" className="fill-muted-ink font-mono text-[11px]">other features</text>
      <text x="196" y="58" textAnchor="end" className="fill-muted-ink font-mono text-[11px]">r (the refuse direction)</text>

      <line x1="320" y1="94" x2="320" y2="246" className="stroke-hw-hot" strokeWidth={1.8} strokeDasharray="4 3" />
      <text x="332" y="172" className="fill-hw-hot font-mono text-[11px]">r-part removed</text>
      <line x1="200" y1="250" x2="320" y2="92" className="stroke-ink fill-none" strokeWidth={2} markerEnd={`url(#${id})`} />
      <circle cx="320" cy="90" r="3.5" className="fill-ink" />
      <text x="330" y="88" className="fill-ink font-mono text-[12px]">x = (3, 4)</text>
      <line x1="200" y1="250" x2="314" y2="250" className="stroke-hw-cool fill-none" strokeWidth={2.4} markerEnd={`url(#${id})`} />
      <text x="257" y="272" textAnchor="middle" className="fill-hw-cool font-mono text-[11px]">result = (3, 0)</text>
    </Frame>
  )
}

/* ── 6. The bake pipeline ─────────────────────────────────────────────── */

export function MethodPipeline() {
  const id = "hwArrPipe"
  const steps = [
    { x: 20, w: 128, l1: "prompts", l2: "harmful vs harmless" },
    { x: 156, w: 128, l1: "measure r", l2: "layer 22 of 45" },
    { x: 292, w: 148, l1: "edit writers", l2: "W\u2032 = W - r(r\u1d40W)" },
    { x: 448, w: 128, l1: "requantize", l2: "back to block-FP8" },
    { x: 584, w: 76, l1: "306 GB", l2: "checkpoint" },
  ]
  return (
    <Frame viewBox="0 0 680 132">
      <ArrowHead id={id} />
      {steps.map((s, i) => (
        <g key={s.l1}>
          <rect x={s.x} y="34" width={s.w} height="56" rx="8" className={i === 4 ? "fill-signal stroke-signal" : "fill-surface stroke-border"} strokeWidth={1} />
          <text x={s.x + s.w / 2} y="58" textAnchor="middle" className={i === 4 ? "fill-signal-text font-mono text-[12px]" : "fill-ink font-mono text-[12px]"}>
            {s.l1}
          </text>
          <text x={s.x + s.w / 2} y="76" textAnchor="middle" className={i === 4 ? "fill-signal-text/80 font-mono text-[10px]" : "fill-muted-ink font-mono text-[10px]"}>
            {s.l2}
          </text>
          {i < steps.length - 1 && (
            <line
              x1={s.x + s.w + 2}
              y1="62"
              x2={steps[i + 1].x - 4}
              y2="62"
              className="hw-dash stroke-hw-cool fill-none"
              strokeWidth={1.6}
              markerEnd={`url(#${id})`}
            />
          )}
        </g>
      ))}
    </Frame>
  )
}

/* ── 7. Where refusal lives: ablate one writer group at a time ────────── */

const STAGES = [
  { label: "Baseline, no edit", writers: "0 of 76,108 tensors", pct: 87.5, hi: false },
  { label: "Attention only", writers: "45 writers", pct: 81.2, hi: false },
  { label: "+ dense / shared MLP", writers: "90 writers", pct: 84.4, hi: false },
  { label: "+ routed experts (shipped)", writers: "12,478 writers", pct: 3.1, hi: true },
  { label: "Whole-layer output hook", writers: "hook, no bake", pct: 12.5, hi: false },
]

export function StageLadder() {
  return (
    <div className="my-6 flex flex-col gap-3">
      {STAGES.map((s, i) => (
        <div key={s.label}>
          <div className="flex items-baseline justify-between gap-3">
            <span className={`font-mono text-[12px] ${s.hi ? "text-ink" : "text-muted-ink"}`}>{s.label}</span>
            <span className="font-mono text-[11px] text-muted-ink">{s.pct.toFixed(1)}% refusal</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-3.5 flex-1 overflow-hidden rounded border border-border bg-surface-dim">
              <div
                className={`hw-grow h-full ${s.hi ? "bg-signal" : "bg-muted-ink/45"}`}
                style={{ width: `${s.pct}%`, animationDelay: `${i * 90}ms` }}
              />
            </div>
            <span className="w-28 shrink-0 text-right font-mono text-[10px] text-muted-ink">{s.writers}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── 8. Safety benchmarks: base vs abliterated ────────────────────────── */

const SAFETY = [
  { name: "MaliciousInstruct", n: 100, base: 96.0, after: 11.0 },
  { name: "JailbreakBench (harmful)", n: 100, base: 93.0, after: 12.0 },
  { name: "ForbiddenQuestions", n: 150, base: 59.3, after: 12.0 },
  { name: "AdvBench", n: 100, base: 97.0, after: 15.0 },
  { name: "HarmBench (standard)", n: 150, base: 93.3, after: 18.0 },
  { name: "StrongREJECT", n: 150, base: 99.3, after: 27.3 },
  { name: "SimpleSafetyTests", n: 50, base: 92.0, after: 34.0 },
]

export function SafetyBars() {
  return (
    <div className="my-6 flex flex-col">
      {SAFETY.map((r, i) => (
        <div key={r.name} className="border-b border-border py-3 last:border-b-0">
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <span className="font-mono text-[12px] text-ink">{r.name}</span>
            <span className="font-mono text-[10px] text-muted-ink">n={r.n}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-right font-mono text-[10px] text-muted-ink">base</span>
            <div className="h-3 flex-1 overflow-hidden rounded bg-surface-dim">
              <div className="hw-grow h-full bg-hw-hot" style={{ width: `${r.base}%`, animationDelay: `${i * 60}ms` }} />
            </div>
            <span className="w-12 shrink-0 text-right font-mono text-[11px] text-ink">{r.base.toFixed(1)}%</span>
          </div>
          <div className="mt-1 flex items-center gap-3">
            <span className="w-20 shrink-0 text-right font-mono text-[10px] text-muted-ink">abliterated</span>
            <div className="h-3 flex-1 overflow-hidden rounded bg-surface-dim">
              <div className="hw-grow h-full bg-hw-cool" style={{ width: `${r.after}%`, animationDelay: `${i * 60 + 120}ms` }} />
            </div>
            <span className="w-12 shrink-0 text-right font-mono text-[11px] text-ink">{r.after.toFixed(1)}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── 9. The uncensoring ladder ────────────────────────────────────────── */

export function TechniqueLadder() {
  const id = "hwArrLadder"
  const items = [
    { x: 36, title: "Prompt", sub: "the prompt", hi: false },
    { x: 160, title: "Steering", sub: "activations", hi: false },
    { x: 284, title: "Abliteration", sub: "weights \u00b7 cut", hi: true },
    { x: 408, title: "DPO", sub: "weights \u00b7 train", hi: false },
    { x: 532, title: "SFT", sub: "weights \u00b7 train", hi: false },
  ]
  return (
    <Frame viewBox="0 0 680 160">
      <ArrowHead id={id} />
      {items.map((it) => (
        <g key={it.title}>
          <rect x={it.x} y="44" width="112" height="48" rx="8" className={it.hi ? "fill-signal stroke-signal" : "fill-surface stroke-border"} strokeWidth={1} />
          <text x={it.x + 56} y="66" textAnchor="middle" className={it.hi ? "fill-signal-text font-mono text-[12px]" : "fill-ink font-mono text-[12px]"}>
            {it.title}
          </text>
          <text x={it.x + 56} y="84" textAnchor="middle" className={it.hi ? "fill-signal-text/80 font-mono text-[10px]" : "fill-muted-ink font-mono text-[10px]"}>
            {it.sub}
          </text>
        </g>
      ))}
      <line x1="36" y1="118" x2="644" y2="118" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />
      <text x="36" y="140" className="fill-muted-ink font-mono text-[10px]">lighter &middot; reversible</text>
      <text x="644" y="140" textAnchor="end" className="fill-muted-ink font-mono text-[10px]">heavier &middot; higher fidelity</text>
    </Frame>
  )
}

/* ── 10. DPO preference pairs ─────────────────────────────────────────── */

export function DpoPairs() {
  const id = "hwArrDpo"
  return (
    <Frame viewBox="0 0 680 186">
      <ArrowHead id={id} />
      <rect x="40" y="78" width="130" height="44" rx="8" className="fill-surface stroke-border" strokeWidth={1} />
      <text x="105" y="104" textAnchor="middle" className="fill-ink font-mono text-[12px]">a prompt</text>

      <path d="M172 94 C 250 94, 270 66, 352 66" className="stroke-hw-cool fill-none" strokeWidth={1.8} markerEnd={`url(#${id})`} />
      <text x="262" y="60" textAnchor="middle" className="fill-hw-cool font-mono text-[11px]">toward</text>
      <path d="M172 106 C 250 106, 270 140, 352 140" className="stroke-hw-hot fill-none" strokeWidth={1.8} strokeDasharray="4 3" markerEnd={`url(#${id})`} />
      <text x="262" y="160" textAnchor="middle" className="fill-hw-hot font-mono text-[11px]">away</text>

      <rect x="356" y="44" width="236" height="44" rx="8" className="fill-hw-cool/15 stroke-hw-cool" strokeWidth={1} />
      <text x="474" y="70" textAnchor="middle" className="fill-ink font-mono text-[12px]">chosen: a helpful answer</text>
      <rect x="356" y="118" width="236" height="44" rx="8" className="fill-hw-hot/15 stroke-hw-hot" strokeWidth={1} />
      <text x="474" y="144" textAnchor="middle" className="fill-ink font-mono text-[12px]">rejected: the refusal</text>
    </Frame>
  )
}

/* ── 11. The uncensored family that formed in days ────────────────────── */

const BUILDS = [
  {
    badge: "weight edit",
    kind: "hot",
    name: "GLM-5.3-Flash-Uncensored-FP8",
    body: "The layer-22 direction orthogonalized out of 12,479 residual writers and baked into the official FP8 shards. The subject of this teardown.",
  },
  {
    badge: "weight edit",
    kind: "hot",
    name: "GLM-5.3-Flash-UNCENSORED (CRACK)",
    body: "A permanent tensor edit with no SFT, no LoRA and no steering. Framed around over-refusal on copyright and benign-flagged prompts.",
  },
  {
    badge: "runtime",
    kind: "cool",
    name: "GLM-5.3-Flash-Uncensored-Prefill-Topup",
    body: "Two refusal-direction vectors injected at prompt time after layers 25 and 26. About 180 KB. No weights changed.",
  },
  {
    badge: "re-quantization",
    kind: "dim",
    name: "NVFP4 / MLX / GGUF re-packs",
    body: "The abliterated weights re-packed for vLLM, Apple Silicon and llama.cpp stacks, down to 3 and 4 bit.",
  },
  {
    badge: "weight edit",
    kind: "hot",
    name: "Attention-only abliteration",
    body: "Abliterated by editing the attention output projections directly, then quantized to 4-bit.",
  },
]

export function BuildsGrid() {
  const badgeClass = (kind: string) =>
    kind === "hot"
      ? "bg-hw-hot/15 text-hw-hot"
      : kind === "cool"
        ? "bg-hw-cool/15 text-hw-cool"
        : "bg-surface-dim text-muted-ink"
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2">
      {BUILDS.map((b) => (
        <div key={b.name} className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4">
          <span className={`self-start rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${badgeClass(b.kind)}`}>
            {b.badge}
          </span>
          <span className="break-words font-mono text-[12px] text-ink">{b.name}</span>
          <span className="text-[13px] leading-relaxed text-muted-ink">{b.body}</span>
        </div>
      ))}
    </div>
  )
}

/* ── 12. The lab loop ─────────────────────────────────────────────────── */

export function LabLoop() {
  const id = "hwArrLab"
  const steps = [
    { x: 22, l1: "1 \u00b7 Prompt", l2: "the prompt" },
    { x: 184, l1: "2 \u00b7 Steering", l2: "activations" },
    { x: 346, l1: "3 \u00b7 Abliteration", l2: "weights \u00b7 cut" },
    { x: 508, l1: "4 \u00b7 Fine-tune", l2: "weights \u00b7 train" },
  ]
  return (
    <Frame viewBox="0 0 680 222">
      <ArrowHead id={id} />
      <rect x="170" y="20" width="340" height="42" rx="8" className="fill-signal stroke-signal" strokeWidth={1} />
      <text x="340" y="46" textAnchor="middle" className="fill-signal-text font-mono text-[12px]">0 &middot; build the eval harness</text>
      <line x1="340" y1="62" x2="340" y2="80" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />

      {steps.map((s) => (
        <g key={s.l1}>
          <rect x={s.x} y="88" width="150" height="48" rx="8" className="fill-surface stroke-border" strokeWidth={1} />
          <text x={s.x + 75} y="110" textAnchor="middle" className="fill-ink font-mono text-[12px]">{s.l1}</text>
          <text x={s.x + 75} y="128" textAnchor="middle" className="fill-muted-ink font-mono text-[10px]">{s.l2}</text>
          <line x1={s.x + 75} y1="136" x2={s.x + 75} y2="166" className="stroke-muted-ink fill-none" strokeWidth={1.4} markerEnd={`url(#${id})`} />
        </g>
      ))}

      <rect x="22" y="168" width="636" height="42" rx="8" className="fill-surface stroke-border" strokeWidth={1} />
      <text x="340" y="194" textAnchor="middle" className="fill-muted-ink font-mono text-[11px]">
        compare: refusal &middot; over-refusal &middot; capability &middot; KL
      </text>
    </Frame>
  )
}

/* ── 13. Sample scoreboard for the small-model lab ────────────────────── */

const TARGETS = [
  { label: "Base Gemma", pct: 90, hot: true },
  { label: "1 \u00b7 Prompt only", pct: 70, hot: false },
  { label: "2 \u00b7 Steering", pct: 25, hot: false },
  { label: "3 \u00b7 Abliteration", pct: 10, hot: false },
  { label: "4 \u00b7 DPO / SFT", pct: 7, hot: false },
]

export function TargetLadder() {
  return (
    <div className="my-6 flex flex-col gap-3">
      {TARGETS.map((s, i) => (
        <div key={s.label}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-mono text-[12px] text-muted-ink">{s.label}</span>
            <span className="font-mono text-[11px] text-muted-ink">~{s.pct}%</span>
          </div>
          <div className="mt-1 h-3.5 overflow-hidden rounded border border-border bg-surface-dim">
            <div
              className={`hw-grow h-full ${s.hot ? "bg-hw-hot" : "bg-hw-cool"}`}
              style={{ width: `${s.pct}%`, animationDelay: `${i * 90}ms` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── 14. Also exported for the interactive file's shared frame ────────── */
export { Frame }
