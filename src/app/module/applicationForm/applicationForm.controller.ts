
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponses from '../../utils/sendResponce';
import { ApplicationFromService } from './applicationForm.service';
import { TMiddlewareUser, TMulterFile } from '../../types/commonTypes';
import { uploadBufferToCloudinary } from '../../utils/FilesUploader';
import { prisma } from '../../../app';




const createApplicationForm = catchAsync(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new Error("No files uploaded");
  }
  const files = req.files as Express.Multer.File[]
  const user = req.user as TMiddlewareUser;
  const rawData = req.body.data;

  console.log(JSON.parse(rawData))


  const result = await ApplicationFromService.createApplicationForm(
    JSON.parse(rawData),
    user,
    files
  );

  sendResponses(res, {
    success: true,
    message: 'appliycation form created successfully',
    statusCode: StatusCodes.CREATED,
    data: result
  });
});





const getAllApplicationForm = catchAsync(async (req, res) => {
  const result = await ApplicationFromService.getAllApplicationForm();

  sendResponses(res, {
    success: true,
    message: 'retrive all application successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});






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


const getSingleApplication = catchAsync(async (req, res) => {

  const {id} = req.params;


  const result = await ApplicationFromService.getSingleApplication(id);

  sendResponses(res, {
    success: true,
    message: 'get single application ',
    statusCode: StatusCodes.OK,
    data: result, 
  });
});


const myLoanApplication = catchAsync(async (req, res) => {


const user = req.user as TMiddlewareUser;

  const result = await ApplicationFromService.myLoanApplication(user);

  sendResponses(res, {
    success: true,
    message: 'get my loan application successfully',
    statusCode: StatusCodes.OK,
    data: result, 
  });
});




const applicationTracking = catchAsync(async (req, res) => {
  const result = await ApplicationFromService.applicationTracking(req.body);

  sendResponses(res, {
    success: true,
    message: 'Application track successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

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




////garuantor info update with existing form

const applicantGuarantorInfo = catchAsync(async (req, res) => {

  const files = req.files as TMulterFile[] | undefined;

  const data = req.body.data
  const guarantorData = JSON.parse(data)



  if (!files || files.length === 0) {
    return sendResponses(res, {
      success: false,
      message: 'No guarantor files were uploaded.',
      statusCode: StatusCodes.BAD_REQUEST,
      data: {},
    });
  }

  // 2. Iterate over each file.buffer and upload to Cloudinary
  const uploadPromises = files.map(async (file, idx) => {
    // e.g. “guarantor/20250602_0_originalname”
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-.]/g, '');
    const publicId = `guarantor/${timestamp}_${idx}_${safeName}`;

    // You can set folder:"guarantor" and resource_type:"image" (or "raw" if PDF, etc.)
    const result = await uploadBufferToCloudinary(file.buffer, publicId, {
      folder: 'guarantor',
      resource_type: 'image',
    });

    return {
      originalName: file.originalname,
      public_id: result.public_id,
      secure_url: result.secure_url,
      format: result.format,
      width: result.width,
      height: result.height,
    };
  });

  // 3. Wait for all uploads
  const uploadedFiles = await Promise.all(uploadPromises);

  console.log()


  // const result = await prisma.guarantorInfo.create({
  //   data: {
  //     personalGuarantor: {
  //       ...guarantorData
  //     },
  //     loanApplicationForm: {
  //       connect: { id: "65464654654654654654654654654" }
  //     }
  //   }

  // },
  // )


  // 4. Respond with the Cloudinary URLs / IDs (or save them to your DB here)
  return sendResponses(res, {
    success: true,
    message: 'Guarantor form created successfully',
    statusCode: StatusCodes.CREATED,
    data: {
      uploadedFiles, // array of { originalName, public_id, secure_url, ... }
    },
  });
}
);


export const ApplicationController = {
  createApplicationForm,
  applicantGuarantorInfo,
  getAllApplicationForm,
  // createPersonalInfo,
  // statusUpdate, 
  getSingleApplication,
  applicationTracking,
  applicationForget,
  myLoanApplication
};
