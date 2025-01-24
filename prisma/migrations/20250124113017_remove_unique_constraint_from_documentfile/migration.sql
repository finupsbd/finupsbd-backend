/*
  Warnings:

  - You are about to drop the column `userRelation` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "profiles_userRelation_key";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "userRelation",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");
