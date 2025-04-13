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
const getAllUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const conditions = [];
        // Apply role filter if provided.
        if (query.role) {
            conditions.push({ role: query.role });
        }
        // Apply status filter if provided.
        if (query.status) {
            conditions.push({ status: query.status });
        }
        // Use searchTerm as a boolean flag.
        // For demonstration, if searchTerm is true, include users with a non-empty name.
        if (query.searchTerm) {
            conditions.push({ name: { not: "" } });
        }
        // Combine conditions if any filters are applied.
        const whereClause = conditions.length > 0 ? { AND: conditions } : {};
        // Set pagination parameters; defaults: skip = 0, take = 10.
        const skip = (_a = query.skip) !== null && _a !== void 0 ? _a : 0;
        const take = (_b = query.take) !== null && _b !== void 0 ? _b : 10;
        // Query the database including the user's profile.
        const data = yield app_1.prisma.user.findMany({
            where: whereClause,
            include: {
                profile: true,
            },
            skip,
            take,
        });
        // Count the total records matching the filters.
        const totalCount = yield app_1.prisma.user.count({
            where: whereClause,
        });
        // Return the data along with pagination status.
        return {
            data,
            pagination: {
                skip,
                take,
                totalCount,
                currentPage: Math.floor(skip / take) + 1,
                totalPages: Math.ceil(totalCount / take),
            },
        };
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Could not fetch users");
    }
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.user.findUnique({
        where: { id },
        include: {
            profile: true
        }
    });
    return result;
});
const meProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
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
            LoanApplicationForm: {
                include: {
                    user: true,
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
    getSingleUser
};
