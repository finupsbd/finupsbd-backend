"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRouter = void 0;
const express_1 = __importDefault(require("express"));
const applicationForm_controller_1 = require("./applicationForm.controller");
const route = express_1.default.Router();
route.post('/', 
// validateRequest(
//   ApplicationValidationSchema.CreateApplicationValidationSchema
// ),
applicationForm_controller_1.ApplicationController.createApplicationForm);
route.get('/', applicationForm_controller_1.ApplicationController.getAllApplicationForm);
exports.ApplicationRouter = route;
