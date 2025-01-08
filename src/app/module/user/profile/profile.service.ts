/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from '../../../../app';

const createProfile = async (payload: any, user: any) => {
  const { userId } = user;
  console.log(userId);
  const existingProfile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (existingProfile) {
    // Update the profile if it exists
    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: payload,
    });
    return updatedProfile;
  }

  const newProfile = await prisma.profile.create({
    data: payload,
  });

  return newProfile;
};



export const ProfileServices = {
  createProfile,
};
