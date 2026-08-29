/**
 * LLM Credits — prepaid, pay-as-you-go balance on a Hawiyat API key.
 *
 * The difference from the Composer monthly plans: no subscription, no tier.
 * The customer buys any amount in DZD and spends it on whichever models they
 * want. Credits are metered per request on the usage dashboard.
 *
 * IMPORTANT: no per-token retail rate is published here. Rates are shown to the
 * customer on the usage dashboard after activation; publishing a public DA/1M
 * rate card is an owner decision (margin), not a copy decision.
 */

export const CREDITS_MIN_DA = 1000
export const CREDITS_MAX_DA = 500000

/** Preset top-up amounts in DZD. `popular` drives the recommended badge. */
export interface CreditPack {
  amount: number
  label: string
  note: string
  popular?: boolean
}

export const CREDIT_PACKS: CreditPack[] = [
  { amount: 2000, label: "Starter", note: "Try the API on a real project" },
  { amount: 5000, label: "Builder", note: "Steady dev + testing usage", popular: true },
  { amount: 10000, label: "Team", note: "Production workloads" },
  { amount: 25000, label: "Scale", note: "High-volume agents and pipelines" },
]

/**
 * Model picker = TREE of top global models grouped by vendor (public brand
 * names only — never our gateway route/alias names).
 *
 * Each vendor node offers:
 *   - a group wildcard: "All <vendor> models"
 *   - individual model checkboxes
 * The top-level "Any model" wildcard covers everything via Composer routing.
 * Anything not listed can be added via the free-text "add another model" field
 * — the order notes tell the team to enable it on the customer's key.
 *
 * Version-agnostic on purpose: vendors bump versions constantly; the site must
 * not carry a stale or invented version string. The enabled versions on the key
 * are whatever is current when we provision.
 */
export interface ModelNode {
  id: string
  name: string
  note?: string
}

export interface ModelGroup {
  id: string
  vendor: string
  models: ModelNode[]
}

export const MODEL_GROUPS: ModelGroup[] = [
  {
    id: "openai",
    vendor: "OpenAI",
    models: [
      { id: "gpt-4o", name: "GPT-4o", note: "Fast, general purpose" },
      { id: "gpt-4.1", name: "GPT-4.1", note: "Long context, code" },
      { id: "gpt-5", name: "GPT-5", note: "Reasoning and agents" },
      { id: "gpt-5-mini", name: "GPT-5 mini", note: "Cheap, low latency" },
      { id: "o-series", name: "o-series (reasoning)", note: "Deep reasoning models" },
    ],
  },
  {
    id: "anthropic",
    vendor: "Anthropic",
    models: [
      { id: "claude-opus", name: "Claude Opus", note: "Most capable, long context" },
      { id: "claude-sonnet", name: "Claude Sonnet", note: "Agentic coding, balanced" },
      { id: "claude-haiku", name: "Claude Haiku", note: "Fast and cheap" },
    ],
  },
  {
    id: "google",
    vendor: "Google",
    models: [
      { id: "gemini-pro", name: "Gemini Pro", note: "Multimodal, long docs" },
      { id: "gemini-flash", name: "Gemini Flash", note: "Fast, cost-efficient" },
    ],
  },
  {
    id: "xai",
    vendor: "xAI",
    models: [
      { id: "grok", name: "Grok", note: "Real-time and reasoning" },
    ],
  },
  {
    id: "deepseek",
    vendor: "DeepSeek",
    models: [
      { id: "deepseek-chat", name: "DeepSeek Chat", note: "General chat, low cost" },
      { id: "deepseek-reasoner", name: "DeepSeek Reasoner", note: "Math and code reasoning" },
    ],
  },
  {
    id: "alibaba",
    vendor: "Alibaba",
    models: [
      { id: "qwen-max", name: "Qwen Max", note: "Top-tier multilingual" },
      { id: "qwen-plus", name: "Qwen Plus", note: "Balanced, strong Arabic" },
    ],
  },
  {
    id: "meta",
    vendor: "Meta",
    models: [
      { id: "llama", name: "Llama", note: "Open-weight, self-host friendly" },
    ],
  },
  {
    id: "moonshot",
    vendor: "Moonshot",
    models: [
      { id: "kimi", name: "Kimi", note: "Very long context" },
    ],
  },
  {
    id: "mistral",
    vendor: "Mistral AI",
    models: [
      { id: "mistral-large", name: "Mistral Large", note: "Efficient European models" },
      { id: "mistral-small", name: "Mistral Small", note: "Low-latency, cheap" },
    ],
  },
]

/** Top-level wildcard: Composer routes every request to the best model. */
export const MODEL_TARGET_ANY_ID = "any"

/** Free-text escape hatch: any model we haven't listed, enabled on request. */
export const MODEL_TARGET_OTHER_ID = "other"

export const CREDITS_SERVICE_ID = "llm-credits"

export function formatDA(amount: number): string {
  return amount.toLocaleString("en-US")
}

/** Clamp + round any typed amount to a valid order value. */
export function normalizeCreditAmount(raw: number): number {
  if (!Number.isFinite(raw)) return CREDITS_MIN_DA
  const rounded = Math.round(raw)
  if (rounded < CREDITS_MIN_DA) return CREDITS_MIN_DA
  if (rounded > CREDITS_MAX_DA) return CREDITS_MAX_DA
  return rounded
}

export const CREDITS_FAQ: Array<{ question: string; answer: string }> = [
  {
    question: "What are Hawiyat LLM credits?",
    answer:
      "A prepaid balance in Algerian dinars on your Hawiyat API key. You choose the amount, we activate the key, and every request you make draws from that balance. There is no monthly subscription and no tier to outgrow.",
  },
  {
    question: "Can I use credits on any model?",
    answer:
      "Yes. Pick the global models you want when you order — GPT, Claude, Gemini, Grok, DeepSeek, Qwen, Llama, Kimi, Mistral — or let Composer route each task to the best one. If the model you need is not in the list, name it in your order and we enable it on your key. The same balance covers every model you use.",
  },
  {
    question: "How much can I buy?",
    answer:
      "Any amount from 1,000 DA upward. Pick one of the preset amounts or type your own. If you need a volume amount above 500,000 DA, contact us and we will prepare it for you.",
  },
  {
    question: "Do credits expire?",
    answer:
      "No. Your balance stays on your key until you spend it. You can top up at any time with any amount, and the new amount is added to the balance you already have.",
  },
  {
    question: "How do I track what I spend?",
    answer:
      "Every request is metered on your usage dashboard: which model was used, how many tokens, and what it cost against your balance. You can see the remaining balance there at any time.",
  },
  {
    question: "Do I need a foreign credit card?",
    answer:
      "No. Credits are billed in Algerian dinars and paid with CCP or Baridi Mob. No foreign card and no currency conversion.",
  },
]
