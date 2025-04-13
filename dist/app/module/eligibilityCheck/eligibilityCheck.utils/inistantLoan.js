"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instantLoan = void 0;
const calculateEMI_1 = require("../utils/calculateEMI");
const app_1 = require("../../../../app");
const buildFilters = (query) => {
    const filters = {};
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
const adjustMonthlyIncome = (payload) => {
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
    return Object.assign(Object.assign({}, payload), { monthlyIncome: income });
};
const sortLoans = (loans, sortKey, sortOrder) => {
    if (typeof sortKey === 'string') {
        const direction = sortKey.toLowerCase();
        if (direction === 'asc') {
            loans.sort((a, b) => Number(b.interestRate) - Number(a.interestRate));
        }
        else if (direction === 'desc') {
            loans.sort((a, b) => Number(a.interestRate) - Number(b.interestRate));
        }
    }
    if (typeof sortOrder === 'string') {
        const order = sortOrder.toLowerCase();
        if (order === 'desc') {
            loans.sort((a, b) => Number(b.eligibleLoan) - Number(a.eligibleLoan));
        }
        else if (order === 'asc') {
            loans.sort((a, b) => Number(a.eligibleLoan) - Number(b.eligibleLoan));
        }
    }
    return loans;
};
const instantLoan = (payload, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = query.page ? Number(query.page) : 1;
        const pageSize = query.pageSize ? Number(query.pageSize) : 3;
        const { page: _page, pageSize: _pageSize, sortOrder, sortKey, amount = payload.monthlyIncome, tenure } = query, restQuery = __rest(query, ["page", "pageSize", "sortOrder", "sortKey", "amount", "tenure"]);
        const filters = buildFilters(query);
        const [loans, totalLoans] = yield app_1.prisma.$transaction([
            app_1.prisma.instantLoan.findMany({
                where: filters,
                orderBy: { createdAt: 'asc' },
                include: {
                    EligibilityInstantLoan: true,
                    FeaturesInstantLoan: true,
                    FeesChargesInstantLoan: true,
                },
            }),
            app_1.prisma.instantLoan.count({ where: filters }),
        ]);
        if (payload.existingLoanType) {
            payload.existingLoanType = tenure;
        }
        const adjustedPayload = adjustMonthlyIncome(payload);
        const suggestedLoans = loans.map((loan) => {
            const monthlyEMI = (0, calculateEMI_1.calculateEMI)(Number(amount), Number(loan.interestRate), Number(tenure));
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
        const sortedLoans = sortLoans(suggestedLoans, sortKey, sortOrder);
        return {
            data: sortedLoans,
            pagination: {
                page,
                pageSize,
                totalLoans,
            },
        };
    }
    catch (error) {
        console.error("Error in instantLoan function:", error);
        throw error;
    }
});
exports.instantLoan = instantLoan;
