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
const nodemailer_1 = __importDefault(require("nodemailer"));
const AppError_1 = __importDefault(require("../error/AppError"));
const http_status_codes_1 = require("http-status-codes");
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASS,
    },
});
const sendEmail = (toEmail, emailSubject, bodyText) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield transporter.sendMail({
            from: process.env.NODE_MAILER_EMAIL, // sender address
            to: toEmail, // list of receivers
            subject: emailSubject, // Subject line
            text: bodyText, // plain text body
            html: bodyText, // html body
        });
        console.log('Message sent: %s', info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }
    catch (error) {
        console.error(error);
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Email Send Failded");
    }
});
exports.default = sendEmail;
// import nodemailer from 'nodemailer';
// const transporter = nodemailer.createTransport({
//   host: 'in-v3.mailjet.com',
//   port: 587,
//   secure: false, // true for port 465, false for other ports
//   auth: {
//     user: process.env.MAILJET_API_KEY,
//     pass: process.env.MAILJET_SECRET_KEY,
//   },
// });
// const sendEmail = async (toEmail: string, emailSubject: string, bodyText: string,
//   // html: string,
// ) => {
//   const info = await transporter.sendMail({
//     from: process.env.SENDER_EMAIL, // sender address
//     to: toEmail, // list of receivers
//     subject: emailSubject, // Subject line
//     text: bodyText, // plain text body
//     html: bodyText, // html body
//   });
//   console.log('Message sent: %s', info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// };
// export default sendEmail;
