
// Bank model type
export interface THomeLoan {
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
    featuresHomeLoan?: TFeaturesHomeLoan  // Optional relation to Features
    eligibilityHomeLoan?: TEligibilityHomeLoan // Optional relation to Eligibility
    feesChargesHomeLoan?: TFeesChargesHomeLoan // Optional relation to FeesCharges
    

  }
  
  // Features model type
  export interface TFeaturesHomeLoan {
    id?: string;
    loanAmount: string;
    minimumAmount: string;
    maximumAmount: string;
    loanTenure: string;
    minimumYear: string;
    maximumYear: string;
  }
  
  // Eligibility model type

  export type TEligibilityHomeLoan = {
    id?: string;
    condition: string;
    offer: string;
    minimumIncome: number;
    minimumExperience: number;
    ageRequirement: number;
  };
  
  // FeesCharges model type
  export interface TFeesChargesHomeLoan {
    id?: string;
    processingFee: string;
    earlySettlementFee: string;
    prepaymentFee: string;
    LoanReSchedulingFee: string;
    penalCharge: string;
  }
  