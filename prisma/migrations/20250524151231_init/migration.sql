-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carLoan" ADD CONSTRAINT "carLoan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesCarLoan" ADD CONSTRAINT "FeaturesCarLoan_carLoanId_fkey" FOREIGN KEY ("carLoanId") REFERENCES "carLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityCarLoan" ADD CONSTRAINT "EligibilityCarLoan_carLoanId_fkey" FOREIGN KEY ("carLoanId") REFERENCES "carLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesChargesCarLoan" ADD CONSTRAINT "FeesChargesCarLoan_carLoanId_fkey" FOREIGN KEY ("carLoanId") REFERENCES "carLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creditCards" ADD CONSTRAINT "creditCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesCreditCard" ADD CONSTRAINT "FeaturesCreditCard_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "creditCards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityCreditCard" ADD CONSTRAINT "EligibilityCreditCard_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "creditCards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesChargesCreditCard" ADD CONSTRAINT "FeesChargesCreditCard_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "creditCards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "existingLoans" ADD CONSTRAINT "existingLoans_eligibilityCheckId_fkey" FOREIGN KEY ("eligibilityCheckId") REFERENCES "eligibilityCheck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homeLoan" ADD CONSTRAINT "homeLoan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesHomeLoan" ADD CONSTRAINT "FeaturesHomeLoan_homeLoanId_fkey" FOREIGN KEY ("homeLoanId") REFERENCES "homeLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityHomeLoan" ADD CONSTRAINT "EligibilityHomeLoan_homeLoanId_fkey" FOREIGN KEY ("homeLoanId") REFERENCES "homeLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesChargesHomeLoan" ADD CONSTRAINT "FeesChargesHomeLoan_homeLoanId_fkey" FOREIGN KEY ("homeLoanId") REFERENCES "homeLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instantLoans" ADD CONSTRAINT "instantLoans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesInstantLoan" ADD CONSTRAINT "FeaturesInstantLoan_InstantLoanId_fkey" FOREIGN KEY ("InstantLoanId") REFERENCES "instantLoans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityInstantLoan" ADD CONSTRAINT "EligibilityInstantLoan_InstantLoanId_fkey" FOREIGN KEY ("InstantLoanId") REFERENCES "instantLoans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesChargesInstantLoan" ADD CONSTRAINT "FeesChargesInstantLoan_InstantLoanId_fkey" FOREIGN KEY ("InstantLoanId") REFERENCES "instantLoans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loanApplicationForm" ADD CONSTRAINT "loanApplicationForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalInfo" ADD CONSTRAINT "PersonalInfo_loanApplicationFormId_fkey" FOREIGN KEY ("loanApplicationFormId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personalLoans" ADD CONSTRAINT "personalLoans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Features" ADD CONSTRAINT "Features_personalLoanId_fkey" FOREIGN KEY ("personalLoanId") REFERENCES "personalLoans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eligibility" ADD CONSTRAINT "Eligibility_personalLoanId_fkey" FOREIGN KEY ("personalLoanId") REFERENCES "personalLoans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesCharges" ADD CONSTRAINT "FeesCharges_personalLoanId_fkey" FOREIGN KEY ("personalLoanId") REFERENCES "personalLoans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "smeLoan" ADD CONSTRAINT "smeLoan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesSMELoan" ADD CONSTRAINT "FeaturesSMELoan_smeLoanId_fkey" FOREIGN KEY ("smeLoanId") REFERENCES "smeLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilitySMELoan" ADD CONSTRAINT "EligibilitySMELoan_smeLoanId_fkey" FOREIGN KEY ("smeLoanId") REFERENCES "smeLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesChargesSMELoan" ADD CONSTRAINT "FeesChargesSMELoan_smeLoanId_fkey" FOREIGN KEY ("smeLoanId") REFERENCES "smeLoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestApplication" ADD CONSTRAINT "TestApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestBasicInfo" ADD CONSTRAINT "TestBasicInfo_testApplicationId_fkey" FOREIGN KEY ("testApplicationId") REFERENCES "TestApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestContactInfo" ADD CONSTRAINT "TestContactInfo_testApplicationId_fkey" FOREIGN KEY ("testApplicationId") REFERENCES "TestApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestProfession" ADD CONSTRAINT "TestProfession_testApplicationId_fkey" FOREIGN KEY ("testApplicationId") REFERENCES "TestApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KycVerification" ADD CONSTRAINT "KycVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageView" ADD CONSTRAINT "PageView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
