"use strict";
// /* eslint-disable no-unused-vars */
// export enum TStatus {
//     PENDING = "PENDING",
//     IN_PROGRESS = "IN_PROGRESS",
//     APPROVED = "APPROVED",
//     REJECTED = "REJECTED",
//   }
//   export enum TAppGender {
//     MALE = "MALE",
//     FEMALE = "FEMALE",
//     OTHER = "OTHER",
//   }
//   export enum TMaritalStatus {
//     SINGLE = "SINGLE",
//     MARRIED = "MARRIED",
//     DIVORCED = "DIVORCED",
//     WIDOWED = "WIDOWED",
//   }
//   export enum TOwnershipStatus {
//     OWNED = "OWNED",
//     RENTED = "RENTED",
//     LEASED = "LEASED",
//     OTHER = "OTHER",
//   }
//   export enum TPropertyType {
//     RESIDENTIAL = "RESIDENTIAL",
//     COMMERCIAL = "COMMERCIAL",
//     LAND = "LAND",
//   }
//   export enum TEmploymentStatus {
//     SALARIED = "SALARIED",
//     SELF_EMPLOYED = "SELF_EMPLOYED",
//     BUSINESS_OWNER = "BUSINESS_OWNER",
//     UNEMPLOYED = "UNEMPLOYED",
//   }
//   export interface TApplicationForm {
//     id: string;
//     applicationId: string;
//     userId: string;
//     fullName: string;
//     fatherName: string;
//     motherName: string;
//     spouseName?: string;
//     dateOfBirth?: string;
//     placeOfBirth: string;
//     gender?: TAppGender;
//     maritalStatus: TMaritalStatus;
//     nid: string;
//     birthRegistration?: string;
//     mobileNumber: string;
//     alternateNumber?: string;
//     emailAddress: string;
//     socialMediaLink: string[];
//     propertyDetails?: TPropertyDetails;
//     employmentFinancialInfo: TEmploymentFinancialInfo;
//     existingLoans?: TExistingLoan;
//     creditCards?: TCreditCard;
//     otherLiabilities?: TLiability;
//     coApplicant?: TCoApplicant;
//     status: TStatus;
//     loanApplication?: TLoanApplication;
//     address?: TAddress;
//   }
//   export interface TPropertyDetails {
//     id: string;
//     typeOfProperty: TPropertyType;
//     approximateValue: number;
//   }
//   export interface TEmploymentFinancialInfo {
//     id: string;
//     employmentStatus: TEmploymentStatus;
//     jobTitle?: string;
//     employerName?: string;
//     department?: string;
//     officeAddress?: string;
//     contactDetails?: string;
//     businessName?: string;
//     businessRegistrationNumber?: string;
//     employmentTenureYears?: number;
//     monthlyGrossIncome: number;
//     otherSourcesOfIncome?: string;
//     totalMonthlyExpenses: number;
//     profession?: string;
//     taxIdentificationNumber?: string;
//     currentCreditScore?: number;
//   }
//   export interface TLoanApplication {
//     id: string;
//     loanType: string;
//     loanAmountRequested: number;
//     purposeOfLoan: string;
//     preferredLoanTenure: number;
//     proposedEMIStartDate: string;
//     repaymentPreferences: string;
//   }
//   export interface TExistingLoan {
//     id: string;
//     lenderName: string;
//     loanBalance: number;
//     monthlyEMI: number;
//     remainingTenure: number;
//   }
//   export interface TCreditCard {
//     id: string;
//     cardIssuer: string;
//     currentBalance: number;
//     minimumMonthlyPayment: number;
//   }
//   export interface TLiability {
//     id: string;
//     type: string;
//     balance: number;
//     emi: number;
//   }
//   export interface TCoApplicant {
//     id: string;
//     fullName: string;
//     relationship: string;
//     employment: string;
//     monthlyIncome: number;
//   }
//   export interface TAddress {
//     id: string;
//     houseFlatNo: string;
//     streetRoad: string;
//     areaLocality: string;
//     city: string;
//     district: string;
//     postalCode: string;
//     ownershipStatus: TOwnershipStatus;
//     lengthOfStayYears: number;
//     addressType: string;
//   }
