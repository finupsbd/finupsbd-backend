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
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const AppError_1 = __importDefault(require("../../error/AppError"));
const createApplicationForm = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingForm = yield app_1.prisma.applicationForm.findUnique({
        where: { applicationId: payload.applicationId },
    });
    if (existingForm) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_GATEWAY, `ApplicationForm with ID ${payload.applicationId} already exists.`);
    }
    console.log(payload);
    const result = yield app_1.prisma.applicationForm.create({
        data: {
            applicationId: payload.applicationId,
            userId: payload.userId,
            userInfo: {
                create: payload.userInfo,
            },
            address: {
                create: payload.address,
            },
            employmentFinancialInfo: {
                create: payload.employmentFinancialInfo,
            },
            loanSpecifications: {
                create: payload.loanSpecifications,
            },
            financialObligations: {
                createMany: { data: payload.financialObligations },
            },
            uploadedDocuments: {
                createMany: { data: payload.uploadedDocuments },
            },
        },
    });
    return result;
});
const getAllApplicationForm = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.applicationForm.findMany({
        include: {
            User: true,
            address: true,
            employmentFinancialInfo: true,
            financialObligations: true,
            loanSpecifications: true,
            uploadedDocuments: true
        }
    });
    return result;
});
exports.ApplicationFromService = {
    createApplicationForm,
    getAllApplicationForm,
};
