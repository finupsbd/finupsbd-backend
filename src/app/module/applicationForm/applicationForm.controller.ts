
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponses from '../../utils/sendResponce';
import { ApplicationFromService } from './applicationForm.service';
import { TMiddlewareUser } from '../../types/commonTypes';
import { sendImageToCloud } from '../../utils/sendImageToCloud';



const createApplicationForm = catchAsync(async (req, res) => {

  // if (!req.files) {
  //   throw new Error('No files were uploaded');
  // }

  // const saveImage = files.images?.map( async (file: any) => {
  //   return await sendImageToCloud(file.buffer)
  // })

  const user = req.user as TMiddlewareUser;
  const result = await ApplicationFromService.createApplicationForm(
    req.body,
    user
  );

  sendResponses(res, {
    success: true,
    message: 'appliycation form created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});






// const getAllApplicationForm = catchAsync(async (req, res) => {
//   const result = await ApplicationFromService.getAllApplicationForm();

//   sendResponses(res, {
//     success: true,
//     message: 'retrive all application successfully',
//     statusCode: StatusCodes.CREATED,
//     data: result,
//   });
// });

// const createPersonalInfo = catchAsync(async (req, res) => {
//   const user = req.user as TMiddlewareUser;

//   const result = await ApplicationFromService.createPersonalInfo(req.body, user);

//   sendResponses(res, {
//     success: true,
//     message: 'Application Personal info update successfully',
//     statusCode: StatusCodes.CREATED,
//     data: result,
//   });
// });








// const statusUpdate = catchAsync(async (req, res) => {

//   const {id} = req.params;

//   const result = await ApplicationFromService.updateStatus(id, req.body);

//   sendResponses(res, {
//     success: true,
//     message: 'Application Create successfully',
//     statusCode: StatusCodes.CREATED,
//     data: result, 
//   });
// });

// const getSingleApplication = catchAsync(async (req, res) => {

//   const {id} = req.params;

//   const result = await ApplicationFromService.getSingleApplication(id);

//   sendResponses(res, {
//     success: true,
//     message: 'Application Create successfully',
//     statusCode: StatusCodes.CREATED,
//     data: result, 
//   });
// });




// const applicationTracking = catchAsync(async (req, res) => {
//   const result = await ApplicationFromService.applicationTracking(req.body);

//   sendResponses(res, {
//     success: true,
//     message: 'Application track successfully',
//     statusCode: StatusCodes.OK,
//     data: result,
//   });
// });

const applicationForget = catchAsync(async (req, res) => {
  // const result = await ApplicationFromService.applicationForget(req.body);
  console.log(req.body)
  sendResponses(res, {
    success: true,
    // message: `We have sent your tracking ID to your registered Email: ${result.userEmail} Mobile Number +88${result.maskedPhoneNumber}`,
    message: `We have sent your tracking ID to your registered Email: ..........`,
    statusCode: StatusCodes.OK,
    data: {},
  });
});

export const ApplicationController = {
  createApplicationForm,
  // getAllApplicationForm,
  // createPersonalInfo,
  // statusUpdate, 
  // getSingleApplication,
  // applicationTracking,
  applicationForget,
};
