

import personalLoan from "./eligibilityCheck.utils/personalLoan";
import { loanTypes } from "./eligibilityCheck.constant";
import homeLoan from "./eligibilityCheck.utils/homeLoan";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../app";
import { TEligibilityCheck } from "./eligibilityCheck.interface";
import smeLoan from "./eligibilityCheck.utils/smeLoan";
import { MainLoanType } from "@prisma/client";
import { instantLoan } from "./eligibilityCheck.utils/inistantLoan";



interface TPropsValue {
  loanType: MainLoanType
  compareValue: 'true'
}



const eligibilityCheck = async (payload: TPropsValue, query: Record<string, unknown>) => {

const compareData = {
  ...payload
}


if (payload?.loanType === loanTypes.INSTANT_LOAN) {
  return await instantLoan(payload as unknown as TEligibilityCheck, query)
}


if(!payload?.compareValue){
  const result = await prisma.eligibilityCheck.create({ data: payload as unknown as TEligibilityCheck })



  if (payload?.loanType === loanTypes.PERSONAL_LOAN) {
    return await personalLoan(result as unknown as TEligibilityCheck, query)
  }

  if (payload?.loanType === loanTypes.HOME_LOAN) {
    return await homeLoan(result as unknown as TEligibilityCheck, query)
  }

  if (payload?.loanType === loanTypes.SME_LOAN) {
    return await smeLoan(result as unknown as TEligibilityCheck, query)
  }

  // if (payload.LoanType === loanTypes.CAR_LOAN) {
  //   return await carLoan(payload, query)
  // }

  throw new AppError(
    StatusCodes.BAD_REQUEST,
    `Invalid loan type provided. Please specify a valid loan type ((YOUR PROVIDED LOAN TYPE: ${payload.loanType})) (Excepeted Formate: PERSONAL_LOAN, HOME_LOAN, CAR_LOAN, SME_LOAN, CREDIT_CARD types)`
  );
} else {
  if (payload?.loanType === loanTypes.PERSONAL_LOAN) {
    return await personalLoan(compareData as unknown as TEligibilityCheck, query)
  }

  if (payload?.loanType === loanTypes.HOME_LOAN) {
    return await homeLoan(compareData as unknown as TEligibilityCheck , query)
  }

  if (payload?.loanType === loanTypes.SME_LOAN) {
    return await smeLoan(compareData as unknown as TEligibilityCheck , query)
  }
}


  // const cleanData = removeNullFields(result)
  // if (cleanData.email) {
  // const success =  myCache.set(cleanData.email, cleanData);
  // console.log(success) b
  // } 

}


export const EligibilityCheckService = {
  eligibilityCheck,
}