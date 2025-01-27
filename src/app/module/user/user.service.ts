/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../../app';

const getAllUser = async () => {
  const result = await prisma.user.findMany({
    include: {
      profile: true
    }
  });

  return result;
};

const meProfile = async (user: any) => {
  const result = await prisma.user.findFirst({
    where: {email: user?.email as string},
    select: {
      name: true, 
      email: true, 
      phone: true,
      role: true, 
      profile: true,
    },

  });
  if (!result) throw new Error("User not found");
  return result;
};

export const UserServices = {
  getAllUser,
  meProfile,
};
