import { prisma } from "../../../../../app"



const getAllusers = async () => {
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
        userId: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
        lastLogin: true,
        profile: {
          select: { avatar: true }
        }
      },
      orderBy: { createdAt: "desc" } // optional sorting
    }),
    prisma.user.count()
  ]);

  return {
    total,
    users,
  }
};


const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique(
    { where: { id }, 
    include: {
      profile: true,
      
    },
    
  }

)

  return result
};



export const DashboardUserasServides = {

  getAllusers,
  getSingleUser
}

