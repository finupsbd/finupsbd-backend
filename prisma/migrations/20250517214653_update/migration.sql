-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "MainLoanType" AS ENUM ('PERSONAL_LOAN', 'HOME_LOAN', 'CAR_LOAN', 'SME_LOAN', 'INSTANT_LOAN');

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
CREATE TYPE "LoanStatus" AS ENUM ('SUBMITTED', 'PENDING', 'IN_PROGRESS', 'APPROVED', 'REJECTED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateEnum
CREATE TYPE "OwnershipStatus" AS ENUM ('OWNED', 'RENTED', 'LEASED', 'OTHER');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'LAND');

-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('SALARIED', 'SELF_EMPLOYED', 'BUSINESS_OWNER');

-- CreateEnum
CREATE TYPE "LoanType" AS ENUM ('PERSONAL_LOAN', 'HOME_LOAN', 'CAR_LOAN', 'SME_LOAN', 'INSTANT_LOAN');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PASSPORT_PHOTO', 'NATIONAL_ID', 'BIRTH_CERTIFICATE', 'INCOME_PROOF', 'BANK_STATEMENT', 'TIN_CERTIFICATE', 'EMPLOYMENT_PROOF', 'UTILITY_BILL', 'PROPERTY_DOCUMENT', 'SUPPORTING_DOCUMENT');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "UserProfileGender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentTypeKyc" AS ENUM ('NATIONAL_ID', 'PASSPORT', 'DRIVING_LICENSE', 'VOTER_ID');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "UserBankRole" AS ENUM ('BANK_USER');

-- CreateEnum
CREATE TYPE "BankName" AS ENUM ('AGRANI_BANK_PLC', 'JANATA_BANK_PLC', 'SONALI_BANK_PLC', 'RUPALI_BANK_PLC', 'BANGLADESH_DEVELOPMENT_BANK_PLC', 'BASIC_BANK_LIMITED', 'BANGLADESH_KRISHI_BANK', 'RAJSHAHI_KRISHI_UNNAYAN_BANK', 'PROBASHI_KALLYAN_BANK', 'AB_BANK_PLC', 'BANGLADESH_COMMERCE_BANK_LIMITED', 'BANK_ASIA_PLC', 'BENGAL_COMMERCIAL_BANK_LIMITED', 'BRAC_BANK_PLC', 'CITY_BANK_PLC', 'COMMUNITY_BANK_BANGLADESH_PLC', 'CITIZENS_BANK_PLC', 'DHAKA_BANK_PLC', 'DHAKA_MERCANTILE_CO_OPERATIVE_BANK_LIMITED', 'DUTCH_BANGLA_BANK_PLC', 'EASTERN_BANK_PLC', 'IFIC_BANK_PLC', 'JAMUNA_BANK_LIMITED', 'MEGHNA_BANK_PLC', 'MERCANTILE_BANK_PLC', 'MIDLAND_BANK_LIMITED', 'MODHUMOTI_BANK_LIMITED', 'MUTUAL_TRUST_BANK_PLC', 'NATIONAL_CREDIT_AND_COMMERCE_BANK_PLC', 'NRB_BANK_LIMITED', 'NRBC_BANK_PLC', 'ONE_BANK_PLC', 'PREMIER_BANK_PLC', 'PRIME_BANK_PLC', 'PUBALI_BANK_PLC', 'SHIMANTO_BANK_LIMITED', 'SOUTHEAST_BANK_LIMITED', 'SOUTH_BANGLA_AGRICULTURE_AND_COMMERCE_BANK_LIMITED', 'TRUST_BANK_PLC', 'UNITED_COMMERCIAL_BANK_PLC', 'UTTARA_BANK_PLC', 'EXIM_BANK_PLC', 'AL_AARAFAH_ISLAMI_BANK_PLC', 'FIRST_SECURITY_ISLAMI_BANK_PLC', 'GLOBAL_ISLAMI_BANK_PLC', 'ICB_ISLAMIC_BANK_PLC', 'ISLAMI_BANK_BANGLADESH_PLC', 'SHAHJALAL_ISLAMI_BANK_PLC', 'SOCIAL_ISLAMI_BANK_PLC', 'STANDARD_BANK_PLC', 'UNION_BANK_PLC', 'BANK_AL_FALAH_LIMITED', 'CITIBANK_N_A', 'COMMERCIAL_BANK_OF_CEYLON_PLC', 'HABIB_BANK_LIMITED', 'HSBC', 'NATIONAL_BANK_OF_PAKISTAN', 'STANDARD_CHARTERED_BANK', 'STATE_BANK_OF_INDIA', 'WOORI_BANK', 'ANSAR_VDP_UNNAYAN_BANK', 'KARMASHANGOSTHAN_BANK', 'GRAMEEN_BANK', 'JUBILEE_BANK', 'PALLI_SANCHAY_BANK');

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
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "creditCards" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "freeAnnualFee" TEXT NOT NULL,
    "regularAnnualFee" TEXT NOT NULL,
    "annualFeeWaived" TEXT NOT NULL,
    "annualFeeWaivedReward" TEXT NOT NULL,
    "interestPerDay" TEXT NOT NULL,
    "interestFreePeriod" TEXT NOT NULL,
    "freeSupplementaryCards" TEXT NOT NULL,
    "maxSupplementaryCards" TEXT NOT NULL,
    "balanceTransferAvailability" TEXT NOT NULL,
    "ownBankATMFee" TEXT NOT NULL,
    "otherBankATMFee" TEXT NOT NULL,
    "loungeFacility" TEXT NOT NULL,
    "loungeVisit" TEXT NOT NULL,
    "cardChequeProcessingFee" TEXT NOT NULL,
    "processingFeeMinimum" TEXT NOT NULL,
    "cashWithdrawalLimit" TEXT NOT NULL,
    "cardType" TEXT NOT NULL DEFAULT 'CREDIT_CARD',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "coverImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "creditCards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesCreditCard" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "creditCardId" TEXT,

    CONSTRAINT "FeaturesCreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityCreditCard" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "creditCardId" TEXT,

    CONSTRAINT "EligibilityCreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesCreditCard" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "creditCardId" TEXT,

    CONSTRAINT "FeesChargesCreditCard_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "loanApplicationForm" (
    "id" TEXT NOT NULL,
    "status" "LoanStatus" NOT NULL DEFAULT 'SUBMITTED',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "adminNotes" TEXT,
    "applicationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "loanApplicationForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalInfo" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fatherOrHusbandName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "spouseName" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "identificationType" TEXT NOT NULL,
    "identificationNumber" TEXT NOT NULL,
    "religion" TEXT,
    "residentialStatus" TEXT,
    "mobileNumber" TEXT NOT NULL,
    "alternateMobileNumber" TEXT,
    "emailAddress" TEXT NOT NULL,
    "socialMediaProfiles" TEXT[],
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "PersonalInfo_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "TestApplication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TestApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestBasicInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "testApplicationId" TEXT NOT NULL,

    CONSTRAINT "TestBasicInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestContactInfo" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "testApplicationId" TEXT NOT NULL,

    CONSTRAINT "TestContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestProfession" (
    "id" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "monthlyIncome" DOUBLE PRECISION NOT NULL,
    "testApplicationId" TEXT NOT NULL,

    CONSTRAINT "TestProfession_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "userBanks" (
    "id" TEXT NOT NULL,
    "bankName" "BankName" NOT NULL,
    "loginId" TEXT NOT NULL DEFAULT '123456789',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bankCode" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
    "blockedAt" TIMESTAMP(3),
    "role" "UserBankRole" NOT NULL DEFAULT 'BANK_USER',
    "isMEOSingnedIn" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userBanks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesCarLoan_carLoanId_key" ON "FeaturesCarLoan"("carLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityCarLoan_carLoanId_key" ON "EligibilityCarLoan"("carLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesCarLoan_carLoanId_key" ON "FeesChargesCarLoan"("carLoanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesCreditCard_creditCardId_key" ON "FeaturesCreditCard"("creditCardId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityCreditCard_creditCardId_key" ON "EligibilityCreditCard"("creditCardId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesCreditCard_creditCardId_key" ON "FeesChargesCreditCard"("creditCardId");

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
CREATE INDEX "loanApplicationForm_applicationId_status_idx" ON "loanApplicationForm"("applicationId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInfo_loanApplicationFormId_key" ON "PersonalInfo"("loanApplicationFormId");

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
CREATE UNIQUE INDEX "TestBasicInfo_testApplicationId_key" ON "TestBasicInfo"("testApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "TestContactInfo_email_key" ON "TestContactInfo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TestContactInfo_testApplicationId_key" ON "TestContactInfo"("testApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "TestProfession_testApplicationId_key" ON "TestProfession"("testApplicationId");

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

-- CreateIndex
CREATE UNIQUE INDEX "userBanks_loginId_key" ON "userBanks"("loginId");
