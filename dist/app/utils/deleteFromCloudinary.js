"use strict";
// src/utils/deleteFromCloudinary.ts
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
exports.deleteFromCloudinary = void 0;
const cloudinary_1 = __importDefault(require("./cloudinary"));
const deleteFromCloudinary = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.default.uploader.destroy(publicId);
        if (result.result === 'ok' || result.result === 'not found') {
            return true;
        }
        else {
            console.warn(`Cloudinary deletion not successful for publicId=${publicId}:`, result);
            return false;
        }
    }
    catch (error) {
        console.error(`Error deleting Cloudinary file [${publicId}]:`, error);
        return false;
    }
});
exports.deleteFromCloudinary = deleteFromCloudinary;
