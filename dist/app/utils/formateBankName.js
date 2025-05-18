"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBankName = formatBankName;
function formatBankName(key) {
    return key
        .split("_")
        .map((word) => word.toLowerCase() === "plc"
        ? "plc"
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}
