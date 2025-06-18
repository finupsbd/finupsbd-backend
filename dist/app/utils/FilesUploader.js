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
exports.uploadBufferToCloudinary = uploadBufferToCloudinary;
exports.uploadBufferAsDataURI = uploadBufferAsDataURI;
const cloudinary_1 = require("cloudinary");
const config_1 = require("../../config");
cloudinary_1.v2.config({
    cloud_name: config_1.ConfigFile.CLOUDINARY_CLOUD_NAME,
    api_key: config_1.ConfigFile.CLOUDINARY_API_KEY,
    api_secret: config_1.ConfigFile.CLOUDINARY_API_SECRET,
    secure: true, // always use HTTPS URLs
});
function uploadBufferToCloudinary(buffer, publicId, options = {}) {
    return new Promise((resolve, reject) => {
        // Merge in public_id if provided
        const uploadOptions = Object.assign(Object.assign({}, options), (publicId ? { public_id: publicId } : {}));
        const uploadStream = cloudinary_1.v2.uploader.upload_stream(uploadOptions, (error, result) => {
            if (error)
                return reject(error);
            if (!result)
                return reject(new Error('No result returned from Cloudinary.'));
            resolve(result);
        });
        // Write the Buffer into the stream. Once ended, Cloudinary will process it.
        uploadStream.end(buffer);
    });
}
// Example usage in an async handler:
function uploadBufferAsDataURI(buffer_1, mimeType_1, publicId_1) {
    return __awaiter(this, arguments, void 0, function* (buffer, mimeType, publicId, options = {}) {
        // Convert to "data:<mimeType>;base64,<base64string>"
        const base64 = buffer.toString('base64');
        const dataUri = `data:${mimeType};base64,${base64}`;
        const uploadOptions = Object.assign(Object.assign({}, options), (publicId ? { public_id: publicId } : {}));
        const result = yield cloudinary_1.v2.uploader.upload(dataUri, uploadOptions);
        return result;
    });
}
