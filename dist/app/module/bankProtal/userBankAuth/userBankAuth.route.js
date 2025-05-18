"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBankAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const userBankAuth_controller_1 = require("./userBankAuth.controller");
const userBankAuth_validation_1 = require("./userBankAuth.validation");
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const userBankAuth_1 = require("../../../middleware/userBankAuth");
const router = express_1.default.Router();
router.post("/regiater", (0, validateRequest_1.default)(userBankAuth_validation_1.UserBankAuthValidation.userBankSchemaRegister), userBankAuth_controller_1.UserBankAuthController.userBankRegister);
router.post("/login", (0, validateRequest_1.default)(userBankAuth_validation_1.UserBankAuthValidation.userBankSchemaLogin), userBankAuth_controller_1.UserBankAuthController.userBankLogin);
router.get("/me", (0, userBankAuth_1.bankAuth)("BANK_USER"), userBankAuth_controller_1.UserBankAuthController.me);
exports.UserBankAuthRouter = router;
