-- CreateTable
-- Operator-managed exemption from the disposable-domain blocklist.
-- A row here means "allow this email domain through", so a customer wrongly
-- caught by the third-party blocklist can be unblocked without a redeploy.
-- IF NOT EXISTS keeps this safe for databases that already created the table
-- via `prisma db push` (this repo has no baseline migration for `orders`).
CREATE TABLE IF NOT EXISTS "email_domain_allowlist" (
    "domain" TEXT NOT NULL,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_domain_allowlist_pkey" PRIMARY KEY ("domain")
);
