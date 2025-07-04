import { z } from "zod";

export const CurrencyEnum = z.enum(["LOCAL", "DUAL"], {
    errorMap: () => ({
        message: "Currency must be either 'LOCAL' or 'DUAL'.",
    }),
});
export type Currency = z.infer<typeof CurrencyEnum>;

export const CardNetworkEnum = z.enum(["VISA", "MASTER", "AMEX"], {
    errorMap: () => ({
        message: "Card network must be 'VISA', 'MASTER', or 'AMEX'.",
    }),
});
export type CardNetwork = z.infer<typeof CardNetworkEnum>;

export const CardFeaturesTypeEnum = z.enum(
    [
        "SILVER",
        "CLASSIC",
        "STANDARD",
        "GOLD",
        "PLATINUM",
        "SIGNATURE",
        "TITANIUM",
    ],
    {
        errorMap: () => ({
            message:
                "Card features type must be one of: SILVER, CLASSIC, STANDARD, GOLD, PLATINUM, SIGNATURE, TITANIUM.",
        }),
    }
);
export type TCardFeaturesType = z.infer<typeof CardFeaturesTypeEnum>;

// -------------------------------
// FeaturesCreditCard
// -------------------------------

export const FeaturesCreditCardSchema = z.object({
    features1: z.string().optional().nullable(),
    features2: z.string().optional().nullable(),
    features3: z.string().optional().nullable(),
    features4: z.string().optional().nullable(),
    features5: z.string().optional().nullable(),
    creditCardId: z.string().uuid("Invalid credit card ID.").optional().nullable(),
});

export type TFeaturesCreditCard = z.infer<typeof FeaturesCreditCardSchema>;

// -------------------------------
// EligibilityCreditCard
// -------------------------------

export const EligibilityCreditCardSchema = z.object({
    condition: z
        .string({
            required_error: "Eligibility condition is required.",
        })
        .min(1, "Condition cannot be empty."),
    offer: z
        .string({
            required_error: "Eligibility offer is required.",
        })
        .min(1, "Offer cannot be empty."),
    minimumIncome: z
        .number({
            required_error: "Minimum income is required.",
            invalid_type_error: "Minimum income must be a number.",
        })
        .int("Minimum income must be an integer.")
        .nonnegative("Minimum income cannot be negative."),
    minimumExperience: z
        .number({
            required_error: "Minimum experience is required.",
            invalid_type_error: "Minimum experience must be a number.",
        })
        .int("Minimum experience must be an integer.")
        .nonnegative("Minimum experience cannot be negative."),
    ageRequirement: z
        .number({
            required_error: "Age requirement is required.",
            invalid_type_error: "Age requirement must be a number.",
        })
        .int("Age requirement must be an integer.")
        .nonnegative("Age requirement cannot be negative."),
    creditCardId: z.string().uuid("Invalid credit card ID.").optional().nullable(),
});

export type TEligibilityCreditCard = z.infer<typeof EligibilityCreditCardSchema>;

// -------------------------------
// FeesChargesCreditCard
// -------------------------------

export const FeesChargesCreditCardSchema = z.object({
    annualFee: z
        .string({
            required_error: "Annual fee is required.",
        })
        .min(1, "Annual fee cannot be empty."),
    annualFeeWaived: z
        .string({
            required_error: "Annual fee waived information is required.",
        })
        .min(1, "Annual fee waived info cannot be empty."),
    latePaymentFee: z
        .string({
            required_error: "Late payment fee is required.",
        })
        .min(1, "Late payment fee cannot be empty."),
    interestRate: z
        .string({
            required_error: "Interest rate is required.",
        })
        .min(1, "Interest rate cannot be empty."),
    balanceTransferRate: z
        .string({
            required_error: "Balance transfer rate is required.",
        })
        .min(1, "Balance transfer rate cannot be empty."),
    creditCardId: z.string().uuid("Invalid credit card ID.").optional().nullable(),
});

export type TFeesChargesCreditCard = z.infer<
    typeof FeesChargesCreditCardSchema
>;

// -------------------------------
// CreditCard
// -------------------------------

export const CreditCardSchema = z.object({
    bankName: z
        .string({
            required_error: "Bank name is required.",
        })
        .min(1, "Bank name cannot be empty."),
    interestPerDay: z
        .string({
            required_error: "Interest per day is required.",
        })
        .min(1, "Interest per day cannot be empty."),
    freeAnnualFee: z
        .string({
            required_error: "Free annual fee field is required.",
        })
        .min(1, "Free annual fee cannot be empty."),
    regularAnnualFee: z
        .string({
            required_error: "Regular annual fee is required.",
        })
        .min(1, "Regular annual fee cannot be empty."),
    interestFreePeriod: z
        .string({
            required_error: "Interest free period is required.",
        })
        .min(1, "Interest free period cannot be empty."),
    latePaymentFees: z
        .string({
            required_error: "Late payment fees are required.",
        })
        .min(1, "Late payment fees cannot be empty."),
    currency: CurrencyEnum,
    cardFeaturesType: CardFeaturesTypeEnum,
    cardNetwork: CardNetworkEnum,
    annualFeeWaivedReward: z
        .string({
            required_error: "Annual fee waived reward is required.",
        })
        .min(1, "Annual fee waived reward cannot be empty."),
    freeSupplementaryCards: z
        .string({
            required_error: "Free supplementary cards info is required.",
        })
        .min(1, "Free supplementary cards info cannot be empty."),
    maxSupplementaryCards: z
        .string({
            required_error: "Max supplementary cards is required.",
        })
        .min(1, "Max supplementary cards cannot be empty."),
    balanceTransferAvailability: z
        .string({
            required_error: "Balance transfer availability is required.",
        })
        .min(1, "Balance transfer availability cannot be empty."),
    ownBankATMFee: z
        .string({
            required_error: "Own bank ATM fee is required.",
        })
        .min(1, "Own bank ATM fee cannot be empty."),
    otherBankATMFee: z
        .string({
            required_error: "Other bank ATM fee is required.",
        })
        .min(1, "Other bank ATM fee cannot be empty."),
    loungeFacility: z
        .string({
            required_error: "Lounge facility information is required.",
        })
        .min(1, "Lounge facility information cannot be empty."),
    loungeVisit: z
        .string({
            required_error: "Lounge visit information is required.",
        })
        .min(1, "Lounge visit information cannot be empty."),
    cardChequeProcessingFee: z
        .string({
            required_error: "Card cheque processing fee is required.",
        })
        .min(1, "Card cheque processing fee cannot be empty."),
    processingFeeMinimum: z
        .string({
            required_error: "Processing fee minimum is required.",
        })
        .min(1, "Processing fee minimum cannot be empty."),
    cashWithdrawalLimit: z
        .string({
            required_error: "Cash withdrawal limit is required.",
        })
        .min(1, "Cash withdrawal limit cannot be empty."),
    cardType: z
        .string()
        .default("CREDIT_CARD"),
    isActive: z
        .boolean()
        .default(true),
    coverImage: z.string().optional().nullable(),

    // Optional nested relations
    featuresCreditCard: FeaturesCreditCardSchema.optional().nullable(),
    eligibilityCreditCard: EligibilityCreditCardSchema.optional().nullable(),
    feesChargesCreditCard: FeesChargesCreditCardSchema.optional().nullable(),
});

export const CreditCardValidationSchema = {
    CreditCardSchema
}


export type TCreditCardTypes = z.infer<typeof CreditCardSchema>;
