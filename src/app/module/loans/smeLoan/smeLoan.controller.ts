import { StatusCodes } from "http-status-codes";
import sendResponses from "../../../utils/sendResponce";
import catchAsync from "../../../utils/catchAsync";
import { SMELoanValidationSchema } from "./smeLoanValidation";
import { SMELoanService } from "./smeLoan.service";
import { TSMELoan } from "./smeLoan.interface";



const createSMELoan = catchAsync(async (req, res) => {
  const payload =
   SMELoanValidationSchema.createSMELoanValidateSchema.parse(
      JSON.parse(req.body.data)
    );
  const file = req.file?.buffer;
  if (!file) {
    throw new Error('Please upload a file');
  }
  const result = await SMELoanService.createSMELoan(
    payload as TSMELoan,
    file
  );

  sendResponses(res, {
    success: true,
    message: 'SME Loan Create Successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getAllSMELoan = catchAsync(async (req, res) => {
  const result = await SMELoanService.getAllSMELoan();

  sendResponses(res, {
    success: true,
    message: 'Retrieve All SME loan Info Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateSMELoan = catchAsync(async (req, res) => {
  const payload = SMELoanValidationSchema.createSMELoanValidateSchema.parse(
    JSON.parse(req.body.data)
  );
  const file = req.file?.buffer;
  const result = await SMELoanService.updateSMELoan(
    payload as TSMELoan,
    file,
    req.params.id
  );

  sendResponses(res, {
    success: true,
    message: 'Retrieve all SME Loan Info Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const SMELoanController = {
  createSMELoan,
  getAllSMELoan,
  updateSMELoan,
};
