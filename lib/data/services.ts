import { Zap, Clock, Shield, Server, MessageSquare, Bot, type LucideIcon } from "lucide-react"

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
        "Hawiyat is the only n8n hosting provider based in Algeria with local support in Arabic, French, and English. Unlike international providers, we offer pricing in Algerian dinars (DZD), same-timezone support, and infrastructure optimized for Algerian businesses. Our team has deployed n8n for 100+ clients, so you get production-tested infrastructure rather than experimental setups. We handle deployment, scaling, monitoring, and maintenance so you focus on building automations. The Freelance plan starts at 8,000 DA/year with up to 8 concurrent workflows. The Startup plan gives you worker-based parallel execution, and the Enterprise plan adds automatic backups and a 99.9% uptime SLA with compensation if we miss it. All plans include unlimited workflows, PostgreSQL database, custom domain support, and API access. We are based in Algiers and serve customers across Algeria with reliable managed n8n hosting.",
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
    name: "Hawiyat AI Composer Pro",
    shortDesc: "The execution layer for solo builders",
    description:
      "Run your AI tasks on the Hawiyat execution layer. Composer routes each task to the right model, carries your context, and evaluates the result, so you ship work, not prompt plumbing.",
    image: "/services/hawiyat%20composer.png",
    price: "6000",
    priceLabel: "DA/month",
    cta: "Get Started",
    category: "AI Execution",
    tag: "Pro",
    useCases: "Individual developers and freelancers shipping AI-powered work without managing model APIs, keys, or fallbacks.",
    features: [
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
      title: "Hawiyat AI Composer Pro | AI Execution Layer in Algeria",
      description:
        "Run AI tasks on the Hawiyat AI Composer execution layer. Model-agnostic routing, context, fallbacks, and evaluation for solo builders. 6,000 DA/month in DZD.",
      keywords: [
        "ai execution layer algeria",
        "hawiyat ai composer",
        "ai composer pro algeria",
        "ai routing algeria",
        "ai infrastructure algeria",
        "ai coding assistant algeria",
        "ai execution platform algeria",
        "model agnostic ai algeria",
        "ai task automation algeria",
        "ai developer tools algeria",
      ],
    },
    details: {
      overview:
        "Hawiyat AI Composer Pro gives solo builders the execution layer behind every AI task: routing, context, fallbacks, and evaluation, priced in DZD and supported locally.",
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
    seoContent: {
      whatIs:
        "Hawiyat AI Composer Pro is the execution layer for solo developers in Algeria. It sits between frontier AI models (GPT, Claude, Gemini, open models) and the systems you work with, deciding the best way to accomplish each task: which model to route to, what context to carry, and when to fall back. Every run is evaluated and logged, so you see the result, the quality score, and the cost in dinars. Priced at 6,000 DA/month, Pro is built for individual developers and freelancers who want to ship AI-powered work without managing model APIs, keys, or fallbacks. It includes context-aware execution against your systems, semantic caching so repeated work never pays twice, and a transparent per-task cost. Model-agnostic by design, the layer outlives any single model: when a provider changes, your pipeline does not.",
      whyChoose:
        "Solo developers in Algeria choose Hawiyat AI Composer Pro because it runs the layer, not a model. Instead of wiring OpenAI, Claude, and Gemini by hand and keeping every key alive, you describe the task and Composer routes it to the best model by quality, latency, and cost. Fallbacks absorb outages: if a model is slow or down, the task still completes. Every run is evaluated, so you ship outcomes you can measure, not prompts you hope worked. You pay 6,000 DA/month in dinars with CCP or Baridi Mob, and every run shows a transparent per-task cost. Support is local, in Arabic, French, and English, via WhatsApp. For a freelancer shipping client work, the execution layer is the difference between a deliverable that works and plumbing you own forever.",
      howItWorks:
        "Getting started with Hawiyat AI Composer Pro takes three steps. First, order the plan on our services page at 6,000 DA/month with CCP, Baridi Mob, or USD. Second, our team activates your Composer workspace within 24 hours. Third, connect your tools, IDE integrations for VS Code and JetBrains or the API for custom workflows, and run your first task. Composer takes it through a run: plan, route to the best model for the job, execute with your context, evaluate the result, and log the cost in DZD. Semantic caching makes repeated work instant, and fallbacks keep tasks moving when a model is slow or down. Every run leaves an evaluation log you can audit. Our team monitors the service 24/7, and priority support is available via WhatsApp.",
    },
    faq: [
      {
        question: "What exactly does Hawiyat AI Composer Pro do?",
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
    category: "Cloud Runtime",
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
      description: "Managed web hosting in Algeria for personal projects and portfolios. Free SSL, auto-deploy, 512MB RAM, local support. 1000 DA/month.",
      keywords: [
        "web hosting algeria",
        "managed hosting algeria",
        "basic hosting dz",
        "hebergement web algerie",
        "hebergement site web algerie",
        "hosting for developers algeria",
        "app hosting algeria",
        "managed hosting dz",
        "personal project hosting algeria",
      ],
    },
    details: {
      overview: "Managed hosting for a single application. Perfect for personal projects, portfolios, and small websites. We handle the infrastructure so you can focus on building.",
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
        "Basic web hosting in Algeria from Hawiyat is managed hosting for a single application at 1,000 DA/month. Perfect for personal portfolios, small websites, demo projects, and single-page applications, the plan includes one application deployment, free SSL certificates for secure connections, and automatic deployments from Git. You get 512MB RAM, custom domain support, and basic monitoring with uptime tracking. Node.js, Python, and static sites are all supported, with automatic HTTPS through Let's Encrypt and weekly backups included. Everything is managed by our Algerian team, so you do not need to touch a server or read a single line of configuration. For developers in Algeria who want production-grade hosting priced in dinars, Hosting Basic delivers managed infrastructure with local support and billing in DZD.",
      whyChoose:
        "Hawiyat Hosting Basic is managed web hosting in Algeria at 1,000 DA/month, priced in dinars with no hidden fees. You get free SSL, automatic deployments from Git, and basic monitoring  everything a personal project needs to go live. Unlike big international hosts that require foreign credit cards and charge in euros or dollars, Hawiyat accepts CCP and Baridi Mob and supports you in Arabic, French, and English from the same timezone. Your site runs on the same production-tested infrastructure that powers 100+ clients, with weekly backups and automatic HTTPS included. Whether you are hosting a portfolio, a demo, or a small business site, you get a professional deployment, managed for you. Upgrade to Hosting VIP anytime for a managed database and priority support.",
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
        "The Evolution API in Algeria is a WhatsApp Business API solution that lets businesses send and receive messages programmatically to build chatbots, automate customer support, and scale WhatsApp communications. Hawiyat hosts fully managed Evolution API instances with official Meta Business API access, webhook integrations for real-time messaging, message queuing for reliability, and rate limiting to prevent bans. The WhatsApp plan costs 7,000 DA/year and includes one instance with one WhatsApp number. The Startup plan at 30,000 DA/year supports multiple WhatsApp numbers in a single instance, and the Enterprise plan at 80,000 DA/year offers unlimited numbers under fair use, priority infrastructure, and WhatsApp support. Every plan includes media support, message status tracking, and onboarding guidance so you can connect Evolution API with WhatsApp properly and safely.",
      whyChoose:
        "Hawiyat is the leading provider of the WhatsApp Business API and Evolution API hosting in Algeria. We are a local team based in Algiers, so you get support in Arabic, French, and English in the same timezone  not a foreign ticket system. All pricing is in Algerian dinars, starting at 7,000 DA/year for the WhatsApp plan. We follow best practices for WhatsApp automation: rate limiting, throttling, and message templates that protect your number from being banned. Our onboarding service shows you exactly how to connect Evolution API with WhatsApp, and our team has deployed this infrastructure for 100+ clients. Whether you need a WhatsApp chatbot, order notifications, or customer support automation, Hawiyat gives you production-tested messaging infrastructure with local, reachable support.",
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
    name: "Hawiyat AI Composer MAX 5X",
    shortDesc: "5X base execution capacity, more parallel runs and tasks",
    description:
      "Five times the base execution capacity of Pro. Run more tasks in parallel, with the same routing, context, fallbacks, and evaluation. No single model is ever the bottleneck.",
    image: "/services/hawiyat%20composer.png",
    price: "15000",
    priceLabel: "DA/month",
    cta: "Get Started",
    category: "AI Execution",
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
      title: "Hawiyat AI Composer MAX 5X | 5X Execution Capacity | Algeria",
      description:
        "5X base execution capacity on the Hawiyat AI Composer execution layer, more parallel runs and tasks, with routing, fallbacks, and evaluation. 15,000 DA/month.",
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
    cta: "Get Started",
    category: "AI Execution",
    tag: "Max 20X",
    useCases: "Agencies, engineering teams, and power users who need maximum parallel throughput on the execution layer with enterprise-grade compliance.",
    features: [
      "20X base execution capacity, maximum parallel throughput",
      "Model-agnostic routing per task",
      "Exact-match and semantic caching",
      "Automatic model fallbacks on failure",
      "Hybrid data compliance (GDPR ready)",
      "Multi-agent traffic resolution",
      "Evaluation and quality score for every run",
    ],
    bulletPoints: [
      { icon: Zap, text: "20X Capacity" },
      { icon: Shield, text: "GDPR Ready" },
      { icon: Clock, text: "Evaluate Every Run" },
    ],
    seo: {
      title: "Hawiyat AI Composer MAX 20X | Maximum Execution Capacity | Algeria",
      description:
        "20X base execution capacity on the Hawiyat AI Composer execution layer for teams and agencies. Parallel throughput, hybrid compliance, evaluation. 30,000 DA/month.",
      keywords: [
        "ai execution capacity algeria enterprise",
        "hawiyat ai composer enterprise",
        "ai composer max 20x algeria",
        "ai routing algeria",
        "ai infrastructure algeria agency",
        "ai execution platform algeria team",
        "parallel ai tasks algeria enterprise",
        "model agnostic ai algeria",
        "gdpr compliant ai algeria",
        "ai developer tools algeria agency",
      ],
    },
    details: {
      overview:
        "Hawiyat AI Composer MAX 20X gives teams twenty times the base execution capacity of Pro, with hybrid data compliance and multi-agent traffic resolution. Maximum parallel throughput for agencies and engineering teams.",
      whatYouGet: [
        "20X base execution capacity, maximum parallel throughput",
        "Route every task to the best model by quality, latency, and cost",
        "Exact-match and vector-based semantic caching",
        "Automatic fallback cascades across models",
        "Hybrid data compliance (GDPR ready)",
        "Multi-agent traffic resolution",
        "Evaluation log with a quality score for every run",
        "Priority support via WhatsApp",
      ],
      idealFor: "Agencies, engineering teams, and power users who run many AI tasks in parallel and need enterprise-grade compliance and traffic handling.",
      technicalSpecs: [
        "Model routes: GPT, Claude, Gemini, and open models",
        "Exact-match and vector-based semantic caching",
        "Automatic fallback cascades",
        "Hybrid data compliance for GDPR",
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
        "Hawiyat AI Composer MAX 20X is the highest-capacity tier of the Hawiyat AI Composer execution layer in Algeria. At 30,000 DA/month, it gives agencies, engineering teams, and power users twenty times the base execution capacity of Pro, maximum parallel runs and tasks. Composer routes each task to the best model by quality, latency, and cost, carries your context, falls back automatically when a model is slow or down, and evaluates every result. Exact-match and vector-based semantic caching keep repeat work instant, hybrid data compliance makes deployments GDPR-ready, and multi-agent traffic resolution keeps performance stable under heavy concurrent load. Every run is logged with a quality score and a transparent per-task cost in dinars. Models are routes, not SKUs, so the layer outlives any single provider.",
      whyChoose:
        "Agencies and engineering teams choose Hawiyat AI Composer MAX 20X for maximum parallel throughput on the execution layer. Twenty times the base execution capacity of Pro means dozens of runs at once without queueing behind a model. Composer handles routing, context, fallbacks, and evaluation, so client deliverables are the outcome, not the plumbing. Hybrid data compliance makes it GDPR-ready for customers with strict requirements, and multi-agent traffic resolution keeps performance stable under heavy load. Every run is evaluated and costed in dinars, with no daily or weekly caps on the layer. You pay 30,000 DA/month with CCP or Baridi Mob, and a dedicated account manager plus priority WhatsApp support come with the plan. For teams that live in the layer, MAX 20X removes every ceiling on throughput.",
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
        question: "Is MAX 20X GDPR compliant?",
        answer:
          "Yes. MAX 20X includes hybrid data compliance ready for GDPR, with exact-match and vector-based semantic caching and multi-agent traffic resolution for enterprise-grade deployments.",
      },
      {
        question: "Who is MAX 20X designed for?",
        answer:
          "Agencies, engineering teams, and power users who need maximum parallel throughput. It includes a dedicated account manager, advanced analytics in DZD, and priority WhatsApp support.",
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
    category: "Cloud Runtime",
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
        "Hosting VIP from Hawiyat is premium web hosting in Algeria for up to two applications with a managed database included. At 2,000 DA/month, it is designed for full-stack apps, SaaS projects, and e-commerce sites that need database access and priority support. You get two application deployments, a managed PostgreSQL or MySQL database, free SSL certificates, automatic deployments from Git, and 1GB RAM. Custom domain support with DNS management, automatic HTTPS through Let's Encrypt, advanced resource monitoring, and daily backups are all included. Priority support is available via WhatsApp. Whether you are launching a SaaS product, an e-commerce store, or a client project that needs a database, Hosting VIP gives you professional-grade infrastructure in Algeria, managed for you and billed in dinars.",
      whyChoose:
        "Hawiyat Hosting VIP is full-stack hosting in Algeria with a managed database included. You get two applications plus PostgreSQL or MySQL, managed entirely by our team, with daily backups and advanced monitoring. At 2,000 DA/month, you pay in Algerian dinars with CCP or Baridi Mob  no foreign credit card needed. Priority WhatsApp support comes in Arabic, French, and English. Your projects run on production-tested infrastructure that powers 100+ clients, with automatic HTTPS and custom domain management. Whether you are building a SaaS product, a client application, or an e-commerce site, Hosting VIP delivers premium hosting with database access, priority support, and local expertise.",
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
    name: "AI Composer access",
    shortDesc: "Access to the execution layer for your own tasks",
    description:
      "Access to the Hawiyat AI Composer execution layer for your own tasks. Route models per task, with caching, fallbacks, and a transparent per-task cost, billed in DZD.",
    image: "/services/hawiyat%20composer.png",
    price: "2500",
    priceLabel: "DA/month",
    cta: "Get Started",
    category: "AI Execution",
    tag: "Starter",
    useCases: "Individuals and teams who want a pay-per-run execution layer for AI tasks without committing to a fixed capacity plan.",
    features: [
      "Model-agnostic routing per task (GPT, Claude, Gemini, open models)",
      "Transparent per-task cost in DZD",
      "Semantic caching to cut repeat spend",
      "Automatic model fallbacks on failure",
      "Evaluation log for every run",
      "API access for custom integrations",
    ],
    bulletPoints: [
      { icon: Zap, text: "Route per Task" },
      { icon: Shield, text: "Fallbacks Built-In" },
      { icon: Clock, text: "Per-Task Cost" },
    ],
    seo: {
      title: "AI Composer access in Algeria | Pay-per-run | Hawiyat AI Composer",
      description:
        "Pay-per-run access to the Hawiyat AI Composer execution layer. Model-agnostic routing, caching, fallbacks, and transparent per-task pricing in DZD. 2,500 DA/month.",
      keywords: [
        "ai composer access algeria",
        "ai execution layer algeria",
        "hawiyat ai composer",
        "ai infrastructure algeria",
        "pay per run ai algeria",
        "ai per task cost algeria",
        "model agnostic ai algeria",
        "ai routing algeria",
        "ai pipeline algeria",
        "ai execution platform dz",
      ],
    },
    details: {
      overview:
        "AI Composer access unlocks the Hawiyat execution layer for your own tasks. Route each task to the right model, keep your context, fall back automatically, and pay a transparent per-task cost in dinars.",
      whatYouGet: [
        "Route every task to the best model by quality, latency, and cost",
        "Automatic fallback cascades when a model is slow or down",
        "Semantic caching so repeated work never pays twice",
        "Evaluation log with a quality score for every run",
        "Transparent per-task cost in Algerian dinars",
        "Priority support via WhatsApp",
      ],
      idealFor: "Developers and teams who want to run AI tasks on a pay-per-run execution layer without committing to a fixed capacity plan.",
      technicalSpecs: [
        "Model routes: GPT, Claude, Gemini, and open models",
        "Vector-based semantic caching",
        "Automatic fallback cascades",
        "Per-run evaluation and logging",
        "API access for custom integrations",
        "Usage analytics and reporting in DZD",
      ],
    },
    seoContent: {
      whatIs:
        "AI Composer access is the pay-per-run way to use the Hawiyat AI Composer execution layer in Algeria. For 2,500 DA/month you get access to the layer itself: Composer sits between frontier AI models (GPT, Claude, Gemini, open models) and your systems, deciding the best way to accomplish each task. It routes every task to the best model by quality, latency, and cost, carries your context, falls back automatically when a model is slow or down, and evaluates the result. Semantic caching means repeated work never pays twice, and every run shows a transparent per-task cost in dinars. You get API access for custom integrations and an evaluation log for every run. Models are routes, not SKUs, so the layer works with whatever model fits the task, today and tomorrow.",
      whyChoose:
        "Developers in Algeria choose AI Composer access when they want the execution layer, not a model subscription. Instead of wiring OpenAI, Claude, and Gemini by hand and paying in foreign currency, you run tasks on one layer that routes, executes, falls back, and evaluates, with a transparent per-task cost in dinars. There are no model credits to manage and no SKU to commit to: Composer picks the best route for each task, and repeated work is served from cache. You pay 2,500 DA/month with CCP or Baridi Mob, no foreign card required. Support is local, in Arabic, French, and English, via WhatsApp. For freelancers and teams that want model-agnostic execution without a fixed capacity plan, AI Composer access is the cleanest entry point.",
      howItWorks:
        "Getting started with AI Composer access takes three steps. First, order access at 2,500 DA/month with CCP, Baridi Mob, or USD. Second, our team activates your Composer workspace within 24 hours. Third, connect your tools through the API or supported integrations and run your first task. Composer executes each task through a run: plan, route to the best model for the job, execute with your context, evaluate the result, and log the cost in DZD. Semantic caching makes repeated work instant, and fallbacks keep tasks moving when a model is slow or down. Every run leaves an evaluation log you can audit, and usage analytics show what each task cost. Support is available via WhatsApp in Arabic, French, and English whenever you need help.",
    },
    faq: [
      {
        question: "What do I actually get with AI Composer access?",
        answer:
          "Access to the Hawiyat execution layer, priced in dinars with a transparent per-task cost. Composer routes each task to the best model, carries your context, falls back automatically, and evaluates the result, with no model credits or SKUs to manage.",
      },
      {
        question: "Can I pay for AI Composer access with Baridi Mob or CCP?",
        answer:
          "Yes. AI Composer access is priced in Algerian dinars and can be paid with CCP, Baridi Mob, or USD. No foreign card is needed.",
      },
      {
        question: "How is the per-task cost calculated?",
        answer:
          "Each run is evaluated and logged with its cost in dinars. Caching and routing keep the cost down: repeated work is served from cache, and each task goes to the most efficient model for the job.",
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
