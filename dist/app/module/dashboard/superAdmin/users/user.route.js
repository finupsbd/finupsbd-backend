"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminUsersRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const route = express_1.default.Router();
route.get('/get-all-users', users_controller_1.DashboardUsersController.getAllusers);
route.get('/get-single-user/:id', users_controller_1.DashboardUsersController.getSingleUser);
exports.SuperAdminUsersRouter = route;
