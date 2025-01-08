"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.ProfileServices = void 0;
const app_1 = require("../../../../app");
const createProfile = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    console.log(userId);
    const existingProfile = yield app_1.prisma.profile.findUnique({
        where: { userId },
    });
    if (existingProfile) {
        // Update the profile if it exists
        const updatedProfile = yield app_1.prisma.profile.update({
            where: { userId },
            data: payload,
        });
        return updatedProfile;
    }
    const newProfile = yield app_1.prisma.profile.create({
        data: payload,
    });
    return newProfile;
});
exports.ProfileServices = {
    createProfile,
};
