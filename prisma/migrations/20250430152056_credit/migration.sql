-- AlterTable
ALTER TABLE "EligibilityCreditCard" ALTER COLUMN "creditCardId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "FeaturesCreditCard" ALTER COLUMN "creditCardId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "FeesChargesCreditCard" ALTER COLUMN "creditCardId" DROP NOT NULL;
