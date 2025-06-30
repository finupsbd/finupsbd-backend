-- CreateTable
CREATE TABLE "AdditionalDocument" (
    "id" TEXT NOT NULL,
    "fieldName" TEXT,
    "url" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "AdditionalDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdditionalDocument" ADD CONSTRAINT "AdditionalDocument_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
