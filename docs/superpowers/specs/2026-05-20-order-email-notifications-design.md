# Order Email Notifications Design

**Date:** 2026-05-20

## Overview

Add email notifications when a customer places an order via the services page. Two emails are sent:
1. **Admin notification**  to `a_kadache@estin.dz` and `b_bouabca@estin.dz`
2. **Customer confirmation**  to the customer's email address

## Architecture

### Email Functions (`lib/email-utils.ts`)

Add two new functions:

- `sendOrderNotification(order)`  sends order details to both admin emails
- `sendOrderConfirmation(order)`  sends order confirmation to customer

Both use `nodemailer` for SMTP transport (Gmail) and `juice` for CSS inlining to ensure email client compatibility.

### Integration (`app/api/orders/route.ts`)

After successful order creation, call both email functions. Calls are fire-and-forget (non-blocking) so email delays don't slow the API response. Email failures are logged but don't prevent order creation.

## Email Content

### Admin Notification
- **Subject:** `New Order: [serviceName] from [customerName]`
- **Content:** Service name, customer name/email/phone, notes, order ID, creation date, status

### Customer Confirmation
- **Subject:** `Order Received - [serviceName] | Hawiyat`
- **Content:** Thank you message, order summary (service, order ID), note that team will contact them soon, support email

## Error Handling

- Email failures logged with `console.error`
- Order creation succeeds regardless of email status
- Matches existing Telegram notification pattern

## Dependencies

- `nodemailer`  already installed
- `juice`  new dependency for CSS inlining

## Files Changed

1. `lib/email-utils.ts`  add `sendOrderNotification` and `sendOrderConfirmation`
2. `app/api/orders/route.ts`  call email functions after order creation
3. `package.json`  add `juice` dependency
