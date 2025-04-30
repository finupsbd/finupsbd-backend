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
exports.CreditCardController = void 0;
const http_status_codes_1 = require("http-status-codes");
const sendResponce_1 = __importDefault(require("../../../utils/sendResponce"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const creditCard_service_1 = require("./creditCard.service");
const creditCardValidation_1 = require("./creditCardValidation");
const createCreditCard = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("req.body", req.body);
    const payload = creditCardValidation_1.CreditCardValidationSchema.createCreditCardValidateSchema.parse(JSON.parse(req.body.data));
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
    if (!file) {
        throw new Error('Please upload a file');
    }
    const result = yield creditCard_service_1.CreditCardService.createCreditCard(payload, file);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Credit Card Create Successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
const getAllCreditCard = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield creditCard_service_1.CreditCardService.getAllCreditCard();
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Retrieve All credit cards Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const updateCreditCard = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = creditCardValidation_1.CreditCardValidationSchema.updateCreditCardValidateSchema.parse(JSON.parse(req.body.data));
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
    const result = yield creditCard_service_1.CreditCardService.updateCreditCard(payload, file, req.params.id);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Updated Credit Card Info Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
exports.CreditCardController = {
    createCreditCard,
    getAllCreditCard,
    updateCreditCard,
};
