-- AlterTable
ALTER TABLE "applicationFrom" ADD COLUMN     "carLoanId" TEXT,
ADD COLUMN     "homeLoanId" TEXT,
ADD COLUMN     "sMELoanId" TEXT;

-- CreateTable
CREATE TABLE "carLoan" (
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
    "loanType" TEXT NOT NULL DEFAULT 'CAR_LOAN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eligibilityId" TEXT,
    "feesChargesId" TEXT,
    "featuresId" TEXT,
    "userId" TEXT,

    CONSTRAINT "carLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesCarLoan" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "carLoanId" TEXT NOT NULL,

    CONSTRAINT "FeaturesCarLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityCarLoan" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "carLoanId" TEXT NOT NULL,

    CONSTRAINT "EligibilityCarLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesCarLoan" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "carLoanId" TEXT NOT NULL,

    CONSTRAINT "FeesChargesCarLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homeLoan" (
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
    "loanType" TEXT NOT NULL DEFAULT 'HOME_LOAN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eligibilityId" TEXT,
    "feesChargesId" TEXT,
    "featuresId" TEXT,
    "userId" TEXT,

    CONSTRAINT "homeLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesHomeLoan" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "homeLoanId" TEXT NOT NULL,

    CONSTRAINT "FeaturesHomeLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityHomeLoan" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "homeLoanId" TEXT NOT NULL,

    CONSTRAINT "EligibilityHomeLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesHomeLoan" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "homeLoanId" TEXT NOT NULL,

    CONSTRAINT "FeesChargesHomeLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "smeLoan" (
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
    "loanType" TEXT NOT NULL DEFAULT 'CAR_LOAN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eligibilityId" TEXT,
    "feesChargesId" TEXT,
    "featuresId" TEXT,
    "userId" TEXT,

    CONSTRAINT "smeLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesSMELoan" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "smeLoanId" TEXT NOT NULL,

    CONSTRAINT "FeaturesSMELoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilitySMELoan" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "smeLoanId" TEXT NOT NULL,

    CONSTRAINT "EligibilitySMELoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesSMELoan" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "smeLoanId" TEXT NOT NULL,

    CONSTRAINT "FeesChargesSMELoan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesCarLoan_carLoanId_key" ON "FeaturesCarLoan"("carLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityCarLoan_carLoanId_key" ON "EligibilityCarLoan"("carLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesCarLoan_carLoanId_key" ON "FeesChargesCarLoan"("carLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesHomeLoan_homeLoanId_key" ON "FeaturesHomeLoan"("homeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityHomeLoan_homeLoanId_key" ON "EligibilityHomeLoan"("homeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesHomeLoan_homeLoanId_key" ON "FeesChargesHomeLoan"("homeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesSMELoan_smeLoanId_key" ON "FeaturesSMELoan"("smeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilitySMELoan_smeLoanId_key" ON "EligibilitySMELoan"("smeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesSMELoan_smeLoanId_key" ON "FeesChargesSMELoan"("smeLoanId");
