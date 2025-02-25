"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationValidationSchema = exports.DocumentTypeEnum = exports.LoanTypeEnum = exports.EmploymentStatusEnum = exports.OwnershipStatusEnum = exports.MaritalStatusEnum = exports.GenderEnum = exports.PropertyTypeEnum = exports.StatusEnum = void 0;
const zod_1 = require("zod");
// Enums
exports.StatusEnum = zod_1.z.enum(['PENDING', 'IN_PROGRESS', 'APPROVE', 'REJECT'], {
    errorMap: () => ({
        message: 'Status must be one of: PENDING, IN_PROGRESS, APPROVE, or REJECT',
    }),
});
exports.PropertyTypeEnum = zod_1.z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND'], {
    errorMap: () => ({
        message: 'Property Type must be one of: RESIDENTIAL, COMMERCIAL, or LAND',
    }),
});
exports.GenderEnum = zod_1.z.enum(['MALE', 'FEMALE', 'OTHER'], {
    errorMap: () => ({
        message: 'Gender must be one of: MALE, FEMALE, or OTHER',
    }),
});
exports.MaritalStatusEnum = zod_1.z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'], {
    errorMap: () => ({
        message: 'Marital Status must be one of: SINGLE, MARRIED, DIVORCED, or WIDOWED',
    }),
});
exports.OwnershipStatusEnum = zod_1.z.enum(['OWNED', 'RENTED', 'OTHER'], {
    errorMap: () => ({
        message: 'Ownership Status must be one of: OWNED, RENTED, or OTHER',
    }),
});
exports.EmploymentStatusEnum = zod_1.z.enum(['SALARIED', 'SELF_EMPLOYED', 'BUSINESS_OWNER', 'UNEMPLOYED'], {
    errorMap: () => ({
        message: 'Employment Status must be one of: SALARIED, SELF_EMPLOYED, BUSINESS_OWNER, or UNEMPLOYED',
    }),
});
exports.LoanTypeEnum = zod_1.z.enum(['PERSONAL', 'HOME', 'CAR'], {
    errorMap: () => ({
        message: 'Loan Type must be one of: PERSONAL, HOME, or CAR',
    }),
});
exports.DocumentTypeEnum = zod_1.z.enum([
    'PASSPORT_PHOTO',
    'NATIONAL_ID',
    'BIRTH_CERTIFICATE',
    'INCOME_PROOF',
    'BANK_STATEMENT',
    'TIN_CERTIFICATE',
    'EMPLOYMENT_PROOF',
    'UTILITY_BILL',
    'PROPERTY_DOCUMENT',
    'SUPPORTING_DOCUMENT',
], {
    errorMap: () => ({
        message: 'Document type must be either PASSPORT_PHOTO or NATIONAL_ID',
    }),
});
// Phone Number Validation
const PhoneNumberValidation = zod_1.z
    .string()
    .regex(/^\d{11}$/, 'Mobile number must be a valid 11 digit');
// User Info Schema
const UserInfoSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, 'Full Name is required'),
    fatherName: zod_1.z.string().min(1, "Father's Name is required"),
    motherName: zod_1.z.string().min(1, "Mother's Name is required"),
    spouseName: zod_1.z.string().min(1, "Spouse's Name is required"),
    dateOfBirth: zod_1.z.string().min(1, 'Date of Birth is required'),
    placeOfBirth: zod_1.z.string().min(1, 'Place of Birth is required'),
    gender: exports.GenderEnum,
    maritalStatus: exports.MaritalStatusEnum,
    nid: zod_1.z.string().min(10, 'NID must be at least 10 characters'),
    birthRegistration: zod_1.z.string().nullable(),
    mobileNumber: PhoneNumberValidation,
    alternateNumber: PhoneNumberValidation.optional(),
    emailAddress: zod_1.z.string().email('Invalid email address format'),
    socialMediaLinks: zod_1.z
        .array(zod_1.z.string().url('Each social media link must be a valid URL'))
        .optional(),
    propertyType: exports.PropertyTypeEnum,
    approximateValue: zod_1.z
        .number()
        .positive('Property value must be a positive number'),
});
// Address Schema
const AddressSchema = zod_1.z.object({
    houseFlatNo: zod_1.z.string().min(1, 'House/Flat Number is required'),
    streetRoad: zod_1.z.string().min(1, 'Street/Road is required'),
    areaLocality: zod_1.z.string().min(1, 'Area/Locality is required'),
    city: zod_1.z.string().min(1, 'City is required'),
    district: zod_1.z.string().min(1, 'District is required'),
    postalCode: zod_1.z
        .string()
        .regex(/^\d{4,6}$/, 'Postal code must be 4 to 6 digits'),
    lengthOfStayYears: zod_1.z
        .number()
        .int()
        .min(0, 'Length of stay must be a positive integer'),
    ownershipStatus: exports.OwnershipStatusEnum,
});
// Employment and Financial Info Schema
const EmploymentFinancialInfoSchema = zod_1.z.object({
    employmentStatus: exports.EmploymentStatusEnum,
    jobTitle: zod_1.z.string().min(1, 'Job Title is required').optional(),
    employerName: zod_1.z.string().min(1, 'Employer Name is required').optional(),
    officeAddress: zod_1.z.string().min(1, 'Office Address is required').optional(),
    department: zod_1.z.string().min(1, 'Department is required').optional(),
    contactDetails: PhoneNumberValidation,
    businessName: zod_1.z.string().optional(),
    businessRegistrationNumber: zod_1.z.string().optional(),
    employmentTenureYears: zod_1.z
        .number()
        .min(0, 'Employment tenure must be a positive number'),
    monthlyGrossIncome: zod_1.z
        .number()
        .positive('Monthly gross income must be greater than zero'),
    otherSourcesOfIncome: zod_1.z.string().optional(),
    totalMonthlyExpenses: zod_1.z
        .number()
        .positive('Total monthly expenses must be greater than zero'),
    profession: zod_1.z.string().min(1, 'Profession is required'),
    taxIdentificationNumber: zod_1.z
        .string()
        .min(10, 'Tax Identification Number must be at least 10 characters'),
    currentCreditScore: zod_1.z
        .number()
        .min(300)
        .max(850, 'Credit score must be between 300 and 850'),
});
// Loan Specifications Schema
const LoanSpecificationsSchema = zod_1.z.object({
    loanType: exports.LoanTypeEnum,
    loanAmountRequested: zod_1.z
        .number()
        .positive('Loan amount must be greater than zero'),
    purposeOfLoan: zod_1.z.string().min(1, 'Purpose of loan is required'),
    preferredLoanTenure: zod_1.z
        .number()
        .positive('Preferred loan tenure must be greater than zero'),
    proposedEMIStartDate: zod_1.z
        .string()
        .min(1, 'EMI start date must be in the future'),
    repaymentPreferences: zod_1.z.string().min(1, 'Repayment preferences are required'),
});
// Financial Obligations Schema
const FinancialObligationsSchema = zod_1.z.object({
    lenderName: zod_1.z.string().min(1, 'Lender name is required'),
    loanBalance: zod_1.z.number().min(0, 'Loan balance cannot be negative'),
    monthlyEMI: zod_1.z.number().min(0, 'EMI cannot be negative'),
    remainingTenure: zod_1.z
        .number()
        .int()
        .min(0, 'Remaining tenure must be a positive integer'),
    cardIssuer: zod_1.z.string().min(1, 'Card issuer is required'),
    currentBalance: zod_1.z.number().min(0, 'Current balance cannot be negative'),
    minimumMonthlyPayment: zod_1.z
        .number()
        .min(0, 'Minimum monthly payment cannot be negative'),
    obligationType: zod_1.z.string().min(1, 'Obligation type is required'),
    balance: zod_1.z.number().min(0, 'Balance cannot be negative'),
    emi: zod_1.z.number().min(0, 'EMI cannot be negative'),
});
// Uploaded Documents Schema
const UploadedDocumentsSchema = zod_1.z.object({
    type: exports.DocumentTypeEnum,
    filePath: zod_1.z.string().min(1, 'File path is required'),
    fileSizeMB: zod_1.z.number().positive('File size must be positive'),
    fileType: zod_1.z.string().min(1, 'File type is required'),
});
// Main Application Schema
const CreateApplicationValidationSchema = zod_1.z.object({
    personalLoanId: zod_1.z.string().min(1, 'Personal loan ID is required').optional(),
    userInfo: UserInfoSchema,
    currentAddress: AddressSchema.optional(),
    permanentAddress: AddressSchema.optional(),
    employmentFinancialInfo: EmploymentFinancialInfoSchema,
    loanSpecifications: LoanSpecificationsSchema,
    financialObligations: zod_1.z.array(FinancialObligationsSchema),
    uploadedDocuments: zod_1.z.array(UploadedDocumentsSchema),
});
const ApplicationTrackingValidation = zod_1.z.object({
    applicationId: zod_1.z.string().min(1, 'Application ID is required'),
    phone: PhoneNumberValidation,
});
const ApplicationForgetValidation = zod_1.z.object({
    email: zod_1.z.string().email().min(1, 'Email is required').optional(),
    phone: PhoneNumberValidation,
});
exports.ApplicationValidationSchema = {
    CreateApplicationValidationSchema,
    ApplicationTrackingValidation,
    ApplicationForgetValidation,
};
