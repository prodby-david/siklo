/*
  Warnings:

  - You are about to drop the column `activity` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `notificationType` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('PAYMENT', 'PAYOUT', 'REMINDER', 'ANNOUNCEMENT', 'SYSTEM');

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "activity",
ADD COLUMN     "notificationType" "NotificationType" NOT NULL;
