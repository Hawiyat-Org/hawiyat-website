import { NextResponse } from "next/server"

// Machine-readable description of Hawiyat's public API surface, served at the
// OpenAPI standard path /openapi.json so AI agents and API tooling can discover
// how to place an order without scraping HTML.
//
// Mirrors the real POST /api/orders handler in app/api/orders/route.ts: same
// request fields, same validation rules (required fields, max lengths, email
// format, payment method enum) and the same response categories.
export const dynamic = "force-static"

const spec = {
  openapi: "3.0.3",
  info: {
    title: "Hawiyat Orders API",
    description:
      "The Hawiyat Orders API backs the order forms on https://www.hawiyat.org/services and is the site's only public endpoint. A POST creates a service order and persists it server side; staff are then notified over Telegram and WhatsApp and an admin email plus a customer confirmation email are dispatched as best-effort side effects (notification failures never fail the request).",
    version: "1.0.0",
  },
  servers: [{ url: "https://www.hawiyat.org" }],
  tags: [{ name: "Orders", description: "Service order placement" }],
  paths: {
    "/api/orders": {
      post: {
        operationId: "createOrder",
        summary: "Create a service order",
        description:
          "Creates a new order for a service from the /services catalog. The request is validated (required fields, field length caps, email format, supported payment methods) and rate limited per client IP (5 orders per hour) and per email address (4 orders per hour). On success the order is persisted with status PENDING and the relevant notifications are fired asynchronously and best effort.",
        tags: ["Orders"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateOrderRequest" },
            },
          },
        },
        responses: {
          "200": {
            description:
              "Order created. The endpoint responds with HTTP status 201 Created carrying this body.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateOrderResponse" },
              },
            },
          },
          "400": {
            description:
              "Validation failed: a required field is missing or empty, a field exceeds its maximum length, the email format is invalid, or preferredPayment is not one of CCP, BARIDI_MOB, USD.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "429": {
            description:
              "Rate limit exceeded. Two independent sliding limits apply: 5 orders per hour per client IP and 4 orders per hour per email address. Retry after the window resets.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description:
              "Unexpected server error. The order was not created; retry later or contact Hawiyat support.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      CreateOrderRequest: {
        type: "object",
        required: ["serviceId", "serviceName", "customerName", "customerEmail"],
        properties: {
          serviceId: {
            type: "string",
            minLength: 1,
            description:
              "Identifier of the ordered service from the services catalog (see /services). Required.",
          },
          serviceName: {
            type: "string",
            minLength: 1,
            maxLength: 120,
            description:
              "Display name of the ordered service. It is interpolated into notification and email text, so line breaks are stripped and the value is capped at 120 characters server side. Required.",
          },
          customerName: {
            type: "string",
            minLength: 1,
            maxLength: 120,
            description:
              "Full name of the customer. It is interpolated into notification and email text, so line breaks are stripped and the value is capped at 120 characters server side. Required.",
          },
          customerEmail: {
            type: "string",
            format: "email",
            maxLength: 254,
            description:
              "Email address of the customer. It receives the order confirmation and is used to enforce the per-email rate limit (4 orders per hour). Must match a basic email format. Required.",
          },
          customerPhone: {
            type: "string",
            maxLength: 32,
            description:
              "Optional phone number, typically a WhatsApp number. Capped at 32 characters; empty or absent values are stored as null.",
          },
          notes: {
            type: "string",
            maxLength: 2000,
            description:
              "Optional free-text notes about the order. Capped at 2000 characters; absent values are stored as null.",
          },
          preferredPayment: {
            type: "string",
            enum: ["CCP", "BARIDI_MOB", "USD"],
            description:
              "Optional preferred payment method. Normalized server side: trimmed, uppercased, and spaces replaced with underscores, so lowercase or spaced variants are accepted. Empty or absent values are stored as null.",
          },
        },
      },
      Order: {
        type: "object",
        required: ["id", "status", "createdAt"],
        properties: {
          id: {
            type: "string",
            description: "Unique order identifier, generated server side.",
          },
          status: {
            type: "string",
            enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
            description: "Lifecycle status of the order. New orders start as PENDING.",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "ISO 8601 timestamp of when the order was created.",
          },
        },
      },
      CreateOrderResponse: {
        type: "object",
        required: ["success", "order"],
        properties: {
          success: {
            type: "boolean",
            description: "Always true when the order was created.",
          },
          order: { $ref: "#/components/schemas/Order" },
        },
      },
      Error: {
        type: "object",
        required: ["code", "message", "resolution"],
        properties: {
          code: {
            type: "string",
            description:
              "Stable, machine-readable identifier for the error category that the caller can branch on.",
          },
          message: {
            type: "string",
            description: "Human-readable description of what went wrong.",
          },
          resolution: {
            type: "string",
            description:
              "Action the caller can take to resolve the error, such as fixing a field or retrying later.",
          },
        },
      },
      ErrorResponse: {
        type: "object",
        required: ["error"],
        properties: {
          error: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
}

export async function GET() {
  return NextResponse.json(spec, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
