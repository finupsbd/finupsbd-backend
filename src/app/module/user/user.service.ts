import { prisma } from '../../../app';

const getAllUser = async () => {
  const result = await prisma.user.findMany();

  return result;
};

const meProfile = async (user: Record<string, unknown> | undefined) => {
  const result = await prisma.user.findUnique({
    where: {email: user?.email as string},
    select: {
      name: true, 
      email: true, 
      phone: true,
      role: true 
    }
  });

  return result;
};

export const UserServices = {
  getAllUser,
  meProfile,
};
