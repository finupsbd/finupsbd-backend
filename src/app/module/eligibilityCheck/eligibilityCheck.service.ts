

import personalLoan from "./eligibilityCheck.utils/personalLoan";
import { loanTypes } from "./eligibilityCheck.constant";
import homeLoan from "./eligibilityCheck.utils/homeLoan";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../app";
import { TEligibilityCheck } from "./eligibilityCheck.interface";
import smeLoan from "./eligibilityCheck.utils/smeLoan";





const eligibilityCheck = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {


  const result = await prisma.eligibilityCheck.create({ data: payload })
  // const cleanData = removeNullFields(result)
  // if (cleanData.email) {
  // const success =  myCache.set(cleanData.email, cleanData);
  // console.log(success)
  // } 






  if (payload.loanType === loanTypes.PERSONAL_LOAN) {
    return await personalLoan(result as unknown as TEligibilityCheck, query)
  }

  if (payload.loanType === loanTypes.HOME_LOAN) {
    return await homeLoan(result as unknown as TEligibilityCheck, query)
  }

  if (payload.loanType === loanTypes.SME_LOAN) {
    return await smeLoan(result as unknown as TEligibilityCheck, query)
  }

  // if (payload.LoanType === loanTypes.CAR_LOAN) {
  //   return await carLoan(payload, query)
  // }



  throw new AppError(
    StatusCodes.BAD_REQUEST,
    `Invalid loan type provided. Please specify a valid loan type ((YOUR PROVIDED LOAN TYPE: ${payload.loanType})) (Excepeted Formate: PERSONAL_LOAN, HOME_LOAN, CAR_LOAN, SME_LOAN, CREDIT_CARD types)`
  );
}



export const EligibilityCheckService = {
  eligibilityCheck,
}