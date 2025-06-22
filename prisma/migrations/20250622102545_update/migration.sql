-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "loanApplicationId" TEXT,
    "url" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loanApplicationFormId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_loanApplicationFormId_key" ON "Document"("loanApplicationFormId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
