-- AlterEnum
ALTER TYPE "ActivityType" ADD VALUE 'ANNOUNCEMENT';

-- DropIndex
DROP INDEX "Activity_userId_groupId_key";

-- CreateIndex
CREATE INDEX "Activity_groupId_idx" ON "Activity"("groupId");

-- CreateIndex
CREATE INDEX "Activity_userId_idx" ON "Activity"("userId");
