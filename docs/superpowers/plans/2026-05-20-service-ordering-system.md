# Service Ordering System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all `app.hawiyat.org` links with `/services`, add an Order model to the database, create an API route for order submission, and build an order form modal on the services page.

**Architecture:** New `Order` model in Prisma schema. POST API route at `/api/orders` validates and persists orders. Services page gets a modal form triggered by "Get Started" buttons. All CTAs across the site redirect to `/services` instead of `app.hawiyat.org`.

**Tech Stack:** Next.js 14 (App Router) • Prisma • PostgreSQL • TypeScript • Tailwind CSS • shadcn/ui

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `prisma/schema.prisma` | Modify | Add `Order` model + `OrderStatus` enum |
| `app/api/orders/route.ts` | Create | POST handler for order submission |
| `components/services/order-form.tsx` | Create | Reusable order form modal component |
| `app/services/page.tsx` | Modify | Wire up order form, update card links |
| `components/header.tsx` | Modify | Change CTA from `app.hawiyat.org` to `/services` |
| `components/pricing.tsx` | Modify | Change "Get Started" link to `/services` |
| `components/build-ai-apps.tsx` | Modify | Change CTA link to `/services` |
| `components/call-to-action.tsx` | Modify | Change "Deploy APP" link to `/services` |
| `components/one-subscription.tsx` | Modify | Change "Start Now" link to `/services` |
| `components/ai-playground.tsx` | Modify | Change all `app.hawiyat.org` links to `/services` |
| `app/layout.tsx` | Modify | Update `APP_URL` constant if referenced |

---

### Task 1: Add Order Model to Prisma Schema

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add OrderStatus enum and Order model**

Add after the `VerificationCode` model (around line 148):

```prisma
enum OrderStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}

model Order {
  id            String      @id @default(cuid())
  serviceId     String      @map("service_id")
  serviceName   String      @map("service_name")
  customerName  String      @map("customer_name")
  customerEmail String      @map("customer_email")
  customerPhone String?     @map("customer_phone")
  notes         String?     @db.Text
  status        OrderStatus @default(PENDING)
  createdAt     DateTime    @default(now()) @map("created_at")
  updatedAt     DateTime    @updatedAt @map("updated_at")
  
  @@index([customerEmail])
  @@index([status])
  @@index([serviceId])
  @@map("orders")
}
```

- [ ] **Step 2: Push schema to database and regenerate Prisma client**

Run:
```bash
pnpm db:push
```

Expected: Schema pushed successfully, Prisma client regenerated.

- [ ] **Step 3: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: add Order model and OrderStatus enum to schema"
```

---

### Task 2: Create Order API Route

**Files:**
- Create: `app/api/orders/route.ts`

- [ ] **Step 1: Write the API route**

Create `app/api/orders/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prismaClient"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { serviceId, serviceName, customerName, customerEmail, customerPhone, notes } = body

    if (!serviceId || !serviceName || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields: serviceId, serviceName, customerName, customerEmail" },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    const order = await prisma.order.create({
      data: {
        serviceId,
        serviceName,
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        notes: notes || null,
      },
    })

    return NextResponse.json(
      { success: true, order: { id: order.id, status: order.status, createdAt: order.createdAt } },
      { status: 201 }
    )
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 2: Test the API route manually**

Start dev server:
```bash
pnpm dev
```

In another terminal:
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"serviceId":"n8n","serviceName":"n8n Hosting","customerName":"Test User","customerEmail":"test@example.com"}'
```

Expected: `{"success":true,"order":{"id":"...","status":"PENDING","createdAt":"..."}}` with status 201.

Test validation (missing fields):
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"serviceId":"n8n"}'
```

Expected: `{"error":"Missing required fields..."}` with status 400.

- [ ] **Step 3: Commit**

```bash
git add app/api/orders/route.ts
git commit -m "feat: add POST /api/orders route with validation"
```

---

### Task 3: Create Order Form Modal Component

**Files:**
- Create: `components/services/order-form.tsx`

- [ ] **Step 1: Create the order form modal component**

Create `components/services/order-form.tsx`:

```typescript
"use client"

import { useState } from "react"
import { X, Loader2, CheckCircle2 } from "lucide-react"

interface OrderFormProps {
  service: {
    id: string
    name: string
    price: string
    priceLabel: string
  }
  onClose: () => void
}

export function OrderForm({ service, onClose }: OrderFormProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.name,
          ...formData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit order")
      }

      setOrderId(data.order.id)
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-border/60 bg-background shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Success state */
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Order Submitted!</h3>
            <p className="text-muted-foreground text-sm mb-1">
              Thank you, {formData.customerName}. We&apos;ll contact you at {formData.customerEmail} shortly.
            </p>
            {orderId && (
              <p className="text-xs text-muted-foreground mb-4">Order ID: {orderId}</p>
            )}
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form state */
          <>
            <div className="mb-6">
              <h3 className="text-xl font-semibold">Order {service.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {service.price} {service.priceLabel}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium mb-1">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="customerEmail" className="block text-sm font-medium mb-1">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="customerPhone" className="block text-sm font-medium mb-1">
                  Phone <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="customerPhone"
                  name="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="+213 ..."
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-1">
                  Notes <span className="text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Any additional details..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Order"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/services/order-form.tsx
git commit -m "feat: add OrderForm modal component with validation and success state"
```

---

### Task 4: Wire Up Order Form in Services Page

**Files:**
- Modify: `app/services/page.tsx`

- [ ] **Step 1: Import OrderForm and add state**

At the top of `app/services/page.tsx`, add the import after the existing imports:

```typescript
import { OrderForm } from "@/components/services/order-form"
```

In the `ServicesPage` component, add state for the selected service:

```typescript
const [selectedService, setSelectedService] = useState<{
  id: string
  name: string
  price: string
  priceLabel: string
} | null>(null)
```

- [ ] **Step 2: Update FlipCard to trigger order form**

In the `FlipCard` component, replace the back face CTA `Link` with a button that opens the order form. Find this block (around line 297-306):

```typescript
<Link
  href={service.link}
  target="_blank"
  rel="noreferrer"
  onClick={(e) => e.stopPropagation()}
  className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors duration-200"
>
  {service.cta}
  <ArrowRight className="w-4 h-4" />
</Link>
```

Replace with:

```typescript
<button
  onClick={(e) => {
    e.stopPropagation()
    // We'll use a callback from props
  }}
  className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors duration-200"
>
  {service.cta}
  <ArrowRight className="w-4 h-4" />
</button>
```

Add `onOrderClick` prop to `FlipCard`:

```typescript
function FlipCard({
  service,
  index,
  isMobile,
  isVisible,
  onOrderClick,
}: {
  service: (typeof services)[0]
  index: number
  isMobile: boolean
  isVisible: boolean
  onOrderClick: (service: { id: string; name: string; price: string; priceLabel: string }) => void
}) {
```

Then update the button onClick:

```typescript
<button
  onClick={(e) => {
    e.stopPropagation()
    onOrderClick({
      id: service.id,
      name: service.name,
      price: service.price,
      priceLabel: service.priceLabel,
    })
  }}
  className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors duration-200"
>
  {service.cta}
  <ArrowRight className="w-4 h-4" />
</button>
```

- [ ] **Step 3: Pass onOrderClick from ServicesPage and render OrderForm**

In the grid mapping, update the FlipCard call:

```typescript
<FlipCard
  key={service.id}
  service={service}
  index={i}
  isMobile={isMobile}
  isVisible={isVisible}
  onOrderClick={(svc) => setSelectedService(svc)}
/>
```

After the grid closing tag and before the "Why Choose Hawiyat" section, add:

```typescript
{selectedService && (
  <OrderForm service={selectedService} onClose={() => setSelectedService(null)} />
)}
```

- [ ] **Step 4: Test the flow**

Run `pnpm dev`, navigate to `/services`, click "Get Started" on any card. Verify:
- Modal opens with service name and price
- Form validates required fields
- Submit creates order in DB
- Success state shows with order ID

- [ ] **Step 5: Commit**

```bash
git add app/services/page.tsx
git commit -m "feat: wire up order form modal in services page"
```

---

### Task 5: Update All app.hawiyat.org Links to /services

**Files:**
- Modify: `components/header.tsx`
- Modify: `components/pricing.tsx`
- Modify: `components/build-ai-apps.tsx`
- Modify: `components/call-to-action.tsx`
- Modify: `components/one-subscription.tsx`
- Modify: `components/ai-playground.tsx`

- [ ] **Step 1: Update header.tsx**

In `components/header.tsx`, line 113, change:
```typescript
href={appUrl || "https://app.hawiyat.org/"}
```
to:
```typescript
href="/services"
```

In the mobile CTA (line 197), change `href="#"` to `href="/services"`.

- [ ] **Step 2: Update pricing.tsx**

In `components/pricing.tsx`, line 92, change:
```typescript
<Link href={appUrl} target="_blank" rel="noreferrer">Get Started</Link>
```
to:
```typescript
<Link href="/services">Get Started</Link>
```

Remove the `appUrl` variable on line 15 since it's no longer needed.

- [ ] **Step 3: Update build-ai-apps.tsx**

In `components/build-ai-apps.tsx`, line 26, change:
```typescript
href={appUrl || "https://app.hawiyat.org/"}
```
to:
```typescript
href="/services"
```

Change button text from "Explore Hawiyat Cloud" to "Explore Services".

Remove the `appUrl` variable on line 4 since it's no longer needed.

- [ ] **Step 4: Update call-to-action.tsx**

In `components/call-to-action.tsx`, line 53, change:
```typescript
href={appUrl || "https://app.hawiyat.org/"}
```
to:
```typescript
href="/services"
```

Change button text from "Deploy APP" to "Get Started".

Remove the `appUrl` variable on line 3 since it's no longer needed.

- [ ] **Step 5: Update one-subscription.tsx**

In `components/one-subscription.tsx`, line 57, change:
```typescript
href={appUrl || "https://app.hawiyat.org/"}
```
to:
```typescript
href="/services"
```

Remove the `appUrl` variable on line 3 since it's no longer needed.

- [ ] **Step 6: Update ai-playground.tsx**

In `components/ai-playground.tsx`, replace ALL occurrences of `https://app.hawiyat.org/` with `/services`:

- Line 198: `<a href="/services" className="btn">`
- Line 216: `<a href="/services" className="flex rounded-sm gap-2 p-2 ...">`
- Line 220: `<a href="/services" className="flex rounded-sm gap-2 p-2 ...">`
- Line 224: `<a href="/services" className="flex rounded-sm gap-2 p-2 ...">`
- Line 228: `<a href="/services" className="flex rounded-sm group gap-2 p-2 ...">`
- Line 236: `<a href="/services" className="btn !w-full py-2 ...">`

- [ ] **Step 7: Verify no remaining app.hawiyat.org links in components**

Run:
```bash
grep -r "app\.hawiyat\.org" components/ app/ --include="*.tsx" --include="*.ts"
```

Expected: Only matches should be in `app/layout.tsx` (the `APP_URL` constant for metadata)  not in any clickable links.

- [ ] **Step 8: Commit all link changes together**

```bash
git add components/header.tsx components/pricing.tsx components/build-ai-apps.tsx components/call-to-action.tsx components/one-subscription.tsx components/ai-playground.tsx
git commit -m "refactor: replace all app.hawiyat.org links with /services"
```

---

### Task 6: Build Verification

- [ ] **Step 1: Run the build**

```bash
pnpm build
```

Expected: Build completes successfully with no errors.

- [ ] **Step 2: Run lint**

```bash
pnpm lint
```

Expected: No blocking errors.

- [ ] **Step 3: Final commit**

```bash
git push
```
