/*
  Warnings:

  - The values [SELF_EMPLOYED] on the enum `EmploymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [male,female,other] on the enum `UserGender` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `applicationFormId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `applicationFormId` on the `EmploymentFinancialInfo` table. All the data in the column will be lost.
  - You are about to alter the column `currentCreditScore` on the `EmploymentFinancialInfo` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the `ApplicationUserInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DocumentFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FinancialObligation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LoanRequestSpecifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `applicationFrom` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `taxIdentificationNumber` on table `EmploymentFinancialInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentCreditScore` on table `EmploymentFinancialInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EmploymentStatus_new" AS ENUM ('SALARIED', 'BUSINESS_OWNER');
ALTER TABLE "EmploymentFinancialInfo" ALTER COLUMN "employmentStatus" TYPE "EmploymentStatus_new" USING ("employmentStatus"::text::"EmploymentStatus_new");
ALTER TYPE "EmploymentStatus" RENAME TO "EmploymentStatus_old";
ALTER TYPE "EmploymentStatus_new" RENAME TO "EmploymentStatus";
DROP TYPE "EmploymentStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserGender_new" AS ENUM ('MALE', 'FEMALE', 'OTHER');
ALTER TABLE "profiles" ALTER COLUMN "gender" TYPE "UserGender_new" USING ("gender"::text::"UserGender_new");
ALTER TYPE "UserGender" RENAME TO "UserGender_old";
ALTER TYPE "UserGender_new" RENAME TO "UserGender";
DROP TYPE "UserGender_old";
COMMIT;

-- DropIndex
DROP INDEX "Address_applicationFormId_key";

-- DropIndex
DROP INDEX "EmploymentFinancialInfo_applicationFormId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "applicationFormId",
ADD COLUMN     "loanApplicationId" TEXT;

-- AlterTable
ALTER TABLE "EmploymentFinancialInfo" DROP COLUMN "applicationFormId",
ALTER COLUMN "department" DROP NOT NULL,
ALTER COLUMN "profession" DROP NOT NULL,
ALTER COLUMN "taxIdentificationNumber" SET NOT NULL,
ALTER COLUMN "currentCreditScore" SET NOT NULL,
ALTER COLUMN "currentCreditScore" SET DATA TYPE INTEGER;

-- DropTable
DROP TABLE "ApplicationUserInfo";

-- DropTable
DROP TABLE "DocumentFile";

-- DropTable
DROP TABLE "FinancialObligation";

-- DropTable
DROP TABLE "LoanRequestSpecifications";

-- DropTable
DROP TABLE "applicationFrom";

-- DropEnum
DROP TYPE "DocumentType";

-- CreateTable
CREATE TABLE "loanApplications" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "loanId" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "userInfoId" TEXT NOT NULL,
    "residentialInformationId" TEXT NOT NULL,
    "employmentFinancialInfoId" TEXT NOT NULL,
    "loanSpecificationsId" TEXT NOT NULL,
    "financialObligationsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "homeLoanId" TEXT,
    "personalLoanId" TEXT,
    "carLoanId" TEXT,
    "smeLoanId" TEXT,

    CONSTRAINT "loanApplications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "spouseName" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "birthRegistration" TEXT,
    "mobileNumber" TEXT NOT NULL,
    "alternateNumber" TEXT,
    "emailAddress" TEXT NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResidentialInformation" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ResidentialInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanSpecifications" (
    "id" TEXT NOT NULL,
    "existingLoanType" "LoanType" NOT NULL,
    "loanAmountRequested" DOUBLE PRECISION NOT NULL,
    "purposeOfLoan" TEXT NOT NULL,
    "preferredLoanTenure" INTEGER NOT NULL,
    "proposedEMIStartDate" TIMESTAMP(3) NOT NULL,
    "repaymentPreferences" TEXT NOT NULL,

    CONSTRAINT "LoanSpecifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialObligations" (
    "id" TEXT NOT NULL,
    "lenderName" TEXT NOT NULL,
    "loanBalance" DOUBLE PRECISION NOT NULL,
    "monthlyEMI" DOUBLE PRECISION NOT NULL,
    "remainingTenure" INTEGER NOT NULL,
    "cardIssuer" TEXT,
    "currentBalance" DOUBLE PRECISION,
    "minimumMonthlyPayment" DOUBLE PRECISION,
    "type" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "emi" DOUBLE PRECISION NOT NULL,
    "fullNameCoApplicant" TEXT,
    "relationshipToCoApplicant" TEXT,
    "coApplicantMonthlyIncome" DOUBLE PRECISION,

    CONSTRAINT "FinancialObligations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AddressToResidentialInformation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AddressToResidentialInformation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "loanApplications_userInfoId_key" ON "loanApplications"("userInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "loanApplications_residentialInformationId_key" ON "loanApplications"("residentialInformationId");

-- CreateIndex
CREATE UNIQUE INDEX "loanApplications_employmentFinancialInfoId_key" ON "loanApplications"("employmentFinancialInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "loanApplications_loanSpecificationsId_key" ON "loanApplications"("loanSpecificationsId");

-- CreateIndex
CREATE UNIQUE INDEX "loanApplications_financialObligationsId_key" ON "loanApplications"("financialObligationsId");

-- CreateIndex
CREATE INDEX "loanApplications_applicationId_status_userId_idx" ON "loanApplications"("applicationId", "status", "userId");

-- CreateIndex
CREATE INDEX "_AddressToResidentialInformation_B_index" ON "_AddressToResidentialInformation"("B");
