/*
  Warnings:

  - You are about to drop the column `PersonalLoanId` on the `Eligibility` table. All the data in the column will be lost.
  - You are about to drop the column `PersonalLoanId` on the `Features` table. All the data in the column will be lost.
  - You are about to drop the column `PersonalLoanId` on the `FeesCharges` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[personalLoanId]` on the table `Eligibility` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personalLoanId]` on the table `Features` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personalLoanId]` on the table `FeesCharges` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personalLoanId]` on the table `applicationFrom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `personalLoanId` to the `Eligibility` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalLoanId` to the `Features` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalLoanId` to the `FeesCharges` table without a default value. This is not possible if the table is not empty.
  - Made the column `personalLoanId` on table `applicationFrom` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Eligibility_PersonalLoanId_key";

-- DropIndex
DROP INDEX "Features_PersonalLoanId_key";

-- DropIndex
DROP INDEX "FeesCharges_PersonalLoanId_key";

-- AlterTable
ALTER TABLE "Eligibility" DROP COLUMN "PersonalLoanId",
ADD COLUMN     "personalLoanId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Features" DROP COLUMN "PersonalLoanId",
ADD COLUMN     "personalLoanId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FeesCharges" DROP COLUMN "PersonalLoanId",
ADD COLUMN     "personalLoanId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "applicationFrom" ALTER COLUMN "personalLoanId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Eligibility_personalLoanId_key" ON "Eligibility"("personalLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "Features_personalLoanId_key" ON "Features"("personalLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesCharges_personalLoanId_key" ON "FeesCharges"("personalLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "applicationFrom_personalLoanId_key" ON "applicationFrom"("personalLoanId");
