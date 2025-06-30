/*
  Warnings:

  - You are about to drop the column `numberOfCard` on the `eligibilityCheck` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "eligibilityCheck" DROP COLUMN "numberOfCard",
ADD COLUMN     "numberOfCreditCards" INTEGER;
