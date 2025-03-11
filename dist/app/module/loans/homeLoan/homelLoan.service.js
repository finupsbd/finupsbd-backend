"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeLoanService = void 0;
const app_1 = require("../../../../app");
const sendImageToCloud_1 = require("../../../utils/sendImageToCloud");
const createHomeLoan = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const coverImage = file ? yield (0, sendImageToCloud_1.sendImageToCloud)(file === null || file === void 0 ? void 0 : file.path) : undefined;
    payload.coverImage = coverImage !== null && coverImage !== void 0 ? coverImage : undefined;
    const result = yield app_1.prisma.homeLoan.create({
        data: {
            bankName: payload.bankName,
            amount: payload.amount,
            coverImage: payload.coverImage,
            periodMonths: payload.periodMonths,
            processingFee: payload.processingFee,
            interestRate: payload.interestRate,
            monthlyEmi: payload.monthlyEmi,
            totalAmount: payload.totalAmount,
            eligibleLoan: payload.eligibleLoan,
            FeaturesHomeLoan: {
                create: payload.featuresHomeLoan,
            },
            EligibilityHomeLoan: {
                create: payload.eligibilityHomeLoan,
            },
            FeesChargesHomeLoan: {
                create: payload.feesChargesHomeLoan,
            },
        },
        include: {
            FeaturesHomeLoan: true,
            EligibilityHomeLoan: true,
            FeesChargesHomeLoan: true,
        },
    });
    return result;
});
const getAllHomeLoan = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.homeLoan.findMany({
        include: {
            FeaturesHomeLoan: true, // Correctly references Features model
            EligibilityHomeLoan: true, // Correctly references Eligibility model
            FeesChargesHomeLoan: true, // Correctly references FeesCharges model
        },
    });
    return result;
});
const updateHomeLoan = (payload, file, id) => __awaiter(void 0, void 0, void 0, function* () {
    const coverImage = file ? yield (0, sendImageToCloud_1.sendImageToCloud)(file === null || file === void 0 ? void 0 : file.path) : undefined;
    payload.coverImage = coverImage !== null && coverImage !== void 0 ? coverImage : undefined;
    // Handle the Bank record
    const result = yield app_1.prisma.homeLoan.upsert({
        where: { id },
        create: {
            bankName: payload.bankName,
            amount: payload.amount,
            coverImage: payload.coverImage,
            periodMonths: payload.periodMonths,
            processingFee: payload.processingFee,
            interestRate: payload.interestRate,
            monthlyEmi: payload.monthlyEmi,
            totalAmount: payload.totalAmount,
            eligibleLoan: payload.eligibleLoan,
            FeaturesHomeLoan: {
                create: payload.featuresHomeLoan,
            },
            EligibilityHomeLoan: {
                create: payload.eligibilityHomeLoan,
            },
            FeesChargesHomeLoan: {
                create: payload.feesChargesHomeLoan,
            },
        },
        update: {
            bankName: payload.bankName,
            amount: payload.amount,
            coverImage: payload.coverImage,
            periodMonths: payload.periodMonths,
            processingFee: payload.processingFee,
            interestRate: payload.interestRate,
            monthlyEmi: payload.monthlyEmi,
            totalAmount: payload.totalAmount,
            eligibleLoan: payload.eligibleLoan,
            FeaturesHomeLoan: {
                update: payload.featuresHomeLoan,
            },
            EligibilityHomeLoan: {
                update: payload.eligibilityHomeLoan,
            },
            FeesChargesHomeLoan: {
                update: payload.feesChargesHomeLoan,
            },
        },
        include: {
            FeaturesHomeLoan: true,
            EligibilityHomeLoan: true,
            FeesChargesHomeLoan: true,
        }
    });
    return result; // Return the updated or created bank record
});
exports.HomeLoanService = {
    createHomeLoan,
    getAllHomeLoan,
    updateHomeLoan,
};
