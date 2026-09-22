-- CreateEnum
CREATE TYPE "PaymentVerificationSource" AS ENUM ('ORGANIZER_APPROVED', 'ORGANIZER_SELF_ATTESTED');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "verificationSource" "PaymentVerificationSource";
