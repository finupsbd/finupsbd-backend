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
exports.CreditCardService = void 0;
const app_1 = require("../../../../app");
const sendImageToCloud_1 = require("../../../utils/sendImageToCloud");
const createCreditCard = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const coverImage = file ? yield (0, sendImageToCloud_1.sendImageToCloud)(file) : undefined;
    payload.coverImage = coverImage !== null && coverImage !== void 0 ? coverImage : undefined;
    console.log("payload", payload);
    const result = yield app_1.prisma.creditCard.create({
        data: {
            bankName: payload.bankName,
            freeAnnualFee: payload.freeAnnualFee,
            regularAnnualFee: payload.regularAnnualFee,
            annualFeeWaived: payload.annualFeeWaived,
            annualFeeWaivedReward: payload.annualFeeWaivedReward,
            interestPerDay: payload.interestPerDay,
            interestFreePeriod: payload.interestFreePeriod,
            freeSupplementaryCards: payload.freeSupplementaryCards,
            maxSupplementaryCards: payload.maxSupplementaryCards,
            balanceTransferAvailability: payload.balanceTransferAvailability,
            ownBankATMFee: payload.ownBankATMFee,
            otherBankATMFee: payload.otherBankATMFee,
            loungeFacility: payload.loungeFacility,
            loungeVisit: payload.loungeVisit,
            cardChequeProcessingFee: payload.cardChequeProcessingFee,
            processingFeeMinimum: payload.processingFeeMinimum,
            cashWithdrawalLimit: payload.cashWithdrawalLimit,
            coverImage: payload.coverImage,
            featuresCreditCard: {
                create: payload.featuresCreditCard,
            },
            eligibilityCreditCard: {
                create: payload.eligibilityCreditCard,
            },
            feesChargesCreditCard: {
                create: payload.feesChargesCreditCard,
            },
        },
        include: {
            featuresCreditCard: true,
            eligibilityCreditCard: true,
            feesChargesCreditCard: true,
        },
    });
    return result;
});
const getAllCreditCard = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.creditCard.findMany({
        include: {
            featuresCreditCard: true, // Correctly references Features model
            eligibilityCreditCard: true, // Correctly references Eligibility model
            feesChargesCreditCard: true, // Correctly references FeesCharges model
        },
    });
    return result;
});
const updateCreditCard = (payload, file, id) => __awaiter(void 0, void 0, void 0, function* () {
    const coverImage = file ? yield (0, sendImageToCloud_1.sendImageToCloud)(file) : undefined;
    payload.coverImage = coverImage !== null && coverImage !== void 0 ? coverImage : undefined;
    // Handle the Bank record
    const result = yield app_1.prisma.creditCard.upsert({
        where: { id },
        create: {
            bankName: payload.bankName,
            freeAnnualFee: payload.freeAnnualFee,
            regularAnnualFee: payload.regularAnnualFee,
            annualFeeWaived: payload.annualFeeWaived,
            annualFeeWaivedReward: payload.annualFeeWaivedReward,
            interestPerDay: payload.interestPerDay,
            interestFreePeriod: payload.interestFreePeriod,
            freeSupplementaryCards: payload.freeSupplementaryCards,
            maxSupplementaryCards: payload.maxSupplementaryCards,
            balanceTransferAvailability: payload.balanceTransferAvailability,
            ownBankATMFee: payload.ownBankATMFee,
            otherBankATMFee: payload.otherBankATMFee,
            loungeFacility: payload.loungeFacility,
            loungeVisit: payload.loungeVisit,
            cardChequeProcessingFee: payload.cardChequeProcessingFee,
            processingFeeMinimum: payload.processingFeeMinimum,
            cashWithdrawalLimit: payload.cashWithdrawalLimit,
            coverImage: payload.coverImage,
            featuresCreditCard: {
                create: payload.featuresCreditCard,
            },
            eligibilityCreditCard: {
                create: payload.eligibilityCreditCard,
            },
            feesChargesCreditCard: {
                create: payload.feesChargesCreditCard,
            },
        },
        update: {
            bankName: payload.bankName,
            freeAnnualFee: payload.freeAnnualFee,
            regularAnnualFee: payload.regularAnnualFee,
            annualFeeWaived: payload.annualFeeWaived,
            annualFeeWaivedReward: payload.annualFeeWaivedReward,
            interestPerDay: payload.interestPerDay,
            interestFreePeriod: payload.interestFreePeriod,
            freeSupplementaryCards: payload.freeSupplementaryCards,
            maxSupplementaryCards: payload.maxSupplementaryCards,
            balanceTransferAvailability: payload.balanceTransferAvailability,
            ownBankATMFee: payload.ownBankATMFee,
            otherBankATMFee: payload.otherBankATMFee,
            loungeFacility: payload.loungeFacility,
            loungeVisit: payload.loungeVisit,
            cardChequeProcessingFee: payload.cardChequeProcessingFee,
            processingFeeMinimum: payload.processingFeeMinimum,
            cashWithdrawalLimit: payload.cashWithdrawalLimit,
            coverImage: payload.coverImage,
            featuresCreditCard: {
                create: payload.featuresCreditCard,
            },
            eligibilityCreditCard: {
                create: payload.eligibilityCreditCard,
            },
            feesChargesCreditCard: {
                create: payload.feesChargesCreditCard,
            },
        },
        include: {
            featuresCreditCard: true,
            eligibilityCreditCard: true,
            feesChargesCreditCard: true,
        }
    });
    return result; // Return the updated or created bank record
});
exports.CreditCardService = {
    createCreditCard,
    getAllCreditCard,
    updateCreditCard,
};
