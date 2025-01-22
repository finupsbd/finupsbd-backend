-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateTable
CREATE TABLE "banks" (
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
    "userId" TEXT,

    CONSTRAINT "banks_pkey" PRIMARY KEY ("id")
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
    "bankId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

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
CREATE UNIQUE INDEX "Features_bankId_key" ON "Features"("bankId");

-- CreateIndex
CREATE UNIQUE INDEX "Eligibility_bankId_key" ON "Eligibility"("bankId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesCharges_bankId_key" ON "FeesCharges"("bankId");

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
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_isActive_idx" ON "users"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");
