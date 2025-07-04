"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCardValidationSchema = exports.CreditCardSchema = exports.FeesChargesCreditCardSchema = exports.EligibilityCreditCardSchema = exports.FeaturesCreditCardSchema = exports.CardFeaturesTypeEnum = exports.CardNetworkEnum = exports.CurrencyEnum = void 0;
const zod_1 = require("zod");
exports.CurrencyEnum = zod_1.z.enum(["LOCAL", "DUAL"], {
    errorMap: () => ({
        message: "Currency must be either 'LOCAL' or 'DUAL'.",
    }),
});
exports.CardNetworkEnum = zod_1.z.enum(["VISA", "MASTER", "AMEX"], {
    errorMap: () => ({
        message: "Card network must be 'VISA', 'MASTER', or 'AMEX'.",
    }),
});
exports.CardFeaturesTypeEnum = zod_1.z.enum([
    "SILVER",
    "CLASSIC",
    "STANDARD",
    "GOLD",
    "PLATINUM",
    "SIGNATURE",
    "TITANIUM",
], {
    errorMap: () => ({
        message: "Card features type must be one of: SILVER, CLASSIC, STANDARD, GOLD, PLATINUM, SIGNATURE, TITANIUM.",
    }),
});
// -------------------------------
// FeaturesCreditCard
// -------------------------------
exports.FeaturesCreditCardSchema = zod_1.z.object({
    features1: zod_1.z.string().optional().nullable(),
    features2: zod_1.z.string().optional().nullable(),
    features3: zod_1.z.string().optional().nullable(),
    features4: zod_1.z.string().optional().nullable(),
    features5: zod_1.z.string().optional().nullable(),
    creditCardId: zod_1.z.string().uuid("Invalid credit card ID.").optional().nullable(),
});
// -------------------------------
// EligibilityCreditCard
// -------------------------------
exports.EligibilityCreditCardSchema = zod_1.z.object({
    condition: zod_1.z
        .string({
        required_error: "Eligibility condition is required.",
    })
        .min(1, "Condition cannot be empty."),
    offer: zod_1.z
        .string({
        required_error: "Eligibility offer is required.",
    })
        .min(1, "Offer cannot be empty."),
    minimumIncome: zod_1.z
        .number({
        required_error: "Minimum income is required.",
        invalid_type_error: "Minimum income must be a number.",
    })
        .int("Minimum income must be an integer.")
        .nonnegative("Minimum income cannot be negative."),
    minimumExperience: zod_1.z
        .number({
        required_error: "Minimum experience is required.",
        invalid_type_error: "Minimum experience must be a number.",
    })
        .int("Minimum experience must be an integer.")
        .nonnegative("Minimum experience cannot be negative."),
    ageRequirement: zod_1.z
        .number({
        required_error: "Age requirement is required.",
        invalid_type_error: "Age requirement must be a number.",
    })
        .int("Age requirement must be an integer.")
        .nonnegative("Age requirement cannot be negative."),
    creditCardId: zod_1.z.string().uuid("Invalid credit card ID.").optional().nullable(),
});
// -------------------------------
// FeesChargesCreditCard
// -------------------------------
exports.FeesChargesCreditCardSchema = zod_1.z.object({
    annualFee: zod_1.z
        .string({
        required_error: "Annual fee is required.",
    })
        .min(1, "Annual fee cannot be empty."),
    annualFeeWaived: zod_1.z
        .string({
        required_error: "Annual fee waived information is required.",
    })
        .min(1, "Annual fee waived info cannot be empty."),
    latePaymentFee: zod_1.z
        .string({
        required_error: "Late payment fee is required.",
    })
        .min(1, "Late payment fee cannot be empty."),
    interestRate: zod_1.z
        .string({
        required_error: "Interest rate is required.",
    })
        .min(1, "Interest rate cannot be empty."),
    balanceTransferRate: zod_1.z
        .string({
        required_error: "Balance transfer rate is required.",
    })
        .min(1, "Balance transfer rate cannot be empty."),
    creditCardId: zod_1.z.string().uuid("Invalid credit card ID.").optional().nullable(),
});
// -------------------------------
// CreditCard
// -------------------------------
exports.CreditCardSchema = zod_1.z.object({
    bankName: zod_1.z
        .string({
        required_error: "Bank name is required.",
    })
        .min(1, "Bank name cannot be empty."),
    interestPerDay: zod_1.z
        .string({
        required_error: "Interest per day is required.",
    })
        .min(1, "Interest per day cannot be empty."),
    freeAnnualFee: zod_1.z
        .string({
        required_error: "Free annual fee field is required.",
    })
        .min(1, "Free annual fee cannot be empty."),
    regularAnnualFee: zod_1.z
        .string({
        required_error: "Regular annual fee is required.",
    })
        .min(1, "Regular annual fee cannot be empty."),
    interestFreePeriod: zod_1.z
        .string({
        required_error: "Interest free period is required.",
    })
        .min(1, "Interest free period cannot be empty."),
    latePaymentFees: zod_1.z
        .string({
        required_error: "Late payment fees are required.",
    })
        .min(1, "Late payment fees cannot be empty."),
    currency: exports.CurrencyEnum,
    cardFeaturesType: exports.CardFeaturesTypeEnum,
    cardNetwork: exports.CardNetworkEnum,
    annualFeeWaivedReward: zod_1.z
        .string({
        required_error: "Annual fee waived reward is required.",
    })
        .min(1, "Annual fee waived reward cannot be empty."),
    freeSupplementaryCards: zod_1.z
        .string({
        required_error: "Free supplementary cards info is required.",
    })
        .min(1, "Free supplementary cards info cannot be empty."),
    maxSupplementaryCards: zod_1.z
        .string({
        required_error: "Max supplementary cards is required.",
    })
        .min(1, "Max supplementary cards cannot be empty."),
    balanceTransferAvailability: zod_1.z
        .string({
        required_error: "Balance transfer availability is required.",
    })
        .min(1, "Balance transfer availability cannot be empty."),
    ownBankATMFee: zod_1.z
        .string({
        required_error: "Own bank ATM fee is required.",
    })
        .min(1, "Own bank ATM fee cannot be empty."),
    otherBankATMFee: zod_1.z
        .string({
        required_error: "Other bank ATM fee is required.",
    })
        .min(1, "Other bank ATM fee cannot be empty."),
    loungeFacility: zod_1.z
        .string({
        required_error: "Lounge facility information is required.",
    })
        .min(1, "Lounge facility information cannot be empty."),
    loungeVisit: zod_1.z
        .string({
        required_error: "Lounge visit information is required.",
    })
        .min(1, "Lounge visit information cannot be empty."),
    cardChequeProcessingFee: zod_1.z
        .string({
        required_error: "Card cheque processing fee is required.",
    })
        .min(1, "Card cheque processing fee cannot be empty."),
    processingFeeMinimum: zod_1.z
        .string({
        required_error: "Processing fee minimum is required.",
    })
        .min(1, "Processing fee minimum cannot be empty."),
    cashWithdrawalLimit: zod_1.z
        .string({
        required_error: "Cash withdrawal limit is required.",
    })
        .min(1, "Cash withdrawal limit cannot be empty."),
    cardType: zod_1.z
        .string()
        .default("CREDIT_CARD"),
    isActive: zod_1.z
        .boolean()
        .default(true),
    coverImage: zod_1.z.string().optional().nullable(),
    // Optional nested relations
    featuresCreditCard: exports.FeaturesCreditCardSchema.optional().nullable(),
    eligibilityCreditCard: exports.EligibilityCreditCardSchema.optional().nullable(),
    feesChargesCreditCard: exports.FeesChargesCreditCardSchema.optional().nullable(),
});
exports.CreditCardValidationSchema = {
    CreditCardSchema: exports.CreditCardSchema
};
