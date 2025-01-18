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
exports.OpenaiServices = void 0;
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY, // Load API key from environment variables
});
const model = "gpt-4o-mini";
function createAssistant() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield openai.beta.assistants.create({
            name: "finupsBD",
            instructions: "You are a personal advisor about loan, cards include anything. Write and run code to answer math questions.",
            tools: [{ type: "code_interpreter" }],
            model: model
        });
    });
}
function interactWithAssistant(assistantId, message) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield openai.chat.completions.create({
            model: model,
            messages: [{ role: "user", content: message }],
        });
    });
}
exports.OpenaiServices = {
    createAssistant,
    interactWithAssistant
};
