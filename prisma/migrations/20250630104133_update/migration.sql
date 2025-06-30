/*
  Warnings:

  - You are about to drop the column `selectArea` on the `eligibilityCheck` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "eligibilityCheck" DROP COLUMN "selectArea",
ADD COLUMN     "rentalArea" TEXT;
