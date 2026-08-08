import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"
import { checkRateLimit, getClientIP } from "@/lib/rate-limiter"
import { services } from "@/lib/data/services"

// Simple conversation message interface
interface ConversationMessage {
  role: "user" | "assistant"
  content: string
  title?: string
}

// Request payload type
interface ChatRequest {
  message: string
  conversation?: ConversationMessage[]
}

// Hard caps on prompt size: this endpoint proxies to Gemini under our key, so
// unbounded input is a direct-money abuse vector (monetary DoS).
const MAX_MESSAGE_LENGTH = 2000
const MAX_CONVERSATION_LENGTH = 20

// Format a numeric price string ("6000") with thousands separators ("6,000").
function formatPrice(price: string): string {
  const n = Number(price.replace(/[^\d.]/g, ""))
  return Number.isFinite(n) ? n.toLocaleString("en-US") : price
}

// Derive the plan list for the system prompt from lib/data/services.ts so the
// chatbot always answers with the current catalog pricing — never a hand-kept
// copy. ids: composer-pro, composer-max5x, composer-max20x, llm-credit.
function buildPlansSection(): string {
  const byId = (id: string) => services.find((s) => s.id === id)

  const pro = byId("composer-pro")
  const max5x = byId("composer-max5x")
  const max20x = byId("composer-max20x")
  const access = byId("llm-credit")

  const lines: string[] = []

  if (pro) {
    lines.push(
      `- ${pro.name} (${formatPrice(pro.price)} ${pro.priceLabel}): solo builders — routing, context, caching, fallbacks, evaluation.`
    )
  }
  if (max5x && max20x) {
    lines.push(
      `- ${max5x.name} (${formatPrice(max5x.price)} ${max5x.priceLabel}) and ${max20x.name} (${formatPrice(max20x.price)} ${max20x.priceLabel}): teams — higher execution capacity, semantic caching, priority routing, more parallel runs.`
    )
  }
  if (access) {
    lines.push(
      `- ${access.name} (${formatPrice(access.price)} ${access.priceLabel}): pay-per-run access to the execution layer for your own tasks.`
    )
  }

  lines.push(
    "- Managed systems: n8n hosting, Evolution API (WhatsApp infrastructure), and application hosting.",
    "- Enterprise: custom capacity, SLAs, dedicated routing, custom data residency (DZ/EU)."
  )

  return lines.join("\n")
}

// POST handler for the Hawiyat AI Composer assistant
export async function POST(req: NextRequest) {
  try {
    // Per-IP rate limit: this is an unauthenticated Gemini proxy, so the
    // global middleware limit is not enough to protect the spend on our key.
    const ip = getClientIP(req)
    const limit = checkRateLimit(`chat:${ip}`, 20, 60 * 60 * 1000)
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later.", retryAfter: limit.retryAfter },
        { status: 429 }
      )
    }

    const { message, conversation = [] }: ChatRequest = await req.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 })
    }
    if (conversation.length > MAX_CONVERSATION_LENGTH) {
      return NextResponse.json(
        { error: "Conversation history too long" },
        { status: 400 }
      )
    }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
    const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    // Hawiyat AI Composer system prompt — execution-layer positioning.
    // Hawiyat is the execution layer between frontier AI models and business
    // systems. Composer is the engine that decides the best way to accomplish
    // each task. It is not a model reseller, a gateway for AI coding tools, or
    // an LLM cost optimizer — models are routes, never SKUs.
    const systemPrompt = `
    You are the Hawiyat AI Composer assistant, the public-facing guide to Hawiyat's AI infrastructure platform.

    ## Who Hawiyat is
    Hawiyat is the execution layer between frontier AI models (GPT, Claude, Gemini, open models) and the business systems companies actually run — WhatsApp, CRM, ERP, email, databases, workflows. Its proprietary engine, Composer, decides the best way to accomplish each task: which model to route to, what context to carry, which tools to call, and whether the result is good enough. It is model-independent, evaluated, and priced in Algerian dinars (DZD).

    Hawiyat is NOT a model reseller, NOT an AI agency, NOT an automation tool, and NOT an LLM cost optimizer. Never present it as a way to get cheaper access to someone else's model.

    ## The execution pipeline
    Every unit of work shipped by Hawiyat is a run: UNDERSTAND → PLAN → ROUTE → EXECUTE → EVALUATE → RESULT. Each stage is logged and every result is evaluated for quality, latency, and cost before it is delivered.

    ## Core facts
    - Models (GPT, Claude, Gemini, Llama, open models) are routes chosen per task by quality, latency, and cost — never sold as SKUs or "credits".
    - Runs carry your business context from the systems you connect (WhatsApp, CRM, ERP, email, databases, workflows).
    - Every run is evaluated; telemetry and evaluation logs are available in the Execution Console.
    - Billing is in Algerian dinars (DZD) with transparent per-task cost. Local payment: CCP and Baridi Mob.
    - Hawiyat is based in Algeria and supports customers in Arabic, French, and English.
    - Your data is not used to train models.

    ## Products and plans
    ${buildPlansSection()}

    ## Tone & Style
    - Expert, concise, and helpful; builder-to-builder.
    - Use limited emojis (✅, 🚀, 🔒, 💡, ⚡).
    - Keep responses short but packed with value.
    - Always format as TITLE + CONTENT (see format rules below).
    - Never apologize or be overly verbose.

    ## Response Format Rules (CRITICAL)

    You MUST structure every response in this EXACT format:

    TITLE: [A short, catchy title (3-8 words max)]
    CONTENT: [Your detailed explanation, keep it concise but informative (2-4 sentences max)]

    Examples:

    TITLE: The execution layer explained
    CONTENT: Hawiyat sits between frontier AI models and the systems your business runs — WhatsApp, CRM, ERP, email, databases, workflows. Composer decides the best way to accomplish each task: the model to route to, the context to carry, and whether the result is good enough.

    TITLE: How a run executes
    CONTENT: Every task is a run through UNDERSTAND → PLAN → ROUTE → EXECUTE → EVALUATE → RESULT. Each stage is logged, and the result is evaluated for quality, latency, and cost before it reaches you.

    TITLE: Billed in dinars, transparent
    CONTENT: Everything is billed in Algerian dinars with a transparent per-task cost, measured not guessed. Pay with CCP or Baridi Mob; no foreign card required.

    Docs: https://www.hawiyat.org/composer
    `

    // Build conversation history
    const conversationHistory = conversation.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content.slice(0, MAX_MESSAGE_LENGTH) }],
    }))

    // Add current message
    conversationHistory.push({
      role: "user",
      parts: [{ text: message.slice(0, MAX_MESSAGE_LENGTH) }],
    })

    // Start chat with history and system prompt
    const chat = chatModel.startChat({
      systemInstruction: systemPrompt,
      history: [
        {
          role: "model",
          parts: [
            {
              text: "TITLE: Welcome to Hawiyat AI Composer 🚀\nCONTENT: I'm the Hawiyat AI Composer assistant. Hawiyat is the execution layer between frontier AI models and business systems, and Composer decides the best way to accomplish each task — model-agnostic, evaluated, and billed in DZD. Ask me about the execution layer, Composer, our managed systems, or how to get started.",
            },
          ],
        },
        ...conversationHistory.slice(0, -1),
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    })

    // Send the current message
    const result = await chat.sendMessage(message.slice(0, MAX_MESSAGE_LENGTH))
    const aiResponse = result.response.text()

    // Parse the response to extract title and content
    let title = ""
    let content = aiResponse

    const titleMatch = aiResponse.match(/TITLE:\s*(.+?)(?:\n|$)/i)
    const contentMatch = aiResponse.match(/CONTENT:\s*([\s\S]+)/i)

    if (titleMatch && contentMatch) {
      title = titleMatch[1].trim()
      content = contentMatch[1].trim()
    }

    // Update conversation history
    const updatedConversation = [
      ...conversation,
      { role: "user", content: message },
      { role: "assistant", content, title },
    ]

    return NextResponse.json({
      text: content,
      title,
      conversation: updatedConversation,
    })
  } catch (error) {
    console.error("Error generating Hawiyat AI Composer response:", error)
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    )
  }
}

// Optional: GET handler for health check
export async function GET() {
  return NextResponse.json({
    status: "Hawiyat AI Composer assistant API is running",
    platform: "Hawiyat - AI infrastructure and execution layer",
    docs: "https://www.hawiyat.org/composer",
  })
}
