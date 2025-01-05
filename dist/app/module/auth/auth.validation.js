"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const refreshTokenValidationSchema = zod_1.z.object({});
exports.AuthValidation = {
    refreshTokenValidationSchema
};
