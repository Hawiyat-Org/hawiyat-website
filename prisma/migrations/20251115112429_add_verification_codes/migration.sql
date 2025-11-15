-- CreateTable
CREATE TABLE "public"."VerificationCode" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_email_key" ON "public"."VerificationCode"("email");

-- CreateIndex
CREATE INDEX "VerificationCode_email_idx" ON "public"."VerificationCode"("email");
