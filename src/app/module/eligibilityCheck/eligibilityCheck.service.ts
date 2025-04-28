
import { loanTypes } from "./eligibilityCheck.constant";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../app";
import { TEligibilityCheck } from "./eligibilityCheck.interface";
import personalLoan from "./eligibilityCheck/personalLoan";
import { instantLoan } from "./eligibilityCheck/instantLoan";







const eligibilityCheck = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {


  // 1. Pull out the loans array
  const { existingLoans = [], ...eligibilityData } = payload
console.log(eligibilityData, 'eligibilityData')
  // 2. Create with nested write
  const result = await prisma.eligibilityCheck.create({
    data: {
      ...eligibilityData,
      existingLoans: {
        create: existingLoans.map((loan) => ({
          existingLoanType: loan.existingLoanType, 
          emiAmountBDT: loan.emiAmountBDT,
          interestRate: loan.interestRate,
        })),
      },
    },
    include: {
      existingLoans: {
        select: {
          existingLoanType: true,
          emiAmountBDT: true,
          interestRate: true,
        },
      },
    },
  })

  console.log(result, 'result')

  if (payload?.loanType === loanTypes.INSTANT_LOAN) {
    return await instantLoan(result as unknown as TEligibilityCheck, query)
  }

  if (payload?.loanType === loanTypes.PERSONAL_LOAN) {
    return await personalLoan(result as unknown as TEligibilityCheck, query)
  }

  // if (payload?.loanType === loanTypes.HOME_LOAN) {
  //   return await homeLoan(result as unknown as TEligibilityCheck, query)
  // }

  // if (payload?.loanType === loanTypes.SME_LOAN) {
  //   return await smeLoan(result as unknown as TEligibilityCheck, query)
  // }

  throw new AppError(
    StatusCodes.BAD_REQUEST,
    `This module is not yet implemented for ${payload?.loanType} type `,
  );
}


export const EligibilityCheckService = {
  eligibilityCheck,
}