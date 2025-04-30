
// Bank model type
export interface TCreditCard {
  bankName: string;
  coverImage?: string | undefined;
  freeAnnualFee: string;
  regularAnnualFee: string;
  annualFeeWaived: string;
  annualFeeWaivedReward: string;
  interestPerDay: string;
  interestFreePeriod: string;
  freeSupplementaryCards: string;
  maxSupplementaryCards: string;
  balanceTransferAvailability: string;
  ownBankATMFee: string;
  otherBankATMFee: string;
  loungeFacility: string;
  loungeVisit: string;
  cardChequeProcessingFee: string;
  processingFeeMinimum: string;
  cashWithdrawalLimit: string;
  featuresCreditCard?: TFeaturesCreditCard  // Optional relation to Features
  eligibilityCreditCard?: TEligibilityCreditCard // Optional relation to Eligibility
  feesChargesCreditCard?: TFeesChargesCreditCard // Optional relation to FeesCharges
}

// Features model type
export interface TFeaturesCreditCard {
  loanAmount: string;
  minimumAmount: string;
  maximumAmount: string;
  loanTenure: string;
  minimumYear: string;
  maximumYear: string;
}

// Eligibility model type

export type TEligibilityCreditCard = {
  condition: string;
  offer: string;
  minimumIncome: number;
  minimumExperience: number;
  ageRequirement: number;
};

// FeesCharges model type
export interface TFeesChargesCreditCard {
  processingFee: string;
  earlySettlementFee: string;
  prepaymentFee: string;
  LoanReSchedulingFee: string;
  penalCharge: string;
}
