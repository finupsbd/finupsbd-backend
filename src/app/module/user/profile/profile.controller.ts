import { StatusCodes } from "http-status-codes"
import catchAsync from "../../../utils/catchAsync"
import { ProfileServices } from "./profile.service";

const createProfile = catchAsync(async (req, res) => {
    const user = req.user
    const profileInfo = req.body
    const result = await ProfileServices.createProfile(profileInfo, user)
    res.status(StatusCodes.OK).json({
        success: true, 
        message: "Profile create successfully",
        statusCode: StatusCodes.OK,
        data: result
    })
})



export const ProfileController = {
    createProfile
}