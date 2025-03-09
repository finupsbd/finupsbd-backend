// Enum types as string unions
export type MainLoanType = 'PERSONAL_LOAN' | 'HOME_LOAN' | 'CAR_LOAN' | 'SME_LOAN';

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
  | 'CAR'
  | 'BIKE'
  | 'TRUCK'
  | 'BUS'
  | 'VAN'
  | 'SUV'
  | 'MOTORCYCLE'
  | 'SCOOTER'
  | 'PICKUP'
  | 'ATV'
  | 'RV'
  | 'FIRE_TRUCK'
  | 'AMBULANCE'
  | 'POLICE_CAR'
  | 'TAXI'
  | 'TRACTOR'
  | 'SEMI_TRAILER'
  | 'TRAIN'
  | 'TRAM'
  | 'FERRY'
  | 'AIRPLANE'
  | 'HELICOPTER';

export type ExistingLoanType =
  | 'HOME_LOAN'
  | 'PERSONAL_LOAN'
  | 'CAR_LOAN'
  | 'SME_LOAN'
  | 'CREDIT_CARD'
  | 'OTHER';

export type CardType = 'CREDIT_CARD' | 'DEBIT_CARD';


// The EligibilityCheck model as a TypeScript interface
export type TEligibilityCheck = {
  id: string;
  loanType: MainLoanType;
  gender: EGender;
  dateOfBirth: Date;
  profession: Profession;

  // Business-related fields
  businessOwnerType?: BusinessOwnerType;
  businessType?: string;
  sharePortion?: number;
  tradeLicenseAge?: number;

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
  numberOfLoan?: number;
  existingLoanType?: ExistingLoanType;
  EMIAmountBDT?: number;
  InterestRate?: number;

  // Credit card details
  haveAnyCreditCard: boolean;
  numberOfCard?: number;
  cardType?: CardType;
  cardLimitBDT?: number;

  // Secondary applicant
  secondaryApplicant: boolean;

  // Contact / personal info
  name: string;
  email: string;
  phone: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
