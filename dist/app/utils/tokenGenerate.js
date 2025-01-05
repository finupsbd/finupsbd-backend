"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenGenerate = exports.accessTokenGenerate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const accessTokenGenerate = (jwtPayload, expire) => {
    const result = jsonwebtoken_1.default.sign(jwtPayload, config_1.ConfigFile.JWT_ACCESS_SECRET, {
        expiresIn: expire,
    });
    return result;
};
exports.accessTokenGenerate = accessTokenGenerate;
const refreshTokenGenerate = (jwtPayload, expire) => {
    const result = jsonwebtoken_1.default.sign(jwtPayload, config_1.ConfigFile.JWT_REFRESH_SECRET, {
        expiresIn: expire,
    });
    return result;
};
exports.refreshTokenGenerate = refreshTokenGenerate;
