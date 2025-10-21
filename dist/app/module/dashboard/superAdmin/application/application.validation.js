"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationStatusPayload = void 0;
const zod_1 = __importDefault(require("zod"));
const application_interface_1 = require("../../../applicationForm/application.interface");
exports.ApplicationStatusPayload = zod_1.default.object({
    status: zod_1.default.nativeEnum(application_interface_1.LoanStatus),
    adminNote: zod_1.default.string().trim().optional().default(""),
    additionalDocuments: zod_1.default.boolean().optional().default(false),
});
