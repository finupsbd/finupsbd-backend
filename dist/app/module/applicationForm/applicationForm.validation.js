"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationValidationSchema = void 0;
const zod_1 = require("zod");
// Phone Number Validation
const PhoneNumberValidation = zod_1.z
    .string()
    .regex(/^\d{11}$/, 'Mobile number must be a valid 11 digit');
// Helper functions
const validatePhoneNumber = (val) => /^(?:\+88|88)?(01[3-9]\d{8})$/.test(val);
const validateNumberString = (val) => /^\d+$/.test(val);
// Enums with descriptions
const MaritalStatusEnum = zod_1.z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'], {
    errorMap: () => ({ message: 'Invalid marital status. Valid options: SINGLE, MARRIED, DIVORCED, WIDOWED' })
});
const LoanStatusEnum = zod_1.z.enum(['SUBMITTED', 'IN_PROCESS', 'PENDING', 'APPROVED', 'REJECTED'], {
    errorMap: () => ({ message: 'Invalid loan status' })
});
const DocumentTypeEnum = zod_1.z.enum([
    'PASSPORT',
    'ID_CARD',
    'INCOME_PROOF',
    'BANK_STATEMENT',
    'TIN_CERTIFICATE',
    'EMPLOYMENT_PROOF',
    'UTILITY_BILL',
    'PROPERTY_DOCUMENT',
    'ADDITIONAL'
], {
    errorMap: () => ({ message: 'Invalid document type' })
});
// Personal Info Schema
const PersonalInfoSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, 'Full name is required'),
    fathersName: zod_1.z.string().min(1, "Father's name is required"),
    mothersName: zod_1.z.string().min(1, "Mother's name is required"),
    spouseName: zod_1.z.string().min(1, "Spouse's name is required"),
    dateOfBirth: zod_1.z.string().min(1, 'Date of birth is required'),
    placeOfBirth: zod_1.z.string().min(1, 'Place of birth is required'),
    gender: zod_1.z.string().min(1, 'Gender is required'),
    maritalStatus: MaritalStatusEnum,
    nationalId: zod_1.z.string()
        .min(1, 'National ID is required')
        .regex(/^\d{10}$/, 'National ID must be 10 digits'),
    birthRegistration: zod_1.z.string()
        .min(1, 'Birth registration number is required').optional(),
    mobileNumber: zod_1.z.string()
        .min(1, 'Mobile number is required')
        .refine(validatePhoneNumber, 'Invalid phone number format'),
    alternateMobile: zod_1.z.string()
        .min(1, 'Alternate mobile number is required')
        .refine(validatePhoneNumber, 'Invalid phone number format'),
    email: zod_1.z.string().email('Invalid email format'),
    socialMedia: zod_1.z.string().min(1, 'Social media information is required')
});
// Residential Info Schema
const ResidentialInfoSchema = zod_1.z.object({
    permanentHouseNo: zod_1.z.string().min(1, 'House number is required'),
    permanentStreet: zod_1.z.string().min(1, 'Street information is required'),
    permanentArea: zod_1.z.string().min(1, 'Area information is required'),
    permanentCity: zod_1.z.string().min(1, 'City is required'),
    permanentDistrict: zod_1.z.string().min(1, 'District is required'),
    permanentPostalCode: zod_1.z.string().min(1, 'Postal code is required'),
    permanentStayLength: zod_1.z.string().min(1, 'Stay duration is required'),
    permanentOwnership: zod_1.z.string().min(1, 'Ownership information is required'),
    sameAsPermanent: zod_1.z.boolean(),
    presentHouseNo: zod_1.z.string().min(1, 'Present house number is required')
        .optional(),
    presentStreet: zod_1.z.string().min(1, 'Present street is required').optional(),
    presentArea: zod_1.z.string().min(1, 'Present area is required').optional(),
    presentCity: zod_1.z.string().min(1, 'Present city is required').optional(),
    presentDistrict: zod_1.z.string().min(1, 'Present district is required').optional(),
    presentPostalCode: zod_1.z.string().min(1, 'Present postal code is required').optional(),
    presentStayLength: zod_1.z.string().min(1, 'Present stay duration is required').optional(),
    presentOwnership: zod_1.z.string().min(1, 'Present ownership is required').optional(),
    propertyType: zod_1.z.string().min(1, 'Property type is required'),
    approximateValue: zod_1.z.string()
        .min(1, 'Approximate value is required')
        .refine(validateNumberString, 'Must be a valid number')
}).refine(data => !data.sameAsPermanent || (data.presentHouseNo &&
    data.presentStreet &&
    data.presentArea &&
    data.presentCity &&
    data.presentDistrict &&
    data.presentPostalCode &&
    data.presentStayLength &&
    data.presentOwnership), {
    message: 'Present address fields are required when different from permanent',
    path: ['sameAsPermanent']
});
// Employment Info Schema
const EmploymentInfoSchema = zod_1.z.object({
    employmentStatus: zod_1.z.string().min(1, 'Employment status is required'),
    jobTitle: zod_1.z.string().min(1, 'Job title is required'),
    employerName: zod_1.z.string().min(1, 'Employer name is required'),
    employerAddress: zod_1.z.string().min(1, 'Employer address is required'),
    employerDepartment: zod_1.z.string().min(1, 'Department is required'),
    employerContact: zod_1.z.string().min(1, 'Employer contact is required'),
    businessName: zod_1.z.string().min(1, 'Business name is required'),
    registrationNumber: zod_1.z.string().min(1, 'Registration number is required'),
    tenure: zod_1.z.string()
        .min(1, 'Tenure is required')
        .refine(validateNumberString, 'Must be a valid number'),
    monthlyIncome: zod_1.z.string()
        .min(1, 'Monthly income is required')
        .refine(validateNumberString, 'Must be a valid number'),
    otherIncome: zod_1.z.string()
        .min(1, 'Other income is required')
        .refine(validateNumberString, 'Must be a valid number'),
    householdExpenses: zod_1.z.string()
        .min(1, 'Household expenses are required')
        .refine(validateNumberString, 'Must be a valid number'),
    tin: zod_1.z.string()
        .min(1, 'TIN is required')
        .regex(/^\d{9}$/, 'TIN must be 9 digits'),
    creditScore: zod_1.z.string()
        .min(1, 'Credit score is required')
        .regex(/^[3-8]\d{2}$/, 'Credit score must be between 300-850')
});
// Loan Request Schema
const LoanRequestSchema = zod_1.z.object({
    loanType: zod_1.z.string().min(1, 'Loan type is required'),
    loanAmount: zod_1.z.string()
        .min(1, 'Loan amount is required')
        .refine(validateNumberString, 'Must be a valid number'),
    purpose: zod_1.z.string().min(1, 'Loan purpose is required'),
    tenure: zod_1.z.string()
        .min(1, 'Tenure is required')
        .refine(validateNumberString, 'Must be a valid number'),
    emiStartDate: zod_1.z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
    repaymentPreferences: zod_1.z.string().min(1, 'Repayment preference is required')
});
// Financial Obligation Schema
const FinancialObligationSchema = zod_1.z.object({
    lenderName: zod_1.z.string().min(1, 'Lender name is required'),
    loanBalance: zod_1.z.string()
        .min(1, 'Loan balance is required')
        .refine(validateNumberString, 'Must be a valid number'),
    monthlyEMI: zod_1.z.string()
        .min(1, 'Monthly EMI is required')
        .refine(validateNumberString, 'Must be a valid number'),
    remainingTenure: zod_1.z.string()
        .min(1, 'Remaining tenure is required')
        .refine(validateNumberString, 'Must be a valid number'),
    issuer: zod_1.z.string().min(1, 'Issuer is required'),
    currentBalance: zod_1.z.string()
        .min(1, 'Current balance is required')
        .refine(validateNumberString, 'Must be a valid number'),
    minimumPayment: zod_1.z.string()
        .min(1, 'Minimum payment is required')
        .refine(validateNumberString, 'Must be a valid number'),
    liabilityType: zod_1.z.string().min(1, 'Liability type is required'),
    liabilityBalance: zod_1.z.string()
        .min(1, 'Liability balance is required')
        .refine(validateNumberString, 'Must be a valid number'),
    liabilityEMI: zod_1.z.string()
        .min(1, 'Liability EMI is required')
        .refine(validateNumberString, 'Must be a valid number'),
    coApplicantName: zod_1.z.string().min(1, 'Co-applicant name is required'),
    coApplicantRelation: zod_1.z.string().min(1, 'Relationship is required'),
    coApplicantIncome: zod_1.z.string()
        .min(1, 'Co-applicant income is required')
        .refine(validateNumberString, 'Must be a valid number')
});
// Document Schema
const DocumentSchema = zod_1.z.object({
    type: DocumentTypeEnum,
    url: zod_1.z.string().url('Invalid document URL').min(1, 'Document URL is required')
});
// Guarantor Info Schema
const GuarantorInfoSchema = zod_1.z.object({
    // Personal Information
    personalfullName: zod_1.z.string().min(1, 'Full name is required'),
    personalfathersOrHusbandsName: zod_1.z.string().min(1, "Father's/Husband's name is required"),
    personalmothersName: zod_1.z.string().min(1, "Mother's name is required"),
    personaldateOfBirth: zod_1.z.coerce.date()
        .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), { message: 'Guarantor must be at least 18 years old' }),
    personalnationality: zod_1.z.string().min(1, 'Nationality is required'),
    personalnid: zod_1.z.string()
        .min(1, 'NID is required')
        .regex(/^\d{10}$/, 'NID must be 10 digits'),
    personalbirthRegistration: zod_1.z.string().optional(),
    personalmobileNumber: zod_1.z.string()
        .min(1, 'Mobile number is required')
        .refine(validatePhoneNumber, 'Invalid phone number format'),
    personalemailAddress: zod_1.z.string().email('Invalid email format'),
    personalrelationWithGuarantor: zod_1.z.string().min(1, 'Relationship is required'),
    personalpresentAddress: zod_1.z.string().min(1, 'Present address is required'),
    personalpermanentAndMailingAddress: zod_1.z.string().min(1, 'Permanent address is required'),
    personalworkAddress: zod_1.z.string().min(1, 'Work address is required'),
    personaladdress: zod_1.z.string().min(1, 'Address is required'),
    personalprofession: zod_1.z.string().min(1, 'Profession is required'),
    personalmonthlyIncome: zod_1.z.string()
        .min(1, 'Monthly income is required')
        .refine(validateNumberString, 'Must be a valid number'),
    personalemployer: zod_1.z.string().min(1, 'Employer is required'),
    // Business Information
    businessfullName: zod_1.z.string().min(1, 'Business name is required'),
    businessfathersOrHusbandsName: zod_1.z.string().min(1, "Father's/Husband's name is required"),
    businessmothersName: zod_1.z.string().min(1, "Mother's name is required"),
    businessdateOfBirth: zod_1.z.coerce.date()
        .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), { message: 'Guarantor must be at least 18 years old' }),
    businessnationality: zod_1.z.string().min(1, 'Nationality is required'),
    businessnid: zod_1.z.string()
        .min(1, 'NID is required')
        .regex(/^\d{10}$/, 'NID must be 10 digits'),
    businessbirthRegistration: zod_1.z.string().optional(),
    businessmobileNumber: zod_1.z.string()
        .min(1, 'Mobile number is required')
        .refine(validatePhoneNumber, 'Invalid phone number format'),
    businessemailAddress: zod_1.z.string().email('Invalid email format'),
    businessrelationWithGuarantor: zod_1.z.string().min(1, 'Relationship is required'),
    businesspresentAddress: zod_1.z.string().min(1, 'Present address is required'),
    businesspermanentAndMailingAddress: zod_1.z.string().min(1, 'Permanent address is required'),
    businessworkAddress: zod_1.z.string().min(1, 'Work address is required'),
    businessaddress: zod_1.z.string().min(1, 'Address is required'),
    businessprofession: zod_1.z.string().min(1, 'Profession is required'),
    businessmonthlyIncome: zod_1.z.string()
        .min(1, 'Monthly income is required')
        .refine(validateNumberString, 'Must be a valid number'),
    businessemployer: zod_1.z.string().min(1, 'Employer is required')
});
// Main Application Schema
const CreateApplicationValidationSchema = zod_1.z.object({
    adminNotes: zod_1.z.string().optional(),
    status: LoanStatusEnum.default('SUBMITTED'),
    personalInfo: PersonalInfoSchema,
    residentialInfo: ResidentialInfoSchema,
    employmentInfo: EmploymentInfoSchema,
    loanRequest: LoanRequestSchema,
    financialObligations: zod_1.z.array(FinancialObligationSchema)
        .min(1, 'At least one financial obligation is required'),
    documents: zod_1.z.array(DocumentSchema)
        .min(2, 'At least two documents are required')
        .refine(docs => docs.some(d => d.type === 'ID_CARD'), { message: 'At least one ID document is required' }),
    guarantorInfo: GuarantorInfoSchema,
    userId: zod_1.z.string().uuid('Invalid user ID format').optional()
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
