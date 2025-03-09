/*
  Warnings:

  - The values [CAR,TRUCK,BUS,VAN,SUV,MOTORCYCLE,SCOOTER,PICKUP,ATV,RV,FIRE_TRUCK,AMBULANCE,POLICE_CAR,TAXI,TRACTOR,SEMI_TRAILER,TRAIN,TRAM,FERRY,AIRPLANE,HELICOPTER] on the enum `VehicleType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VehicleType_new" AS ENUM ('CAR_SEDAN', 'CAR_SUV', 'CAR_HATCHBACK', 'BIKE');
ALTER TABLE "eligibilityCheck" ALTER COLUMN "vehicleType" TYPE "VehicleType_new" USING ("vehicleType"::text::"VehicleType_new");
ALTER TYPE "VehicleType" RENAME TO "VehicleType_old";
ALTER TYPE "VehicleType_new" RENAME TO "VehicleType";
DROP TYPE "VehicleType_old";
COMMIT;

-- AlterTable
ALTER TABLE "smeLoan" ALTER COLUMN "loanType" SET DEFAULT 'SME_LOAN';
