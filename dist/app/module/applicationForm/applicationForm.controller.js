"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponce_1 = __importDefault(require("../../utils/sendResponce"));
const applicationForm_service_1 = require("./applicationForm.service");
const FilesUploader_1 = require("../../utils/FilesUploader");
// Define MulterFile type if not already imported
const createApplicationForm = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || req.files.length === 0) {
        throw new Error("No files uploaded");
    }
    const files = req.files;
    const user = req.user;
    const rawData = req.body.data;
    const result = yield applicationForm_service_1.ApplicationFromService.createApplicationForm(JSON.parse(rawData), user, files);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'appliycation form created successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result
    });
}));
////garuantor info update with existing form
const applicantGuarantorInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const data = req.body.data;
    const guarantorData = JSON.parse(data);
    if (!files || files.length === 0) {
        return (0, sendResponce_1.default)(res, {
            success: false,
            message: 'No guarantor files were uploaded.',
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            data: {},
        });
    }
    // 2. Iterate over each file.buffer and upload to Cloudinary
    const uploadPromises = files.map((file, idx) => __awaiter(void 0, void 0, void 0, function* () {
        // e.g. “guarantor/20250602_0_originalname”
        const timestamp = Date.now();
        const safeName = file.originalname.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-.]/g, '');
        const publicId = `guarantor/${timestamp}_${idx}_${safeName}`;
        // You can set folder:"guarantor" and resource_type:"image" (or "raw" if PDF, etc.)
        const result = yield (0, FilesUploader_1.uploadBufferToCloudinary)(file.buffer, publicId, {
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
    }));
    // 3. Wait for all uploads
    const uploadedFiles = yield Promise.all(uploadPromises);
    console.log();
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
    return (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Guarantor form created successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: {
            uploadedFiles, // array of { originalName, public_id, secure_url, ... }
        },
    });
}));
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
const applicationForget = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await ApplicationFromService.applicationForget(req.body);
    console.log(req.body);
    (0, sendResponce_1.default)(res, {
        success: true,
        // message: `We have sent your tracking ID to your registered Email: ${result.userEmail} Mobile Number +88${result.maskedPhoneNumber}`,
        message: `We have sent your tracking ID to your registered Email: ..........`,
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: {},
    });
}));
exports.ApplicationController = {
    createApplicationForm,
    applicantGuarantorInfo,
    // getAllApplicationForm,
    // createPersonalInfo,
    // statusUpdate, 
    // getSingleApplication,
    // applicationTracking,
    applicationForget,
};
