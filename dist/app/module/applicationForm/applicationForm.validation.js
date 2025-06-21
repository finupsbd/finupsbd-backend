"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanApplicationFormSchema = exports.LoanType = exports.LoanStatus = exports.OwnershipStatus = exports.ResidentialStatus = exports.Religion = exports.EduLavel = exports.MaritalStatus = exports.Gender = void 0;
const zod_1 = require("zod");
// ── ENUMS ─────────────────────────────────────────────
exports.Gender = zod_1.z.enum(["MALE", "FEMALE", "OTHER"], { required_error: "Gender is required" });
exports.MaritalStatus = zod_1.z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"], { required_error: "Marital status is required" });
exports.EduLavel = zod_1.z.enum(["HIGHSCHOOL", "BACHELOR", "MASTER", "PHD", "OTHER"], { required_error: "Educational level is required" });
exports.Religion = zod_1.z.enum(["ISLAM", "HINDUISM", "CHRISTIANITY", "BUDDHISM", "OTHER"], { required_error: "Religion is required" });
exports.ResidentialStatus = zod_1.z.enum(["RESIDENT", "NONRESIDENT", "TEMPORARYRESIDENT"], { required_error: "Residential status is required" });
exports.OwnershipStatus = zod_1.z.enum(["OWNED", "RENTED", "LEASED", "OTHER"]);
exports.LoanStatus = zod_1.z.enum(["SUBMITTED", "PENDING", "IN_PROGRESS", "APPROVED", "REJECTED", "COMPLETED"]);
exports.LoanType = zod_1.z.enum(["PERSONAL_LOAN", "HOME_LOAN", "CAR_LOAN", "SME_LOAN", "INSTANT_LOAN"]);
// ── SUB-SCHEMAS ──────────────────────────────────────
const BankAccount = zod_1.z.object({
    bankName: zod_1.z.string().min(1, "Bank name is required"),
    accountNumber: zod_1.z.string().min(5, "Account number is too short"),
});
const CreditCardUser = zod_1.z.object({
    issuerName: zod_1.z.string().min(1, "Issuer name is required"),
    cardLimit: zod_1.z.string().min(1, "Card limit is required"),
    toBeClosedBeforeDisbursement: zod_1.z.boolean({ invalid_type_error: "Must select an option" }),
});
const ExistingLoanUser = zod_1.z.object({
    loanType: exports.LoanType,
    otherLoanType: zod_1.z.string().optional(),
    lenderName: zod_1.z.string().min(1, "Lender name is required"),
    outstandingAmount: zod_1.z.number({ invalid_type_error: "Outstanding amount must be a number" }),
    monthlyEMI: zod_1.z.number({ invalid_type_error: "Monthly EMI must be a number" }),
    toBeClosedBeforeDisbursement: zod_1.z.boolean(),
});
const PersonalGuarantor = zod_1.z.object({
    mobileNumber: zod_1.z.string().min(11, "Valid mobile number is required"),
    emailAddress: zod_1.z.string().email("Valid email required"),
});
const BusinessGuarantor = zod_1.z.object({
    mobileNumber: zod_1.z.string().min(11, "Valid mobile number is required"),
    emailAddress: zod_1.z.string().email("Valid email required"),
});
const GuarantorInfo = zod_1.z.object({
    personalGuarantorId: PersonalGuarantor.optional(),
    businessGuarantorId: BusinessGuarantor.optional(),
});
const LoanRequest = zod_1.z.object({
    loanAmount: zod_1.z.string().min(1, "Loan amount is required"),
    loanTenure: zod_1.z.number().min(1, "Loan tenure must be at least 1 month"),
    loanPurpose: zod_1.z.string().min(1, "Loan purpose is required"),
    emiStartDate: zod_1.z.number({ invalid_type_error: "Valid EMI start date required" }),
});
const LoanInfo = zod_1.z.object({
    hasCreditCard: zod_1.z.boolean(),
    hasExistingLoan: zod_1.z.boolean(),
    bankAccounts: zod_1.z.array(BankAccount).min(1, "At least one bank account required"),
    creditCards: zod_1.z.array(CreditCardUser),
    existingLoans: zod_1.z.array(ExistingLoanUser),
});
const EmploymentInformation = zod_1.z.object({
    employmentStatus: zod_1.z.string().min(1, "Employment status is required"),
    jobTitle: zod_1.z.string(),
    designation: zod_1.z.string(),
    department: zod_1.z.string(),
    employeeId: zod_1.z.string(),
    employmentType: zod_1.z.string(),
    dateOfJoining: zod_1.z.string(),
    organizationName: zod_1.z.string(),
    organizationAddress: zod_1.z.string(),
    serviceYears: zod_1.z.number(),
    serviceMonths: zod_1.z.number(),
    eTin: zod_1.z.string(),
    officialContact: zod_1.z.string(),
    hasPreviousOrganization: zod_1.z.boolean(),
    previousOrganizationName: zod_1.z.string().optional(),
    previousDesignation: zod_1.z.string().optional(),
    previousServiceYears: zod_1.z.number().optional(),
    previousServiceMonths: zod_1.z.number().optional(),
    totalExperienceYears: zod_1.z.number(),
    totalExperienceMonths: zod_1.z.number(),
    propertyType: zod_1.z.string(),
    propertyValue: zod_1.z.string(),
    grossMonthlyIncome: zod_1.z.string(),
    rentIncome: zod_1.z.string().optional(),
    otherIncome: zod_1.z.string().optional(),
    totalIncome: zod_1.z.string(),
});
const ResidentialInformation = zod_1.z.object({
    presentAddress: zod_1.z.string(),
    presentDistrict: zod_1.z.string(),
    presentDivision: zod_1.z.string(),
    presentLengthOfStay: zod_1.z.string(),
    presentOwnershipStatus: exports.OwnershipStatus,
    presentPostalCode: zod_1.z.string(),
    presentThana: zod_1.z.string(),
    isPermanentSameAsPresent: zod_1.z.boolean(),
    permanentAddress: zod_1.z.string().optional(),
    permanentDistrict: zod_1.z.string().optional(),
    permanentDivision: zod_1.z.string().optional(),
    permanentLengthOfStay: zod_1.z.string().optional(),
    permanentOwnershipStatus: exports.OwnershipStatus.optional(),
    permanentThana: zod_1.z.string().optional(),
    permanentPostalCode: zod_1.z.string().optional(),
});
const PersonalInfo = zod_1.z.object({
    fullName: zod_1.z.string().min(1, "Full name is required"),
    fatherOrHusbandName: zod_1.z.string().min(1, "Father or Husband name is required"),
    motherName: zod_1.z.string().min(1, "Mother name is required"),
    spouseName: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().min(1, "Date of birth is required"),
    placeOfBirth: zod_1.z.string(),
    nationality: zod_1.z.string(),
    gender: exports.Gender,
    maritalStatus: exports.MaritalStatus,
    educationalLevel: exports.EduLavel,
    identificationType: zod_1.z.string(),
    identificationNumber: zod_1.z.string(),
    religion: exports.Religion,
    residentialStatus: exports.ResidentialStatus,
    mobileNumber: zod_1.z.string(),
    alternateMobileNumber: zod_1.z.string().optional(),
    emailAddress: zod_1.z.string().email(),
    socialMediaProfiles: zod_1.z.array(zod_1.z.string()),
});
// ── FINAL MAIN SCHEMA ────────────────────────────────
exports.LoanApplicationFormSchema = zod_1.z.object({
    personalInfo: PersonalInfo.optional(),
    residentialInformation: ResidentialInformation.optional(),
    employmentInformation: EmploymentInformation.optional(),
    loanInfo: LoanInfo.optional(),
    loanRequest: LoanRequest.optional(),
    GuarantorInfo: GuarantorInfo.optional(),
});
