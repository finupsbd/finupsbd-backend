/*
  Warnings:

  - You are about to drop the column `AnnualFeeWaivedReward` on the `creditCards` table. All the data in the column will be lost.
  - Added the required column `annualFeeWaivedReward` to the `creditCards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "creditCards" DROP COLUMN "AnnualFeeWaivedReward",
ADD COLUMN     "annualFeeWaivedReward" TEXT NOT NULL;
