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
exports.BlogController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const blog_service_1 = require("./blog.service");
const blog_validation_1 = require("./blog.validation");
const sendResponce_1 = __importDefault(require("../../utils/sendResponce"));
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = blog_validation_1.BlogValidationSchema.parse(JSON.parse(req.body.data));
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
    const user = req.user;
    if (!user) {
        throw new Error("User is not authenticated");
    }
    console.log(user);
    const result = yield blog_service_1.BlogService.createBlog(payload, file, user);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Blog create successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogService.getAllBlogs();
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Blogs retrieve successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const blogId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield blog_service_1.BlogService.updateBlog(req.body, blogId);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Update Blog Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const blogId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    yield blog_service_1.BlogService.deleteBlog(blogId);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Blog Deleted Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: {},
    });
}));
exports.BlogController = {
    createBlog,
    updateBlog,
    getAllBlogs,
    deleteBlog
};
