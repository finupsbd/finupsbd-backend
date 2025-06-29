import { prisma } from "../../../../../app"
import { safeUserSelect } from "../../../../utils/prisma/selects";



const getAllApplication = async () => {


  const [applications, total] = await Promise.all([
    prisma.loanApplicationForm.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        eligibleLoanOffer: {
          select: {
            eligibleLoan: true,
            bankName: true,
            loanType: true,
          },
        },
        loanRequest: {
          select: {
            loanAmount: true,
          },
        },
      },
      take: 10,
      orderBy: {
        createdAt: "desc"
      }
    }),
    prisma.loanApplicationForm.count()
  ]);

  console.log(total)

  return applications
};





const getSingleApplication = async (id: string) => {


  const result = prisma.loanApplicationForm.findUnique({
    where: { id },
    include: {
      personalInfo: true,
      user: { select: safeUserSelect },
      guarantorInfo: true,
      loanInfo: {
        include: {
          bankAccounts: true,
          creditCards: true,
          existingLoans: true,
        }
      },
      eligibleLoanOffer: true,
      employmentInformation: {
        include: {
          properties: true
        }
      },
      loanRequest: true,
      document: true,
      residentialInformation: true,
      personalGuarantor: {
        include: {
          document: true
        }
      },
      businessGuarantor: {
        include: {
          document: true
        }
      },
    },
  })


  return result
};






export const ApplicationServides = {
  getAllApplication,
  getSingleApplication
}