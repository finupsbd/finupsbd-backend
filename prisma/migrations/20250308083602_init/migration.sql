/*
  Warnings:

  - You are about to drop the column `residentialInformationId` on the `loanApplications` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResidentialInformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AddressToResidentialInformation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[presentAddressId]` on the table `loanApplications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[permanentAddressId]` on the table `loanApplications` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "loanApplications_residentialInformationId_key";

-- AlterTable
ALTER TABLE "loanApplications" DROP COLUMN "residentialInformationId",
ADD COLUMN     "permanentAddressId" TEXT,
ADD COLUMN     "presentAddressId" TEXT;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "ResidentialInformation";

-- DropTable
DROP TABLE "_AddressToResidentialInformation";

-- CreateTable
CREATE TABLE "presentAddress" (
    "id" TEXT NOT NULL,
    "houseFlatNo" TEXT NOT NULL,
    "streetRoad" TEXT NOT NULL,
    "areaLocality" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "lengthOfStayYears" INTEGER NOT NULL,
    "ownershipStatus" "OwnershipStatus" NOT NULL,

    CONSTRAINT "presentAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permanentAddress" (
    "id" TEXT NOT NULL,
    "houseFlatNo" TEXT NOT NULL,
    "streetRoad" TEXT NOT NULL,
    "areaLocality" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "lengthOfStayYears" INTEGER NOT NULL,
    "ownershipStatus" "OwnershipStatus" NOT NULL,

    CONSTRAINT "permanentAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "loanApplications_presentAddressId_key" ON "loanApplications"("presentAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "loanApplications_permanentAddressId_key" ON "loanApplications"("permanentAddressId");
