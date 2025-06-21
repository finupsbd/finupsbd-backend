"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRouter = void 0;
const express_1 = __importDefault(require("express"));
const applicationForm_controller_1 = require("./applicationForm.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const sendImageToCloud_1 = require("../../utils/sendImageToCloud");
const applicationForm_validation_1 = require("./applicationForm.validation");
const route = express_1.default.Router();
// route.get(
//   '/',
//   auth('USER', 'SUPER_ADMIN', 'ADMIN'),
//   ApplicationController.getSingleApplication
// ); 
route.post('/create-application', (0, validateRequest_1.default)(applicationForm_validation_1.LoanApplicationFormSchema), applicationForm_controller_1.ApplicationController.createApplicationForm);
route.post('/applicant-guarator-info', sendImageToCloud_1.upload.array("files"), applicationForm_controller_1.ApplicationController.applicantGuarantorInfo);
// route.patch(
//   '/update-status/:id',
//   auth('SUPER_ADMIN', 'ADMIN'),
//   validateRequest(ApplicationValidationSchema.ApplicationStatusUpdateValidation),
//   ApplicationController.statusUpdate
// ); 
// route.get('/', ApplicationController.getAllApplicationForm);
// route.post('/application-tracking', ApplicationController.applicationTracking)
route.post('/application-forget', applicationForm_controller_1.ApplicationController.applicationForget);
exports.ApplicationRouter = route;
