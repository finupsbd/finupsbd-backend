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
exports.ProfileServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const app_1 = require("../../../../app");
const saveSingleFile_1 = require("../../../utils/file-uploads/saveSingleFile");
const createProfile = (payload, user, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(user === null || user === void 0 ? void 0 : user.userId)) {
            throw new Error("Invalid user ID.");
        }
        console.log(file);
        // if (file) {
        //   const profileImage = await sendImageToCloud(image);
        //   if (profileImage) {
        //     payload.avatar = profileImage;
        //   }
        // }
        if (file) {
            const profileImage = yield (0, saveSingleFile_1.saveSingleFile)(file === null || file === void 0 ? void 0 : file.buffer, file === null || file === void 0 ? void 0 : file.originalname, "profileImages", user.email);
            if (profileImage) {
                payload.avatar = profileImage;
            }
        }
        yield app_1.prisma.user.update({
            where: { id: user.userId },
            data: {
                profile: {
                    upsert: {
                        create: Object.assign({}, payload),
                        update: Object.assign({}, payload),
                    },
                },
            },
            include: { profile: true },
        });
    }
    catch (error) {
        console.error("Failed to create or update profile:", error);
        throw error; // rethrow for better error tracking
    }
});
exports.ProfileServices = {
    createProfile,
};
