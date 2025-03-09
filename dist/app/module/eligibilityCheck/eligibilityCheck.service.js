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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EligibilityCheckService = void 0;
const personalLoan_1 = __importDefault(require("./eligibilityCheck.utils/personalLoan"));
const eligibilityCheck_constant_1 = require("./eligibilityCheck.constant");
const homeLoan_1 = __importDefault(require("./eligibilityCheck.utils/homeLoan"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_codes_1 = require("http-status-codes");
const eligibilityCheck = (payload, query) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.LoanType === eligibilityCheck_constant_1.loanTypes.PERSONAL_LOAN) {
        return yield (0, personalLoan_1.default)(payload, query);
    }
    if (payload.LoanType === eligibilityCheck_constant_1.loanTypes.HOME_LOAN) {
        return yield (0, homeLoan_1.default)(payload, query);
    }
    throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Invalid loan type provided. Please specify a valid loan type ((YOUR PROVIDED LOAN TYPE: ${payload.LoanType})) (Excepeted Formate: PERSONAL_LOAN,   HOME_LOAN ...... types)`);
});
exports.EligibilityCheckService = {
    eligibilityCheck,
};
