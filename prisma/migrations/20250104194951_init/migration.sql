/*
  Warnings:

  - You are about to drop the column `bio` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `city` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameAsNid` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationalIdNumber` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "bio",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "nameAsNid" TEXT NOT NULL,
ADD COLUMN     "nationalIdNumber" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Bank" (
    "id" SERIAL NOT NULL,
    "bankId" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "periodMonths" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "monthlyEmi" TEXT NOT NULL,
    "totalAmount" TEXT NOT NULL,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);
