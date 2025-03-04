import { StatusCodes } from "http-status-codes";
import sendResponses from "../../../utils/sendResponce";

import catchAsync from "../../../utils/catchAsync";
import { HomeLoanService } from "./homelLoan.service";
import { HomeLoanValidationSchema } from "./homeLoanValidation";
import { THomeLoan } from "./homeLoan.interface";


const createHomeLoan = catchAsync(async (req, res) => {
  const payload =
   HomeLoanValidationSchema.createHomeLoanValidateSchema.parse(
      JSON.parse(req.body.data)
    );
  const file = req.file;
  if (!file) {
    throw new Error('Please upload a file');
  }
  const result = await HomeLoanService.createHomeLoan(
    payload as THomeLoan,
    file
  );

  sendResponses(res, {
    success: true,
    message: 'Personal Loan Create Successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getAllHomeLoan = catchAsync(async (req, res) => {
  const result = await HomeLoanService.getAllHomeLoan();

  sendResponses(res, {
    success: true,
    message: 'Retrieve All Bank Info Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateHomeLoan = catchAsync(async (req, res) => {
  const payload = HomeLoanValidationSchema.createHomeLoanValidateSchema.parse(
    JSON.parse(req.body.data)
  );
  const file = req.file;
  const result = await HomeLoanService.updateHomeLoan(
    payload as THomeLoan,
    file,
    req.params.id
  );

  sendResponses(res, {
    success: true,
    message: 'Retrieve all Personal Loan Info Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const HomeLoanController = {
  createHomeLoan,
  getAllHomeLoan,
  updateHomeLoan,
};
