

// Enum types as string unions
export type TMainLoanType =
  'PERSONAL_LOAN'
  | 'HOME_LOAN'
  | 'CAR_LOAN'
  | 'SME_LOAN'
  | 'INSTANT_LOAN';

export type EGender = 'MALE' | 'FEMALE' | 'OTHER';

export type Profession = 'BUSINESS_OWNER' | 'SALARIED';

export type BusinessOwnerType =
  | 'PROPRIETOR'
  | 'PARTNER'
  | 'CORPORATION'
  | 'LLC'
  | 'COOPERATIVE'
  | 'JOINT_VENTURE'
  | 'FRANCHISE';

export type VehicleType =
  | "CAR_SEDAN"
  | "CAR_SUV"
  | "CAR_HATCHBACK"
  | "BIKE"


export type ExistingLoanType =
  | 'HOME_LOAN'
  | 'PERSONAL_LOAN'
  | 'CAR_LOAN'
  | 'SME_LOAN'
  | 'CREDIT_CARD'

export type CardType = 'CREDIT_CARD' | 'DEBIT_CARD';

export interface ExistingLoan {
  existingLoanType: ExistingLoanType;
  emiAmountBDT: number;
  interestRate: number;
}


// The EligibilityCheck model as a TypeScript interface
export type TEligibilityCheck = {
  emiAmountBDT: number;
  id: string;
  loanType: TMainLoanType;
  gender: EGender;
  dateOfBirth: Date;
  profession: Profession;

  // Business-related fields
  businessOwnerType?: BusinessOwnerType;
  businessType?: string;
  sharePortion?: number;
  tradeLicenseAge?: number;
  amount?: number;
  tenure?: number;

  // Additional info fields
  vehicleType?: VehicleType;
  expectedLoanTenure: number;
  monthlyIncome: number;
  jobLocation: string;

  // Rental income fields
  haveAnyRentalIncome: boolean;
  selectArea?: string;
  rentalIncome?: number;

  // Existing loan details
  haveAnyLoan: boolean;
  existingLoans?: ExistingLoan[];

  // Credit card details
  haveAnyCreditCard: boolean;
  numberOfCard?: number;
  cardType?: CardType;
  cardLimitBDT?: number;

  // Secondary applicant
  secondaryApplicant: boolean;
  termsAccepted?: boolean

  // Contact / personal info
  name: string;
  email: string;
  phone: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

