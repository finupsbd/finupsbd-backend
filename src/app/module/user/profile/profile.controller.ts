import { StatusCodes } from "http-status-codes"
import catchAsync from "../../../utils/catchAsync"
import { ProfileServices } from "./profile.service";
import sendResponses from "../../../utils/sendResponce";
import { sendImageToCloud } from "../../../utils/sendImageToCloud";

const createProfile = catchAsync(async (req, res) => {

    const image = req.file?.buffer
    const user = req.user
    const profileInfo = JSON.parse(req.body.data)
    console.log(profileInfo)
    const result = await ProfileServices.createProfile(profileInfo, user, image)


    
    sendResponses(res, {
        success: true, 
        message: "Profile create successfully",
        statusCode: StatusCodes.OK,
        data: result
    })
})



export const ProfileController = {
    createProfile
}