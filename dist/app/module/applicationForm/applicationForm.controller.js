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
    const user = req.user;
    const result = yield applicationForm_service_1.ApplicationFromService.createApplicationForm(req.body, user);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Application Create successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
const getAllApplicationForm = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applicationForm_service_1.ApplicationFromService.getAllApplicationForm();
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Application Create successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
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
    (0, sendResponce_1.default)(res, {
        success: true,
        message: `We have sent your tracking ID to your registered Email: ${result.userEmail} Mobile Number +88${result.maskedPhoneNumber}`,
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: {},
    });
}));
exports.ApplicationController = {
    createApplicationForm,
    getAllApplicationForm,
    applicationTracking,
    applicationForget,
};
