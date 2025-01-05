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
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_service_1 = require("./user.service");
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.cookies);
    const result = yield user_service_1.UserServices.getAllUser();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: " retrieve all user  successfully.",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
const meProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield user_service_1.UserServices.meProfile(user);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "User login successfully",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
exports.UserController = {
    getAllUsers,
    meProfile
};
