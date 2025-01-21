import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { BankInfoService } from "./bank.service";
import { BankValidationSchema } from "./bank.validation";
import { TBank } from "./bank.interface";


const createBankInfo = catchAsync(async(req, res) => {
  const payload = BankValidationSchema.bankInfoValidateSchema.parse(JSON.parse(req.body.data))
  console.log(payload);
  const file = req.file
  if (!file) {
    throw new Error ("Please upload a file")
  }
    const result = await BankInfoService.bankInfo(payload as TBank, file)

    res.status(StatusCodes.CREATED).json({
          success: true,
          message: 'Bank Info Create Successfully',
          statusCode: StatusCodes.CREATED,
          data: result,
        });
}) 

const getallBankInfo = catchAsync(async(req, res) => {

    const result = await BankInfoService.getAllBankInfo()

    res.status(StatusCodes.OK).json({
          success: true,
          message: 'Retrieve All Bank Info Successfully',
          statusCode: StatusCodes.OK,
          data: result,
        });
}) 

const updateBookInfo = catchAsync(async(req, res) => {
  const payload = BankValidationSchema.updateBankInfoValidateSchema.parse(JSON.parse(req.body.data))
  console.log(payload);
  const file = req.file
    const result = await BankInfoService.updateBankInfo(payload as TBank, file, req.params.id)

    res.status(StatusCodes.OK).json({
          success: true,
          message: 'Retrieve All Bank Info Successfully',
          statusCode: StatusCodes.OK,
          data: result,
        });
}) 

export const BankInfoController = {
    createBankInfo,
    getallBankInfo, 
    updateBookInfo
}

