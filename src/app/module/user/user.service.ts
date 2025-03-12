/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../../app';


type FilterParams = {
  searchTerm?: boolean;
  role?: string;
  status?: string;
  skip?: number;
  take?: number;
};


const getAllUser = async (query: FilterParams) => {
  try {
    const conditions: any[] = [];

    // Apply role filter if provided.
    if (query.role) {
      conditions.push({ role: query.role });
    }

    // Apply status filter if provided.
    if (query.status) {
      conditions.push({ status: query.status });
    }

    // Use searchTerm as a boolean flag.
    // For demonstration, if searchTerm is true, include users with a non-empty name.
    if (query.searchTerm) {
      conditions.push({ name: { not: "" } });
    }

    // Combine conditions if any filters are applied.
    const whereClause = conditions.length > 0 ? { AND: conditions } : {};

    // Set pagination parameters; defaults: skip = 0, take = 10.
    const skip = query.skip ?? 0;
    const take = query.take ?? 10;

    // Query the database including the user's profile.
    const data = await prisma.user.findMany({
      where: whereClause,
      include: {
        profile: true,
      },
      skip,
      take,
    });

    // Count the total records matching the filters.
    const totalCount = await prisma.user.count({
      where: whereClause,
    });

    // Return the data along with pagination status.
    return {
      data,
      pagination: {
        skip,
        take,
        totalCount,
        currentPage: Math.floor(skip / take) + 1,
        totalPages: Math.ceil(totalCount / take),
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users");
  }
};







const getSingleUser = async (id: string) => {

  const result = await prisma.user.findUnique({
    where: { id },
    include: {
      profile: true
    }
  });

  return result;
};







const meProfile = async (user: any) => {


  console.log(user)
  const result = await prisma.user.findFirst({
    where: { email: user?.email as string },
    select: {
      name: true,
      email: true,
      phone: true,
      role: true,
      profile: true,
      isActive: true,
      emailVerified: true,
      ApplicationForm: {
        include: {
          User: true,
        }
      }
    },

  });
  if (!result) throw new Error("User not found");
  return result;
};







export const UserServices = {
  getAllUser,
  meProfile,
  getSingleUser
};
