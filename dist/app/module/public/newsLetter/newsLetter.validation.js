"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsLetterValidation = void 0;
const zod_1 = require("zod");
const createNewsLetterValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email()
});
exports.NewsLetterValidation = {
    createNewsLetterValidationSchema
};
