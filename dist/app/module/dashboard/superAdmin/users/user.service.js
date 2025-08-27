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
exports.DashboardUserasServides = void 0;
const app_1 = require("../../../../../app");
const getAllusers = () => __awaiter(void 0, void 0, void 0, function* () {
    const [users, total] = yield Promise.all([
        app_1.prisma.user.findMany({
            select: {
                id: true,
                userId: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                isActive: true,
                createdAt: true,
                lastLogin: true,
                profile: {
                    select: { avatar: true }
                }
            },
            orderBy: { createdAt: "desc" } // optional sorting
        }),
        app_1.prisma.user.count()
    ]);
    return {
        total,
        users,
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.user.findUnique({ where: { id },
        include: {
            profile: true,
        },
    });
    return result;
});
exports.DashboardUserasServides = {
    getAllusers,
    getSingleUser
};
