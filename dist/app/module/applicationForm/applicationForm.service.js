"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationFromService = void 0;
const app_1 = require("../../../app");
const generateApplicationId_1 = require("../../utils/generateApplicationId");
const loanApplicationDocumentUpload_1 = __importDefault(require("../../utils/loanApplicationDocumentUpload"));
// const createApplicationForm = async (
//   payload: TFullApplicationForm,
//   user: TMiddlewareUser
// ) => {
//   payload.userId = user.userId;
//   payload.applicationId = (await generateApplicationId()) as string;
//   const existingForm = await prisma.applicationForm.findUnique({
//     where: { applicationId: payload.applicationId },
//   });
//   if (existingForm) {
//     throw new AppError(
//       StatusCodes.BAD_GATEWAY,
//       `ApplicationForm with ID ${payload.applicationId} already exists.`
//     );
//   }
//   const result = await prisma.applicationForm.create({
//     data: {
//       applicationId: payload.applicationId,
//       userId: payload.userId,
//       personalLoanId: payload.personalLoanId,
//       userInfo: {
//         create: payload.userInfo,
//       },
//       address: {
//         create: payload.address,
//       },
//       employmentFinancialInfo: {
//         create: payload.employmentFinancialInfo,
//       },
//       loanSpecifications: {
//         create: payload.loanSpecifications,
//       },
//       financialObligations: {
//         createMany: { data: payload.financialObligations },
//       },
//       uploadedDocuments: {
//         createMany: {
//           data: payload.uploadedDocuments.map((doc) => ({
//             type: doc.type,
//             filePath: doc.filePath,
//             fileSizeMB: doc.fileSizeMB,
//             fileType: doc.fileType,
//           })),
//         },
//       },
//     },
//     include:{
//       User: true,
//       personalLoan: true
//     }
//   });
//   return result;
// };
//// current word
const createApplicationForm = (payload, user, files) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const cloudinaryResults = [];
    const filesObj = files;
    const filesArray = Object.values(filesObj).flat();
    for (const file of filesArray) {
        const uploaded = yield (0, loanApplicationDocumentUpload_1.default)(file.buffer, file.originalname, file.mimetype);
        cloudinaryResults.push({
            url: uploaded.secure_url,
            originalName: file.originalname,
            mimeType: file.mimetype,
        });
    }
    console.log({ cloudinaryResults });
    const applicationId = yield (0, generateApplicationId_1.generateApplicationId)();
    // const existingForm = await prisma.loanApplicationForm.findUnique({
    //   where: { applicationId: payload.applicationId },
    // });
    // if (existingForm) {
    //   throw new AppError(
    //     StatusCodes.BAD_GATEWAY,
    //     `ApplicationForm with ID ${payload.applicationId} already exists.`
    //   );
    // }
    const result = yield app_1.prisma.loanApplicationForm.create({
        data: {
            applicationId,
            userId: user.userId,
            personalInfo: {
                create: payload.personalInfo
            },
            residentialInformation: {
                create: payload.residentialInformation
            },
            employmentInformation: {
                create: payload.employmentInformation
            },
            loanInfo: {
                create: {
                    hasCreditCard: (_b = (_a = payload === null || payload === void 0 ? void 0 : payload.loanInfo) === null || _a === void 0 ? void 0 : _a.hasCreditCard) !== null && _b !== void 0 ? _b : false,
                    hasExistingLoan: (_d = (_c = payload === null || payload === void 0 ? void 0 : payload.loanInfo) === null || _c === void 0 ? void 0 : _c.hasExistingLoan) !== null && _d !== void 0 ? _d : false,
                    bankAccounts: {
                        create: (_e = payload === null || payload === void 0 ? void 0 : payload.loanInfo) === null || _e === void 0 ? void 0 : _e.bankAccounts
                    },
                    creditCards: {
                        create: (_f = payload === null || payload === void 0 ? void 0 : payload.loanInfo) === null || _f === void 0 ? void 0 : _f.creditCards
                    },
                    existingLoans: {
                        create: (_g = payload === null || payload === void 0 ? void 0 : payload.loanInfo) === null || _g === void 0 ? void 0 : _g.existingLoans
                    }
                }
            },
            loanRequest: {
                create: payload.loanRequest
            },
            GuarantorInfo: {
                create: {
                    personalGuarantor: {
                        create: (_h = payload === null || payload === void 0 ? void 0 : payload.GuarantorInfo) === null || _h === void 0 ? void 0 : _h.personalGuarantor
                    },
                    businessGuarantor: {
                        create: (_j = payload === null || payload === void 0 ? void 0 : payload.GuarantorInfo) === null || _j === void 0 ? void 0 : _j.businessGuarantor
                    }
                }
            },
            Document: {
                create: cloudinaryResults.map(doc => ({
                    url: doc.url,
                    originalName: doc.originalName,
                    mimeType: doc.mimeType
                }))
            },
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true
                }
            },
            GuarantorInfo: {
                include: {
                    personalGuarantor: {
                        select: {
                            emailAddress: true,
                            mobileNumber: true
                        }
                    },
                    businessGuarantor: {
                        select: {
                            emailAddress: true,
                            mobileNumber: true
                        }
                    }
                }
            }
        }
    });
    return result;
});
// const getAllApplicationForm = async () => {
//   const result = await prisma.loanApplicationForm.findMany({
//     include: {
//       personalInfo: true,
//       residentialInfo: true,
//       employmentInfo: true,
//       loanRequest: true,
//       financialObligations: true,
//       documents: true,
//       guarantorInfo: true,
//       user: {
//         select: {
//           id: true,
//           name: true,
//           email: true,
//           phone: true,
//           userId: true,
//           role: true,
//           profile: true,
//         },
//       },
//   }})
//   return result;
// };
// const updateStatus = async (id: string, payload: {status: LoanStatus, adminNotes: string}) => {
// console.log(payload)
//   const result = await prisma.loanApplicationForm.update({
//     where: {id}, 
//     data: {
//       status: payload.status, 
//       adminNotes: payload.adminNotes,
//     },
//     include: {
//       user: true
//     }
//   })
//   return result;
// }
// const getSingleApplication = async (id: string) => {
//   const result = await prisma.loanApplicationForm.findFirst({
//     where: {id}, 
//     include: {
//       personalInfo: true,
//       residentialInfo: true,
//       employmentInfo: true,
//       loanRequest: true,
//       financialObligations: true,
//       documents: true,
//       guarantorInfo: true,
//       user: {
//         select: {
//           id: true,
//           name: true,
//           email: true,
//           phone: true,
//           userId: true,
//           role: true,
//           profile: true,
//         },
//       },
//   }
//   })
//   return result;
// }
// const applicationTracking = async (payload: {
//   applicationId: string;
//   phone: string;
// }) => {
//   console.log(payload);
//   const result = await prisma.loanApplicationForm.findFirst({
//     where: {
//       applicationId: payload.applicationId,
//       user: {
//         phone: payload.phone,
//       },
//     },
//     select: {
//       status: true,
//       adminNotes: true,
//       applicationId: true,
//       loanRequest: true, 
//       user: {
//         select: {
//           name: true,
//           userId: true,
//           profile: true,
//         },
//       },
//     },
//   });
//   if (!result) {
//     throw new AppError(
//       404,
//       'Application not found please enter valid Phone and Application ID'
//     );
//   }
//   return result;
// };
// const applicationForget = async (payload: { email: string; phone: string }) => {
//   const result = await prisma.user.findFirst({
//     where: {
//       phone: payload.phone,
//     },
//     include: {
//       ApplicationForm: {
//         select: {
//           applicationId: true,
//           loanSpecifications: {
//             select: {
//               loanType: true,
//             },
//           },
//         },
//       },
//     },
//   });
//   if (
//     !result ||
//     !result.ApplicationForm ||
//     result.ApplicationForm.length === 0
//   ) {
//     throw new AppError(404, 'No application found for this user.');
//   }
//   // Prepare application details for email
//   const applications = result.ApplicationForm.map((app) => ({
//     applicationId: app.applicationId,
//     loanType: app.loanSpecifications?.loanType || 'Unknown',
//   }));
//   const applicationDetails = applications
//     .map(
//       (app) =>
//         `<li><strong>Application ID:</strong> ${app.applicationId}, <strong>Loan Type:</strong> ${app.loanType}</li>`
//     )
//     .join('');
//   console.log(applicationDetails);
//   const subject = 'Your Application ID';
//   const html = `
//   <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
//     <div style="text-align: center; background-color: #28a745; color: #ffffff; padding: 15px 0; border-radius: 8px 8px 0 0;">
//       <h2 style="margin: 0; font-size: 20px;">FinupsBD</h2>
//       <p style="margin: 0; font-size: 14px;">Helping you achieve your financial goals</p>
//     </div>
//     <p style="font-size: 16px; font-weight: bold; color: #444;">Dear ${result?.name},</p>
//     <p style="font-size: 14px; color: #555;">
//       Thank you for submitting your application. We have successfully received your details, and they are now under review. Below are the details of your application:
//     </p>
//     <ul style="font-size: 14px; color: #444; padding-left: 20px; list-style-type: disc;">
//       ${applicationDetails}
//     </ul>
//     <p style="font-size: 14px; color: #555;">
//       If you have any questions or need further assistance, please don't hesitate to contact our support team at 
//       <a href="mailto:finupsbd@gmail.com" style="color: #28a745; text-decoration: underline; font-weight: bold;">finupsbd@gmail.com</a>.
//     </p>
//     <p style="font-size: 14px; color: #555;">
//       We appreciate your trust in us and look forward to serving you.
//     </p>
//     <p style="font-size: 14px; color: #555;">Best regards,</p>
//     <p style="font-size: 16px; font-weight: bold; color: #28a745;">FinupsBD Team</p>
//     <footer style="margin-top: 20px; background-color: #f4f4f4; padding: 10px; border-radius: 8px; text-align: center; font-size: 12px; color: #777;">
//       <p style="margin: 0;">© 2025 FinupsBD. All rights reserved.</p>
//     </footer>
//   </div>
// `;
//   await sendEmail(result.email, subject, html);
//   const maskedPhoneNumber = maskMobileNumber(result.phone)
//   const userEmail = result.email
//   // const maskedEmailAddress =  maskMobileNumber(result.email)
//   return {
//     maskedPhoneNumber,
//     userEmail
//   };
// };
// payload.applicationId = await generateApplicationId();
// const existingForm = await prisma.loanApplicationForm.findUnique({
//   where: { applicationId: payload.applicationId },
// });
// if (existingForm) {
//   throw new AppError(
//     StatusCodes.BAD_GATEWAY,
//     `ApplicationForm with ID ${payload.applicationId} already exists.`
//   );
// }
exports.ApplicationFromService = {
    createApplicationForm,
    // getAllApplicationForm,
    // updateStatus, 
    // getSingleApplication,  
    // applicationTracking,
    // applicationForget, 
};
