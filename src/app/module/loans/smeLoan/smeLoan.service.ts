

/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "../../../../app";
import { sendImageToCloud } from "../../../utils/sendImageToCloud";
import { TSMELoan } from "./smeLoan.interface";





const createSMELoan = async (payload: TSMELoan, file: any) => {
  const coverImage = file ? await sendImageToCloud(file) : undefined;
  payload.coverImage = coverImage ?? undefined;

  console.log(payload)

  const result = await prisma.sMELoan.create({
    data: {
      bankName: payload.bankName ,
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
};

const getAllSMELoan = async () => {
  const result = await prisma.sMELoan.findMany({
    include: {
      FeaturesSMELoan: true,      // Correctly references Features model
      EligibilitySMELoan: true,   // Correctly references Eligibility model
      FeesChargesSMELoan: true,   // Correctly references FeesCharges model
    },
  })
  return result;
};

const updateSMELoan = async (payload: TSMELoan, file: any, id: string) => {
  const coverImage = file ? await sendImageToCloud(file) : undefined;
  payload.coverImage = coverImage ?? undefined;


  // Handle the Bank record
  const result = await prisma.sMELoan.upsert({
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


  return result;  // Return the updated or created bank record
};


export const SMELoanService = {
  createSMELoan,
  getAllSMELoan,
  updateSMELoan,
};
