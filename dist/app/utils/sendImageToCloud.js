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
exports.upload = exports.sendImageToCloud = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = require("../../config");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    cloud_name: "djr5gjijg",
    api_key: config_1.ConfigFile.CLOUDINARY_API_KEY,
    api_secret: config_1.ConfigFile.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});
const sendImageToCloud = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadResult = yield cloudinary_1.v2.uploader
        .upload(path, { public_id: `Blog-${new Date()}`, })
        .catch((error) => {
        console.log({ error });
    });
    deleteLocalFile(path);
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary_1.v2.url('shoes', {
        width: 800, // Resize to 800px wide
        height: 600, // Resize to 600px tall
        crop: 'fill', // Crop to fit the dimensions
        fetch_format: 'auto', // Automatically select the best format
        quality: 'auto', // Automatically adjust quality
    });
    console.log(optimizeUrl);
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary_1.v2.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    console.log(autoCropUrl);
    return uploadResult;
});
exports.sendImageToCloud = sendImageToCloud;
/// delete when image upload in cloudinary
const deleteLocalFile = (filePath) => {
    fs_1.default.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting local file:", err);
        }
        else {
            console.log("Local file deleted:", filePath);
        }
    });
};
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads/');
    },
    filename: function (req, file, cb) {
        console.log("ddfdfdf");
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
