"use client"

/**
 * BlogWidget — renders an interactive/animated figure inside a blog post.
 *
 * Authored in markdown as a fenced code block tagged `widget`, whose first
 * (and only) line names the widget:
 *
 * ```widget
 * stream-flow
 * ```
 *
 * Unknown names render a visible fallback instead of failing the build, so a
 * typo degrades to text rather than a blank hole in the article.
 */

import {
  BuildsGrid,
  DpoPairs,
  LabLoop,
  MethodPipeline,
  MoeRouter,
  Projection2D,
  SafetyBars,
  SafetyLayers,
  StageLadder,
  StreamFlow,
  TargetLadder,
  TechniqueLadder,
  VectorDecomp,
} from "./diagram-widgets"
import { AttentionLab, RefusalAxis, RequantSlider, StatBand } from "./interactive-widgets"
import {
  EntryLadder,
  FrontierCost,
  PlanSplit,
  RailsMatrix,
  VerificationMatrix,
  WrapperVsEngine,
} from "./showcase-widgets"

const REGISTRY: Record<string, React.ComponentType> = {
  "stat-band": StatBand,
  "stream-flow": StreamFlow,
  "moe-router": MoeRouter,
  "attention-lab": AttentionLab,
  "refusal-axis": RefusalAxis,
  "safety-layers": SafetyLayers,
  "vector-decomp": VectorDecomp,
  "projection-2d": Projection2D,
  "method-pipeline": MethodPipeline,
  "stage-ladder": StageLadder,
  "safety-bars": SafetyBars,
  "technique-ladder": TechniqueLadder,
  "dpo-pairs": DpoPairs,
  "builds-grid": BuildsGrid,
  "lab-loop": LabLoop,
  "target-ladder": TargetLadder,
  "requant-slider": RequantSlider,
  "entry-ladder": EntryLadder,
  "frontier-cost": FrontierCost,
  "wrapper-vs-engine": WrapperVsEngine,
  "verification-matrix": VerificationMatrix,
  "plan-split": PlanSplit,
  "rails-matrix": RailsMatrix,
}

export function BlogWidget({ name }: { name: string }) {
  const key = name.trim()
  const Comp = REGISTRY[key]
  if (!Comp) {
    return (
      <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-surface-dim/40 p-4 font-mono text-xs text-muted-ink">
        {`[diagram unavailable: ${key}]`}
      </pre>
    )
  }
  return <Comp />
}
