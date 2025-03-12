/*
  Warnings:

  - Changed the type of `gender` on the `profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserProfileGender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "gender",
ADD COLUMN     "gender" "UserProfileGender" NOT NULL;

-- DropEnum
DROP TYPE "UserGender";
