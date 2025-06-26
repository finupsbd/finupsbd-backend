"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeUserSelect = void 0;
// utils/prisma/selects.ts
exports.safeUserSelect = {
    id: true,
    userId: true,
    name: true,
    email: true,
    phone: true,
    role: true,
    emailVerified: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
    lastLogin: true,
};
