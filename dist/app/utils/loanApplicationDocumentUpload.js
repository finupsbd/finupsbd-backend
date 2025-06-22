"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("./cloudinary"));
function uploadBufferToCloudinary(fileBuffer, filename, mimetype) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({ public_id: filename, resource_type: 'auto' }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
        stream.end(fileBuffer);
    });
}
exports.default = uploadBufferToCloudinary;
