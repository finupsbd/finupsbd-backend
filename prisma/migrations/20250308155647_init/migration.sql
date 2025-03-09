/*
  Warnings:

  - You are about to drop the `FinancialObligations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LoanSpecifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `loanApplications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permanentAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `presentAddress` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[applicationFormId]` on the table `EmploymentFinancialInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `applicationFormId` to the `EmploymentFinancialInfo` table without a default value. This is not possible if the table is not empty.
  - Made the column `department` on table `EmploymentFinancialInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profession` on table `EmploymentFinancialInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PASSPORT_PHOTO', 'NATIONAL_ID', 'BIRTH_CERTIFICATE', 'INCOME_PROOF', 'BANK_STATEMENT', 'TIN_CERTIFICATE', 'EMPLOYMENT_PROOF', 'UTILITY_BILL', 'PROPERTY_DOCUMENT', 'SUPPORTING_DOCUMENT');

-- AlterEnum
ALTER TYPE "EmploymentStatus" ADD VALUE 'SELF_EMPLOYED';

-- AlterTable
ALTER TABLE "EmploymentFinancialInfo" ADD COLUMN     "applicationFormId" TEXT NOT NULL,
ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "profession" SET NOT NULL,
ALTER COLUMN "taxIdentificationNumber" DROP NOT NULL,
ALTER COLUMN "currentCreditScore" DROP NOT NULL,
ALTER COLUMN "currentCreditScore" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "FinancialObligations";

-- DropTable
DROP TABLE "LoanSpecifications";

-- DropTable
DROP TABLE "UserInfo";

-- DropTable
DROP TABLE "loanApplications";

-- DropTable
DROP TABLE "permanentAddress";

-- DropTable
DROP TABLE "presentAddress";

-- CreateTable
CREATE TABLE "applicationFrom" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "userId" TEXT,
    "personalLoanId" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "userInfoId" TEXT,
    "currentAddressId" TEXT,
    "permanentAddressId" TEXT,
    "employmentFinancialInfoId" TEXT,
    "loanSpecificationsId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applicationFrom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "houseFlatNo" TEXT NOT NULL,
    "streetRoad" TEXT NOT NULL,
    "areaLocality" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "lengthOfStayYears" INTEGER NOT NULL,
    "ownershipStatus" "OwnershipStatus" NOT NULL,
    "applicationFormId" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationUserInfo" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "spouseName" TEXT,
    "dateOfBirth" TEXT NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "nid" TEXT NOT NULL,
    "birthRegistration" TEXT,
    "mobileNumber" TEXT NOT NULL,
    "alternateNumber" TEXT,
    "emailAddress" TEXT NOT NULL,
    "socialMediaLinks" TEXT[],
    "propertyType" "PropertyType" NOT NULL,
    "approximateValue" DOUBLE PRECISION NOT NULL,
    "applicationFormId" TEXT NOT NULL,

    CONSTRAINT "ApplicationUserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanRequestSpecifications" (
    "id" TEXT NOT NULL,
    "loanType" "LoanType" NOT NULL,
    "loanAmountRequested" DOUBLE PRECISION NOT NULL,
    "purposeOfLoan" TEXT NOT NULL,
    "preferredLoanTenure" INTEGER NOT NULL,
    "proposedEMIStartDate" TIMESTAMP(3),
    "repaymentPreferences" TEXT NOT NULL,
    "applicationFormId" TEXT NOT NULL,

    CONSTRAINT "LoanRequestSpecifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialObligation" (
    "id" TEXT NOT NULL,
    "lenderName" TEXT NOT NULL,
    "loanBalance" DOUBLE PRECISION NOT NULL,
    "monthlyEMI" DOUBLE PRECISION NOT NULL,
    "remainingTenure" INTEGER NOT NULL,
    "cardIssuer" TEXT,
    "currentBalance" DOUBLE PRECISION,
    "minimumMonthlyPayment" DOUBLE PRECISION,
    "obligationType" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "emi" DOUBLE PRECISION NOT NULL,
    "applicationFormId" TEXT NOT NULL,

    CONSTRAINT "FinancialObligation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentFile" (
    "id" SERIAL NOT NULL,
    "type" "DocumentType" NOT NULL,
    "filePath" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fileSizeMB" DOUBLE PRECISION,
    "fileType" TEXT,
    "applicationFormId" TEXT NOT NULL,

    CONSTRAINT "DocumentFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "applicationFrom_applicationId_key" ON "applicationFrom"("applicationId");

-- CreateIndex
CREATE INDEX "applicationFrom_applicationId_idx" ON "applicationFrom"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_applicationFormId_key" ON "Address"("applicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationUserInfo_applicationFormId_key" ON "ApplicationUserInfo"("applicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanRequestSpecifications_applicationFormId_key" ON "LoanRequestSpecifications"("applicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentFinancialInfo_applicationFormId_key" ON "EmploymentFinancialInfo"("applicationFormId");
