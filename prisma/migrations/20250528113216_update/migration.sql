/*
  Warnings:

  - Added the required column `educationalLevel` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EduLavel" AS ENUM ('HIGHSCHOOL', 'BACHELOR', 'MASTER', 'PHD', 'OTHER');

-- AlterTable
ALTER TABLE "PersonalInfo" ADD COLUMN     "educationalLevel" "EduLavel" NOT NULL;
