-- AlterTable
ALTER TABLE "eligibilityCheck" ALTER COLUMN "expectedLoanTenure" DROP NOT NULL,
ALTER COLUMN "monthlyIncome" DROP NOT NULL,
ALTER COLUMN "jobLocation" DROP NOT NULL,
ALTER COLUMN "haveAnyRentalIncome" DROP NOT NULL,
ALTER COLUMN "haveAnyLoan" DROP NOT NULL,
ALTER COLUMN "haveAnyCreditCard" DROP NOT NULL,
ALTER COLUMN "secondaryApplicant" DROP NOT NULL;
