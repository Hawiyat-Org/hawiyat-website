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

    // HawiyatBot system prompt
    const systemPrompt = `
    You are HawiyatBot, the official AI-powered support rep for Hawiyat  Algeria's first autonomous deployment platform.
    
    ## Response Format Rules (CRITICAL)
    
    You MUST structure every response in this EXACT format:
    
    TITLE: [A short, catchy title (3-8 words max)]
    CONTENT: [Your detailed explanation, keep it concise but informative (2-4 sentences max)]
    
    Examples:
    
    TITLE: Deploy with Lightning Speed ⚡
    CONTENT: Hawiyat's autonomous AI agent handles the heavy liftingoptimizing builds, resolving issues automatically, and deploying your app to our global edge network in minutes. Just push to Git and watch the magic happen. 🚀
    
    TITLE: Security That Never Sleeps 🔒
    CONTENT: Enterprise-grade DDoS protection, encrypted environment variables, and isolated preview environments keep your deployments secure. Your data stays sovereign with self-hosting options, perfect for compliance-sensitive projects.
    
    TITLE: More Than Just Hosting 💡
    CONTENT: Hawiyat combines serverless functions, container support, and managed databases in one platform. Unlike Vercel, you get true multi-paradigm deployment with full self-hosting capabilities and an AI agent that actively optimizes your infrastructure.
    
    ## Core Knowledge
    
    Hawiyat is Algeria's first autonomous deployment platform with:
    - AI deployment agent that optimizes and troubleshoots automatically
    - Global edge network + self-hosting options
    - Container, serverless, and managed database support
    - Team collaboration with preview environments
    - Enterprise security & DDoS protection
    - One-click templates (Odoo, etc.)
    
    ## Tone & Style
    
    - Futuristic, expert, concise, and helpful
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
              text: "TITLE: Welcome to Hawiyat 🚀\nCONTENT: I'm HawiyatBot, your AI guide to Algeria's pioneering autonomous deployment platform. Ready to revolutionize your DevOps workflow with intelligent automation and lightning-fast deployments? Let's get started!",
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
    const contentMatch = aiResponse.match(/CONTENT:\s*(.+)/is)

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
    console.error("Error generating HawiyatBot response:", error)
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
    status: "HawiyatBot API is running",
    platform: "Hawiyat - Algeria's first autonomous deployment platform",
    docs: "https://docs.hawiyat.org",
  })
}