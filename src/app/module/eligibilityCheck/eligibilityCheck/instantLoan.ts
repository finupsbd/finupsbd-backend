import { TEligibilityCheck } from "../eligibilityCheck.interface";
import { calculateEMI } from "../utils/calculateEMI";
import { prisma } from "../../../../app";
import { calculateAge } from "../../../utils/calculateAge";



const adjustMonthlyIncome = (payload: TEligibilityCheck): TEligibilityCheck => {
    let income = payload.monthlyIncome;

    if (income > 50000) {
        income = 50000;
    }

    if (payload.haveAnyRentalIncome) {
        income += payload.rentalIncome || 0;
    }

    if (payload.haveAnyLoan) {
        const totalEmi = payload.existingLoans?.reduce((acc, loan) => acc + loan.emiAmountBDT, 0) || 0;
         payload.monthlyIncome -= totalEmi
    }

    if (payload.haveAnyCreditCard) {
        income -= (payload.numberOfCard || 0) * 2000;
    }

    return {
        ...payload,
        monthlyIncome: income,
    };
};


export const instantLoan = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {
    try {

        const [loans] = await prisma.$transaction([
            prisma.instantLoan.findMany({
                where: {
                    bankName: {
                        contains: query.searchTerm ? String(query.searchTerm) : undefined,
                        mode: 'insensitive',
                    },
                    interestRate: {
                        contains: query.interestRate ? String(query.interestRate) : undefined,
                        mode: 'insensitive',
                    },
                    EligibilityInstantLoan: {
                        minimumIncome: { gte: payload.monthlyIncome },
                        ageRequirement: { gte: calculateAge(payload.dateOfBirth.toISOString()) },
                    },
                },
                orderBy: { createdAt: 'asc' },
                include: {
                    EligibilityInstantLoan: true,
                    FeaturesInstantLoan: true,
                    FeesChargesInstantLoan: true,
                },
            })
        ]);


        const adjustedPayload = adjustMonthlyIncome(payload);


        console.log("Adjusted Payload:", adjustedPayload);

        const suggestedLoans = loans.map((loan) => {
            const monthlyEMI = calculateEMI(Number(adjustedPayload.amount), Number(loan.interestRate), Number(adjustedPayload.tenure));
            const totalRepayment = monthlyEMI * Number(adjustedPayload.tenure);

            return {
                id: loan.id,
                bankName: loan.bankName,
                amount: Math.floor(Number(payload.amount)).toFixed(2),
                periodMonths: payload.tenure,
                loanType: loan.loanType,
                monthlyEMI: Math.floor(monthlyEMI).toFixed(2),
                totalRepayment: Math.floor(totalRepayment).toFixed(2),
                coverImage: loan.coverImage,
                interestRate: Number(loan.interestRate),
                processingFee: loan.processingFee,
                eligibleLoan: adjustedPayload.monthlyIncome,
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
