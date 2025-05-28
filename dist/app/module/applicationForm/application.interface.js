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
exports.DocumentType = exports.LoanStatus = exports.EducationnalLavel = exports.MaritalStatus = void 0;
// Enums
var MaritalStatus;
(function (MaritalStatus) {
    MaritalStatus["SINGLE"] = "SINGLE";
    MaritalStatus["MARRIED"] = "MARRIED";
    MaritalStatus["DIVORCED"] = "DIVORCED";
    MaritalStatus["WIDOWED"] = "WIDOWED";
})(MaritalStatus || (exports.MaritalStatus = MaritalStatus = {}));
var EducationnalLavel;
(function (EducationnalLavel) {
    EducationnalLavel["HIGHSCHOOL"] = "HIGHSCHOOL";
    EducationnalLavel["BACHELOR"] = "BACHELOR";
    EducationnalLavel["MASTER"] = "MASTER";
    EducationnalLavel["PHD"] = "PHD";
    EducationnalLavel["OTHER"] = "OTHER";
})(EducationnalLavel || (exports.EducationnalLavel = EducationnalLavel = {}));
var LoanStatus;
(function (LoanStatus) {
    LoanStatus["SUBMITTED"] = "SUBMITTED";
    LoanStatus["IN_PROCESS"] = "IN_PROCESS";
    LoanStatus["PENDING"] = "PENDING";
    LoanStatus["APPROVED"] = "APPROVED";
    LoanStatus["REJECTED"] = "REJECTED";
    LoanStatus["COMPLETED"] = "COMPLETED";
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
