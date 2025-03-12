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
var Status;
(function (Status) {
    Status["PENDING"] = "PENDING";
    Status["IN_PROGRESS"] = "IN_PROGRESS";
    Status["APPROVED"] = "APPROVED";
    Status["REJECTED"] = "REJECTED";
})(Status || (Status = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
    Gender["OTHER"] = "OTHER";
})(Gender || (Gender = {}));
var MaritalStatus;
(function (MaritalStatus) {
    MaritalStatus["SINGLE"] = "SINGLE";
    MaritalStatus["MARRIED"] = "MARRIED";
    MaritalStatus["DIVORCED"] = "DIVORCED";
    MaritalStatus["WIDOWED"] = "WIDOWED";
})(MaritalStatus || (MaritalStatus = {}));
var OwnershipStatus;
(function (OwnershipStatus) {
    OwnershipStatus["OWNED"] = "OWNED";
    OwnershipStatus["RENTED"] = "RENTED";
    OwnershipStatus["LEASED"] = "LEASED";
    OwnershipStatus["OTHER"] = "OTHER";
})(OwnershipStatus || (OwnershipStatus = {}));
var EmploymentStatus;
(function (EmploymentStatus) {
    EmploymentStatus["SALARIED"] = "SALARIED";
    EmploymentStatus["BUSINESS_OWNER"] = "BUSINESS_OWNER";
})(EmploymentStatus || (EmploymentStatus = {}));
var LoanType;
(function (LoanType) {
    LoanType["PERSONAL"] = "PERSONAL";
    LoanType["HOME"] = "HOME";
    LoanType["CAR"] = "CAR";
    LoanType["BUSINESS"] = "BUSINESS";
    LoanType["EDUCATION"] = "EDUCATION";
    LoanType["OTHER"] = "OTHER";
})(LoanType || (LoanType = {}));
