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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankInfoService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const app_1 = require("../../../app");
const sendImageToCloud_1 = require("../../utils/sendImageToCloud");
const bankInfo = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const coverImage = file ? yield (0, sendImageToCloud_1.sendImageToCloud)(file === null || file === void 0 ? void 0 : file.path) : undefined;
    payload.coverImage = (coverImage === null || coverImage === void 0 ? void 0 : coverImage.secure_url) || '';
    const result = yield app_1.prisma.bank.create({
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
            features: {
                create: payload.features,
            },
            eligibility: {
                create: payload.eligibility,
            },
            feesCharges: {
                create: payload.feesCharges,
            },
        },
        include: {
            features: true,
            eligibility: true,
            feesCharges: true,
        },
    });
    return result;
});
const getAllBankInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.bank.findMany({
        include: {
            features: true,
            eligibility: true,
            feesCharges: true,
        },
    });
    return result;
});
const updateBankInfo = (payload, file, id) => __awaiter(void 0, void 0, void 0, function* () {
    const coverImage = file ? yield (0, sendImageToCloud_1.sendImageToCloud)(file === null || file === void 0 ? void 0 : file.path) : undefined;
    payload.coverImage = (coverImage === null || coverImage === void 0 ? void 0 : coverImage.secure_url) || '';
    // Handle the Bank record
    const bankResult = yield app_1.prisma.bank.upsert({
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
            features: {
                create: payload.features,
            },
            eligibility: {
                create: payload.eligibility,
            },
            feesCharges: {
                create: payload.feesCharges,
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
            features: {
                update: payload.features,
            },
            eligibility: {
                update: payload.eligibility,
            },
            feesCharges: {
                update: payload.feesCharges,
            },
        },
        include: {
            features: true,
            eligibility: true,
            feesCharges: true,
        }
    });
    return bankResult; // Return the updated or created bank record
});
exports.BankInfoService = {
    bankInfo,
    getAllBankInfo,
    updateBankInfo,
};
