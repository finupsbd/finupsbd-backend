"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    definition: {
        openapi: "3.0.0", // OpenAPI ভার্সন
        info: {
            title: "FinupsBd API", // তোমার প্রজেক্টের নাম
            version: "1.0.0",
            description: "FinupsBd এর Backend API Documentation",
        },
        servers: [
            {
                url: "http://localhost:4000", // লোকাল সার্ভার
                description: "Development Server",
            },
        ],
    },
    apis: ["./routes/*.js", "./route/*.ts"], // কোথা থেকে রুট পড়বে
};
exports.specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
