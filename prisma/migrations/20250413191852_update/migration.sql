/*
  Warnings:

  - A unique constraint covering the columns `[applicationId]` on the table `LoanApplicationForm` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "LoanApplicationForm" ADD COLUMN     "applicationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "LoanApplicationForm_applicationId_key" ON "LoanApplicationForm"("applicationId");
