-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "ApplicationForm" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL DEFAULT '0',

    CONSTRAINT "ApplicationForm_pkey" PRIMARY KEY ("id")
);
