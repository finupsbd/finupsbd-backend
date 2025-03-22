/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "../../../../app";
import { sendImageToCloud } from "../../../utils/sendImageToCloud";
import { TInstantLoan } from "./instantLoan.interface";



const createInstantLoan = async (payload: TInstantLoan, file: any) => {

  const coverImage = file ? await sendImageToCloud(file) : undefined;
  payload.coverImage = coverImage ?? undefined;
  
  const result = await prisma.instantLoan.create({
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
      FeaturesInstantLoan: {
        create: payload.featuresInstantLoan,
      },
      EligibilityInstantLoan: {
        create: payload.eligibilityInstantLoan,
      },
      FeesChargesInstantLoan: {
        create: payload.feesChargesInstantLoan,
      },
    },
    include: {
      FeaturesInstantLoan: true,
      EligibilityInstantLoan: true,
      FeesChargesInstantLoan: true,
    },
  });

  return result;
};

const getAllInstantLoan = async () => {
  const result = await prisma.instantLoan.findMany({
    include: {
      FeaturesInstantLoan: true,      // Correctly references Features model
      EligibilityInstantLoan: true,   // Correctly references Eligibility model
      FeesChargesInstantLoan: true,   // Correctly references FeesCharges model
    },
  })
  return result;
};

const updateInstantLoan = async (payload: TInstantLoan, file: any, id: string) => {
  const coverImage = file ? await sendImageToCloud(file) : undefined;
  payload.coverImage = coverImage?? undefined;

  // Handle the Bank record
  const bankResult = await prisma.instantLoan.upsert({
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
      FeaturesInstantLoan: {
        create: payload.featuresInstantLoan,
      },
      EligibilityInstantLoan: {
        create: payload.eligibilityInstantLoan,
      },
      FeesChargesInstantLoan: {
        create: payload.feesChargesInstantLoan,
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
      FeaturesInstantLoan: {
        update: payload.featuresInstantLoan,
      },
      EligibilityInstantLoan: {
        update: payload.eligibilityInstantLoan,
      }, 
      FeesChargesInstantLoan: {
        update: payload.feesChargesInstantLoan,
      },
    }, 
    include: {
      FeaturesInstantLoan: true,
      EligibilityInstantLoan: true,
      FeesChargesInstantLoan: true,
    }
  });


  return bankResult;  // Return the updated or created bank record
};


export const InstantLoanService = {
  createInstantLoan,
  getAllInstantLoan,
  updateInstantLoan,
};
