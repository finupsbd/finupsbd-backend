"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() }); // keeps files in memory
router.get('/get-all-new-loans/:id', (0, auth_1.default)('USER'), user_controller_1.UserController.getAllNewLoans);
router.get('/get-all-existing-loan/:id', (0, auth_1.default)('USER'), user_controller_1.UserController.getAllExistingLoans);
router.get('/get-all-rejects-loan/:id', (0, auth_1.default)('USER'), user_controller_1.UserController.getAllRejectsLoans);
router.get('/', (0, auth_1.default)('USER', 'ADMIN', 'SUPER_ADMIN'), user_controller_1.UserController.getAllUsers);
router.get('/my-profile', (0, auth_1.default)('USER', 'ADMIN', 'SUPER_ADMIN'), user_controller_1.UserController.meProfile);
router.get('/:id', (0, auth_1.default)('USER', 'ADMIN', 'SUPER_ADMIN'), user_controller_1.UserController.getSingleUser);
router.get('/get-application/:id', (0, auth_1.default)('USER'), user_controller_1.UserController.getApplication);
router.post('/create-addi-doc/:id', upload.array("files", 10), (0, auth_1.default)('USER'), user_controller_1.UserController.createAddiDoc);
router.get('/agreement-doc/:id', user_controller_1.UserController.getAgreementDoc);
exports.UserRouter = router;
