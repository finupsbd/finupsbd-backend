"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalLoanValidationSchema = void 0;
const zod_1 = require("zod");
// Define the schema for the features
const featureSchema = zod_1.z.object({
    loanAmount: zod_1.z.string().min(1, 'Loan amount is required'),
    minimumAmount: zod_1.z.string().min(1, 'Minimum amount is required'),
    maximumAmount: zod_1.z.string().min(1, 'Maximum amount is required'),
    loanTenure: zod_1.z.string().min(1, 'Loan tenure is required'),
    minimumYear: zod_1.z.string().min(1, 'Minimum year is required'),
    maximumYear: zod_1.z.string().min(1, 'Maximum year is required'),
});
// Define the schema for the eligibility
const eligibilitySchema = zod_1.z.object({
    condition: zod_1.z.string().min(1, 'Condition is required'),
    offer: zod_1.z.string().min(1, 'Offer is required'),
    minimumIncome: zod_1.z.string().min(1, 'Minimum income is required'),
    minimumExperience: zod_1.z.string().min(1, 'Minimum experience is required'),
    ageRequirement: zod_1.z.string().min(1, 'Age requirement is required'),
});
// Define the schema for the fees and charges
const feesChargesSchema = zod_1.z.object({
    processingFee: zod_1.z.string().min(1, 'Processing fee is required'),
    earlySettlementFee: zod_1.z.string().min(1, 'Early settlement fee is required'),
    prepaymentFee: zod_1.z.string().min(1, 'Prepayment fee is required'),
    LoanReSchedulingFee: zod_1.z.string().min(1, 'Loan rescheduling fee is required'),
    penalCharge: zod_1.z.string().min(1, 'Penal charge is required'),
});
// Define the schema for the main bank object
const createPersonalLoanValidateSchema = zod_1.z.object({
    bankName: zod_1.z.string().min(1, 'Bank name is required'),
    amount: zod_1.z.string().min(1, 'Amount is required'),
    coverImage: zod_1.z.object({}).optional(),
    periodMonths: zod_1.z.string().min(1, 'Period months is required'),
    processingFee: zod_1.z.string().min(1, 'Processing fee is required'),
    interestRate: zod_1.z.string().min(1, 'Interest rate is required'),
    monthlyEmi: zod_1.z.string().min(1, 'Monthly EMI is required'),
    totalAmount: zod_1.z.string().min(1, 'Total amount is required'),
    eligibleLoan: zod_1.z.string().min(1, 'Eligible loan is required'),
    features: featureSchema.optional(),
    eligibility: eligibilitySchema.optional(),
    feesCharges: feesChargesSchema.optional(),
});
const updatePersonalLoanValidateSchema = zod_1.z.object({
    bankName: zod_1.z.string().min(1, 'Bank name is required').optional(),
    amount: zod_1.z.string().min(1, 'Amount is required').optional(),
    coverImage: zod_1.z.object({}).optional(),
    periodMonths: zod_1.z.string().min(1, 'Period months is required').optional(),
    processingFee: zod_1.z.string().min(1, 'Processing fee is required').optional(),
    interestRate: zod_1.z.string().min(1, 'Interest rate is required').optional(),
    monthlyEmi: zod_1.z.string().min(1, 'Monthly EMI is required').optional(),
    totalAmount: zod_1.z.string().min(1, 'Total amount is required').optional(),
    eligibleLoan: zod_1.z.string().min(1, 'Eligible loan is required').optional(),
    features: featureSchema.optional(),
    eligibility: eligibilitySchema.optional(),
    feesCharges: feesChargesSchema.optional(),
});
exports.PersonalLoanValidationSchema = {
    createPersonalLoanValidateSchema,
    updatePersonalLoanValidateSchema
};
