import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponses from '../../utils/sendResponce';
import { ApplicationFromService } from './applicationForm.service';

const createApplicationForm = catchAsync(async (req, res) => {

const result = await ApplicationFromService.createApplicationForm(req.body)

  sendResponses(res, {
    success: true,
    message: 'Application Create successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  })
});

const getAllApplicationForm = catchAsync(async (req, res) => {

const result = await ApplicationFromService.getAllApplicationForm()

  sendResponses(res, {
    success: true,
    message: 'Application Create successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  })
});

export const ApplicationController = {
  createApplicationForm,
  getAllApplicationForm
};
