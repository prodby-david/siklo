/*
  Warnings:

  - You are about to drop the column `totalPayout` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inviteCode]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId,cycleNumber,roundNumber]` on the table `Round` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,contactNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inviteCode` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxMembers` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizerId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cycleNumber` to the `Round` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientId` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Round_groupId_roundNumber_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "totalPayout",
ADD COLUMN     "inviteCode" TEXT NOT NULL,
ADD COLUMN     "maxMembers" INTEGER NOT NULL,
ADD COLUMN     "organizerId" TEXT NOT NULL,
ALTER COLUMN "billingCycle" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "cycleNumber" INTEGER NOT NULL,
ADD COLUMN     "recipientId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_inviteCode_key" ON "Group"("inviteCode");

-- CreateIndex
CREATE UNIQUE INDEX "Round_groupId_cycleNumber_roundNumber_key" ON "Round"("groupId", "cycleNumber", "roundNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_contactNumber_key" ON "User"("email", "contactNumber");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
