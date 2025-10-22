import { StatusCodes } from "http-status-codes";
import sendResponses from "../../../utils/sendResponce";
import catchAsync from "../../../utils/catchAsync";
import { CreditCardService } from "./creditCard.service";
import { CreditCardValidationSchema } from "./creditCardValidation";
import AppError from "../../../error/AppError";


const createCreditCard = catchAsync(async (req, res) => {
  console.log("req.body", req.body);
  const payload =
   CreditCardValidationSchema.CreditCardSchema.parse(
      JSON.parse(req.body.data)
    );
    const file = req.file;
  if (!file) {
    throw new AppError(StatusCodes.CONFLICT,"Please upload a file")
  }
  const result = await CreditCardService.createCreditCard(
    payload,
    file
  );

  sendResponses(res, {
    success: true,
    message: 'Credit Card Create Successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getAllCreditCard = catchAsync(async (req, res) => {
  const result = await CreditCardService.getAllCreditCard();

  sendResponses(res, {
    success: true,
    message: 'Retrieve All credit cards Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// const updateCreditCard = catchAsync(async (req, res) => {
//   const payload = CreditCardValidationSchema.updateCreditCardValidateSchema.parse(
//     JSON.parse(req.body.data)
//   );
//   const file = req.file?.buffer;
//   const result = await CreditCardService.updateCreditCard(
//     payload as TCreditCard,
//     file,
//     req.params.id
//   );

//   sendResponses(res, {
//     success: true,
//     message: 'Updated Credit Card Info Successfully',
//     statusCode: StatusCodes.OK,
//     data: result,
//   });
// });

export const CreditCardController = {
  createCreditCard,
  getAllCreditCard,
  // updateCreditCard,
};
