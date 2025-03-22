"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalLoanRouter = void 0;
const express_1 = __importDefault(require("express"));
const sendImageToCloud_1 = require("../../../utils/sendImageToCloud");
const auth_1 = __importDefault(require("../../../middleware/auth"));
const personalLoan_controller_1 = require("./personalLoan.controller");
const router = express_1.default.Router();
router.post('/', sendImageToCloud_1.upload.single('file'), (0, auth_1.default)("ADMIN", "SUPER_ADMIN"), personalLoan_controller_1.PersonalLoanController.createPersonalLoan);
router.get('/', personalLoan_controller_1.PersonalLoanController.getAllPersonalLoan);
router.patch('/:id', sendImageToCloud_1.upload.single('file'), (0, auth_1.default)("ADMIN", "SUPER_ADMIN"), personalLoan_controller_1.PersonalLoanController.updatePersonalLoan);
exports.PersonalLoanRouter = router;
