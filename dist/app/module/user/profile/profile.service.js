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
const sendImageToCloud_1 = require("../../../utils/sendImageToCloud");
const createProfile = (payload, user, image) => __awaiter(void 0, void 0, void 0, function* () {
    const profileImage = yield (0, sendImageToCloud_1.sendImageToCloud)(image);
    payload.avatar = profileImage !== null && profileImage !== void 0 ? profileImage : undefined;
    const result = yield app_1.prisma.user.update({
        where: { id: user === null || user === void 0 ? void 0 : user.userId },
        data: {
            profile: {
                upsert: {
                    create: Object.assign({}, payload),
                    update: Object.assign({}, payload)
                }
            }
        },
        include: {
            profile: true
        }
    });
    console.log(result);
});
exports.ProfileServices = {
    createProfile,
};
