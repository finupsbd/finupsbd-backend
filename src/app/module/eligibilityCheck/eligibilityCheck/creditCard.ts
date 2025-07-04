/* eslint-disable @typescript-eslint/no-explicit-any */
import { TEligibilityCheck } from "../eligibilityCheck.interface";
import { prisma } from "../../../../app";



// type CreditCardQuery = {
//   currency?: string[];
//   network?: string[];
//   type?: string[];
//   sortKey?: string;
//   sortOrder?: 'asc' | 'desc';
//   page?: number;
// };



export const creditCard = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {


  // const filter: Record<string, any> = {};

  // if (Array.isArray(currency) && currency.length > 0) {
  //   filter.currency = { in: currency };
  // }

  // if (Array.isArray(cardNetwork) && cardNetwork.length > 0) {
  //   filter.network = { in: cardNetwork };
  // }

  // if (Array.isArray(cardType) && cardType.length > 0) {
  //   filter.type = { in: cardType };
  // }


  try {
    const result = await prisma.creditCard.findMany({
      include: {
        eligibilityCreditCard: true,
        featuresCreditCard: true,
        feesChargesCreditCard: true
      }
    })

    console.log(result)

    return result
  } catch (error) {
    console.log(error)
  }
};
