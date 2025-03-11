/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../../../app";
import { sendImageToCloud } from "../../../utils/sendImageToCloud";
import { TUserProfile } from "./profile.interface";



const createProfile = async (payload: TUserProfile, user: any, image: any) => {

  const profileImage = await sendImageToCloud(image)
  payload.avatar = profileImage ?? undefined;




  const result = await prisma.user.update({
    where: { id: user?.userId },
    data: {
      profile: {
        upsert: {
          create: {
            ...payload
          },
          update: {
            ...payload
          }
        }
      }
    },
    include: {
      profile: true
    }
  })

  console.log(result)



};




export const ProfileServices = {
  createProfile,
};
