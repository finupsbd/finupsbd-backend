/*
  Warnings:

  - You are about to drop the `TestApplication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestBasicInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestContactInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestProfession` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[loanApplicationFormId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "GuarantorInfoDocument" DROP CONSTRAINT "GuarantorInfoDocument_businessGuarantorId_fkey";

-- DropForeignKey
ALTER TABLE "GuarantorInfoDocument" DROP CONSTRAINT "GuarantorInfoDocument_personalGuarantorId_fkey";

-- DropForeignKey
ALTER TABLE "TestApplication" DROP CONSTRAINT "TestApplication_userId_fkey";

-- DropForeignKey
ALTER TABLE "TestBasicInfo" DROP CONSTRAINT "TestBasicInfo_testApplicationId_fkey";

-- DropForeignKey
ALTER TABLE "TestContactInfo" DROP CONSTRAINT "TestContactInfo_testApplicationId_fkey";

-- DropForeignKey
ALTER TABLE "TestProfession" DROP CONSTRAINT "TestProfession_testApplicationId_fkey";

-- DropTable
DROP TABLE "TestApplication";

-- DropTable
DROP TABLE "TestBasicInfo";

-- DropTable
DROP TABLE "TestContactInfo";

-- DropTable
DROP TABLE "TestProfession";

-- CreateIndex
CREATE UNIQUE INDEX "Document_loanApplicationFormId_key" ON "Document"("loanApplicationFormId");

-- AddForeignKey
ALTER TABLE "GuarantorInfoDocument" ADD CONSTRAINT "GuarantorInfoDocument_personalGuarantorId_fkey" FOREIGN KEY ("personalGuarantorId") REFERENCES "PersonalGuarantor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuarantorInfoDocument" ADD CONSTRAINT "GuarantorInfoDocument_businessGuarantorId_fkey" FOREIGN KEY ("businessGuarantorId") REFERENCES "BusinessGuarantor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
