
/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "../../../../app";
import { sendImageToCloud } from "../../../utils/sendImageToCloud";
import { TCarLoan } from "./carLoan.interface";




const createCarLoan = async (payload: TCarLoan, file: any) => {
  const coverImage = file ? await sendImageToCloud(file?.path) : undefined;
  payload.coverImage = coverImage ?? undefined;
  const result = await prisma.carLoan.create({
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
      FeaturesCarLoan: {
        create: payload.featuresCarLoan,
      },
      EligibilityCarLoan: {
        create: payload.eligibilityCarLoan,
      },
      FeesChargesCarLoan: {
        create: payload.feesChargesCarLoan,
      },
    },
    include: {
      FeaturesCarLoan: true,
      EligibilityCarLoan: true,
      FeesChargesCarLoan: true,
    },
  });

  return result;
};

const getAllCarLoan = async () => {
  const result = await prisma.carLoan.findMany({
    include: {
      FeaturesCarLoan: true,      // Correctly references Features model
      EligibilityCarLoan: true,   // Correctly references Eligibility model
      FeesChargesCarLoan: true,   // Correctly references FeesCharges model
    },
  })
  return result;
};

const updateCarLoan = async (payload: TCarLoan, file: any, id: string) => {
  const coverImage = file ? await sendImageToCloud(file?.path) : undefined;
  payload.coverImage = coverImage ?? undefined;

  // Handle the Bank record
  const result = await prisma.carLoan.upsert({
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
      FeaturesCarLoan: {
        create: payload.featuresCarLoan,
      },
      EligibilityCarLoan: {
        create: payload.eligibilityCarLoan,
      },
      FeesChargesCarLoan: {
        create: payload.feesChargesCarLoan,
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
      FeaturesCarLoan: {
        update: payload.featuresCarLoan,
      },
      EligibilityCarLoan: {
        update: payload.eligibilityCarLoan,
      },
      FeesChargesCarLoan: {
        update: payload.feesChargesCarLoan,
      },
    }, 
    include: {
      FeaturesCarLoan: true,
      EligibilityCarLoan: true,
      FeesChargesCarLoan: true,
    }
  });


  return result;  // Return the updated or created bank record
};


export const CarLoanService = {
  createCarLoan,
  getAllCarLoan,
  updateCarLoan,
};
