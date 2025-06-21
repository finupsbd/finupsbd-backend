import { z } from "zod";

// ── ENUMS ─────────────────────────────────────────────
export const Gender = z.enum(["MALE", "FEMALE", "OTHER"], { required_error: "Gender is required" });
export const MaritalStatus = z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"], { required_error: "Marital status is required" });
export const EduLavel = z.enum(["HIGHSCHOOL", "BACHELOR", "MASTER", "PHD", "OTHER"], { required_error: "Educational level is required" });
export const Religion = z.enum(["ISLAM", "HINDUISM", "CHRISTIANITY", "BUDDHISM", "OTHER"], { required_error: "Religion is required" });
export const ResidentialStatus = z.enum(["RESIDENT", "NONRESIDENT", "TEMPORARYRESIDENT"], { required_error: "Residential status is required" });
export const OwnershipStatus = z.enum(["OWNED", "RENTED", "LEASED", "OTHER"]);
export const LoanStatus = z.enum(["SUBMITTED", "PENDING", "IN_PROGRESS", "APPROVED", "REJECTED", "COMPLETED"]);
export const LoanType = z.enum(["PERSONAL_LOAN", "HOME_LOAN", "CAR_LOAN", "SME_LOAN", "INSTANT_LOAN"]);

// ── SUB-SCHEMAS ──────────────────────────────────────
const BankAccount = z.object({
    bankName: z.string().min(1, "Bank name is required"),
    accountNumber: z.string().min(5, "Account number is too short"),
});

const CreditCardUser = z.object({
    issuerName: z.string().min(1, "Issuer name is required"),
    cardLimit: z.string().min(1, "Card limit is required"),
    toBeClosedBeforeDisbursement: z.boolean({ invalid_type_error: "Must select an option" }),
});

const ExistingLoanUser = z.object({
    loanType: LoanType,
    otherLoanType: z.string().optional(),
    lenderName: z.string().min(1, "Lender name is required"),
    outstandingAmount: z.number({ invalid_type_error: "Outstanding amount must be a number" }),
    monthlyEMI: z.number({ invalid_type_error: "Monthly EMI must be a number" }),
    toBeClosedBeforeDisbursement: z.boolean(),
});

const PersonalGuarantor = z.object({
    mobileNumber: z.string().min(11, "Valid mobile number is required"),
    emailAddress: z.string().email("Valid email required"),
});

const BusinessGuarantor = z.object({
    mobileNumber: z.string().min(11, "Valid mobile number is required"),
    emailAddress: z.string().email("Valid email required"),
});

const GuarantorInfo = z.object({
    personalGuarantorId: PersonalGuarantor.optional(),
    businessGuarantorId: BusinessGuarantor.optional(),
});

const LoanRequest = z.object({
    loanAmount: z.string().min(1, "Loan amount is required"),
    loanTenure: z.number().min(1, "Loan tenure must be at least 1 month"),
    loanPurpose: z.string().min(1, "Loan purpose is required"),
    emiStartDate: z.number({ invalid_type_error: "Valid EMI start date required" }),
});

const LoanInfo = z.object({
    hasCreditCard: z.boolean(),
    hasExistingLoan: z.boolean(),
    bankAccounts: z.array(BankAccount).min(1, "At least one bank account required"),
    creditCards: z.array(CreditCardUser),
    existingLoans: z.array(ExistingLoanUser),
});

const EmploymentInformation = z.object({
    employmentStatus: z.string().min(1, "Employment status is required"),
    jobTitle: z.string(),
    designation: z.string(),
    department: z.string(),
    employeeId: z.string(),
    employmentType: z.string(),
    dateOfJoining: z.string(),
    organizationName: z.string(),
    organizationAddress: z.string(),
    serviceYears: z.number(),
    serviceMonths: z.number(),
    eTin: z.string(),
    officialContact: z.string(),
    hasPreviousOrganization: z.boolean(),
    previousOrganizationName: z.string().optional(),
    previousDesignation: z.string().optional(),
    previousServiceYears: z.number().optional(),
    previousServiceMonths: z.number().optional(),
    totalExperienceYears: z.number(),
    totalExperienceMonths: z.number(),
    propertyType: z.string(),
    propertyValue: z.string(),
    grossMonthlyIncome: z.string(),
    rentIncome: z.string().optional(),
    otherIncome: z.string().optional(),
    totalIncome: z.string(),
});

const ResidentialInformation = z.object({
    presentAddress: z.string(),
    presentDistrict: z.string(),
    presentDivision: z.string(),
    presentLengthOfStay: z.string(),
    presentOwnershipStatus: OwnershipStatus,
    presentPostalCode: z.string(),
    presentThana: z.string(),
    isPermanentSameAsPresent: z.boolean(),
    permanentAddress: z.string().optional(),
    permanentDistrict: z.string().optional(),
    permanentDivision: z.string().optional(),
    permanentLengthOfStay: z.string().optional(),
    permanentOwnershipStatus: OwnershipStatus.optional(),
    permanentThana: z.string().optional(),
    permanentPostalCode: z.string().optional(),
});

const PersonalInfo = z.object({
    fullName: z.string().min(1, "Full name is required"),
    fatherOrHusbandName: z.string().min(1, "Father or Husband name is required"),
    motherName: z.string().min(1, "Mother name is required"),
    spouseName: z.string().optional(),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    placeOfBirth: z.string(),
    nationality: z.string(),
    gender: Gender,
    maritalStatus: MaritalStatus,
    educationalLevel: EduLavel,
    identificationType: z.string(),
    identificationNumber: z.string(),
    religion: Religion,
    residentialStatus: ResidentialStatus,
    mobileNumber: z.string(),
    alternateMobileNumber: z.string().optional(),
    emailAddress: z.string().email(),
    socialMediaProfiles: z.array(z.string()),
});

// ── FINAL MAIN SCHEMA ────────────────────────────────
export const LoanApplicationFormSchema = z.object({
    personalInfo: PersonalInfo.optional(),
    residentialInformation: ResidentialInformation.optional(),
    employmentInformation: EmploymentInformation.optional(),
    loanInfo: LoanInfo.optional(),
    loanRequest: LoanRequest.optional(),
    GuarantorInfo: GuarantorInfo.optional(),
});
