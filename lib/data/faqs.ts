export const faqs: { question: string; answer: string }[] = [
  {
    question: "What does Hawiyat actually do?",
    answer:
      "Hawiyat takes a task you would normally do by hand and makes it run itself. You describe what you want, like a WhatsApp order confirmed or a support reply sent, and it picks the AI, pulls in the context from your tools, and checks the answer before it goes anywhere. Whatever AI exists tomorrow, you'll need a layer that decides how to use it.",
  },
  {
    question: "Am I locked into one AI model?",
    answer:
      "No. Models are routes, chosen per task by quality, latency, and cost. GPT, Claude, Gemini, and open models all sit behind the same layer, so a provider change never breaks your pipeline. The layer outlives any single model.",
  },
  {
    question: "What will this cost me?",
    answer:
      "Everything is billed in Algerian dinars. Composer caches repeated work, routes each task to the most efficient model, and logs a transparent per-task cost, roughly a fraction of a DZD per task. You always see what you paid and what you got, measured, not guessed. Composer plans run 6,000 DA/month (Pro), 15,000 DA/month (MAX 5X), and 30,000 DA/month (MAX 20X).",
  },
  {
    question: "Can I pay without a foreign card?",
    answer:
      "Yes, everything is billed in DZD. Pay with CCP or Baridi Mob, no foreign card needed.",
  },
  {
    question: "Is my data safe? Do you train on it?",
    answer:
      "No. Your data is never used to train models. Runs carry your context to complete the task, and the evaluation logs are yours to audit. Data stays between your systems and the layer.",
  },
  {
    question: "How do I get started?",
    answer:
      "Pick a Composer plan on the home page, or browse n8n, WhatsApp, and hosting on the services page. We activate your workspace within 24 hours, you connect your tools, and run your first task. A WhatsApp workflow can be executing the same day. Prefer to talk first? Chat with us on WhatsApp and we'll set you up.",
  },
  {
    question: "Why not just use ChatGPT or a chatbot?",
    answer:
      "A chatbot answers a prompt. Composer executes a business task: it pulls your customer and order context, picks the best model for the job, runs it against your systems, and checks the result before it reaches anyone. Same engines, but the layer decides the how.",
  },
  {
    question: "Can Composer work with my WhatsApp?",
    answer:
      "Yes, WhatsApp is a first-class route on the layer. Support, sales, and back-office runs happen there, and a workflow can be executing the same day you order.",
  },
]
