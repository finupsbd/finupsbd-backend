import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import AppError from '../../error/AppError';
import { TFullApplicationForm } from './application.interface';
import { userInfo } from 'os';

const createApplicationForm = async (payload: TFullApplicationForm) => {
  const existingForm = await prisma.applicationForm.findUnique({
    where: { applicationId: payload.applicationId },
  });

  if (existingForm) {
    throw new AppError(
      StatusCodes.BAD_GATEWAY,
      `ApplicationForm with ID ${payload.applicationId} already exists.`
    );
  }
  console.log(payload);
  const result = await prisma.applicationForm.create({
    data: {
      applicationId: payload.applicationId,
      userId: payload.userId,
      userInfo: {
        create: payload.userInfo,
      },
      address: {
        create: payload.address,
      },
      employmentFinancialInfo: {
        create: payload.employmentFinancialInfo,
      },
      loanSpecifications: {
        create: payload.loanSpecifications,
      },
      financialObligations: {
        createMany: { data: payload.financialObligations },
      },
      uploadedDocuments: {
        createMany: { data: payload.uploadedDocuments },
      },
    },
  });

  return result;
};

const getAllApplicationForm = async () => {
  const result = await prisma.applicationForm.findMany({
    include: {
      User: true, 
      address: true, 
      employmentFinancialInfo: true, 
      financialObligations: true, 
      loanSpecifications: true, 
      uploadedDocuments: true 
    }
  });

  return result;
};

export const ApplicationFromService = {
  createApplicationForm,
  getAllApplicationForm,
};
