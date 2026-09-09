import { Zap, Clock, Shield, Server, MessageSquare, Bot, type LucideIcon } from "lucide-react"

export interface ServicePlan {
  name: string
  price: string
  priceLabel: string
  tagline: string
  originalPrice?: string
  launchNote?: string
  custom?: boolean
  features: string[]
}

export interface Service {
  id: string
  slug: string
  name: string
  shortDesc: string
  description: string
  image?: string
  images?: string[]
  price: string
  originalPrice?: string
  priceLabel: string
  cta: string
  category: string
  tag?: string
  /** Whether the service can be ordered. Defaults to "available". */
  availability?: "available" | "unavailable" | "contact"
  useCases: string
  features: string[]
  bulletPoints: Array<{
    icon: LucideIcon
    text: string
  }>
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  details: {
    overview: string
    whatYouGet: string[]
    idealFor: string
    technicalSpecs?: string[]
  }
  plans?: ServicePlan[]
  fairUse?: string
  disclaimer?: string
  /** Self-contained 134-167 word answer blocks for AI search (GEO) citability. */
  seoContent?: {
    whatIs: string
    whyChoose: string
    howItWorks: string
  }
  /** FAQ content (not FAQPage schema) for long-tail keyword capture. */
  faq?: Array<{
    question: string
    answer: string
  }>
}

/**
 * Composer-with-tool services: the same execution-layer plans (Pro / MAX 5X / MAX 20X)
 * sold under the tool the developer already uses. Each gets its own detail page with
 * tool-specific Q&A: quota = same monthly tokens the tool gives, no weekly/5-hour caps.
 */
function composerToolService(opts: {
  id: string
  slug: string
  tool: string
  logo: string
  shortTagline: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string[]
  whatIs: string
  whyChoose: string
  howItWorks: string
  faq: Array<{ question: string; answer: string }>
}): Service {
  const plans: ServicePlan[] = [
    {
      name: "Pro",
      price: "6,000",
      priceLabel: "DA/month",
      tagline: "For solo builders. Give it a task, get a checked result.",
      features: [
        "One API key for your tools, activated once",
        "Model-agnostic routing per task",
        "Context-aware execution against your systems",
        "Automatic model fallbacks on failure",
        "Evaluation and quality score for every run",
        "Semantic caching to cut repeat spend",
        "Billed in DZD with a transparent per-task cost",
      ],
    },
    {
      name: "MAX 5X",
      price: "15,000",
      priceLabel: "DA/month",
      tagline: "5× more tasks at the same time, for startups and teams shipping daily.",
      features: [
        "5X base execution capacity, more parallel runs and tasks",
        "Everything in Pro",
        "Advanced semantic caching (vector-based)",
        "Automatic model fallbacks on failure",
        "Evaluation and quality score for every run",
        "Billed in DZD with a transparent per-task cost",
      ],
    },
    {
      name: "MAX 20X",
      price: "30,000",
      priceLabel: "DA/month",
      tagline: "20× more tasks at the same time, for agencies running AI at scale.",
      features: [
        "Everything in MAX 5X",
        "20× the base execution capacity of Pro, maximum parallel throughput",
        "Multi-agent traffic resolution for heavy concurrent load",
        "Hybrid data compliance for strict enterprise requirements",
        "Dedicated account manager who knows your runs",
        "Advanced usage analytics in DZD",
      ],
    },
  ]
  return {
    id: opts.id,
    slug: opts.slug,
    name: `Composer with ${opts.tool}`,
    shortDesc: `The Composer execution layer for ${opts.tool} users`,
    description: opts.shortTagline,
    image: opts.logo,
    price: "6000",
    priceLabel: "DA/month",
    cta: "See plans in DZD",
    category: "AI Infrastructure",
    useCases: `Developers who use ${opts.tool} and want frontier models through one key, billed in DZD.`,
    features: [
      `One API key for ${opts.tool}, with Anthropic + OpenAI models through Composer`,
      "Model-agnostic routing per task",
      "Context-aware execution against your systems",
      "Automatic model fallbacks on failure",
      "Evaluation and quality score for every run",
      "Semantic caching to cut repeat spend",
      "Billed in DZD with a transparent per-task cost",
    ],
    bulletPoints: [
      { icon: Zap, text: "Route per Task" },
      { icon: Shield, text: "Fallbacks Built-In" },
      { icon: Clock, text: "Evaluate Every Run" },
    ],
    seo: {
      title: opts.seoTitle,
      description: opts.seoDescription,
      keywords: opts.seoKeywords,
    },
    details: {
      overview: opts.whatIs,
      whatYouGet: [
        "Anthropic and OpenAI models, plus Gemini and open models, behind one key",
        "The same monthly token quota the tool gives you — without weekly or 5-hour caps",
        "Automatic fallback to a second model when one is slow or down",
        "Evaluation log with a quality score for every run",
        "Semantic caching so repeated work never pays twice",
        "Priority support via WhatsApp in AR, FR, EN",
      ],
      idealFor: `Developers and freelancers who use ${opts.tool} and want frontier models without a foreign card, billed in DZD.`,
      technicalSpecs: [
        "Model routes: Anthropic Claude, OpenAI GPT, Gemini, open models",
        `Connect your Composer API key to ${opts.tool} once — activation is one time`,
        "Monthly billing in DZD via CCP or Baridi Mob",
        "No weekly limit, no 5-hour limit — only the monthly quota",
      ],
    },
    plans,
    seoContent: {
      whatIs: opts.whatIs,
      whyChoose: opts.whyChoose,
      howItWorks: opts.howItWorks,
    },
    faq: opts.faq,
  }
}

const ACTIVATION_FAQ = {
  question: "How do I activate my account, and what quota do I get?",
  answer:
    "You activate your account with your API key just one time, then enjoy the quota. The quota you get is exactly what the plan really gives you: the same monthly tokens the tool gives you — with no 5-hour cap and no weekly cap, only the monthly limit.",
}

const GUARANTEE_FAQ = {
  question: "Is my API key guaranteed? What happens if something goes wrong?",
  answer:
    "It is guaranteed. With your API key, Hawiyat is responsible for the service and will solve any kind of problem with you — no bans, no account freezes, no surprises. If anything breaks, the team steps in and fixes it.",
}

const NO_DATA_STORAGE_FAQ = {
  question: "Do you store my data?",
  answer:
    "No. Hawiyat does not store your data. Everything goes to the provider and comes straight back to you; nothing is kept, nothing is trained on.",
}

export const services: Service[] = [
  {
    id: "n8n-hosting",
    slug: "n8n-hosting",
    name: "n8n Hosting",
    shortDesc: "Managed workflow automation platform",
    description: "Managed n8n automation, fully maintained by our team. Pick the level that fits how you work.",
    image: "/services/n8n-hosting.png",
    price: "8000",
    priceLabel: "DA/year",
    cta: "See plans in DZD",
    category: "Managed Systems",
    tag: "Popular",
    useCases: "Automating WhatsApp replies, connecting CRMs, form-triggered actions, AI pipelines, scheduled tasks.",
    features: [
      "Fully managed instances",
      "Auto-scaling infrastructure",
      "99.9% uptime guarantee",
      "One-click deployment",
      "24/7 monitoring",
    ],
    bulletPoints: [
      { icon: Zap, text: "Instant Deployment" },
      { icon: Clock, text: "24/7 Uptime" },
      { icon: Shield, text: "Fully Managed" },
    ],
    seo: {
      title: "n8n Hosting in Algeria | Managed Workflow Automation",
      description: "Managed n8n hosting in Algeria. Automate workflows, connect apps, and build AI pipelines without server management. 8000 DA/year with 99.9% uptime.",
      keywords: [
        "n8n hosting algeria",
        "workflow automation algeria",
        "managed n8n",
        "n8n algerie",
        "automation platform dz",
        "n8n managed hosting",
        "workflow automation dz",
        "n8n server algeria",
        "automate business processes algeria",
        "n8n hosting algerie",
      ],
    },
    details: {
      overview: "Our managed n8n hosting gives you a production-ready workflow automation platform without the infrastructure headaches. We handle deployment, scaling, monitoring, and maintenance so you can focus on building powerful automations.",
      whatYouGet: [
        "Fully managed n8n instance with automatic updates",
        "Auto-scaling infrastructure that grows with your workflows",
        "99.9% uptime SLA with 24/7 monitoring",
        "One-click deployment and easy setup",
        "SSL certificates and security hardening",
        "Daily backups and disaster recovery",
        "Priority support via WhatsApp",
      ],
      idealFor: "Businesses automating WhatsApp replies, connecting CRMs, building AI pipelines, triggering actions from forms, and running scheduled tasks.",
      technicalSpecs: [
        "Latest n8n version with all core nodes",
        "PostgreSQL database included",
        "Unlimited workflows and executions",
        "Custom domain support",
        "Webhook endpoints for external integrations",
        "API access for programmatic control",
      ],
    },
    plans: [
      {
        name: "Freelance",
        price: "8,000",
        priceLabel: "DA/year",
        tagline: "For solo devs and freelancers.",
        features: [
          "Your n8n automation, fully managed by us",
          "Up to 8 workflows running at the same time",
          "Support by email (Gmail)",
        ],
      },
      {
        name: "Startup",
        price: "30,000",
        priceLabel: "DA/year",
        tagline: "Best option for small companies and startups.",
        features: [
          "Worker-based setup: parallel execution, handles heavier load, no single-instance bottleneck",
          "Unlimited executions",
          "99% uptime guarantee",
          "Support by email (Gmail)",
        ],
      },
      {
        name: "Enterprise",
        price: "80,000",
        priceLabel: "DA/year",
        tagline: "Built for scale.",
        features: [
          "Worker-based setup: parallel execution, handles heavier load",
          "Backups included: automatic backups and restore whenever you need (the only tier with backups)",
          "99.9% uptime guarantee, we compensate if we miss it",
          "Support by WhatsApp (the only tier with WhatsApp support)",
        ],
      },
    ],
    fairUse: "n8n Freelance: 8 concurrent workflows maximum. The Freelance plan covers up to 8 workflows running at the same time. If we detect more than 8 running concurrently on a Freelance account, we have the right to remove the account from the plan. Startup and Enterprise have no such limit.",
    seoContent: {
      whatIs:
        "n8n hosting in Algeria is a managed workflow automation platform that lets you connect apps, automate tasks, and build AI pipelines without managing servers. Hawiyat provides fully managed n8n instances with 99.9% uptime, automatic updates, and local support in Arabic, French, and English. Every plan includes a PostgreSQL database, unlimited workflows, custom domain support, and webhook endpoints for external integrations. Pricing starts at 8,000 DA/year for the Freelance plan (up to 8 concurrent workflows), 30,000 DA/year for the Startup plan (worker-based setup with unlimited executions), and 80,000 DA/year for Enterprise (automatic backups, 99.9% uptime SLA with compensation, WhatsApp support). Each instance runs the latest n8n version with all core nodes and includes SSL certificates, and 24/7 monitoring. Whether you are automating WhatsApp replies, connecting CRMs, building AI pipelines, or triggering actions from forms, managed n8n hosting from Hawiyat lets you build powerful automations without infrastructure headaches.",
      whyChoose:
        "Hawiyat is the only n8n hosting provider based in Algeria with local support in Arabic, French, and English. Unlike international providers, we offer pricing in Algerian dinars (DZD), same-timezone support, and infrastructure optimized for Algerian businesses. Our team has deployed n8n for 200+ clients, so you get production-tested infrastructure rather than experimental setups. We handle deployment, scaling, monitoring, and maintenance so you focus on building automations. The Freelance plan starts at 8,000 DA/year with up to 8 concurrent workflows. The Startup plan gives you worker-based parallel execution, and the Enterprise plan adds automatic backups and a 99.9% uptime SLA with compensation if we miss it. All plans include unlimited workflows, PostgreSQL database, custom domain support, and API access. We are based in Algiers and serve customers across Algeria with reliable managed n8n hosting.",
      howItWorks:
        "Getting started with n8n hosting at Hawiyat takes three steps. First, choose your plan: Freelance (8,000 DA/year, up to 8 concurrent workflows), Startup (30,000 DA/year, worker-based setup, unlimited executions), or Enterprise (80,000 DA/year, automatic backups, 99.9% uptime SLA, WhatsApp support). Second, submit your order through our website with your preferred payment method CCP, Baridi Mob, or USD. Third, our team deploys your n8n instance within 24 hours with automatic updates, SSL certificates, and 24/7 monitoring enabled. You get access to the latest n8n version with all core nodes, unlimited workflows and executions on Startup and Enterprise, webhook endpoints for external integrations, and API access for programmatic control. We handle server management, scaling, and maintenance entirely. You build automations for WhatsApp replies, CRM connections, AI pipelines, and scheduled tasks. Support is available by email on all plans and by WhatsApp on the Enterprise plan.",
    },
    faq: [
      {
        question: "What is the difference between the n8n Freelance, Startup, and Enterprise plans?",
        answer:
          "Freelance (8,000 DA/year) is for solo developers with up to 8 concurrent workflows. Startup (30,000 DA/year) uses worker-based setup for unlimited executions and is best for small companies and startups. Enterprise (80,000 DA/year) includes automatic backups, a 99.9% uptime SLA with compensation, and WhatsApp support for teams scaling heavy workloads.",
      },
      {
        question: "Do you provide n8n hosting support in Arabic and French?",
        answer:
          "Yes. Hawiyat provides n8n hosting support in Arabic, French, and English. We are based in Algeria and serve customers across the country with local, timezone-aligned support by email on all plans and by WhatsApp on the Enterprise plan.",
      },
      {
        question: "Can I upgrade my n8n plan later?",
        answer:
          "Yes, you can upgrade from Freelance to Startup or Enterprise at any time. Contact us via email or WhatsApp (Enterprise plan) to discuss your requirements, and we will migrate your workflows to the new plan without downtime.",
      },
    ],
  },
  {
    id: "composer-pro",
    slug: "composer",
    name: "Hawiyat AI Composer",
    shortDesc: "The execution layer for your AI tasks",
    description:
      "Run your AI tasks on the Hawiyat execution layer. Composer routes each task to the right model, carries your context, and evaluates the result, so you ship work, not prompt plumbing.",
    image: "/services/hawiyat%20composer.png",
    price: "6000",
    priceLabel: "DA/month",
    cta: "See plans in DZD",
    category: "AI Infrastructure",
    useCases: "Individual developers and freelancers shipping AI-powered work without managing model APIs, keys, or fallbacks.",
    features: [
      "One API key for Cursor, Claude Code, Codex, Antigravity & GitHub Copilot",
      "Model-agnostic routing per task",
      "Context-aware execution against your systems",
      "Automatic model fallbacks on failure",
      "Evaluation and quality score for every run",
      "Semantic caching to cut repeat spend",
      "Billed in DZD with a transparent per-task cost",
    ],
    bulletPoints: [
      { icon: Zap, text: "Route per Task" },
      { icon: Shield, text: "Fallbacks Built-In" },
      { icon: Clock, text: "Evaluate Every Run" },
    ],
    seo: {
      title: "AI API in Algeria | Composer from 6,000 DA",
      description:
        "One key to GPT, Claude, Gemini, and open LLMs via the Composer execution layer. LLM routing, context, fallbacks, evaluation. 6,000 DA/month, CCP or Baridi Mob.",
      keywords: [
        "ai api algeria",
        "llm api algeria",
        "ai provider algeria",
        "ai execution layer algeria",
        "hawiyat ai composer",
        "ai composer pro algeria",
        "ai routing algeria",
        "ai infrastructure algeria",
        "api key chatgpt algeria",
        "claude api algeria",
        "model agnostic ai algeria",
        "ai task automation algeria",
        "ai developer tools algeria",
      ],
    },
    details: {
      overview:
        "Hawiyat AI Composer gives solo builders the execution layer behind every AI task: routing, context, fallbacks, and evaluation, priced in DZD and supported locally.",
      whatYouGet: [
        "Route every task to the best model by quality, latency, and cost",
        "Carry business context from your CRM, ERP, email, and databases",
        "Automatic fallback to a second model when one is slow or down",
        "Evaluation log with a quality score for every run",
        "Semantic caching so repeated work never pays twice",
        "Priority support via WhatsApp",
      ],
      idealFor: "Individual developers and freelancers who want to ship AI-powered work without babysitting model APIs, keys, or fallbacks.",
      technicalSpecs: [
        "Model routes: GPT, Claude, Gemini, and open models",
        "Vector-based semantic caching",
        "Automatic fallback cascades",
        "Per-run evaluation and logging",
        "IDE integrations (VS Code, JetBrains)",
        "API access for custom workflows",
      ],
    },
    plans: [
      {
        name: "Pro",
        price: "6,000",
        priceLabel: "DA/month",
        tagline: "For solo builders. Give it a task, get a checked result.",
        features: [
          "Model-agnostic routing per task",
          "Context-aware execution against your systems",
          "Automatic model fallbacks on failure",
          "Evaluation and quality score for every run",
          "Semantic caching to cut repeat spend",
          "Billed in DZD with a transparent per-task cost",
        ],
      },
      {
        name: "MAX 5X",
        price: "15,000",
        priceLabel: "DA/month",
        tagline: "5× more tasks at the same time, for startups and teams shipping daily.",
        features: [
          "5X base execution capacity, more parallel runs and tasks",
          "Model-agnostic routing per task",
          "Advanced semantic caching (vector-based)",
          "Automatic model fallbacks on failure",
          "Evaluation and quality score for every run",
          "Billed in DZD with a transparent per-task cost",
        ],
      },
      {
        name: "MAX 20X",
        price: "30,000",
        priceLabel: "DA/month",
        tagline: "20× more tasks at the same time, for agencies running AI at scale.",
        features: [
          "Everything in MAX 5X",
          "20× the base execution capacity of Pro, maximum parallel throughput",
          "Multi-agent traffic resolution for heavy concurrent load",
          "Hybrid data compliance for strict enterprise requirements",
          "Dedicated account manager who knows your runs",
          "Advanced usage analytics in DZD",
        ],
      },
      {
        name: "Enterprise",
        price: "",
        priceLabel: "",
        tagline: "The execution layer, sized for your entire operation.",
        custom: true,
        features: [
          "The execution layer, tuned for your whole operation",
          "Dedicated account manager who knows your runs and your stack",
          "Priority WhatsApp support from the local team in AR, FR, and EN",
          "Custom infrastructure and capacity built around your workloads",
          "Single contract, one invoice, everything billed in DZD",
        ],
      },
    ],
    seoContent: {
      whatIs:
        "Hawiyat AI Composer is the execution layer for solo developers in Algeria. It sits between frontier AI models (GPT, Claude, Gemini, open models) and the systems you work with, deciding the best way to accomplish each task: which model to route to, what context to carry, and when to fall back. Every run is evaluated and logged, so you see the result, the quality score, and the cost in dinars. Priced at 6,000 DA/month, Pro is built for individual developers and freelancers who want to ship AI-powered work without managing model APIs, keys, or fallbacks. It includes context-aware execution against your systems, semantic caching so repeated work never pays twice, and a transparent per-task cost. Model-agnostic by design, the layer outlives any single model: when a provider changes, your pipeline does not.",
      whyChoose:
        "Solo developers in Algeria choose Hawiyat AI Composer because it runs the layer, not a model. Instead of wiring OpenAI, Claude, and Gemini by hand and keeping every key alive, you describe the task and Composer routes it to the best model by quality, latency, and cost. Fallbacks absorb outages: if a model is slow or down, the task still completes. Every run is evaluated, so you ship outcomes you can measure, not prompts you hope worked. You pay 6,000 DA/month in dinars with CCP or Baridi Mob, and every run shows a transparent per-task cost. Support is local, in Arabic, French, and English, via WhatsApp. For a freelancer shipping client work, the execution layer is the difference between a deliverable that works and plumbing you own forever.",
      howItWorks:
        "Getting started with Hawiyat AI Composer takes three steps. First, order the plan on our services page at 6,000 DA/month with CCP, Baridi Mob, or USD. Second, our team activates your Composer workspace within 24 hours. Third, connect your tools, IDE integrations for VS Code and JetBrains or the API for custom workflows, and run your first task. Composer takes it through a run: plan, route to the best model for the job, execute with your context, evaluate the result, and log the cost in DZD. Semantic caching makes repeated work instant, and fallbacks keep tasks moving when a model is slow or down. Every run leaves an evaluation log you can audit. Our team monitors the service 24/7, and priority support is available via WhatsApp.",
    },
    faq: [
      {
        question: "What exactly does Hawiyat AI Composer do?",
        answer:
          "Composer is the execution layer between AI models and your systems. For each task it decides which model to route to, which context to carry, when to fall back, and whether the result is good enough, then logs the run and its cost in DZD.",
      },
      {
        question: "Is Hawiyat AI Composer tied to one AI model?",
        answer:
          "No. Models are routes, chosen per task by quality, latency, and cost. GPT, Claude, Gemini, and open models are all available routes inside the layer, so the layer outlives any single model.",
      },
      {
        question: "How are costs billed?",
        answer:
          "In Algerian dinars with CCP or Baridi Mob. Pro is 6,000 DA/month, and every run shows a transparent per-task cost, so you always know what you paid and what you got.",
      },
      {
        question: "How do I activate my account, and what quota do I get?",
        answer:
          "You activate your account with your API key just one time, then enjoy the quota. The quota you get is exactly what the plan really gives you: for example, a Claude Max subscription gives you around 1.8 billion tokens (input and output combined), and with Composer you get the same kind of quota — but with no 5-hour cap and no weekly cap.",
      },
      {
        question: "Is my API key guaranteed? What happens if something goes wrong?",
        answer:
          "It is guaranteed. With your API key, Hawiyat is responsible for the service and will solve any kind of problem with you — no bans, no account freezes, no surprises. If anything breaks, the team steps in and fixes it.",
      },
      {
        question: "Do you store my data?",
        answer:
          "No. Hawiyat does not store your data. Everything goes to the provider and comes straight back to you; nothing is kept, nothing is trained on.",
      },
    ],
  },
  composerToolService({
    id: "composer-cursor",
    slug: "composer-cursor",
    tool: "Cursor",
    logo: "/Compatible/cursor.webp",
    shortTagline: "The AI-first code editor, powered by the Composer execution layer.",
    seoTitle: "Composer with Cursor | AI API for Cursor in Algeria | Hawiyat",
    seoDescription:
      "Use Cursor in Algeria with one Composer API key: Anthropic + OpenAI models, the same monthly token quota as Cursor but no weekly or 5-hour limits. From 6,000 DA/month, CCP or Baridi Mob.",
    seoKeywords: [
      "composer with cursor",
      "cursor algeria",
      "ai api for cursor",
      "cursor without foreign card",
      "cursor api dzd",
      "ai coding algeria",
      "claude for cursor algeria",
    ],
    whatIs:
      "Composer with Cursor is the Hawiyat execution layer wired for Cursor users: one API key that brings Anthropic and OpenAI models, plus Gemini and open models, into your Cursor workflows. Composer routes each task to the best model, carries your context, and evaluates the result, so you ship work, not prompt plumbing. Billed in DZD, paid with CCP or Baridi Mob, no foreign card needed.",
    whyChoose:
      "Cursor gives you excellent models but strict usage limits. With Composer with Cursor, the token quota you get is the same as what Cursor gives you in one month — but there is no weekly limit and no 5-hour limit, only a monthly limit. You also get both Anthropic and OpenAI models behind one key, with automatic fallbacks and per-run evaluation, all billed in dinars.",
    howItWorks:
      "Order the plan (Pro 6,000 / MAX 5X 15,000 / MAX 20X 30,000 DA/month), pay with CCP or Baridi Mob, and we activate your account with your API key just once. Point Cursor at the Composer endpoint, and every request is routed to the best model for the task — with fallbacks, semantic caching, and a transparent per-task cost in DZD.",
    faq: [
      {
        question: "What models do I get with Composer with Cursor?",
        answer:
          "You get Anthropic and OpenAI models, plus Gemini and open models, through one Composer API key. Composer routes each task to the best model by quality, latency, and cost, so you are never locked into a single provider.",
      },
      {
        question: "How many tokens do I get, and are there limits?",
        answer:
          "The token quota you get is the same as what Cursor gives you in one month. But there is no weekly limit and no 5-hour limit — only a monthly limit, so you can use your quota however your work demands.",
      },
      {
        question: "Do I still need a foreign card or a Cursor subscription?",
        answer:
          "No. Everything is billed in DZD with CCP or Baridi Mob. You get the execution layer and the models behind it; connect your Composer key to Cursor once and work.",
      },
      ACTIVATION_FAQ,
      GUARANTEE_FAQ,
      NO_DATA_STORAGE_FAQ,
    ],
  }),
  composerToolService({
    id: "composer-claude-code",
    slug: "composer-claude-code",
    tool: "Claude Code",
    logo: "/Compatible/claude-code.webp",
    shortTagline: "Agentic coding in your terminal, without a foreign card.",
    seoTitle: "Composer with Claude Code | Claude API in Algeria | Hawiyat",
    seoDescription:
      "Use Claude Code in Algeria without a foreign card: Anthropic models via one Composer API key, the same kind of quota as Claude Max (around 1.8B tokens) with no 5-hour or weekly caps. From 6,000 DA/month.",
    seoKeywords: [
      "composer with claude code",
      "claude code algeria",
      "claude code without foreign card",
      "claude api algeria",
      "claude code dzd",
      "claude max algeria",
      "ai coding terminal algeria",
    ],
    whatIs:
      "Composer with Claude Code is the Hawiyat execution layer wired for Claude Code: one API key that gives your terminal agentic coding Anthropic models, plus OpenAI GPT, Gemini, and open models, through Composer. You keep using Claude Code exactly as you do today — the layer handles routing, fallbacks, context, and evaluation. Billed in DZD, paid with CCP or Baridi Mob.",
    whyChoose:
      "Anthropic's own billing requires a foreign card, and Claude Max-style plans carry 5-hour and weekly caps. With Composer with Claude Code, you get the same kind of quota — around 1.8 billion tokens (input and output combined), the ballpark of a Claude Max subscription — but with no 5-hour cap and no weekly cap, only a monthly limit. And with your API key, Hawiyat is responsible: no bans, no account freezes.",
    howItWorks:
      "Order the plan (Pro 6,000 / MAX 5X 15,000 / MAX 20X 30,000 DA/month) and pay with CCP or Baridi Mob. We activate your account with your API key just once. Point Claude Code at the Composer endpoint like any OpenAI-compatible API, and every task is routed to the best model with fallbacks and per-run evaluation, billed transparently in DZD.",
    faq: [
      {
        question: "Is this an official Claude or Anthropic subscription?",
        answer:
          "No. Hawiyat does not sell Claude Code or Claude subscriptions. You buy the API key and connect the tools yourself; Composer is the infrastructure between you and the models. Claude is one of the model routes behind your key.",
      },
      {
        question: "How many tokens do I get, and are there limits?",
        answer:
          "The quota is what the plan really gives you: on the MAX tier that is around 1.8 billion tokens (input and output combined), the same ballpark as a Claude Max subscription — but with no 5-hour cap and no weekly cap, only the monthly limit.",
      },
      ACTIVATION_FAQ,
      GUARANTEE_FAQ,
      NO_DATA_STORAGE_FAQ,
    ],
  }),
  composerToolService({
    id: "composer-codex",
    slug: "composer-codex",
    tool: "Codex",
    logo: "/Compatible/codex.webp",
    shortTagline: "OpenAI's coding agent, routed through Composer in DZD.",
    seoTitle: "Composer with Codex | OpenAI Codex in Algeria | Hawiyat",
    seoDescription:
      "Use OpenAI Codex in Algeria through one Composer API key: OpenAI, Anthropic, and Gemini models, the same monthly token quota as Codex but no weekly caps. From 6,000 DA/month, CCP or Baridi Mob.",
    seoKeywords: [
      "composer with codex",
      "openai codex algeria",
      "codex without foreign card",
      "codex api algeria",
      "codex dzd",
      "ai coding agent algeria",
    ],
    whatIs:
      "Composer with Codex is the Hawiyat execution layer wired for Codex, OpenAI's coding agent: one API key that brings OpenAI models, plus Anthropic Claude and Gemini, into your Codex workflows through Composer. Routing, fallbacks, context, and evaluation are handled by the layer, and everything is billed in DZD with CCP or Baridi Mob.",
    whyChoose:
      "Codex plans bill in dollars and carry usage limits. With Composer with Codex, the token quota you get is the same as what Codex gives you in one month — but there is no weekly limit and no 5-hour limit, only a monthly limit. You also get Anthropic and Gemini as fallback routes, so your agent keeps working even when one provider is down.",
    howItWorks:
      "Order the plan (Pro 6,000 / MAX 5X 15,000 / MAX 20X 30,000 DA/month), pay with CCP or Baridi Mob, and we activate your account with your API key just once. Connect Codex to the Composer endpoint and run: every task is routed to the best model with fallbacks and per-run evaluation, billed transparently in DZD.",
    faq: [
      {
        question: "What models do I get with Composer with Codex?",
        answer:
          "OpenAI models first, with Anthropic Claude and Gemini as automatic fallback routes behind the same key. Composer picks the best model per task by quality, latency, and cost.",
      },
      {
        question: "How many tokens do I get, and are there limits?",
        answer:
          "The token quota you get is the same as what Codex gives you in one month — but with no weekly limit and no 5-hour limit, only a monthly limit, so your agent can work at your pace.",
      },
      ACTIVATION_FAQ,
      GUARANTEE_FAQ,
      NO_DATA_STORAGE_FAQ,
    ],
  }),
  composerToolService({
    id: "composer-antigravity",
    slug: "composer-antigravity",
    tool: "Antigravity",
    logo: "/Compatible/antigravity.webp",
    shortTagline: "Google's agentic coding workspace, billed in dinars.",
    seoTitle: "Composer with Antigravity | Antigravity API in Algeria | Hawiyat",
    seoDescription:
      "Use Google Antigravity in Algeria through one Composer API key: Gemini, Anthropic, and OpenAI models, the same monthly token quota as Antigravity but no weekly caps. From 6,000 DA/month.",
    seoKeywords: [
      "composer with antigravity",
      "google antigravity algeria",
      "antigravity without foreign card",
      "antigravity api algeria",
      "gemini api algeria",
      "antigravity dzd",
    ],
    whatIs:
      "Composer with Antigravity is the Hawiyat execution layer wired for Antigravity, Google's agentic coding workspace: one API key that brings Gemini, plus Anthropic Claude and OpenAI GPT, into your Antigravity workflows through Composer. The layer handles routing, fallbacks, context, and evaluation, and everything is billed in DZD with CCP or Baridi Mob.",
    whyChoose:
      "Antigravity plans bill in foreign currency and carry usage limits. With Composer with Antigravity, the token quota you get is the same as what Antigravity gives you in one month — but there is no weekly limit and no 5-hour limit, only a monthly limit. Anthropic and OpenAI routes sit behind Gemini as fallbacks, so your workspace never stalls.",
    howItWorks:
      "Order the plan (Pro 6,000 / MAX 5X 15,000 / MAX 20X 30,000 DA/month), pay with CCP or Baridi Mob, and we activate your account with your API key just once. Connect Antigravity to the Composer endpoint and run: every task is routed to the best model with fallbacks and per-run evaluation, billed transparently in DZD.",
    faq: [
      {
        question: "What models do I get with Composer with Antigravity?",
        answer:
          "Gemini models first, with Anthropic Claude and OpenAI GPT as automatic fallback routes behind the same key. Composer picks the best model per task by quality, latency, and cost.",
      },
      {
        question: "How many tokens do I get, and are there limits?",
        answer:
          "The token quota you get is the same as what Antigravity gives you in one month — but with no weekly limit and no 5-hour limit, only a monthly limit.",
      },
      ACTIVATION_FAQ,
      GUARANTEE_FAQ,
      NO_DATA_STORAGE_FAQ,
    ],
  }),
  composerToolService({
    id: "composer-copilot",
    slug: "composer-copilot",
    tool: "GitHub Copilot",
    logo: "/Compatible/github-copilot.svg",
    shortTagline: "Your pair programmer, with every task evaluated by Composer.",
    seoTitle: "Composer with GitHub Copilot | Copilot API in Algeria | Hawiyat",
    seoDescription:
      "Use GitHub Copilot in Algeria with one Composer API key: Anthropic + OpenAI models in your IDE, the same monthly token quota as Copilot but no weekly caps. From 6,000 DA/month, CCP or Baridi Mob.",
    seoKeywords: [
      "composer with github copilot",
      "github copilot algeria",
      "copilot without foreign card",
      "copilot api algeria",
      "github copilot dzd",
      "ai pair programming algeria",
    ],
    whatIs:
      "Composer with GitHub Copilot is the Hawiyat execution layer wired for Copilot: one API key that brings Anthropic and OpenAI models, plus Gemini and open models, into your IDE workflows through Composer. Routing, fallbacks, context, and evaluation are handled by the layer, and everything is billed in DZD with CCP or Baridi Mob.",
    whyChoose:
      "Copilot plans bill in dollars and carry usage limits. With Composer with GitHub Copilot, the token quota you get is the same as what Copilot gives you in one month — but there is no weekly limit and no 5-hour limit, only a monthly limit. Anthropic, OpenAI, and Gemini routes sit behind one key with automatic fallbacks.",
    howItWorks:
      "Order the plan (Pro 6,000 / MAX 5X 15,000 / MAX 20X 30,000 DA/month), pay with CCP or Baridi Mob, and we activate your account with your API key just once. Point Copilot at the Composer endpoint, and every request is routed to the best model with fallbacks and per-run evaluation, billed transparently in DZD.",
    faq: [
      {
        question: "What models do I get with Composer with GitHub Copilot?",
        answer:
          "Anthropic and OpenAI models, plus Gemini and open models, through one Composer API key. Composer routes each task to the best model by quality, latency, and cost.",
      },
      {
        question: "How many tokens do I get, and are there limits?",
        answer:
          "The token quota you get is the same as what Copilot gives you in one month — but with no weekly limit and no 5-hour limit, only a monthly limit.",
      },
      ACTIVATION_FAQ,
      GUARANTEE_FAQ,
      NO_DATA_STORAGE_FAQ,
    ],
  }),
  {
    id: "hawiyat-cloud",
    slug: "hawiyat-cloud",
    name: "Hawiyat Cloud",
    shortDesc: "Managed cloud with databases and priority support",
    description: "A managed cloud runtime on our infrastructure: containers, VPS, or Kubernetes, with managed databases and priority support. Contact us to plan your deployment.",
    image: "/logo.svg",
    price: "",
    priceLabel: "By order",
    cta: "See plans in DZD",
    category: "Cloud Runtime",
    availability: "contact",
    useCases: "Websites, applications, full-stack projects, SaaS, and e-commerce sites that need managed containers, VPS, Kubernetes, or a managed database.",
    features: [
      "Managed containers",
      "VPS and Kubernetes options",
      "Managed database (PostgreSQL or MySQL)",
      "Free SSL certificate",
      "Automatic deployments from Git",
      "Monitoring and uptime tracking",
      "Backups",
      "Priority support",
    ],
    bulletPoints: [
      { icon: Server, text: "Managed Containers" },
      { icon: Shield, text: "Free SSL" },
      { icon: Clock, text: "Priority Support" },
    ],
    seo: {
      title: "Hawiyat Cloud by Order in Algeria | Managed Cloud Runtime",
      description: "Managed cloud by order in Algeria: containers, VPS, managed databases, priority support. Contact us to plan your deployment and get a quote in DZD.",
      keywords: [
        "managed cloud hosting algeria",
        "cloud hosting algeria",
        "container hosting algeria",
        "vps hosting algeria",
        "kubernetes hosting algeria",
        "managed hosting algeria",
        "managed containers algeria",
        "managed containers dz",
        "hosting with database algeria",
        "managed database hosting algeria",
        "full stack hosting algeria",
        "hosting for saas algeria",
        "priority support hosting algeria",
        "hebergement web algerie",
        "hebergement cloud algerie",
        "hebergement professionnel algerie",
        "cloud by order algeria",
        "app hosting algeria",
        "hosting for developers algeria",
      ],
    },
    details: {
      overview: "A managed cloud runtime on our own infrastructure with databases, containers, and priority support. Tell us what you need to run and we plan the right setup on containers, VPS, or Kubernetes, with managed databases, SSL, automatic deployments, monitoring, and backups. Every deployment is managed by our Algerian team and quoted in DZD.",
      whatYouGet: [
        "Managed containers, VPS, or Kubernetes sized to your needs",
        "Managed database (PostgreSQL or MySQL)",
        "Free SSL certificate for secure connections",
        "Automatic deployments from Git",
        "Priority support via WhatsApp",
        "Monitoring and uptime tracking",
        "Backups",
        "Custom domain support",
        "Support in Arabic, French, and English",
      ],
      idealFor: "Websites, applications, full-stack projects, SaaS, and e-commerce sites that need managed infrastructure, a managed database, or priority support.",
      technicalSpecs: [
        "Containers, VPS, or Kubernetes runtimes",
        "Node.js, Python, or static site support",
        "PostgreSQL or MySQL managed database",
        "Git-based deployments",
        "Custom domain with DNS management",
        "Automatic HTTPS with Let's Encrypt",
        "Resource monitoring",
        "Backups",
      ],
    },
    seoContent: {
      whatIs:
        "Hawiyat Cloud is a managed cloud runtime by order in Algeria, with databases, containers, and priority support. Instead of fixed plans, you tell the team what you need to run and Hawiyat plans the right deployment on its own infrastructure: containers, VPS, or Kubernetes, with a quote in DZD. Every deployment includes managed PostgreSQL or MySQL databases, free SSL certificates, automatic deployments from Git, monitoring, and backups. Priority support is available via WhatsApp. Node.js, Python, and static sites are all supported, and billing is in dinars with CCP or Baridi Mob. For full-stack applications, SaaS projects, and e-commerce sites that need a database and priority support, Hawiyat Cloud is planned with you and quoted in DZD.",
      whyChoose:
        "Hawiyat Cloud is a managed cloud runtime by order in Algeria, planned around what you need to run and quoted in DZD. You get containers, VPS, or Kubernetes on our own infrastructure, with managed PostgreSQL or MySQL databases, SSL, automatic deployments, monitoring, and backups handled by our team. Priority WhatsApp support comes in Arabic, French, and English. Unlike big international hosts that require foreign credit cards and charge in euros or dollars, Hawiyat accepts CCP and Baridi Mob and supports you from the same timezone. Your workloads run on production-tested infrastructure that powers 200+ clients, with no fixed tiers to outgrow: when your needs change, we size the deployment to match.",
      howItWorks:
        "Getting your workload live on Hawiyat Cloud takes three steps. First, contact the team on WhatsApp or email and describe what you need to run. Second, the team plans the right setup for you: containers, VPS, or Kubernetes, with the databases, resources, and services you need, and sends you a quote in DZD. Third, our team deploys your applications, provisions your managed PostgreSQL or MySQL database, connects your domains with free SSL, and keeps everything monitored with backups. Deployments are automatic from Git, so push and your changes go live. Priority support is available via WhatsApp, and billing is in dinars with CCP or Baridi Mob.",
    },
    faq: [
      {
        question: "What can I run on Hawiyat Cloud?",
        answer:
          "Websites, applications, full-stack projects, SaaS, and e-commerce sites. Hawiyat plans the deployment on containers, VPS, or Kubernetes with the resources and services you need, including managed databases when required.",
      },
      {
        question: "How does Hawiyat Cloud work with databases?",
        answer:
          "Hawiyat plans your deployment around your needs and can include managed PostgreSQL or MySQL databases, provisioned and maintained by our team, with backups included.",
      },
      {
        question: "How much does Hawiyat Cloud cost?",
        answer:
          "By order. Tell us what you need to run and the team plans the deployment and sends you a quote in DZD, so you only pay for what you actually need.",
      },
      {
        question: "Do I need a foreign credit card to pay for Hawiyat Cloud?",
        answer:
          "No. Hawiyat Cloud is billed in Algerian dinars and can be paid with CCP, Baridi Mob, or USD.",
      },
      {
        question: "How do deployments work on Hawiyat Cloud?",
        answer:
          "Deployments are automatic from Git. Connect your repository, and every push deploys your changes. You also get a free SSL certificate and custom domain support.",
      },
      {
        question: "Can I run a SaaS or e-commerce site on Hawiyat Cloud?",
        answer:
          "Yes. Hawiyat Cloud supports full-stack apps, SaaS projects, and e-commerce sites that need a managed database, custom domains, automatic HTTPS, and priority support.",
      },
    ],
  },
  {
    id: "evolution-api",
    slug: "evolution-api",
    name: "Evolution API",
    shortDesc: "WhatsApp Business API solution",
    description: "WhatsApp API infrastructure for messaging and automation. We show you how to connect it properly.",
    image: "/logos/evolutionapi_evolutionapi.png",
    price: "7000",
    priceLabel: "DA/year",
    cta: "See plans in DZD",
    category: "Managed Systems",
    useCases: "WhatsApp chatbots, order notifications, customer support automation, bulk messaging.",
    features: [
      "Official Business API",
      "Multi-channel support",
      "Webhook integrations",
      "Message queuing system",
      "Rate limiting & throttling",
    ],
    bulletPoints: [
      { icon: MessageSquare, text: "Multi-Channel" },
      { icon: Bot, text: "Chatbot Ready" },
      { icon: Shield, text: "Fully Managed" },
    ],
    seo: {
      title: "WhatsApp Business API in Algeria | Evolution API",
      description: "WhatsApp Business API hosting in Algeria. Build chatbots, send notifications, automate customer support. 7000 DA/year.",
      keywords: [
        "whatsapp api algeria",
        "whatsapp business api algeria",
        "whatsapp chatbot algeria",
        "evolution api algeria",
        "whatsapp automation algeria",
        "whatsapp api dz",
        "whatsapp business algerie",
        "whatsapp bot algeria",
        "whatsapp integration algeria",
        "whatsapp messaging api algeria",
      ],
    },
    details: {
      overview: "Official WhatsApp Business API instance for Algerian businesses. Send and receive messages programmatically to build chatbots, automate customer support, and scale your WhatsApp communications.",
      whatYouGet: [
        "Official WhatsApp Business API access",
        "Multi-channel message support",
        "Webhook integrations for real-time messaging",
        "Message queuing system for reliability",
        "Rate limiting and throttling to prevent bans",
        "Fully managed infrastructure",
        "Priority support via WhatsApp",
      ],
      idealFor: "Businesses building WhatsApp chatbots, sending order notifications, automating customer support, and running bulk messaging campaigns.",
      technicalSpecs: [
        "Official Meta Business API",
        "RESTful API for message sending/receiving",
        "Webhook support for incoming messages",
        "Message templates for approved communications",
        "Media support (images, documents, videos)",
        "Message status tracking (sent, delivered, read)",
      ],
    },
    plans: [
      {
        name: "WhatsApp",
        price: "7,000",
        priceLabel: "DA/year",
        tagline: "One WhatsApp number, fully managed.",
        features: [
          "One instance of Evolution API, one WhatsApp number",
          "Messaging and automation features",
          "Support by email (Gmail)",
        ],
      },
      {
        name: "Startup",
        price: "30,000",
        priceLabel: "DA/year",
        tagline: "Best option for small companies and startups.",
        features: [
          "Multiple WhatsApp numbers, one instance (multi-number lives here, not on the basic plan)",
          "99% uptime guarantee",
          "Support by email (Gmail)",
          "Onboarding: we show you how to connect Evolution API with WhatsApp",
        ],
      },
      {
        name: "Enterprise",
        price: "80,000",
        priceLabel: "DA/year",
        tagline: "Built for scale.",
        features: [
          "Unlimited numbers (fair use)",
          "Priority infrastructure",
          "99.9% uptime guarantee, we compensate if we miss it",
          "Support by WhatsApp (the only tier with WhatsApp support)",
          "Onboarding: we show you how to connect Evolution API with WhatsApp",
        ],
      },
    ],
    fairUse: "Evolution WhatsApp plan: one instance, one number. The basic plan is one instance with one WhatsApp number. Multiple WhatsApp numbers in a single instance belongs to the Startup plan and up. If a basic-plan client runs several numbers, we will ask them to move up to Startup.",
    disclaimer: "Evolution API is a powerful third-party tool. It is not an official WhatsApp or Meta product. It works by connecting your WhatsApp number to our infrastructure, which lets you automate messages the way you want. We set everything up carefully and follow best practices, so your number works smoothly. Because it is a third-party tool, we are not responsible for any issues that come from it or from WhatsApp itself. Our responsibility covers what we control: hosting, setup, and support. Our advice: Use it for what it is built for customer service, order updates, and notifications your customers actually want. Start normally, let your number get used to the traffic, and grow from there. We guide you at every step.",
    seoContent: {
      whatIs:
        "The Evolution API in Algeria is a WhatsApp Business API solution that lets businesses send and receive messages programmatically to build chatbots, automate customer support, and scale WhatsApp communications. Hawiyat hosts fully managed Evolution API instances with official Meta Business API access, webhook integrations for real-time messaging, message queuing for reliability, and rate limiting to prevent bans. The WhatsApp plan costs 7,000 DA/year and includes one instance with one WhatsApp number. The Startup plan at 30,000 DA/year supports multiple WhatsApp numbers in a single instance, and the Enterprise plan at 80,000 DA/year offers unlimited numbers under fair use, priority infrastructure, and WhatsApp support. Every plan includes media support, message status tracking, and onboarding guidance so you can connect Evolution API with WhatsApp properly and safely.",
      whyChoose:
        "Hawiyat is the leading provider of the WhatsApp Business API and Evolution API hosting in Algeria. We are a local team based in Algiers, so you get support in Arabic, French, and English in the same timezone not a foreign ticket system. All pricing is in Algerian dinars, starting at 7,000 DA/year for the WhatsApp plan. We follow best practices for WhatsApp automation: rate limiting, throttling, and message templates that protect your number from being banned. Our onboarding service shows you exactly how to connect Evolution API with WhatsApp, and our team has deployed this infrastructure for 200+ clients. Whether you need a WhatsApp chatbot, order notifications, or customer support automation, Hawiyat gives you production-tested messaging infrastructure with local, reachable support.",
      howItWorks:
        "Getting started with the Evolution API from Hawiyat takes three steps. First, choose your plan: WhatsApp (7,000 DA/year, one instance with one WhatsApp number), Startup (30,000 DA/year, multiple numbers in one instance), or Enterprise (80,000 DA/year, unlimited numbers under fair use with priority infrastructure). Second, place your order with your preferred payment method CCP, Baridi Mob, or USD and our team deploys your Evolution API instance within 24 hours. Third, we guide you through onboarding: connecting your WhatsApp number, setting up webhooks, configuring message templates, and building your first chatbot or automation flow. You get a RESTful API for sending and receiving messages, media support, and message status tracking. We manage the infrastructure, updates, and monitoring so you can focus on your messaging. Support is available by email on all plans and by WhatsApp on the Enterprise plan.",
    },
    faq: [
      {
        question: "What is the difference between the Evolution API WhatsApp, Startup, and Enterprise plans?",
        answer:
          "The WhatsApp plan (7,000 DA/year) includes one instance with one WhatsApp number, ideal for solo developers. Startup (30,000 DA/year) supports multiple WhatsApp numbers in a single instance for growing companies. Enterprise (80,000 DA/year) offers unlimited numbers under fair use, priority infrastructure, a 99.9% uptime SLA, and WhatsApp support.",
      },
      {
        question: "Is the Evolution API an official WhatsApp or Meta product?",
        answer:
          "No. The Evolution API is a powerful third-party tool that connects your WhatsApp number to our infrastructure using official Meta Business API access. We set everything up carefully and follow best practices, but we are not responsible for issues caused by the tool itself or by WhatsApp.",
      },
      {
        question: "How do I connect my WhatsApp number to the Evolution API?",
        answer:
          "After you order, our team deploys your instance and walks you through onboarding: linking your WhatsApp number, configuring webhooks and message templates, and testing your first automation. Every plan includes this onboarding guidance so your number stays safe and compliant.",
      },
    ],
  },
  {
    id: "composer-max5x",
    slug: "composer-max5x",
    name: "Hawiyat AI Composer MAX 5X",
    shortDesc: "5X base execution capacity, more parallel runs and tasks",
    description:
      "Five times the base execution capacity of Pro. Run more tasks in parallel, with the same routing, context, fallbacks, and evaluation. No single model is ever the bottleneck.",
    image: "/services/hawiyat%20composer.png",
    price: "15000",
    priceLabel: "DA/month",
    cta: "See plans in DZD",
    category: "AI Infrastructure",
    tag: "Max 5X",
    useCases: "Professional developers, startups, and small teams shipping daily that need more parallel runs and higher task throughput.",
    features: [
      "5X base execution capacity, more parallel runs and tasks",
      "Model-agnostic routing per task",
      "Advanced semantic caching (vector-based)",
      "Automatic model fallbacks on failure",
      "Evaluation and quality score for every run",
      "Billed in DZD with a transparent per-task cost",
    ],
    bulletPoints: [
      { icon: Zap, text: "5X Capacity" },
      { icon: Shield, text: "More Parallel Runs" },
      { icon: Clock, text: "Evaluate Every Run" },
    ],
    seo: {
      title: "Hawiyat AI Composer MAX 5X | 5X Capacity | Algeria",
      description:
        "5X base execution capacity on the Hawiyat AI Composer execution layer with more parallel runs, routing, fallbacks, and evaluation. 15,000 DA/month.",
      keywords: [
        "ai execution capacity algeria",
        "hawiyat ai composer max",
        "ai composer max 5x algeria",
        "ai routing algeria",
        "ai infrastructure algeria team",
        "ai execution platform algeria",
        "parallel ai tasks algeria",
        "model agnostic ai algeria",
        "ai task automation algeria startup",
        "ai developer tools algeria team",
      ],
    },
    details: {
      overview:
        "Hawiyat AI Composer MAX 5X multiplies the base execution capacity of Pro by five, more parallel runs and tasks, with the same routing, context, fallbacks, and evaluation. Built for teams shipping daily.",
      whatYouGet: [
        "5X base execution capacity, more parallel runs and tasks",
        "Route every task to the best model by quality, latency, and cost",
        "Advanced vector-based semantic caching",
        "Automatic fallback cascades across models",
        "Evaluation log with a quality score for every run",
        "Priority support via WhatsApp",
      ],
      idealFor: "Professional developers, startups, and small teams shipping daily that need consistent, high-throughput execution on the layer.",
      technicalSpecs: [
        "Model routes: GPT, Claude, Gemini, and open models",
        "Vector-based semantic caching",
        "Automatic fallback cascades",
        "Per-run evaluation and logging",
        "IDE integrations (VS Code, JetBrains)",
        "API access for custom workflows",
        "Usage analytics and reporting in DZD",
      ],
    },
    seoContent: {
      whatIs:
        "Hawiyat AI Composer MAX 5X is the five-times-capacity tier of the Hawiyat AI Composer execution layer in Algeria. At 15,000 DA/month, it gives professional developers, startups, and small teams five times the base execution capacity of Pro, meaning more parallel runs and tasks at the same time. Composer sits between frontier AI models (GPT, Claude, Gemini, open models) and your systems, routing each task to the best model by quality, latency, and cost, carrying your context, falling back when a model is slow or down, and evaluating every result. Advanced vector-based semantic caching cuts repeat spend, and every run is logged with a quality score and a transparent per-task cost in dinars. Models are routes, not SKUs, so the layer outlives any single provider.",
      whyChoose:
        "Teams in Algeria choose Hawiyat AI Composer MAX 5X when Pro's capacity is not enough. Five times the base execution capacity means more parallel runs and tasks, so a shipping team never queues behind a single model. Composer handles the routing, context, fallbacks, and evaluation, so you ship the business outcome, not the plumbing. Each run is evaluated and costed in dinars, with no daily or weekly caps on the layer. You pay 15,000 DA/month with CCP or Baridi Mob, and support comes from a local team in Arabic, French, and English via WhatsApp. When a model degrades or a provider changes pricing, MAX 5X falls back and keeps executing. For startups shipping daily, the capacity is the ceiling you remove.",
      howItWorks:
        "Getting started with Hawiyat AI Composer MAX 5X takes three steps. First, order the plan at 15,000 DA/month with CCP, Baridi Mob, or USD. Second, our team activates your workspace within 24 hours. Third, connect your tools, IDE integrations for VS Code and JetBrains or the API for custom workflows, and run your first task. Composer executes each task through a run: plan, route to the best model, execute with your context, evaluate the result, and log the cost in DZD. With 5X base execution capacity, your team runs more tasks in parallel, and vector-based semantic caching makes repeated work instant. Every run leaves an evaluation log you can audit, and usage analytics show consumption in dinars. Our team monitors the service 24/7, and priority support is available via WhatsApp.",
    },
    faq: [
      {
        question: "How is MAX 5X different from Pro?",
        answer:
          "MAX 5X gives you five times the base execution capacity of Pro, more parallel runs and tasks at the same time. Pro is 6,000 DA/month for solo builders; MAX 5X is 15,000 DA/month for teams shipping daily. Routing, context, fallbacks, and evaluation are the same layer.",
      },
      {
        question: "Are there usage limits on MAX 5X?",
        answer:
          "No daily or weekly caps on the layer. MAX 5X is five times the base execution capacity of Pro, measured in parallel runs and tasks, not in model credits.",
      },
      {
        question: "Who is MAX 5X designed for?",
        answer:
          "Professional developers, startups, and small teams shipping daily that need consistent high-throughput execution. It includes priority WhatsApp support and usage analytics in DZD.",
      },
    ],
  },
  {
    id: "composer-max20x",
    slug: "composer-max20x",
    name: "Hawiyat AI Composer MAX 20X",
    shortDesc: "20X base execution capacity for teams and agencies",
    description:
      "Twenty times the base execution capacity of Pro. Maximum parallel throughput with hybrid data compliance and multi-agent traffic resolution, built for teams running AI at scale.",
    image: "/services/hawiyat%20composer.png",
    price: "30000",
    priceLabel: "DA/month",
    cta: "See plans in DZD",
    category: "AI Infrastructure",
    tag: "Max 20X",
    useCases: "Agencies, engineering teams, and power users who need maximum parallel throughput on the execution layer with enterprise-grade compliance.",
    features: [
      "Everything in MAX 5X",
      "20× the base execution capacity of Pro, maximum parallel throughput",
      "Multi-agent traffic resolution for heavy concurrent load",
      "Hybrid data compliance for strict enterprise requirements",
      "Dedicated account manager who knows your runs",
      "Advanced usage analytics in DZD",
    ],
    bulletPoints: [
      { icon: Zap, text: "20X Capacity" },
      { icon: Shield, text: "Hybrid Compliance" },
      { icon: Clock, text: "Evaluate Every Run" },
    ],
    seo: {
      title: "Hawiyat AI Composer MAX 20X | 20X Capacity | Algeria",
      description:
        "20X base execution capacity on the Hawiyat AI Composer execution layer. Parallel throughput, hybrid compliance, evaluation. 30,000 DA/month.",
      keywords: [
        "ai execution capacity algeria enterprise",
        "hawiyat ai composer enterprise",
        "ai composer max 20x algeria",
        "ai routing algeria",
        "ai infrastructure algeria agency",
        "ai execution platform algeria team",
        "parallel ai tasks algeria enterprise",
        "model agnostic ai algeria",
        "enterprise ai execution algeria",
        "ai developer tools algeria agency",
      ],
    },
    details: {
      overview:
        "Hawiyat AI Composer MAX 20X gives teams twenty times the base execution capacity of Pro, with hybrid data compliance and multi-agent traffic resolution. Maximum parallel throughput for agencies and engineering teams.",
      whatYouGet: [
        "Everything in MAX 5X",
        "20× the base execution capacity of Pro, maximum parallel throughput",
        "Multi-agent traffic resolution for heavy concurrent load",
        "Hybrid data compliance for strict enterprise requirements",
        "Dedicated account manager who knows your runs",
        "Advanced usage analytics in DZD",
      ],
      idealFor: "Agencies, engineering teams, and power users who run many AI tasks in parallel and need enterprise-grade compliance and traffic handling.",
      technicalSpecs: [
        "Model routes: GPT, Claude, Gemini, and open models",
        "Exact-match and vector-based semantic caching",
        "Automatic fallback cascades",
        "Hybrid data compliance",
        "Multi-agent traffic resolution",
        "Per-run evaluation and logging",
        "IDE integrations (VS Code, JetBrains)",
        "API access for custom workflows",
        "Advanced usage analytics and reporting in DZD",
        "Dedicated account manager",
      ],
    },
    seoContent: {
      whatIs:
        "Hawiyat AI Composer MAX 20X is the highest-capacity tier of the Hawiyat AI Composer execution layer in Algeria. At 30,000 DA/month, it gives agencies, engineering teams, and power users twenty times the base execution capacity of Pro, maximum parallel runs and tasks. Composer routes each task to the best model by quality, latency, and cost, carries your context, falls back automatically when a model is slow or down, and evaluates every result. Exact-match and vector-based semantic caching keep repeat work instant, hybrid data compliance keeps enterprise deployments compliant, and multi-agent traffic resolution keeps performance stable under heavy concurrent load. Every run is logged with a quality score and a transparent per-task cost in dinars. Models are routes, not SKUs, so the layer outlives any single provider.",
      whyChoose:
        "Agencies and engineering teams choose Hawiyat AI Composer MAX 20X for maximum parallel throughput on the execution layer. Twenty times the base execution capacity of Pro means dozens of runs at once without queueing behind a model. Composer handles routing, context, fallbacks, and evaluation, so client deliverables are the outcome, not the plumbing. Hybrid data compliance keeps it enterprise-ready for customers with strict requirements, and multi-agent traffic resolution keeps performance stable under heavy load. Every run is evaluated and costed in dinars, with no daily or weekly caps on the layer. You pay 30,000 DA/month with CCP or Baridi Mob, and a dedicated account manager plus priority WhatsApp support come with the plan. For teams that live in the layer, MAX 20X removes every ceiling on throughput.",
      howItWorks:
        "Getting started with Hawiyat AI Composer MAX 20X takes three steps. First, order the plan at 30,000 DA/month with CCP, Baridi Mob, or USD. Second, our team activates your workspace and assigns your account manager within 24 hours. Third, connect your tools, IDE integrations for VS Code and JetBrains or the API for custom workflows, and run your first tasks. Composer executes each task through a run: plan, route to the best model, execute with your context, evaluate the result, and log the cost in DZD. With 20X base execution capacity, teams run many tasks in parallel; exact-match and semantic caching make repeated work instant, and multi-agent traffic resolution keeps everything stable. Advanced analytics show consumption in dinars. Our team monitors the service 24/7, and priority support is available via WhatsApp.",
    },
    faq: [
      {
        question: "What does 20X execution capacity mean in practice?",
        answer:
          "MAX 20X gives you twenty times the base execution capacity of Pro, maximum parallel runs and tasks on the layer. It is measured in runs and tasks, not model credits, and it is enough for teams running dozens of concurrent workloads.",
      },
      {
        question: "Does MAX 20X meet enterprise compliance needs?",
        answer:
          "Yes. MAX 20X includes hybrid data compliance, with exact-match and vector-based semantic caching and multi-agent traffic resolution for enterprise-grade deployments.",
      },
      {
        question: "Who is MAX 20X designed for?",
        answer:
          "Agencies, engineering teams, and power users who need maximum parallel throughput. It includes a dedicated account manager, advanced analytics in DZD, and priority WhatsApp support.",
      },
    ],
  },
]

/**
 * Composer MAX tiers fold into the Composer Pro card and detail page, so they
 * stay out of the catalog, static generation, and sitemap. Composer Pro is sold
 * on /services like any other tiered service. Home pricing reads all three
 * Composer entries straight from the `services` array by id.
 */
export const EXCLUDED_SERVICE_IDS: string[] = ["composer-max5x", "composer-max20x"]

export function getServiceBySlug(slug: string): Service | undefined {
  if (EXCLUDED_SERVICE_IDS.includes(slug)) return undefined
  return services.find((service) => service.slug === slug)
}

export function getComposerService(id: string) {
  const service = services.find((s) => s.id === id)
  if (!service) throw new Error(`Unknown service id: ${id}`)
  return service
}

export function getAllServiceSlugs(): string[] {
  return services
    .filter((service) => !EXCLUDED_SERVICE_IDS.includes(service.id))
    .map((service) => service.slug)
}
