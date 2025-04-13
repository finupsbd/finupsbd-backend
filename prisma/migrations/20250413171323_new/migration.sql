/*
  Warnings:

  - You are about to drop the column `employmentInfoId` on the `LoanApplicationForm` table. All the data in the column will be lost.
  - You are about to drop the column `guarantorInfoId` on the `LoanApplicationForm` table. All the data in the column will be lost.
  - You are about to drop the column `loanRequestId` on the `LoanApplicationForm` table. All the data in the column will be lost.
  - You are about to drop the column `personalInfoId` on the `LoanApplicationForm` table. All the data in the column will be lost.
  - You are about to drop the column `residentialInfoId` on the `LoanApplicationForm` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[loanApplicationFormId]` on the table `EmploymentInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[loanApplicationFormId]` on the table `GuarantorInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[loanApplicationFormId]` on the table `LoanRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[loanApplicationFormId]` on the table `PersonalInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[loanApplicationFormId]` on the table `ResidentialInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `loanApplicationFormId` to the `EmploymentInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanApplicationFormId` to the `GuarantorInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanApplicationFormId` to the `LoanRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanApplicationFormId` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanApplicationFormId` to the `ResidentialInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "LoanApplicationForm_employmentInfoId_key";

-- DropIndex
DROP INDEX "LoanApplicationForm_guarantorInfoId_key";

-- DropIndex
DROP INDEX "LoanApplicationForm_loanRequestId_key";

-- DropIndex
DROP INDEX "LoanApplicationForm_personalInfoId_key";

-- DropIndex
DROP INDEX "LoanApplicationForm_residentialInfoId_key";

-- AlterTable
ALTER TABLE "EmploymentInfo" ADD COLUMN     "loanApplicationFormId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GuarantorInfo" ADD COLUMN     "loanApplicationFormId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LoanApplicationForm" DROP COLUMN "employmentInfoId",
DROP COLUMN "guarantorInfoId",
DROP COLUMN "loanRequestId",
DROP COLUMN "personalInfoId",
DROP COLUMN "residentialInfoId";

-- AlterTable
ALTER TABLE "LoanRequest" ADD COLUMN     "loanApplicationFormId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PersonalInfo" ADD COLUMN     "loanApplicationFormId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ResidentialInfo" ADD COLUMN     "loanApplicationFormId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentInfo_loanApplicationFormId_key" ON "EmploymentInfo"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "GuarantorInfo_loanApplicationFormId_key" ON "GuarantorInfo"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanRequest_loanApplicationFormId_key" ON "LoanRequest"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInfo_loanApplicationFormId_key" ON "PersonalInfo"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "ResidentialInfo_loanApplicationFormId_key" ON "ResidentialInfo"("loanApplicationFormId");
