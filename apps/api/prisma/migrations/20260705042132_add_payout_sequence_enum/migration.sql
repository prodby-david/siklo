/*
  Warnings:

  - The values [VOTING] on the enum `PayoutSequence` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PayoutSequence_new" AS ENUM ('RANDOM', 'MANUAL', 'FREECHOOSING');
ALTER TABLE "public"."Group" ALTER COLUMN "payoutSequence" DROP DEFAULT;
ALTER TABLE "Group" ALTER COLUMN "payoutSequence" TYPE "PayoutSequence_new" USING ("payoutSequence"::text::"PayoutSequence_new");
ALTER TYPE "PayoutSequence" RENAME TO "PayoutSequence_old";
ALTER TYPE "PayoutSequence_new" RENAME TO "PayoutSequence";
DROP TYPE "public"."PayoutSequence_old";
ALTER TABLE "Group" ALTER COLUMN "payoutSequence" SET DEFAULT 'RANDOM';
COMMIT;
