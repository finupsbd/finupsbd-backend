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
exports.OpenaiController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const openai_service_1 = require("./openai.service");
// const aiAssistant = catchAsync(async (req, res) => {
//   const assistant = await OpenaiServices.createAssistant() 
//   res.status(200).json({
//     success: true,
//     message: "Assistant created successfully",
//     assistantId: assistant.id,
//   });
// });
const interactWithAssistant = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { message } = req.body;
    const response = yield openai_service_1.OpenaiServices.interactWithAssistant(id, message);
    res.status(200).json({
        success: true,
        reply: response,
    });
}));
exports.OpenaiController = {
    interactWithAssistant,
};
