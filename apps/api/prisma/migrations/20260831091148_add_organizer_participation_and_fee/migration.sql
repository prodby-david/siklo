-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "isOrganizerParticipating" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "organizerFeeAmount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "organizerFeeAmount" INTEGER NOT NULL DEFAULT 0;
