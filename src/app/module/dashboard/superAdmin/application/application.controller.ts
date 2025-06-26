import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../../utils/catchAsync";
import sendResponses from "../../../../utils/sendResponce";
import { ApplicationServides } from "./application.service";



const getAllApplication = catchAsync(async (req, res) => {

    

    const result = await ApplicationServides.getAllApplication()

     sendResponses(res, {
        success: true,
        message: 'Retrive all application',
        statusCode: StatusCodes.OK,
        data: result
      });
})


export const ApplicarionController = {
    getAllApplication,
}