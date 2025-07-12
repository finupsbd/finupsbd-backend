/*
  Warnings:

  - You are about to drop the column `format` on the `GuarantorInfoDocument` table. All the data in the column will be lost.
  - You are about to drop the column `secure_url` on the `GuarantorInfoDocument` table. All the data in the column will be lost.
  - Added the required column `mimeType` to the `GuarantorInfoDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `GuarantorInfoDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GuarantorInfoDocument" DROP COLUMN "format",
DROP COLUMN "secure_url",
ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
