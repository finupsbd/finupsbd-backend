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
exports.SMELoanController = void 0;
const http_status_codes_1 = require("http-status-codes");
const sendResponce_1 = __importDefault(require("../../../utils/sendResponce"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const smeLoanValidation_1 = require("./smeLoanValidation");
const smeLoan_service_1 = require("./smeLoan.service");
const createSMELoan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = smeLoanValidation_1.SMELoanValidationSchema.createSMELoanValidateSchema.parse(JSON.parse(req.body.data));
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
    if (!file) {
        throw new Error('Please upload a file');
    }
    const result = yield smeLoan_service_1.SMELoanService.createSMELoan(payload, file);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'SME Loan Create Successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
const getAllSMELoan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield smeLoan_service_1.SMELoanService.getAllSMELoan();
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Retrieve All SME loan Info Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const updateSMELoan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = smeLoanValidation_1.SMELoanValidationSchema.createSMELoanValidateSchema.parse(JSON.parse(req.body.data));
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
    const result = yield smeLoan_service_1.SMELoanService.updateSMELoan(payload, file, req.params.id);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Retrieve all SME Loan Info Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
exports.SMELoanController = {
    createSMELoan,
    getAllSMELoan,
    updateSMELoan,
};
