"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationFromValidation = void 0;
const zod_1 = require("zod");
const PersonalInformationSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, "Full Name is required"),
    fatherName: zod_1.z.string().min(1, "Father's/Husband's Name is required"),
    motherName: zod_1.z.string().min(1, "Mother's Name is required"),
    spouseName: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.date().refine(date => date < new Date(), {
        message: "Date of Birth must be in the past",
    }),
    placeOfBirth: zod_1.z.string().min(1, "Place of Birth is required"),
    maritalStatus: zod_1.z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]),
    gender: zod_1.z.enum(["MALE", "FEMALE", "OTHER"]),
    nid: zod_1.z.string().min(10, "National ID Number (NID) is required"),
    birthRegistration: zod_1.z.string().optional(),
    mobileNumber: zod_1.z.string().regex(/^\+880\d{10}$/, "Mobile number must be in the format +880XXXXXXXXXX"),
    alternateNumber: zod_1.z.string().optional(),
    emailAddress: zod_1.z.string().email("Invalid email address"),
    socialMediaProfiles: zod_1.z.array(zod_1.z.string().url("Invalid URL")).optional(),
});
const ResidentialInformationSchema = zod_1.z.object({
    permanentAddress: zod_1.z.object({
        houseFlatNo: zod_1.z.string().min(1, "House/Flat number is required"),
        streetRoad: zod_1.z.string().min(1, "Street/Road is required"),
        areaLocality: zod_1.z.string().min(1, "Area/Locality is required"),
        city: zod_1.z.string().min(1, "City is required"),
        district: zod_1.z.string().min(1, "District is required"),
        postalCode: zod_1.z.string().regex(/^\d{4,6}$/, "Postal Code must be 4-6 digits"),
        ownershipStatus: zod_1.z.enum(["OWNED", "RENTED", "LEASED", "OTHER"]),
        lengthOfStayYears: zod_1.z.number().positive("Length of Stay must be a positive number"),
    }),
    currentAddress: zod_1.z.object({
        houseFlatNo: zod_1.z.string().optional(),
        streetRoad: zod_1.z.string().optional(),
        areaLocality: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        district: zod_1.z.string().optional(),
        postalCode: zod_1.z.string().regex(/^\d{4,6}$/, "Postal Code must be 4-6 digits").optional(),
        ownershipStatus: zod_1.z.enum(["OWNED", "RENTED", "LEASED", "OTHER"]).optional(),
        lengthOfStayYears: zod_1.z.number().optional(),
    }).optional(),
    propertyDetails: zod_1.z.object({
        typeOfProperty: zod_1.z.enum(["RESIDENTIAL", "COMMERCIAL", "LAND"]),
        approximateValue: zod_1.z.number().positive("Approximate Value must be a positive number"),
    }).optional(),
});
const EmploymentFinancialInformationSchema = zod_1.z.object({
    employmentStatus: zod_1.z.enum(["SALARIED", "SELF_EMPLOYED", "BUSINESS_OWNER", "UNEMPLOYED"]),
    jobTitle: zod_1.z.string().optional(),
    employerName: zod_1.z.string().optional(),
    department: zod_1.z.string().optional(),
    officeAddress: zod_1.z.string().optional(),
    contactDetails: zod_1.z.string().optional(),
    businessName: zod_1.z.string().optional(),
    businessRegistration: zod_1.z.string().optional(),
    employmentTenure: zod_1.z.number().optional(),
    monthlyGrossIncome: zod_1.z.number().positive("Monthly Gross Income is required"),
    totalMonthlyExpenses: zod_1.z.number().positive("Total Monthly Expenses are required"),
    otherIncomeSources: zod_1.z.string().optional(),
    taxIdentificationNumber: zod_1.z.string().optional(),
    creditScore: zod_1.z.number().min(0).max(850).optional(),
});
const LoanRequestSchema = zod_1.z.object({
    loanType: zod_1.z.string().min(1, "Loan Type is required"),
    loanAmountRequested: zod_1.z.number().positive("Loan Amount Requested is required"),
    loanPurpose: zod_1.z.string().min(1, "Purpose of Loan is required"),
    loanTenure: zod_1.z.number().positive("Preferred Loan Tenure is required"),
    proposedEMIStartDate: zod_1.z.date().optional(),
    repaymentPreference: zod_1.z.string().min(1, "Repayment Preferences is required"),
});
const ExistingFinancialObligationsSchema = zod_1.z.object({
    existingLoans: zod_1.z.array(zod_1.z.object({
        lenderName: zod_1.z.string().min(1, "Lender Name is required"),
        loanBalance: zod_1.z.number().positive("Loan Balance is required"),
        monthlyEMI: zod_1.z.number().positive("Monthly EMI is required"),
        remainingTenure: zod_1.z.number().positive("Remaining Tenure is required"),
    })).optional(),
    creditCards: zod_1.z.array(zod_1.z.object({
        cardIssuer: zod_1.z.string().min(1, "Card Issuer is required"),
        currentBalance: zod_1.z.number().positive("Current Balance is required"),
        minimumMonthlyPayment: zod_1.z.number().positive("Minimum Monthly Payment is required"),
    })).optional(),
    otherLiabilities: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.string().min(1, "Liability Type is required"),
        balance: zod_1.z.number().positive("Balance is required"),
        emi: zod_1.z.number().positive("EMI is required"),
    })).optional(),
    coApplicants: zod_1.z.array(zod_1.z.object({
        fullName: zod_1.z.string().min(1, "Full Name is required"),
        relationship: zod_1.z.string().min(1, "Relationship is required"),
        employment: zod_1.z.string().min(1, "Employment is required"),
        monthlyIncome: zod_1.z.number().positive("Monthly Income is required"),
    })).optional(),
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
const LoanApplicationSchema = zod_1.z.object({
    personalInformation: PersonalInformationSchema,
    residentialInformation: ResidentialInformationSchema,
    employmentFinancialInformation: EmploymentFinancialInformationSchema,
    loanRequest: LoanRequestSchema,
    existingFinancialObligations: ExistingFinancialObligationsSchema,
    // documentUploads: DocumentUploadsSchema,
    // consentDeclaration: ConsentDeclarationSchema,
    // dataSecuritySchema: DataSecuritySchema, 
});
exports.ApplicationFromValidation = {
    LoanApplicationSchema
};
