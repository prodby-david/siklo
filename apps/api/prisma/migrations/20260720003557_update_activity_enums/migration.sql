/*
  Warnings:

  - The values [JOINED,LEFT,CREATED] on the enum `ActivityType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ActivityType_new" AS ENUM ('PAYMENT', 'PAYMENT_OVERDUE', 'PAYMENT_VERIFIED', 'PAYOUT_DISBURSED', 'PENALTY_APPLIED', 'CYCLE_STARTED', 'CYCLE_CLOSED', 'ROTATED');
ALTER TABLE "Activity" ALTER COLUMN "activity" TYPE "ActivityType_new" USING ("activity"::text::"ActivityType_new");
ALTER TYPE "ActivityType" RENAME TO "ActivityType_old";
ALTER TYPE "ActivityType_new" RENAME TO "ActivityType";
DROP TYPE "public"."ActivityType_old";
COMMIT;
