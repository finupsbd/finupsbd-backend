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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApplicationId = generateApplicationId;
const app_1 = require("../../app");
const AppError_1 = __importDefault(require("../error/AppError"));
// Fetch the last application ID from the database
const lastApplication = () => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield app_1.prisma.applicationForm.findFirst({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            applicationId: true,
        },
    });
    return id;
});
// Generate a new application ID
function generateApplicationId() {
    return __awaiter(this, void 0, void 0, function* () {
        const applicationId = yield lastApplication();
        // Helper function to format the date prefix
        const getDatePrefix = () => {
            const currentDate = new Date();
            const staticDigit = "3"; // Static starting digit
            const year = currentDate.getFullYear().toString().slice(-2); // Last 2 digits of the year
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Two-digit month
            const day = currentDate.getDate().toString().padStart(2, '0'); // Two-digit day
            return `${staticDigit}${year}${month}${day}`; // Combine to form the prefix
        };
        if (!applicationId) {
            // Generate the first application ID
            const prefix = getDatePrefix();
            const sequence = "00001"; // Start sequence at 00001
            const newApplicationId = `${prefix}${sequence}`;
            console.log({ newApplicationId });
            return newApplicationId;
        }
        if (applicationId.applicationId) {
            // Generate the next application ID
            const prefix = applicationId.applicationId.slice(0, 7); // Extract prefix, e.g., "3250124"
            const sequence = parseInt(applicationId.applicationId.slice(7), 10); // Extract numeric part, e.g., "00001"
            const nextSequence = (sequence + 1).toString().padStart(5, '0'); // Increment and pad with zeros
            const newApplicationId = `${prefix}${nextSequence}`; // Combine prefix and new sequence
            console.log({ newApplicationId });
            return newApplicationId;
        }
        throw new AppError_1.default(500, "Unable to generate a new application ID."); // Fallback error handling
    });
}
