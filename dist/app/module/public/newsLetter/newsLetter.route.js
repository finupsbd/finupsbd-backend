"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsLetterRouter = void 0;
const express_1 = __importDefault(require("express"));
const newsLetter_controller_1 = require("./newsLetter.controller");
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const newsLetter_validation_1 = require("./newsLetter.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(newsLetter_validation_1.NewsLetterValidation.createNewsLetterValidationSchema), newsLetter_controller_1.NewsLetterController.createNewsLetter);
router.get('/', newsLetter_controller_1.NewsLetterController.getAllEmail);
exports.NewsLetterRouter = router;
