import { CartItem } from "@/context/cart-context";

// lib/paypal.ts
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!;

if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
  throw new Error('Missing PayPal credentials');
}

export const baseUrl =
  PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

export async function getAccessToken(): Promise<string> {
  const res = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) throw new Error(`PayPal token error: ${res.statusText}`);
  const data = await res.json();
  return data.access_token;
}

export async function createOrder({
  total,
  cartItems,
  currency = 'USD',
  returnUrl,
  cancelUrl,
}: {
  total: string;
  cartItems: CartItem[];
  currency?: string;
  returnUrl: string;
  cancelUrl: string;
}) {
  const token = await getAccessToken();
  console.log("The total is: " + total);
  const items = cartItems.map((item) => ({
    name: item.offer.title,                      // item title
    // description: item.offer.description,         // optional description
    unit_amount: {
      currency_code: currency,
      value: item.selectedTier.price.toFixed(2),
    },
    quantity: item.quantity.toString(),
    sku: item.id,
  }));

  const body = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: total,
          breakdown: {
            item_total: {
              currency_code: currency,
              value: total,
            },
          },
        },
        items,
      },
    ],
    application_context: {
      return_url: returnUrl,
      cancel_url: cancelUrl,
    },
  };

  const res = await fetch(`${baseUrl}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

export async function captureOrder(orderId: string) {

  try {

    const token = await getAccessToken();
    const res = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data));
    return data;
  }
  catch (err) {
    console.log("Error at the creator-order");
    return (err as { message: string }).message;
  }
}
