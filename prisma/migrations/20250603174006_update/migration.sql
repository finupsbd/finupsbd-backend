-- CreateTable
CREATE TABLE "GuarantorInfo" (
    "id" TEXT NOT NULL,
    "businessGuarantorId" TEXT NOT NULL,
    "personalGuarantorId" TEXT NOT NULL,
    "loanApplicationFormId" TEXT,

    CONSTRAINT "GuarantorInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessGuarantor" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fatherOrHusbandName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "nationalIdNumber" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "presentAddress" TEXT NOT NULL,
    "relationWithApplicant" TEXT NOT NULL,
    "workAddress" TEXT NOT NULL,

    CONSTRAINT "BusinessGuarantor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalGuarantor" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fatherOrHusbandName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "nationalIdNumber" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "presentAddress" TEXT NOT NULL,
    "relationWithApplicant" TEXT NOT NULL,
    "workAddress" TEXT NOT NULL,

    CONSTRAINT "PersonalGuarantor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuarantorInfo_businessGuarantorId_key" ON "GuarantorInfo"("businessGuarantorId");

-- CreateIndex
CREATE UNIQUE INDEX "GuarantorInfo_personalGuarantorId_key" ON "GuarantorInfo"("personalGuarantorId");

-- CreateIndex
CREATE UNIQUE INDEX "GuarantorInfo_loanApplicationFormId_key" ON "GuarantorInfo"("loanApplicationFormId");

-- AddForeignKey
ALTER TABLE "GuarantorInfo" ADD CONSTRAINT "GuarantorInfo_businessGuarantorId_fkey" FOREIGN KEY ("businessGuarantorId") REFERENCES "BusinessGuarantor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuarantorInfo" ADD CONSTRAINT "GuarantorInfo_personalGuarantorId_fkey" FOREIGN KEY ("personalGuarantorId") REFERENCES "PersonalGuarantor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuarantorInfo" ADD CONSTRAINT "GuarantorInfo_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
