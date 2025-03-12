"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMELoanRouter = void 0;
const express_1 = __importDefault(require("express"));
const sendImageToCloud_1 = require("../../../utils/sendImageToCloud");
const smeLoan_controller_1 = require("./smeLoan.controller");
const router = express_1.default.Router();
router.post('/', sendImageToCloud_1.upload.single('file'), smeLoan_controller_1.SMELoanController.createSMELoan);
router.get('/', smeLoan_controller_1.SMELoanController.getAllSMELoan);
router.patch('/:id', sendImageToCloud_1.upload.single('file'), smeLoan_controller_1.SMELoanController.updateSMELoan);
exports.SMELoanRouter = router;
