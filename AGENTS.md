# Hawiyat Website - Agent Guide

## Quick Commands

```bash
pnpm dev                    # Dev server (localhost:3000)
pnpm build                  # Production build (runs prisma generate)
pnpm lint                   # Next.js linting
pnpm db:push                # Push schema to DB + seed
pnpm db:reset               # Reset DB + seed
pnpm prisma generate        # Generate Prisma client only
```

## Architecture

**Stack:** Next.js 14 (App Router) • React 18 • TypeScript • Tailwind CSS • Prisma • PostgreSQL • shadcn/ui

**Key directories:**
- `app/` - Pages and API routes (`app/api/*`)
- `components/` - UI components (feature-based organization)
- `lib/` - Utilities (Prisma client, auth, email helpers)
- `prisma/` - Schema and migrations

## Critical Conventions

### Prisma Import Pattern
Always use **named import** for the Prisma client:
```typescript
import { prisma } from '@/lib/prisma/prismaClient'  // ✓ Correct
import prisma from '@/lib/prisma/prismaClient'     // ✗ Causes undefined errors
```

### Path Aliases
- `@/*` maps to root directory (configured in `tsconfig.json`)
- Components: `@/components/*`
- Utils: `@/lib/*`

### shadcn/ui Components
- Located in `components/ui/`
- Use `cn()` utility from `@/lib/utils` for className merging
- Dark mode via `class` strategy (not media query)

## Environment Variables Required

```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
NEXT_PUBLIC_APP_NAME=Hawiyat
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_CHATWOOT_TOKEN=your-token
GEMINI_API_KEY=your-key
```

Copy `.env.example` to `.env` if it exists, or create from scratch.

## Database & Booking System

The app includes a booking/scheduling system with:
- **Models:** `Booking`, `Service`, `BusinessHours`, `BlockedDate`, `VerificationCode`, `Waitlist`
- **API routes:** `/api/schedule/*` (availability, bookings, verification)
- **Friday is CLOSED** by default (configured in `BusinessHours` model)

## Services Section

The `/services` page showcases 5 managed services:
- n8n Hosting
- Claude Code
- Hawiyat WhatsApp API
- Hawiyat Monitoring
- Evolution API

Services are defined as static data in `app/services/page.tsx`. To add/modify services, edit the `services` array.

### Testing Email Utilities
```bash
npx tsx test/email-test.ts
```

## Build Artifacts

Prisma client is auto-generated during `pnpm build`. Never commit `.prisma/client/` - it's gitignored.

## Testing

No formal test suite exists. Manual testing via:
- Dev server for UI changes
- API endpoints via curl/Postman
- Email test script for notification logic

## Gotchas

1. **TypeScript/ESLint errors ignored in builds** (`next.config.mjs`) - fix errors, don't ignore
2. **Images:** `unoptimized: true` allows external images without optimization
3. **GSAP:** Optimized import in `next.config.mjs` for scroll animations
4. **Fonts:** 4 Google fonts loaded via `next/font` with CSS variables

## Files to Read First

1. `DESIGN.md` - Comprehensive design system and component specs
2. `QWEN.md` - Project overview and setup instructions
3. `prisma/schema.prisma` - Data models and relationships
4. `app/layout.tsx` - Metadata, fonts, theme provider setup
