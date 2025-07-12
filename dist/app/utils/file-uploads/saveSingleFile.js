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
exports.saveSingleFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Save any file (image, pdf, etc.) to a dynamic folder and return relative path.
 * @param buffer - File buffer
 * @param originalName - Original file name
 * @param folder - Folder name inside /uploads
 * @returns string - Relative path to store in database
 */
const saveSingleFile = (buffer, originalName, folder, id) => __awaiter(void 0, void 0, void 0, function* () {
    // (e.g., /uploads/folder/)
    const uploadsDir = path_1.default.join(process.cwd(), 'uploads', folder);
    if (!fs_1.default.existsSync(uploadsDir)) {
        fs_1.default.mkdirSync(uploadsDir, { recursive: true });
    }
    let fileName = '';
    const ext = path_1.default.extname(originalName) || '';
    fileName = `${Date.now()}-${ext}`;
    if (id) {
        fileName = `${id}-${Date.now()}-${ext}`;
    }
    const filePath = path_1.default.join(uploadsDir, fileName);
    yield fs_1.default.promises.writeFile(filePath, buffer);
    // Return the relative path (e.g., /uploads/loanDocuments/abc.pdf)
    return `/uploads/${folder}/${fileName}`;
});
exports.saveSingleFile = saveSingleFile;
