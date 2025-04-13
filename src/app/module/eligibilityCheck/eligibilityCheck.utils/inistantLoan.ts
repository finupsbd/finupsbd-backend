import { TEligibilityCheck } from "../eligibilityCheck.interface";
import { calculateEMI } from "../utils/calculateEMI";
import { ExistingLoanType } from "../eligibilityCheck.interface";
import { prisma } from "../../../../app";

const buildFilters = (query: Record<string, unknown>) => {
    const filters: Record<string, unknown> = {};
    const { searchTerm, interestRate } = query;

    if (typeof searchTerm === 'string' && searchTerm.trim()) {
        const searchTerms = searchTerm.split(',').map(term => term.trim()).filter(Boolean);
        if (searchTerms.length > 0) {
            filters.OR = searchTerms.map(term => ({
                bankName: {
                    contains: term,
                    mode: 'insensitive',
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

const adjustMonthlyIncome = (payload: TEligibilityCheck): TEligibilityCheck => {
    let income = payload.monthlyIncome;

    if (income > 50000) {
        income = 50000;
    }

    if (payload.haveAnyRentalIncome) {
        income += payload.rentalIncome || 0;
    }

    if (payload.haveAnyLoan) {
        income -= payload.EMIAmountBDT || 0;
    }

    if (payload.haveAnyCreditCard) {
        income -= (payload.numberOfCard || 0) * 2000;
    }

    return {
        ...payload,
        monthlyIncome: income,
    };
};

interface Loan {
    id: string;
    bankName: string;
    interestRate: number;
    eligibleLoan: number;
    [key: string]: unknown; // Add additional fields as needed
}

const sortLoans = (loans: Loan[], sortKey?: string, sortOrder?: string) => {
    if (typeof sortKey === 'string') {
        const direction = sortKey.toLowerCase();
        if (direction === 'asc') {
            loans.sort((a, b) => Number(b.interestRate) - Number(a.interestRate));
        } else if (direction === 'desc') {
            loans.sort((a, b) => Number(a.interestRate) - Number(b.interestRate));
        }
    }

    if (typeof sortOrder === 'string') {
        const order = sortOrder.toLowerCase();
        if (order === 'desc') {
            loans.sort((a, b) => Number(b.eligibleLoan) - Number(a.eligibleLoan));
        } else if (order === 'asc') {
            loans.sort((a, b) => Number(a.eligibleLoan) - Number(b.eligibleLoan));
        }
    }

    return loans;
};

export const instantLoan = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {
    try {
        const page = query.page ? Number(query.page) : 1;
        const pageSize = query.pageSize ? Number(query.pageSize) : 3;

        const {
            page: _page,
            pageSize: _pageSize,
            sortOrder,
            sortKey,
            amount = payload.monthlyIncome,
            tenure,
            ...restQuery
        } = query;

        const filters = buildFilters(query);

        const [loans, totalLoans] = await prisma.$transaction([
            prisma.instantLoan.findMany({
                where: filters,
                orderBy: { createdAt: 'asc' },
                include: {
                    EligibilityInstantLoan: true,
                    FeaturesInstantLoan: true,
                    FeesChargesInstantLoan: true,
                },
            }),
            prisma.instantLoan.count({ where: filters }),
        ]);

        if (payload.existingLoanType) {
            payload.existingLoanType = tenure as ExistingLoanType;
        }

        const adjustedPayload = adjustMonthlyIncome(payload);

        const suggestedLoans = loans.map((loan) => {
            const monthlyEMI = calculateEMI(Number(amount), Number(loan.interestRate), Number(tenure));
            const totalRepayment = monthlyEMI * Number(tenure);

            return {
                id: loan.id,
                bankName: loan.bankName,
                amount: Math.floor(Number(amount)).toFixed(2),
                periodMonths: tenure,
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

        const sortedLoans = sortLoans(suggestedLoans, sortKey as string, sortOrder as string);

        return {
            data: sortedLoans,
            pagination: {
                page,
                pageSize,
                totalLoans,
            },
        };
    } catch (error) {
        console.error("Error in instantLoan function:", error);
        throw error;
    }
};
