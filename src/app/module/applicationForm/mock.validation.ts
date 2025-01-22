import { z } from "zod";

const PersonalInformationSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    fatherName: z.string().min(1, "Father's/Husband's Name is required"),
    motherName: z.string().min(1, "Mother's Name is required"),
    spouseName: z.string().optional(),
    dateOfBirth: z.date().refine(date => date < new Date(), {
      message: "Date of Birth must be in the past",
    }),
    placeOfBirth: z.string().min(1, "Place of Birth is required"),
    maritalStatus: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    nid: z.string().min(10, "National ID Number (NID) is required"),
    birthRegistration: z.string().optional(),
    mobileNumber: z.string().regex(/^\+880\d{10}$/, "Mobile number must be in the format +880XXXXXXXXXX"),
    alternateNumber: z.string().optional(),
    emailAddress: z.string().email("Invalid email address"),
    socialMediaProfiles: z.array(z.string().url("Invalid URL")).optional(),
  });



  const ResidentialInformationSchema = z.object({
    permanentAddress: z.object({
      houseFlatNo: z.string().min(1, "House/Flat number is required"),
      streetRoad: z.string().min(1, "Street/Road is required"),
      areaLocality: z.string().min(1, "Area/Locality is required"),
      city: z.string().min(1, "City is required"),
      district: z.string().min(1, "District is required"),
      postalCode: z.string().regex(/^\d{4,6}$/, "Postal Code must be 4-6 digits"),
      ownershipStatus: z.enum(["OWNED", "RENTED", "LEASED", "OTHER"]),
      lengthOfStayYears: z.number().positive("Length of Stay must be a positive number"),
    }),
    currentAddress: z.object({
      houseFlatNo: z.string().optional(),
      streetRoad: z.string().optional(),
      areaLocality: z.string().optional(),
      city: z.string().optional(),
      district: z.string().optional(),
      postalCode: z.string().regex(/^\d{4,6}$/, "Postal Code must be 4-6 digits").optional(),
      ownershipStatus: z.enum(["OWNED", "RENTED", "LEASED", "OTHER"]).optional(),
      lengthOfStayYears: z.number().optional(),
    }).optional(),
    propertyDetails: z.object({
      typeOfProperty: z.enum(["RESIDENTIAL", "COMMERCIAL", "LAND"]),
      approximateValue: z.number().positive("Approximate Value must be a positive number"),
    }).optional(),
  });


  const EmploymentFinancialInformationSchema = z.object({
    employmentStatus: z.enum(["SALARIED", "SELF_EMPLOYED", "BUSINESS_OWNER", "UNEMPLOYED"]),
    jobTitle: z.string().optional(),
    employerName: z.string().optional(),
    department: z.string().optional(),
    officeAddress: z.string().optional(),
    contactDetails: z.string().optional(),
    businessName: z.string().optional(),
    businessRegistration: z.string().optional(),
    employmentTenure: z.number().optional(),
    monthlyGrossIncome: z.number().positive("Monthly Gross Income is required"),
    totalMonthlyExpenses: z.number().positive("Total Monthly Expenses are required"),
    otherIncomeSources: z.string().optional(),
    taxIdentificationNumber: z.string().optional(),
    creditScore: z.number().min(0).max(850).optional(),
  });


  const LoanRequestSchema = z.object({
    loanType: z.string().min(1, "Loan Type is required"),
    loanAmountRequested: z.number().positive("Loan Amount Requested is required"),
    loanPurpose: z.string().min(1, "Purpose of Loan is required"),
    loanTenure: z.number().positive("Preferred Loan Tenure is required"),
    proposedEMIStartDate: z.date().optional(),
    repaymentPreference: z.string().min(1, "Repayment Preferences is required"),
  });


  const ExistingFinancialObligationsSchema = z.object({
    existingLoans: z.array(
      z.object({
        lenderName: z.string().min(1, "Lender Name is required"),
        loanBalance: z.number().positive("Loan Balance is required"),
        monthlyEMI: z.number().positive("Monthly EMI is required"),
        remainingTenure: z.number().positive("Remaining Tenure is required"),
      })
    ).optional(),
    creditCards: z.array(
      z.object({
        cardIssuer: z.string().min(1, "Card Issuer is required"),
        currentBalance: z.number().positive("Current Balance is required"),
        minimumMonthlyPayment: z.number().positive("Minimum Monthly Payment is required"),
      })
    ).optional(),
    otherLiabilities: z.array(
      z.object({
        type: z.string().min(1, "Liability Type is required"),
        balance: z.number().positive("Balance is required"),
        emi: z.number().positive("EMI is required"),
      })
    ).optional(),
    coApplicants: z.array(
      z.object({
        fullName: z.string().min(1, "Full Name is required"),
        relationship: z.string().min(1, "Relationship is required"),
        employment: z.string().min(1, "Employment is required"),
        monthlyIncome: z.number().positive("Monthly Income is required"),
      })
    ).optional(),
  });
  

//   const DocumentUploadsSchema = z.array(
//     z.object({
//       documentType: z.enum([
//         "PASSPORT_PHOTO",
//         "NID",
//         "BIRTH_CERTIFICATE",
//         "PROOF_OF_INCOME",
//         "BANK_STATEMENTS",
//         "TIN_CERTIFICATE",
//         "PROOF_OF_EMPLOYMENT",
//         "UTILITY_BILL",
//         "PROPERTY_DOCUMENTS",
//         "ADDITIONAL_SUPPORTING_DOCUMENTS",
//       ]),
//       fileUrl: z.string().url("Invalid file URL"),
//     })
//   ).optional();


//   const ConsentDeclarationSchema = z.object({
//     consentGiven: z.boolean().refine(val => val === true, {
//       message: "You must provide your consent and authorization.",
//     }),
//     privacyAgreement: z.boolean().refine(val => val === true, {
//       message: "You must acknowledge the privacy agreement.",
//     }),
//     nonDisclosure: z.boolean().refine(val => val === true, {
//       message: "You must agree to the non-disclosure agreement.",
//     }),
//     declarationAccuracy: z.boolean().refine(val => val === true, {
//       message: "You must confirm the accuracy of your declaration.",
//     }),
//     digitalSignature: z.string().min(1, "Digital Signature is required"),
//     signatureDate: z.date().refine(date => date <= new Date(), {
//       message: "Signature Date cannot be in the future",
//     }),
//   });
  
//   const DataSecuritySchema = z.object({
//     encryptionStandards: z.boolean().refine(val => val === true, {
//       message: "You must agree to the encryption standards.",
//     }),
//     twoFactorAuth: z.boolean().refine(val => val === true, {
//       message: "You must enable two-factor authentication.",
//     }),
//     roleBasedAccess: z.boolean().refine(val => val === true, {
//       message: "You must agree to role-based access control.",
//     }),
//     dataRetentionPolicy: z.boolean().refine(val => val === true, {
//       message: "You must agree to the data retention policy.",
//     }),
//     withdrawalRights: z.boolean().refine(val => val === true, {
//       message: "You must acknowledge the right to withdraw or update information.",
//     }),
//   });




  const LoanApplicationSchema = z.object({
    personalInformation: PersonalInformationSchema,
    residentialInformation: ResidentialInformationSchema,
    employmentFinancialInformation: EmploymentFinancialInformationSchema,
    loanRequest: LoanRequestSchema,
    existingFinancialObligations: ExistingFinancialObligationsSchema,
    // documentUploads: DocumentUploadsSchema,
    // consentDeclaration: ConsentDeclarationSchema,
    // dataSecuritySchema: DataSecuritySchema, 
  });


  export const ApplicationFromValidation = {
    LoanApplicationSchema
  };
  