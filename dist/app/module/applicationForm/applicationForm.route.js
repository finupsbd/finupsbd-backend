"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRouter = void 0;
const express_1 = __importDefault(require("express"));
const applicationForm_controller_1 = require("./applicationForm.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const multer_1 = __importDefault(require("multer"));
const route = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() }); // keeps files in memory
route.post('/create-application', (0, auth_1.default)('USER', 'SUPER_ADMIN', 'ADMIN'), upload.fields([
    { name: 'files', maxCount: 10 }, // your uploaded files
    { name: 'data', maxCount: 1 } // your stringified JSON
]), applicationForm_controller_1.ApplicationController.createApplicationForm);
route.post('/applicant-guarator-info', upload.array("files"), applicationForm_controller_1.ApplicationController.applicantGuarantorInfo);
route.get('/my-loan-application', (0, auth_1.default)('USER', 'SUPER_ADMIN', 'ADMIN'), applicationForm_controller_1.ApplicationController.myLoanApplication);
// route.patch(
//   '/update-status/:id',
//   auth('SUPER_ADMIN', 'ADMIN'),
//   validateRequest(ApplicationValidationSchema.ApplicationStatusUpdateValidation),
//   ApplicationController.statusUpdate
// ); 
route.get('/', applicationForm_controller_1.ApplicationController.getAllApplicationForm);
route.post('/application-tracking', applicationForm_controller_1.ApplicationController.applicationTracking);
route.post('/application-forget', applicationForm_controller_1.ApplicationController.applicationForget);
route.get('/:id', (0, auth_1.default)('USER', 'SUPER_ADMIN', 'ADMIN'), applicationForm_controller_1.ApplicationController.getSingleApplication);
exports.ApplicationRouter = route;
