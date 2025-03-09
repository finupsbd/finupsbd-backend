/*
  Warnings:

  - You are about to alter the column `InterestRate` on the `eligibilityCheck` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "eligibilityCheck" ALTER COLUMN "InterestRate" SET DATA TYPE DECIMAL(5,2);
