import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { handleError } from "@/lib/error_handler/handleError";
import { ValidationError } from "@/lib/error_handler/customeErrors";

// Secret for Chargily webhook verification
const endpointSecret = process.env.CHARGILY_SECRET_KEY as string;

// Type definitions for Chargily webhook events
interface ChargilyWebhookEvent {
  type: string;
  data: ChargilyCheckoutData;
}

interface ChargilyCheckoutData {
  id: string;
  amount: number;
  currency: string;
  status: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("signature");
    
    if (!signature) {
      throw new ValidationError("No Chargily signature found");
    }
    
    const event = verifyAndParseWebhook(body, signature);
    await handleWebhookEvent(event);
    console.log("✅ Webhook received and processed successfully");
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

function verifyAndParseWebhook(
  payload: string,
  signature: string
): ChargilyWebhookEvent {
  try {
    // Verify the webhook signature
    const computedSignature = crypto
      .createHmac("sha256", endpointSecret)
      .update(payload)
      .digest("hex");
      
    if (computedSignature !== signature) {
      console.error("Webhook signature verification failed");
      throw new ValidationError("Invalid webhook signature");
    }
    
    // Parse the payload as JSON
    return JSON.parse(payload);
  } catch (err) {
    console.error(
      `Webhook signature verification failed: ${(err as Error).message}`
    );
    throw new ValidationError("Invalid webhook signature");
  }
}

async function handleWebhookEvent(event: ChargilyWebhookEvent): Promise<void> {
  switch (event.type) {
    case "checkout.paid":
      console.log("✅ Payment successful! Webhook working correctly.");
      console.log("Payment details:", JSON.stringify(event.data, null, 2));
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}
