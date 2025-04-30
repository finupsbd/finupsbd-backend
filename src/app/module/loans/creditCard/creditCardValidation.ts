import { z } from 'zod';

// Define the schema for the features
const featureCreditCardSchema = z.object({
    loanAmount: z.string().min(1, 'Loan amount is required'),
    minimumAmount: z.string().min(1, 'Minimum amount is required'),
    maximumAmount: z.string().min(1, 'Maximum amount is required'),
    loanTenure: z.string().min(1, 'Loan tenure is required'),
    minimumYear: z.string().min(1, 'Minimum year is required'),
    maximumYear: z.string().min(1, 'Maximum year is required'),
});

// Define the schema for the eligibility
const eligibilityCreditCardSchema = z.object({
    condition: z.string().min(1, 'Condition is required'),
    offer: z.string().min(1, 'Offer is required'),
    minimumIncome: z.number().positive().min(1, 'Minimum income is required'),
    minimumExperience: z.number().positive().min(1, 'Minimum experience is required'),
    ageRequirement: z.number().positive().min(1, 'Age requirement is required'),
});

// Define the schema for the fees and charges
const feesChargesCreditCardSchema = z.object({
    processingFee: z.string().min(1, 'Processing fee is required'),
    earlySettlementFee: z.string().min(1, 'Early settlement fee is required'),
    prepaymentFee: z.string().min(1, 'Prepayment fee is required'),
    LoanReSchedulingFee: z.string().min(1, 'Loan rescheduling fee is required'),
    penalCharge: z.string().min(1, 'Penal charge is required'),
});

// Define the schema for the main bank object
const createCreditCardValidateSchema = z.object({
    bankName: z.string().min(1, "Bank name is required"),
    coverImage: z.object({}).optional(),

    freeAnnualFee: z.string().nonempty("Free annual fee is required"),
    regularAnnualFee: z.string().nonempty("Regular annual fee is required"),
    annualFeeWaived: z.string().nonempty("Annual-fee waived status is required"),
    annualFeeWaivedReward: z
        .string()
        .nonempty("Details of the waived-fee reward are required"),
    interestPerDay: z.string().nonempty("Interest-per-day rate is required"),
    interestFreePeriod: z.string().nonempty(
        "Interest-free period information is required"
    ),
    freeSupplementaryCards: z
        .string()
        .nonempty("Number of free supplementary cards is required"),
    maxSupplementaryCards: z
        .string()
        .nonempty("Maximum supplementary cards is required"),
    balanceTransferAvailability: z
        .string()
        .nonempty("Balance transfer availability is required"),
    ownBankATMFee: z.string().nonempty("Own-bank ATM fee is required"),
    otherBankATMFee: z.string().nonempty("Other-bank ATM fee is required"),
    loungeFacility: z.string().nonempty("Lounge facility info is required"),
    loungeVisit: z.string().nonempty("Lounge-visit allowance is required"),
    cardChequeProcessingFee: z
        .string()
        .nonempty("Card/cheque processing fee is required"),
    processingFeeMinimum: z
        .string()
        .nonempty("Minimum processing fee is required"),
    cashWithdrawalLimit: z
        .string()
        .nonempty("Cash withdrawal limit is required"),

    featuresCreditCard: featureCreditCardSchema.optional(),
    eligibilityCreditCard: eligibilityCreditCardSchema.optional(),
    feesChargesCreditCard: feesChargesCreditCardSchema.optional(),
});


const updateCreditCardValidateSchema = z.object({
    bankName: z.string().min(1, "Bank name is required").optional(),
    coverImage: z.object({}).optional(),

    freeAnnualFee: z.string().nonempty("Free annual fee is required").optional(),
    regularAnnualFee: z.string().nonempty("Regular annual fee is required").optional(),
    annualFeeWaived: z.string().nonempty("Annual-fee waived status is required").optional(),
    annualFeeWaivedReward: z
        .string()
        .nonempty("Details of the waived-fee reward are required").optional(),
    interestPerDay: z.string().nonempty("Interest-per-day rate is required").optional(),
    interestFreePeriod: z.string().nonempty(
        "Interest-free period information is required"
    ).optional(),
    freeSupplementaryCards: z
        .string()
        .nonempty("Number of free supplementary cards is required").optional(),
    maxSupplementaryCards: z
        .string()
        .nonempty("Maximum supplementary cards is required").optional(),
    balanceTransferAvailability: z
        .string()
        .nonempty("Balance transfer availability is required").optional(),
    ownBankATMFee: z.string().nonempty("Own-bank ATM fee is required").optional(),
    otherBankATMFee: z.string().nonempty("Other-bank ATM fee is required").optional(),
    loungeFacility: z.string().nonempty("Lounge facility info is required").optional(),
    loungeVisit: z.string().nonempty("Lounge-visit allowance is required").optional(),
    cardChequeProcessingFee: z
        .string()
        .nonempty("Card/cheque processing fee is required").optional(),
    processingFeeMinimum: z
        .string()
        .nonempty("Minimum processing fee is required").optional(),
    cashWithdrawalLimit: z
        .string()
        .nonempty("Cash withdrawal limit is required").optional(),

    featuresCreditCard: featureCreditCardSchema.optional(),
    eligibilityCreditCard: eligibilityCreditCardSchema.optional(),
    feesChargesCreditCard: feesChargesCreditCardSchema.optional(),
});




export const CreditCardValidationSchema = {
    createCreditCardValidateSchema,
    updateCreditCardValidateSchema
};
