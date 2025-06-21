/* eslint-disable no-unused-vars */


export type TLoanApplicationForm = {
  status: LoanStatus;
  isActive: boolean;
  isDeleted: boolean;
  adminNotes?: string;
  applicationId?: string;
  userId: string;
  personalInfo?: PersonalInfo;
  residentialInformation?: ResidentialInformation;
  employmentInformation?: EmploymentInformation;
  loanInfo?: LoanInfo;
  loanRequest?: LoanRequest;
  GuarantorInfo?: GuarantorInfo;
  PersonalGuarantor?: PersonalGuarantor;
  BusinessGuarantor?: BusinessGuarantor;
  personalGuarantorId?: string;
  businessGuarantorId?: string;
};

export type PersonalInfo = {
  fullName: string;
  fatherOrHusbandName: string;
  motherName: string;
  spouseName?: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  educationalLevel: EduLavel;
  identificationType: string;
  identificationNumber: string;
  religion: Religion;
  residentialStatus: ResidentialStatus;
  mobileNumber: string;
  alternateMobileNumber?: string;
  emailAddress: string;
  socialMediaProfiles: string[];
};

export type ResidentialInformation = {
  presentAddress: string;
  presentDistrict: string;
  presentDivision: string;
  presentLengthOfStay: string;
  presentOwnershipStatus: OwnershipStatus;
  presentPostalCode: string;
  presentThana: string;
  isPermanentSameAsPresent: boolean;
  permanentAddress?: string;
  permanentDistrict?: string;
  permanentDivision?: string;
  permanentLengthOfStay?: string;
  permanentOwnershipStatus?: OwnershipStatus;
  permanentThana?: string;
  permanentPostalCode?: string;
};

export type EmploymentInformation = {
  employmentStatus: string;
  jobTitle: string;
  designation: string;
  department: string;
  employeeId: string;
  employmentType: string;
  dateOfJoining: string;
  organizationName: string;
  organizationAddress: string;
  serviceYears: number;
  serviceMonths: number;
  eTin: string;
  officialContact: string;
  hasPreviousOrganization: boolean;
  previousOrganizationName?: string;
  previousDesignation?: string;
  previousServiceYears?: number;
  previousServiceMonths?: number;
  totalExperienceYears: number;
  totalExperienceMonths: number;
  propertyType: string;
  propertyValue: string;
  grossMonthlyIncome: string;
  rentIncome?: string;
  otherIncome?: string;
  totalIncome: string;
};

export type LoanInfo = {
  hasCreditCard: boolean;
  hasExistingLoan: boolean;
  bankAccounts: BankAccount[];
  creditCards: CreditCardUser[];
  existingLoans: ExistingLoanUser[];

};

export type BankAccount = {
  bankName: string;
  accountNumber: string;

};

export type CreditCardUser = {
  issuerName: string;
  cardLimit: string;
  toBeClosedBeforeDisbursement: boolean;

};

export type ExistingLoanUser = {
  loanType: LoanType;
  otherLoanType?: string;
  lenderName: string;
  outstandingAmount: number;
  monthlyEMI: number;
  toBeClosedBeforeDisbursement: boolean;

};

export type LoanRequest = {
  loanAmount: string;
  loanTenure: number;
  loanPurpose: string;
  emiStartDate: number;

};

export type GuarantorInfo = {
  personalGuarantor: PersonalGuarantor;
  businessGuarantor?: BusinessGuarantor;
};

export type BusinessGuarantor = {

  mobileNumber: string;
  emailAddress: string;
};

export type PersonalGuarantor = {

  mobileNumber: string;
  emailAddress: string;
};

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}

export enum MaritalStatus {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED"
}

export enum EduLavel {
  HIGHSCHOOL = "HIGHSCHOOL",
  BACHELOR = "BACHELOR",
  MASTER = "MASTER",
  PHD = "PHD",
  OTHER = "OTHER"
}

export enum Religion {
  ISLAM = "ISLAM",
  HINDUISM = "HINDUISM",
  CHRISTIANITY = "CHRISTIANITY",
  BUDDHISM = "BUDDHISM",
  OTHER = "OTHER"
}

export enum ResidentialStatus {
  RESIDENT = "RESIDENT",
  NONRESIDENT = "NONRESIDENT",
  TEMPORARYRESIDENT = "TEMPORARYRESIDENT"
}

export enum OwnershipStatus {
  OWNED = "OWNED",
  RENTED = "RENTED",
  LEASED = "LEASED",
  OTHER = "OTHER"
}

export enum LoanStatus {
  SUBMITTED = "SUBMITTED",
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED"
}

export enum LoanType {
  PERSONAL_LOAN = "PERSONAL_LOAN",
  HOME_LOAN = "HOME_LOAN",
  CAR_LOAN = "CAR_LOAN",
  SME_LOAN = "SME_LOAN",
  INSTANT_LOAN = "INSTANT_LOAN"
}
