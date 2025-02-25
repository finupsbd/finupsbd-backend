import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { EligibilityCheckService } from "./eligibilityCheck.service";
import sendResponses from "../../utils/sendResponce";




const eligibilityCheck = catchAsync(async(req, res)=> {


    const query = req.query
    const result = await EligibilityCheckService.eligibilityCheck(req.body, query); 
 

    sendResponses(res, {
        success: true,
        message: 'Your Eligibility check successfully',
        statusCode: StatusCodes.OK,
        data: result ,
      });
})

export const EligibilityCheckController = {
    eligibilityCheck,
}