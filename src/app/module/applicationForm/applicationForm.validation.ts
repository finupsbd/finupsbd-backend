
import { z } from 'zod';

// Enums
export const StatusEnum = z.enum(['PENDING', 'IN_PROGRESS', 'APPROVE', 'REJECT'], {
  errorMap: () => ({
    message: 'Status must be one of: PENDING, IN_PROGRESS, APPROVE, or REJECT',
  }),
});

export const PropertyTypeEnum = z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND'], {
  errorMap: () => ({
    message: 'Property Type must be one of: RESIDENTIAL, COMMERCIAL, or LAND',
  }),
});

export const GenderEnum = z.enum(['MALE', 'FEMALE', 'OTHER'], {
  errorMap: () => ({
    message: 'Gender must be one of: MALE, FEMALE, or OTHER',
  }),
});

export const MaritalStatusEnum = z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'], {
  errorMap: () => ({
    message: 'Marital Status must be one of: SINGLE, MARRIED, DIVORCED, or WIDOWED',
  }),
});

export const OwnershipStatusEnum = z.enum(['OWNED', 'RENTED', 'OTHER'], {
  errorMap: () => ({
    message: 'Ownership Status must be one of: OWNED, RENTED, or OTHER',
  }),
});

export const EmploymentStatusEnum = z.enum(
  ['SALARIED', 'SELF_EMPLOYED', 'BUSINESS_OWNER', 'UNEMPLOYED'],
  {
    errorMap: () => ({
      message: 'Employment Status must be one of: SALARIED, SELF_EMPLOYED, BUSINESS_OWNER, or UNEMPLOYED',
    }),
  }
);

export const LoanTypeEnum = z.enum(['PERSONAL', 'HOME', 'CAR'], {
  errorMap: () => ({
    message: 'Loan Type must be one of: PERSONAL, HOME, or CAR',
  }),
});

export const DocumentTypeEnum = z.enum(['PASSPORT_PHOTO', 'NATIONAL_ID'], {
  errorMap: () => ({
    message: 'Document type must be either PASSPORT_PHOTO or NATIONAL_ID',
  }),
});

// Phone Number Validation
const PhoneNumberValidation = z.string().regex(/^\d{11}$/, 'Mobile number must be a valid 11 digit');

// User Info Schema
const UserInfoSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  fatherName: z.string().min(1, "Father's Name is required"),
  motherName: z.string().min(1, "Mother's Name is required"),
  spouseName: z.string().min(1, "Spouse's Name is required"),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  placeOfBirth: z.string().min(1, 'Place of Birth is required'),
  gender: GenderEnum,
  maritalStatus: MaritalStatusEnum,
  nid: z.string().min(10, 'NID must be at least 10 characters'),
  birthRegistration: z.string().nullable(),
  mobileNumber: PhoneNumberValidation,
  alternateNumber: PhoneNumberValidation.optional(),
  emailAddress: z.string().email('Invalid email address format'),
  socialMediaLinks: z
    .array(z.string().url('Each social media link must be a valid URL'))
    .optional(),
  propertyType: PropertyTypeEnum,
  approximateValue: z
    .number()
    .positive('Property value must be a positive number'),
});

// Address Schema
const AddressSchema = z.object({
  houseFlatNo: z.string().min(1, 'House/Flat Number is required'),
  streetRoad: z.string().min(1, 'Street/Road is required'),
  areaLocality: z.string().min(1, 'Area/Locality is required'),
  city: z.string().min(1, 'City is required'),
  district: z.string().min(1, 'District is required'),
  postalCode: z
    .string()
    .regex(/^\d{4,6}$/, 'Postal code must be 4 to 6 digits'),
  lengthOfStayYears: z
    .number()
    .int()
    .min(0, 'Length of stay must be a positive integer'),
  ownershipStatus: OwnershipStatusEnum,
});

// Employment and Financial Info Schema
const EmploymentFinancialInfoSchema = z.object({
  employmentStatus: EmploymentStatusEnum,
  jobTitle: z.string().min(1, 'Job Title is required').optional(),
  employerName: z.string().min(1, 'Employer Name is required').optional(),
  officeAddress: z.string().min(1, 'Office Address is required').optional(),
  department: z.string().min(1, 'Department is required').optional(),
  contactDetails: PhoneNumberValidation,
  businessName: z.string().optional(),
  businessRegistrationNumber: z.string().optional(),
  employmentTenureYears: z
    .number()
    .min(0, 'Employment tenure must be a positive number'),
  monthlyGrossIncome: z
    .number()
    .positive('Monthly gross income must be greater than zero'),
  otherSourcesOfIncome: z.string().optional(),
  totalMonthlyExpenses: z
    .number()
    .positive('Total monthly expenses must be greater than zero'),
  profession: z.string().min(1, 'Profession is required'),
  taxIdentificationNumber: z
    .string()
    .min(10, 'Tax Identification Number must be at least 10 characters'),
  currentCreditScore: z
    .number()
    .min(300)
    .max(850, 'Credit score must be between 300 and 850'),
});

// Loan Specifications Schema
const LoanSpecificationsSchema = z.object({
  loanType: LoanTypeEnum,
  loanAmountRequested: z
    .number()
    .positive('Loan amount must be greater than zero'),
  purposeOfLoan: z.string().min(1, 'Purpose of loan is required'),
  preferredLoanTenure: z
    .number()
    .positive('Preferred loan tenure must be greater than zero'),
  proposedEMIStartDate: z
    .string()
    .min(1, 'EMI start date must be in the future'),
  repaymentPreferences: z.string().min(1, 'Repayment preferences are required'),
});

// Financial Obligations Schema
const FinancialObligationsSchema = z.object({
  lenderName: z.string().min(1, 'Lender name is required'),
  loanBalance: z.number().min(0, 'Loan balance cannot be negative'),
  monthlyEMI: z.number().min(0, 'EMI cannot be negative'),
  remainingTenure: z
    .number()
    .int()
    .min(0, 'Remaining tenure must be a positive integer'),
  cardIssuer: z.string().min(1, 'Card issuer is required'),
  currentBalance: z.number().min(0, 'Current balance cannot be negative'),
  minimumMonthlyPayment: z
    .number()
    .min(0, 'Minimum monthly payment cannot be negative'),
  obligationType: z.string().min(1, 'Obligation type is required'),
  balance: z.number().min(0, 'Balance cannot be negative'),
  emi: z.number().min(0, 'EMI cannot be negative'),
});

// Uploaded Documents Schema
const UploadedDocumentsSchema = z.object({
  type: DocumentTypeEnum,
  filePath: z.string().min(1, 'File path is required'),
  fileSizeMB: z.number().positive('File size must be positive'),
  fileType: z.string().min(1, 'File type is required'),
});

// Main Application Schema
const CreateApplicationValidationSchema = z.object({
  personalLoanId: z.string().min(1, 'Personal loan ID is required').optional(), 
  userInfo: UserInfoSchema,
  currentAddress: AddressSchema.optional(),
  permanentAddress: AddressSchema.optional(),
  employmentFinancialInfo: EmploymentFinancialInfoSchema,
  loanSpecifications: LoanSpecificationsSchema,
  financialObligations: z.array(FinancialObligationsSchema),
  uploadedDocuments: z.array(UploadedDocumentsSchema),
});





  const ApplicationTrackingValidation = z.object({
    applicationId: z.string().min(1, 'Application ID is required'),
    phone: PhoneNumberValidation
  })

  const ApplicationForgetValidation = z.object({
    email: z.string().email().min(1, 'Email is required').optional(), 
    phone: PhoneNumberValidation
  })





export const ApplicationValidationSchema = {
  CreateApplicationValidationSchema,
  ApplicationTrackingValidation, 
  ApplicationForgetValidation
};




