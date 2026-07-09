/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Group` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PayoutSequence" AS ENUM ('RANDOM', 'MANUAL', 'VOTING');

-- DropIndex
DROP INDEX "Group_name_startDate_key";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "payoutSequence" "PayoutSequence" NOT NULL DEFAULT 'RANDOM';

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");
