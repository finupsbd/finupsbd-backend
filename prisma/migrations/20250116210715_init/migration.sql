-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'IN_PROGRESS', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "AppGender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateEnum
CREATE TYPE "OwnershipStatus" AS ENUM ('OWNED', 'RENTED', 'LEASED', 'OTHER');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'LAND');

-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('SALARIED', 'SELF_EMPLOYED', 'BUSINESS_OWNER', 'UNEMPLOYED');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateTable
CREATE TABLE "ApplicationForm" (
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

    CONSTRAINT "ApplicationForm_pkey" PRIMARY KEY ("id")
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
    "ownershipStatus" TEXT NOT NULL,
    "lengthOfStayYears" INTEGER NOT NULL,
    "addressType" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploymentFinancialInfo" (
    "id" TEXT NOT NULL,
    "employmentStatus" "EmploymentStatus" NOT NULL,
    "jobTitle" TEXT,
    "employerName" TEXT,
    "department" TEXT,
    "officeAddress" TEXT,
    "contactDetails" TEXT,
    "businessName" TEXT,
    "businessRegistrationNumber" TEXT,
    "employmentTenureYears" INTEGER,
    "monthlyGrossIncome" DOUBLE PRECISION NOT NULL,
    "otherSourcesOfIncome" TEXT,
    "totalMonthlyExpenses" DOUBLE PRECISION NOT NULL,
    "profession" TEXT,
    "taxIdentificationNumber" TEXT,
    "currentCreditScore" DOUBLE PRECISION,

    CONSTRAINT "EmploymentFinancialInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanApplication" (
    "id" TEXT NOT NULL,
    "loanType" TEXT NOT NULL,
    "loanAmountRequested" DOUBLE PRECISION NOT NULL,
    "purposeOfLoan" TEXT NOT NULL,
    "preferredLoanTenure" INTEGER NOT NULL,
    "proposedEMIStartDate" TIMESTAMP(3),
    "repaymentPreferences" TEXT NOT NULL,

    CONSTRAINT "LoanApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExistingLoan" (
    "id" TEXT NOT NULL,
    "lenderName" TEXT NOT NULL,
    "loanBalance" DOUBLE PRECISION NOT NULL,
    "monthlyEMI" DOUBLE PRECISION NOT NULL,
    "remainingTenure" INTEGER NOT NULL,

    CONSTRAINT "ExistingLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyDetails" (
    "id" TEXT NOT NULL,
    "typeOfProperty" "PropertyType" NOT NULL,
    "approximateValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PropertyDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCard" (
    "id" TEXT NOT NULL,
    "cardIssuer" TEXT NOT NULL,
    "currentBalance" DOUBLE PRECISION NOT NULL,
    "minimumMonthlyPayment" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Liability" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "emi" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Liability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoApplicant" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "employment" TEXT NOT NULL,
    "monthlyIncome" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CoApplicant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banks" (
    "id" TEXT NOT NULL,
    "bankId" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "periodMonths" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "monthlyEmi" TEXT NOT NULL,
    "totalAmount" TEXT NOT NULL,

    CONSTRAINT "banks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
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

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsLetter" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "newsLetter_pkey" PRIMARY KEY ("id")
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
    "gender" "Gender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "newsLetter_email_key" ON "newsLetter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");
