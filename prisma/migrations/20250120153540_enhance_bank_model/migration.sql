/*
  Warnings:

  - You are about to drop the column `addressType` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `preferredLoanTenure` on the `LoanApplication` table. All the data in the column will be lost.
  - You are about to drop the column `purposeOfLoan` on the `LoanApplication` table. All the data in the column will be lost.
  - You are about to drop the column `repaymentPreferences` on the `LoanApplication` table. All the data in the column will be lost.
  - You are about to drop the column `bankId` on the `banks` table. All the data in the column will be lost.
  - You are about to drop the `EmploymentFinancialInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertyDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `applicationFrom` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `ownershipStatus` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `dateOfBirth` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `digitalSignature` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailAddress` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentStatus` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherName` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanPurpose` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanTenure` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalStatus` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileNumber` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyGrossIncome` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherName` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nid` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permanentAddressId` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeOfBirth` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repaymentPreference` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signatureDate` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMonthlyExpenses` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eligibleLoan` to the `banks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "addressType",
DROP COLUMN "userId",
DROP COLUMN "ownershipStatus",
ADD COLUMN     "ownershipStatus" "OwnershipStatus" NOT NULL;

-- AlterTable
ALTER TABLE "LoanApplication" DROP COLUMN "preferredLoanTenure",
DROP COLUMN "purposeOfLoan",
DROP COLUMN "repaymentPreferences",
ADD COLUMN     "alternateNumber" TEXT,
ADD COLUMN     "birthRegistration" TEXT,
ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "businessRegistration" TEXT,
ADD COLUMN     "consentGiven" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "contactDetails" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creditScore" DOUBLE PRECISION,
ADD COLUMN     "currentAddressId" TEXT,
ADD COLUMN     "dataRetentionPolicy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "declarationAccuracy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "digitalSignature" TEXT NOT NULL,
ADD COLUMN     "documentUploads" TEXT[],
ADD COLUMN     "emailAddress" TEXT NOT NULL,
ADD COLUMN     "employerName" TEXT,
ADD COLUMN     "employmentStatus" "EmploymentStatus" NOT NULL,
ADD COLUMN     "employmentTenure" INTEGER,
ADD COLUMN     "encryptionStandards" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fatherName" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "gender" "AppGender" NOT NULL,
ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "loanPurpose" TEXT NOT NULL,
ADD COLUMN     "loanTenure" INTEGER NOT NULL,
ADD COLUMN     "maritalStatus" "MaritalStatus" NOT NULL,
ADD COLUMN     "mobileNumber" TEXT NOT NULL,
ADD COLUMN     "monthlyGrossIncome" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "motherName" TEXT NOT NULL,
ADD COLUMN     "nid" TEXT NOT NULL,
ADD COLUMN     "nonDisclosure" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "officeAddress" TEXT,
ADD COLUMN     "otherIncomeSources" TEXT,
ADD COLUMN     "permanentAddressId" TEXT NOT NULL,
ADD COLUMN     "placeOfBirth" TEXT NOT NULL,
ADD COLUMN     "privacyAgreement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "repaymentPreference" TEXT NOT NULL,
ADD COLUMN     "roleBasedAccess" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "signatureDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "socialMediaProfiles" TEXT[],
ADD COLUMN     "spouseName" TEXT,
ADD COLUMN     "taxIdentification" TEXT,
ADD COLUMN     "totalMonthlyExpenses" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "twoFactorAuth" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "withdrawalRights" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "banks" DROP COLUMN "bankId",
ADD COLUMN     "eligibleLoan" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "EmploymentFinancialInfo";

-- DropTable
DROP TABLE "PropertyDetails";

-- DropTable
DROP TABLE "applicationFrom";

-- DropEnum
DROP TYPE "PropertyType";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "Features" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "bankId" TEXT NOT NULL,

    CONSTRAINT "Features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eligibility" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" TEXT NOT NULL,
    "minimumExperience" TEXT NOT NULL,
    "ageRequirement" TEXT NOT NULL,
    "bankId" TEXT NOT NULL,

    CONSTRAINT "Eligibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesCharges" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "bankId" TEXT NOT NULL,

    CONSTRAINT "FeesCharges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Features_bankId_key" ON "Features"("bankId");

-- CreateIndex
CREATE UNIQUE INDEX "Eligibility_bankId_key" ON "Eligibility"("bankId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesCharges_bankId_key" ON "FeesCharges"("bankId");
