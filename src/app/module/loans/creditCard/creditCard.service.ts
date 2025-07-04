
/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "../../../../app";
import { sendImageToCloud } from "../../../utils/sendImageToCloud";
import { TCreditCardTypes } from "./creditCardValidation";






const createCreditCard = async (payload: TCreditCardTypes, file: any) => {
    const coverImage = file ? await sendImageToCloud(file) : undefined;
    payload.coverImage = coverImage ?? undefined

    console.log("payload", payload);
    const result = await prisma.creditCard.create({ 
        data: {
            bankName: payload.bankName,
            freeAnnualFee: payload.freeAnnualFee,
            regularAnnualFee: payload.regularAnnualFee,
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

            latePaymentFees: payload.latePaymentFees,
            currency: payload.currency,
            cardFeaturesType: payload.cardFeaturesType,
            cardNetwork: payload.cardNetwork,

            featuresCreditCard: payload.featuresCreditCard ? { create: payload.featuresCreditCard } : undefined,
            eligibilityCreditCard: payload.eligibilityCreditCard ? { create: payload.eligibilityCreditCard } : undefined,
            feesChargesCreditCard: payload.feesChargesCreditCard ? { create: payload.feesChargesCreditCard } : undefined,
        },
        include: {
            featuresCreditCard: true,
            eligibilityCreditCard: true,
            feesChargesCreditCard: true,
        },
    });

    return result;
};

const getAllCreditCard = async () => {
    const result = await prisma.creditCard.findMany({
        include: {
            featuresCreditCard: true,      // Correctly references Features model
            eligibilityCreditCard: true,   // Correctly references Eligibility model
            feesChargesCreditCard: true,   // Correctly references FeesCharges model
        },
    })
    return result;
};

// const updateCreditCard = async (payload: TCreditCardTypes, file: any, id: string) => {
//     const coverImage = file ? await sendImageToCloud(file) : undefined;
//     payload.coverImage = coverImage ?? undefined

//     // Handle the Bank record
//     const result = await prisma.creditCard.upsert({
//         where: { id },
//         create: {
//             bankName: payload.bankName,
//             freeAnnualFee: payload.freeAnnualFee,
//             regularAnnualFee: payload.regularAnnualFee,
//             annualFeeWaived: payload.annualFeeWaived,
//             annualFeeWaivedReward: payload.annualFeeWaivedReward,
//             interestPerDay: payload.interestPerDay,
//             interestFreePeriod: payload.interestFreePeriod,
//             freeSupplementaryCards: payload.freeSupplementaryCards,
//             maxSupplementaryCards: payload.maxSupplementaryCards,
//             balanceTransferAvailability: payload.balanceTransferAvailability,
//             ownBankATMFee: payload.ownBankATMFee,
//             otherBankATMFee: payload.otherBankATMFee,
//             loungeFacility: payload.loungeFacility,
//             loungeVisit: payload.loungeVisit,
//             cardChequeProcessingFee: payload.cardChequeProcessingFee,
//             processingFeeMinimum: payload.processingFeeMinimum,
//             cashWithdrawalLimit: payload.cashWithdrawalLimit,
//             coverImage: payload.coverImage,

//             featuresCreditCard: {
//                 create: payload.featuresCreditCard,
//             },
//             eligibilityCreditCard: {
//                 create: payload.eligibilityCreditCard,
//             },
//             feesChargesCreditCard: {
//                 create: payload.feesChargesCreditCard,
//             },
//         },
//         update: {
//             bankName: payload.bankName,
//             freeAnnualFee: payload.freeAnnualFee,
//             regularAnnualFee: payload.regularAnnualFee,
//             annualFeeWaived: payload.annualFeeWaived,
//             annualFeeWaivedReward: payload.annualFeeWaivedReward,
//             interestPerDay: payload.interestPerDay,
//             interestFreePeriod: payload.interestFreePeriod,
//             freeSupplementaryCards: payload.freeSupplementaryCards,
//             maxSupplementaryCards: payload.maxSupplementaryCards,
//             balanceTransferAvailability: payload.balanceTransferAvailability,
//             ownBankATMFee: payload.ownBankATMFee,
//             otherBankATMFee: payload.otherBankATMFee,
//             loungeFacility: payload.loungeFacility,
//             loungeVisit: payload.loungeVisit,
//             cardChequeProcessingFee: payload.cardChequeProcessingFee,
//             processingFeeMinimum: payload.processingFeeMinimum,
//             cashWithdrawalLimit: payload.cashWithdrawalLimit,
//             coverImage: payload.coverImage,

//             featuresCreditCard: {
//                 create: payload.featuresCreditCard,
//             },
//             eligibilityCreditCard: {
//                 create: payload.eligibilityCreditCard,
//             },
//             feesChargesCreditCard: {
//                 create: payload.feesChargesCreditCard,
//             },
//         },
//         include: {
//             featuresCreditCard: true,
//             eligibilityCreditCard: true,
//             feesChargesCreditCard: true,
//         }
//     });


//     return result;  // Return the updated or created bank record
// };


export const CreditCardService = {
    createCreditCard,
    getAllCreditCard,
    // updateCreditCard,
};
