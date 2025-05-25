"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eligiblityRateLimit = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.eligiblityRateLimit = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, /// 1 minits
    max: 5, //limit eatch ip requite in per minits
    message: {
        success: false,
        message: "Too many requests. Please wait a minute and try again.",
    },
    statusCode: 429, // Too Many Requests
});
