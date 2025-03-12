"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestEligibleLoanAmount = void 0;
const suggestEligibleLoanAmount = (fixedEmi, // directly supplied maximum EMI
annualInterestRate, // e.g., 11.75 for 11.75% per year
tenureMonths // e.g., 36 months
) => {
    // Convert annual interest rate to monthly decimal rate
    const monthlyRate = (annualInterestRate / 100) / 12;
    if (monthlyRate === 0) {
        // When interest rate is 0%, eligible loan amount is EMI * tenure
        return parseFloat((fixedEmi * tenureMonths).toFixed(2));
    }
    // EMI formula to compute the principal
    const discountFactor = 1 - Math.pow(1 + monthlyRate, -tenureMonths);
    const principal = fixedEmi * (discountFactor / monthlyRate);
    return parseFloat(principal.toFixed(2));
};
exports.suggestEligibleLoanAmount = suggestEligibleLoanAmount;
