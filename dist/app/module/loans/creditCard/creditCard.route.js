"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCardRouter = void 0;
const express_1 = __importDefault(require("express"));
const sendImageToCloud_1 = require("../../../utils/sendImageToCloud");
const creditCard_controller_1 = require("./creditCard.controller");
const router = express_1.default.Router();
router.post('/', sendImageToCloud_1.upload.single('file'), creditCard_controller_1.CreditCardController.createCreditCard);
router.get('/', creditCard_controller_1.CreditCardController.getAllCreditCard);
router.patch('/:id', sendImageToCloud_1.upload.single('file'), creditCard_controller_1.CreditCardController.updateCreditCard);
exports.CreditCardRouter = router;
