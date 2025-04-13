"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentType = exports.LoanStatus = exports.MaritalStatus = void 0;
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
// Enums
var MaritalStatus;
(function (MaritalStatus) {
    MaritalStatus["SINGLE"] = "SINGLE";
    MaritalStatus["MARRIED"] = "MARRIED";
    MaritalStatus["DIVORCED"] = "DIVORCED";
    MaritalStatus["WIDOWED"] = "WIDOWED";
})(MaritalStatus || (exports.MaritalStatus = MaritalStatus = {}));
var LoanStatus;
(function (LoanStatus) {
    LoanStatus["PENDING"] = "PENDING";
    LoanStatus["APPROVED"] = "APPROVED";
    LoanStatus["REJECTED"] = "REJECTED";
    LoanStatus["UNDER_REVIEW"] = "UNDER_REVIEW";
})(LoanStatus || (exports.LoanStatus = LoanStatus = {}));
var DocumentType;
(function (DocumentType) {
    DocumentType["PASSPORT"] = "PASSPORT";
    DocumentType["ID_CARD"] = "ID_CARD";
    DocumentType["INCOME_PROOF"] = "INCOME_PROOF";
    DocumentType["BANK_STATEMENT"] = "BANK_STATEMENT";
    DocumentType["TIN_CERTIFICATE"] = "TIN_CERTIFICATE";
    DocumentType["EMPLOYMENT_PROOF"] = "EMPLOYMENT_PROOF";
    DocumentType["UTILITY_BILL"] = "UTILITY_BILL";
    DocumentType["PROPERTY_DOCUMENT"] = "PROPERTY_DOCUMENT";
    DocumentType["ADDITIONAL"] = "ADDITIONAL";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
