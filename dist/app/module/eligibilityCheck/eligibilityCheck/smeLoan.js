"use strict";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { prisma } from "../../../../app";
// import { TEligibilityCheck } from "../eligibilityCheck.interface";
// import { calculateEMI } from "../utils/calculateEMI";
// import { suggestEligibleLoanAmount } from "../utils/suggestEligibleLoanAmount";
// export const smeLoan = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {
//   try {
//     // Extract pagination parameters and default to page 1 and 10 items per page if not provided.
//     const page = query.page ? Number(query.page) : 1;
//     const pageSize = query.pageSize ? Number(query.pageSize) : 10;
//     // Remove pagination keys from query to use the rest as filters
//     const { page: _page, pageSize: _pageSize, amount = 200000, searchTerm, interestRate, ...filter } = query;
//     const buildFilters = () => {
//       const filters: any = {};
//       if (typeof searchTerm === 'string' && searchTerm.trim()) {
//         filters.bankName = {
//           contains: searchTerm.trim(),
//           mode: 'insensitive',
//         };
//       }
//       if (typeof interestRate === 'string' && interestRate.trim()) {
//         filters.interestRate = {
//           contains: interestRate.trim(),
//           mode: 'insensitive',
//         };
//       }
//       return filters;
//     };
//     const filters = buildFilters();
//     const [loans, totalLoans] = await prisma.$transaction([
//       prisma.sMELoan.findMany({
//         where: filters,
//         skip: Math.max(0, (page - 1) * pageSize),
//         take: pageSize,
//         // Optionally, order by a specific field (e.g., createdAt)
//         orderBy: { createdAt: 'desc' },
//         include: {
//           EligibilitySMELoan: true,
//           FeaturesSMELoan: true,
//           FeesChargesSMELoan: true,
//         },
//       }),
//       prisma.personalLoan.count({
//         where: filters,
//       }),
//     ]);
//     const suggestedLoans = loans.map((loan) => {
//       // Calculate the monthly income after deducting the loan EMI, base loan 50% . 
//       if (payload?.monthlyIncome) {
//         payload.monthlyIncome = payload.monthlyIncome / 2
//       }
//       if (payload?.haveAnyRentalIncome) {
//         payload.monthlyIncome = payload?.monthlyIncome + (payload?.rentalIncome ?? 0);
//       }
//       if (payload?.haveAnyLoan) {
//         payload.monthlyIncome = payload.monthlyIncome - (payload.EMIAmountBDT ?? 0);
//       }
//       if (payload?.haveAnyCreditCard) {
//         payload.monthlyIncome = payload.monthlyIncome - 2000;
//       }
//       console.log(payload?.monthlyIncome)
//       // const res = calculateLoanDetails(Number(amount), Number(loan.interestRate), payload.expectedLoanTenure, Number(loan.processingFee));
//       const monthlyEMI = calculateEMI(Number(amount), Number(loan.interestRate), payload.expectedLoanTenure);
//       const totalRepayment = monthlyEMI * payload.expectedLoanTenure;
//       const eligibleLoanAmount = suggestEligibleLoanAmount(payload?.monthlyIncome, Number(loan.interestRate), payload.expectedLoanTenure); 
//       // Flag the loan as eligible if the EMI is less than or equal to 50% of the monthly income.
//       // const eligibleLoan = monthlyEMI <= (payload.monthlyIncome * 0.5);
//       return {
//         id: loan.id,
//         bankName: loan.bankName,
//         amount: amount,
//         periodMonths: payload.expectedLoanTenure,
//         loanType: loan.loanType,
//         monthlyEMI: monthlyEMI,
//         totalRepayment: totalRepayment,
//         coverImage: loan.coverImage,
//         interestRate: loan.interestRate,
//         processingFee: loan.processingFee,
//         eligibleLoan: eligibleLoanAmount,
//         features: loan.FeaturesSMELoan,
//         feesCharges: loan.FeesChargesSMELoan,
//         eligibility: loan.EligibilitySMELoan,
//       };
//     });
//     return {
//       data: suggestedLoans,
//       pagination: {
//         page,
//         pageSize,
//         totalLoans,
//       }
//     };
//   } catch (error) {
//     console.error("Error in homeLoan function:", error);
//     throw error;
//   }
// };
// export default smeLoan;
