/*
  Warnings:

  - You are about to drop the column `loanAmount` on the `FeaturesCreditCard` table. All the data in the column will be lost.
  - You are about to drop the column `loanTenure` on the `FeaturesCreditCard` table. All the data in the column will be lost.
  - You are about to drop the column `maximumAmount` on the `FeaturesCreditCard` table. All the data in the column will be lost.
  - You are about to drop the column `maximumYear` on the `FeaturesCreditCard` table. All the data in the column will be lost.
  - You are about to drop the column `minimumAmount` on the `FeaturesCreditCard` table. All the data in the column will be lost.
  - You are about to drop the column `minimumYear` on the `FeaturesCreditCard` table. All the data in the column will be lost.
  - You are about to drop the column `LoanReSchedulingFee` on the `FeesChargesCreditCard` table. All the data in the column will be lost.
  - You are about to drop the column `earlySettlementFee` on the `FeesChargesCreditCard` table. All the data in the column will be lost.
  - You are about to drop the column `penalCharge` on the `FeesChargesCreditCard` table. All the data in the column will be lost.
  - You are about to drop the column `prepaymentFee` on the `FeesChargesCreditCard` table. All the data in the column will be lost.
  - You are about to drop the column `processingFee` on the `FeesChargesCreditCard` table. All the data in the column will be lost.
  - You are about to drop the column `annualFeeWaived` on the `creditCards` table. All the data in the column will be lost.
  - Added the required column `annualFee` to the `FeesChargesCreditCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `annualFeeWaived` to the `FeesChargesCreditCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balanceTransferRate` to the `FeesChargesCreditCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interestRate` to the `FeesChargesCreditCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latePaymentFee` to the `FeesChargesCreditCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardFeaturesType` to the `creditCards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardNetwork` to the `creditCards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `creditCards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latePaymentFees` to the `creditCards` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('LOAN', 'CREDIT_CARD', 'CREDIT_SCORE', 'CUSTOMER_SUCCESS');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('LOCAL', 'DUAL');

-- CreateEnum
CREATE TYPE "CardNetwork" AS ENUM ('VISA', 'MASTER', 'AMEX');

-- CreateEnum
CREATE TYPE "CardFeaturesType" AS ENUM ('SILVER', 'CLASSIC', 'STANDARD', 'GOLD', 'PLATINUM', 'SIGNATURE', 'TITANIUM');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('INFO', 'SUCCESS', 'WARNING', 'ERROR', 'PROMOTION', 'SYSTEM');

-- CreateEnum
CREATE TYPE "NotificationPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'CRITICAL');

-- AlterTable
ALTER TABLE "FeaturesCreditCard" DROP COLUMN "loanAmount",
DROP COLUMN "loanTenure",
DROP COLUMN "maximumAmount",
DROP COLUMN "maximumYear",
DROP COLUMN "minimumAmount",
DROP COLUMN "minimumYear",
ADD COLUMN     "features1" TEXT,
ADD COLUMN     "features2" TEXT,
ADD COLUMN     "features3" TEXT,
ADD COLUMN     "features4" TEXT,
ADD COLUMN     "features5" TEXT;

-- AlterTable
ALTER TABLE "FeesChargesCreditCard" DROP COLUMN "LoanReSchedulingFee",
DROP COLUMN "earlySettlementFee",
DROP COLUMN "penalCharge",
DROP COLUMN "prepaymentFee",
DROP COLUMN "processingFee",
ADD COLUMN     "annualFee" TEXT NOT NULL,
ADD COLUMN     "annualFeeWaived" TEXT NOT NULL,
ADD COLUMN     "balanceTransferRate" TEXT NOT NULL,
ADD COLUMN     "interestRate" TEXT NOT NULL,
ADD COLUMN     "latePaymentFee" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;

-- AlterTable
ALTER TABLE "creditCards" DROP COLUMN "annualFeeWaived",
ADD COLUMN     "cardFeaturesType" "CardFeaturesType" NOT NULL,
ADD COLUMN     "cardNetwork" "CardNetwork" NOT NULL,
ADD COLUMN     "currency" "Currency" NOT NULL,
ADD COLUMN     "latePaymentFees" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'INFO',
    "actionUrl" TEXT,
    "icon" TEXT,
    "priority" "NotificationPriority" NOT NULL DEFAULT 'NORMAL',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "scheduledAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- CreateIndex
CREATE INDEX "notifications_isRead_idx" ON "notifications"("isRead");

-- CreateIndex
CREATE INDEX "notifications_expiresAt_idx" ON "notifications"("expiresAt");

-- CreateIndex
CREATE INDEX "notifications_scheduledAt_idx" ON "notifications"("scheduledAt");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
