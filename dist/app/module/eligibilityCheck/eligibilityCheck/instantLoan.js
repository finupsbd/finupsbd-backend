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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instantLoan = void 0;
const calculateEMI_1 = require("../utils/calculateEMI");
const app_1 = require("../../../../app");
const AppError_1 = __importDefault(require("../../../error/AppError"));
const instantLoan = (payload, query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { page: _page, pageSize: _pageSize, sortOrder, sortKey, amount = payload.monthlyIncome, tenure = payload.expectedLoanTenure } = query, restQuery = __rest(query, ["page", "pageSize", "sortOrder", "sortKey", "amount", "tenure"]);
    try {
        const [loans] = yield app_1.prisma.$transaction([
            app_1.prisma.instantLoan.findMany({
                include: {
                    EligibilityInstantLoan: true,
                    FeaturesInstantLoan: true,
                    FeesChargesInstantLoan: true,
                },
            })
        ]);
        if (loans.length === 0) {
            throw new AppError_1.default(404, "No loans found for the given criteria.");
        }
        if (payload.monthlyIncome >= 50000) {
            payload.monthlyIncome = 50000;
        }
        if (payload.haveAnyRentalIncome) {
            payload.rentalIncome = (payload.rentalIncome || 0) + (payload.rentalIncome || 0);
        }
        if (payload.haveAnyLoan) {
            const totalEmi = ((_a = payload.existingLoans) === null || _a === void 0 ? void 0 : _a.reduce((acc, loan) => acc + loan.emiAmountBDT, 0)) || 0;
            payload.monthlyIncome -= totalEmi;
        }
        if (payload.haveAnyCreditCard) {
            payload.monthlyIncome -= (payload.numberOfCard || 0) * 2000;
        }
        const suggestedLoans = loans.map((loan) => {
            const monthlyEMI = (0, calculateEMI_1.calculateEMI)(Number(amount), Number(loan.interestRate), Number(tenure));
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
        return suggestedLoans;
    }
    catch (error) {
        console.error("Error in instantLoan function:", error);
        throw error;
    }
});
exports.instantLoan = instantLoan;
