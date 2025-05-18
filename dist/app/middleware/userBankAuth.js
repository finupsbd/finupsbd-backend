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
exports.bankAuth = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const app_1 = require("../../app");
const commonTypes_1 = require("../types/commonTypes");
const AppError_1 = __importDefault(require("../error/AppError"));
const http_status_codes_1 = require("http-status-codes");
// Extend Express Request interface to include userBank
const bankAuth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // 1. grab & verify token
        var _a;
        console.log(req.headers.authorization);
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Missing auth token");
        }
        if (commonTypes_1.blacklistedTokens.has(token)) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is blacklisted");
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.ConfigFile.JWT_ACCESS_SECRET);
        console.log("decoded", decoded);
        // 2. lookup bank user by email (or id)
        const bankUser = yield app_1.prisma.userBank.findFirst({
            where: { email: decoded.email },
        });
        if (!bankUser) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Bank user not found");
        }
        if (!bankUser.isActive) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Bank user is inactive");
        }
        // 3. enforce role if any
        if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, `Insufficient role (${decoded.role})`);
        }
        // 4. stash decoded payload (and/or bankUser) on the request
        req.userBank = decoded;
        next();
    }));
};
exports.bankAuth = bankAuth;
