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
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const AppError_1 = __importDefault(require("../../error/AppError"));
const saveFileAdditional_1 = require("../../utils/file-uploads/saveFileAdditional");
const number_to_words_1 = require("number-to-words");
const dayjs_1 = __importDefault(require("dayjs"));
const numberToBanglaWords_1 = require("../../utils/numberToBanglaWords");
const calculateEMI_1 = require("../../utils/calculateEMI");
const getAllUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const conditions = [];
        // Apply role filter if provided.
        if (query.role) {
            conditions.push({ role: query.role });
        }
        // Apply status filter if provided.
        if (query.status) {
            conditions.push({ status: query.status });
        }
        // Use searchTerm as a boolean flag.
        // For demonstration, if searchTerm is true, include users with a non-empty name.
        if (query.searchTerm) {
            conditions.push({ name: { not: "" } });
        }
        // Combine conditions if any filters are applied.
        const whereClause = conditions.length > 0 ? { AND: conditions } : {};
        // Set pagination parameters; defaults: skip = 0, take = 10.
        const skip = (_a = query.skip) !== null && _a !== void 0 ? _a : 0;
        const take = (_b = query.take) !== null && _b !== void 0 ? _b : 10;
        // Query the database including the user's profile.
        const data = yield app_1.prisma.user.findMany({
            where: whereClause,
            include: {
                profile: true,
            },
            skip,
            take,
        });
        // Count the total records matching the filters.
        const totalCount = yield app_1.prisma.user.count({
            where: whereClause,
        });
        // Return the data along with pagination status.
        return {
            data,
            pagination: {
                skip,
                take,
                totalCount,
                currentPage: Math.floor(skip / take) + 1,
                totalPages: Math.ceil(totalCount / take),
            },
        };
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Could not fetch users");
    }
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.user.findUnique({
        where: { id },
        include: {
            profile: true
        }
    });
    return result;
});
const meProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.user.findFirst({
        where: { email: user === null || user === void 0 ? void 0 : user.email },
        select: {
            name: true,
            email: true,
            phone: true,
            role: true,
            profile: true,
            isActive: true,
            emailVerified: true,
        },
    });
    console.log({ result });
    if (!result)
        throw new Error("User not found");
    return result;
});
const getAllNewLoans = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.loanApplicationForm.findMany({
        where: {
            user: {
                id: id
            },
            status: {
                in: ['SUBMITTED', 'IN_PROGRESS', 'PENDING']
            }
        },
        include: {
            eligibleLoanOffer: true,
            loanRequest: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return result;
});
const getAllExistingLoans = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const result = yield app_1.prisma.loanApplicationForm.findMany({
        where: {
            user: {
                id: id
            },
            status: {
                in: ["COMPLETED"]
            }
        },
        include: {
            eligibleLoanOffer: true,
            loanRequest: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return result;
});
const getAllRejectsLoans = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const result = yield app_1.prisma.loanApplicationForm.findMany({
        where: {
            user: {
                id: id
            },
            status: {
                in: ["REJECTED"]
            }
        },
        include: {
            eligibleLoanOffer: true,
            loanRequest: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return result;
});
const getApplication = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.loanApplicationForm.findUnique({
        where: { id },
        include: {
            eligibleLoanOffer: {
                select: {
                    loanType: true,
                }
            },
        }
    });
    console.log(result);
    return result;
});
const createAdiDoc = (id, files, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistApplication = yield app_1.prisma.loanApplicationForm.findUnique({ where: { id } });
    if (!isExistApplication) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Application not found");
    }
    try {
        // Save files locally instead of uploading to Cloudinary
        const savedDocuments = [];
        const images = files;
        for (const file of images) {
            try {
                const savedPath = yield (0, saveFileAdditional_1.saveFileAdditional)(file.buffer, file.originalname, isExistApplication === null || isExistApplication === void 0 ? void 0 : isExistApplication.applicationId); // or file.originalname
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
        const uploadFileIntoDb = yield app_1.prisma.additionalDocument.createMany({
            data: savedDocuments.map((doc) => ({
                url: doc.filePath,
                originalName: doc.originalName,
                mimeType: doc.mimeType,
                loanApplicationFormId: id,
            })),
        });
        if (uploadFileIntoDb.count > 0) {
            yield app_1.prisma.loanApplicationForm.update({
                where: { id },
                data: {
                    status: "PENDING",
                    adminNotes: "Your document has been submitted successfully. Our review team will now carefully assess it before proceeding to the next steps.",
                    additionalDocumentSubmit: true,
                    additionalDocuments: false
                }
            });
        }
    }
    catch (err) {
        console.error(`Failed to save file :`, err);
    }
});
// const createAdiDoc = async (
//   id: string,                      // LoanApplicationForm.id
//   files: TUploadedFile[],
//   user: TMiddlewareUser           // who triggered this action
// ) => {
//   if (!files?.length) {
//     throw new AppError(StatusCodes.BAD_REQUEST, "No files provided");
//   }
//   const app = await prisma.loanApplicationForm.findUnique({
//     where: { id },
//     select: { id: true, applicationId: true }, // applicationId = human readable code
//   });
//   if (!app) {
//     throw new AppError(StatusCodes.NOT_FOUND, "Application not found");
//   }
//   // Persist files to disk
//   const savedDocuments: {
//     filePath: string;
//     originalName: string;
//     mimeType: string;
//     size?: number;
//   }[] = [];
//   for (const file of files) {
//     try {
//       const savedPath = await saveFileAdditional(
//         file.buffer,
//         file.originalname,
//         app.applicationId // use human-friendly code in the path
//       );
//       savedDocuments.push({
//         filePath: savedPath,
//         originalName: file.originalname,
//         mimeType: file.mimetype,
//         size: file.size,
//       });
//     } catch (err) {
//       // log a file-level error event (outside the tx) so you still get a breadcrumb
//       await prisma.applicationEvent.create({
//         data: {
//           applicationId: app.id, // IMPORTANT: relational id
//           eventType: "OTHER",
//           description: `Failed to save file "${file.originalname}"`,
//           createdBy: user?.userId,
//         },
//       });
//       // continue; do not throw here to allow other files to process
//       // or, choose to throw to fail the whole request if ANY file fails
//     }
//   }
//   if (!savedDocuments.length) {
//     throw new AppError(
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       "Failed to save files"
//     );
//   }
//   const newStatus = "PENDING" as const;
//   const adminNote =
//     "Your document has been submitted successfully. Our review team will now carefully assess it before proceeding to the next steps.";
//   // One transaction = DB writes + audit events
//   return await prisma.$transaction(async (tx) => {
//     // 1) Insert file rows
//     const createDocs = await tx.additionalDocument.createMany({
//       data: savedDocuments.map((doc) => ({
//         url: doc.filePath,
//         originalName: doc.originalName,
//         mimeType: doc.mimeType,
//         loanApplicationFormId: app.id,
//       })),
//     });
//     if (createDocs.count === 0) {
//       throw new AppError(
//         StatusCodes.INTERNAL_SERVER_ERROR,
//         "Files could not be recorded"
//       );
//     }
//     // 2) Update application status/flags/notes
//     const updated = await tx.loanApplicationForm.update({
//       where: { id: app.id },
//       data: {
//         status: newStatus,
//         adminNotes: adminNote,
//         additionalDocumentSubmit: true,
//         additionalDocuments: false,
//       },
//       select: { id: true, status: true, adminNotes: true, applicationId: true },
//     });
//     // 3) Create audit events (bulk)
//     const events: {
//       applicationId: string;
//       eventType: ApplicationEventType;
//       description?: string;
//       createdBy?: string | null;
//     }[] = [];
//     events.push({
//       applicationId: app.id,
//       eventType: "ADDITIONAL_DOCUMENTS_UPLOADED",
//       description: `${createDocs.count} file(s) uploaded`,
//       createdBy: user?.userId,
//     });
//     events.push({
//       applicationId: app.id,
//       eventType: "STATUS_UPDATED",
//       description: `Feedback:${createDocs?.count}Status changed to ${updated.status}`,
//       createdBy: user?.userId,
//     });
//     events.push({
//       applicationId: app.id,
//       eventType: "ADMIN_NOTE_ADDED",
//       description: "Admin note updated after additional documents",
//       createdBy: user?.userId,
//     });
//     await tx.applicationEvent.createMany({ data: events });
//     return {
//       success: true,
//       message: "Additional documents submitted and events recorded",
//       data: {
//         applicationId: updated.applicationId,
//         status: updated.status,
//         uploadedCount: createDocs.count,
//       },
//     };
//   });
// };
const getAgreementDoc = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    try {
        const result = yield app_1.prisma.loanApplicationForm.findUnique({
            where: { id },
            include: {
                user: true,
                personalInfo: true,
                loanRequest: true,
                residentialInformation: true,
                eligibleLoanOffer: true
            }
        });
        if (!result) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Application not found");
        }
        const loanAmountInWord = (0, number_to_words_1.toWords)(Number((_a = result === null || result === void 0 ? void 0 : result.loanRequest) === null || _a === void 0 ? void 0 : _a.loanAmount) || 0) + " taka only";
        const loanAmountInBangla = (0, numberToBanglaWords_1.numberToBanglaWords)(Number((_b = result === null || result === void 0 ? void 0 : result.loanRequest) === null || _b === void 0 ? void 0 : _b.loanAmount));
        const dueDate = (0, dayjs_1.default)((result === null || result === void 0 ? void 0 : result.updatedAt) || "").add(((_c = result === null || result === void 0 ? void 0 : result.eligibleLoanOffer) === null || _c === void 0 ? void 0 : _c.periodMonths) || 0, "month").format("YYYY-MM-DD");
        const presentAddress = `${((_d = result === null || result === void 0 ? void 0 : result.residentialInformation) === null || _d === void 0 ? void 0 : _d.presentAddress) || ""}, ${((_e = result === null || result === void 0 ? void 0 : result.residentialInformation) === null || _e === void 0 ? void 0 : _e.presentThana) || ""}, ${((_f = result === null || result === void 0 ? void 0 : result.residentialInformation) === null || _f === void 0 ? void 0 : _f.presentDistrict) || ""}\n ${((_g = result === null || result === void 0 ? void 0 : result.residentialInformation) === null || _g === void 0 ? void 0 : _g.presentDivision) || ""} - ${((_h = result === null || result === void 0 ? void 0 : result.residentialInformation) === null || _h === void 0 ? void 0 : _h.presentPostalCode) || ""}`;
        const calculateEMIValue = Math.round((0, calculateEMI_1.calculateEMI)(Number((_j = result === null || result === void 0 ? void 0 : result.loanRequest) === null || _j === void 0 ? void 0 : _j.loanAmount), Number((_k = result === null || result === void 0 ? void 0 : result.eligibleLoanOffer) === null || _k === void 0 ? void 0 : _k.interestRate) || 0, Number((_l = result === null || result === void 0 ? void 0 : result.loanRequest) === null || _l === void 0 ? void 0 : _l.loanTenure)));
        console.log(presentAddress);
        const data = {
            id: result === null || result === void 0 ? void 0 : result.id,
            applicationId: result === null || result === void 0 ? void 0 : result.applicationId,
            fullName: (_m = result === null || result === void 0 ? void 0 : result.personalInfo) === null || _m === void 0 ? void 0 : _m.fullName,
            nid: (_o = result === null || result === void 0 ? void 0 : result.personalInfo) === null || _o === void 0 ? void 0 : _o.NIDNumber,
            loanName: (_p = result === null || result === void 0 ? void 0 : result.eligibleLoanOffer) === null || _p === void 0 ? void 0 : _p.bankName,
            loanType: (_q = result === null || result === void 0 ? void 0 : result.eligibleLoanOffer) === null || _q === void 0 ? void 0 : _q.loanType,
            presrntAddress: presentAddress,
            requstedAmount: (_r = result === null || result === void 0 ? void 0 : result.loanRequest) === null || _r === void 0 ? void 0 : _r.loanAmount,
            eligibleLoan: (_s = result === null || result === void 0 ? void 0 : result.eligibleLoanOffer) === null || _s === void 0 ? void 0 : _s.eligibleLoan,
            interestRate: (_t = result === null || result === void 0 ? void 0 : result.eligibleLoanOffer) === null || _t === void 0 ? void 0 : _t.interestRate,
            periodMonths: (_u = result === null || result === void 0 ? void 0 : result.eligibleLoanOffer) === null || _u === void 0 ? void 0 : _u.periodMonths,
            monthlyEMI: calculateEMIValue,
            processingFee: (_v = result === null || result === void 0 ? void 0 : result.eligibleLoanOffer) === null || _v === void 0 ? void 0 : _v.processingFee,
            loanAmountInWord: loanAmountInWord,
            loanAmountInBangla: loanAmountInBangla,
            loanTenure: (_w = result === null || result === void 0 ? void 0 : result.eligibleLoanOffer) === null || _w === void 0 ? void 0 : _w.periodMonths,
            emiStartDate: (_x = result === null || result === void 0 ? void 0 : result.loanRequest) === null || _x === void 0 ? void 0 : _x.emiStartDate,
            applicationDate: result === null || result === void 0 ? void 0 : result.updatedAt,
            dueDate: dueDate
        };
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.UserServices = {
    getAllUser,
    meProfile,
    getSingleUser,
    getAllNewLoans,
    getAllExistingLoans,
    getAllRejectsLoans,
    getApplication,
    createAdiDoc,
    getAgreementDoc
};
