/*
  Warnings:

  - Added the required column `updatedAt` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Backfill updatedAt from verification time, falling back to creation time
UPDATE "Payment" SET "updatedAt" = COALESCE("verifiedAt", "createdAt");

-- Drop the temporary default so the database matches the Prisma schema exactly
ALTER TABLE "Payment" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Backfill updatedAt for pre-existing rounds
UPDATE "Round" SET "updatedAt" = CURRENT_TIMESTAMP;

-- Drop the temporary default so the database matches the Prisma schema exactly
ALTER TABLE "Round" ALTER COLUMN "updatedAt" DROP DEFAULT;
