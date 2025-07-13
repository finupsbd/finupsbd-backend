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
const app_1 = require("../../../app");
const AppError_1 = __importDefault(require("../../error/AppError"));
const saveFileGuarantor_1 = require("../../utils/file-uploads/saveFileGuarantor");
const createApplicationForm = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || req.files.length === 0) {
        throw new Error("No files uploaded");
    }
    const files = req.files;
    const user = req.user;
    const rawData = req.body.data;
    const loanRequest = req.body.loanRequest;
    const result = yield applicationForm_service_1.ApplicationFromService.createApplicationForm(JSON.parse(rawData), user, files, JSON.parse(loanRequest));
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Loan Application form created successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result
    });
}));
const getAllApplicationForm = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applicationForm_service_1.ApplicationFromService.getAllApplicationForm();
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'retrive all application successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
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
const getSingleApplication = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield applicationForm_service_1.ApplicationFromService.getSingleApplication(id);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'get single application ',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const myLoanApplication = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield applicationForm_service_1.ApplicationFromService.myLoanApplication(user);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'get my loan application successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const applicationTracking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applicationForm_service_1.ApplicationFromService.applicationTracking(req.body);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Application track successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const applicationForget = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applicationForm_service_1.ApplicationFromService.applicationForget(req.body);
    console.log(req.body);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: `We have sent your tracking ID to your registered Email: ${result.userEmail} Mobile Number +88${result.maskedPhoneNumber}`,
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
////garuantor info update with existing form
const applicantGuarantorInfoPersonal = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const id = req.query.id;
    const data = req.body.data;
    const applicationId = req.body.applicationId;
    const guarantorData = JSON.parse(data);
    const isExist = yield app_1.prisma.personalGuarantor.findUnique({
        where: { id },
    });
    console.log({ guarantorData });
    if (isExist) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "You already fill up this from Thank you");
    }
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
        // You can set folder:"guarantor" and resource_type:"image" (or "raw" if PDF, etc.)
        const result = yield (0, saveFileGuarantor_1.saveFileGuarantor)(file === null || file === void 0 ? void 0 : file.buffer, file === null || file === void 0 ? void 0 : file.originalname, "gurantor", "personalGurantor", applicationId);
        return {
            originalName: file.originalname,
            url: result,
            mimeType: file.mimetype
        };
    }));
    // 3. Wait for all uploads
    const uploadedFiles = yield Promise.all(uploadPromises);
    const existingGuarantor = yield app_1.prisma.personalGuarantor.findUnique({
        where: { loanApplicationFormId: id }
    });
    if (!existingGuarantor) {
        yield app_1.prisma.personalGuarantor.create({
            data: Object.assign(Object.assign({}, guarantorData), { loanApplicationFormId: id, document: {
                    create: uploadedFiles.map(doc => ({
                        url: doc.url,
                        originalName: doc.originalName,
                        mimeType: doc.mimeType
                    }))
                } }),
            include: {
                document: true
            }
        });
    }
    else {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "You Already fillup this form");
    }
    // 4. Respond with the Cloudinary URLs / IDs (or save them to your DB here)
    return (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Personal Guarantor form created successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: {},
    });
}));
////garuantor info update with existing form Business
const applicantGuarantorInfoBusiness = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const id = req.query.id;
    const data = req.body.data;
    const applicationId = req.body.applicationId;
    const guarantorData = JSON.parse(data);
    const isExist = yield app_1.prisma.businessGuarantor.findUnique({
        where: { id }
    });
    if (isExist) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "You already fill up this from Thank you");
    }
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
        // You can set folder:"guarantor" and resource_type:"image" (or "raw" if PDF, etc.)
        const result = yield (0, saveFileGuarantor_1.saveFileGuarantor)(file === null || file === void 0 ? void 0 : file.buffer, file === null || file === void 0 ? void 0 : file.originalname, "gurantor", "businessGurantor", applicationId);
        return {
            originalName: file.originalname,
            url: result,
            mimeType: file.mimetype
        };
    }));
    // 3. Wait for all uploads
    const uploadedFiles = yield Promise.all(uploadPromises);
    console.log(uploadedFiles);
    console.log("applicationId", id);
    const result = yield app_1.prisma.businessGuarantor.create({
        data: Object.assign(Object.assign({}, guarantorData), { loanApplicationFormId: id, document: {
                create: uploadedFiles.map(doc => ({
                    url: doc.url,
                    originalName: doc.originalName,
                    mimeType: doc.mimeType
                }))
            } }),
    });
    console.log(result);
    // 4. Respond with the Cloudinary URLs / IDs (or save them to your DB here)
    return (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Business Guarantor form created successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: {
            uploadedFiles, // array of { originalName, public_id, secure_url, ... }
        },
    });
}));
exports.ApplicationController = {
    createApplicationForm,
    applicantGuarantorInfoPersonal,
    applicantGuarantorInfoBusiness,
    getAllApplicationForm,
    // createPersonalInfo,
    // statusUpdate, 
    getSingleApplication,
    applicationTracking,
    applicationForget,
    myLoanApplication,
};
