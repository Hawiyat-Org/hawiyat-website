// lib/prisma/seed.ts
import { prisma } from "./prismaClient"

// No seed data required for the marketing site. `pnpm db:reset` runs
// `prisma migrate reset` + this file; a clean DB needs no bootstrap data.
// Re-add seed logic here if the client dashboard needs reference rows.
async function main() {
  // intentionally empty
  console.log("Seed complete (no data required)")
}

main().finally(() => prisma.$disconnect())
