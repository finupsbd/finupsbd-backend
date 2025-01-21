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
exports.BankInfoController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const bank_service_1 = require("./bank.service");
const bank_validation_1 = require("./bank.validation");
const createBankInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = bank_validation_1.BankValidationSchema.bankInfoValidateSchema.parse(JSON.parse(req.body.data));
    console.log(payload);
    const file = req.file;
    if (!file) {
        throw new Error("Please upload a file");
    }
    const result = yield bank_service_1.BankInfoService.bankInfo(payload, file);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        success: true,
        message: 'Bank Info Create Successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
const getallBankInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bank_service_1.BankInfoService.getAllBankInfo();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: 'Retrieve All Bank Info Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const updateBookInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = bank_validation_1.BankValidationSchema.updateBankInfoValidateSchema.parse(JSON.parse(req.body.data));
    console.log(payload);
    const file = req.file;
    const result = yield bank_service_1.BankInfoService.updateBankInfo(payload, file, req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: 'Retrieve All Bank Info Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
exports.BankInfoController = {
    createBankInfo,
    getallBankInfo,
    updateBookInfo
};
