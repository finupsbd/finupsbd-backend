import { z } from 'zod';

// Phone Number Validation
const PhoneNumberValidation = z
  .string()
  .regex(/^\d{11}$/, 'Mobile number must be a valid 11 digit');




  // Helper functions
  const validatePhoneNumber = (val: string) => /^(?:\+88|88)?(01[3-9]\d{8})$/.test(val);
  const validateNumberString = (val: string) => /^\d+$/.test(val);
  
  // Enums with descriptions
  const MaritalStatusEnum = z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'], {
    errorMap: () => ({ message: 'Invalid marital status. Valid options: SINGLE, MARRIED, DIVORCED, WIDOWED' })
  });
  
  const LoanStatusEnum = z.enum(['SUBMITTED', 'IN_PROCESS', 'PENDING', 'APPROVED', 'REJECTED'], {
    errorMap: () => ({ message: 'Invalid loan status' })
  });
  
  const DocumentTypeEnum = z.enum([
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
  const PersonalInfoSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    fathersName: z.string().min(1, "Father's name is required"),
    mothersName: z.string().min(1, "Mother's name is required"),
    spouseName: z.string().min(1, "Spouse's name is required"),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    placeOfBirth: z.string().min(1, 'Place of birth is required'),
    gender: z.string().min(1, 'Gender is required'),
    maritalStatus: MaritalStatusEnum,
    nationalId: z.string()
      .min(1, 'National ID is required')
      .regex(/^\d{10}$/, 'National ID must be 10 digits'),
    birthRegistration: z.string()
      .min(1, 'Birth registration number is required').optional(),
    mobileNumber: z.string()
      .min(1, 'Mobile number is required')
      .refine(validatePhoneNumber, 'Invalid phone number format'),
    alternateMobile: z.string()
      .min(1, 'Alternate mobile number is required')
      .refine(validatePhoneNumber, 'Invalid phone number format'),
    email: z.string().email('Invalid email format'),
    socialMedia: z.string().min(1, 'Social media information is required')
  });
  
  // Residential Info Schema
  const ResidentialInfoSchema = z.object({
    permanentHouseNo: z.string().min(1, 'House number is required'),
    permanentStreet: z.string().min(1, 'Street information is required'),
    permanentArea: z.string().min(1, 'Area information is required'),
    permanentCity: z.string().min(1, 'City is required'),
    permanentDistrict: z.string().min(1, 'District is required'),
    permanentPostalCode: z.string().min(1, 'Postal code is required'),
    permanentStayLength: z.string().min(1, 'Stay duration is required'),
    permanentOwnership: z.string().min(1, 'Ownership information is required'),
    sameAsPermanent: z.boolean(),
    presentHouseNo: z.string().min(1, 'Present house number is required')
      .optional(),
    presentStreet: z.string().min(1, 'Present street is required').optional(),
    presentArea: z.string().min(1, 'Present area is required').optional(),
    presentCity: z.string().min(1, 'Present city is required').optional(),
    presentDistrict: z.string().min(1, 'Present district is required').optional(),
    presentPostalCode: z.string().min(1, 'Present postal code is required').optional(),
    presentStayLength: z.string().min(1, 'Present stay duration is required').optional(),
    presentOwnership: z.string().min(1, 'Present ownership is required').optional(),
    propertyType: z.string().min(1, 'Property type is required'),
    approximateValue: z.string()
      .min(1, 'Approximate value is required')
      .refine(validateNumberString, 'Must be a valid number')
  }).refine(data => !data.sameAsPermanent || (
    data.presentHouseNo && 
    data.presentStreet && 
    data.presentArea &&
    data.presentCity &&
    data.presentDistrict &&
    data.presentPostalCode &&
    data.presentStayLength &&
    data.presentOwnership
  ), {
    message: 'Present address fields are required when different from permanent',
    path: ['sameAsPermanent']
  });
  
  // Employment Info Schema
  const EmploymentInfoSchema = z.object({
    employmentStatus: z.string().min(1, 'Employment status is required'),
    jobTitle: z.string().min(1, 'Job title is required'),
    employerName: z.string().min(1, 'Employer name is required'),
    employerAddress: z.string().min(1, 'Employer address is required'),
    employerDepartment: z.string().min(1, 'Department is required'),
    employerContact: z.string().min(1, 'Employer contact is required'),
    businessName: z.string().min(1, 'Business name is required'),
    registrationNumber: z.string().min(1, 'Registration number is required'),
    tenure: z.string()
      .min(1, 'Tenure is required')
      .refine(validateNumberString, 'Must be a valid number'),
    monthlyIncome: z.string()
      .min(1, 'Monthly income is required')
      .refine(validateNumberString, 'Must be a valid number'),
    otherIncome: z.string()
      .min(1, 'Other income is required')
      .refine(validateNumberString, 'Must be a valid number'),
    householdExpenses: z.string()
      .min(1, 'Household expenses are required')
      .refine(validateNumberString, 'Must be a valid number'),
    tin: z.string()
      .min(1, 'TIN is required')
      .regex(/^\d{9}$/, 'TIN must be 9 digits'),
    creditScore: z.string()
      .min(1, 'Credit score is required')
      .regex(/^[3-8]\d{2}$/, 'Credit score must be between 300-850')
  });
  
  // Loan Request Schema
  const LoanRequestSchema = z.object({
    loanType: z.string().min(1, 'Loan type is required'),
    loanAmount: z.string()
      .min(1, 'Loan amount is required')
      .refine(validateNumberString, 'Must be a valid number'),
    purpose: z.string().min(1, 'Loan purpose is required'),
    tenure: z.string()
      .min(1, 'Tenure is required')
      .refine(validateNumberString, 'Must be a valid number'),
    emiStartDate: z.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
    repaymentPreferences: z.string().min(1, 'Repayment preference is required')
  });
  
  // Financial Obligation Schema
  const FinancialObligationSchema = z.object({
    lenderName: z.string().min(1, 'Lender name is required'),
    loanBalance: z.string()
      .min(1, 'Loan balance is required')
      .refine(validateNumberString, 'Must be a valid number'),
    monthlyEMI: z.string()
      .min(1, 'Monthly EMI is required')
      .refine(validateNumberString, 'Must be a valid number'),
    remainingTenure: z.string()
      .min(1, 'Remaining tenure is required')
      .refine(validateNumberString, 'Must be a valid number'),
    issuer: z.string().min(1, 'Issuer is required'),
    currentBalance: z.string()
      .min(1, 'Current balance is required')
      .refine(validateNumberString, 'Must be a valid number'),
    minimumPayment: z.string()
      .min(1, 'Minimum payment is required')
      .refine(validateNumberString, 'Must be a valid number'),
    liabilityType: z.string().min(1, 'Liability type is required'),
    liabilityBalance: z.string()
      .min(1, 'Liability balance is required')
      .refine(validateNumberString, 'Must be a valid number'),
    liabilityEMI: z.string()
      .min(1, 'Liability EMI is required')
      .refine(validateNumberString, 'Must be a valid number'),
    coApplicantName: z.string().min(1, 'Co-applicant name is required'),
    coApplicantRelation: z.string().min(1, 'Relationship is required'),
    coApplicantIncome: z.string()
      .min(1, 'Co-applicant income is required')
      .refine(validateNumberString, 'Must be a valid number')
  });
  
  // Document Schema
  const DocumentSchema = z.object({
    type: DocumentTypeEnum,
    url: z.string().url('Invalid document URL').min(1, 'Document URL is required')
  });
  
  // Guarantor Info Schema
  const GuarantorInfoSchema = z.object({
    // Personal Information
    personalfullName: z.string().min(1, 'Full name is required'),
    personalfathersOrHusbandsName: z.string().min(1, "Father's/Husband's name is required"),
    personalmothersName: z.string().min(1, "Mother's name is required"),
    personaldateOfBirth: z.coerce.date()
      .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), 
      { message: 'Guarantor must be at least 18 years old' }),
    personalnationality: z.string().min(1, 'Nationality is required'),
    personalnid: z.string()
      .min(1, 'NID is required')
      .regex(/^\d{10}$/, 'NID must be 10 digits'),
    personalbirthRegistration: z.string().optional(),
    personalmobileNumber: z.string()
      .min(1, 'Mobile number is required')
      .refine(validatePhoneNumber, 'Invalid phone number format'),
    personalemailAddress: z.string().email('Invalid email format'),
    personalrelationWithGuarantor: z.string().min(1, 'Relationship is required'),
    personalpresentAddress: z.string().min(1, 'Present address is required'),
    personalpermanentAndMailingAddress: z.string().min(1, 'Permanent address is required'),
    personalworkAddress: z.string().min(1, 'Work address is required'),
    personaladdress: z.string().min(1, 'Address is required'),
    personalprofession: z.string().min(1, 'Profession is required'),
    personalmonthlyIncome: z.string()
      .min(1, 'Monthly income is required')
      .refine(validateNumberString, 'Must be a valid number'),
    personalemployer: z.string().min(1, 'Employer is required'),
  
    // Business Information
    businessfullName: z.string().min(1, 'Business name is required'),
    businessfathersOrHusbandsName: z.string().min(1, "Father's/Husband's name is required"),
    businessmothersName: z.string().min(1, "Mother's name is required"),
    businessdateOfBirth: z.coerce.date()
      .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), 
      { message: 'Guarantor must be at least 18 years old' }),
    businessnationality: z.string().min(1, 'Nationality is required'),
    businessnid: z.string()
      .min(1, 'NID is required')
      .regex(/^\d{10}$/, 'NID must be 10 digits'),
    businessbirthRegistration: z.string().optional(),
    businessmobileNumber: z.string()
      .min(1, 'Mobile number is required')
      .refine(validatePhoneNumber, 'Invalid phone number format'),
    businessemailAddress: z.string().email('Invalid email format'),
    businessrelationWithGuarantor: z.string().min(1, 'Relationship is required'),
    businesspresentAddress: z.string().min(1, 'Present address is required'),
    businesspermanentAndMailingAddress: z.string().min(1, 'Permanent address is required'),
    businessworkAddress: z.string().min(1, 'Work address is required'),
    businessaddress: z.string().min(1, 'Address is required'),
    businessprofession: z.string().min(1, 'Profession is required'),
    businessmonthlyIncome: z.string()
      .min(1, 'Monthly income is required')
      .refine(validateNumberString, 'Must be a valid number'),
    businessemployer: z.string().min(1, 'Employer is required')
  });
  



// Main Application Schema
const CreateApplicationValidationSchema = z.object({
  adminNotes: z.string().default('Waiting for admin review To process your application further if we need to verify your documents and information. Please wait for admin review.'),
  status: LoanStatusEnum.default('SUBMITTED'),
  personalInfo: PersonalInfoSchema,
  residentialInfo: ResidentialInfoSchema,
  employmentInfo: EmploymentInfoSchema,
  loanRequest: LoanRequestSchema,
  financialObligations: z.array(FinancialObligationSchema)
    .min(1, 'At least one financial obligation is required'),
  documents: z.array(DocumentSchema)
    .min(2, 'At least two documents are required')
    .refine(docs => docs.some(d => d.type === 'ID_CARD'), 
    { message: 'At least one ID document is required' }),
  guarantorInfo: GuarantorInfoSchema,
  userId: z.string().uuid('Invalid user ID format').optional()
});


const ApplicationTrackingValidation = z.object({
  applicationId: z.string().min(1, 'Application ID is required'),
  phone: PhoneNumberValidation,
});

const ApplicationForgetValidation = z.object({
  email: z.string().email().min(1, 'Email is required').optional(),
  phone: PhoneNumberValidation,
});

const ApplicationStatusUpdateValidation = z.object({
  status: LoanStatusEnum,
  adminNotes: z.string().optional(),
})


export const ApplicationValidationSchema = {
  CreateApplicationValidationSchema,
  ApplicationTrackingValidation,
  ApplicationForgetValidation,
  ApplicationStatusUpdateValidation
};
