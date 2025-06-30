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
exports.ApplicarionController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../../utils/catchAsync"));
const sendResponce_1 = __importDefault(require("../../../../utils/sendResponce"));
const application_service_1 = require("./application.service");
const getAllApplication = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield application_service_1.ApplicationServides.getAllApplication();
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Retrive all application',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
const getSingleApplication = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    console.log(id);
    const result = yield application_service_1.ApplicationServides.getSingleApplication(id);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Retrive Single application',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
const applicationFeedBack = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    console.log(req.body);
    const result = yield application_service_1.ApplicationServides.applicationFeedback(id, req.body);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'status updated application',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
exports.ApplicarionController = {
    getSingleApplication,
    getAllApplication,
    applicationFeedBack
};
