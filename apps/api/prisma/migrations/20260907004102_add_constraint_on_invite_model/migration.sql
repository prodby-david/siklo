/*
  Warnings:

  - A unique constraint covering the columns `[groupId,inviteeId]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_groupId_fkey";

-- CreateIndex
CREATE INDEX "Invite_organizerId_idx" ON "Invite"("organizerId");

-- CreateIndex
CREATE INDEX "Invite_inviteeId_status_idx" ON "Invite"("inviteeId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Invite_groupId_inviteeId_key" ON "Invite"("groupId", "inviteeId");

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
