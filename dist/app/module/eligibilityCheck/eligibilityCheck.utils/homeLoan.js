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
exports.homeLoan = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const app_1 = require("../../../../app");
const calculateEMI_1 = require("../utils/calculateEMI");
const suggestEligibleLoanAmount_1 = require("../utils/suggestEligibleLoanAmount");
const homeLoan = (payload, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract pagination parameters and default to page 1 and 10 items per page if not provided.
        const page = query.page ? Number(query.page) : 1;
        const pageSize = query.pageSize ? Number(query.pageSize) : 10;
        // Remove pagination keys from query to use the rest as filters
        const { page: _page, pageSize: _pageSize, amount = 200000, searchTerm, interestRate } = query, filter = __rest(query, ["page", "pageSize", "amount", "searchTerm", "interestRate"]);
        const buildFilters = () => {
            const filters = {};
            if (typeof searchTerm === 'string' && searchTerm.trim()) {
                filters.bankName = {
                    contains: searchTerm.trim(),
                    mode: 'insensitive',
                };
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
            app_1.prisma.homeLoan.findMany({
                where: filters,
                skip: Math.max(0, (page - 1) * pageSize),
                take: pageSize,
                // Optionally, order by a specific field (e.g., createdAt)
                orderBy: { createdAt: 'desc' },
                include: {
                    EligibilityHomeLoan: true,
                    FeaturesHomeLoan: true,
                    FeesChargesHomeLoan: true,
                },
            }),
            app_1.prisma.personalLoan.count({
                where: filters,
            }),
        ]);
        const suggestedLoans = loans.map((loan) => {
            var _a, _b;
            // Calculate the monthly income after deducting the loan EMI, base loan 50% . 
            if (payload === null || payload === void 0 ? void 0 : payload.monthlyIncome) {
                payload.monthlyIncome = payload.monthlyIncome / 2;
            }
            if (payload === null || payload === void 0 ? void 0 : payload.haveAnyLoan) {
                payload.monthlyIncome = payload.monthlyIncome - ((_a = payload.EMIAmountBDT) !== null && _a !== void 0 ? _a : 0);
            }
            if (payload === null || payload === void 0 ? void 0 : payload.haveAnyRentalIncome) {
                payload.monthlyIncome = (payload === null || payload === void 0 ? void 0 : payload.monthlyIncome) + ((_b = payload === null || payload === void 0 ? void 0 : payload.rentalIncome) !== null && _b !== void 0 ? _b : 0);
            }
            if ((payload === null || payload === void 0 ? void 0 : payload.haveAnyCreditCard) && (payload === null || payload === void 0 ? void 0 : payload.cardType) === "CREDIT_CARD") {
                payload.monthlyIncome = Number(payload.monthlyIncome) - (Number(payload.numberOfCard) * 2000);
            }
            const monthlyEMI = (0, calculateEMI_1.calculateEMI)(Number(amount), Number(loan.interestRate), payload.expectedLoanTenure);
            const totalRepayment = monthlyEMI * payload.expectedLoanTenure;
            const eligibleLoanAmount = (0, suggestEligibleLoanAmount_1.suggestEligibleLoanAmount)(payload === null || payload === void 0 ? void 0 : payload.monthlyIncome, Number(loan.interestRate), payload.expectedLoanTenure);
            // Flag the loan as eligible if the EMI is less than or equal to 50% of the monthly income.
            // const eligibleLoan = monthlyEMI <= (payload.monthlyIncome * 0.5);
            return {
                id: loan.id,
                bankName: loan.bankName,
                amount: amount,
                periodMonths: payload.expectedLoanTenure,
                loanType: loan.loanType,
                monthlyEMI: monthlyEMI,
                totalRepayment: totalRepayment,
                coverImage: loan.coverImage,
                interestRate: loan.interestRate,
                processingFee: loan.processingFee,
                eligibleLoan: eligibleLoanAmount,
                features: loan.FeaturesHomeLoan,
                feesCharges: loan.FeesChargesHomeLoan,
                eligibility: loan.EligibilityHomeLoan,
            };
        });
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
exports.homeLoan = homeLoan;
exports.default = exports.homeLoan;
