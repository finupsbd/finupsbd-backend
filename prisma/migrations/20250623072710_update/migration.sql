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
    "loanApplicationFormId" TEXT NOT NULL,

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
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "PersonalGuarantor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuarantorInfoDocument" (
    "id" TEXT NOT NULL,
    "secure_url" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "personalGuarantorId" TEXT,
    "businessGuarantorId" TEXT,

    CONSTRAINT "GuarantorInfoDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessGuarantor_loanApplicationFormId_key" ON "BusinessGuarantor"("loanApplicationFormId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalGuarantor_loanApplicationFormId_key" ON "PersonalGuarantor"("loanApplicationFormId");

-- AddForeignKey
ALTER TABLE "BusinessGuarantor" ADD CONSTRAINT "BusinessGuarantor_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalGuarantor" ADD CONSTRAINT "PersonalGuarantor_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuarantorInfoDocument" ADD CONSTRAINT "GuarantorInfoDocument_personalGuarantorId_fkey" FOREIGN KEY ("personalGuarantorId") REFERENCES "PersonalGuarantor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuarantorInfoDocument" ADD CONSTRAINT "GuarantorInfoDocument_businessGuarantorId_fkey" FOREIGN KEY ("businessGuarantorId") REFERENCES "BusinessGuarantor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
