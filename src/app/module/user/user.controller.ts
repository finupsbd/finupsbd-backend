import { StatusCodes } from "http-status-codes"
import catchAsync from "../../utils/catchAsync"
import { UserServices } from "./user.service"



const getAllUsers = catchAsync(async (req, res) => {
    console.log(req.cookies);
    const result = await UserServices.getAllUser()
    
    res.status(StatusCodes.OK).json({
        success: true, 
        message: " retrieve all user  successfully.",
        statusCode: StatusCodes.OK,
        data: result
    })
})




  const meProfile = catchAsync(async (req, res) => {
    const user = req.user
    const result = await UserServices.meProfile(user)
    
    res.status(StatusCodes.OK).json({
        success: true, 
        message: "User login successfully",
        statusCode: StatusCodes.OK,
        data: result
    })
})



export const UserController = {
    getAllUsers,
    meProfile
}