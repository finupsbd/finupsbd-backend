"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstantLoanRouter = void 0;
const express_1 = __importDefault(require("express"));
const sendImageToCloud_1 = require("../../../utils/sendImageToCloud");
const auth_1 = __importDefault(require("../../../middleware/auth"));
const instantLoan_controller_1 = require("./instantLoan.controller");
const router = express_1.default.Router();
router.post('/', sendImageToCloud_1.upload.single('file'), 
// auth("ADMIN", "SUPER_ADMIN"),
instantLoan_controller_1.InstantLoanController.createInstantLoan);
router.get('/', instantLoan_controller_1.InstantLoanController.getAllInstantLoan);
router.patch('/:id', sendImageToCloud_1.upload.single('file'), (0, auth_1.default)("ADMIN", "SUPER_ADMIN"), instantLoan_controller_1.InstantLoanController.updateInstantLoan);
exports.InstantLoanRouter = router;
