"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminApplicationRouter = void 0;
const express_1 = __importDefault(require("express"));
const application_controller_1 = require("./application.controller");
const validateRequest_1 = __importDefault(require("../../../../middleware/validateRequest"));
const application_validation_1 = require("./application.validation");
const route = express_1.default.Router();
route.get('/get-all-application', application_controller_1.ApplicarionController.getAllApplication);
route.get('/get-single-application/:id', application_controller_1.ApplicarionController.getSingleApplication);
route.patch('/application-feedback/:id', (0, validateRequest_1.default)(application_validation_1.ApplicationStatusPayload), application_controller_1.ApplicarionController.applicationFeedBack);
route.get('/status-events/:id', application_controller_1.ApplicarionController.getStatusEvents);
exports.SuperAdminApplicationRouter = route;
