import { TEligibilityCheck } from "../eligibilityCheck.interface";
import { calculateEMI } from "../utils/calculateEMI";
import { prisma } from "../../../../app";
import AppError from "../../../error/AppError";

export const instantLoan = async (
  payload: TEligibilityCheck,
  query: Record<string, unknown>
) => {
  const {tenure = Number(payload.expectedLoanTenure),
  } = query;

console.log({payload})


  try {
    const [loans] = await prisma.$transaction([
      prisma.instantLoan.findMany({
        include: {
          EligibilityInstantLoan: true, 
          FeaturesInstantLoan: true,
          FeesChargesInstantLoan: true,
        },
      }),
    ]);

    if (!loans.length) {
      throw new AppError(404, "No loans found for the given criteria.");
    }

    let adjustedMonthlyIncome = Math.min(payload.monthlyIncome || 0, 50000);

    if (payload.haveAnyRentalIncome && payload.rentalIncome) {
      adjustedMonthlyIncome += payload.rentalIncome;
    }

    if (payload.haveAnyLoan && payload.existingLoans?.length) {
      const totalEMI = payload.existingLoans.reduce((sum, loan) => sum + (loan.emiAmountBDT || 0), 0);
      adjustedMonthlyIncome -= totalEMI;
    }


    if (payload.haveAnyCreditCard && payload.numberOfCard) {
      adjustedMonthlyIncome -= payload.numberOfCard * 2000;
    }

    const suggestedLoans = loans.map((loan) => {
      const interest = Number(loan.interestRate) || 0;
      const duration = Number(tenure) || 0;

      const monthlyEMI = calculateEMI(payload.monthlyIncome, interest, duration);
      const totalRepayment = monthlyEMI * duration;

      return {
        id: loan.id,
        bankName: loan.bankName,
        amount: payload.monthlyIncome.toFixed(2),
        periodMonths: payload.tenure,
        loanType: loan.loanType,
        monthlyEMI: monthlyEMI.toFixed(2),
        totalRepayment: totalRepayment.toFixed(2),
        expectedLoanTenure:tenure,
        coverImage: loan.coverImage,
        interestRate: interest,
        processingFee: loan.processingFee,
        eligibleLoan: adjustedMonthlyIncome.toFixed(2),
        features: loan.FeaturesInstantLoan,
        feesCharges: loan.FeesChargesInstantLoan,
        eligibility: loan.EligibilityInstantLoan,
      };
    });

    return suggestedLoans;
  } catch (error) {
    console.error("Error in instantLoan function:", error);
    throw error;
  }
};
