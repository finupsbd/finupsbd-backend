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
exports.AuthController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
const sendResponce_1 = __importDefault(require("../../utils/sendResponce"));
const config_1 = require("../../../config");
const signUp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.signUp(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        success: true,
        message: 'You have been successfully registered.',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
const validatePin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.validatePin(req.body);
    //   res.status(StatusCodes.CREATED).json({
    //     success: true,
    //     message: 'User verify successfully please Login',
    //     statusCode: StatusCodes.CREATED,
    //     data: result,
    //   });
    (0, sendResponce_1.default)(res, http_status_codes_1.StatusCodes.CREATED, 'User verify successfully', result);
}));
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.login(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.ConfigFile.NODE_ENV === 'production',
        httpOnly: true,
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: 'User login successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: { accessToken },
    });
}));
const forgetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.forgetPassword(req.body);
    (0, sendResponce_1.default)(res, http_status_codes_1.StatusCodes.OK, 'check your email for verification!', result);
}));
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.resetPassword(req.body);
    (0, sendResponce_1.default)(res, http_status_codes_1.StatusCodes.OK, 'Password Reset successfully please login', result);
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.AuthServices.refreshToken(refreshToken);
    (0, sendResponce_1.default)(res, http_status_codes_1.StatusCodes.OK, 'Access Token is retrieve', result);
}));
const logout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const { refreshToken } = req.cookies;
    if (token) {
        res.clearCookie(refreshToken);
        // blacklistedTokens.add(token)    
        (0, sendResponce_1.default)(res, http_status_codes_1.StatusCodes.OK, 'logout Successfully', {});
    }
}));
exports.AuthController = {
    signUp,
    validatePin,
    login,
    forgetPassword,
    resetPassword,
    refreshToken,
    logout,
};
