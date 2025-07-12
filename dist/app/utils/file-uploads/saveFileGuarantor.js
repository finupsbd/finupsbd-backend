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
exports.saveFileGuarantor = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Save any file (image, pdf, etc.) to a dynamic subfolder based on ID and return relative path.
 * @param buffer - File buffer
 * @param originalName - Original file name
 * @param folder - Root folder name inside /uploads (e.g., "loanDocuments")
 * @param id - Unique identifier to create a subfolder (e.g., applicationId or userId)
 * @returns string - Relative path to store in database
 */
const saveFileGuarantor = (buffer, originalName, folder, subFolder, id) => __awaiter(void 0, void 0, void 0, function* () {
    // Create directory path: /uploads/<folder>/<id>/
    const uploadsDir = path_1.default.join(process.cwd(), 'uploads', folder, subFolder, `${id}`);
    if (!fs_1.default.existsSync(uploadsDir)) {
        fs_1.default.mkdirSync(uploadsDir, { recursive: true });
    }
    const ext = path_1.default.extname(originalName) || '';
    const fileName = `${Date.now()}${ext}`;
    const filePath = path_1.default.join(uploadsDir, fileName);
    yield fs_1.default.promises.writeFile(filePath, buffer);
    // Return relative path like: /uploads/loanDocuments/12345/1720576278923.pdf
    return `/uploads/${folder}/${subFolder}/${id}/${fileName}`;
});
exports.saveFileGuarantor = saveFileGuarantor;
