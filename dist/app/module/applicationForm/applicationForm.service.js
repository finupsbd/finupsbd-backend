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
/* eslint-disable @typescript-eslint/no-explicit-any */
const app_1 = require("../../../app");
const config_1 = require("../../../config");
const AppError_1 = __importDefault(require("../../error/AppError"));
const gurantor_1 = require("../../utils/email-template/gurantor");
const encryption_1 = require("../../utils/encryption");
const generateApplicationId_1 = require("../../utils/generateApplicationId");
const maskedMobileNumber_1 = __importDefault(require("../../utils/maskedMobileNumber"));
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const applicationForm_validation_1 = require("./applicationForm.validation");
const saveFileLoanApplication_1 = require("../../utils/file-uploads/saveFileLoanApplication");
///// old after terjaction
// const createApplicationForm = async (payload: TLoanApplicationForm, user: TMiddlewareUser, files: TUploadedFile[], loanRequest: TLoanRequest) => {
//   const cloudinaryResults: { url: any; originalName: string; mimeType: string; }[] = [];
//   const filesObj = files as unknown as { [fieldname: string]: Express.Multer.File[] };
//   const filesArray: Express.Multer.File[] = Object.values(filesObj).flat();
//   for (const file of filesArray) {
//     const uploaded = await uploadBufferToCloudinary(file.buffer, file.originalname, file.mimetype);
//     cloudinaryResults.push({
//       url: uploaded.secure_url,
//       originalName: file.originalname,
//       mimeType: file.mimetype,
//     });
//   }
//   const applicationId = await generateApplicationId();
//   const gurantorInfo = {
//     businessGurantorEmail: payload?.guarantorInfo?.businessGuarantor?.emailAddress ?? '',
//     businessGurantorPhone: payload?.guarantorInfo?.businessGuarantor?.mobileNumber ?? '',
//     personalGurantorEmail: payload?.guarantorInfo?.personalGuarantor?.emailAddress ?? '',
//     personalGurantorphone: payload?.guarantorInfo?.personalGuarantor?.mobileNumber ?? ''
//   }
//   // Begin Transaction
//   const result = await prisma.$transaction(async (tx) => {
//     const createdApplication = await tx.loanApplicationForm.create({
//       data: {
//         applicationId,
//         userId: user.userId,
//         personalInfo: {
//           create: payload.personalInfo,
//         },
//         residentialInformation: {
//           create: payload.residentialInfo,
//         },
//         // employmentInformation: {
//         //   create: payload.employmentInfo,
//         // },
//         loanInfo: {
//           create: {
//             hasCreditCard: payload?.loanInfo?.hasCreditCard ?? false,
//             hasExistingLoan: payload?.loanInfo?.hasExistingLoan ?? false,
//             bankAccounts: {
//               create: payload?.loanInfo?.bankAccounts,
//             },
//             creditCards: {
//               create: payload?.loanInfo?.creditCards,
//             },
//             existingLoans: {
//               create: payload?.loanInfo?.existingLoans,
//             },
//           },
//         },
//         loanRequest: {
//           create: payload.loanRequest,
//         },
//         GuarantorInfo: {
//           create: gurantorInfo
//         },
//         Document: {
//           create: cloudinaryResults.map(doc => ({
//             url: doc.url,
//             originalName: doc.originalName,
//             mimeType: doc.mimeType,
//           })),
//         }, 
//         EligibleLoanOffer: {
//           create: loanRequest
//         }
//       }, 
//       include: {
//         GuarantorInfo: true, 
//         user: {
//           select: {
//             name: true, 
//             phone: true, 
//             email: true
//           }
//         }
//       }
//     });
//     return createdApplication;
//   }, {
//     maxWait: 10000, // Max wait time in ms before giving up acquiring a transaction
//     timeout: 15000  // Total allowed time for the transaction to finish (in ms)
//   });
//   console.log("result",result)
//   if (result) {
//     const personaGurantor = result?.GuarantorInfo?.personalGurantorEmail
//     const businessGurantor = result?.GuarantorInfo?.businessGurantorEmail
//     console.log("email",personaGurantor, businessGurantor)
//     const linkPersonalGurantor = `${ConfigFile.CLIENT_URL}/guarantor-info/personal-guarantor?applicationId=${result?.applicationId}&id=${result?.id}`
//     const linkBusinessGurantor = `${ConfigFile.CLIENT_URL}/guarantor-info/business-guarantor?applicationId=${result?.applicationId}&id=${result?.id}`
//     const personaGurantorTemplate = gurantorEmailTemplate(result?.user?.phone ?? '', result?.user?.name ?? '', linkPersonalGurantor)  
//     const businessGurantorTemplate = gurantorEmailTemplate(result?.user?.phone ?? '', result?.user?.name ?? '', linkBusinessGurantor)  
//     await sendEmail(personaGurantor ?? '', "Gurantor Info Request", personaGurantorTemplate)
//     await sendEmail(businessGurantor ?? '', "Gurantor Info Request", businessGurantorTemplate)
//     console.log("email send")
//   }
//   return result;
// };
// const createApplicationForm = async (
//   data: TLoanApplicationForm,
//   user: TMiddlewareUser,
//   files: TUploadedFile[],
//   loanRequest: TLoanRequest
// ) => {
//   const payload = LoanApplicationFormSchema.parse(data)
//   try {
//     // Parse files and upload to Cloudinary
//     const cloudinaryResults: { url: string; originalName: string; mimeType: string }[] = [];
//     const filesObj = files as unknown as { [fieldname: string]: Express.Multer.File[] };
//     const filesArray: Express.Multer.File[] = Object.values(filesObj).flat();
//     for (const file of filesArray) {
//       try {
//         const uploaded = await uploadBufferToCloudinary(file.buffer, file.originalname, file.mimetype);
//         cloudinaryResults.push({
//           url: uploaded.secure_url,
//           originalName: file.originalname,
//           mimeType: file.mimetype,
//         });
//       } catch (err) {
//         console.error(`Failed to upload ${file.originalname}:`, err);
//         // Optionally: continue or throw depending on business rules
//       }
//     }
//     const applicationId = await generateApplicationId();
//     payload?.loanInfo?.bankAccounts.map(bank => {
//       return bank.accountNumber = encrypt(bank.accountNumber)
//     })
//     const guarantorInfoData = {
//       businessGurantorEmail: payload?.guarantorInfo?.businessGuarantor?.emailAddress ?? '',
//       businessGurantorPhone: payload?.guarantorInfo?.businessGuarantor?.mobileNumber ?? '',
//       personalGurantorEmail: payload?.guarantorInfo?.personalGuarantor?.emailAddress ?? '',
//       personalGurantorphone: payload?.guarantorInfo?.personalGuarantor?.mobileNumber ?? '',
//     };
//     // Begin DB Transaction
//     const createdApplication = await prisma.$transaction(async (tx) => {
//       return await tx.loanApplicationForm.create({
//         data: {
//           applicationId,
//           userId: user.userId,
//           personalInfo: { create: payload.personalInfo },
//           residentialInformation: { create: payload.residentialInfo },
//           employmentInformation: {
//             create: {
//               ...payload.employmentInfo,
//               properties: { create: payload?.employmentInfo?.properties ?? [] }
//             }
//           },
//           loanInfo: {
//             create: {
//               hasCreditCard: payload.loanInfo?.hasCreditCard ?? false,
//               hasExistingLoan: payload.loanInfo?.hasExistingLoan ?? false,
//               bankAccounts: { create: payload.loanInfo?.bankAccounts ?? [] },
//               creditCards: { create: payload.loanInfo?.creditCards ?? [] },
//               existingLoans: { create: payload.loanInfo?.existingLoans ?? [] },
//             },
//           },
//           loanRequest: { create: payload.loanRequest },
//           guarantorInfo: { create: guarantorInfoData },
//           document: {
//             create: cloudinaryResults.map((doc) => ({
//               url: doc.url,
//               originalName: doc.originalName,
//               mimeType: doc.mimeType,
//             })),
//           },
//           eligibleLoanOffer: {
//             create: loanRequest,
//           },
//         },
//         include: {
//           guarantorInfo: true,
//           user: {
//             select: { name: true, phone: true, email: true },
//           },
//           loanInfo: {
//             include: {
//               bankAccounts: true
//             }
//           }
//         },
//       });
//     }, {
//       maxWait: 10000,
//       timeout: 15000,
//     });
//     // Notify Guarantors via Email
//     const { guarantorInfo, user: applicant } = createdApplication;
//     const emailTasks: Promise<any>[] = [];
//     if (guarantorInfo?.personalGurantorEmail) {
//       const personalGuarantorLink = `${ConfigFile.CLIENT_URL}/guarantor-info/personal-guarantor?applicationId=${createdApplication.applicationId}&id=${createdApplication.id}`;
//       const personalTemplate = gurantorEmailTemplate(applicant.phone ?? '', applicant.name ?? '', personalGuarantorLink);
//       emailTasks.push(sendEmail(guarantorInfo.personalGurantorEmail, "Personal Guarantor Info Request", personalTemplate));
//     }
//     if (guarantorInfo?.businessGurantorEmail) {
//       const businessGuarantorLink = `${ConfigFile.CLIENT_URL}/guarantor-info/business-guarantor?applicationId=${createdApplication.applicationId}&id=${createdApplication.id}`;
//       const businessTemplate = gurantorEmailTemplate(applicant.phone ?? '', applicant.name ?? '', businessGuarantorLink);
//       emailTasks.push(sendEmail(guarantorInfo.businessGurantorEmail, "Business Guarantor Info Request", businessTemplate));
//     }
//     try {
//       await Promise.all(emailTasks);
//     } catch (emailErr) {
//       console.error("Email sending failed:", emailErr);
//     }
//     console.log("All emails sent successfully.");
//     return createdApplication;
//   } catch (error) {
//     console.error("Error while creating loan application form:", error);
//     let message = "Failed to process loan application. Please try again.";
//     if (error && typeof error === "object" && "message" in error && typeof (error as any).message === "string") {
//       message = (error as any).message;
//     }
//     throw new AppError(502, message);
//   }
// };
const createApplicationForm = (data, user, files, loanRequest) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    const payload = applicationForm_validation_1.LoanApplicationFormSchema.parse(data);
    const applicationId = yield (0, generateApplicationId_1.generateApplicationId)();
    try {
        // Save files locally instead of uploading to Cloudinary
        const savedDocuments = [];
        const images = files.files;
        for (const file of images) {
            try {
                const savedPath = yield (0, saveFileLoanApplication_1.saveFileLoanApplication)(file.buffer, file.originalname, applicationId); // or file.originalname
                savedDocuments.push({
                    filePath: savedPath,
                    originalName: file.originalname,
                    mimeType: file.mimetype,
                });
            }
            catch (err) {
                console.error(`Failed to save file ${file.fieldname}:`, err);
            }
        }
        console.log(savedDocuments);
        (_b = (_a = payload === null || payload === void 0 ? void 0 : payload.loanInfo) === null || _a === void 0 ? void 0 : _a.bankAccounts) === null || _b === void 0 ? void 0 : _b.forEach((bank) => {
            bank.accountNumber = (0, encryption_1.encrypt)(bank.accountNumber);
        });
        const guarantorInfoData = {
            businessGurantorEmail: (_e = (_d = (_c = payload === null || payload === void 0 ? void 0 : payload.guarantorInfo) === null || _c === void 0 ? void 0 : _c.businessGuarantor) === null || _d === void 0 ? void 0 : _d.emailAddress) !== null && _e !== void 0 ? _e : "",
            businessGurantorPhone: (_h = (_g = (_f = payload === null || payload === void 0 ? void 0 : payload.guarantorInfo) === null || _f === void 0 ? void 0 : _f.businessGuarantor) === null || _g === void 0 ? void 0 : _g.mobileNumber) !== null && _h !== void 0 ? _h : "",
            personalGurantorEmail: (_l = (_k = (_j = payload === null || payload === void 0 ? void 0 : payload.guarantorInfo) === null || _j === void 0 ? void 0 : _j.personalGuarantor) === null || _k === void 0 ? void 0 : _k.emailAddress) !== null && _l !== void 0 ? _l : "",
            personalGurantorphone: (_p = (_o = (_m = payload === null || payload === void 0 ? void 0 : payload.guarantorInfo) === null || _m === void 0 ? void 0 : _m.personalGuarantor) === null || _o === void 0 ? void 0 : _o.mobileNumber) !== null && _p !== void 0 ? _p : "",
        };
        // DB Transaction
        const createdApplication = yield app_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            return yield tx.loanApplicationForm.create({
                data: {
                    applicationId,
                    userId: user.userId,
                    personalInfo: { create: payload.personalInfo },
                    residentialInformation: { create: payload.residentialInfo },
                    employmentInformation: {
                        create: Object.assign(Object.assign({}, payload.employmentInfo), { properties: {
                                create: (_b = (_a = payload === null || payload === void 0 ? void 0 : payload.employmentInfo) === null || _a === void 0 ? void 0 : _a.properties) !== null && _b !== void 0 ? _b : [],
                            } }),
                    },
                    loanInfo: {
                        create: {
                            hasCreditCard: (_d = (_c = payload.loanInfo) === null || _c === void 0 ? void 0 : _c.hasCreditCard) !== null && _d !== void 0 ? _d : false,
                            hasExistingLoan: (_f = (_e = payload.loanInfo) === null || _e === void 0 ? void 0 : _e.hasExistingLoan) !== null && _f !== void 0 ? _f : false,
                            bankAccounts: { create: (_h = (_g = payload.loanInfo) === null || _g === void 0 ? void 0 : _g.bankAccounts) !== null && _h !== void 0 ? _h : [] },
                            creditCards: { create: (_k = (_j = payload.loanInfo) === null || _j === void 0 ? void 0 : _j.creditCards) !== null && _k !== void 0 ? _k : [] },
                            existingLoans: { create: (_m = (_l = payload.loanInfo) === null || _l === void 0 ? void 0 : _l.existingLoans) !== null && _m !== void 0 ? _m : [] },
                        },
                    },
                    loanRequest: { create: payload.loanRequest },
                    guarantorInfo: { create: guarantorInfoData },
                    document: {
                        create: savedDocuments.map((doc) => ({
                            // save relative path for easier serving
                            url: doc.filePath,
                            originalName: doc.originalName,
                            mimeType: doc.mimeType,
                        })),
                    },
                    eligibleLoanOffer: { create: loanRequest },
                },
                include: {
                    guarantorInfo: true,
                    user: {
                        select: { name: true, phone: true, email: true },
                    },
                    loanInfo: {
                        include: {
                            bankAccounts: true,
                        },
                    },
                },
            });
        }), {
            maxWait: 10000,
            timeout: 15000,
        });
        // Notify Guarantors via Email
        const { guarantorInfo, user: applicant } = createdApplication;
        const emailTasks = [];
        if (guarantorInfo === null || guarantorInfo === void 0 ? void 0 : guarantorInfo.personalGurantorEmail) {
            const personalGuarantorLink = `${config_1.ConfigFile.CLIENT_URL}/guarantor-info/personal-guarantor?applicationId=${createdApplication.applicationId}&id=${createdApplication.id}`;
            const personalTemplate = (0, gurantor_1.gurantorEmailTemplate)((_q = applicant.phone) !== null && _q !== void 0 ? _q : "", (_r = applicant.name) !== null && _r !== void 0 ? _r : "", personalGuarantorLink);
            emailTasks.push((0, sendEmail_1.default)(guarantorInfo.personalGurantorEmail, "Personal Guarantor Info Request", personalTemplate));
        }
        if (guarantorInfo === null || guarantorInfo === void 0 ? void 0 : guarantorInfo.businessGurantorEmail) {
            const businessGuarantorLink = `${config_1.ConfigFile.CLIENT_URL}/guarantor-info/business-guarantor?applicationId=${createdApplication.applicationId}&id=${createdApplication.id}`;
            const businessTemplate = (0, gurantor_1.gurantorEmailTemplate)((_s = applicant.phone) !== null && _s !== void 0 ? _s : "", (_t = applicant.name) !== null && _t !== void 0 ? _t : "", businessGuarantorLink);
            emailTasks.push((0, sendEmail_1.default)(guarantorInfo.businessGurantorEmail, "Business Guarantor Info Request", businessTemplate));
        }
        try {
            yield Promise.all(emailTasks);
        }
        catch (emailErr) {
            console.error("Email sending failed:", emailErr);
        }
        console.log("All emails sent successfully.");
        return createdApplication;
    }
    catch (error) {
        console.error("Error while creating loan application form:", error);
        let message = "Failed to process loan application. Please try again.";
        if (error &&
            typeof error === "object" &&
            "message" in error &&
            typeof error.message === "string") {
            message = error.message;
        }
        throw new AppError_1.default(502, message);
    }
});
const myLoanApplication = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const result = yield app_1.prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            LoanApplicationForm: {
                include: {
                    personalInfo: true,
                    loanInfo: true,
                    document: true,
                    loanRequest: true,
                    employmentInformation: true,
                    eligibleLoanOffer: true,
                    guarantorInfo: true,
                    residentialInformation: true
                }
            }
        }
    });
    console.log(result);
    return result;
});
const getAllApplicationForm = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.loanApplicationForm.findMany({
        include: {
            personalInfo: true,
            user: true,
            guarantorInfo: true,
            loanInfo: {
                include: {
                    bankAccounts: true,
                    creditCards: true,
                    existingLoans: true,
                }
            },
            eligibleLoanOffer: true,
            employmentInformation: {
                include: {
                    properties: true
                }
            },
            loanRequest: true,
            document: true,
            residentialInformation: true,
            personalGuarantor: {
                include: {
                    document: true
                }
            },
            businessGuarantor: {
                include: {
                    document: true
                }
            },
        }
    });
    return result;
});
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
const getSingleApplication = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.loanApplicationForm.findFirst({
        where: { id },
        include: {
            residentialInformation: true
        }
    });
    return result;
});
const applicationTracking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield app_1.prisma.loanApplicationForm.findFirst({
        where: {
            applicationId: payload.applicationId,
            user: {
                phone: payload.phone,
            },
        },
        select: {
            status: true,
            adminNotes: true,
            applicationId: true,
            loanRequest: true,
            eligibleLoanOffer: true,
            user: {
                select: {
                    name: true,
                    userId: true,
                    profile: true,
                },
            },
        },
    });
    if (!result) {
        throw new AppError_1.default(404, 'Application not found please enter valid Phone and Application ID');
    }
    return result;
});
const applicationForget = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.user.findFirst({
        where: {
            OR: [
                { email: payload.email },
                { phone: payload.phone }
            ],
        },
        include: {
            LoanApplicationForm: {
                select: {
                    applicationId: true,
                    eligibleLoanOffer: true
                }
            },
        },
    });
    console.log(result);
    if (!result || !result.LoanApplicationForm || result.LoanApplicationForm.length === 0) {
        throw new AppError_1.default(404, 'No Loan application found!');
    }
    //   // Prepare application details for email
    const applications = result.LoanApplicationForm.map((app) => {
        var _a;
        return ({
            applicationId: app.applicationId,
            loanType: ((_a = app.eligibleLoanOffer) === null || _a === void 0 ? void 0 : _a.loanType) || 'Unknown',
        });
    });
    const applicationDetails = applications
        .map((app) => `<li><strong>Application ID:</strong> ${app.applicationId}, <strong>Loan Type:</strong> ${app.loanType}</li>`)
        .join('');
    console.log(applicationDetails);
    const subject = 'Your Application ID';
    const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; background-color: #28a745; color: #ffffff; padding: 15px 0; border-radius: 8px 8px 0 0;">
      <h2 style="margin: 0; font-size: 20px;">FinupsBD</h2>
      <p style="margin: 0; font-size: 14px;">Helping you achieve your financial goals</p>
    </div>
    <p style="font-size: 16px; font-weight: bold; color: #444;">Dear ${result === null || result === void 0 ? void 0 : result.name},</p>
    <p style="font-size: 14px; color: #555;">
      Thank you for submitting your application. We have successfully received your details, and they are now under review. Below are the details of your application:
    </p>
    <ul style="font-size: 14px; color: #444; padding-left: 20px; list-style-type: disc;">
      ${applicationDetails}
    </ul>
    <p style="font-size: 14px; color: #555;">
      If you have any questions or need further assistance, please don't hesitate to contact our support team at 
      <a href="mailto:finupsbd@gmail.com" style="color: #28a745; text-decoration: underline; font-weight: bold;">finupsbd@gmail.com</a>.
    </p>
    <p style="font-size: 14px; color: #555;">
      We appreciate your trust in us and look forward to serving you.
    </p>
    <p style="font-size: 14px; color: #555;">Best regards,</p>
    <p style="font-size: 16px; font-weight: bold; color: #28a745;">FinupsBD Team</p>
    <footer style="margin-top: 20px; background-color: #f4f4f4; padding: 10px; border-radius: 8px; text-align: center; font-size: 12px; color: #777;">
      <p style="margin: 0;">© 2025 FinupsBD. All rights reserved.</p>
    </footer>
  </div>
`;
    yield (0, sendEmail_1.default)(result.email, subject, html);
    const maskedPhoneNumber = (0, maskedMobileNumber_1.default)(result.phone);
    const userEmail = result.email;
    const maskedEmailAddress = (0, maskedMobileNumber_1.default)(result.email);
    return {
        maskedPhoneNumber,
        userEmail,
        maskedEmailAddress
    };
});
exports.ApplicationFromService = {
    createApplicationForm,
    getAllApplicationForm,
    // updateStatus, 
    getSingleApplication,
    applicationTracking,
    applicationForget,
    myLoanApplication
};
