/*
  Warnings:

  - Made the column `applicationId` on table `loanApplicationForm` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "loanApplicationForm" ALTER COLUMN "applicationId" SET NOT NULL;
