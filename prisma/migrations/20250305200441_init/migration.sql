-- CreateEnum
CREATE TYPE "MainLoanType" AS ENUM ('PERSONAL_LOAN', 'HOME_LOAN', 'CAR_LOAN', 'SME_LOAN');

-- CreateEnum
CREATE TYPE "EGender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Profession" AS ENUM ('BUSINESS_OWNER', 'SALARIED');

-- CreateEnum
CREATE TYPE "BusinessOwnerType" AS ENUM ('PROPRIETOR', 'PARTNER', 'CORPORATION', 'LLC', 'COOPERATIVE', 'JOINT_VENTURE', 'FRANCHISE');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('CAR', 'BIKE', 'TRUCK', 'BUS', 'VAN', 'SUV', 'MOTORCYCLE', 'SCOOTER', 'PICKUP', 'ATV', 'RV', 'FIRE_TRUCK', 'AMBULANCE', 'POLICE_CAR', 'TAXI', 'TRACTOR', 'SEMI_TRAILER', 'TRAIN', 'TRAM', 'FERRY', 'AIRPLANE', 'HELICOPTER');

-- CreateEnum
CREATE TYPE "ExistingLoanType" AS ENUM ('HOME_LOAN', 'PERSONAL_LOAN', 'CAR_LOAN', 'SME_LOAN', 'CREDIT_CARD', 'OTHER');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD');

-- CreateTable
CREATE TABLE "eligibilityCheck" (
    "id" SERIAL NOT NULL,
    "LoanType" "MainLoanType" NOT NULL,
    "gender" "EGender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "profession" "Profession" NOT NULL,
    "businessOwnerType" "BusinessOwnerType",
    "businessType" TEXT,
    "sharePortion" INTEGER,
    "tradeLicenseAge" INTEGER,
    "vehicleType" "VehicleType",
    "expectedLoanTenure" INTEGER NOT NULL,
    "monthlyIncome" INTEGER NOT NULL,
    "jobLocation" TEXT NOT NULL,
    "haveAnyRentalIncome" BOOLEAN NOT NULL,
    "selectArea" TEXT,
    "rentalIncome" INTEGER,
    "haveAnyLoan" BOOLEAN NOT NULL,
    "numberOfLoan" INTEGER,
    "existingLoanType" "ExistingLoanType",
    "EMIAmountBDT" INTEGER,
    "InterestRate" DOUBLE PRECISION,
    "haveAnyCreditCard" BOOLEAN NOT NULL,
    "numberOfCard" INTEGER,
    "cardType" "CardType",
    "cardLimitBDT" INTEGER,
    "secondaryApplicant" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eligibilityCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "eligibilityCheck_LoanType_name_email_phone_idx" ON "eligibilityCheck"("LoanType", "name", "email", "phone");
