-- CreateTable
CREATE TABLE "creditCards" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "freeAnnualFee" TEXT NOT NULL,
    "regularAnnualFee" TEXT NOT NULL,
    "annualFeeWaived" TEXT NOT NULL,
    "AnnualFeeWaivedReward" TEXT NOT NULL,
    "interestPerDay" TEXT NOT NULL,
    "interestFreePeriod" TEXT NOT NULL,
    "freeSupplementaryCards" TEXT NOT NULL,
    "maxSupplementaryCards" TEXT NOT NULL,
    "balanceTransferAvailability" TEXT NOT NULL,
    "ownBankATMFee" TEXT NOT NULL,
    "otherBankATMFee" TEXT NOT NULL,
    "loungeFacility" TEXT NOT NULL,
    "loungevisit" TEXT NOT NULL,
    "cardChequeProcessingFee" TEXT NOT NULL,
    "processingFeeMinimum" TEXT NOT NULL,
    "cashWithdrawalLimit" TEXT NOT NULL,
    "cardType" TEXT NOT NULL DEFAULT 'CREDIT_CARD',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "coverImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "creditCards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesCreditCard" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "creditCardId" TEXT NOT NULL,

    CONSTRAINT "FeaturesCreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityCreditCard" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "creditCardId" TEXT NOT NULL,

    CONSTRAINT "EligibilityCreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesCreditCard" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "creditCardId" TEXT NOT NULL,

    CONSTRAINT "FeesChargesCreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesCreditCard_creditCardId_key" ON "FeaturesCreditCard"("creditCardId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityCreditCard_creditCardId_key" ON "EligibilityCreditCard"("creditCardId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesCreditCard_creditCardId_key" ON "FeesChargesCreditCard"("creditCardId");
