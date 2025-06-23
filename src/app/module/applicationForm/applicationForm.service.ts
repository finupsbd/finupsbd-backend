/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from '../../../app';
import AppError from '../../error/AppError';
import { TLoanApplicationForm } from '../../module/applicationForm/application.interface';
import { TMiddlewareUser, TUploadedFile } from '../../types/commonTypes';
import { generateApplicationId } from '../../utils/generateApplicationId';
import uploadBufferToCloudinary from '../../utils/loanApplicationDocumentUpload';



const createApplicationForm = async (payload: TLoanApplicationForm, user: TMiddlewareUser, files: TUploadedFile[]) => {
  const cloudinaryResults: { url: any; originalName: string; mimeType: string; }[] = [];
  const filesObj = files as unknown as { [fieldname: string]: Express.Multer.File[] };
  const filesArray: Express.Multer.File[] = Object.values(filesObj).flat();



  for (const file of filesArray) {
    const uploaded = await uploadBufferToCloudinary(file.buffer, file.originalname, file.mimetype);
    cloudinaryResults.push({
      url: uploaded.secure_url,
      originalName: file.originalname,
      mimeType: file.mimetype,
    });
  }

  const applicationId = await generateApplicationId();

  const gurantorInfo = {
    businessGurantorEmail: payload?.guarantorInfo?.businessGuarantor?.emailAddress ?? '',
    businessGurantorPhone: payload?.guarantorInfo?.businessGuarantor?.mobileNumber ?? '',
    personalGurantorEmail: payload?.guarantorInfo?.personalGuarantor?.emailAddress ?? '',
    personalGurantorphone: payload?.guarantorInfo?.personalGuarantor?.mobileNumber ?? ''
  }


  // Begin Transaction
  const result = await prisma.$transaction(async (tx) => {
    const createdApplication = await tx.loanApplicationForm.create({
      data: {
        applicationId,
        userId: user.userId,
        personalInfo: {
          create: payload.personalInfo,
        },
        residentialInformation: {
          create: payload.residentialInfo,
        },
        // employmentInformation: {
        //   create: payload.employmentInfo,
        // },
        loanInfo: {
          create: {
            hasCreditCard: payload?.loanInfo?.hasCreditCard ?? false,
            hasExistingLoan: payload?.loanInfo?.hasExistingLoan ?? false,
            bankAccounts: {
              create: payload?.loanInfo?.bankAccounts,
            },
            creditCards: {
              create: payload?.loanInfo?.creditCards,
            },
            existingLoans: {
              create: payload?.loanInfo?.existingLoans,
            },
          },
        },
        loanRequest: {
          create: payload.loanRequest,
        },
        GuarantorInfo: {
          create: gurantorInfo
        },
        Document: {
          create: cloudinaryResults.map(doc => ({
            url: doc.url,
            originalName: doc.originalName,
            mimeType: doc.mimeType,
          })),
        }
      }
    });


    return createdApplication;
  }, {
    maxWait: 10000, // Max wait time in ms before giving up acquiring a transaction
    timeout: 15000  // Total allowed time for the transaction to finish (in ms)
  });

  return result;
};



const myLoanApplication = async (user: TMiddlewareUser) => {
  const { userId } = user

  const result = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      LoanApplicationForm: {
        include: {
          personalInfo: true,
          loanInfo: true,
          Document: true,
          loanRequest: true,
          employmentInformation: true,
          EligibleLoanOffer: true,
          GuarantorInfo: true,
          residentialInformation: true
        }
      }
    }
  })

  console.log(result)

  return result

}





const getAllApplicationForm = async () => {
  const result = await prisma.loanApplicationForm.findMany({
    include: {
      personalInfo: true,
      user: true,
      GuarantorInfo: true,
      loanInfo: true,
      EligibleLoanOffer: true,
      employmentInformation: true,
      loanRequest: true,
      Document: true,
      residentialInformation: true
    }
  })

  return result;
};




// const updateStatus = async (id: string, payload: {status: LoanStatus, adminNotes: string}) => {
// console.log(payload)
//   const result = await prisma.loanApplicationForm.update({
//     where: {id}, 
//     data: {
//       status: payload.status, 
//       adminNotes: payload.adminNotes,
//     },
//     include: {
//       user: true
//     }

//   })

//   return result;
// }
const getSingleApplication = async (id: string) => {

  const result = await prisma.loanApplicationForm.findFirst({
    where: { id },
    include: {
      residentialInformation: true
    }

  })

  return result;
}

const applicationTracking = async (payload: {
  applicationId: string;
  phone: string;
}) => {
  console.log(payload);
  const result = await prisma.loanApplicationForm.findFirst({
    where: {
      applicationId: payload.applicationId,
      user: {
        phone: payload.phone,
      },
    },
    select: {
      status: true,
      adminNotes: true,
      applicationId: true,
      loanRequest: true,
      user: {
        select: {
          name: true,
          userId: true,
          profile: true,
        },
      },
    },
  });

  if (!result) {
    throw new AppError(404, 'Application not found please enter valid Phone and Application ID'
    );
  }

  return result;
};

// const applicationForget = async (payload: { email: string; phone: string }) => {
//   const result = await prisma.user.findFirst({
//     where: {
//       phone: payload.phone,
//     },
//     include: {
//       ApplicationForm: {
//         select: {
//           applicationId: true,
//           loanSpecifications: {
//             select: {
//               loanType: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   if (
//     !result ||
//     !result.ApplicationForm ||
//     result.ApplicationForm.length === 0
//   ) {
//     throw new AppError(404, 'No application found for this user.');
//   }

//   // Prepare application details for email
//   const applications = result.ApplicationForm.map((app) => ({
//     applicationId: app.applicationId,
//     loanType: app.loanSpecifications?.loanType || 'Unknown',
//   }));

//   const applicationDetails = applications
//     .map(
//       (app) =>
//         `<li><strong>Application ID:</strong> ${app.applicationId}, <strong>Loan Type:</strong> ${app.loanType}</li>`
//     )
//     .join('');
//   console.log(applicationDetails);
//   const subject = 'Your Application ID';
//   const html = `
//   <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
//     <div style="text-align: center; background-color: #28a745; color: #ffffff; padding: 15px 0; border-radius: 8px 8px 0 0;">
//       <h2 style="margin: 0; font-size: 20px;">FinupsBD</h2>
//       <p style="margin: 0; font-size: 14px;">Helping you achieve your financial goals</p>
//     </div>
//     <p style="font-size: 16px; font-weight: bold; color: #444;">Dear ${result?.name},</p>
//     <p style="font-size: 14px; color: #555;">
//       Thank you for submitting your application. We have successfully received your details, and they are now under review. Below are the details of your application:
//     </p>
//     <ul style="font-size: 14px; color: #444; padding-left: 20px; list-style-type: disc;">
//       ${applicationDetails}
//     </ul>
//     <p style="font-size: 14px; color: #555;">
//       If you have any questions or need further assistance, please don't hesitate to contact our support team at 
//       <a href="mailto:finupsbd@gmail.com" style="color: #28a745; text-decoration: underline; font-weight: bold;">finupsbd@gmail.com</a>.
//     </p>
//     <p style="font-size: 14px; color: #555;">
//       We appreciate your trust in us and look forward to serving you.
//     </p>
//     <p style="font-size: 14px; color: #555;">Best regards,</p>
//     <p style="font-size: 16px; font-weight: bold; color: #28a745;">FinupsBD Team</p>
//     <footer style="margin-top: 20px; background-color: #f4f4f4; padding: 10px; border-radius: 8px; text-align: center; font-size: 12px; color: #777;">
//       <p style="margin: 0;">© 2025 FinupsBD. All rights reserved.</p>
//     </footer>
//   </div>
// `;


//   await sendEmail(result.email, subject, html);

//   const maskedPhoneNumber = maskMobileNumber(result.phone)
//   const userEmail = result.email
//   // const maskedEmailAddress =  maskMobileNumber(result.email)


//   return {
//     maskedPhoneNumber,
//     userEmail
//   };
// };





export const ApplicationFromService = {
  createApplicationForm,
  getAllApplicationForm,
  // updateStatus, 
  getSingleApplication,
  applicationTracking,
  // applicationForget, 
  myLoanApplication
};
