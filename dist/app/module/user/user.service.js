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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const app_1 = require("../../../app");
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.user.findMany({
        include: {
            profile: true
        }
    });
    return result;
});
const meProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.user.findFirst({
        where: { email: user === null || user === void 0 ? void 0 : user.email },
        select: {
            name: true,
            email: true,
            phone: true,
            role: true,
            profile: true,
            isActive: true,
            emailVerified: true,
            ApplicationForm: {
                include: {
                    User: true,
                }
            }
        },
    });
    if (!result)
        throw new Error("User not found");
    return result;
});
exports.UserServices = {
    getAllUser,
    meProfile,
};
