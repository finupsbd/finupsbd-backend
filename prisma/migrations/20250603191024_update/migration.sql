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

-- AddForeignKey
ALTER TABLE "GuarantorInfoDocument" ADD CONSTRAINT "GuarantorInfoDocument_personalGuarantorId_fkey" FOREIGN KEY ("personalGuarantorId") REFERENCES "PersonalGuarantor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuarantorInfoDocument" ADD CONSTRAINT "GuarantorInfoDocument_businessGuarantorId_fkey" FOREIGN KEY ("businessGuarantorId") REFERENCES "BusinessGuarantor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
