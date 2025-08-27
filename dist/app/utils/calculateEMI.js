"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEMI = calculateEMI;
function calculateEMI(principal, annualRate, months) {
    const monthlyRate = annualRate / (12 * 100); // Convert annual % to monthly decimal
    const n = months;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
        (Math.pow(1 + monthlyRate, n) - 1);
    return Math.round(emi); // Rounded to nearest integer
}
// // Example usage
// const loanAmount = 15000;
// const interestRate = 11.5; // annual interest rate in %
// const periodMonths = 2;
// const emi = calculateEMI(loanAmount, interestRate, periodMonths);
// console.log(`Loan Amount: ${loanAmount}`);
// console.log(`Interest Rate: ${interestRate}%`);
// console.log(`Tenure: ${periodMonths} months`);
// console.log(`Monthly EMI: ${emi} Taka`);
