import { TEligibilityCheck } from "../eligibilityCheck.interface";
import { calculateEMI } from "../utils/calculateEMI";
import { prisma } from "../../../../app";
import AppError from "../../../error/AppError";




export const instantLoan = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {

    const {
        page: _page,
        pageSize: _pageSize,
        sortOrder,
        sortKey,
        amount = payload.monthlyIncome,
        tenure = payload.expectedLoanTenure,
        ...restQuery
    } = query;
    try {

        const [loans] = await prisma.$transaction([
            prisma.instantLoan.findMany({
                include: {
                    EligibilityInstantLoan: true,
                    FeaturesInstantLoan: true,
                    FeesChargesInstantLoan: true,
                },
            })
        ]);

        if (loans.length === 0) {
            throw new AppError(404, "No loans found for the given criteria.");
        }
       



        if (payload.monthlyIncome >= 50000) {
            payload.monthlyIncome = 50000;
        }


        if (payload.haveAnyRentalIncome) {
            payload.rentalIncome = (payload.rentalIncome || 0) + (payload.rentalIncome || 0);
        }

        if (payload.haveAnyLoan) {
            const totalEmi = payload.existingLoans?.reduce((acc, loan) => acc + loan.emiAmountBDT, 0) || 0;
            payload.monthlyIncome -= totalEmi
        }

        if (payload.haveAnyCreditCard) {
            payload.monthlyIncome -= (payload.numberOfCard || 0) * 2000;
        }




        const suggestedLoans = loans.map((loan) => {
            const monthlyEMI = calculateEMI(Number(amount), Number(loan.interestRate), Number(tenure));
            const totalRepayment = monthlyEMI * Number(tenure);



            return {
                id: loan.id,
                bankName: loan.bankName,
                amount: Math.floor(Number(amount)).toFixed(2),
                periodMonths: payload.tenure,
                loanType: loan.loanType,
                monthlyEMI: Math.floor(monthlyEMI).toFixed(2),
                totalRepayment: Math.floor(totalRepayment).toFixed(2),
                coverImage: loan.coverImage,
                interestRate: Number(loan.interestRate),
                processingFee: loan.processingFee,
                eligibleLoan: payload.monthlyIncome,
                features: loan.FeaturesInstantLoan,
                feesCharges: loan.FeesChargesInstantLoan,
                eligibility: loan.EligibilityInstantLoan,
            };
        });


        return suggestedLoans
    } catch (error) {
        console.error("Error in instantLoan function:", error);
        throw error;
    }
};
