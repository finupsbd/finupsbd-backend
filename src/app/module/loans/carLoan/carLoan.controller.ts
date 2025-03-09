import { StatusCodes } from "http-status-codes";
import sendResponses from "../../../utils/sendResponce";

import catchAsync from "../../../utils/catchAsync";
import { CarLoanValidationSchema } from "./carLoanValidation";
import { CarLoanService } from "./carLoan.service";
import { TCarLoan } from "./carLoan.interface";


const createCarLoan = catchAsync(async (req, res) => {
  const payload =
   CarLoanValidationSchema.createCarLoanValidateSchema.parse(
      JSON.parse(req.body.data)
    );
  const file = req.file?.buffer;
  if (!file) {
    throw new Error('Please upload a file');
  }
  const result = await CarLoanService.createCarLoan(
    payload as TCarLoan,
    file
  );

  sendResponses(res, {
    success: true,
    message: 'Car Loan Create Successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getAllCarLoan = catchAsync(async (req, res) => {
  const result = await CarLoanService.getAllCarLoan();

  sendResponses(res, {
    success: true,
    message: 'Retrieve All Car loan Info Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateCarLoan = catchAsync(async (req, res) => {
  const payload = CarLoanValidationSchema.createCarLoanValidateSchema.parse(
    JSON.parse(req.body.data)
  );
  const file = req.file?.buffer;
  const result = await CarLoanService.updateCarLoan(
    payload as TCarLoan,
    file,
    req.params.id
  );

  sendResponses(res, {
    success: true,
    message: 'Retrieve all Car Loan Info Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const CarLoanController = {
  createCarLoan,
  getAllCarLoan,
  updateCarLoan,
};
