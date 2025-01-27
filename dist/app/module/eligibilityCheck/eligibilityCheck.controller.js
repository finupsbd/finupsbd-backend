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
exports.EligibilityCheckController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const eligibilityCheck_service_1 = require("./eligibilityCheck.service");
const sendResponce_1 = __importDefault(require("../../utils/sendResponce"));
const eligibilityCheck = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield eligibilityCheck_service_1.EligibilityCheckService.eligibilityCheck(req.body);
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'Your Eligibility check successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
exports.EligibilityCheckController = {
    eligibilityCheck,
};
