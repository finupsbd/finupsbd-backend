/*
  Warnings:

  - Made the column `employmentType` on table `EmploymentInformation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EmploymentInformation" ALTER COLUMN "employmentType" SET NOT NULL,
ALTER COLUMN "hasPreviousOrganization" DROP NOT NULL;
