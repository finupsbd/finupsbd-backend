// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { z } from 'zod';


// // Enums
// const Status = z.enum(['PENDING', 'IN_PROGRESS', 'APPROVE', 'REJECT']);
// const Gender = z.enum(['MALE', 'FEMALE', 'OTHER']);
// const MaritalStatus = z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']);
// const OwnershipStatus = z.enum(['OWNED', 'RENTED', 'OTHER']);
// const PropertyType = z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND']);
// const EmploymentStatus = z.enum([
//   'SALARIED',
//   'SELF_EMPLOYED',
//   'BUSINESS_OWNER',
//   'UNEMPLOYED',
// ]);

// // Advanced validations for Address
// const AddressSchema = z.object({
//   id: z.number().optional(),
//   houseFlatNo: z
//     .string()
//     .min(1, 'House/Flat No. is required')
//     .max(10, 'House/Flat No. too long'),
//   streetRoad: z.string().min(1, 'Street/Road is required').max(50),
//   areaLocality: z.string().min(1).max(50),
//   city: z.string().min(1).max(50),
//   district: z.string().min(1).max(50),
//   postalCode: z
//     .string()
//     .regex(/^\d{5,6}$/, 'Postal code must be 5 or 6 digits'),
//   ownershipStatus: OwnershipStatus,
//   lengthOfStayYears: z
//     .number()
//     .int()
//     .nonnegative()
//     .max(100, 'Invalid stay duration'),
// });

// // PropertyDetails with advanced validations
// const PropertyDetailsSchema = z.object({
//   id: z.number().optional(),
//   typeOfProperty: PropertyType,
//   approximateValue: z
//     .number()
//     .positive('Approximate value must be greater than zero')
//     .lte(1_000_000_000, 'Approximate value cannot exceed 1 billion'),
// });



// // EmploymentFinancialInfo with refinements and custom validations
// const EmploymentFinancialInfoSchema = z
//   .object({
//     id: z.number().optional(),
//     employmentStatus: EmploymentStatus,
//     jobTitle: z
//       .string()
//       .min(1, 'Job title is required for salaried employees')
//       .optional(),
//     employerName: z.string().min(1, 'Employer name is required').optional(),
//     businessName: z.string().optional(),
//     businessRegistrationNumber: z.string().optional(),
//     monthlyGrossIncome: z
//       .number()
//       .positive('Gross income must be greater than zero')
//       .min(5000, "Monthly income must be at least 5000"),
//     totalMonthlyExpenses: z
//       .number()
//       .positive('Monthly expenses must be greater than zero'),
//     taxIdentificationNumber: z
//       .string()
//       .regex(/^[A-Z0-9]{10,15}$/, 'Invalid tax ID')
//       .optional(),
//     currentCreditScore: z.number().min(300).max(850).optional(),
//     userId: z.string(),
//   })
//   .superRefine((data, ctx) => {
//     if (data.totalMonthlyExpenses > data.monthlyGrossIncome) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Monthly expenses cannot exceed gross income",
//         path: ["totalMonthlyExpenses"], // Points to the specific field
//       });
//     }
  
//     if (
//       data.employmentStatus === "BUSINESS_OWNER" &&
//       (!data.businessName || !data.businessRegistrationNumber)
//     ) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Business name and registration number are required for business owners",
//         path: ["businessName"], // Example for pointing to the business name
//       });
//     }

//     if (
//       data.employmentStatus === "UNEMPLOYED") {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "You are not eligible lone",
//         path: ["businessName"], // Example for pointing to the business name
//       });
//     }

//   });



// // LoanApplication with date and range checks
// const LoanApplicationSchema = z.object({
//   id: z.string().optional(),
//   loanType: z.string().min(1, 'Loan type is required'),
//   loanAmountRequested: z
//     .number()
//     .positive('Loan amount must be greater than zero')
//     .lte(1_000_000_000),
//   purposeOfLoan: z.string().min(1, 'Purpose of loan is required'),
//   preferredLoanTenure: z
//     .number()
//     .int()
//     .positive('Loan tenure must be a positive integer')
//     .lte(360),
//   proposedEMIStartDate: z.date().refine((date) => date > new Date(), {
//     message: 'EMI start date must be in the future',
//   }),
//   repaymentPreferences: z.string(),
// });

// // ExistingLoan validation with linked fields
// const ExistingLoanSchema = z.object({
//   id: z.string().optional(),
//   lenderName: z.string().min(1, 'Lender name is required'),
//   loanBalance: z.number().nonnegative(),
//   monthlyEMI: z.number().nonnegative(),
//   remainingTenure: z.number().int().nonnegative(),
//   loanApplicationId: z.number(),
// });

// // CreditCard Schema
// const CreditCardSchema = z.object({
//   id: z.string().optional(),
//   cardIssuer: z.string().min(1, 'Card issuer is required'),
//   currentBalance: z.number().nonnegative(),
//   minimumMonthlyPayment: z.number().nonnegative(),
// });

// // Liability Schema
// const LiabilitySchema = z.object({
//   id: z.string().optional(),
//   type: z.string().min(1, 'Liability type is required'),
//   balance: z.number().nonnegative(),
//   emi: z.number().nonnegative(),
// });

// // CoApplicant Schema
// const CoApplicantSchema = z.object({
//   id: z.string().optional(),
//   fullName: z.string().min(1, 'Co-applicant name is required'),
//   relationship: z.string().min(1, 'Relationship is required'),
//   employment: z.string().min(1, 'Employment status is required'),
//   monthlyIncome: z.number().nonnegative(),
// });

// // Advanced ApplicationForm Schema
// const applicationFormValidationSchema = z.object({
//   id: z.string().uuid().optional(),
//   applicationId: z.string().default('0'),
//   fullName: z.string().min(1, 'Full name is required'),
//   fatherName: z.string().min(1, "Father's name is required"),
//   motherName: z.string().min(1, "Mother's name is required"),
//   spouseName: z.string().optional(),
//   dateOfBirth: z
//     .date()
//     .refine((dob) => new Date().getFullYear() - dob.getFullYear() >= 18, {
//       message: 'Applicant must be at least 18 years old',
//     }),
//   placeOfBirth: z.string().min(1, 'Place of birth is required'),
//   gender: Gender.optional(),
//   maritalStatus: MaritalStatus,
//   nid: z.string().min(10, 'NID must be at least 10 characters'),
//   birthRegistration: z.string().optional(),
//   mobileNumber: z.string().regex(/^\+?[0-9]{10,15}$/, 'Invalid mobile number'),
//   alternateNumber: z
//     .string()
//     .regex(/^\+?[0-9]{10,15}$/, 'Invalid alternate number')
//     .optional(),
//   emailAddress: z.string().email('Invalid email address'),
//   socialMediaLink: z.array(z.string().url()).optional(),
//   permanentAddress: AddressSchema.optional(),
//   currentResidentialAddress: AddressSchema.optional(),
//   propertyDetails: PropertyDetailsSchema.optional(),
//   employmentFinancialInfo: EmploymentFinancialInfoSchema,
//   loanRequest: LoanApplicationSchema,
//   existingLoans: z.array(ExistingLoanSchema).optional(),
//   creditCards: z.array(CreditCardSchema).optional(),
//   otherLiabilities: z.array(LiabilitySchema).optional(),
//   coApplicant: CoApplicantSchema.optional(),
//   status: Status.default('PENDING'),
//   createdAt: z.date().default(() => new Date()),
//   updatedAt: z.date().optional(),
// });

// export const ApplicationFromValidation = {
//   applicationFormValidationSchema,
// };
