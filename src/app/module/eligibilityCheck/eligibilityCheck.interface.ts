type TLoneType = 'PERSONAL_LOAN' | 'CAR_LOAN' | 'HOME_LOAN' | 'SME_LOAN';
type TCurrentJobExperience =
  | '0-1 YEAR'
  | '1-3 YEARS'
  | '3-6 YEARS '
  | '6-10 YEARS'
  | '10+ YEARS';
type TCardType = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PREPAID_CARD';
type TGender = 'MALE' | 'FEMALE' | 'OTHER';
type SalaryType = 'BANK_ACCOUNT' | 'CASH' | 'CHEQUE';

export type TEligibilityCheck = {
  LoanType?: TLoneType;
  cardType?: TCardType;
  gender: TGender;
  dateOfBirth: string; // ISO format (e.g., "1990-01-01")
  profession: 'SALARIED' | 'BUSINESS_OWNER';
  companyName?: string;
  companyType?: string;
  jobStatus?: string;
  currentJobExperience?: TCurrentJobExperience;
  residenceType?: 'RENTAL' | 'OWNED';
  Salaried?: TSalariedJobDetails;
  BusinessOwner?: TBusinessOwnerDetails;
  rentalIncome?: boolean;
  RentalIncomeDetails?: TRentalIncomeDetails;
  haveAnyLoan?: boolean;
  LoanDetails?: TLoanDetails;
  haveAnyCreditCard?: boolean;
  CreditCardDetails?: TCreditCardDetails;
  lastOneYearBankTransactionBDT?: number;
  TradeLicenseAge?: number;
  AreTradeLicenseAndOfficeAddressSame?: boolean;
};

type TBankAccountDetails = {
  YourSalaryType: string;
  BankName: string;
  YourSalaryAmountBDT: number;
  SalaryDepositToBankInLast7Months: number;
};

type TCashDetails = {
  YourSalaryType: string;
  YourSalaryAmountBDT: number;
};

type TChequeDetails = {
  ChequeType: string;
  YourSalaryAmountBDT: number;
};

type TSalariedJobDetails = {
  companyName: string;
  companyType: string;
  yourJobStatus: string;
  currentJobExperience: number;
  TotalJobExperienceCurrent: number;
  yourSalaryType: SalaryType;
  bankAccount?: TBankAccountDetails;
  cash?: TCashDetails;
  cheque?: TChequeDetails;
};

type TBusinessOwnerDetails = {
  YourCompanyType: 'PRIVATE_LTD' | 'PARTNERSHIP' | 'PROPRIETOR_SHIP';
  PrivateLtd?: {
    SharePortion: number;
    YourBusinessCategory: string;
    YourBusinessType: string;
  };
  Partnership?: {
    YourBusinessCategory: string;
    YourBusinessType: string;
  };
};

type TRentalIncomeDetails = {
  HouseType: {
    tinShedHouse: boolean;
    SemiPaka: boolean;
    BuildingWithPlan: boolean;
    BuildingWithoutPlan: boolean;
  };
};

type TLoanDetails = {
  NumberOfLoan: number;
  LoanType: string;
  BankName: string;
  EMIAmountBDT: number;
  InterestRate: boolean;
};

type TCreditCardDetails = {
  numberOfCard: number;
  cardType: string;
  bankName: string;
  cardLimitBDT: number;
};

