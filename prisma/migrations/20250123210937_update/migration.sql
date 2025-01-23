-- DropIndex
DROP INDEX "ApplicationUserInfo_emailAddress_key";

-- DropIndex
DROP INDEX "ApplicationUserInfo_nid_key";

-- AlterTable
ALTER TABLE "applicationFrom" ALTER COLUMN "userId" DROP NOT NULL;
