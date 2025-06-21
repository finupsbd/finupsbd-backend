/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `BusinessGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `fatherOrHusbandName` on the `BusinessGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `BusinessGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `loanApplicationFormId` on the `BusinessGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `motherName` on the `BusinessGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `nationalIdNumber` on the `BusinessGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `BusinessGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `permanentAddress` on the `BusinessGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `presentAddress` on the `BusinessGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `relationWithApplicant` on the `BusinessGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `workAddress` on the `BusinessGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `businessAddress` on the `EmploymentInformation` table. All the data in the column will be lost.
  - You are about to drop the column `businessName` on the `EmploymentInformation` table. All the data in the column will be lost.
  - You are about to drop the column `businessOwnerType` on the `EmploymentInformation` table. All the data in the column will be lost.
  - You are about to drop the column `businessRegistrationNumber` on the `EmploymentInformation` table. All the data in the column will be lost.
  - You are about to drop the column `businessType` on the `EmploymentInformation` table. All the data in the column will be lost.
  - You are about to drop the column `sharePortion` on the `EmploymentInformation` table. All the data in the column will be lost.
  - You are about to drop the column `tradeLicenseAge` on the `EmploymentInformation` table. All the data in the column will be lost.
  - You are about to drop the column `accountNumber` on the `LoanInfo` table. All the data in the column will be lost.
  - You are about to drop the column `bankName` on the `LoanInfo` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `PersonalGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `fatherOrHusbandName` on the `PersonalGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `PersonalGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `loanApplicationFormId` on the `PersonalGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `motherName` on the `PersonalGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `nationalIdNumber` on the `PersonalGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `PersonalGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `permanentAddress` on the `PersonalGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `presentAddress` on the `PersonalGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `relationWithApplicant` on the `PersonalGuarantor` table. All the data in the column will be lost.
  - You are about to drop the column `workAddress` on the `PersonalGuarantor` table. All the data in the column will be lost.
  - You are about to drop the `GuarantorInfoDocument` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `cardLimit` on the `CreditCardUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `dateOfJoining` to the `EmploymentInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `EmploymentInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `EmploymentInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eTin` to the `EmploymentInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `EmploymentInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentType` to the `EmploymentInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasPreviousOrganization` to the `EmploymentInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTitle` to the `EmploymentInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officialContact` to the `EmploymentInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationAddress` to the `EmploymentInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationName` to the `EmploymentInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceMonths` to the `EmploymentInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceYears` to the `EmploymentInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalExperienceMonths` to the `EmploymentInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalExperienceYears` to the `EmploymentInformation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `employmentStatus` on the `EmploymentInformation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `propertyType` on the `EmploymentInformation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `totalIncome` on table `EmploymentInformation` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `monthlyEMI` to the `ExistingLoanUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outstandingAmount` to the `ExistingLoanUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toBeClosedBeforeDisbursement` to the `ExistingLoanUser` table without a default value. This is not possible if the table is not empty.
  - Made the column `loanApplicationFormId` on table `GuarantorInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PropertyType" ADD VALUE 'APARTMENT';
ALTER TYPE "PropertyType" ADD VALUE 'HOUSE';
ALTER TYPE "PropertyType" ADD VALUE 'OTHER';

-- DropForeignKey
ALTER TABLE "BusinessGuarantor" DROP CONSTRAINT "BusinessGuarantor_loanApplicationFormId_fkey";

-- DropForeignKey
ALTER TABLE "GuarantorInfoDocument" DROP CONSTRAINT "GuarantorInfoDocument_businessGuarantorId_fkey";

-- DropForeignKey
ALTER TABLE "GuarantorInfoDocument" DROP CONSTRAINT "GuarantorInfoDocument_personalGuarantorId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalGuarantor" DROP CONSTRAINT "PersonalGuarantor_loanApplicationFormId_fkey";

-- DropIndex
DROP INDEX "BusinessGuarantor_loanApplicationFormId_key";

-- DropIndex
DROP INDEX "PersonalGuarantor_loanApplicationFormId_key";

-- AlterTable
ALTER TABLE "BusinessGuarantor" DROP COLUMN "dateOfBirth",
DROP COLUMN "fatherOrHusbandName",
DROP COLUMN "fullName",
DROP COLUMN "loanApplicationFormId",
DROP COLUMN "motherName",
DROP COLUMN "nationalIdNumber",
DROP COLUMN "nationality",
DROP COLUMN "permanentAddress",
DROP COLUMN "presentAddress",
DROP COLUMN "relationWithApplicant",
DROP COLUMN "workAddress";

-- AlterTable
ALTER TABLE "CreditCardUser" DROP COLUMN "cardLimit",
ADD COLUMN     "cardLimit" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "EmploymentInformation" DROP COLUMN "businessAddress",
DROP COLUMN "businessName",
DROP COLUMN "businessOwnerType",
DROP COLUMN "businessRegistrationNumber",
DROP COLUMN "businessType",
DROP COLUMN "sharePortion",
DROP COLUMN "tradeLicenseAge",
ADD COLUMN     "dateOfJoining" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "eTin" TEXT NOT NULL,
ADD COLUMN     "employeeId" TEXT NOT NULL,
ADD COLUMN     "employmentType" TEXT NOT NULL,
ADD COLUMN     "hasPreviousOrganization" BOOLEAN NOT NULL,
ADD COLUMN     "jobTitle" TEXT NOT NULL,
ADD COLUMN     "officialContact" TEXT NOT NULL,
ADD COLUMN     "organizationAddress" TEXT NOT NULL,
ADD COLUMN     "organizationName" TEXT NOT NULL,
ADD COLUMN     "previousDesignation" TEXT,
ADD COLUMN     "previousOrganizationName" TEXT,
ADD COLUMN     "previousServiceMonths" INTEGER,
ADD COLUMN     "previousServiceYears" INTEGER,
ADD COLUMN     "serviceMonths" INTEGER NOT NULL,
ADD COLUMN     "serviceYears" INTEGER NOT NULL,
ADD COLUMN     "totalExperienceMonths" INTEGER NOT NULL,
ADD COLUMN     "totalExperienceYears" INTEGER NOT NULL,
DROP COLUMN "employmentStatus",
ADD COLUMN     "employmentStatus" TEXT NOT NULL,
ALTER COLUMN "otherIncome" DROP NOT NULL,
DROP COLUMN "propertyType",
ADD COLUMN     "propertyType" TEXT NOT NULL,
ALTER COLUMN "totalIncome" SET NOT NULL;

-- AlterTable
ALTER TABLE "ExistingLoanUser" ADD COLUMN     "monthlyEMI" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "outstandingAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "toBeClosedBeforeDisbursement" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "GuarantorInfo" ALTER COLUMN "businessGuarantorId" DROP NOT NULL,
ALTER COLUMN "personalGuarantorId" DROP NOT NULL,
ALTER COLUMN "loanApplicationFormId" SET NOT NULL;

-- AlterTable
ALTER TABLE "LoanInfo" DROP COLUMN "accountNumber",
DROP COLUMN "bankName";

-- AlterTable
ALTER TABLE "PersonalGuarantor" DROP COLUMN "dateOfBirth",
DROP COLUMN "fatherOrHusbandName",
DROP COLUMN "fullName",
DROP COLUMN "loanApplicationFormId",
DROP COLUMN "motherName",
DROP COLUMN "nationalIdNumber",
DROP COLUMN "nationality",
DROP COLUMN "permanentAddress",
DROP COLUMN "presentAddress",
DROP COLUMN "relationWithApplicant",
DROP COLUMN "workAddress";

-- AlterTable
ALTER TABLE "loanApplicationForm" ADD COLUMN     "businessGuarantorId" TEXT,
ADD COLUMN     "personalGuarantorId" TEXT;

-- DropTable
DROP TABLE "GuarantorInfoDocument";

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "loanInfoId" TEXT NOT NULL,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "loanApplicationForm" ADD CONSTRAINT "loanApplicationForm_personalGuarantorId_fkey" FOREIGN KEY ("personalGuarantorId") REFERENCES "PersonalGuarantor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loanApplicationForm" ADD CONSTRAINT "loanApplicationForm_businessGuarantorId_fkey" FOREIGN KEY ("businessGuarantorId") REFERENCES "BusinessGuarantor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_loanInfoId_fkey" FOREIGN KEY ("loanInfoId") REFERENCES "LoanInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
