import { z } from "zod";

// ── ENUMS ─────────────────────────────────────────────
export const Gender = z.enum(["MALE", "FEMALE", "OTHER"], { required_error: "Gender is required" });
export const MaritalStatus = z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"], { required_error: "Marital status is required" });
export const Religion = z.enum(["ISLAM", "HINDUISM", "CHRISTIANITY", "BUDDHISM", "OTHER"], { required_error: "Religion is required" });
export const ResidentialStatus = z.enum(["RESIDENT", "NONRESIDENT", "TEMPORARYRESIDENT"], { required_error: "Residential status is required" });
export const EduLavel = z.enum(["BELOW_SSC", "SSC", "HSC", "GRADUATE", "POST_GRADUATE", "PHD", "OTHER_EDUCATION"], { required_error: "Requre Edication lavel status is required" });
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
    adjustmentPlan: z.string().min(1, "Adjustment plan is required"),
    disbursedAmount: z.string().min(1, "Disbursed amount is required"),
    otherLoanType: z.string().optional(),
    lenderName: z.string().min(1, "Lender name is required"),
    outstanding: z.string().min(1, "Outstanding is required"),
    emi: z.string().min(1, "EMI is required"),
    loanInfoId: z.string().uuid().min(1, "Loan info ID is required"),
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

export const employmentInformationSchema = z.object({
    id: z.string().uuid(),
    employmentStatus: z.string().min(1, "Employment status is required"),
    jobTitle: z.string().min(1, "Job title is required"),
    designation: z.string().min(1, "Designation is required"),
    department: z.string().min(1, "Department is required"),
    employeeId: z.string().min(1, "Employee ID is required"),
    employmentType: z.string().min(1, "Employment type is required"),
    dateOfJoining: z.string().datetime("Invalid date format"), // ISO string
    organizationName: z.string().min(1, "Organization name is required"),
    organizationAddress: z.string().min(1, "Organization address is required"),
    serviceYears: z.number().int().nonnegative(),
    serviceMonths: z.number().int().min(0).max(11),
    eTin: z.string().min(1, "eTIN is required"),
    officialContact: z.string().min(1, "Official contact is required"),

    hasPreviousOrganization: z.boolean(),
    previousOrganizationName: z.string().optional(),
    previousDesignation: z.string().optional(),
    previousServiceYears: z.number().int().nonnegative().optional(),
    previousServiceMonths: z.number().int().min(0).max(11).optional(),

    totalExperienceYears: z.number().int().nonnegative(),
    totalExperienceMonths: z.number().int().min(0).max(11),

    // Business-related
    businessName: z.string().optional(),
    businessAddress: z.string().optional(),
    sharePortion: z.string().optional(),
    businessRegistrationNumber: z.string().optional(),
    tradeLicenseAge: z.string().optional(),

    // Professional-related
    professionType: z.string().optional(),
    otherProfession: z.string().optional(),
    professionalTitle: z.string().optional(),
    institutionName: z.string().optional(),
    workplaceAddress: z.string().optional(),
    yearsOfExperience: z.number().int().nonnegative().optional(),
    startedPracticeSince: z.string().datetime().optional(),
    tin: z.string().optional(),
    websitePortfolioLink: z.string().url().optional(),
    professionalRegistrationNumber: z.string().optional(),

    // Property
    propertyType: z.string().min(1, "Property type is required"),
    propertyValue: z.string().min(1, "Property value is required"),

    // Income
    grossMonthlyIncome: z.string().min(1),
    rentIncome: z.string().optional(),
    otherIncome: z.string().optional(),
    sourceOfOtherIncome: z.string().optional(),
    totalIncome: z.string().min(1),

    loanApplicationFormId: z.string().min(1),
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
    fatherName: z.string().min(1, "Father or Husband name is required"),
    motherName: z.string().min(1, "Mother name is required"),
    spouseName: z.string().optional(),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    placeOfBirth: z.string(),
    nationality: z.string(),
    gender: Gender,
    maritalStatus: MaritalStatus,
    educationalLevel: EduLavel,
    NIDNumber: z.string(),
    passportNumber: z.string().optional(),
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
    residentialInfo: ResidentialInformation.optional(),
    employmentInfo: employmentInformationSchema.optional(),
    loanInfo: LoanInfo.optional(),
    loanRequest: LoanRequest.optional(),
    GuarantorInfo: GuarantorInfo.optional(),
});
