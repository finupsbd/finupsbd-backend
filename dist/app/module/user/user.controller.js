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
const sendResponce_1 = __importDefault(require("../../utils/sendResponce"));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield user_service_1.UserServices.getAllUser(query);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: "retrieve all user  successfully.",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserServices.getSingleUser(id);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: "retrieve single user successfully.",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
const meProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log("000000000000000000000", { user });
    const result = yield user_service_1.UserServices.meProfile(user);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: "Retrive my Profile Data",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
const getAllNewLoans = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserServices.getAllNewLoans(id);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: "Retrive all applications",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
const getAllExistingLoans = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserServices.getAllExistingLoans(id);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: "get all existing loans",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
const getAllRejectsLoans = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserServices.getAllRejectsLoans(id);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: "get all rejected loans",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
const getApplication = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserServices.getApplication(id);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: "Retrive all applications",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
const createAddiDoc = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.user;
    const files = req.files;
    const result = yield user_service_1.UserServices.createAdiDoc(id, files, user);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: "Document upload successfull",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result
    });
}));
const getAgreementDoc = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserServices.getAgreementDoc(id);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: "Retrieve Agreement doc successfully.",
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result
    });
}));
exports.UserController = {
    getAllUsers,
    meProfile,
    getSingleUser,
    getAllNewLoans,
    getAllExistingLoans,
    getAllRejectsLoans,
    getApplication,
    createAddiDoc,
    getAgreementDoc
};
