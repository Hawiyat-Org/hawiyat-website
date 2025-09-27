import { NotFoundError, PaymentError } from "@/lib/error_handler/customeErrors";
import  { ChargilyClient } from '@chargily/chargily-pay';

export async function createChargilyCheckoutSession(): Promise<string> {
  try {
    const apiSecretKey = process.env.CHARGILY_SECRET_KEY;
    if (!apiSecretKey) {
      throw new NotFoundError("Chargily secret key is not defined");
    }

    const client = new ChargilyClient({
      api_key: apiSecretKey,
      mode: process.env.NODE_ENV === "production" ? 'live' : 'test'
    });

    const amount = 50;

    const checkoutData = {
      amount,
      currency: "dzd",
      success_url: `${process.env.BASE_URL}/login`,
      failure_url: `${process.env.BASE_URL}`,
    };

    const newCheckout = await client.createCheckout(checkoutData);

    if (!newCheckout || !newCheckout.checkout_url) {
      throw new PaymentError("Invalid response from Chargily");
    }
    console.log("🔗 Chargily checkout URL:", newCheckout.checkout_url);
    return newCheckout.checkout_url;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new PaymentError(`Failed to create Chargily checkout session: ${errorMessage}`);
  }
}
