"use strict";
// import { v2 as cloudinary } from 'cloudinary';
// import { ConfigFile } from '../../config';
// import multer from 'multer';
// import fs from 'fs'
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
// cloudinary.config({
//   cloud_name: "djr5gjijg",
//   api_key: ConfigFile.CLOUDINARY_API_KEY,
//   api_secret: ConfigFile.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
// });
// export const sendImageToCloud = async (path: string) => {
//   const uploadResult = await cloudinary.uploader
//     .upload(path,{public_id: `Blog-${new Date()}`,})
//     .catch((error) => {
//       console.log({error});
//     });
//     deleteLocalFile(path)
//   // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = cloudinary.url('shoes', {
//     width: 800, // Resize to 800px wide
//     height: 600, // Resize to 600px tall
//     crop: 'fill', // Crop to fit the dimensions
//     fetch_format: 'auto', // Automatically select the best format
//     quality: 'auto', // Automatically adjust quality
//   });
//   console.log(optimizeUrl);
//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url('shoes', {
//     crop: 'auto',
//     gravity: 'auto',
//     width: 500,
//     height: 500,
//   });
//   console.log(autoCropUrl);
//   return uploadResult
// };
// /// delete when image upload in cloudinary
// const deleteLocalFile = (filePath: string) => {
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         console.error("Error deleting local file:", err);
//       } else {
//         console.log("Local file deleted:", filePath);
//       }
//     });
//   };
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, process.cwd() + '/uploads/')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
//   export const upload = multer({ storage: storage })
const cloudinary_1 = require("cloudinary");
const config_1 = require("../../config");
const multer_1 = __importDefault(require("multer"));
// Remove 'fs' and any local file usage—Vercel does not support persistent storage
// import fs from 'fs';  // <-- No longer needed
// 1️⃣ Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: 'djr5gjijg', // Or process.env.CLOUDINARY_CLOUD_NAME
    api_key: config_1.ConfigFile.CLOUDINARY_API_KEY,
    api_secret: config_1.ConfigFile.CLOUDINARY_API_SECRET,
});
// 2️⃣ Function to upload file buffer directly to Cloudinary
const sendImageToCloud = (fileBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadResult = yield new Promise((resolve, reject) => {
            // Use upload_stream to handle buffers
            const stream = cloudinary_1.v2.uploader.upload_stream({
                public_id: `Blog-${Date.now()}`,
                // folder: 'my-folder', // optionally specify a folder in Cloudinary
            }, (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return reject(error);
                }
                if (result) {
                    resolve(result);
                }
                else {
                    reject(new Error('Upload result is undefined'));
                }
            });
            // 🔹 Send the buffer to Cloudinary
            stream.end(fileBuffer);
        });
        // Optional: Demonstrate transformation URLs (example from your existing code)
        const optimizeUrl = cloudinary_1.v2.url('shoes', {
            width: 800,
            height: 600,
            crop: 'fill',
            fetch_format: 'auto',
            quality: 'auto',
        });
        console.log('Optimized URL:', optimizeUrl);
        const autoCropUrl = cloudinary_1.v2.url('shoes', {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });
        console.log('Auto-cropped URL:', autoCropUrl);
        return uploadResult.secure_url;
    }
    catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
});
exports.sendImageToCloud = sendImageToCloud;
// 3️⃣ Use Multer memory storage (no local file system)
const storage = multer_1.default.memoryStorage();
// 4️⃣ Export Multer instance
exports.upload = (0, multer_1.default)({ storage });
