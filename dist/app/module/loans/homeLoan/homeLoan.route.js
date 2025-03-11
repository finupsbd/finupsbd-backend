"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeLoanRouter = void 0;
const express_1 = __importDefault(require("express"));
const sendImageToCloud_1 = require("../../../utils/sendImageToCloud");
const homeLoan_controller_1 = require("./homeLoan.controller");
const router = express_1.default.Router();
router.post('/', sendImageToCloud_1.upload.single('file'), homeLoan_controller_1.HomeLoanController.createHomeLoan);
router.get('/', homeLoan_controller_1.HomeLoanController.getAllHomeLoan);
router.patch('/:id', sendImageToCloud_1.upload.single('file'), homeLoan_controller_1.HomeLoanController.updateHomeLoan);
exports.HomeLoanRouter = router;
