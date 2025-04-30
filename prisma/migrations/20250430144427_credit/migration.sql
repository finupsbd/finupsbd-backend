/*
  Warnings:

  - You are about to drop the column `loungevisit` on the `creditCards` table. All the data in the column will be lost.
  - Added the required column `loungeVisit` to the `creditCards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "creditCards" DROP COLUMN "loungevisit",
ADD COLUMN     "loungeVisit" TEXT NOT NULL;
