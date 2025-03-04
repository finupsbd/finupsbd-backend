/*
  Warnings:

  - You are about to drop the column `conditionalPreClosure` on the `EligibilityHomeLoan` table. All the data in the column will be lost.
  - Added the required column `condition` to the `EligibilityHomeLoan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EligibilityHomeLoan" DROP COLUMN "conditionalPreClosure",
ADD COLUMN     "condition" TEXT NOT NULL;
