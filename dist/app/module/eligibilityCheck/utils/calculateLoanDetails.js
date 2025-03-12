"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateLoanDetails = void 0;
const calculateLoanDetails = (principal, annualInterestRate, tenureMonths, processingFeePercent) => {
    // Convert annual percentage rate to a decimal monthly rate
    const monthlyRate = (annualInterestRate / 100) / 12;
    // EMI calculation using the standard formula
    const emi = (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -tenureMonths));
    // Total amount payable = EMI * number of months
    const totalPayable = emi * tenureMonths;
    // Total interest = total payable - principal
    const totalInterest = totalPayable - principal;
    // Processing fee amount
    const processingFee = principal * (processingFeePercent / 100);
    return {
        monthlyEMI: emi.toFixed(2),
        totalPayable: totalPayable.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        processingFee: processingFee.toFixed(2)
    };
};
exports.calculateLoanDetails = calculateLoanDetails;
