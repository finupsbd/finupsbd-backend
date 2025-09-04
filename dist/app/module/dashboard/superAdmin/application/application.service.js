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
exports.ApplicationServides = void 0;
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../../../app");
const AppError_1 = __importDefault(require("../../../../error/AppError"));
const encryption_1 = require("../../../../utils/encryption");
const selects_1 = require("../../../../utils/prisma/selects");
const sendEmail_1 = __importDefault(require("../../../../utils/sendEmail"));
const applicationRejected_1 = require("../../../../utils/email-template/applicationRejected");
const loanStatusEmail_1 = require("../../../../utils/email-template/loanStatusEmail");
const getAllApplication = () => __awaiter(void 0, void 0, void 0, function* () {
    const [applications, total] = yield Promise.all([
        app_1.prisma.loanApplicationForm.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
                eligibleLoanOffer: {
                    select: {
                        eligibleLoan: true,
                        bankName: true,
                        loanType: true,
                    },
                },
                loanRequest: {
                    select: {
                        loanAmount: true,
                    },
                },
            },
            take: 10,
            orderBy: {
                createdAt: "desc"
            }
        }),
        app_1.prisma.loanApplicationForm.count()
    ]);
    console.log(total);
    return applications;
});
const getSingleApplication = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield app_1.prisma.loanApplicationForm.findUnique({
        where: { id },
        include: {
            personalInfo: true,
            user: { select: selects_1.safeUserSelect },
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
            additionalDocument: true,
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
        },
    });
    (_a = result === null || result === void 0 ? void 0 : result.loanInfo) === null || _a === void 0 ? void 0 : _a.bankAccounts.map(bank => {
        return bank.accountNumber = (0, encryption_1.decrypt)(bank.accountNumber);
    });
    return result;
});
const applicationFeedback = (id, payload, adminId // pass the admin user id (or role)
) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    console.log(id, payload);
    const result = yield app_1.prisma.loanApplicationForm.findUnique({
        where: { id },
        include: {
            user: {
                select: { email: true, name: true, userId: true }
            }
        }
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Application not found");
    }
    // Store old status before update
    const previousStatus = result.status;
    let updated;
    if (payload.status === "REJECTED") {
        updated = yield app_1.prisma.loanApplicationForm.update({
            where: { id },
            data: {
                status: payload.status,
                adminNotes: payload.adminNote,
                additionalDocuments: payload.additionalDocuments,
                isActive: false
            }
        });
        // Log to ApplicationEvent
        yield app_1.prisma.applicationEvent.create({
            data: {
                applicationId: id,
                eventType: "STATUS_CHANGED",
                stateBefore: previousStatus,
                stateAfter: payload.status,
                feedback: payload.adminNote,
                severity: "ERROR",
                createdRole: "SUPER_ADMIN"
            }
        });
        // Email
        const emailSubject = "Loan Application Status: REJECTED";
        const bodyText = (0, applicationRejected_1.applicationRejected)((_b = (_a = result === null || result === void 0 ? void 0 : result.user) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "", (_c = result === null || result === void 0 ? void 0 : result.applicationId) !== null && _c !== void 0 ? _c : "", (_d = payload === null || payload === void 0 ? void 0 : payload.adminNote) !== null && _d !== void 0 ? _d : "");
        yield (0, sendEmail_1.default)((_e = result === null || result === void 0 ? void 0 : result.user) === null || _e === void 0 ? void 0 : _e.email, emailSubject, bodyText);
        return "Email Sent Successfully";
    }
    else {
        updated = yield app_1.prisma.loanApplicationForm.update({
            where: { id },
            data: {
                status: payload.status,
                additionalDocuments: payload.additionalDocuments,
                adminNotes: payload.adminNote,
                isActive: true
            },
            include: {
                user: {
                    select: { email: true, name: true }
                }
            }
        });
        // Log to ApplicationEvent
        yield app_1.prisma.applicationEvent.create({
            data: {
                applicationId: id,
                eventType: "STATUS_CHANGED",
                stateBefore: previousStatus,
                stateAfter: payload.status,
                feedback: payload.adminNote,
                severity: "INFO",
                createdRole: "SUPER_ADMIN"
            }
        });
        // Email
        const emailSubject = "Loan Application Status Update";
        const templatePayload = {
            name: (_g = (_f = updated === null || updated === void 0 ? void 0 : updated.user) === null || _f === void 0 ? void 0 : _f.name) !== null && _g !== void 0 ? _g : "",
            applicationID: (_h = updated === null || updated === void 0 ? void 0 : updated.applicationId) !== null && _h !== void 0 ? _h : "",
            status: (_j = updated === null || updated === void 0 ? void 0 : updated.status) !== null && _j !== void 0 ? _j : "",
            reason: (_k = payload === null || payload === void 0 ? void 0 : payload.adminNote) !== null && _k !== void 0 ? _k : ""
        };
        const bodyText = (0, loanStatusEmail_1.loanStatusEmail)(templatePayload);
        yield (0, sendEmail_1.default)((_l = updated === null || updated === void 0 ? void 0 : updated.user) === null || _l === void 0 ? void 0 : _l.email, emailSubject, bodyText);
        return "Email Sent Successfully";
    }
});
const getStatusEvents = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.applicationEvent.findMany({
        where: {
            applicationId: id,
            eventType: "STATUS_CHANGED"
        },
        orderBy: {
            createdAt: "desc"
        },
    });
    return result;
});
exports.ApplicationServides = {
    getAllApplication,
    getSingleApplication,
    applicationFeedback,
    getStatusEvents
};
