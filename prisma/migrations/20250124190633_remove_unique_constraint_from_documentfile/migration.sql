/*
  Warnings:

  - Made the column `applicationId` on table `applicationFrom` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "applicationFrom" ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "appliedBankId" DROP NOT NULL;
