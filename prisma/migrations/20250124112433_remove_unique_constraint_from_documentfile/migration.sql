/*
  Warnings:

  - You are about to drop the column `userId` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userRelation]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userRelation` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "applicationFrom_userId_key";

-- DropIndex
DROP INDEX "profiles_userId_key";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "userId",
ADD COLUMN     "userRelation" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userRelation_key" ON "profiles"("userRelation");
