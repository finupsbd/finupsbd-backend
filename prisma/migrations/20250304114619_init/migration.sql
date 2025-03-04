/*
  Warnings:

  - You are about to drop the column `condition` on the `EligibilityHomeLoan` table. All the data in the column will be lost.
  - You are about to drop the column `eligibilityId` on the `homeLoan` table. All the data in the column will be lost.
  - You are about to drop the column `featuresId` on the `homeLoan` table. All the data in the column will be lost.
  - You are about to drop the column `feesChargesId` on the `homeLoan` table. All the data in the column will be lost.
  - Added the required column `conditionalPreClosure` to the `EligibilityHomeLoan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EligibilityHomeLoan" DROP COLUMN "condition",
ADD COLUMN     "conditionalPreClosure" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "homeLoan" DROP COLUMN "eligibilityId",
DROP COLUMN "featuresId",
DROP COLUMN "feesChargesId";
