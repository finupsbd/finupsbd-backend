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
exports.SMELoanService = void 0;
const app_1 = require("../../../../app");
const sendImageToCloud_1 = require("../../../utils/sendImageToCloud");
const createSMELoan = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const coverImage = file ? yield (0, sendImageToCloud_1.sendImageToCloud)(file) : undefined;
    payload.coverImage = coverImage !== null && coverImage !== void 0 ? coverImage : undefined;
    console.log(payload);
    const result = yield app_1.prisma.sMELoan.create({
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
            FeaturesSMELoan: {
                create: payload.featuresSMELoan,
            },
            EligibilitySMELoan: {
                create: payload.eligibilitySMELoan,
            },
            FeesChargesSMELoan: {
                create: payload.feesChargesSMELoan,
            },
        },
        include: {
            FeaturesSMELoan: true,
            EligibilitySMELoan: true,
            FeesChargesSMELoan: true,
        },
    });
    return result;
});
const getAllSMELoan = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.sMELoan.findMany({
        include: {
            FeaturesSMELoan: true, // Correctly references Features model
            EligibilitySMELoan: true, // Correctly references Eligibility model
            FeesChargesSMELoan: true, // Correctly references FeesCharges model
        },
    });
    return result;
});
const updateSMELoan = (payload, file, id) => __awaiter(void 0, void 0, void 0, function* () {
    const coverImage = file ? yield (0, sendImageToCloud_1.sendImageToCloud)(file) : undefined;
    payload.coverImage = coverImage !== null && coverImage !== void 0 ? coverImage : undefined;
    // Handle the Bank record
    const result = yield app_1.prisma.sMELoan.upsert({
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
            FeaturesSMELoan: {
                create: payload.featuresSMELoan,
            },
            EligibilitySMELoan: {
                create: payload.eligibilitySMELoan,
            },
            FeesChargesSMELoan: {
                create: payload.feesChargesSMELoan,
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
            FeaturesSMELoan: {
                update: payload.featuresSMELoan,
            },
            EligibilitySMELoan: {
                update: payload.eligibilitySMELoan,
            },
            FeesChargesSMELoan: {
                update: payload.feesChargesSMELoan,
            },
        },
        include: {
            FeaturesSMELoan: true,
            EligibilitySMELoan: true,
            FeesChargesSMELoan: true,
        }
    });
    return result; // Return the updated or created bank record
});
exports.SMELoanService = {
    createSMELoan,
    getAllSMELoan,
    updateSMELoan,
};
