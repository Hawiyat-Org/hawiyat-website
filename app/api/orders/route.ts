import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prismaClient"
import { PaymentMethod } from "@prisma/client"
import { sendOrderNotification, sendOrderConfirmation, sendWhatsAppNotification, escapeHtml } from "@/lib/email-utils"
import { checkRateLimit, getClientIP } from "@/lib/rate-limiter"
import {
  BLOCKLIST_META,
  checkEmail,
  suggestDomainFix,
  toRateLimitKey,
} from "@/lib/email-validation"
import { isDomainAllowlisted } from "@/lib/email-allowlist"

// Pinned because lib/email-validation.ts uses node:url's domainToASCII, which
// does not exist on the Edge runtime. Without this, a future `runtime = "edge"`
// would fail at build time instead of degrading silently, but pinning makes the
// dependency explicit.
export const runtime = "nodejs"

const IP_RATE_LIMIT = { maxRequests: 5, windowMs: 60 * 60 * 1000 }
const EMAIL_RATE_LIMIT = { maxRequests: 4, windowMs: 60 * 60 * 1000 }
// Blocked attempts get their own, more generous bucket. They must not spend the
// 5/hour order budget: Algerian mobile carriers and ISPs run CGNAT, so unrelated
// customers share a public IP, and a confused user retrying with a corrected
// address must not be locked out an hour for someone else's rejects.
const REJECT_RATE_LIMIT = { maxRequests: 20, windowMs: 60 * 60 * 1000 }
// Upper bound on the JSON body we are willing to buffer and parse.
const MAX_BODY_BYTES = 64 * 1024

function orderError(code: string, message: string, resolution: string, status: number) {
  return NextResponse.json(
    {
      error: { code, message, resolution },
    },
    { status }
  )
}

async function sendTelegramNotification(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.warn("Telegram credentials not configured")
    return
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })
  } catch (error) {
    console.error("Telegram notification failed:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)

    // Bound the body before buffering it. On Vercel the platform caps requests
    // at ~4.5 MB, but a self-hosted deployment has no such limit and there is no
    // reason to parse 4 MB to read five short fields.
    const declaredLength = Number(request.headers.get("content-length") ?? "0")
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return orderError(
        "payload_too_large",
        "That submission was too large.",
        "Shorten your notes and resubmit.",
        413
      )
    }

    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return orderError(
        "invalid_json",
        "Malformed request body.",
        "Send a valid JSON object with Content-Type: application/json and resubmit.",
        400
      )
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return orderError(
        "invalid_json",
        "Malformed request body.",
        "Send a valid JSON object with Content-Type: application/json and resubmit.",
        400
      )
    }

    const { serviceId, serviceName, customerName, customerEmail, customerPhone, notes, preferredPayment } = body

    if (
      typeof serviceId !== "string" || !serviceId ||
      typeof serviceName !== "string" || !serviceName ||
      typeof customerName !== "string" || !customerName ||
      typeof customerEmail !== "string" || !customerEmail
    ) {
      return orderError(
        "missing_fields",
        "Missing required fields: serviceId, serviceName, customerName, customerEmail",
        "Provide all required fields as strings: serviceId, serviceName, customerName, customerEmail.",
        400
      )
    }

    // customerEmail's length is owned by checkEmail below (it maps too_long to
    // field_too_long). Checking it here as well made that branch unreachable.
    if (
      customerName.length > 120 ||
      (typeof customerPhone === "string" && customerPhone.length > 32)
    ) {
      return orderError(
        "field_too_long",
        "One or more fields exceed the maximum length: customerName is capped at 120 characters, customerPhone at 32.",
        "Shorten the offending field(s) to the cap and resubmit: customerName <= 120, customerPhone <= 32 characters.",
        400
      )
    }

    if (typeof notes === "string" && notes.length > 2000) {
      return orderError(
        "field_too_long",
        "notes exceeds the maximum length of 2000 characters.",
        "Shorten notes to 2000 characters or fewer and resubmit.",
        400
      )
    }

    // Payment validation is pure, so it runs before the limiters for the same
    // reason as the email syntax check: a typo must not cost the customer quota.
    const normalizedPayment = typeof preferredPayment === "string" && preferredPayment
      ? preferredPayment.toUpperCase().replace(/\s+/g, "_")
      : null

    const validPaymentMethods: string[] = ["CCP", "BARIDI_MOB", "USD"]
    if (normalizedPayment && !validPaymentMethods.includes(normalizedPayment)) {
      return orderError(
        "invalid_payment_method",
        "Invalid payment method. Must be one of: CCP, BARIDI_MOB, USD",
        "Set preferredPayment to one of CCP, BARIDI_MOB, or USD, or omit it.",
        400
      )
    }

    // Email syntax is checked BEFORE the rate limiters: checkRateLimit()
    // increments on allow and has no refund, so charging a customer's budget for
    // a typo would lock them out for an hour once they corrected it. The
    // blocklist decision is deferred until after the IP limiter, because the
    // allowlist lookup below is a database query and must not be reachable
    // without limit.
    const emailCheck = checkEmail(customerEmail)

    if (!emailCheck.ok && emailCheck.reason !== "blocked") {
      return orderError(
        emailCheck.reason === "too_long" ? "field_too_long" : "invalid_email",
        emailCheck.reason === "too_long"
          ? "customerEmail exceeds the maximum length of 254 characters."
          : "Invalid email format.",
        "Provide a valid email address, e.g. name@example.com, and resubmit.",
        400
      )
    }

    // Canonical form for storage and for the per-address rate-limit key.
    const normalizedEmail = emailCheck.email

    // Blocklist enforcement runs before the order limiter but behind its own
    // bucket: the allowlist lookup below is a database query, so it must be
    // rate limited, but a rejected address must not spend the 5/hour budget a
    // customer needs to place a real order.
    if (!emailCheck.ok) {
      const rejectLimit = checkRateLimit(
        `reject:${ip}`,
        REJECT_RATE_LIMIT.maxRequests,
        REJECT_RATE_LIMIT.windowMs
      )
      if (!rejectLimit.allowed) {
        return orderError(
          "rate_limited_ip",
          "Too many submissions from your connection. Please try again later.",
          "Wait before submitting again, or use the contact details on our contact page if you need help placing an order.",
          429
        )
      }

      const allowlisted = await isDomainAllowlisted(emailCheck.domain, emailCheck.matched)
      if (allowlisted) {
        // Worth recording: a domain that was blocked but let through is how a
        // false positive gets discovered in aggregate.
        console.warn(
          `email_allowlisted domain=${emailCheck.domain} matched=${emailCheck.matched}`
        )
      } else {
        // Log the domain only: never the full address, and never the
        // customer's name or phone. Enough to measure false positives and to
        // tell which list revision caused a rejection.
        console.warn(
          `email_blocked domain=${emailCheck.domain} matched=${emailCheck.matched} ` +
            `list=${BLOCKLIST_META.commit ?? "unknown"}`
        )
        const suggestion = suggestDomainFix(emailCheck.matched)
        return orderError(
          "disposable_email",
          "Temporary or disposable email addresses can't be used for orders." +
            (suggestion ? ` Did you mean ${suggestion}?` : ""),
          "Use a permanent address you will keep access to — Gmail, Outlook, iCloud, or your work email all work. If you believe this is a mistake, contact contact@hawiyat.org and we will unblock your domain.",
          400
        )
      }
    }

    const ipLimit = checkRateLimit(`ip:${ip}`, IP_RATE_LIMIT.maxRequests, IP_RATE_LIMIT.windowMs)
    if (!ipLimit.allowed) {
      return orderError(
        "rate_limited_ip",
        `Too many orders from your connection. Please try again in ${ipLimit.retryAfter} seconds.`,
        `Wait ${ipLimit.retryAfter} seconds before submitting another order, or contact Hawiyat support if you believe this is a mistake.`,
        429
      )
    }

    // Keyed on the canonical form: otherwise `a+1@x.com`, `A@x.com`, and
    // `a@x.com ` are three separate buckets and the limit is meaningless.
    const emailLimit = checkRateLimit(`email:${toRateLimitKey(normalizedEmail)}`, EMAIL_RATE_LIMIT.maxRequests, EMAIL_RATE_LIMIT.windowMs)
    if (!emailLimit.allowed) {
      return orderError(
        "rate_limited_email",
        `Too many orders with this email. Please try again in ${emailLimit.retryAfter} seconds.`,
        `Wait ${emailLimit.retryAfter} seconds or use a different email address before submitting another order.`,
        429
      )
    }

    // serviceName and customerName are interpolated into email subjects
    // (lib/email-utils.ts), so strip CR/LF — which could inject SMTP headers —
    // and cap their length. Both are validated as non-empty strings above; the
    // typeof guard only hardens against a non-string reaching this block.
    const sanitizedServiceName = (typeof serviceName === "string" ? serviceName : "")
      .replace(/[\r\n]+/g, " ").trim()
      .slice(0, 120)
    const sanitizedCustomerName = (typeof customerName === "string" ? customerName : "")
      .replace(/[\r\n]+/g, " ").trim()
      .slice(0, 120)

    // Normalize phone to a string or null so a malformed type cannot reach Prisma.
    const normalizedPhone = typeof customerPhone === "string" && customerPhone.trim()
      ? customerPhone
      : null

    // Normalize notes to a string or null for both the DB write and the
    // notification templates — the templates must never escapeHtml() a
    // non-string (a truthy non-string would throw AFTER the order commits).
    const normalizedNotes = typeof notes === "string" ? notes : null

    const order = await prisma.order.create({
      data: {
        serviceId,
        serviceName: sanitizedServiceName,
        customerName: sanitizedCustomerName,
        customerEmail: normalizedEmail,
        customerPhone: normalizedPhone,
        notes: normalizedNotes,
        preferredPayment: normalizedPayment ? normalizedPayment as PaymentMethod : null,
      },
    })

    const telegramMessage = `<b>New Order Received!</b>

<b>Service:</b> ${escapeHtml(sanitizedServiceName)}
<b>Customer:</b> ${escapeHtml(sanitizedCustomerName)}
<b>Email:</b> ${escapeHtml(normalizedEmail)}
${normalizedPhone ? `<b>Phone:</b> ${escapeHtml(normalizedPhone)}\n` : ""}${normalizedNotes ? `<b>Notes:</b> ${escapeHtml(normalizedNotes)}\n` : ""}
<b>Order ID:</b> ${order.id}
<b>Date:</b> ${new Date(order.createdAt).toLocaleString()}`

    const whatsappMessage = `🔔 *New Order Received!*

📦 *Service:* ${sanitizedServiceName}
👤 *Customer:* ${sanitizedCustomerName}
📧 *Email:* ${normalizedEmail}
${normalizedPhone ? `📱 *Phone:* ${normalizedPhone}\n` : ""}💳 *Payment:* ${normalizedPayment ?? 'Not specified'}
${normalizedNotes ? `📝 *Notes:* ${normalizedNotes}\n` : ""}
🆔 *Order ID:* ${order.id}
📅 *Date:* ${new Date(order.createdAt).toLocaleString()}`

    await sendTelegramNotification(telegramMessage)
    await sendWhatsAppNotification(whatsappMessage)

    const [emailNotificationResult, emailConfirmationResult] = await Promise.allSettled([
      sendOrderNotification({ order }),
      sendOrderConfirmation({
        to: normalizedEmail,
        order: {
          id: order.id,
          serviceName: order.serviceName,
          customerName: order.customerName,
          preferredPayment: order.preferredPayment,
          notes: order.notes,
          createdAt: order.createdAt,
        },
      }),
    ])

    if (emailNotificationResult.status === "rejected") {
      console.error("CRITICAL: Admin notification email failed:", emailNotificationResult.reason)
    } else if (!emailNotificationResult.value) {
      console.error("CRITICAL: Admin notification email returned false (SMTP config likely missing)")
    }

    if (emailConfirmationResult.status === "rejected") {
      console.error("CRITICAL: Customer confirmation email failed:", emailConfirmationResult.reason)
    } else if (!emailConfirmationResult.value) {
      console.error("CRITICAL: Customer confirmation email returned false (SMTP config likely missing)")
    }

    return NextResponse.json(
      { success: true, order: { id: order.id, status: order.status, createdAt: order.createdAt } },
      { status: 201 }
    )
  } catch (error) {
    console.error("Order creation error:", error)
    return orderError(
      "internal_error",
      "Failed to create order",
      "No order was saved. Please try again in a few moments; if the problem persists, contact Hawiyat support.",
      500
    )
  }
}
