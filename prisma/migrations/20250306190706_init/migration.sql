/*
  Warnings:

  - The primary key for the `eligibilityCheck` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "eligibilityCheck" DROP CONSTRAINT "eligibilityCheck_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "eligibilityCheck_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "eligibilityCheck_id_seq";
