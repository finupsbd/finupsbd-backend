"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const validateRequest = (schema) => {
    return (0, catchAsync_1.default)((req, res, next) => {
        console.log(req.body);
        req.body = schema.parse(req.body);
        next();
    });
};
exports.default = validateRequest;
