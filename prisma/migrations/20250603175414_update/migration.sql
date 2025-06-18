/*
  Warnings:

  - Made the column `loanApplicationFormId` on table `BusinessGuarantor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `loanApplicationFormId` on table `PersonalGuarantor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BusinessGuarantor" ALTER COLUMN "loanApplicationFormId" SET NOT NULL;

-- AlterTable
ALTER TABLE "PersonalGuarantor" ALTER COLUMN "loanApplicationFormId" SET NOT NULL;
