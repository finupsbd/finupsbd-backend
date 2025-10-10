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
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
const formatPhoneNumber = (phone) => {
    if (!phone) {
        throw new Error("Phone number is required");
    }
    // Remove everything except digits and "+"
    let formatted = phone.replace(/[^\d+]/g, "").trim();
    // Case 1: Starts with +88 → remove "+"
    if (formatted.startsWith("+88")) {
        formatted = formatted.substring(1);
    }
    // Case 2: Starts with 01 → add "88" in front
    else if (formatted.startsWith("01")) {
        formatted = "88" + formatted;
    }
    // Validate final format → must look like 8801XXXXXXXXX
    if (!/^8801\d{8,9}$/.test(formatted)) {
        throw new Error(`Invalid phone number format: ${phone}`);
    }
    return formatted;
};
/// 
const phoneOtpSend = (phone, message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const url = "https://smsplus.sslwireless.com/api/v3/send-sms";
        // ✅ Format phone number before sending
        const formattedPhone = formatPhoneNumber(phone);
        const payload = {
            api_token: config_1.ConfigFile.SSL_SMS_API_TOKEN, // Your API token
            sid: config_1.ConfigFile.SSL_SMS_SID, // Sender ID
            msisdn: formattedPhone, // Receiver number
            sms: message, // Message text
            csms_id: Math.random().toString(36).substring(2, 12), // Unique ID
        };
        const res = yield axios_1.default.post(url, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    }
    catch (error) {
        console.error("SMS send failed:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw new Error("SMS sending failed");
    }
});
exports.default = phoneOtpSend;
