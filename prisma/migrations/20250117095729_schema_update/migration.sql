/*
  Warnings:

  - You are about to drop the `ApplicationForm` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ApplicationForm";

-- CreateTable
CREATE TABLE "applicationFrom" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "spouseName" TEXT,
    "dateOfBirth" TEXT,
    "placeOfBirth" TEXT NOT NULL,
    "gender" "AppGender",
    "maritalStatus" "MaritalStatus" NOT NULL,
    "nid" TEXT NOT NULL,
    "birthRegistration" TEXT,
    "mobileNumber" TEXT NOT NULL,
    "alternateNumber" TEXT,
    "emailAddress" TEXT NOT NULL,
    "socialMediaLink" TEXT[],
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "addressId" TEXT,
    "employmentFinancialInfoId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "propertyDetailsId" TEXT,
    "existingLoanId" TEXT NOT NULL,
    "creditCardId" TEXT NOT NULL,
    "liabilityId" TEXT NOT NULL,
    "coApplicantId" TEXT NOT NULL,
    "loanApplicationId" TEXT NOT NULL,

    CONSTRAINT "applicationFrom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "applicationFrom_applicationId_status_idx" ON "applicationFrom"("applicationId", "status");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_isActive_idx" ON "users"("isActive");
