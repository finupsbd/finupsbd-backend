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
exports.UserServices = exports.createAdiDoc = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const AppError_1 = __importDefault(require("../../error/AppError"));
const saveFileAdditional_1 = require("../../utils/file-uploads/saveFileAdditional");
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
    const result = yield app_1.prisma.loanApplicationForm.findMany({
        where: {
            user: {
                id: id
            },
            status: {
                in: ["APPROVED"]
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
        where: { id }
    });
    console.log(result);
    return result;
});
// const createAdiDoc = async (id: string, files: TUploadedFile[]) => {
//   const isExistApplication = await prisma.loanApplicationForm.findUnique({ where: { id } })
//   if (!isExistApplication) {
//     throw new AppError(StatusCodes.NOT_FOUND, "Application not found")
//   }
//   try {
//     // Save files locally instead of uploading to Cloudinary
//     const savedDocuments: {
//       filePath: string;
//       originalName: string;
//       mimeType: string;
//     }[] = [];
//     const images: TUploadedFile[] = files
//     for (const file of images) {
//       try {
//         const savedPath = await saveFileAdditional(file.buffer, file.originalname, isExistApplication?.applicationId); // or file.originalname
//         savedDocuments.push({
//           filePath: savedPath,
//           originalName: file.originalname,
//           mimeType: file.mimetype,
//         });
//       } catch (err) {
//         console.error(`Failed to save file ${file.fieldname}:`, err);
//       }
//     }
//     console.log(savedDocuments)
//     const uploadFileIntoDb = await prisma.additionalDocument.createMany({
//       data: savedDocuments.map((doc) => ({
//         url: doc.filePath,
//         originalName: doc.originalName,
//         mimeType: doc.mimeType,
//         loanApplicationFormId: id,
//       })),
//     });
//     if (uploadFileIntoDb.count > 0) {
//       await prisma.loanApplicationForm.update({
//         where: { id },
//         data: {
//           status: "PENDING",
//           adminNotes: "Your document has been submitted successfully. Our review team will now carefully assess it before proceeding to the next steps.",
//           additionalDocumentSubmit: true,
//           additionalDocuments: false
//         }
//       })
//       await prisma.applicationEvent.create({
//         data: {
//           applicationId: isExistApplication?.applicationId,
//           eventType: "STATUS_UPDATED",
//           description: `Status changed to ${newStatus}`,
//           createdBy: userId,
//         },
//       })
//     }
//   } catch (err) {
//     console.error(`Failed to save file :`, err);
//   }
// }
const createAdiDoc = (id, // LoanApplicationForm.id
files, user // who triggered this action
) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(files === null || files === void 0 ? void 0 : files.length)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "No files provided");
    }
    const app = yield app_1.prisma.loanApplicationForm.findUnique({
        where: { id },
        select: { id: true, applicationId: true }, // applicationId = human readable code
    });
    if (!app) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Application not found");
    }
    // Persist files to disk
    const savedDocuments = [];
    for (const file of files) {
        try {
            const savedPath = yield (0, saveFileAdditional_1.saveFileAdditional)(file.buffer, file.originalname, app.applicationId // use human-friendly code in the path
            );
            savedDocuments.push({
                filePath: savedPath,
                originalName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
            });
        }
        catch (err) {
            // log a file-level error event (outside the tx) so you still get a breadcrumb
            yield app_1.prisma.applicationEvent.create({
                data: {
                    applicationId: app.id, // IMPORTANT: relational id
                    eventType: "FILE_PERSISTED_ERROR",
                    description: `Failed to save file "${file.originalname}"`,
                    createdBy: user === null || user === void 0 ? void 0 : user.userId,
                },
            });
            // continue; do not throw here to allow other files to process
            // or, choose to throw to fail the whole request if ANY file fails
        }
    }
    if (!savedDocuments.length) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Failed to save files");
    }
    const newStatus = "PENDING";
    const adminNote = "Your document has been submitted successfully. Our review team will now carefully assess it before proceeding to the next steps.";
    // One transaction = DB writes + audit events
    return yield app_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // 1) Insert file rows
        const createDocs = yield tx.additionalDocument.createMany({
            data: savedDocuments.map((doc) => ({
                url: doc.filePath,
                originalName: doc.originalName,
                mimeType: doc.mimeType,
                loanApplicationFormId: app.id,
            })),
        });
        if (createDocs.count === 0) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Files could not be recorded");
        }
        // 2) Update application status/flags/notes
        const updated = yield tx.loanApplicationForm.update({
            where: { id: app.id },
            data: {
                status: newStatus,
                adminNotes: adminNote,
                additionalDocumentSubmit: true,
                additionalDocuments: false,
            },
            select: { id: true, status: true, adminNotes: true, applicationId: true },
        });
        // 3) Create audit events (bulk)
        const events = [];
        events.push({
            applicationId: app.id,
            eventType: "ADDITIONAL_DOCUMENTS_UPLOADED",
            description: `${createDocs.count} file(s) uploaded`,
            createdBy: user === null || user === void 0 ? void 0 : user.userId,
        });
        events.push({
            applicationId: app.id,
            eventType: "STATUS_UPDATED",
            description: `Feedback:${createDocs === null || createDocs === void 0 ? void 0 : createDocs.count}Status changed to ${updated.status}`,
            createdBy: user === null || user === void 0 ? void 0 : user.userId,
        });
        events.push({
            applicationId: app.id,
            eventType: "ADMIN_NOTE_ADDED",
            description: "Admin note updated after additional documents",
            createdBy: user === null || user === void 0 ? void 0 : user.userId,
        });
        yield tx.applicationEvent.createMany({ data: events });
        return {
            success: true,
            message: "Additional documents submitted and events recorded",
            data: {
                applicationId: updated.applicationId,
                status: updated.status,
                uploadedCount: createDocs.count,
            },
        };
    }));
});
exports.createAdiDoc = createAdiDoc;
exports.UserServices = {
    getAllUser,
    meProfile,
    getSingleUser,
    getAllNewLoans,
    getAllExistingLoans,
    getApplication,
    createAdiDoc: exports.createAdiDoc
};
