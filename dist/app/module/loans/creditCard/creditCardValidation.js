"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCardValidationSchema = void 0;
const zod_1 = require("zod");
// Define the schema for the features
const featureCreditCardSchema = zod_1.z.object({
    loanAmount: zod_1.z.string().min(1, 'Loan amount is required'),
    minimumAmount: zod_1.z.string().min(1, 'Minimum amount is required'),
    maximumAmount: zod_1.z.string().min(1, 'Maximum amount is required'),
    loanTenure: zod_1.z.string().min(1, 'Loan tenure is required'),
    minimumYear: zod_1.z.string().min(1, 'Minimum year is required'),
    maximumYear: zod_1.z.string().min(1, 'Maximum year is required'),
});
// Define the schema for the eligibility
const eligibilityCreditCardSchema = zod_1.z.object({
    condition: zod_1.z.string().min(1, 'Condition is required'),
    offer: zod_1.z.string().min(1, 'Offer is required'),
    minimumIncome: zod_1.z.number().positive().min(1, 'Minimum income is required'),
    minimumExperience: zod_1.z.number().positive().min(1, 'Minimum experience is required'),
    ageRequirement: zod_1.z.number().positive().min(1, 'Age requirement is required'),
});
// Define the schema for the fees and charges
const feesChargesCreditCardSchema = zod_1.z.object({
    processingFee: zod_1.z.string().min(1, 'Processing fee is required'),
    earlySettlementFee: zod_1.z.string().min(1, 'Early settlement fee is required'),
    prepaymentFee: zod_1.z.string().min(1, 'Prepayment fee is required'),
    LoanReSchedulingFee: zod_1.z.string().min(1, 'Loan rescheduling fee is required'),
    penalCharge: zod_1.z.string().min(1, 'Penal charge is required'),
});
// Define the schema for the main bank object
const createCreditCardValidateSchema = zod_1.z.object({
    bankName: zod_1.z.string().min(1, "Bank name is required"),
    coverImage: zod_1.z.object({}).optional(),
    freeAnnualFee: zod_1.z.string().nonempty("Free annual fee is required"),
    regularAnnualFee: zod_1.z.string().nonempty("Regular annual fee is required"),
    annualFeeWaived: zod_1.z.string().nonempty("Annual-fee waived status is required"),
    annualFeeWaivedReward: zod_1.z
        .string()
        .nonempty("Details of the waived-fee reward are required"),
    interestPerDay: zod_1.z.string().nonempty("Interest-per-day rate is required"),
    interestFreePeriod: zod_1.z.string().nonempty("Interest-free period information is required"),
    freeSupplementaryCards: zod_1.z
        .string()
        .nonempty("Number of free supplementary cards is required"),
    maxSupplementaryCards: zod_1.z
        .string()
        .nonempty("Maximum supplementary cards is required"),
    balanceTransferAvailability: zod_1.z
        .string()
        .nonempty("Balance transfer availability is required"),
    ownBankATMFee: zod_1.z.string().nonempty("Own-bank ATM fee is required"),
    otherBankATMFee: zod_1.z.string().nonempty("Other-bank ATM fee is required"),
    loungeFacility: zod_1.z.string().nonempty("Lounge facility info is required"),
    loungeVisit: zod_1.z.string().nonempty("Lounge-visit allowance is required"),
    cardChequeProcessingFee: zod_1.z
        .string()
        .nonempty("Card/cheque processing fee is required"),
    processingFeeMinimum: zod_1.z
        .string()
        .nonempty("Minimum processing fee is required"),
    cashWithdrawalLimit: zod_1.z
        .string()
        .nonempty("Cash withdrawal limit is required"),
    featuresCreditCard: featureCreditCardSchema.optional(),
    eligibilityCreditCard: eligibilityCreditCardSchema.optional(),
    feesChargesCreditCard: feesChargesCreditCardSchema.optional(),
});
const updateCreditCardValidateSchema = zod_1.z.object({
    bankName: zod_1.z.string().min(1, "Bank name is required").optional(),
    coverImage: zod_1.z.object({}).optional(),
    freeAnnualFee: zod_1.z.string().nonempty("Free annual fee is required").optional(),
    regularAnnualFee: zod_1.z.string().nonempty("Regular annual fee is required").optional(),
    annualFeeWaived: zod_1.z.string().nonempty("Annual-fee waived status is required").optional(),
    annualFeeWaivedReward: zod_1.z
        .string()
        .nonempty("Details of the waived-fee reward are required").optional(),
    interestPerDay: zod_1.z.string().nonempty("Interest-per-day rate is required").optional(),
    interestFreePeriod: zod_1.z.string().nonempty("Interest-free period information is required").optional(),
    freeSupplementaryCards: zod_1.z
        .string()
        .nonempty("Number of free supplementary cards is required").optional(),
    maxSupplementaryCards: zod_1.z
        .string()
        .nonempty("Maximum supplementary cards is required").optional(),
    balanceTransferAvailability: zod_1.z
        .string()
        .nonempty("Balance transfer availability is required").optional(),
    ownBankATMFee: zod_1.z.string().nonempty("Own-bank ATM fee is required").optional(),
    otherBankATMFee: zod_1.z.string().nonempty("Other-bank ATM fee is required").optional(),
    loungeFacility: zod_1.z.string().nonempty("Lounge facility info is required").optional(),
    loungeVisit: zod_1.z.string().nonempty("Lounge-visit allowance is required").optional(),
    cardChequeProcessingFee: zod_1.z
        .string()
        .nonempty("Card/cheque processing fee is required").optional(),
    processingFeeMinimum: zod_1.z
        .string()
        .nonempty("Minimum processing fee is required").optional(),
    cashWithdrawalLimit: zod_1.z
        .string()
        .nonempty("Cash withdrawal limit is required").optional(),
    featuresCreditCard: featureCreditCardSchema.optional(),
    eligibilityCreditCard: eligibilityCreditCardSchema.optional(),
    feesChargesCreditCard: feesChargesCreditCardSchema.optional(),
});
exports.CreditCardValidationSchema = {
    createCreditCardValidateSchema,
    updateCreditCardValidateSchema
};
