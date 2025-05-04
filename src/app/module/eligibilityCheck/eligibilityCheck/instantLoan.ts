import { TEligibilityCheck } from "../eligibilityCheck.interface";
import { calculateEMI } from "../utils/calculateEMI";
import { prisma } from "../../../../app";
import AppError from "../../../error/AppError";




// const adjustMonthlyIncome = (payload: TEligibilityCheck): TEligibilityCheck => {
//     let income = payload.monthlyIncome;

//     if (income > 50000) {
//         income = 50000;
//     }

//     if (payload.haveAnyRentalIncome) {
//         income += payload.rentalIncome || 0;
//     }

//     if (payload.haveAnyLoan) {
//         const totalEmi = payload.existingLoans?.reduce((acc, loan) => acc + loan.emiAmountBDT, 0) || 0;
//         payload.monthlyIncome -= totalEmi
//     }

//     if (payload.haveAnyCreditCard) {
//         income -= (payload.numberOfCard || 0) * 2000;
//     }

//     return {
//         ...payload,
//         monthlyIncome: income,
//     };
// };


export const instantLoan = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {


    console.log( query, )

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


        console.log(loans, 'loans')

        if (loans.length === 0) {
            throw new AppError(404, "No loans found for the given criteria.");
        }
       



        if (payload.monthlyIncome > 50000) {
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
            const monthlyEMI = calculateEMI(Number(query.amount), Number(loan.interestRate), Number(query.tanure));
            const totalRepayment = monthlyEMI * Number(query.tanure);

            return {
                id: loan.id,
                bankName: loan.bankName,
                amount: Math.floor(Number(query.amount)).toFixed(2),
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
