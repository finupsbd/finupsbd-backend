-- DropIndex
DROP INDEX "applicationFrom_personalLoanId_key";

-- AlterTable
ALTER TABLE "applicationFrom" ALTER COLUMN "personalLoanId" DROP NOT NULL;
