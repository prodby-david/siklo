/*
  Warnings:

  - A unique constraint covering the columns `[groupId,position]` on the table `Membership` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Membership_groupId_position_key" ON "Membership"("groupId", "position");
