/*
  Warnings:

  - The values [PROPRIETOR,PARTNER,CORPORATION,LLC,COOPERATIVE,JOINT_VENTURE,FRANCHISE] on the enum `BusinessOwnerType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `religion` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residentialStatus` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BusinessOwnerTypeLoan" AS ENUM ('PROPRIETORSHIP', 'PARTNERSHIP', 'LLC', 'CORPORATION', 'OTHER');

-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('WHOLESALE', 'RETAIL', 'SERVICES', 'MANUFACTURING', 'OTHER');

-- CreateEnum
CREATE TYPE "IdentificationType" AS ENUM ('NID', 'PASSPORT');

-- CreateEnum
CREATE TYPE "ResidentialStatus" AS ENUM ('RESIDENT', 'NONRESIDENT', 'TEMPORARYRESIDENT');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('ISLAM', 'HINDUISM', 'CHRISTIANITY', 'BUDDHISM', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "BusinessOwnerType_new" AS ENUM ('PROPRIETORSHIP', 'PARTNERSHIP', 'PUBLIC_LIMITED_COMPANY');
ALTER TABLE "eligibilityCheck" ALTER COLUMN "businessOwnerType" TYPE "BusinessOwnerType_new" USING ("businessOwnerType"::text::"BusinessOwnerType_new");
ALTER TYPE "BusinessOwnerType" RENAME TO "BusinessOwnerType_old";
ALTER TYPE "BusinessOwnerType_new" RENAME TO "BusinessOwnerType";
DROP TYPE "BusinessOwnerType_old";
COMMIT;

-- AlterEnum
ALTER TYPE "Profession" ADD VALUE 'SELF_EMPLOYED';

-- DropForeignKey
ALTER TABLE "PersonalInfo" DROP CONSTRAINT "PersonalInfo_loanApplicationFormId_fkey";

-- DropIndex
DROP INDEX "loanApplicationForm_applicationId_status_idx";

-- AlterTable
ALTER TABLE "PersonalInfo" DROP COLUMN "religion",
ADD COLUMN     "religion" "Religion" NOT NULL,
DROP COLUMN "residentialStatus",
ADD COLUMN     "residentialStatus" "ResidentialStatus" NOT NULL;

-- CreateTable
CREATE TABLE "ResidentialInformation" (
    "id" TEXT NOT NULL,
    "presentAddress" TEXT NOT NULL,
    "presentDistrict" TEXT NOT NULL,
    "presentDivision" TEXT NOT NULL,
    "presentLengthOfStay" TEXT NOT NULL,
    "presentOwnershipStatus" "OwnershipStatus" NOT NULL,
    "presentPostalCode" TEXT NOT NULL,
    "presentThana" TEXT NOT NULL,
    "isPermanentSameAsPresent" BOOLEAN NOT NULL DEFAULT false,
    "permanentAddress" TEXT,
    "permanentDistrict" TEXT,
    "permanentDivision" TEXT,
    "permanentLengthOfStay" TEXT,
    "permanentOwnershipStatus" "OwnershipStatus",
    "permanentThana" TEXT,
    "permanentPostalCode" TEXT,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "ResidentialInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploymentInformation" (
    "id" TEXT NOT NULL,
    "businessAddress" TEXT,
    "businessName" TEXT,
    "businessOwnerType" "BusinessOwnerTypeLoan",
    "businessRegistrationNumber" TEXT,
    "businessType" "BusinessType",
    "employmentStatus" "EmploymentStatus" NOT NULL,
    "grossMonthlyIncome" TEXT NOT NULL,
    "otherIncome" TEXT NOT NULL,
    "propertyType" "PropertyType" NOT NULL,
    "propertyValue" TEXT NOT NULL,
    "rentIncome" TEXT,
    "sharePortion" TEXT,
    "totalIncome" TEXT,
    "tradeLicenseAge" TEXT,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "EmploymentInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanInfo" (
    "id" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "hasCreditCard" BOOLEAN NOT NULL,
    "hasExistingLoan" BOOLEAN NOT NULL,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "LoanInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardUser" (
    "id" TEXT NOT NULL,
    "issuerName" TEXT NOT NULL,
    "cardLimit" TEXT NOT NULL,
    "toBeClosedBeforeDisbursement" BOOLEAN NOT NULL,
    "loanInfoId" TEXT NOT NULL,

    CONSTRAINT "CreditCardUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExistingLoanUser" (
    "id" TEXT NOT NULL,
    "loanType" "LoanType" NOT NULL,
    "otherLoanType" TEXT,
    "lenderName" TEXT NOT NULL,
    "loanInfoId" TEXT NOT NULL,

    CONSTRAINT "ExistingLoanUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanRequest" (
    "id" TEXT NOT NULL,
    "loanAmount" DECIMAL(10,2) NOT NULL,
    "loanTenure" INTEGER NOT NULL,
    "loanPurpose" TEXT NOT NULL,
    "emiStartDate" INTEGER NOT NULL,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "LoanRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResidentialInformation_loanApplicationFormId_key" ON "ResidentialInformation"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentInformation_loanApplicationFormId_key" ON "EmploymentInformation"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanInfo_loanApplicationFormId_key" ON "LoanInfo"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanRequest_loanApplicationFormId_key" ON "LoanRequest"("loanApplicationFormId");

-- CreateIndex
CREATE INDEX "loanApplicationForm_applicationId_status_isActive_isDeleted_idx" ON "loanApplicationForm"("applicationId", "status", "isActive", "isDeleted");

-- AddForeignKey
ALTER TABLE "PersonalInfo" ADD CONSTRAINT "PersonalInfo_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResidentialInformation" ADD CONSTRAINT "ResidentialInformation_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentInformation" ADD CONSTRAINT "EmploymentInformation_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanInfo" ADD CONSTRAINT "LoanInfo_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCardUser" ADD CONSTRAINT "CreditCardUser_loanInfoId_fkey" FOREIGN KEY ("loanInfoId") REFERENCES "LoanInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExistingLoanUser" ADD CONSTRAINT "ExistingLoanUser_loanInfoId_fkey" FOREIGN KEY ("loanInfoId") REFERENCES "LoanInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanRequest" ADD CONSTRAINT "LoanRequest_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
