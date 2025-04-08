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
const context_1 = require("../../utils/super-admin-utiles/context");
const signUp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSessionInfo = yield (0, context_1.getRequestContext)(req);
    const result = yield auth_service_1.AuthServices.signUp(req.body, userSessionInfo);
    console.log(userSessionInfo);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: result,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: {},
    });
}));
const validatePin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.validatePin(req.body);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'User verify successfully please Login',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.login(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.ConfigFile.NODE_ENV === 'production',
        httpOnly: true,
    });
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'User login successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: { accessToken },
    });
}));
const forgetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.forgetPassword(req.body);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Check your email for verification!',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.resetPassword(req.body);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Password Reset successfully please login',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.AuthServices.refreshToken(refreshToken);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Access Token is retrieve',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
const logout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const { refreshToken } = req.cookies;
    if (token) {
        res.clearCookie(refreshToken);
        // blacklistedTokens.add(token)
        (0, sendResponce_1.default)(res, {
            success: true,
            message: 'logout Successfully',
            statusCode: http_status_codes_1.StatusCodes.OK,
            data: {}
        });
    }
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user);
    const result = yield auth_service_1.AuthServices.changePassword(req.body, user);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Password chnage successfully ',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
exports.AuthController = {
    signUp,
    validatePin,
    login,
    forgetPassword,
    resetPassword,
    refreshToken,
    logout,
    changePassword
};
