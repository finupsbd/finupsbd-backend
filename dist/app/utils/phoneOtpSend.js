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
// Alpha sms https://www.sms.net.bd/api 
const phoneOtpSend = (phone, message) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.sms.net.bd/sendsms',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "api_key": "YOUR_API_KEY",
            "msg": message,
            "to": phone
        })
    };
    axios_1.default.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
    })
        .catch((error) => {
        console.log(error);
    });
});
exports.default = phoneOtpSend;
