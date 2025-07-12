import { prisma } from "../../../../../app"
import { decrypt } from "../../../../utils/encryption";
import { safeUserSelect } from "../../../../utils/prisma/selects";
import { LoanStatus } from "../../../applicationForm/application.interface";



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


  const result = await prisma.loanApplicationForm.findUnique({
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

  result?.loanInfo?.bankAccounts.map(bank => {
    return bank.accountNumber = decrypt(bank.accountNumber)
  })


  return result
};

const applicationFeedback = async (id: string, payload: { status: LoanStatus, adminNote: string }) => {

  console.log(id, payload)
  // const result = prisma.loanApplicationForm.findUnique({
  //   where: { id },
  //   include: {
  //     personalInfo: true,
  //     user: { select: safeUserSelect },
  //     guarantorInfo: true,
  //     loanInfo: {
  //       include: {
  //         bankAccounts: true,
  //         creditCards: true,
  //         existingLoans: true,
  //       }
  //     },
  //     eligibleLoanOffer: true,
  //     employmentInformation: {
  //       include: {
  //         properties: true
  //       }
  //     },
  //     loanRequest: true,
  //     document: true,
  //     residentialInformation: true,
  //     personalGuarantor: {
  //       include: {
  //         document: true
  //       }
  //     },
  //     businessGuarantor: {
  //       include: {
  //         document: true
  //       }
  //     },
  //   },
  // })
  if (payload.status == "REJECTED") {
    await prisma.loanApplicationForm.update({
      where: { id },
      data: {
        status: payload.status,
        isActive: false
      }
    })
    return {}
  } else {
    const result = await prisma.loanApplicationForm.update({
      where: { id },
      data: {
        status: payload.status,
        adminNotes: payload.adminNote
      },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    })

    return result
  }
};






export const ApplicationServides = {
  getAllApplication,
  getSingleApplication,
  applicationFeedback
}