
import { TEligibilityCheck } from "./eligibilityCheck.interface";
import personalLoan from "./eligibilityCheck.utils/personalLoan";
import { loanTypes } from "./eligibilityCheck.constant";
import homeLoan from "./eligibilityCheck.utils/homeLoan";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";



const eligibilityCheck = async(payload: TEligibilityCheck, query: Record<string, unknown>) => {

    if(payload.LoanType === loanTypes.PERSONAL_LOAN){
      return await personalLoan(payload, query) 
    }

    if(payload.LoanType === loanTypes.HOME_LOAN){
      return await homeLoan(payload, query) 
    }

    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Invalid loan type provided. Please specify a valid loan type ((YOUR PROVIDED LOAN TYPE: ${payload.LoanType})) (Excepeted Formate: PERSONAL_LOAN,   HOME_LOAN ...... types)`
    );
}  



export const EligibilityCheckService = {
    eligibilityCheck,
}