-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('E_WALLET', 'BANK_TRANSFER', 'CASH');

-- CreateEnum
CREATE TYPE "BackupFundAction" AS ENUM ('EQUAL_REFUND', 'CARRY_OVER', 'ORGANIZER_REWARD');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- AlterEnum
ALTER TYPE "ActivityType" ADD VALUE 'PAYMENT_REJECTED';

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "allowedPaymentMethods" "PaymentMethodType"[],
ADD COLUMN     "backupFundAction" "BackupFundAction" DEFAULT 'EQUAL_REFUND',
ADD COLUMN     "backupFundPerTurn" INTEGER DEFAULT 0,
ADD COLUMN     "enableBackupFund" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "gracePeriodDays" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "latePenaltyAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "paymentDetails" TEXT;

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "paymentAccountDetails" TEXT,
ADD COLUMN     "preferredPaymentMethod" "PaymentMethodType";

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentMethod" "PaymentMethodType" NOT NULL,
    "baseAmount" INTEGER NOT NULL,
    "penaltyAmount" INTEGER NOT NULL DEFAULT 0,
    "backupFundAmount" INTEGER NOT NULL DEFAULT 0,
    "totalAmount" INTEGER NOT NULL,
    "referenceNumber" TEXT,
    "proofUrl" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "rejectionProofUrl" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
