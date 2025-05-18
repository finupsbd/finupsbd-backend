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
exports.UserBankAuthController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponce_1 = __importDefault(require("../../../utils/sendResponce"));
const userBankAuth_service_1 = require("./userBankAuth.service");
const config_1 = require("../../../../config");
const sendResponce_2 = __importDefault(require("../../../utils/sendResponce"));
const userBankRegister = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userBankAuth_service_1.UserBankAuthServices.userBankRegister(req.body);
    (0, sendResponce_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'User bank register successFully',
        data: result,
    });
}));
const userBankLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userBankAuth_service_1.UserBankAuthServices.login(req.body);
    const { userBankRefreshToken, userBankAccessToken } = result;
    res.cookie('userBankRefreshToken', userBankRefreshToken, {
        secure: config_1.ConfigFile.NODE_ENV === 'production',
        httpOnly: true,
    });
    (0, sendResponce_2.default)(res, {
        success: true,
        message: 'User Bank login successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: { userBankAccessToken },
    });
}));
const me = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await UserBankAuthServices.userBankRegister(req.body)
    console.log(req.userBank);
    (0, sendResponce_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'get all register successFully',
        data: {},
    });
}));
exports.UserBankAuthController = {
    userBankRegister,
    userBankLogin,
    me
};
