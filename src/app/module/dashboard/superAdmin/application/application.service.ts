import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../../../app"
import AppError from "../../../../error/AppError";
import { decrypt } from "../../../../utils/encryption";
import { safeUserSelect } from "../../../../utils/prisma/selects";
import { LoanStatus } from "../../../applicationForm/application.interface";
import sendEmail from "../../../../utils/sendEmail";
import { applicationRejected } from "../../../../utils/email-template/applicationRejected";
import { loanStatusEmail } from "../../../../utils/email-template/loanStatusEmail";




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
      additionalDocument: true,
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



const applicationFeedback = async (
  id: string,
  payload: { status: LoanStatus; adminNote: string; additionalDocuments: boolean },
  adminId?: string // pass the admin user id (or role)
) => {
  console.log(id, payload);

  const result = await prisma.loanApplicationForm.findUnique({
    where: { id },
    include: {
      user: {
        select: { email: true, name: true, userId: true }
      }
    }
  });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Application not found");
  }

  // Store old status before update
  const previousStatus = result.status;

  let updated;
  if (payload.status === "REJECTED") {
    updated = await prisma.loanApplicationForm.update({
      where: { id },
      data: {
        status: payload.status,
        adminNotes: payload.adminNote,
        additionalDocuments: payload.additionalDocuments,
        isActive: false
      }
    });

    // Log to ApplicationEvent
    await prisma.applicationEvent.create({
      data: {
        applicationId: id,
        eventType: "STATUS_CHANGED",
        stateBefore: previousStatus,
        stateAfter: payload.status,
        feedback: payload.adminNote,
        severity: "ERROR",
        createdRole: "SUPER_ADMIN"
      }
    });

    // Email
    const emailSubject = "Loan Application Status: REJECTED";
    const bodyText = applicationRejected(
      result?.user?.name ?? "",
      result?.applicationId ?? "",
      payload?.adminNote ?? ""
    );
    await sendEmail(result?.user?.email, emailSubject, bodyText);

    return "Email Sent Successfully";
  } else {
    updated = await prisma.loanApplicationForm.update({
      where: { id },
      data: {
        status: payload.status,
        additionalDocuments: payload.additionalDocuments,
        adminNotes: payload.adminNote,
        isActive: true
      },
      include: {
        user: {
          select: { email: true, name: true }
        }
      }
    });

    // Log to ApplicationEvent
    await prisma.applicationEvent.create({
      data: {
        applicationId: id,
        eventType: "STATUS_CHANGED",
        stateBefore: previousStatus,
        stateAfter: payload.status,
        feedback: payload.adminNote,
        severity: "INFO",
        createdRole: "SUPER_ADMIN"
      }
    });

    // Email
    const emailSubject = "Loan Application Status Update";
    const templatePayload = {
      name: updated?.user?.name ?? "",
      applicationID: updated?.applicationId ?? "",
      status: updated?.status ?? "",
      reason: payload?.adminNote ?? ""
    };
    const bodyText = loanStatusEmail(templatePayload);
    await sendEmail(updated?.user?.email, emailSubject, bodyText);

    return "Email Sent Successfully";
  }
};



const dashboardHome = async () => {

  // Define time ranges
  const startOfThisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const startOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
  const endOfLastMonth = new Date(startOfThisMonth.getTime() - 1); // last day of last month


  // Users
  const usersThisMonth = await prisma.user.count({
    where: { createdAt: { gte: startOfThisMonth } },
  });

  const usersLastMonth = await prisma.user.count({
    where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
  });


  // Applications
  const applicationsThisMonth = await prisma.loanApplicationForm.count({
    where: { createdAt: { gte: startOfThisMonth } },
  });
  const applicationsLastMonth = await prisma.loanApplicationForm.count({
    where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
  });





  // Growth formula
  const calcGrowth = (prev: number, current: number) => {
    if (prev === 0 && current > 0) return "+100%"; // avoid divide-by-zero
    if (prev === 0 && current === 0) return "0%";

    const growth = ((current - prev) / prev) * 100;
    return (growth < 0 ? 0 : growth).toFixed(2) + "%";
  };

  const userGrowth = calcGrowth(usersLastMonth, usersThisMonth);
  const applicantGrowth = calcGrowth(applicationsLastMonth, applicationsThisMonth);


  const totalUsers = await prisma.user.count()
  const totalApplications = await prisma.loanApplicationForm.count()


  const last5Application = await prisma.loanApplicationForm.findMany({
    orderBy: {
      createdAt: "desc"
    },
    take: 5,
    select: {
      status: true,
      applicationId: true,
      user: {
        select: {
          name: true
        }
      }
    },
  })



  console.log(userGrowth, applicantGrowth)

  return {
    totalUsers,
    totalApplications,
    userGrowth,
    applicantGrowth,
    last5Application
  }
}



const getAllusers = async () => {
  return "user"
}


const getStatusEvents = async (id: string) => {

  const result = await prisma.applicationEvent.findMany({
    where: { 
      applicationId: id, 
      eventType: "STATUS_CHANGED"
    },
    
    orderBy: {
      createdAt: "desc"
    }, 
  })

  return result
}






export const ApplicationServides = {
  getAllApplication,
  getSingleApplication,
  applicationFeedback,
  dashboardHome,
  getAllusers,
  getStatusEvents
}