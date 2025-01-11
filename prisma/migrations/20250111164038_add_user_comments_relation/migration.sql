/*
  Warnings:

  - You are about to drop the column `likes` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "likes",
DROP COLUMN "views";

-- DropTable
DROP TABLE "Comment";
