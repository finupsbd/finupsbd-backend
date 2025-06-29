-- AlterTable
ALTER TABLE "EmploymentInformation" ALTER COLUMN "grossMonthlyIncome" DROP NOT NULL,
ALTER COLUMN "rentIncome" DROP NOT NULL,
ALTER COLUMN "otherIncome" DROP NOT NULL,
ALTER COLUMN "sourceOfOtherIncome" DROP NOT NULL,
ALTER COLUMN "totalIncome" DROP NOT NULL,
ALTER COLUMN "otherProfession" DROP NOT NULL;
