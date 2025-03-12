"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEMI = void 0;
// Reuse your EMI calculation as-is:
const calculateEMI = (loanAmount, interestRate, tenureMonths) => {
    if (interestRate === 0)
        return loanAmount / tenureMonths; // Handle zero-interest case
    const monthlyRate = interestRate / (12 * 100);
    return ((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1));
};
exports.calculateEMI = calculateEMI;
