/*
  Warnings:

  - You are about to drop the `NewsLetter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "NewsLetter";

-- CreateTable
CREATE TABLE "newsLetter" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "newsLetter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "newsLetter_email_key" ON "newsLetter"("email");
