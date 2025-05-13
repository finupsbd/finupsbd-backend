/*
  Warnings:

  - The `socialMediaProfiles` column on the `PersonalInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PersonalInfo" DROP COLUMN "socialMediaProfiles",
ADD COLUMN     "socialMediaProfiles" TEXT[];
