"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoansBankRouter = void 0;
const express_1 = __importDefault(require("express"));
const LoansBank_controller_1 = require("./LoansBank.controller");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.default)();
router.post('/applyed-loans', upload.array("files", 10), LoansBank_controller_1.LoansBankController.getAllApplyedLoans);
exports.LoansBankRouter = router;
