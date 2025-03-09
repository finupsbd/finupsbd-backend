
// Bank model type
export interface TSMELoan {
    id?: string;
    bankName: string;
    coverImage?: string | undefined;
    amount: string;
    periodMonths: string;
    processingFee: string;
    interestRate: string;
    monthlyEmi: string;
    totalAmount: string;
    eligibleLoan: string;
    featuresSMELoan: TFeaturesSMELoan;
    eligibilitySMELoan: TEligibilitySMELoan;
    feesChargesSMELoan: TFeesChargesSMELoan;
}

// Features model type
export interface TFeaturesSMELoan {
    id?: string;
    loanAmount: string;
    minimumAmount: string;
    maximumAmount: string;
    loanTenure: string;
    minimumYear: string;
    maximumYear: string;
}

// Eligibility model type
export interface TEligibilitySMELoan {
    id?: string;
    condition: string;
    offer: string;
    minimumIncome: number;
    minimumExperience: number;
    ageRequirement: number;
}

// FeesCharges model type
export interface TFeesChargesSMELoan {
    id?: string;
    processingFee: string;
    earlySettlementFee: string;
    prepaymentFee: string;
    LoanReSchedulingFee: string;
    penalCharge: string;
}
