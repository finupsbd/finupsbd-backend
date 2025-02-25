import { TEligibilityCheck } from "../eligibilityCheck.interface";

const homeLoan = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {
    console.log(query);
}

export default homeLoan