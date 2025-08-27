"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashBoardSubRoutes = void 0;
const express_1 = __importDefault(require("express"));
const application_route_1 = require("../../module/dashboard/superAdmin/application/application.route");
const user_route_1 = require("../../module/dashboard/superAdmin/users/user.route");
const router = express_1.default.Router();
const dashboardRoutes = [
    {
        path: '/application',
        route: application_route_1.SuperAdminApplicationRouter
    },
    {
        path: '/users',
        route: user_route_1.SuperAdminUsersRouter
    },
];
dashboardRoutes.forEach(item => router.use(item.path, item.route));
exports.DashBoardSubRoutes = router;
