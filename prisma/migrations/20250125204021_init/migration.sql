/*
  Warnings:

  - You are about to drop the column `loanReschedulingFee` on the `FeesCharges` table. All the data in the column will be lost.
  - Added the required column `LoanReSchedulingFee` to the `FeesCharges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FeesCharges" DROP COLUMN "loanReschedulingFee",
ADD COLUMN     "LoanReSchedulingFee" TEXT NOT NULL;
