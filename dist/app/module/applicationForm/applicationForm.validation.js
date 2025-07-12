"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanApplicationFormSchema = exports.employmentInformationSchema = exports.EmploymentType = exports.EmploymentStatus = exports.PropertyType = exports.ProfessionType = exports.LoanType = exports.LoanStatus = exports.OwnershipStatus = exports.EduLavel = exports.ResidentialStatus = exports.Religion = exports.MaritalStatus = exports.Gender = void 0;
const zod_1 = require("zod");
// ── ENUMS ─────────────────────────────────────────────
exports.Gender = zod_1.z.enum(["MALE", "FEMALE", "OTHER"], { required_error: "Gender is required" });
exports.MaritalStatus = zod_1.z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"], { required_error: "Marital status is required" });
exports.Religion = zod_1.z.enum(["ISLAM", "HINDUISM", "CHRISTIANITY", "BUDDHISM", "OTHER"], { required_error: "Religion is required" });
exports.ResidentialStatus = zod_1.z.enum(["RESIDENT", "NONRESIDENT", "TEMPORARYRESIDENT"], { required_error: "Residential status is required" });
exports.EduLavel = zod_1.z.enum(["BELOW_SSC", "SSC", "HSC", "GRADUATE", "POST_GRADUATE", "PHD", "OTHER_EDUCATION"], { required_error: "Education level is required" });
exports.OwnershipStatus = zod_1.z.enum(["OWNED", "RENTED", "FAMILY_OWNED", "COMPANY_PROVIDED"]);
exports.LoanStatus = zod_1.z.enum(["SUBMITTED", "PENDING", "IN_PROGRESS", "APPROVED", "REJECTED", "COMPLETED"]);
exports.LoanType = zod_1.z.enum(["PERSONAL_LOAN", "HOME_LOAN", "CAR_LOAN", "SME_LOAN", "INSTANT_LOAN"]);
exports.ProfessionType = zod_1.z.enum(["DOCTOR", "ENGINEER", "ARCHITECT", "ACCOUNTANT", "ARTIST", "TEACHER", "FREELANCER", "OTHER"]);
exports.PropertyType = zod_1.z.enum(["RESIDENTIAL", "COMMERCIAL", "LAND", "APARTMENT", "HOUSE", "OTHER"]);
exports.EmploymentStatus = zod_1.z.enum(["SALARIED", "SELF_EMPLOYED", "BUSINESS_OWNER"]);
exports.EmploymentType = zod_1.z.enum(["PERMANENT", "CONTRACTUAL", "PARTTIME", "PROBATION"]);
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
    adjustmentPlan: zod_1.z.string().min(1, "Adjustment plan is required"),
    disbursedAmount: zod_1.z.string().min(1, "Disbursed amount is required"),
    otherLoanType: zod_1.z.string().optional(),
    lenderName: zod_1.z.string().min(1, "Lender name is required"),
    outstanding: zod_1.z.string().min(1, "Outstanding is required"),
    emi: zod_1.z.string().min(1, "EMI is required"),
});
const PropertyItem = zod_1.z.object({
    propertyType: exports.PropertyType.optional(),
    propertyValue: zod_1.z.string().optional(),
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
    personalGuarantor: PersonalGuarantor.optional(),
    businessGuarantor: BusinessGuarantor.optional(),
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
exports.employmentInformationSchema = zod_1.z.object({
    employmentStatus: exports.EmploymentStatus,
    designation: zod_1.z.string().optional(),
    department: zod_1.z.string().optional(),
    employeeId: zod_1.z.string().optional(),
    employmentType: exports.EmploymentType.optional(),
    dateOfJoining: zod_1.z.string().optional(),
    organizationName: zod_1.z.string().optional(),
    organizationAddress: zod_1.z.string().optional(),
    serviceYears: zod_1.z.string().optional(),
    serviceMonths: zod_1.z.string().optional(),
    eTin: zod_1.z.string().optional(),
    officialContact: zod_1.z.string().optional(),
    hasPreviousOrganization: zod_1.z.boolean().optional(),
    previousOrganizationName: zod_1.z.string().optional(),
    previousDesignation: zod_1.z.string().optional(),
    previousServiceYears: zod_1.z.string().optional(),
    previousServiceMonths: zod_1.z.string().optional(),
    totalExperienceYears: zod_1.z.string().optional(),
    totalExperienceMonths: zod_1.z.string().optional(),
    // Business-related
    businessName: zod_1.z.string().optional(),
    businessAddress: zod_1.z.string().optional(),
    sharePortion: zod_1.z.string().optional(),
    businessRegistrationNumber: zod_1.z.string().optional(),
    tradeLicenseAge: zod_1.z.string().optional(),
    // Professional-related
    professionType: exports.ProfessionType.optional(),
    otherProfession: zod_1.z.string().optional(),
    professionalTitle: zod_1.z.string().optional(),
    institutionName: zod_1.z.string().optional(),
    workplaceAddress: zod_1.z.string().optional(),
    yearsOfExperience: zod_1.z.string().optional(),
    startedPracticeSince: zod_1.z.string().datetime().optional(),
    tin: zod_1.z.string().optional(),
    websitePortfolioLink: zod_1.z.string().optional(),
    professionalRegistrationNumber: zod_1.z.string().optional(),
    // Income
    grossMonthlyIncome: zod_1.z.string().min(1),
    rentIncome: zod_1.z.string().optional(),
    otherIncome: zod_1.z.string().optional(),
    sourceOfOtherIncome: zod_1.z.string().optional(),
    totalIncome: zod_1.z.string().min(1),
    // Property
    properties: zod_1.z.array(PropertyItem).optional(),
});
const ResidentialInformation = zod_1.z.object({
    presentAddress: zod_1.z
        .string()
        .min(5, { message: "Present address must be at least 5 characters long." }),
    presentDistrict: zod_1.z
        .string()
        .min(2, { message: "Present district is required." }),
    presentDivision: zod_1.z
        .string()
        .min(2, { message: "Present division is required." }),
    presentLengthOfStay: zod_1.z
        .string()
        .min(1, { message: "Length of stay must be specified." }),
    presentOwnershipStatus: exports.OwnershipStatus,
    presentPostalCode: zod_1.z.string(),
    presentThana: zod_1.z
        .string()
        .min(2, { message: "Present thana is required." }),
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
    fatherName: zod_1.z.string().min(1, "Father or Husband name is required"),
    motherName: zod_1.z.string().min(1, "Mother name is required"),
    spouseName: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().min(1, "Date of birth is required"),
    placeOfBirth: zod_1.z.string(),
    nationality: zod_1.z.string(),
    gender: exports.Gender,
    maritalStatus: exports.MaritalStatus,
    educationalLevel: exports.EduLavel,
    NIDNumber: zod_1.z.string(),
    passportNumber: zod_1.z.string().optional(),
    religion: exports.Religion,
    residentialStatus: exports.ResidentialStatus,
    mobileNumber: zod_1.z.string(),
    alternateMobileNumber: zod_1.z.string().optional(),
    emailAddress: zod_1.z.string().email(),
    socialMediaProfiles: zod_1.z.array(zod_1.z.string()),
});
// ── MAIN FORM SCHEMA ────────────────────────────────
exports.LoanApplicationFormSchema = zod_1.z.object({
    personalInfo: PersonalInfo.optional(),
    residentialInfo: ResidentialInformation.optional(),
    employmentInfo: exports.employmentInformationSchema.optional(),
    loanInfo: LoanInfo.optional(),
    loanRequest: LoanRequest.optional(),
    guarantorInfo: GuarantorInfo.optional(), // casing aligned to match frontend
});
