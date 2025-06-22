"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // e.g., 'dxyz123'
    api_key: process.env.CLOUDINARY_API_KEY, // e.g., '1234567890'
    api_secret: process.env.CLOUDINARY_API_SECRET, // e.g., 'abcDEFghiJKL'
});
exports.default = cloudinary_1.v2;
