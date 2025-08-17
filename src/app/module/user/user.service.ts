/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import AppError from '../../error/AppError';
import { TUploadedFile } from '../../types/commonTypes';
import { saveFileAdditional } from '../../utils/file-uploads/saveFileAdditional';


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
    },

  });

  console.log({ result })
  if (!result) throw new Error("User not found");
  return result;
};

const getAllNewLoans = async (id: string) => {

  const result = await prisma.loanApplicationForm.findMany({
    where: {
      user: {
        id: id
      },
      status: {
        in: ['SUBMITTED', 'IN_PROGRESS', 'PENDING']
      }
    },
    include: {
      eligibleLoanOffer: true,
      loanRequest: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })



  return result

};

const getAllExistingLoans = async (id: string) => {

  const result = await prisma.loanApplicationForm.findMany({
    where: {
      user: {
        id: id
      },
      status: {
        in: ["APPROVED"]
      }
    },
    include: {
      eligibleLoanOffer: true,
      loanRequest: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return result

};



const getApplication = async (id: string) => {

  const result = await prisma.loanApplicationForm.findUnique(
    {
      where: { id }
    })

  console.log(result)

  return result

};

const createAdiDoc = async (id: string, files: TUploadedFile[]) => {

  const isExistApplication = await prisma.loanApplicationForm.findUnique({ where: { id } })

  if (!isExistApplication) {
    throw new AppError(StatusCodes.NOT_FOUND, "Application not found")
  }



  try {
    // Save files locally instead of uploading to Cloudinary
    const savedDocuments: {
      filePath: string;
      originalName: string;
      mimeType: string;
    }[] = [];

    const images: TUploadedFile[] = files


    for (const file of images) {

      try {
        const savedPath = await saveFileAdditional(file.buffer, file.originalname, isExistApplication?.applicationId); // or file.originalname
        savedDocuments.push({
          filePath: savedPath,
          originalName: file.originalname,
          mimeType: file.mimetype,
        });
      } catch (err) {
        console.error(`Failed to save file ${file.fieldname}:`, err);
      }
    }


    console.log(savedDocuments)


    const uploadFileIntoDb = await prisma.additionalDocument.createMany({
      data: savedDocuments.map((doc) => ({
        url: doc.filePath,
        originalName: doc.originalName,
        mimeType: doc.mimeType,
        loanApplicationFormId: id,
      })),
    });
  
    if(uploadFileIntoDb.count > 0){
      await prisma.loanApplicationForm.update({
        where: {id}, 
        data: {
          status: "SUBMITTED",
          additionalDocumentSubmit: true,
          additionalDocuments: false
        }
      })

    }



  

    // const result = prisma.loanApplicationForm.create({
    //   data: {
    //     additionalDocument: {
    //       create: savedDocuments.map((doc) => ({
    //         // save relative path for easier serving
    //         url: doc.filePath,
    //         originalName: doc.originalName,
    //         mimeType: doc.mimeType,
    //       })),
    //     },
    //   }
    // })



  } catch (err) {
    console.error(`Failed to save file :`, err);
  }
}







export const UserServices = {
  getAllUser,
  meProfile,
  getSingleUser,
  getAllNewLoans,
  getAllExistingLoans,
  getApplication,
  createAdiDoc
};
