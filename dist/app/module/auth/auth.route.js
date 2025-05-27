"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validation_1 = require("../user/user.validation");
const auth_validation_1 = require("./auth.validation");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const router = express_1.default.Router();
router.post('/signUp', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserValidationSchema), auth_controller_1.AuthController.signUp);
router.post('/validate-pin', (0, validateRequest_1.default)(user_validation_1.UserValidation.verifyPinValidationSchema), auth_controller_1.AuthController.validatePin);
router.post('/login', (0, validateRequest_1.default)(user_validation_1.UserValidation.loginValidationSchema), auth_controller_1.AuthController.login);
router.post('/forget-password', (0, validateRequest_1.default)(user_validation_1.UserValidation.forgetPasswordValidationSchema), auth_controller_1.AuthController.forgetPassword);
router.post('/reset-password', (0, validateRequest_1.default)(user_validation_1.UserValidation.resetPasswordValidationSchema), auth_controller_1.AuthController.resetPassword);
router.post('/change-password', (0, validateRequest_1.default)(user_validation_1.UserValidation.changePasswordValidationSchema), auth_controller_1.AuthController.changePassword);
router.post('/refresh-token', (0, catchAsync_1.default)((req, res, next) => {
    req.cookies = auth_validation_1.AuthValidation.refreshTokenValidationSchema.parse(req.cookies);
    next();
}), auth_controller_1.AuthController.refreshToken);
router.post('/logout', auth_controller_1.AuthController.logout);
exports.AuthRouter = router;
