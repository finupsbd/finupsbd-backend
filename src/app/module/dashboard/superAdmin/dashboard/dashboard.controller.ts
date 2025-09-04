import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../../utils/catchAsync";
import sendResponses from "../../../../utils/sendResponce";
import { DashboardServides } from "./dashboard.service";




const getDashboardHone = catchAsync(async (req, res) => {


  const result = await DashboardServides.dashboardHome()

  sendResponses(res, {
    success: true,
    message: 'Retrive dashboard home data',
    statusCode: StatusCodes.OK,
    data: result
  });
})


export const DashboardController = {
  getDashboardHone,
}