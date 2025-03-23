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
/* eslint-disable @typescript-eslint/no-explicit-any */
const app_1 = require("../../../../app");
const calculateEMI_1 = require("../utils/calculateEMI");
const suggestEligibleLoanAmount_1 = require("../utils/suggestEligibleLoanAmount");
const instantLoan = (payload, query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const page = query.page ? Number(query.page) : 1;
        const pageSize = query.pageSize ? Number(query.pageSize) : 3;
        // Remove pagination keys from query to use the rest as filters
        const { page: _page, pageSize: _pageSize, sortOrder, sortKey, amount = payload.monthlyIncome, tenure, searchTerm, interestRate } = query, filter = __rest(query, ["page", "pageSize", "sortOrder", "sortKey", "amount", "tenure", "searchTerm", "interestRate"]);
        const buildFilters = () => {
            const filters = {};
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
        const [loans, totalLoans] = yield app_1.prisma.$transaction([
            app_1.prisma.instantLoan.findMany({
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
            app_1.prisma.instantLoan.count({
                where: filters,
            }),
        ]);
        const forEligibleLoan = Object.assign({}, payload);
        if (payload === null || payload === void 0 ? void 0 : payload.existingLoanType) {
            payload.existingLoanType = tenure;
        }
        // Calculate the monthly income after deducting the loan EMI, base loan 50% . 
        if (payload === null || payload === void 0 ? void 0 : payload.monthlyIncome) {
            payload.monthlyIncome = payload.monthlyIncome / 2;
            forEligibleLoan.monthlyIncome = forEligibleLoan.monthlyIncome / 2;
        }
        if (payload === null || payload === void 0 ? void 0 : payload.haveAnyRentalIncome) {
            payload.monthlyIncome = payload.monthlyIncome + payload.rentalIncome;
        }
        if (payload === null || payload === void 0 ? void 0 : payload.haveAnyLoan) {
            payload.monthlyIncome = payload.monthlyIncome - ((_a = payload.EMIAmountBDT) !== null && _a !== void 0 ? _a : 0);
        }
        if (payload === null || payload === void 0 ? void 0 : payload.haveAnyCreditCard) {
            payload.monthlyIncome = payload.monthlyIncome - (payload.numberOfCard * 2000);
        }
        const suggestedLoans = loans.map((loan) => {
            const monthlyEMI = (0, calculateEMI_1.calculateEMI)(Number(amount), Number(loan.interestRate), Number(tenure));
            const totalRepayment = monthlyEMI * Number(tenure);
            const eligibleLoanAmount = (0, suggestEligibleLoanAmount_1.suggestEligibleLoanAmount)(payload.monthlyIncome, Number(loan.interestRate), Number(tenure));
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
            }
            else if (sortKey.toLowerCase() === 'desc') {
                suggestedLoans.sort((a, b) => Number(a.interestRate) - Number(b.interestRate));
            }
        }
        if (typeof sortOrder === 'string') {
            if (sortOrder.toLowerCase() === 'desc') {
                suggestedLoans.sort((a, b) => Number(b.eligibleLoan) - Number(a.eligibleLoan));
            }
            else if (sortOrder.toLowerCase() === 'asc') {
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
    }
    catch (error) {
        console.error("Error in homeLoan function:", error);
        throw error;
    }
});
exports.instantLoan = instantLoan;
exports.default = exports.instantLoan;
