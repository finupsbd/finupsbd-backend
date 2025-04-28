-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('SUBMITTED', 'IN_PROCESS', 'PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PASSPORT', 'ID_CARD', 'INCOME_PROOF', 'BANK_STATEMENT', 'TIN_CERTIFICATE', 'EMPLOYMENT_PROOF', 'UTILITY_BILL', 'PROPERTY_DOCUMENT', 'ADDITIONAL');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "MainLoanType" AS ENUM ('PERSONAL_LOAN', 'HOME_LOAN', 'CAR_LOAN', 'SME_LOAN');

-- CreateEnum
CREATE TYPE "EGender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Profession" AS ENUM ('BUSINESS_OWNER', 'SALARIED');

-- CreateEnum
CREATE TYPE "BusinessOwnerType" AS ENUM ('PROPRIETOR', 'PARTNER', 'CORPORATION', 'LLC', 'COOPERATIVE', 'JOINT_VENTURE', 'FRANCHISE');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('CAR_SEDAN', 'CAR_SUV', 'CAR_HATCHBACK', 'BIKE');

-- CreateEnum
CREATE TYPE "ExistingLoanType" AS ENUM ('HOME_LOAN', 'PERSONAL_LOAN', 'CAR_LOAN', 'SME_LOAN', 'CREDIT_CARD', 'OTHER');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "UserProfileGender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentTypeKyc" AS ENUM ('NATIONAL_ID', 'PASSPORT', 'DRIVING_LICENSE', 'VOTER_ID');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "LoanApplicationForm" (
    "id" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "adminNotes" TEXT,
    "applicationId" TEXT,
    "status" "LoanStatus" NOT NULL DEFAULT 'SUBMITTED',
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanApplicationForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalInfo" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fathersName" TEXT NOT NULL,
    "mothersName" TEXT NOT NULL,
    "spouseName" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "nationalId" TEXT NOT NULL,
    "birthRegistration" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "alternateMobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "socialMedia" TEXT NOT NULL,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "PersonalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResidentialInfo" (
    "id" TEXT NOT NULL,
    "permanentHouseNo" TEXT NOT NULL,
    "permanentStreet" TEXT NOT NULL,
    "permanentArea" TEXT NOT NULL,
    "permanentCity" TEXT NOT NULL,
    "permanentDistrict" TEXT NOT NULL,
    "permanentPostalCode" TEXT NOT NULL,
    "permanentStayLength" TEXT NOT NULL,
    "permanentOwnership" TEXT NOT NULL,
    "sameAsPermanent" BOOLEAN NOT NULL,
    "presentHouseNo" TEXT NOT NULL,
    "presentStreet" TEXT NOT NULL,
    "presentArea" TEXT NOT NULL,
    "presentCity" TEXT NOT NULL,
    "presentDistrict" TEXT NOT NULL,
    "presentPostalCode" TEXT NOT NULL,
    "presentStayLength" TEXT NOT NULL,
    "presentOwnership" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "approximateValue" TEXT NOT NULL,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "ResidentialInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploymentInfo" (
    "id" TEXT NOT NULL,
    "employmentStatus" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "employerName" TEXT NOT NULL,
    "employerAddress" TEXT NOT NULL,
    "employerDepartment" TEXT NOT NULL,
    "employerContact" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "tenure" TEXT NOT NULL,
    "monthlyIncome" TEXT NOT NULL,
    "otherIncome" TEXT NOT NULL,
    "householdExpenses" TEXT NOT NULL,
    "tin" TEXT NOT NULL,
    "creditScore" TEXT NOT NULL,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "EmploymentInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanRequest" (
    "id" TEXT NOT NULL,
    "loanType" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "tenure" TEXT NOT NULL,
    "emiStartDate" TEXT NOT NULL,
    "repaymentPreferences" TEXT NOT NULL,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "LoanRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialObligation" (
    "id" TEXT NOT NULL,
    "lenderName" TEXT NOT NULL,
    "loanBalance" TEXT NOT NULL,
    "monthlyEMI" TEXT NOT NULL,
    "remainingTenure" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "currentBalance" TEXT NOT NULL,
    "minimumPayment" TEXT NOT NULL,
    "liabilityType" TEXT NOT NULL,
    "liabilityBalance" TEXT NOT NULL,
    "liabilityEMI" TEXT NOT NULL,
    "coApplicantName" TEXT NOT NULL,
    "coApplicantRelation" TEXT NOT NULL,
    "coApplicantIncome" TEXT NOT NULL,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "FinancialObligation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "url" TEXT NOT NULL,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuarantorInfo" (
    "id" TEXT NOT NULL,
    "personalfullName" TEXT NOT NULL,
    "personalfathersOrHusbandsName" TEXT NOT NULL,
    "personalmothersName" TEXT NOT NULL,
    "personaldateOfBirth" TIMESTAMP(3) NOT NULL,
    "personalnationality" TEXT NOT NULL,
    "personalnid" TEXT NOT NULL,
    "personalbirthRegistration" TEXT,
    "personalmobileNumber" TEXT NOT NULL,
    "personalemailAddress" TEXT NOT NULL,
    "personalrelationWithGuarantor" TEXT NOT NULL,
    "personalpresentAddress" TEXT NOT NULL,
    "personalpermanentAndMailingAddress" TEXT NOT NULL,
    "personalworkAddress" TEXT NOT NULL,
    "personaladdress" TEXT NOT NULL,
    "personalprofession" TEXT NOT NULL,
    "personalmonthlyIncome" TEXT NOT NULL,
    "personalemployer" TEXT NOT NULL,
    "businessfullName" TEXT NOT NULL,
    "businessfathersOrHusbandsName" TEXT NOT NULL,
    "businessmothersName" TEXT NOT NULL,
    "businessdateOfBirth" TIMESTAMP(3) NOT NULL,
    "businessnationality" TEXT NOT NULL,
    "businessnid" TEXT NOT NULL,
    "businessbirthRegistration" TEXT,
    "businessmobileNumber" TEXT NOT NULL,
    "businessemailAddress" TEXT NOT NULL,
    "businessrelationWithGuarantor" TEXT NOT NULL,
    "businesspresentAddress" TEXT NOT NULL,
    "businesspermanentAndMailingAddress" TEXT NOT NULL,
    "businessworkAddress" TEXT NOT NULL,
    "businessaddress" TEXT NOT NULL,
    "businessprofession" TEXT NOT NULL,
    "businessmonthlyIncome" TEXT NOT NULL,
    "businessemployer" TEXT NOT NULL,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "GuarantorInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "publishedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" "PostStatus" NOT NULL DEFAULT 'PUBLISHED',
    "excerpt" TEXT,
    "category" TEXT,
    "tags" TEXT[],
    "coverImage" TEXT,
    "readingTime" INTEGER,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "attachments" TEXT[],
    "language" TEXT NOT NULL DEFAULT 'en',
    "permissions" TEXT NOT NULL DEFAULT 'public',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carLoan" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "coverImage" TEXT,
    "periodMonths" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "monthlyEmi" TEXT NOT NULL,
    "totalAmount" TEXT NOT NULL,
    "eligibleLoan" TEXT NOT NULL,
    "loanType" TEXT NOT NULL DEFAULT 'CAR_LOAN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eligibilityId" TEXT,
    "feesChargesId" TEXT,
    "featuresId" TEXT,
    "userId" TEXT,

    CONSTRAINT "carLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesCarLoan" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "carLoanId" TEXT NOT NULL,

    CONSTRAINT "FeaturesCarLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityCarLoan" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "carLoanId" TEXT NOT NULL,

    CONSTRAINT "EligibilityCarLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesCarLoan" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "carLoanId" TEXT NOT NULL,

    CONSTRAINT "FeesChargesCarLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eligibilityCheck" (
    "id" TEXT NOT NULL,
    "loanType" "MainLoanType" NOT NULL,
    "gender" "EGender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "profession" "Profession" NOT NULL,
    "businessOwnerType" "BusinessOwnerType",
    "businessType" TEXT,
    "sharePortion" INTEGER,
    "tradeLicenseAge" INTEGER,
    "vehicleType" "VehicleType",
    "expectedLoanTenure" INTEGER,
    "monthlyIncome" INTEGER,
    "jobLocation" TEXT,
    "haveAnyRentalIncome" BOOLEAN,
    "selectArea" TEXT,
    "rentalIncome" INTEGER,
    "haveAnyLoan" BOOLEAN DEFAULT false,
    "haveAnyCreditCard" BOOLEAN,
    "numberOfCard" INTEGER,
    "cardType" "CardType",
    "cardLimitBDT" INTEGER,
    "secondaryApplicant" BOOLEAN,
    "termsAccepted" BOOLEAN,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isAppliedLoan" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eligibilityCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "existingLoans" (
    "id" TEXT NOT NULL,
    "existingLoanType" "ExistingLoanType" NOT NULL,
    "emiAmountBDT" INTEGER NOT NULL,
    "interestRate" DECIMAL(5,2) NOT NULL,
    "eligibilityCheckId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "existingLoans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homeLoan" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "coverImage" TEXT,
    "periodMonths" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "monthlyEmi" TEXT NOT NULL,
    "totalAmount" TEXT NOT NULL,
    "eligibleLoan" TEXT NOT NULL,
    "loanType" TEXT NOT NULL DEFAULT 'HOME_LOAN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "homeLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesHomeLoan" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "homeLoanId" TEXT NOT NULL,

    CONSTRAINT "FeaturesHomeLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityHomeLoan" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "homeLoanId" TEXT NOT NULL,

    CONSTRAINT "EligibilityHomeLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesHomeLoan" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "homeLoanId" TEXT NOT NULL,

    CONSTRAINT "FeesChargesHomeLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instantLoans" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "amount" TEXT,
    "coverImage" TEXT,
    "periodMonths" TEXT,
    "processingFee" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "monthlyEmi" TEXT,
    "totalAmount" TEXT,
    "eligibleLoan" TEXT,
    "loanType" TEXT NOT NULL DEFAULT 'INSTANT_LOAN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "instantLoans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesInstantLoan" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "InstantLoanId" TEXT NOT NULL,

    CONSTRAINT "FeaturesInstantLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityInstantLoan" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" DECIMAL(65,30) NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "InstantLoanId" TEXT NOT NULL,

    CONSTRAINT "EligibilityInstantLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesInstantLoan" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "InstantLoanId" TEXT NOT NULL,

    CONSTRAINT "FeesChargesInstantLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsLetter" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "newsLetter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personalLoans" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "amount" TEXT,
    "coverImage" TEXT,
    "periodMonths" TEXT,
    "processingFee" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "monthlyEmi" TEXT,
    "totalAmount" TEXT,
    "eligibleLoan" TEXT,
    "loanType" TEXT NOT NULL DEFAULT 'PERSONAL_LOAN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "personalLoans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Features" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "personalLoanId" TEXT NOT NULL,

    CONSTRAINT "Features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eligibility" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "personalLoanId" TEXT NOT NULL,

    CONSTRAINT "Eligibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesCharges" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "personalLoanId" TEXT NOT NULL,

    CONSTRAINT "FeesCharges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "smeLoan" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "coverImage" TEXT,
    "periodMonths" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "monthlyEmi" TEXT NOT NULL,
    "totalAmount" TEXT NOT NULL,
    "eligibleLoan" TEXT NOT NULL,
    "loanType" TEXT NOT NULL DEFAULT 'SME_LOAN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eligibilityId" TEXT,
    "feesChargesId" TEXT,
    "featuresId" TEXT,
    "userId" TEXT,

    CONSTRAINT "smeLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesSMELoan" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "smeLoanId" TEXT NOT NULL,

    CONSTRAINT "FeaturesSMELoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilitySMELoan" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "smeLoanId" TEXT NOT NULL,

    CONSTRAINT "EligibilitySMELoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesSMELoan" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "smeLoanId" TEXT NOT NULL,

    CONSTRAINT "FeesChargesSMELoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "pin" TEXT,
    "pinExpiry" TIMESTAMP(3),
    "verificationToken" TEXT,
    "resetPasswordToken" TEXT,
    "resetPasswordExpiry" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'USER',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "nameAsNid" TEXT NOT NULL,
    "nationalIdNumber" TEXT NOT NULL,
    "gender" "UserProfileGender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KycVerification" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fatherName" TEXT,
    "motherName" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "UserProfileGender" NOT NULL,
    "nationality" TEXT NOT NULL,
    "occupation" TEXT,
    "documentType" "DocumentTypeKyc" NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "documentFrontUrl" TEXT NOT NULL,
    "documentBackUrl" TEXT,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "addressProofUrl" TEXT NOT NULL,
    "selfieUrl" TEXT NOT NULL,
    "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "remarks" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KycVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT,
    "device" TEXT,
    "browser" TEXT,
    "location" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referrer" TEXT,
    "os" TEXT,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoanApplicationForm_applicationId_key" ON "LoanApplicationForm"("applicationId");

-- CreateIndex
CREATE INDEX "LoanApplicationForm_userId_idx" ON "LoanApplicationForm"("userId");

-- CreateIndex
CREATE INDEX "LoanApplicationForm_createdAt_idx" ON "LoanApplicationForm"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInfo_loanApplicationFormId_key" ON "PersonalInfo"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "ResidentialInfo_loanApplicationFormId_key" ON "ResidentialInfo"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentInfo_loanApplicationFormId_key" ON "EmploymentInfo"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanRequest_loanApplicationFormId_key" ON "LoanRequest"("loanApplicationFormId");

-- CreateIndex
CREATE INDEX "FinancialObligation_loanApplicationFormId_idx" ON "FinancialObligation"("loanApplicationFormId");

-- CreateIndex
CREATE INDEX "Document_loanApplicationFormId_idx" ON "Document"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "GuarantorInfo_loanApplicationFormId_key" ON "GuarantorInfo"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesCarLoan_carLoanId_key" ON "FeaturesCarLoan"("carLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityCarLoan_carLoanId_key" ON "EligibilityCarLoan"("carLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesCarLoan_carLoanId_key" ON "FeesChargesCarLoan"("carLoanId");

-- CreateIndex
CREATE INDEX "eligibilityCheck_loanType_name_email_phone_idx" ON "eligibilityCheck"("loanType", "name", "email", "phone");

-- CreateIndex
CREATE INDEX "existingLoans_eligibilityCheckId_idx" ON "existingLoans"("eligibilityCheckId");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesHomeLoan_homeLoanId_key" ON "FeaturesHomeLoan"("homeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityHomeLoan_homeLoanId_key" ON "EligibilityHomeLoan"("homeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesHomeLoan_homeLoanId_key" ON "FeesChargesHomeLoan"("homeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesInstantLoan_InstantLoanId_key" ON "FeaturesInstantLoan"("InstantLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityInstantLoan_InstantLoanId_key" ON "EligibilityInstantLoan"("InstantLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesInstantLoan_InstantLoanId_key" ON "FeesChargesInstantLoan"("InstantLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "newsLetter_email_key" ON "newsLetter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Features_personalLoanId_key" ON "Features"("personalLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "Eligibility_personalLoanId_key" ON "Eligibility"("personalLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesCharges_personalLoanId_key" ON "FeesCharges"("personalLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesSMELoan_smeLoanId_key" ON "FeaturesSMELoan"("smeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilitySMELoan_smeLoanId_key" ON "EligibilitySMELoan"("smeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesSMELoan_smeLoanId_key" ON "FeesChargesSMELoan"("smeLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_isActive_idx" ON "users"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "KycVerification_userId_key" ON "KycVerification"("userId");
