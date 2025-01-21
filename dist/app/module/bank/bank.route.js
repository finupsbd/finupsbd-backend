"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankRouter = void 0;
const express_1 = __importDefault(require("express"));
const bank_controller_1 = require("./bank.controller");
const sendImageToCloud_1 = require("../../utils/sendImageToCloud");
const router = express_1.default.Router();
router.post('/', sendImageToCloud_1.upload.single('file'), bank_controller_1.BankInfoController.createBankInfo);
router.get('/', bank_controller_1.BankInfoController.getallBankInfo);
router.patch('/:id', sendImageToCloud_1.upload.single('file'), bank_controller_1.BankInfoController.updateBookInfo);
exports.BankRouter = router;
