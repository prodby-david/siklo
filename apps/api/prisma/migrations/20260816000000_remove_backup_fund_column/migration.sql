-- AlterTable
ALTER TABLE "Group" DROP COLUMN "backupFundAction",
DROP COLUMN "backupFundPerTurn",
DROP COLUMN "enableBackupFund";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "backupFundAmount";

-- DropEnum
DROP TYPE "BackupFundAction";
