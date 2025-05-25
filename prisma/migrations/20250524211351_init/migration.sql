-- DropIndex
DROP INDEX "eligibilityCheck_loanType_name_email_phone_idx";

-- CreateIndex
CREATE INDEX "eligibilityCheck_loanType_name_email_phone_isAppliedLoan_idx" ON "eligibilityCheck"("loanType", "name", "email", "phone", "isAppliedLoan");
