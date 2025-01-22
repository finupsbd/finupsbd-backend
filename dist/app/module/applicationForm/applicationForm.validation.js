"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationFromValidation = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const zod_1 = require("zod");
// Enums
const Status = zod_1.z.enum(['PENDING', 'IN_PROGRESS', 'APPROVE', 'REJECT']);
const Gender = zod_1.z.enum(['MALE', 'FEMALE', 'OTHER']);
const MaritalStatus = zod_1.z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']);
const OwnershipStatus = zod_1.z.enum(['OWNED', 'RENTED', 'OTHER']);
const PropertyType = zod_1.z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND']);
const EmploymentStatus = zod_1.z.enum([
    'SALARIED',
    'SELF_EMPLOYED',
    'BUSINESS_OWNER',
    'UNEMPLOYED',
]);
// Advanced validations for Address
const AddressSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    houseFlatNo: zod_1.z
        .string()
        .min(1, 'House/Flat No. is required')
        .max(10, 'House/Flat No. too long'),
    streetRoad: zod_1.z.string().min(1, 'Street/Road is required').max(50),
    areaLocality: zod_1.z.string().min(1).max(50),
    city: zod_1.z.string().min(1).max(50),
    district: zod_1.z.string().min(1).max(50),
    postalCode: zod_1.z
        .string()
        .regex(/^\d{5,6}$/, 'Postal code must be 5 or 6 digits'),
    ownershipStatus: OwnershipStatus,
    lengthOfStayYears: zod_1.z
        .number()
        .int()
        .nonnegative()
        .max(100, 'Invalid stay duration'),
});
// PropertyDetails with advanced validations
const PropertyDetailsSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    typeOfProperty: PropertyType,
    approximateValue: zod_1.z
        .number()
        .positive('Approximate value must be greater than zero')
        .lte(1000000000, 'Approximate value cannot exceed 1 billion'),
});
// EmploymentFinancialInfo with refinements and custom validations
const EmploymentFinancialInfoSchema = zod_1.z
    .object({
    id: zod_1.z.number().optional(),
    employmentStatus: EmploymentStatus,
    jobTitle: zod_1.z
        .string()
        .min(1, 'Job title is required for salaried employees')
        .optional(),
    employerName: zod_1.z.string().min(1, 'Employer name is required').optional(),
    businessName: zod_1.z.string().optional(),
    businessRegistrationNumber: zod_1.z.string().optional(),
    monthlyGrossIncome: zod_1.z
        .number()
        .positive('Gross income must be greater than zero')
        .min(5000, "Monthly income must be at least 5000"),
    totalMonthlyExpenses: zod_1.z
        .number()
        .positive('Monthly expenses must be greater than zero'),
    taxIdentificationNumber: zod_1.z
        .string()
        .regex(/^[A-Z0-9]{10,15}$/, 'Invalid tax ID')
        .optional(),
    currentCreditScore: zod_1.z.number().min(300).max(850).optional(),
    userId: zod_1.z.string(),
})
    .superRefine((data, ctx) => {
    if (data.totalMonthlyExpenses > data.monthlyGrossIncome) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Monthly expenses cannot exceed gross income",
            path: ["totalMonthlyExpenses"], // Points to the specific field
        });
    }
    if (data.employmentStatus === "BUSINESS_OWNER" &&
        (!data.businessName || !data.businessRegistrationNumber)) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Business name and registration number are required for business owners",
            path: ["businessName"], // Example for pointing to the business name
        });
    }
    if (data.employmentStatus === "UNEMPLOYED") {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "You are not eligible lone",
            path: ["businessName"], // Example for pointing to the business name
        });
    }
});
// LoanApplication with date and range checks
const LoanApplicationSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    loanType: zod_1.z.string().min(1, 'Loan type is required'),
    loanAmountRequested: zod_1.z
        .number()
        .positive('Loan amount must be greater than zero')
        .lte(1000000000),
    purposeOfLoan: zod_1.z.string().min(1, 'Purpose of loan is required'),
    preferredLoanTenure: zod_1.z
        .number()
        .int()
        .positive('Loan tenure must be a positive integer')
        .lte(360),
    proposedEMIStartDate: zod_1.z.date().refine((date) => date > new Date(), {
        message: 'EMI start date must be in the future',
    }),
    repaymentPreferences: zod_1.z.string(),
});
// ExistingLoan validation with linked fields
const ExistingLoanSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    lenderName: zod_1.z.string().min(1, 'Lender name is required'),
    loanBalance: zod_1.z.number().nonnegative(),
    monthlyEMI: zod_1.z.number().nonnegative(),
    remainingTenure: zod_1.z.number().int().nonnegative(),
    loanApplicationId: zod_1.z.number(),
});
// CreditCard Schema
const CreditCardSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    cardIssuer: zod_1.z.string().min(1, 'Card issuer is required'),
    currentBalance: zod_1.z.number().nonnegative(),
    minimumMonthlyPayment: zod_1.z.number().nonnegative(),
});
// Liability Schema
const LiabilitySchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    type: zod_1.z.string().min(1, 'Liability type is required'),
    balance: zod_1.z.number().nonnegative(),
    emi: zod_1.z.number().nonnegative(),
});
// CoApplicant Schema
const CoApplicantSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    fullName: zod_1.z.string().min(1, 'Co-applicant name is required'),
    relationship: zod_1.z.string().min(1, 'Relationship is required'),
    employment: zod_1.z.string().min(1, 'Employment status is required'),
    monthlyIncome: zod_1.z.number().nonnegative(),
});
// Advanced ApplicationForm Schema
const applicationFormValidationSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    applicationId: zod_1.z.string().default('0'),
    fullName: zod_1.z.string().min(1, 'Full name is required'),
    fatherName: zod_1.z.string().min(1, "Father's name is required"),
    motherName: zod_1.z.string().min(1, "Mother's name is required"),
    spouseName: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z
        .date()
        .refine((dob) => new Date().getFullYear() - dob.getFullYear() >= 18, {
        message: 'Applicant must be at least 18 years old',
    }),
    placeOfBirth: zod_1.z.string().min(1, 'Place of birth is required'),
    gender: Gender.optional(),
    maritalStatus: MaritalStatus,
    nid: zod_1.z.string().min(10, 'NID must be at least 10 characters'),
    birthRegistration: zod_1.z.string().optional(),
    mobileNumber: zod_1.z.string().regex(/^\+?[0-9]{10,15}$/, 'Invalid mobile number'),
    alternateNumber: zod_1.z
        .string()
        .regex(/^\+?[0-9]{10,15}$/, 'Invalid alternate number')
        .optional(),
    emailAddress: zod_1.z.string().email('Invalid email address'),
    socialMediaLink: zod_1.z.array(zod_1.z.string().url()).optional(),
    permanentAddress: AddressSchema.optional(),
    currentResidentialAddress: AddressSchema.optional(),
    propertyDetails: PropertyDetailsSchema.optional(),
    employmentFinancialInfo: EmploymentFinancialInfoSchema,
    loanRequest: LoanApplicationSchema,
    existingLoans: zod_1.z.array(ExistingLoanSchema).optional(),
    creditCards: zod_1.z.array(CreditCardSchema).optional(),
    otherLiabilities: zod_1.z.array(LiabilitySchema).optional(),
    coApplicant: CoApplicantSchema.optional(),
    status: Status.default('PENDING'),
    createdAt: zod_1.z.date().default(() => new Date()),
    updatedAt: zod_1.z.date().optional(),
});
exports.ApplicationFromValidation = {
    applicationFormValidationSchema,
};
