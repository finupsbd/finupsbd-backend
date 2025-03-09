/*
  Warnings:

  - You are about to drop the column `LoanType` on the `eligibilityCheck` table. All the data in the column will be lost.
  - Added the required column `loanType` to the `eligibilityCheck` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "eligibilityCheck_LoanType_name_email_phone_idx";

-- AlterTable
ALTER TABLE "eligibilityCheck" DROP COLUMN "LoanType",
ADD COLUMN     "loanType" "MainLoanType" NOT NULL;

-- CreateIndex
CREATE INDEX "eligibilityCheck_loanType_name_email_phone_idx" ON "eligibilityCheck"("loanType", "name", "email", "phone");
