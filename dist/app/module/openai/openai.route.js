"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiRouter = void 0;
const express_1 = __importDefault(require("express"));
const openai_controller_1 = require("./openai.controller");
const router = express_1.default.Router();
router.post('/assistant', openai_controller_1.OpenaiController.aiAssistant);
router.post("/assistant/:id/message", openai_controller_1.OpenaiController.interactWithAssistant);
exports.OpenAiRouter = router;
