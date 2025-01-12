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
exports.generateUserId = generateUserId;
const app_1 = require("../../app");
const lastUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield app_1.prisma.user.findFirst({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            userId: true,
        },
    });
    return id;
});
function generateUserId() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let newUserId;
        const userId = yield lastUser();
        if (userId === null || userId === void 0 ? void 0 : userId.userId) {
            // Example: "250112001"
            const prefix = (_a = userId === null || userId === void 0 ? void 0 : userId.userId) === null || _a === void 0 ? void 0 : _a.slice(0, 6); // Extract prefix, e.g., "250112"
            const sequence = parseInt(userId.userId.slice(6), 10); // Extract numeric part, e.g., "001"
            const nextSequence = (sequence + 1).toString().padStart(3, '0'); // Increment and pad with zeros
            newUserId = `${prefix}${nextSequence}`; // Combine prefix and new sequence
        }
        else {
            // If no users exist, start with the first ID
            newUserId = '250112001';
        }
        return newUserId;
    });
}
