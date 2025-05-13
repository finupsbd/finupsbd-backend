/* eslint-disable no-unused-vars */
// export type Status = 'PENDING' | 'IN_PROGRESS' | 'APPROVE' | 'REJECT';
// export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
// export type MaritalStatus = 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED';
// export type OwnershipStatus = 'OWNED' | 'RENTED' | 'LEASED' | 'OTHER';
// export type PropertyType = 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND';
// export type EmploymentStatus = 'SALARIED' | 'SELF_EMPLOYED' | 'BUSINESS_OWNER';
// export type LoanType =
//   | 'PERSONAL'
//   | 'HOME'
//   | 'CAR'
//   | 'BUSINESS'
//   | 'EDUCATION'
// export type DocumentType =
//   | 'PASSPORT_PHOTO'
//   | 'NATIONAL_ID'
//   | 'BIRTH_CERTIFICATE'
//   | 'INCOME_PROOF'
//   | 'BANK_STATEMENT'
//   | 'TIN_CERTIFICATE'
//   | 'EMPLOYMENT_PROOF'
//   | 'UTILITY_BILL'
//   | 'PROPERTY_DOCUMENT'
//   | 'SUPPORTING_DOCUMENT';

// export interface ApplicationForm {
//   id: string;
//   userId: string;
//   applicationId: string;
//   personalLoanId?: string
//   status: Status;
//   userInfo: ApplicationUserInfo;
//   address: Address;
//   employmentFinancialInfo: EmploymentFinancialInfo;
//   loanSpecifications: LoanRequestSpecifications;
//   financialObligations: FinancialObligation[];
//   uploadedDocuments: DocumentFile[];
// }

// export interface ApplicationUserInfo {
//   id: string;
//   fullName: string;
//   fatherName: string;
//   motherName: string;
//   spouseName?: string;
//   dateOfBirth: string;
//   placeOfBirth: string;
//   gender: Gender;
//   maritalStatus: MaritalStatus;
//   nid: string;
//   birthRegistration: string | null;
//   mobileNumber: string;
//   alternateNumber?: string;
//   emailAddress: string;
//   socialMediaLinks: string[];
//   propertyType: PropertyType;
//   approximateValue: number;
//   applicationFormId?: string;
//   applicationForm?: TFullApplicationForm;
// }

// export interface Address {
//   id: string;
//   houseFlatNo: string;
//   streetRoad: string;
//   areaLocality: string;
//   city: string;
//   district: string;
//   postalCode: string;
//   lengthOfStayYears: number;
//   ownershipStatus: OwnershipStatus;
//   applicationFormId?: string;
//   applicationForm?: TFullApplicationForm;
// }

// export interface EmploymentFinancialInfo {
//   id: string;
//   employmentStatus: EmploymentStatus;
//   jobTitle: string;
//   employerName: string;
//   officeAddress: string;
//   department: string;
//   contactDetails: string;
//   businessName?: string;
//   businessRegistrationNumber?: string;
//   employmentTenureYears: number;
//   monthlyGrossIncome: number;
//   otherSourcesOfIncome?: string;
//   totalMonthlyExpenses: number;
//   profession: string;
//   taxIdentificationNumber?: string;
//   currentCreditScore?: number;
//   applicationFormId?: string;
//   applicationForm?: TFullApplicationForm;
// }

// export interface LoanRequestSpecifications {
//   id: string;
//   loanType: LoanType;
//   loanAmountRequested: number;
//   purposeOfLoan: string;
//   preferredLoanTenure: number;
//   proposedEMIStartDate: Date | null;
//   repaymentPreferences: string;
//   applicationFormId?: string;
//   applicationForm?: TFullApplicationForm;
// }

// export interface FinancialObligation {
//   id: string;
//   lenderName: string;
//   loanBalance: number;
//   monthlyEMI: number;
//   remainingTenure: number;
//   cardIssuer?: string;
//   currentBalance?: number;
//   minimumMonthlyPayment?: number;
//   obligationType: string;
//   balance: number;
//   emi: number;
//   applicationFormId?: string;
//   applicationForm?: TFullApplicationForm;
// }

// export interface DocumentFile {
//   id: number;
//   type: DocumentType;
//   filePath: string;
//   uploadedAt: Date;
//   fileSizeMB?: number;
//   fileType?: string;
//   applicationFormId?: string;
//   applicationForm?: TFullApplicationForm;
// }

// export interface TFullApplicationForm extends ApplicationForm {
//   userInfo: ApplicationUserInfo;
//   currentAddress: Address;
//   permanentAddress: Address;
//   employmentFinancialInfo: EmploymentFinancialInfo;
//   loanSpecifications: LoanRequestSpecifications;
//   financialObligations: FinancialObligation[];
//   uploadedDocuments: DocumentFile[];
// }






// enum Status {
//   PENDING = 'PENDING',
//   IN_PROGRESS = 'IN_PROGRESS',
//   APPROVED = 'APPROVED',
//   REJECTED = 'REJECTED',
// }

// enum Gender {
//   MALE = 'MALE',
//   FEMALE = 'FEMALE',
//   OTHER = 'OTHER',
// }

// enum MaritalStatus {
//   SINGLE = 'SINGLE',
//   MARRIED = 'MARRIED',
//   DIVORCED = 'DIVORCED',
//   WIDOWED = 'WIDOWED',
// }

// enum OwnershipStatus {
//   OWNED = 'OWNED',
//   RENTED = 'RENTED',
//   LEASED = 'LEASED',
//   OTHER = 'OTHER',
// }

// enum EmploymentStatus {
//   SALARIED = 'SALARIED',
//   BUSINESS_OWNER = 'BUSINESS_OWNER',
// }

// enum LoanType {
//   PERSONAL = 'PERSONAL',
//   HOME = 'HOME',
//   CAR = 'CAR',
//   BUSINESS = 'BUSINESS',
//   EDUCATION = 'EDUCATION',
//   OTHER = 'OTHER',
// }

// interface LoanApplication {
//   applicationId: string;
//   userId: string;
//   loanId?: string;
//   status: Status;
//   userInfoId: string;
//   residentialInformationId: string;
//   employmentFinancialInfoId: string;
//   loanSpecificationsId: string;
//   financialObligationsId: string;
//   createdAt: Date;
//   updatedAt: Date;
  
//   // Relations (optional as they need to be explicitly included)
//   user?: User;
//   userInfo?: UserInfo;
//   residentialInformation?: ResidentialInformation;
//   employmentFinancialInfo?: EmploymentFinancialInfo;
//   loanSpecifications?: LoanSpecifications;
//   financialObligations?: FinancialObligations;
// }

// interface UserInfo {
//   fullName: string;
//   fatherName: string;
//   motherName: string;
//   spouseName?: string;
//   dateOfBirth: Date;
//   placeOfBirth: string;
//   gender: Gender;
//   maritalStatus: MaritalStatus;
//   birthRegistration?: string;
//   mobileNumber: string;
//   alternateNumber?: string;
//   emailAddress: string;
//   loanApplication?: LoanApplication;
// }

// interface ResidentialInformation {
//   permanentAddressId: string;
//   presentAddressId: string;
  
//   // Relations
//   permanentAddress?: Address;
//   presentAddress?: Address;
//   loanApplication?: LoanApplication;
// }

// interface Address {
//   houseFlatNo: string;
//   streetRoad: string;
//   areaLocality: string;
//   city: string;
//   district: string;
//   postalCode: string;
//   lengthOfStayYears: number;
//   ownershipStatus: OwnershipStatus;
// }

// interface EmploymentFinancialInfo {
//   employmentStatus: EmploymentStatus;
//   jobTitle: string;
//   employerName: string;
//   officeAddress: string;
//   department?: string;
//   contactDetails: string;
//   businessName?: string;
//   businessRegistrationNumber?: string;
//   employmentTenureYears: number;
//   monthlyGrossIncome: number;
//   otherSourcesOfIncome?: string;
//   totalMonthlyExpenses: number;
//   profession?: string;
//   taxIdentificationNumber: string;
//   currentCreditScore: number;
//   loanApplication?: LoanApplication;
// }

// interface LoanSpecifications {
//   existingLoanType: LoanType;
//   loanAmountRequested: number;
//   purposeOfLoan: string;
//   preferredLoanTenure: number;
//   proposedEMIStartDate: Date;
//   repaymentPreferences: string;
//   loanApplication?: LoanApplication;
// }

// interface FinancialObligations {
//   lenderName: string;
//   loanBalance: number;
//   monthlyEMI: number;
//   remainingTenure: number;
//   cardIssuer?: string;
//   currentBalance?: number;
//   minimumMonthlyPayment?: number;
//   type: string;
//   balance: number;
//   emi: number;
//   fullNameCoApplicant?: string;
//   relationshipToCoApplicant?: string;
//   coApplicantMonthlyIncome?: number;
//   loanApplication?: LoanApplication;
// }

// // Assuming you have a User interface elsewhere
// interface User {
//   id: string;
//   // ... other user fields
// }



export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type ResidentialStatus = 'Permanent Resident' | 'Temporary Resident' | 'Non-Resident';
export type IdentificationType = 'NID' | 'PASSPORT' | 'DRIVER_LICENSE' | 'BIRTH_CERTIFICATE';

// Enums
export enum MaritalStatus {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
}

export enum LoanStatus {
  SUBMITTED = "SUBMITTED",
  IN_PROCESS = "IN_PROCESS",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
}

export enum DocumentType {
  PASSPORT = "PASSPORT",
  ID_CARD = "ID_CARD",
  INCOME_PROOF = "INCOME_PROOF",
  BANK_STATEMENT = "BANK_STATEMENT",
  TIN_CERTIFICATE = "TIN_CERTIFICATE",
  EMPLOYMENT_PROOF = "EMPLOYMENT_PROOF",
  UTILITY_BILL = "UTILITY_BILL",
  PROPERTY_DOCUMENT = "PROPERTY_DOCUMENT",
  ADDITIONAL = "ADDITIONAL",
}

// Interfaces

export interface PersonalInfo {
  fullName: string;
  fatherOrHusbandName: string;
  motherName: string;
  spouseName: string | null;
  dateOfBirth: string;         // ISO 8601 date string
  placeOfBirth: string;
  nationality: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  identificationType: IdentificationType;
  identificationNumber: string;
  religion: string;
  residentialStatus: ResidentialStatus;
  mobileNumber: string;
  alternateMobileNumber: string;
  emailAddress: string;
  socialMediaProfiles: string[];
}

export interface ResidentialInfo {
  id: string;
  permanentHouseNo: string;
  permanentStreet: string;
  permanentArea: string;
  permanentCity: string;
  permanentDistrict: string;
  permanentPostalCode: string;
  permanentStayLength: string;
  permanentOwnership: string;
  sameAsPermanent: boolean;
  presentHouseNo: string;
  presentStreet: string;
  presentArea: string;
  presentCity: string;
  presentDistrict: string;
  presentPostalCode: string;
  presentStayLength: string;
  presentOwnership: string;
  propertyType: string;
  approximateValue: string;
  loanApplicationFormId: string;
}

export interface EmploymentInfo {
  id: string;
  employmentStatus: string;
  jobTitle: string;
  employerName: string;
  employerAddress: string;
  employerDepartment: string;
  employerContact: string;
  businessName: string;
  registrationNumber: string;
  tenure: string;
  monthlyIncome: string;
  otherIncome: string;
  householdExpenses: string;
  tin: string;
  creditScore: string;
  loanApplicationFormId: string;
}

export interface LoanRequest {
  id: string;
  loanType: string;
  loanAmount: string;
  purpose: string;
  tenure: string;
  emiStartDate: string;
  repaymentPreferences: string;
  loanApplicationFormId: string;
}

export interface FinancialObligation {
  id: string;
  lenderName: string;
  loanBalance: string;
  monthlyEMI: string;
  remainingTenure: string;
  issuer: string;
  currentBalance: string;
  minimumPayment: string;
  liabilityType: string;
  liabilityBalance: string;
  liabilityEMI: string;
  coApplicantName: string;
  coApplicantRelation: string;
  coApplicantIncome: string;
  loanApplicationFormId: string;
}

export interface Document {
  id: string;
  type: DocumentType;
  url: string;
  loanApplicationFormId: string;
}

export interface GuarantorInfo {
  id: string;
  personalfullName: string;
  personalfathersOrHusbandsName: string;
  personalmothersName: string;
  personaldateOfBirth: Date;
  personalnationality: string;
  personalnid: string;
  personalbirthRegistration?: string;
  personalmobileNumber: string;
  personalemailAddress: string;
  personalrelationWithGuarantor: string;
  personalpresentAddress: string;
  personalpermanentAndMailingAddress: string;
  personalworkAddress: string;
  personaladdress: string;
  personalprofession: string;
  personalmonthlyIncome: string;
  personalemployer: string;

  businessfullName: string;
  businessfathersOrHusbandsName: string;
  businessmothersName: string;
  businessdateOfBirth: Date;
  businessnationality: string;
  businessnid: string;
  businessbirthRegistration?: string;
  businessmobileNumber: string;
  businessemailAddress: string;
  businessrelationWithGuarantor: string;
  businesspresentAddress: string;
  businesspermanentAndMailingAddress: string;
  businessworkAddress: string;
  businessaddress: string;
  businessprofession: string;
  businessmonthlyIncome: string;
  businessemployer: string;

  loanApplicationFormId: string;
}



export interface TLoanApplicationForm {
  status: LoanStatus;
  userId?: string;
  isActive: boolean;
  isDeleted: boolean;
  adminNotes?: string | null;
  applicationId?: string | null;
  personalInfo?: PersonalInfo;
}
