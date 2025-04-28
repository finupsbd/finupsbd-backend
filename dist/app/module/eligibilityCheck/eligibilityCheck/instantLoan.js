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
Object.defineProperty(exports, "__esModule", { value: true });
exports.instantLoan = void 0;
const calculateEMI_1 = require("../utils/calculateEMI");
const app_1 = require("../../../../app");
const calculateAge_1 = require("../../../utils/calculateAge");
const adjustMonthlyIncome = (payload) => {
    var _a;
    let income = payload.monthlyIncome;
    if (income > 50000) {
        income = 50000;
    }
    if (payload.haveAnyRentalIncome) {
        income += payload.rentalIncome || 0;
    }
    if (payload.haveAnyLoan) {
        const totalEmi = ((_a = payload.existingLoans) === null || _a === void 0 ? void 0 : _a.reduce((acc, loan) => acc + loan.emiAmountBDT, 0)) || 0;
        payload.monthlyIncome -= totalEmi;
    }
    if (payload.haveAnyCreditCard) {
        income -= (payload.numberOfCard || 0) * 2000;
    }
    return Object.assign(Object.assign({}, payload), { monthlyIncome: income });
};
const instantLoan = (payload, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [loans] = yield app_1.prisma.$transaction([
            app_1.prisma.instantLoan.findMany({
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
                        ageRequirement: { gte: (0, calculateAge_1.calculateAge)(payload.dateOfBirth.toISOString()) },
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
            const monthlyEMI = (0, calculateEMI_1.calculateEMI)(Number(adjustedPayload.amount), Number(loan.interestRate), Number(adjustedPayload.tenure));
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
        return suggestedLoans;
    }
    catch (error) {
        console.error("Error in instantLoan function:", error);
        throw error;
    }
});
exports.instantLoan = instantLoan;
