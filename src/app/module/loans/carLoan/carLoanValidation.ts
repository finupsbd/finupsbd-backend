import { z } from 'zod';

// Define the schema for the features
const featureCarLoanSchema = z.object({
    loanAmount: z.string().min(1, 'Loan amount is required'),
    minimumAmount: z.string().min(1, 'Minimum amount is required'),
    maximumAmount: z.string().min(1, 'Maximum amount is required'),
    loanTenure: z.string().min(1, 'Loan tenure is required'),
    minimumYear: z.string().min(1, 'Minimum year is required'),
    maximumYear: z.string().min(1, 'Maximum year is required'),
});

// Define the schema for the eligibility
const eligibilityCarLoanSchema = z.object({
    condition: z.string().min(1, 'Condition is required'),
    offer: z.string().min(1, 'Offer is required'),
    minimumIncome: z.number().positive().min(1, 'Minimum income is required'),
    minimumExperience: z.number().positive().min(1, 'Minimum experience is required'),
    ageRequirement: z.number().positive().min(1, 'Age requirement is required'),
});

// Define the schema for the fees and charges
const feesChargesCarLoanSchema = z.object({
    processingFee: z.string().min(1, 'Processing fee is required'),
    earlySettlementFee: z.string().min(1, 'Early settlement fee is required'),
    prepaymentFee: z.string().min(1, 'Prepayment fee is required'),
    LoanReSchedulingFee: z.string().min(1, 'Loan rescheduling fee is required'),
    penalCharge: z.string().min(1, 'Penal charge is required'),
});

// Define the schema for the main bank object
const createCarLoanValidateSchema = z.object({
    bankName: z.string().min(1, 'Bank name is required'),
    amount: z.string().min(1, 'Amount is required'),
    coverImage: z.object({}).optional(),
    periodMonths: z.string().min(1, 'Period months is required'),
    processingFee: z.string().min(1, 'Processing fee is required'),
    interestRate: z.string().min(1, 'Interest rate is required'),
    monthlyEmi: z.string().min(1, 'Monthly EMI is required'),
    totalAmount: z.string().min(1, 'Total amount is required'),
    eligibleLoan: z.string().min(1, 'Eligible loan is required'),
    featuresCarLoan: featureCarLoanSchema.optional(),
    eligibilityCarLoan: eligibilityCarLoanSchema.optional(),
    feesChargesCarLoan: feesChargesCarLoanSchema.optional(),
});





const updateCarLoanValidateSchema = z.object({
    bankName: z.string().min(1, 'Bank name is required').optional(),
    amount: z.string().min(1, 'Amount is required').optional(),
    coverImage: z.object({}).optional(),
    periodMonths: z.string().min(1, 'Period months is required').optional(),
    processingFee: z.string().min(1, 'Processing fee is required').optional(),
    interestRate: z.string().min(1, 'Interest rate is required').optional(),
    monthlyEmi: z.string().min(1, 'Monthly EMI is required').optional(),
    totalAmount: z.string().min(1, 'Total amount is required').optional(),
    eligibleLoan: z.string().min(1, 'Eligible loan is required').optional(),
    featuresCarLoan: featureCarLoanSchema.optional(),
    eligibilityCarLoan: eligibilityCarLoanSchema.optional(),
    feesChargesCarLoan: feesChargesCarLoanSchema.optional(),
});



export const CarLoanValidationSchema = {
    createCarLoanValidateSchema,
    updateCarLoanValidateSchema
};
