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
exports.PersonalLoanController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponce_1 = __importDefault(require("../../../utils/sendResponce"));
const personalLoan_service_1 = require("./personalLoan.service");
const personalLoan_validation_1 = require("./personalLoan.validation");
const createPersonalLoan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = personalLoan_validation_1.PersonalLoanValidationSchema.createPersonalLoanValidateSchema.parse(JSON.parse(req.body.data));
    const file = req.file;
    if (!file) {
        throw new Error('Please upload a file');
    }
    const result = yield personalLoan_service_1.PersonalLoanService.createPersonalLoan(payload, file);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Personal Loan Create Successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
const getAllPersonalLoan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield personalLoan_service_1.PersonalLoanService.getAllPersonalLoan();
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Retrieve All Bank Info Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const updatePersonalLoan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = personalLoan_validation_1.PersonalLoanValidationSchema.updatePersonalLoanValidateSchema.parse(JSON.parse(req.body.data));
    const file = req.file;
    const result = yield personalLoan_service_1.PersonalLoanService.updatePersonalLoan(payload, file, req.params.id);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Retrieve all Personal Loan Info Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
exports.PersonalLoanController = {
    createPersonalLoan,
    getAllPersonalLoan,
    updatePersonalLoan,
};
