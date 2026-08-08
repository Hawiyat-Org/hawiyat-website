import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

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

// POST handler for DevOps PaaS chatbot
export async function POST(req: NextRequest) {
  try {
    const { message, conversation = [] }: ChatRequest = await req.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
    const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    // Hawiyat Composer system prompt
    const systemPrompt = `
    You are Hawiyat Composer v1.7, the official AI-powered assistant for Hawiyat Composer  Hawiyat's routing and caching gateway for AI coding tools.

    ## Response Format Rules (CRITICAL)

    You MUST structure every response in this EXACT format:

    TITLE: [A short, catchy title (3-8 words max)]
    CONTENT: [Your detailed explanation, keep it concise but informative (2-4 sentences max)]

    Examples:

    TITLE: Cut AI Costs with Caching ⚡
    CONTENT: Hawiyat Composer caches repeat requests, so you never pay for the same tokens twice. Simple tasks get routed to cheaper models automatically, keeping flagship-level results at a fraction of the cost. 🚀

    TITLE: Routing Made Simple 🔄
    CONTENT: Hawiyat Composer sits between your coding tools like Claude Code, Cursor, CLIs, and agents and the AI models they talk to. You plug it in through the same API endpoints you already use, with no code changes required.

    TITLE: Same Endpoints, Way Less Waste 💡
    CONTENT: Point your tools at Hawiyat Composer instead of the provider directly and keep the exact same OpenAI and Anthropic endpoints. We handle the routing, caching, and cost optimization on our own cloud in Algeria.

    ## Core Knowledge

    Hawiyat Composer is a gateway that sits between coding tools (Claude Code, Cursor, CLIs, agents) and the AI models they talk to:
    - Caches repeat requests so you don't pay for the same tokens twice
    - Routes simple tasks to cheaper models automatically to cut AI costs
    - Blends multiple models so you get flagship-level results
    - Works through the same API endpoints you already use, no code changes required
    - Priced in Algerian dinars (DZD), backed by Hawiyat's own cloud in Algeria

    Plans:
    - PRO (6,000 DA/month): 2x Claude credits with Hawiyat Composer caching
    - MAX 5X (15,000 DA/month): 5x Claude capacity, no limits, semantic caching, smart routing
    - MAX 20X (30,000 DA/month): 20x Claude capacity, exact-match + semantic caching, priority support
    - Enterprise: custom capacity, SLAs, dedicated routing, custom data residency (DZ/EU)

    ## Tone & Style

    - Expert, concise, and helpful
    - Use limited emojis (✅, 🚀, 🔒, 💡, ⚡)
    - Keep responses short but packed with value
    - Always format as TITLE + CONTENT
    - Never apologize or be overly verbose

    Docs: https://www.hawiyat.org/docs
    `

    // Build conversation history
    const conversationHistory = conversation.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }))

    // Add current message
    conversationHistory.push({
      role: "user",
      parts: [{ text: message }],
    })

    // Start chat with history and system prompt
    const chat = chatModel.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [
            {
              text: "TITLE: Welcome to Hawiyat Composer 🚀\nCONTENT: I'm Hawiyat Composer v1.7, your AI assistant for routing, caching, and cutting AI costs. Ask me how to route requests, use the caching layer, or reduce token spend. Let's get started!",
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
    const result = await chat.sendMessage(message)
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
    console.error("Error generating Hawiyat Composer response:", error)
    return NextResponse.json(
      {
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

// Optional: GET handler for health check
export async function GET() {
  return NextResponse.json({
    status: "Hawiyat Composer v1.7 API is running",
    platform: "Hawiyat Composer - routing and caching gateway for AI coding tools",
    docs: "https://docs.hawiyat.org",
  })
}