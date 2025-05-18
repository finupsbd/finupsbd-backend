"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLoginId = generateLoginId;
function generateLoginId() {
    const loginId = Math.floor(100000000 + Math.random() * 900000000).toString();
    return loginId;
}
