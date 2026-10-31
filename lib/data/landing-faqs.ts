/**
 * Landing-page FAQ — the ten questions that actually arrive in the inbox.
 *
 * Source: the Chatwoot top-100 question library (77% of repeated questions are
 * price / payment / plans / how-to-start / product clarity) plus the support
 * macro library in the wiki. Answers are the public, customer-facing form of
 * those macros. Update this file when a macro changes.
 *
 * Do not replace these with positioning copy — the site already has that on
 * /faq. These are the practical blockers that stop a customer from ordering.
 */
export const landingFaqs: { question: string; answer: string }[] = [
  {
    question: "What do I actually get when I order?",
    answer:
      "One API key. You point the tool you already use — Claude Code, Codex, Cursor, Antigravity or GitHub Copilot — at our endpoint. It is a key, not an email login for someone else's app. We activate it within 24 hours of confirmed payment.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pro is 6,000 DA per month, MAX 5X is 15,000 DA per month, MAX 20X is 30,000 DA per month. The higher plans are not different models — the whole catalogue is on every plan. They give you more parallel capacity and a larger monthly cap.",
  },
  {
    question: "How do I pay?",
    answer:
      "CCP, Baridi Mob, or USD (USDT). You do not need a foreign card. We confirm the payment and activate the key the same day in most cases.",
  },
  {
    question: "Is there a weekly limit like ChatGPT Pro?",
    answer:
      "No. There is no 5-hour and no weekly limit. You get a monthly cap, and your usage dashboard shows exactly how much of it you have used and how much is left.",
  },
  {
    question: "Do I need to know how to code?",
    answer:
      "No. Most people start with Claude Code, and we walk you through the setup step by step until it runs. If you get stuck, message us on WhatsApp and we will fix it with you.",
  },
  {
    question: "Which AI models can I use?",
    answer:
      "GPT, Claude, Gemini and open models, behind the same key. Composer sends each task to the model that fits it, so a provider change never breaks what you built.",
  },
  {
    question: "How fast is activation?",
    answer:
      "Within 24 hours of confirmed payment, and usually the same day. You receive the key and a short setup sheet.",
  },
  {
    question: "What happens when I reach my monthly cap?",
    answer:
      "You can top up, or move to a higher plan, and nothing is cut off without warning — the dashboard shows the percentage used and turns amber past 70%, red past 90%.",
  },
  {
    question: "Is support in Arabic?",
    answer:
      "Yes. Arabic, French and English, on WhatsApp, from the local team in Algeria.",
  },
  {
    question: "Can I cancel, and what about refunds?",
    answer:
      "Plans are monthly with no lock-in, and you keep the key until the end of the period you paid for. Fees are not refundable for partly used periods; if the fault is on our side, talk to us and we review it case by case.",
  },
]
