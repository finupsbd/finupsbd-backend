"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../../config");
const algorithm = 'aes-256-cbc';
const key = Buffer.from(config_1.ConfigFile.SECRET_KEY, 'hex'); // 32-byte key (256-bit)
const hmacKey = Buffer.from(config_1.ConfigFile.HMAC_KEY, 'utf8'); // Any strong secret
const encrypt = (text) => {
    const iv = crypto_1.default.randomBytes(16); // ✅ Must be 16 bytes
    const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const encryptedHex = encrypted.toString('hex');
    const ivHex = iv.toString('hex');
    const hmac = crypto_1.default.createHmac('sha256', hmacKey);
    hmac.update(ivHex + ':' + encryptedHex);
    const authTag = hmac.digest('hex');
    return `${ivHex}:${encryptedHex}:${authTag}`;
};
exports.encrypt = encrypt;
const decrypt = (payload) => {
    const [ivHex, encryptedHex, authTag] = payload.split(':');
    const hmac = crypto_1.default.createHmac('sha256', hmacKey);
    hmac.update(`${ivHex}:${encryptedHex}`);
    const validHmac = hmac.digest('hex');
    if (validHmac !== authTag)
        throw new Error('Integrity check failed');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto_1.default.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};
exports.decrypt = decrypt;
