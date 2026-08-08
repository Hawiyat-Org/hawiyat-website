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
    seoContent: {
      whatIs:
        "n8n hosting in Algeria is a managed workflow automation platform that lets you connect apps, automate tasks, and build AI pipelines without managing servers. Hawiyat provides fully managed n8n instances with 99.9% uptime, automatic updates, and local support in Arabic, French, and English. Every plan includes a PostgreSQL database, unlimited workflows, custom domain support, and webhook endpoints for external integrations. Pricing starts at 8,000 DA/year for the Freelance plan (up to 8 concurrent workflows), 30,000 DA/year for the Startup plan (worker-based setup with unlimited executions), and 80,000 DA/year for Enterprise (automatic backups, 99.9% uptime SLA with compensation, WhatsApp support). Each instance runs the latest n8n version with all core nodes and includes SSL certificates, and 24/7 monitoring. Whether you are automating WhatsApp replies, connecting CRMs, building AI pipelines, or triggering actions from forms, managed n8n hosting from Hawiyat lets you build powerful automations without infrastructure headaches.",
      whyChoose:
        "Hawiyat is the only n8n hosting provider based in Algeria with local support in Arabic, French, and English. Unlike international providers, we offer pricing in Algerian dinars (DZD), same-timezone support, and infrastructure optimized for Algerian businesses. Our team has deployed n8n for 60+ live clients, so you get production-tested infrastructure rather than experimental setups. We handle deployment, scaling, monitoring, and maintenance so you focus on building automations. The Freelance plan at 8,000 DA/year is 47% cheaper than the regular 15,000 DA/year price until August 31, 2026. The Startup plan gives you worker-based parallel execution, and the Enterprise plan adds automatic backups and a 99.9% uptime SLA with compensation if we miss it. All plans include unlimited workflows, PostgreSQL database, custom domain support, and API access. We are based in Algiers and serve customers across Algeria with reliable managed n8n hosting.",
      howItWorks:
        "Getting started with n8n hosting at Hawiyat takes three steps. First, choose your plan: Freelance (8,000 DA/year, up to 8 concurrent workflows), Startup (30,000 DA/year, worker-based setup, unlimited executions), or Enterprise (80,000 DA/year, automatic backups, 99.9% uptime SLA, WhatsApp support). Second, submit your order through our website with your preferred payment method  CCP, Baridi Mob, or USD. Third, our team deploys your n8n instance within 24 hours with automatic updates, SSL certificates, and 24/7 monitoring enabled. You get access to the latest n8n version with all core nodes, unlimited workflows and executions on Startup and Enterprise, webhook endpoints for external integrations, and API access for programmatic control. We handle server management, scaling, and maintenance entirely. You build automations for WhatsApp replies, CRM connections, AI pipelines, and scheduled tasks. Support is available by email on all plans and by WhatsApp on the Enterprise plan.",
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
    seoContent: {
      whatIs:
        "Hawiyat Composer Pro is an AI subscription in Algeria that doubles your Claude Pro credit quota for AI coding with Claude Code. It gives you 2x Claude Pro credits every month with no daily or weekly limits ever, powered by the Hawiyat Composer caching layer for faster responses. Priced at 6,000 DA/month in Algerian dinars, it includes context-aware code suggestions, automated code reviews, and multi-language support for Python, JavaScript, TypeScript, and more. It works with IDE integrations for VS Code and JetBrains, plus API access for custom workflows. Hawiyat Composer Pro is built for individual developers, freelancers, and small projects that need reliable AI coding assistance without worrying about hitting usage caps. Get consistent Claude access for coding in Algeria with local support in Arabic, French, and English.",
      whyChoose:
        "Choosing Hawiyat Composer Pro for your AI coding subscription in Algeria means no more daily or weekly limits. Most developers hit Claude's usage caps mid-week and lose momentum; with 2x Claude Pro credits and zero caps, you keep working. The Hawiyat Composer caching layer makes responses faster by reusing previous results, and smart routing sends requests to the best available provider. You pay 6,000 DA/month in Algerian dinars  no foreign currency, no international card required  with payment via CCP or Baridi Mob. Support is local, in Arabic, French, and English, through WhatsApp. Unlike international subscriptions that block Algerian payment methods, Hawiyat is built for developers in Algeria. If you are a freelancer shipping client work or a developer learning new tools, Hawiyat Composer Pro keeps you productive every single day of the month.",
      howItWorks:
        "Getting started with Hawiyat Composer Pro takes three steps. First, choose your plan on our services page  Pro gives you 2x Claude Pro credits at 6,000 DA/month, with Max 5X at 15,000 DA/month and Max 20X at 30,000 DA/month for heavier needs. Second, order with your preferred payment method  CCP, Baridi Mob, or USD  and our team activates your account within 24 hours. Third, connect your favorite coding tool: install the Claude Code extension in VS Code or JetBrains, link your Hawiyat Composer account, and start coding. Your requests are routed through the Hawiyat Composer gateway, which applies semantic caching and smart routing so every token goes further. You get context-aware suggestions, automated code reviews, and multi-language support. Usage analytics let you track your credits, and our team monitors the service 24/7. Support is available via WhatsApp.",
    },
    faq: [
      {
        question: "What does 2x Claude Pro credits mean?",
        answer:
          "Hawiyat Composer Pro doubles the Claude Pro credit quota you get each month, and there are no daily or weekly limits. Instead of hitting usage caps mid-week, you get a full month of consistent AI coding assistance for 6,000 DA/month.",
      },
      {
        question: "Can I pay with Baridi Mob or CCP?",
        answer:
          "Yes. All Hawiyat Composer plans are priced in Algerian dinars and can be paid with CCP, Baridi Mob, or USD. No international card or foreign currency account is needed.",
      },
      {
        question: "Which coding tools work with Hawiyat Composer Pro?",
        answer:
          "Hawiyat Composer Pro works with Claude Code in VS Code and JetBrains IDEs, plus API access for custom workflows. It supports Python, JavaScript, TypeScript, and all major programming languages.",
      },
    ],
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
    seoContent: {
      whatIs:
        "Basic web hosting in Algeria from Hawiyat is simple, affordable hosting for a single application at 1,000 DA/month. Perfect for personal portfolios, small websites, demo projects, and single-page applications, the plan includes one application deployment, free SSL certificates for secure connections, and automatic deployments from Git. You get 512MB RAM, custom domain support, and basic monitoring with uptime tracking. Node.js, Python, and static sites are all supported, with automatic HTTPS through Let's Encrypt and weekly backups included. Everything is managed by our Algerian team, so you do not need to touch a server or read a single line of configuration. For developers in Algeria who want cheap hosting priced in dinars, Hosting Basic delivers production-grade infrastructure at a freelancer-friendly price.",
      whyChoose:
        "Hawiyat Hosting Basic is among the most affordable web hosting in Algeria at just 1,000 DA/month, priced in dinars with no hidden fees. You get free SSL, automatic deployments from Git, and basic monitoring  everything a personal project needs to go live. Unlike big international hosts that require foreign credit cards and charge in euros or dollars, Hawiyat accepts CCP and Baridi Mob and supports you in Arabic, French, and English from the same timezone. Your site runs on the same production-tested infrastructure that powers 60+ live clients, with weekly backups and automatic HTTPS included. Whether you are hosting a portfolio, a demo, or a small business site, you get a professional deployment without the professional price tag. Upgrade to Hosting VIP anytime for a managed database and priority support.",
      howItWorks:
        "Getting your site live with Hawiyat Hosting Basic takes three steps. First, order the plan at 1,000 DA/month using your preferred payment method  CCP, Baridi Mob, or USD. Second, connect your Git repository: our platform automatically deploys Node.js, Python, or static site projects from Git with zero configuration. Third, point your custom domain and get a free SSL certificate from Let's Encrypt, so your site is live on HTTPS within minutes. You get 512MB RAM, basic monitoring with uptime tracking, and weekly backups of your application. Every deployment is automatic  push to Git and your changes go live. If you need a database, more applications, or priority support, you can upgrade to Hosting VIP at 2,000 DA/month at any time. Support is available by email in Arabic, French, and English.",
    },
    faq: [
      {
        question: "What can I host on the Basic hosting plan?",
        answer:
          "The Basic plan hosts one application  personal portfolios, small websites, demo projects, and single-page applications. It supports Node.js, Python, and static sites with 512MB RAM, free SSL, and automatic Git deployments.",
      },
      {
        question: "Do I need a foreign credit card to pay for hosting?",
        answer:
          "No. All Hawiyat hosting plans are priced in Algerian dinars and can be paid with CCP, Baridi Mob, or USD. We accept local Algerian payment methods.",
      },
      {
        question: "How do deployments work on Hosting Basic?",
        answer:
          "Deployments are automatic from Git. Connect your repository, and every push deploys your changes with zero configuration. You also get a free SSL certificate and custom domain support.",
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
    seoContent: {
      whatIs:
        "The Evolution API in Algeria is a WhatsApp Business API solution that lets businesses send and receive messages programmatically to build chatbots, automate customer support, and scale WhatsApp communications. Hawiyat hosts fully managed Evolution API instances with official Meta Business API access, webhook integrations for real-time messaging, message queuing for reliability, and rate limiting to prevent bans. The WhatsApp plan costs 7,000 DA/year (reduced from 14,000 DA/year) and includes one instance with one WhatsApp number. The Startup plan at 30,000 DA/year supports multiple WhatsApp numbers in a single instance, and the Enterprise plan at 80,000 DA/year offers unlimited numbers under fair use, priority infrastructure, and WhatsApp support. Every plan includes media support, message status tracking, and onboarding guidance so you can connect Evolution API with WhatsApp properly and safely.",
      whyChoose:
        "Hawiyat is the leading provider of the WhatsApp Business API and Evolution API hosting in Algeria. We are a local team based in Algiers, so you get support in Arabic, French, and English in the same timezone  not a foreign ticket system. All pricing is in Algerian dinars, starting at 7,000 DA/year for the WhatsApp plan, which is half the regular 14,000 DA/year price until August 31, 2026. We follow best practices for WhatsApp automation: rate limiting, throttling, and message templates that protect your number from being banned. Our onboarding service shows you exactly how to connect Evolution API with WhatsApp, and our team has deployed this infrastructure for 60+ live clients. Whether you need a WhatsApp chatbot, order notifications, or customer support automation, Hawiyat gives you production-tested messaging infrastructure with local, reachable support.",
      howItWorks:
        "Getting started with the Evolution API from Hawiyat takes three steps. First, choose your plan: WhatsApp (7,000 DA/year, one instance with one WhatsApp number), Startup (30,000 DA/year, multiple numbers in one instance), or Enterprise (80,000 DA/year, unlimited numbers under fair use with priority infrastructure). Second, place your order with your preferred payment method  CCP, Baridi Mob, or USD  and our team deploys your Evolution API instance within 24 hours. Third, we guide you through onboarding: connecting your WhatsApp number, setting up webhooks, configuring message templates, and building your first chatbot or automation flow. You get a RESTful API for sending and receiving messages, media support, and message status tracking. We manage the infrastructure, updates, and monitoring so you can focus on your messaging. Support is available by email on all plans and by WhatsApp on the Enterprise plan.",
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
    seoContent: {
      whatIs:
        "Hawiyat Composer Max 5X is an AI subscription in Algeria that multiplies your Claude Pro credits by five for high-volume AI coding with Claude Code. At 15,000 DA/month (reduced from 20,000 DA/month), it gives you 5x Claude Pro credit quota every month with no daily or weekly limits ever. Built for professional developers, startups, and small teams shipping daily, it includes advanced semantic caching with vector-based matching, smart provider routing, and context-aware code suggestions. You get automated code reviews, support for all major programming languages, IDE integrations with VS Code and JetBrains, and API access for custom workflows. Priority support is available via WhatsApp. If your team outgrows the 2x Pro plan and needs consistent high-volume AI access, Hawiyat Composer Max 5X delivers professional-grade capacity priced in Algerian dinars.",
      whyChoose:
        "Professional teams in Algeria choose Hawiyat Composer Max 5X when 2x Claude credits are not enough. You get 5x Claude Pro credit quota every month with zero daily or weekly caps, so your team never stalls mid-sprint. The vector-based semantic caching makes repeated queries dramatically faster and cheaper, and smart provider routing picks the best model for each request. At 15,000 DA/month  reduced from 20,000 DA/month for launch  it is the most affordable way to get professional AI coding capacity in Algeria. You pay in dinars with CCP or Baridi Mob, and support comes from a local team in Arabic, French, and English via WhatsApp. The service is fully managed: we monitor uptime, handle routing, and keep your coding environment running 24/7. For startups shipping daily and teams that live in their IDE, Max 5X removes every ceiling on productivity.",
      howItWorks:
        "Getting started with Hawiyat Composer Max 5X takes three steps. First, choose the Max 5X plan at 15,000 DA/month (launch price, reduced from 20,000 DA/month) on our services page. Second, order with your preferred payment method  CCP, Baridi Mob, or USD  and our team activates your 5x quota within 24 hours. Third, connect Claude Code in VS Code or JetBrains, link your Hawiyat Composer account, and start shipping. Every request flows through the Hawiyat Composer gateway, which applies vector-based semantic caching and smart provider routing so your credits go further and responses come back faster. You get context-aware code suggestions, automated code reviews, and multi-language support. Usage analytics and reporting let you monitor consumption, and our team monitors the service around the clock. Priority support is available via WhatsApp whenever you need it.",
    },
    faq: [
      {
        question: "How is Max 5X different from the Pro plan?",
        answer:
          "Pro gives you 2x Claude Pro credits at 6,000 DA/month. Max 5X gives you 5x Claude Pro credits at 15,000 DA/month (reduced from 20,000 DA/month) with advanced semantic caching and smart provider routing for high-volume professional use.",
      },
      {
        question: "Are there daily or weekly usage limits on Max 5X?",
        answer:
          "No. Hawiyat Composer Max 5X has no daily or weekly limits ever. You get the full 5x Claude Pro credit quota every month without caps.",
      },
      {
        question: "Who is Max 5X designed for?",
        answer:
          "Max 5X is built for professional developers, startups, and small teams shipping daily who need consistent high-volume AI access. It includes priority WhatsApp support and usage analytics.",
      },
    ],
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
    seoContent: {
      whatIs:
        "Hawiyat Composer Max 20X is an enterprise AI subscription in Algeria that multiplies your Claude Pro credits by twenty. At 30,000 DA/month (reduced from 40,000 DA/month), it provides 20x Claude Pro credit quota every month with access to Fable and Opus-level models and no daily or weekly limits ever. Built for agencies, engineering teams, and power users, it includes exact-match and vector-based semantic caching, smart provider routing across multiple models, and hybrid data compliance ready for GDPR. Multi-agent traffic resolution handles complex workloads, and you get context-aware code suggestions, automated code reviews, and multi-language support. IDE integrations for VS Code and JetBrains, API access, advanced usage analytics, and a dedicated account manager are all included. Max 20X is the highest-capacity AI coding plan in Algeria, priced in dinars for teams that need maximum throughput.",
      whyChoose:
        "Agencies and engineering teams in Algeria choose Hawiyat Composer Max 20X for maximum AI throughput. With 20x Claude Pro credits every month and zero daily or weekly limits, you can run dozens of parallel coding sessions without ever throttling. You get access to Fable and Opus-level models, exact-match and vector-based semantic caching, and smart provider routing across multiple models. At 30,000 DA/month  reduced from 40,000 DA/month for launch  it is the most powerful AI coding subscription available to Algerian teams. Hybrid data compliance makes it GDPR-ready for clients with strict data requirements, and multi-agent traffic resolution keeps performance stable under heavy load. A dedicated account manager, advanced usage analytics, and priority support via WhatsApp come with every subscription. Pay in dinars with CCP or Baridi Mob and get enterprise-grade AI capacity with local support in Arabic, French, and English.",
      howItWorks:
        "Getting started with Hawiyat Composer Max 20X takes three steps. First, choose Max 20X at 30,000 DA/month (launch price, reduced from 40,000 DA/month) on our services page. Second, order with your preferred payment method  CCP, Baridi Mob, or USD  and our team activates your 20x quota within 24 hours. Third, connect your team's coding tools: Claude Code in VS Code or JetBrains, plus API access for custom workflows. Every request flows through the Hawiyat Composer gateway with exact-match and vector-based caching and smart routing across Claude Sonnet, Opus, and Fable models. Multi-agent traffic resolution keeps performance stable even with dozens of concurrent sessions. You get advanced usage analytics and reporting, hybrid data compliance for GDPR-ready deployments, and a dedicated account manager for onboarding and optimization. Our team monitors the infrastructure 24/7, and priority support is available via WhatsApp.",
    },
    faq: [
      {
        question: "What does 20x Claude Pro credits mean in practice?",
        answer:
          "You get 20x the Claude Pro credit quota every month  enough for dozens of parallel coding sessions  with no daily or weekly limits ever. Max 20X includes Fable and Opus-level models for the heaviest workloads.",
      },
      {
        question: "Is Max 20X GDPR compliant?",
        answer:
          "Yes. Max 20X includes hybrid data compliance ready for GDPR, with exact-match and vector-based semantic caching and multi-agent traffic resolution for enterprise-grade deployments.",
      },
      {
        question: "Who is Max 20X designed for?",
        answer:
          "Max 20X is built for agencies, engineering teams, and power users who need maximum AI throughput. It includes a dedicated account manager, advanced analytics, and priority WhatsApp support.",
      },
    ],
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
    seoContent: {
      whatIs:
        "Hosting VIP from Hawiyat is premium web hosting in Algeria for up to two applications with a managed database included. At 2,000 DA/month, it is designed for full-stack apps, SaaS projects, and e-commerce sites that need database access and priority support. You get two application deployments, a managed PostgreSQL or MySQL database, free SSL certificates, automatic deployments from Git, and 1GB RAM. Custom domain support with DNS management, automatic HTTPS through Let's Encrypt, advanced resource monitoring, and daily backups are all included. Priority support is available via WhatsApp. Whether you are launching a SaaS product, an e-commerce store, or a client project that needs a database, Hosting VIP gives you professional-grade infrastructure in Algeria at a price that works in dinars.",
      whyChoose:
        "Hawiyat Hosting VIP is the best full-stack hosting option in Algeria because it includes a managed database  something cheap hosting plans skip. You get two applications plus PostgreSQL or MySQL, managed entirely by our team, with daily backups and advanced monitoring. At 2,000 DA/month, it costs a fraction of international premium hosts while giving you priority WhatsApp support in Arabic, French, and English. You pay in Algerian dinars with CCP or Baridi Mob  no foreign credit card needed. Your projects run on production-tested infrastructure that powers 60+ live clients, with automatic HTTPS and custom domain management. Whether you are building a SaaS product, a client application, or an e-commerce site, Hosting VIP delivers premium hosting with database access, priority support, and local expertise at a fair price.",
      howItWorks:
        "Getting your full-stack project live with Hosting VIP takes three steps. First, order the plan at 2,000 DA/month using your preferred payment method  CCP, Baridi Mob, or USD. Second, connect your Git repositories: our platform automatically deploys up to two Node.js, Python, or static applications, and our team provisions your managed PostgreSQL or MySQL database for you. Third, point your custom domains and get free SSL certificates from Let's Encrypt, so both apps are live on HTTPS within minutes. You get 1GB RAM, advanced resource monitoring, and daily backups. Every deployment is automatic  push to Git and your changes go live. Priority support is available via WhatsApp whenever you need help. If you only need one app without a database, start with Hosting Basic at 1,000 DA/month and upgrade later.",
    },
    faq: [
      {
        question: "What is the difference between Hosting Basic and Hosting VIP?",
        answer:
          "Basic hosts one application at 1,000 DA/month with 512MB RAM. VIP hosts two applications plus a managed PostgreSQL or MySQL database at 2,000 DA/month, with 1GB RAM, daily backups, advanced monitoring, and priority WhatsApp support.",
      },
      {
        question: "Which databases are supported on Hosting VIP?",
        answer:
          "Hosting VIP includes a managed PostgreSQL or MySQL database, provisioned and maintained by our team. Daily backups and advanced resource monitoring are included.",
      },
      {
        question: "Can I host a SaaS or e-commerce site on Hosting VIP?",
        answer:
          "Yes. Hosting VIP is designed for full-stack apps, SaaS projects, and e-commerce sites that need database access, custom domains, automatic HTTPS, and priority support.",
      },
    ],
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
    seoContent: {
      whatIs:
        "LLM Credit from Hawiyat gives you OpenAI credits in Algeria served through the Hawiyat Composer platform. For 2,500 DA you get 10 USD of OpenAI credits for models like GPT-4, GPT-4o, and GPT-4o-mini, delivered with built-in semantic caching, smart request routing, and token usage optimization. That means your credits go further than buying directly  repeated queries are cached and reused, and each request is routed to the best model for the job. There are no daily or weekly limits, and you get API access for custom integrations plus usage analytics and reporting. The Hawiyat Composer caching layer reduces wasted tokens on repeated prompts, so a single credit purchase delivers more real output. LLM Credit is the simplest way to buy OpenAI access in Algeria with local payment methods and support.",
      whyChoose:
        "Developers in Algeria choose Hawiyat LLM Credit because it makes OpenAI access affordable and practical. Instead of fighting international payment methods, you buy 10 USD of OpenAI credits for 2,500 DA with CCP or Baridi Mob. The Hawiyat Composer caching layer and smart routing stretch your tokens: repeated queries are served from cache, and each request goes to the most efficient model  GPT-4o-mini when it is enough, GPT-4o when you need more power. There are no daily or weekly limits, so you control exactly when and how you spend. You get API access for custom integrations, token usage tracking, and usage analytics to see where credits go. Support is local, in Arabic, French, and English, via WhatsApp. For freelancers and teams who want OpenAI model access in Algeria without the hassle, LLM Credit is the cleanest option available.",
      howItWorks:
        "Using LLM Credit takes three steps. First, purchase 10 USD of OpenAI credits for 2,500 DA using CCP, Baridi Mob, or USD. Second, our team credits your Hawiyat Composer account within 24 hours. Third, connect your tools: use the API for custom integrations, or access GPT-4, GPT-4o, and GPT-4o-mini models through the Hawiyat Composer gateway. Every request is optimized by semantic caching and smart routing, so repeated prompts are answered from cache and each query goes to the most cost-effective model. Token usage tracking shows exactly where your credits go, and usage analytics help you tune prompts to waste less. There are no daily or weekly limits, and credits stay available until you use them. Support is available via WhatsApp in Arabic, French, and English whenever you need help getting started.",
    },
    faq: [
      {
        question: "How much OpenAI access do I get for 2,500 DA?",
        answer:
          "You get 10 USD of OpenAI credits for GPT-4, GPT-4o, and GPT-4o-mini models, served through Hawiyat Composer with semantic caching and smart routing so the credits go further.",
      },
      {
        question: "Can I pay for LLM Credit with Baridi Mob or CCP?",
        answer:
          "Yes. LLM Credit is priced in Algerian dinars and can be paid with CCP, Baridi Mob, or USD. No international card is needed.",
      },
      {
        question: "Do LLM credits expire?",
        answer:
          "No. There are no daily or weekly limits, and your credits stay available until you use them. Token usage tracking shows exactly where your credits go.",
      },
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug)
}
