"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBankAuthValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const userBankSchemaRegister = zod_1.z.object({
    bankName: zod_1.z.nativeEnum(client_1.BankName), // or: BankNameEnum,
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    phone: zod_1.z.string().regex(/^\+8801\d{9}$/, "Phone must be a valid Bangladeshi number (+8801XXXXXXXXX)"),
    bankCode: zod_1.z.string().min(1).max(9).nonempty("bankCode is required"),
});
const userBankSchemaLogin = zod_1.z.object({
    bankName: zod_1.z.nativeEnum(client_1.BankName), // or: BankNameEnum,
    loginId: zod_1.z.string().min(1, { message: "loginId must be at least 1 characters" }),
    password: zod_1.z.string().min(1, "Password must be at least 1 characters"),
});
exports.UserBankAuthValidation = {
    userBankSchemaRegister,
    userBankSchemaLogin
};
