/*
  Warnings:

  - Added the required column `earlySettlementFee` to the `FeesCharges` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `FeesCharges` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `loanReschedulingFee` to the `FeesCharges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penalCharge` to the `FeesCharges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prepaymentFee` to the `FeesCharges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processingFee` to the `FeesCharges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FeesCharges" ADD COLUMN     "earlySettlementFee" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "loanReschedulingFee" TEXT NOT NULL,
ADD COLUMN     "penalCharge" TEXT NOT NULL,
ADD COLUMN     "prepaymentFee" TEXT NOT NULL,
ADD COLUMN     "processingFee" TEXT NOT NULL,
ADD CONSTRAINT "FeesCharges_pkey" PRIMARY KEY ("id");
