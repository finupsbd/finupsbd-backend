/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../../app';
import { sendImageToCloud } from '../../utils/sendImageToCloud';
import { TBank } from './bank.interface';

const bankInfo = async (payload: TBank, file: any) => {
  const coverImage = file ? await sendImageToCloud(file?.path) : undefined;
  payload.coverImage = coverImage?.secure_url || '';
  const result = await prisma.bank.create({
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
};

const getAllBankInfo = async () => {
  const result = await prisma.bank.findMany()
  return result;
};

const updateBankInfo = async (payload: TBank, file: any, id: string) => {
  const coverImage = file ? await sendImageToCloud(file?.path) : undefined;
  payload.coverImage = coverImage?.secure_url || '';

  // Handle the Bank record
  const bankResult = await prisma.bank.upsert({
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


  return bankResult;  // Return the updated or created bank record
};


export const BankInfoService = {
  bankInfo,
  getAllBankInfo,
  updateBankInfo,
};
