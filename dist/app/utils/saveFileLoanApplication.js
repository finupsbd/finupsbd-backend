"use strict";
// utils/saveFileLoanApplication.ts
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
exports.saveFileLoanApplication = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const writeFile = util_1.default.promisify(fs_1.default.writeFile);
const saveFileLoanApplication = (buffer, originalName, applicationId) => __awaiter(void 0, void 0, void 0, function* () {
    // NEW: define the per-application folder
    const appFolder = path_1.default.join(__dirname, '../../../uploads/loanApplications', applicationId);
    // Ensure application folder exists
    if (!fs_1.default.existsSync(appFolder)) {
        fs_1.default.mkdirSync(appFolder, { recursive: true });
    }
    const timestamp = Date.now();
    const safeName = originalName.replace(/[^a-z0-9.\-_]/gi, '_'); // sanitize
    const filename = `${applicationId}-${timestamp}-${safeName}`;
    const fullPath = path_1.default.join(appFolder, filename);
    yield writeFile(fullPath, buffer);
    // Return relative public URL
    return `/uploads/loanApplications/${applicationId}/${filename}`;
});
exports.saveFileLoanApplication = saveFileLoanApplication;
