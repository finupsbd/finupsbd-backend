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
exports.EligibilityCheckService = void 0;
const eligibilityCheck_constant_1 = require("./eligibilityCheck.constant");
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const personalLoan_1 = __importDefault(require("./eligibilityCheck/personalLoan"));
const instantLoan_1 = require("./eligibilityCheck/instantLoan");
const eligibilityCheck = (payload, query) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Pull out the loans array
    const { existingLoans = [] } = payload, eligibilityData = __rest(payload, ["existingLoans"]);
    console.log(eligibilityData, 'eligibilityData');
    // 2. Create with nested write
    const result = yield app_1.prisma.eligibilityCheck.create({
        data: Object.assign(Object.assign({}, eligibilityData), { existingLoans: {
                create: existingLoans.map((loan) => ({
                    existingLoanType: loan.existingLoanType,
                    emiAmountBDT: loan.emiAmountBDT,
                    interestRate: loan.interestRate,
                })),
            } }),
        include: {
            existingLoans: {
                select: {
                    existingLoanType: true,
                    emiAmountBDT: true,
                    interestRate: true,
                },
            },
        },
    });
    console.log(result, 'result');
    if ((payload === null || payload === void 0 ? void 0 : payload.loanType) === eligibilityCheck_constant_1.loanTypes.INSTANT_LOAN) {
        return yield (0, instantLoan_1.instantLoan)(result, query);
    }
    if ((payload === null || payload === void 0 ? void 0 : payload.loanType) === eligibilityCheck_constant_1.loanTypes.PERSONAL_LOAN) {
        return yield (0, personalLoan_1.default)(result, query);
    }
    // if (payload?.loanType === loanTypes.HOME_LOAN) {
    //   return await homeLoan(result as unknown as TEligibilityCheck, query)
    // }
    // if (payload?.loanType === loanTypes.SME_LOAN) {
    //   return await smeLoan(result as unknown as TEligibilityCheck, query)
    // }
    throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `This module is not yet implemented for ${payload === null || payload === void 0 ? void 0 : payload.loanType} type `);
});
exports.EligibilityCheckService = {
    eligibilityCheck,
};
