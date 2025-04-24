"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRouter = void 0;
const express_1 = __importDefault(require("express"));
const applicationForm_controller_1 = require("./applicationForm.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const applicationForm_validation_1 = require("./applicationForm.validation");
const route = express_1.default.Router();
route.get('/', (0, auth_1.default)('USER', 'SUPER_ADMIN', 'ADMIN'), applicationForm_controller_1.ApplicationController.getSingleApplication);
route.post('/', (0, auth_1.default)('USER', 'SUPER_ADMIN', 'ADMIN'), (0, validateRequest_1.default)(applicationForm_validation_1.ApplicationValidationSchema.CreateApplicationValidationSchema), applicationForm_controller_1.ApplicationController.createApplicationForm);
route.patch('/update-status/:id', (0, auth_1.default)('SUPER_ADMIN', 'ADMIN'), (0, validateRequest_1.default)(applicationForm_validation_1.ApplicationValidationSchema.ApplicationStatusUpdateValidation), applicationForm_controller_1.ApplicationController.statusUpdate);
route.get('/', applicationForm_controller_1.ApplicationController.getAllApplicationForm);
route.post('/application-tracking', applicationForm_controller_1.ApplicationController.applicationTracking);
// route.post('/application-forget', ApplicationController.applicationForget)
exports.ApplicationRouter = route;
