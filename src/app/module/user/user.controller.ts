import { StatusCodes } from "http-status-codes"
import catchAsync from "../../utils/catchAsync"
import { UserServices } from "./user.service"
import sendResponses from "../../utils/sendResponce";



const getAllUsers = catchAsync(async (req, res) => {
    const query = req.query
    const result = await UserServices.getAllUser(query)
    

    sendResponses(res, {
        success: true, 
        message: "retrieve all user  successfully.",
        statusCode: StatusCodes.OK,
        data: result
    })
})




const getSingleUser = catchAsync(async (req, res) => {

    const id = req.params.id
    const result = await UserServices.getSingleUser(id)
    

    sendResponses(res, {
        success: true, 
        message: "retrieve single user successfully.",
        statusCode: StatusCodes.OK,
        data: result
    })
})




  const meProfile = catchAsync(async (req, res) => {
    const user = req.user

    const result = await UserServices.meProfile(user)


    sendResponses(res, {
        success: true, 
        message: "Retrive my Profile Data",
        statusCode: StatusCodes.OK,
        data: result
    })
})



export const UserController = {
    getAllUsers,
    meProfile, 
    getSingleUser
}