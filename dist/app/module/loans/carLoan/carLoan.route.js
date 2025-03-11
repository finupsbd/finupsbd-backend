"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarLoanRouter = void 0;
const express_1 = __importDefault(require("express"));
const sendImageToCloud_1 = require("../../../utils/sendImageToCloud");
const carLoan_controller_1 = require("./carLoan.controller");
const router = express_1.default.Router();
router.post('/', sendImageToCloud_1.upload.single('file'), carLoan_controller_1.CarLoanController.createCarLoan);
router.get('/', carLoan_controller_1.CarLoanController.getAllCarLoan);
router.patch('/:id', sendImageToCloud_1.upload.single('file'), carLoan_controller_1.CarLoanController.updateCarLoan);
exports.CarLoanRouter = router;
