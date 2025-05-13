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
const createApplicationForm = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!req.files) {
    //   throw new Error('No files were uploaded');
    // }
    // const saveImage = files.images?.map( async (file: any) => {
    //   return await sendImageToCloud(file.buffer)
    // })
    const user = req.user;
    const result = yield applicationForm_service_1.ApplicationFromService.createApplicationForm(req.body, user);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'appliycation form created successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
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
// const applicationForget = catchAsync(async (req, res) => {
//   const result = await ApplicationFromService.applicationForget(req.body);
//   sendResponses(res, {
//     success: true,
//     message: `We have sent your tracking ID to your registered Email: ${result.userEmail} Mobile Number +88${result.maskedPhoneNumber}`,
//     statusCode: StatusCodes.OK,
//     data: {},
//   });
// });
exports.ApplicationController = {
    createApplicationForm,
    // getAllApplicationForm,
    // createPersonalInfo,
    // statusUpdate, 
    // getSingleApplication,
    // applicationTracking,
    // applicationForget,
};
