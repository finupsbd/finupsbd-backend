"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCustomPassword = generateCustomPassword;
function generateCustomPassword() {
    const digits = '0123456789';
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    // Generate two random digits
    const firstTwo = Array.from({ length: 3 }, () => digits.charAt(Math.floor(Math.random() * digits.length))).join('');
    // Generate five random letters
    const middle = Array.from({ length: 2 }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
    // Generate two random digits
    const lastTwo = Array.from({ length: 3 }, () => digits.charAt(Math.floor(Math.random() * digits.length))).join('');
    return firstTwo + middle + lastTwo;
}
