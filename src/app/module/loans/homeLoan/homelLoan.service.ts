
/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "../../../../app";
import { sendImageToCloud } from "../../../utils/sendImageToCloud";
import { THomeLoan } from "./homeLoan.interface";



const createHomeLoan = async (payload: THomeLoan, file: any) => {
  const coverImage = file ? await sendImageToCloud(file?.path) : undefined;
  payload.coverImage = coverImage?.secure_url || '';
  const result = await prisma.homeLoan.create({
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
};

const getAllHomeLoan = async () => {
  const result = await prisma.homeLoan.findMany({
    include: {
      FeaturesHomeLoan: true,      // Correctly references Features model
      EligibilityHomeLoan: true,   // Correctly references Eligibility model
      FeesChargesHomeLoan: true,   // Correctly references FeesCharges model
    },
  })
  return result;
};

const updateHomeLoan = async (payload: THomeLoan, file: any, id: string) => {
  const coverImage = file ? await sendImageToCloud(file?.path) : undefined;
  payload.coverImage = coverImage?.secure_url || '';

  // Handle the Bank record
  const result = await prisma.homeLoan.upsert({
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


  return result;  // Return the updated or created bank record
};


export const HomeLoanService = {
  createHomeLoan,
  getAllHomeLoan,
  updateHomeLoan,
};
