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
exports.LoansBankController = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponce_1 = __importDefault(require("../../../utils/sendResponce"));
const generative_ai_1 = require("@google/generative-ai");
const getAllApplyedLoans = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { prompth } = JSON.parse(req.body.data);
    console.log(prompth);
    const files = req.files;
    console.log(prompth);
    const multimodalPayload = [
        {
            text: `You are a data‐extraction assistant. and i want ${prompth}`
        },
        ...files.map(file => ({
            inlineData: {
                data: file.buffer.toString("base64"),
                mimeType: file.mimetype
            }
        }))
    ];
    const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = yield model.generateContent(multimodalPayload);
    const filanOutput = (_b = (_a = result.response) === null || _a === void 0 ? void 0 : _a.candidates) === null || _b === void 0 ? void 0 : _b[0].content.parts[0];
    console.log(filanOutput);
    (0, sendResponce_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Get all applyed Loans from retrive successfully',
        data: filanOutput
    });
}));
exports.LoansBankController = {
    getAllApplyedLoans
};
// const filePath = path.join(process.cwd(), 'uploads', 'sample.pdf');
// const readPDF = async () => {
//   try {
//     const dataBuffer = fs.readFileSync(filePath);
//     const data = await pdfParse(dataBuffer);
//     return data.text
//   } catch (err) {
//     console.error('Failed to read or parse PDF:', err);
//   }
// };
// const pdfText = await readPDF()
// const image = async () => {
//  const doc = await Tesseract.recognize(imagePath, 'ben+eng')
//     console.log(doc.data.text);
//     return doc.data.text
// }
// const imageData = await image()
// const result = await aiModel(mainPrompth)
// console.log(result)
