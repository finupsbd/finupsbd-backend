import { prisma } from "../../../app";
import { TEligibilityCheck } from "./eligibilityCheck.interface";
import { cards } from "./eligibilityCheck/cards";
import { instantLoan } from "./eligibilityCheck/instantLoan";
import { loans } from "./eligibilityCheck/loans";




const eligibilityCheck = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {


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



const cardTypes = ["TRAVEL_CARD", "PREPAID_CARD", "CREDIT_CARD"] as const;

if (eligibilityCheckEntry && cardTypes.includes(eligibilityCheckEntry.loanType as typeof cardTypes[number])) {
  return await cards(eligibilityCheckEntry as unknown  as TEligibilityCheck, query);
}


const loanTypes = ["PERSONAL_LOAN", "HOME_LOAN", "CAR_LOAN", "SME_LOAN"] as const;

if (eligibilityCheckEntry && loanTypes.includes(eligibilityCheckEntry.loanType as typeof loanTypes[number])) {
  return await loans(eligibilityCheckEntry as unknown  as TEligibilityCheck, query);
}


const InstantLoanTypes = ["INSTANT_LOAN"] as const;

if (eligibilityCheckEntry && InstantLoanTypes.includes(eligibilityCheckEntry.loanType as typeof InstantLoanTypes[number])) {
  return await instantLoan(eligibilityCheckEntry as unknown  as TEligibilityCheck, query);
}


  } catch (error) {
    console.log(error)
  }

}


export const EligibilityCheckService = {
  eligibilityCheck,
};