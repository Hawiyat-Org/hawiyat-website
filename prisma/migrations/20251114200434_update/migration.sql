/*
  Warnings:

  - You are about to drop the column `scheduleAvailabilityId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the `blocked_slots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedule_availability` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_scheduleAvailabilityId_fkey";

-- DropForeignKey
ALTER TABLE "schedule_availability" DROP CONSTRAINT "schedule_availability_serviceId_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "scheduleAvailabilityId",
ALTER COLUMN "status" SET DEFAULT 'CONFIRMED';

-- DropTable
DROP TABLE "blocked_slots";

-- DropTable
DROP TABLE "schedule_availability";

-- CreateTable
CREATE TABLE "business_hours" (
    "id" TEXT NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "is_open" BOOLEAN NOT NULL DEFAULT true,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blocked_dates" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "start_time" TEXT,
    "end_time" TEXT,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blocked_dates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_hours_day_of_week_key" ON "business_hours"("day_of_week");

-- CreateIndex
CREATE INDEX "blocked_dates_date_idx" ON "blocked_dates"("date");
