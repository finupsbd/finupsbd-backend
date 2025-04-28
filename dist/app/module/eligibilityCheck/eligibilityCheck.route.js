"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EligibilityCheckRouter = void 0;
const express_1 = __importDefault(require("express"));
const eligibilityCheck_controller_1 = require("./eligibilityCheck.controller");
const eligibilityCheck_validation_1 = require("./eligibilityCheck.validation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const route = express_1.default.Router();
route.post('/', (0, validateRequest_1.default)(eligibilityCheck_validation_1.eligibilityValidationSchema.eligibilitySchema.innerType()), eligibilityCheck_controller_1.EligibilityCheckController.eligibilityCheck);
exports.EligibilityCheckRouter = route;
