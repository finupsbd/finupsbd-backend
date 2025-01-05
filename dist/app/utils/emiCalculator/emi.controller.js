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
exports.PublicController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../catchAsync"));
const emiCalculator = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loanAmount, interestRate, numberOfMonths, disbursementDate } = req.body;
    const monthlyRate = interestRate / 12 / 100; // Convert annual rate to monthly rate
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
        (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    // Format response
    const result = {
        "Disbursement Date": new Date(disbursementDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),
        "Loan Amount": loanAmount.toLocaleString("en-US", { style: "currency", currency: "BDT" }),
        "Number of Schedule": numberOfMonths,
        "Interest Rate": `${interestRate.toFixed(2)} %`,
        "EMI Amount": emi.toFixed(2),
    };
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Emi Calculate Successfully",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
exports.PublicController = {
    emiCalculator
};
