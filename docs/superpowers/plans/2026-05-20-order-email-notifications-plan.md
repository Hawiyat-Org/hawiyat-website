# Order Email Notifications Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Send email notifications to admins and customers when an order is placed

**Architecture:** Add two email functions to existing `lib/email-utils.ts` using nodemailer + juice for CSS inlining, then call them from the orders API route after order creation

**Tech Stack:** nodemailer, juice, Next.js API routes, TypeScript

**Files to modify:**
- `lib/email-utils.ts`  add `sendOrderNotification` and `sendOrderConfirmation` functions
- `app/api/orders/route.ts`  import and call email functions after order creation

---

### Task 1: Add `sendOrderNotification` function for admin emails

**Files:**
- Modify: `lib/email-utils.ts`

- [ ] **Step 1: Add the admin notification email function**

Add this function at the end of `lib/email-utils.ts`:

```typescript
interface SendOrderNotificationProps {
  order: {
    id: string;
    serviceId: string;
    serviceName: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string | null;
    notes?: string | null;
    status: string;
    createdAt: Date;
  };
}

const ADMIN_EMAILS = ['a_kadache@estin.dz', 'b_bouabca@estin.dz'];

export async function sendOrderNotification({
  order
}: SendOrderNotificationProps): Promise<boolean> {
  try {
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      console.error('Missing SMTP configuration in environment variables');
      return false;
    }

    const transporter = createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    const htmlTemplate = `
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .container { background-color: #f8fafc; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0; }
        h1 { color: #1e293b; text-align: center; }
        .card { background-color: white; padding: 25px; border-radius: 8px; margin-top: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        h2 { color: #334155; margin-top: 0; }
        .details { background-color: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0; }
        h3 { color: #1e293b; margin-top: 0; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 8px 0; }
        .label { color: #64748b; }
        .value { color: #1e293b; font-weight: 500; }
        .footer { text-align: center; margin-top: 30px; color: #94a3b8; font-size: 14px; }
      </style>
      <div class="container">
        <h1>New Order Received</h1>
        <div class="card">
          <h2>Hello Admin,</h2>
          <p style="color: #475569; line-height: 1.6;">A new order has been placed.</p>
          <div class="details">
            <h3>Order Details</h3>
            <table>
              <tr><td class="label">Order ID:</td><td class="value">${order.id}</td></tr>
              <tr><td class="label">Service:</td><td class="value">${order.serviceName}</td></tr>
              <tr><td class="label">Customer:</td><td class="value">${order.customerName}</td></tr>
              <tr><td class="label">Email:</td><td class="value"><a href="mailto:${order.customerEmail}">${order.customerEmail}</a></td></tr>
              ${order.customerPhone ? `<tr><td class="label">Phone:</td><td class="value">${order.customerPhone}</td></tr>` : ''}
              <tr><td class="label">Status:</td><td class="value">${order.status}</td></tr>
              <tr><td class="label">Date:</td><td class="value">${new Date(order.createdAt).toLocaleString()}</td></tr>
              ${order.notes ? `<tr><td class="label">Notes:</td><td class="value">${order.notes}</td></tr>` : ''}
            </table>
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Hawiyat. All rights reserved.</p>
        </div>
      </div>
    `;

    const inlinedHtml = juice(htmlTemplate);

    const textContent = `
New Order Received

Order ID: ${order.id}
Service: ${order.serviceName}
Customer: ${order.customerName}
Email: ${order.customerEmail}
${order.customerPhone ? `Phone: ${order.customerPhone}\n` : ''}Status: ${order.status}
Date: ${new Date(order.createdAt).toLocaleString()}
${order.notes ? `Notes: ${order.notes}\n` : ''}
    `;

    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to: ADMIN_EMAILS.join(', '),
      subject: `New Order: ${order.serviceName} from ${order.customerName}`,
      text: textContent,
      html: inlinedHtml
    });

    console.log('Admin notification sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return false;
  }
}
```

- [ ] **Step 2: Add juice import at top of file**

Add `import juice from 'juice';` at the top of `lib/email-utils.ts` alongside the existing nodemailer import.

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit lib/email-utils.ts`
Expected: No errors (or only pre-existing errors unrelated to new code)

- [ ] **Step 4: Commit**

```bash
git add lib/email-utils.ts
git commit -m "feat: add sendOrderNotification email function"
```

---

### Task 2: Add `sendOrderConfirmation` function for customer emails

**Files:**
- Modify: `lib/email-utils.ts`

- [ ] **Step 1: Add the customer confirmation email function**

Add this function after `sendOrderNotification` in `lib/email-utils.ts`:

```typescript
interface SendOrderConfirmationProps {
  to: string;
  order: {
    id: string;
    serviceName: string;
    customerName: string;
    notes?: string | null;
    createdAt: Date;
  };
}

export async function sendOrderConfirmation({
  to,
  order
}: SendOrderConfirmationProps): Promise<boolean> {
  try {
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      console.error('Missing SMTP configuration in environment variables');
      return false;
    }

    const transporter = createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    const htmlTemplate = `
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .container { background-color: #f8fafc; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0; }
        h1 { color: #1e293b; text-align: center; }
        .card { background-color: white; padding: 25px; border-radius: 8px; margin-top: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        h2 { color: #334155; margin-top: 0; }
        .details { background-color: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0; }
        h3 { color: #1e293b; margin-top: 0; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 8px 0; }
        .label { color: #64748b; }
        .value { color: #1e293b; font-weight: 500; }
        .info-box { background-color: #fffbeb; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 20px 0; }
        .info-box p { color: #92400e; margin: 0; line-height: 1.6; }
        .footer { text-align: center; margin-top: 30px; color: #94a3b8; font-size: 14px; }
        a { color: #3b82f6; }
      </style>
      <div class="container">
        <h1>Order Received</h1>
        <div class="card">
          <h2>Hello ${order.customerName},</h2>
          <p style="color: #475569; line-height: 1.6;">Thank you for your order! We have received it and will contact you shortly.</p>
          <div class="details">
            <h3>Order Summary</h3>
            <table>
              <tr><td class="label">Order ID:</td><td class="value">${order.id}</td></tr>
              <tr><td class="label">Service:</td><td class="value">${order.serviceName}</td></tr>
              <tr><td class="label">Date:</td><td class="value">${new Date(order.createdAt).toLocaleString()}</td></tr>
            </table>
          </div>
          <div class="info-box">
            <p style="font-weight: 500;">What's next?</p>
            <p style="margin-top: 10px;">Our team will review your order and contact you at <a href="mailto:${to}">${to}</a> with the next steps.</p>
          </div>
          <p style="color: #475569; line-height: 1.6;">If you have any questions, please contact us at <a href="mailto:contact@hawiyat.org">contact@hawiyat.org</a>.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Hawiyat. All rights reserved.</p>
        </div>
      </div>
    `;

    const inlinedHtml = juice(htmlTemplate);

    const textContent = `
Order Received - ${order.serviceName}

Hello ${order.customerName},

Thank you for your order! We have received it and will contact you shortly.

Order Summary:
Order ID: ${order.id}
Service: ${order.serviceName}
Date: ${new Date(order.createdAt).toLocaleString()}

What's next?
Our team will review your order and contact you at ${to} with the next steps.

If you have any questions, please contact us at contact@hawiyat.org.
    `;

    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject: `Order Received - ${order.serviceName} | Hawiyat`,
      text: textContent,
      html: inlinedHtml
    });

    console.log('Customer confirmation sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending customer confirmation:', error);
    return false;
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit lib/email-utils.ts`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add lib/email-utils.ts
git commit -m "feat: add sendOrderConfirmation email function"
```

---

### Task 3: Integrate email functions into orders API route

**Files:**
- Modify: `app/api/orders/route.ts`

- [ ] **Step 1: Add imports for email functions**

At the top of `app/api/orders/route.ts`, add after the prisma import:

```typescript
import { sendOrderNotification, sendOrderConfirmation } from "@/lib/email-utils"
```

- [ ] **Step 2: Call email functions after order creation**

In the `POST` function, after `await sendTelegramNotification(telegramMessage)` (line 70), add:

```typescript
    // Send email notifications (non-blocking)
    sendOrderNotification({ order }).catch(err =>
      console.error("Failed to send admin notification:", err)
    )
    sendOrderConfirmation({
      to: customerEmail,
      order: {
        id: order.id,
        serviceName: order.serviceName,
        customerName: order.customerName,
        notes: order.notes,
        createdAt: order.createdAt,
      },
    }).catch(err =>
      console.error("Failed to send customer confirmation:", err)
    )
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit app/api/orders/route.ts`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add app/api/orders/route.ts
git commit -m "feat: integrate email notifications into orders API"
```

---

### Task 4: Verify build succeeds

- [ ] **Step 1: Run production build**

Run: `pnpm build`
Expected: Build completes successfully

- [ ] **Step 2: Run lint**

Run: `pnpm lint`
Expected: No new errors introduced
