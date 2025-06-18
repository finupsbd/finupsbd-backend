import { loanTypes } from "./eligibilityCheck.constant";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../app";
import { TEligibilityCheck } from "./eligibilityCheck.interface";
import personalLoan from "./eligibilityCheck/personalLoan";
import { instantLoan } from "./eligibilityCheck/instantLoan";
// import homeLoan from "./eligibilityCheck/homeLoan";
// import smeLoan from "./eligibilityCheck/smeLoan";

type LoanHandler = (data: TEligibilityCheck, query: Record<string, unknown>) => Promise<unknown>;

// Loan type handler map
const loanHandlers: Record<string, LoanHandler> = {
  [loanTypes.INSTANT_LOAN]: instantLoan,
  [loanTypes.PERSONAL_LOAN]: personalLoan,
  // [loanTypes.HOME_LOAN]: homeLoan,
  // [loanTypes.SME_LOAN]: smeLoan,
};




const eligibilityCheck = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {

  const { existingLoans = [], ...eligibilityData } = payload;

  console.log(payload)

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
};





export const EligibilityCheckService = {
  eligibilityCheck,
};
