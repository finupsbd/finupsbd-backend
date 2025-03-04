
// Bank model type
export interface TCarLoan {
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
    featuresCarLoan: TFeaturesCarLoan;
    eligibilityCarLoan: TEligibilityCarLoan;
    feesChargesCarLoan: TFeesChargesCarLoan;
}

// Features model type
export interface TFeaturesCarLoan {
    id?: string;
    loanAmount: string;
    minimumAmount: string;
    maximumAmount: string;
    loanTenure: string;
    minimumYear: string;
    maximumYear: string;
}

// Eligibility model type
export interface TEligibilityCarLoan {
    id?: string;
    condition: string;
    offer: string;
    minimumIncome: number;
    minimumExperience: number;
    ageRequirement: number;
}

// FeesCharges model type
export interface TFeesChargesCarLoan {
    id?: string;
    processingFee: string;
    earlySettlementFee: string;
    prepaymentFee: string;
    LoanReSchedulingFee: string;
    penalCharge: string;
}
