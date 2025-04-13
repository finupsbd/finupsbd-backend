/*
  Warnings:

  - The values [UNDER_REVIEW] on the enum `LoanStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LoanStatus_new" AS ENUM ('SUBMITTED', 'IN_PROCESS', 'PENDING', 'APPROVED', 'REJECTED');
ALTER TABLE "LoanApplicationForm" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "LoanApplicationForm" ALTER COLUMN "status" TYPE "LoanStatus_new" USING ("status"::text::"LoanStatus_new");
ALTER TYPE "LoanStatus" RENAME TO "LoanStatus_old";
ALTER TYPE "LoanStatus_new" RENAME TO "LoanStatus";
DROP TYPE "LoanStatus_old";
ALTER TABLE "LoanApplicationForm" ALTER COLUMN "status" SET DEFAULT 'SUBMITTED';
COMMIT;

-- AlterTable
ALTER TABLE "LoanApplicationForm" ALTER COLUMN "status" SET DEFAULT 'SUBMITTED';
