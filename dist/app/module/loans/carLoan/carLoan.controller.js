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
exports.CarLoanController = void 0;
const http_status_codes_1 = require("http-status-codes");
const sendResponce_1 = __importDefault(require("../../../utils/sendResponce"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const carLoanValidation_1 = require("./carLoanValidation");
const carLoan_service_1 = require("./carLoan.service");
const createCarLoan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = carLoanValidation_1.CarLoanValidationSchema.createCarLoanValidateSchema.parse(JSON.parse(req.body.data));
    const file = req.file;
    if (!file) {
        throw new Error('Please upload a file');
    }
    const result = yield carLoan_service_1.CarLoanService.createCarLoan(payload, file);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Car Loan Create Successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
const getAllCarLoan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carLoan_service_1.CarLoanService.getAllCarLoan();
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Retrieve All Car loan Info Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const updateCarLoan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = carLoanValidation_1.CarLoanValidationSchema.createCarLoanValidateSchema.parse(JSON.parse(req.body.data));
    const file = req.file;
    const result = yield carLoan_service_1.CarLoanService.updateCarLoan(payload, file, req.params.id);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Retrieve all Car Loan Info Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
exports.CarLoanController = {
    createCarLoan,
    getAllCarLoan,
    updateCarLoan,
};
