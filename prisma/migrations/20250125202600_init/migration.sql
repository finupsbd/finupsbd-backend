-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'IN_PROGRESS', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateEnum
CREATE TYPE "OwnershipStatus" AS ENUM ('OWNED', 'RENTED', 'LEASED', 'OTHER');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'LAND');

-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('SALARIED', 'SELF_EMPLOYED', 'BUSINESS_OWNER');

-- CreateEnum
CREATE TYPE "LoanType" AS ENUM ('PERSONAL', 'HOME', 'CAR', 'BUSINESS', 'EDUCATION', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PASSPORT_PHOTO', 'NATIONAL_ID', 'BIRTH_CERTIFICATE', 'INCOME_PROOF', 'BANK_STATEMENT', 'TIN_CERTIFICATE', 'EMPLOYMENT_PROOF', 'UTILITY_BILL', 'PROPERTY_DOCUMENT', 'SUPPORTING_DOCUMENT');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "UserGender" AS ENUM ('male', 'female', 'other');

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
CREATE TABLE "EmploymentFinancialInfo" (
    "id" TEXT NOT NULL,
    "employmentStatus" "EmploymentStatus" NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "employerName" TEXT NOT NULL,
    "officeAddress" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "contactDetails" TEXT NOT NULL,
    "businessName" TEXT,
    "businessRegistrationNumber" TEXT,
    "employmentTenureYears" INTEGER NOT NULL,
    "monthlyGrossIncome" DOUBLE PRECISION NOT NULL,
    "otherSourcesOfIncome" TEXT,
    "totalMonthlyExpenses" DOUBLE PRECISION NOT NULL,
    "profession" TEXT NOT NULL,
    "taxIdentificationNumber" TEXT,
    "currentCreditScore" DOUBLE PRECISION,
    "applicationFormId" TEXT NOT NULL,

    CONSTRAINT "EmploymentFinancialInfo_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "publishedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" "PostStatus" NOT NULL DEFAULT 'PUBLISHED',
    "excerpt" TEXT,
    "category" TEXT,
    "tags" TEXT[],
    "coverImage" TEXT,
    "readingTime" INTEGER,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "attachments" TEXT[],
    "language" TEXT NOT NULL DEFAULT 'en',
    "permissions" TEXT NOT NULL DEFAULT 'public',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsLetter" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "newsLetter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personalLoans" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "coverImage" TEXT,
    "periodMonths" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "monthlyEmi" TEXT NOT NULL,
    "totalAmount" TEXT NOT NULL,
    "eligibleLoan" TEXT NOT NULL,
    "loanType" TEXT NOT NULL DEFAULT 'PERSONAL_LOAN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "personalLoans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Features" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "PersonalLoanId" TEXT NOT NULL,

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
    "PersonalLoanId" TEXT NOT NULL,

    CONSTRAINT "Eligibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesCharges" (
    "PersonalLoanId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "pin" TEXT,
    "pinExpiry" TIMESTAMP(3),
    "verificationToken" TEXT,
    "resetPasswordToken" TEXT,
    "resetPasswordExpiry" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'USER',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "nameAsNid" TEXT NOT NULL,
    "nationalIdNumber" TEXT NOT NULL,
    "gender" "UserGender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "EmploymentFinancialInfo_applicationFormId_key" ON "EmploymentFinancialInfo"("applicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanRequestSpecifications_applicationFormId_key" ON "LoanRequestSpecifications"("applicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "newsLetter_email_key" ON "newsLetter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Features_PersonalLoanId_key" ON "Features"("PersonalLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "Eligibility_PersonalLoanId_key" ON "Eligibility"("PersonalLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesCharges_PersonalLoanId_key" ON "FeesCharges"("PersonalLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_isActive_idx" ON "users"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");
