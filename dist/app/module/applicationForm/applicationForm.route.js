"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRouter = void 0;
const express_1 = __importDefault(require("express"));
const applicationForm_controller_1 = require("./applicationForm.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const route = express_1.default.Router();
route.post('/', (0, auth_1.default)('USER', 'SUPER_ADMIN', 'ADMIN'), applicationForm_controller_1.ApplicationController.createApplicationForm);
route.get('/', applicationForm_controller_1.ApplicationController.getAllApplicationForm);
// route.post('/application-tracking', ApplicationController.applicationTracking)
// route.post('/application-forget', ApplicationController.applicationForget)
exports.ApplicationRouter = route;
