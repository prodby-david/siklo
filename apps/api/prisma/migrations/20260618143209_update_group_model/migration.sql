/*
  Warnings:

  - Added the required column `cycleDuration` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPayout` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('DAILY', 'WEEKLY', 'BIMONTHLY', 'MONTHLY', 'QUARTERLY');

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "billingCycle" "BillingCycle" NOT NULL DEFAULT 'DAILY',
ADD COLUMN     "cycleDuration" INTEGER NOT NULL,
ADD COLUMN     "totalPayout" INTEGER NOT NULL;
