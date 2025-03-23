
/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../../../app";
import { TEligibilityCheck } from "../eligibilityCheck.interface";
import { calculateEMI } from "../utils/calculateEMI";
import { ExistingLoanType } from "../eligibilityCheck.interface";
import { suggestEligibleLoanAmount } from "../utils/suggestEligibleLoanAmount";

export const instantLoan = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {
    try {

        const page = query.page ? Number(query.page) : 1;
        const pageSize = query.pageSize ? Number(query.pageSize) : 3;

        // Remove pagination keys from query to use the rest as filters
        const { page: _page, pageSize: _pageSize, sortOrder, sortKey, amount = payload.monthlyIncome, tenure,  searchTerm, interestRate, ...filter } = query;


        const buildFilters = () => {
            const filters: any = {};
            if (typeof searchTerm === 'string' && searchTerm.trim()) {
                const searchTerms = searchTerm.split(',')
                    .map(term => term.trim())
                    .filter(term => term.length > 0);

                // Build an OR filter for each search term
                if (searchTerms.length > 0) {
                    filters.OR = searchTerms.map(term => ({
                        bankName: {
                            contains: term,
                            mode: 'insensitive'
                        }
                    }));
                }
            }

            if (typeof interestRate === 'string' && interestRate.trim()) {
                filters.interestRate = {
                    contains: interestRate.trim(),
                    mode: 'insensitive',
                };
            }
            return filters;
        };
        const filters = buildFilters();





        const [loans, totalLoans] = await prisma.$transaction([
            prisma.instantLoan.findMany({
                where: filters,
                // skip: Math.max(0, (page - 1) * pageSize),
                // take: pageSize,
                // Optionally, order by a specific field (e.g., createdAt)
                orderBy: { createdAt: 'asc' },
                include: {
                    EligibilityInstantLoan: true,
                    FeaturesInstantLoan: true,
                    FeesChargesInstantLoan: true,
                },
            }),
            prisma.instantLoan.count({
                where: filters,
            }),
        ]);



        const forEligibleLoan = { ...payload }



        if(payload?.existingLoanType){
            payload.existingLoanType = tenure as ExistingLoanType
        }


        // Calculate the monthly income after deducting the loan EMI, base loan 50% . 
        if (payload?.monthlyIncome) {
            payload.monthlyIncome = payload.monthlyIncome / 2
            forEligibleLoan.monthlyIncome = forEligibleLoan.monthlyIncome / 2
        }

        if (payload?.haveAnyRentalIncome) {
            payload.monthlyIncome = payload.monthlyIncome + payload.rentalIncome!
        }

        if (payload?.haveAnyLoan) {
            payload.monthlyIncome = payload.monthlyIncome - (payload.EMIAmountBDT ?? 0);
        }

        if (payload?.haveAnyCreditCard) {
            payload.monthlyIncome = payload.monthlyIncome - (payload.numberOfCard! * 2000);
        }


        const suggestedLoans = loans.map((loan) => {

            const monthlyEMI = calculateEMI(Number(amount), Number(loan.interestRate), Number(tenure));
            const totalRepayment = monthlyEMI * Number(tenure);
            const eligibleLoanAmount = suggestEligibleLoanAmount(payload.monthlyIncome, Number(loan.interestRate), Number(tenure));
            // Flag the loan as eligible if the EMI is less than or equal to 50% of the monthly income.
            // const eligibleLoan = monthlyEMI <= (payload.monthlyIncome * 0.5);


            return {
                id: loan.id,
                bankName: loan.bankName,
                amount: Math.floor(Number(amount)).toFixed(2),
                periodMonths: tenure,
                loanType: loan.loanType,
                monthlyEMI: Math.floor(Number(monthlyEMI)).toFixed(2),
                totalRepayment: Math.floor(totalRepayment).toFixed(2),
                coverImage: loan.coverImage,
                interestRate: loan.interestRate,
                processingFee: loan.processingFee,
                eligibleLoan: Math.floor(Number(eligibleLoanAmount)).toFixed(2),
                features: loan.FeaturesInstantLoan,
                feesCharges: loan.FeesChargesInstantLoan,
                eligibility: loan.EligibilityInstantLoan,
            };
        });


        if (typeof sortKey === 'string') {
            if (sortKey.toLowerCase() === 'asc') {
                suggestedLoans.sort((a, b) => Number(b.interestRate) - Number(a.interestRate));
            } else if (sortKey.toLowerCase() === 'desc') {
                suggestedLoans.sort((a, b) => Number(a.interestRate) - Number(b.interestRate));
            }
        }

        if (typeof sortOrder === 'string') {
            if (sortOrder.toLowerCase() === 'desc') {
                suggestedLoans.sort((a, b) => Number(b.eligibleLoan) - Number(a.eligibleLoan));
            } else if (sortOrder.toLowerCase() === 'asc') {
                suggestedLoans.sort((a, b) => Number(a.eligibleLoan) - Number(b.eligibleLoan));
            }
        }


        return {
            data: suggestedLoans,
            pagination: {
                page,
                pageSize,
                totalLoans,
            }
        };
    } catch (error) {
        console.error("Error in homeLoan function:", error);
        throw error;
    }
};

export default instantLoan;



