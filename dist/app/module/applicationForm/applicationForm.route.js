"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRouter = void 0;
const express_1 = __importDefault(require("express"));
const applicationForm_controller_1 = require("./applicationForm.controller");
const route = express_1.default.Router();
// route.post(
//   '/',
//   auth('USER', "ADMIN", "SUPER_ADMIN"), 
//   upload.fields([{ name: 'images' }]), 
//   ApplicationController.createApplicationForm
// ); 
// route.get('/', ApplicationController.getAllApplicationForm);
route.post('/application-tracking', applicationForm_controller_1.ApplicationController.applicationTracking);
route.post('/application-forget', applicationForm_controller_1.ApplicationController.applicationForget);
exports.ApplicationRouter = route;
