/*
  Warnings:

  - A unique constraint covering the columns `[loanApplicationFormId]` on the table `BusinessGuarantor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[loanApplicationFormId]` on the table `PersonalGuarantor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BusinessGuarantor" ADD COLUMN     "loanApplicationFormId" TEXT;

-- AlterTable
ALTER TABLE "PersonalGuarantor" ADD COLUMN     "loanApplicationFormId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "BusinessGuarantor_loanApplicationFormId_key" ON "BusinessGuarantor"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalGuarantor_loanApplicationFormId_key" ON "PersonalGuarantor"("loanApplicationFormId");

-- AddForeignKey
ALTER TABLE "BusinessGuarantor" ADD CONSTRAINT "BusinessGuarantor_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalGuarantor" ADD CONSTRAINT "PersonalGuarantor_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
