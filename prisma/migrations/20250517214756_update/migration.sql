/*
  Warnings:

  - A unique constraint covering the columns `[bankName]` on the table `userBanks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userBanks_bankName_key" ON "userBanks"("bankName");
