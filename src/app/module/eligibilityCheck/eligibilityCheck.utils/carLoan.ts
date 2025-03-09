/* eslint-disable @typescript-eslint/no-explicit-any */

import { checkEligibilityWithLoanDetails } from "../utils/checkEligibility";




// type TCarLoan = {
//   amount: number;
//   periodMonths: number;
//   income: number;
//   creditScore: number;
// };




  
  export const carLoan = async (payload: any, query: Record<string, unknown>) => {

       
    const result = checkEligibilityWithLoanDetails(payload, 12000, 12);
    console.log(result)


    return result
  }
