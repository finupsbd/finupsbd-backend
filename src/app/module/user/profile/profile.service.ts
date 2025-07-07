/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../../../app";
import { TMiddlewareUser } from "../../../types/commonTypes";
import { sendImageToCloud } from "../../../utils/sendImageToCloud";
import { TUserProfile } from "./profile.interface";

const createProfile = async (
  payload: TUserProfile,
  user: TMiddlewareUser,
  image?: any
): Promise<void> => {
  try {
    if (!user?.userId) {
      throw new Error("Invalid user ID.");
    }

    if (image) {
      const profileImage = await sendImageToCloud(image);
      if (profileImage) {
        payload.avatar = profileImage;
      }
    }

    await prisma.user.update({
      where: { id: user.userId },
      data: {
        profile: {
          upsert: {
            create: { ...payload },
            update: { ...payload },
          },
        },
      },
      include: { profile: true },
    });
  } catch (error) {
    console.error("Failed to create or update profile:", error);
    throw error; // rethrow for better error tracking
  }
};

export const ProfileServices = {
  createProfile,
};
