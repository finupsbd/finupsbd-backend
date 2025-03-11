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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const app_1 = require("../../app");
const commonTypes_1 = require("../types/commonTypes");
const AppError_1 = __importDefault(require("../error/AppError"));
const http_status_codes_1 = require("http-status-codes");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are unauthorized");
        }
        if (commonTypes_1.blacklistedTokens.has(token)) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are unauthorized");
        }
        const decode = yield jsonwebtoken_1.default.verify(token, config_1.ConfigFile.JWT_ACCESS_SECRET);
        const user = yield app_1.prisma.user.findUnique({ where: { email: decode.email } });
        if (!user) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Your not Found");
        }
        if (!(user === null || user === void 0 ? void 0 : user.isActive)) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "You are not valid user");
        }
        // if(!user?.emailVerified){
        //     throw new AppError(StatusCodes.BAD_REQUEST,"You are not valid user")
        // }
        if (requiredRoles && !requiredRoles.includes(decode === null || decode === void 0 ? void 0 : decode.role)) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'you are not authorized role ');
        }
        req.user = decode;
        next();
    }));
};
exports.default = auth;
