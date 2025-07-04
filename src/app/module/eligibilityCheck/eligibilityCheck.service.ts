import { cardsTypes, loanTypes } from "./eligibilityCheck.constant";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../app";
import { TEligibilityCheck } from "./eligibilityCheck.interface";
import personalLoan from "./eligibilityCheck/personalLoan";
import { instantLoan } from "./eligibilityCheck/instantLoan";
import { creditCard } from "./eligibilityCheck/creditCard";


type LoanHandler = (data: TEligibilityCheck, query: Record<string, unknown>) => Promise<unknown>;

// Loan type handler map
const loanHandlers: Record<string, LoanHandler> = {
  [loanTypes.INSTANT_LOAN]: instantLoan,
  [loanTypes.PERSONAL_LOAN]: personalLoan,
  [cardsTypes.CREDIT_CARD]: creditCard,

};




const eligibilityCheck = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {

    console.log({ payload })

  const { existingLoans = [], ...eligibilityData } = payload;



  try {

    const eligibilityCheckEntry = await prisma.eligibilityCheck.create({
      data: {
        ...eligibilityData,
        existingLoans: {
          create: existingLoans.map(({ existingLoanType, emiAmountBDT, interestRate }) => ({
            existingLoanType,
            emiAmountBDT,
            interestRate,
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
    });


    const handler = loanHandlers[payload.loanType];



    if (!handler) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        `Loan type handler not implemented for '${payload.loanType}'`
      );
    }
    return handler(eligibilityCheckEntry as unknown as TEligibilityCheck, query);
  } catch (error) {
    console.log(error)
  }

}





export const EligibilityCheckService = {
  eligibilityCheck,
};