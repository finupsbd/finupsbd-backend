
import { TEligibilityCheck } from "./eligibilityCheck.interface";
import personalLoan from "./eligibilityCheck.utils/personalLoan";
import { loanTypes } from "./eligibilityCheck.constant";
import homeLoan from "./eligibilityCheck.utils/homeLoan";



const eligibilityCheck = async(payload: TEligibilityCheck, query: Record<string, unknown>) => {

;

  console.log(payload)
    if(payload.loanTypesMain === loanTypes.PERSONAL_LOAN){
      return await personalLoan(payload, query) 
    }

    if(payload.loanTypesMain === loanTypes.HOME_LOAN){
      return await homeLoan(payload, query) 
    }

}  



export const EligibilityCheckService = {
    eligibilityCheck,
}