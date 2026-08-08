import { Zap, Clock, Shield, Server, MessageSquare, Bot } from "lucide-react"

export interface ServicePlan {
  name: string
  price: string
  priceLabel: string
  tagline: string
  originalPrice?: string
  launchNote?: string
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
  useCases: string
  features: string[]
  bulletPoints: Array<{
    icon: any
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
    cta: "Get Started",
    category: "Managed Services",
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
      title: "n8n Hosting in Algeria | Managed Workflow Automation | Hawiyat",
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
        originalPrice: "15,000",
        launchNote: "Launch price until 31 August 2026. From 1 September: 15,000 DA/year. Lock in the old price now.",
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
  },
  {
    id: "composer-pro",
    slug: "composer-pro",
    name: "Hawiyat Composer + Claude Code",
    shortDesc: "2x credits|No daily or weekly limits, deliver projects in time",
    description: "2x Claude Pro credits with Hawiyat Composer caching. No daily or weekly limits ever.",
    images: ["/services/hawiyat%20composer.png", "/services/claude-code.png"],
    price: "6000",
    priceLabel: "DA/month",
    cta: "Get Started",
    category: "AI Subscription",
    tag: "Pro",
    useCases: "Individual devs, freelancers, and small projects. Reliable AI coding help without worrying about hitting limits.",
    features: [
      "2x Claude Pro credit quota",
      "No daily or weekly limits",
      "Hawiyat Composer caching layer",
      "Context-aware suggestions",
      "Automated code reviews",
      "Multi-language support",
    ],
    bulletPoints: [
      { icon: Zap, text: "2x Credits" },
      { icon: Shield, text: "No Daily/Weekly Caps" },
      { icon: Clock, text: "LLM Optimization" },
    ],
    seo: {
      title: "Hawiyat Composer Pro | 2x Claude Credits | No Limits | Algeria",
      description: "Get 2x Claude Pro credits with Hawiyat Composer. No daily or weekly limits. AI coding assistant for Algerian developers. 6000 DA/month.",
      keywords: [
        "claude code algeria",
        "hawiyat composer",
        "claude pro credits algeria",
        "ai coding assistant algeria",
        "claude no limits",
        "ai coding dz",
        "claude subscription algerie",
        "ai developer tools algeria",
        "claude code subscription",
        "ai coding help algeria",
      ],
    },
    details: {
      overview: "Hawiyat Composer Pro doubles your Claude Pro credit quota with our intelligent caching layer. No more hitting daily or weekly limits. Get consistent AI coding assistance when you need it.",
      whatYouGet: [
        "2x Claude Pro credit quota every month",
        "Zero daily or weekly usage caps",
        "Hawiyat Composer semantic caching for faster responses",
        "Context-aware code suggestions",
        "Automated code reviews and refactoring",
        "Support for all major programming languages",
        "Priority support via WhatsApp",
      ],
      idealFor: "Individual developers, freelancers, and small projects that need reliable AI coding assistance without usage limits.",
      technicalSpecs: [
        "Claude Sonnet and Opus models",
        "Semantic caching with vector-based matching",
        "Smart request routing for optimal performance",
        "Multi-language support (Python, JavaScript, TypeScript, etc.)",
        "IDE integrations (VS Code, JetBrains)",
        "API access for custom workflows",
      ],
    },
  },
  {
    id: "hosting-basic",
    slug: "hosting-basic",
    name: "Hosting Basic",
    shortDesc: "Single app hosting with basic resources",
    description: "Simple hosting for a single app. Personal projects, portfolios, small websites. SSL, auto-deploy, and basic monitoring included.",
    image: "/logo.svg",
    price: "1000",
    priceLabel: "DA/month",
    cta: "Get Started",
    category: "Hosting",
    tag: "Starter",
    useCases: "Personal portfolios, small websites, demo projects, single-page applications.",
    features: [
      "1 application",
      "Free SSL certificate",
      "Automatic deployments",
      "Basic monitoring",
      "512MB RAM",
    ],
    bulletPoints: [
      { icon: Server, text: "1 App" },
      { icon: Shield, text: "Free SSL" },
      { icon: Zap, text: "Auto Deploy" },
    ],
    seo: {
      title: "Basic Web Hosting in Algeria | 1000 DA/month | Hawiyat",
      description: "Affordable web hosting in Algeria for personal projects and portfolios. Free SSL, auto-deploy, 512MB RAM. 1000 DA/month.",
      keywords: [
        "web hosting algeria",
        "cheap hosting algeria",
        "basic hosting dz",
        "hebergement web algerie",
        "hebergement pas cher algerie",
        "hosting for developers algeria",
        "app hosting algeria",
        "hebergement site web algerie",
        "affordable hosting dz",
        "personal project hosting algeria",
      ],
    },
    details: {
      overview: "Simple, affordable hosting for a single application. Perfect for personal projects, portfolios, and small websites. We handle the infrastructure so you can focus on building.",
      whatYouGet: [
        "1 application deployment",
        "Free SSL certificate for secure connections",
        "Automatic deployments from Git",
        "Basic monitoring and uptime tracking",
        "512MB RAM for your application",
        "Custom domain support",
        "Email support",
      ],
      idealFor: "Personal portfolios, small websites, demo projects, and single-page applications.",
      technicalSpecs: [
        "Node.js, Python, or static site support",
        "Git-based deployments",
        "Custom domain with DNS management",
        "Automatic HTTPS with Let's Encrypt",
        "Basic resource monitoring",
        "Weekly backups",
      ],
    },
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
    cta: "Get Started",
    category: "Managed Services",
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
      title: "WhatsApp Business API in Algeria | Evolution API | Hawiyat",
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
        originalPrice: "14,000",
        launchNote: "Launch price until 31 August 2026. From 1 September: 14,000 DA/year. Lock in the old price now.",
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
    disclaimer: "Evolution API is a powerful third-party tool. It is not an official WhatsApp or Meta product. It works by connecting your WhatsApp number to our infrastructure, which lets you automate messages the way you want. We set everything up carefully and follow best practices, so your number works smoothly. Because it is a third-party tool, we are not responsible for any issues that come from it or from WhatsApp itself. Our responsibility covers what we control: hosting, setup, and support. Our advice: Use it for what it is built for - customer service, order updates, and notifications your customers actually want. Start normally, let your number get used to the traffic, and grow from there. We guide you at every step.",
  },
  {
    id: "composer-max5x",
    slug: "composer-max5x",
    name: "Hawiyat Composer + Claude Code",
    shortDesc: "5x credits|No daily or weekly limits, deliver projects in time",
    description: "5x Claude capacity + semantic caching & smart routing. No daily or weekly limits ever.",
    images: ["/services/hawiyat%20composer.png", "/services/claude-code.png"],
    price: "15000",
    originalPrice: "20000",
    priceLabel: "DA/month",
    cta: "Get Started",
    category: "AI Subscription",
    tag: "Max 5X",
    useCases: "Professional developers, startups, and small teams shipping daily and needing consistent high-volume AI access.",
    features: [
      "5x Claude Pro credit quota",
      "No daily or weekly limits",
      "Semantic caching (vector-based)",
      "Smart provider routing",
      "Context-aware suggestions",
      "Automated code reviews",
      "Multi-language support",
    ],
    bulletPoints: [
      { icon: Zap, text: "5x Credits" },
      { icon: Shield, text: "No Daily/Weekly Caps" },
      { icon: Clock, text: "LLM Optimization" },
    ],
    seo: {
      title: "Hawiyat Composer Max 5X | 5x Claude Credits | No Limits | Algeria",
      description: "Get 5x Claude Pro credits with semantic caching and smart routing. No daily or weekly limits. For professional developers in Algeria. 15000 DA/month.",
      keywords: [
        "claude code 5x algeria",
        "hawiyat composer max",
        "claude pro 5x credits algeria",
        "ai coding assistant algeria",
        "claude no limits 5x",
        "ai coding dz professional",
        "claude subscription algerie pro",
        "ai developer tools algeria team",
        "claude code high volume",
        "ai coding help algeria startup",
      ],
    },
    details: {
      overview: "Hawiyat Composer Max 5X gives you 5x Claude Pro credits with advanced semantic caching and smart provider routing. Built for professional developers and small teams shipping daily.",
      whatYouGet: [
        "5x Claude Pro credit quota every month",
        "Zero daily or weekly usage caps",
        "Advanced semantic caching with vector-based matching",
        "Smart provider routing for optimal performance",
        "Context-aware code suggestions",
        "Automated code reviews and refactoring",
        "Support for all major programming languages",
        "Priority support via WhatsApp",
      ],
      idealFor: "Professional developers, startups, and small teams shipping daily and needing consistent high-volume AI access.",
      technicalSpecs: [
        "Claude Sonnet and Opus models",
        "Vector-based semantic caching",
        "Smart request routing across providers",
        "Multi-language support (Python, JavaScript, TypeScript, etc.)",
        "IDE integrations (VS Code, JetBrains)",
        "API access for custom workflows",
        "Usage analytics and reporting",
      ],
    },
  },
  {
    id: "composer-max20x",
    slug: "composer-max20x",
    name: "Hawiyat Composer + Claude Code",
    shortDesc: "20x credits|No daily or weekly limits, deliver projects in time",
    description: "20x Claude capacity + Fable & Opus level models, GDPR compliance. No daily or weekly limits ever.",
    images: ["/services/hawiyat%20composer.png", "/services/claude-code.png"],
    price: "30000",
    originalPrice: "40000",
    priceLabel: "DA/month",
    cta: "Get Started",
    category: "AI Subscription",
    tag: "Max 20X",
    useCases: "Agencies, engineering teams, and power users who need maximum AI throughput with enterprise-grade optimization.",
    features: [
      "20x Claude Pro credit quota",
      "No daily or weekly limits",
      "Exact-match + semantic caching",
      "Smart provider routing",
      "Hybrid data compliance",
      "Multi-agent traffic resolution",
      "Context-aware suggestions",
      "Automated code reviews",
      "Multi-language support",
      "Priority support",
    ],
    bulletPoints: [
      { icon: Zap, text: "20x Credits" },
      { icon: Clock, text: "No Daily/Weekly Caps" },
      { icon: Shield, text: "GDPR Compliance" },
    ],
    seo: {
      title: "Hawiyat Composer Max 20X | 20x Claude Credits | Enterprise | Algeria",
      description: "Get 20x Claude Pro credits with Fable & Opus models, GDPR compliance, and enterprise optimization. No limits. 30000 DA/month.",
      keywords: [
        "claude code 20x algeria",
        "hawiyat composer enterprise",
        "claude pro 20x credits algeria",
        "ai coding assistant algeria enterprise",
        "claude no limits 20x",
        "ai coding dz agency",
        "claude subscription algerie enterprise",
        "ai developer tools algeria team",
        "claude code high volume enterprise",
        "ai coding help algeria agency",
        "gdpr compliant ai algeria",
      ],
    },
    details: {
      overview: "Hawiyat Composer Max 20X provides 20x Claude Pro credits with access to Fable and Opus-level models, GDPR compliance, and enterprise-grade optimization. Maximum AI throughput for agencies and engineering teams.",
      whatYouGet: [
        "20x Claude Pro credit quota every month",
        "Zero daily or weekly usage caps",
        "Exact-match and semantic caching",
        "Smart provider routing across multiple models",
        "Hybrid data compliance (GDPR ready)",
        "Multi-agent traffic resolution",
        "Context-aware code suggestions",
        "Automated code reviews and refactoring",
        "Support for all major programming languages",
        "Priority support via WhatsApp",
      ],
      idealFor: "Agencies, engineering teams, and power users who need maximum AI throughput with enterprise-grade optimization and compliance.",
      technicalSpecs: [
        "Claude Sonnet, Opus, and Fable models",
        "Exact-match and vector-based semantic caching",
        "Smart request routing across providers",
        "Hybrid data compliance for GDPR",
        "Multi-agent traffic resolution",
        "Multi-language support (Python, JavaScript, TypeScript, etc.)",
        "IDE integrations (VS Code, JetBrains)",
        "API access for custom workflows",
        "Advanced usage analytics and reporting",
        "Dedicated account manager",
      ],
    },
  },
  {
    id: "hosting-vip",
    slug: "hosting-vip",
    name: "Hosting VIP",
    shortDesc: "Premium hosting with 2 apps + database",
    description: "Premium hosting for up to 2 apps with a managed database. For projects that need database access and priority support.",
    image: "/logo.svg",
    price: "2000",
    priceLabel: "DA/month",
    cta: "Get Started",
    category: "Hosting",
    tag: "VIP",
    useCases: "Full-stack apps, SaaS projects, apps with databases, e-commerce sites.",
    features: [
      "2 applications",
      "Managed database included",
      "Free SSL certificate",
      "Automatic deployments",
      "Priority support",
      "1GB RAM",
    ],
    bulletPoints: [
      { icon: Server, text: "2 Apps + DB" },
      { icon: Shield, text: "Free SSL" },
      { icon: Clock, text: "Priority Support" },
    ],
    seo: {
      title: "VIP Web Hosting in Algeria | 2 Apps + Database | 2000 DA/month",
      description: "Premium web hosting in Algeria for full-stack apps. 2 applications, managed database, free SSL, priority support. 2000 DA/month.",
      keywords: [
        "premium hosting algeria",
        "vip hosting algeria",
        "hosting with database algeria",
        "full stack hosting algeria",
        "hebergement premium algerie",
        "hosting for saas algeria",
        "managed database hosting algeria",
        "hebergement professionnel algerie",
        "hosting for ecommerce algeria",
        "priority support hosting algeria",
      ],
    },
    details: {
      overview: "Premium hosting for up to 2 applications with a managed database included. Perfect for full-stack apps, SaaS projects, and e-commerce sites that need database access and priority support.",
      whatYouGet: [
        "2 application deployments",
        "Managed database (PostgreSQL or MySQL)",
        "Free SSL certificate for secure connections",
        "Automatic deployments from Git",
        "Priority support via WhatsApp",
        "1GB RAM for your applications",
        "Custom domain support",
      ],
      idealFor: "Full-stack applications, SaaS projects, apps with databases, and e-commerce sites.",
      technicalSpecs: [
        "Node.js, Python, or static site support",
        "PostgreSQL or MySQL managed database",
        "Git-based deployments",
        "Custom domain with DNS management",
        "Automatic HTTPS with Let's Encrypt",
        "Advanced resource monitoring",
        "Daily backups",
      ],
    },
  },
  {
    id: "llm-credit",
    slug: "llm-credit",
    name: "LLM Credit",
    shortDesc: "OpenAI credits served through Hawiyat Composer",
    description: "OpenAI model credits served through Hawiyat Composer. Built-in caching, smart routing, less wasted tokens.",
    image: "/services/openai.png",
    price: "2500",
    priceLabel: "DA for 10 USD credits",
    cta: "Get Started",
    category: "AI Tokens",
    tag: "Starter",
    useCases: "Developers and teams who want OpenAI access with Hawiyat Composer's caching, routing, and optimization.",
    features: [
      "OpenAI model access",
      "Hawiyat Composer caching layer",
      "Smart request routing",
      "Token usage optimization",
      "No daily or weekly limits",
    ],
    bulletPoints: [
      { icon: Zap, text: "OpenAI Access" },
      { icon: Shield, text: "Hawiyat Composer Optimized" },
      { icon: Clock, text: "No Limits" },
    ],
    seo: {
      title: "OpenAI Credits in Algeria | LLM Credit | Hawiyat Composer",
      description: "Get OpenAI credits in Algeria through Hawiyat Composer. Built-in caching, smart routing, token optimization. 2500 DA for 10 USD credits.",
      keywords: [
        "openai credits algeria",
        "openai algeria",
        "llm credits algeria",
        "openai subscription algeria",
        "chatgpt credits algeria",
        "openai api algeria",
        "openai dz",
        "ai credits algeria",
        "openai access algerie",
        "buy openai credits algeria",
      ],
    },
    details: {
      overview: "OpenAI model credits served through Hawiyat Composer with built-in caching, smart routing, and token optimization. Get more value from every token with our intelligent infrastructure.",
      whatYouGet: [
        "OpenAI model access (GPT-4, GPT-4o, etc.)",
        "Hawiyat Composer caching layer for faster responses",
        "Smart request routing for optimal performance",
        "Token usage optimization to reduce waste",
        "No daily or weekly usage limits",
        "Priority support via WhatsApp",
      ],
      idealFor: "Developers and teams who want OpenAI access with Hawiyat Composer's caching, routing, and optimization for better performance and cost efficiency.",
      technicalSpecs: [
        "GPT-4, GPT-4o, GPT-4o-mini models",
        "Semantic caching for repeated queries",
        "Smart request routing",
        "Token usage tracking and optimization",
        "API access for custom integrations",
        "Usage analytics and reporting",
      ],
    },
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug)
}
