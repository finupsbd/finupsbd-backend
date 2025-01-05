"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../module/auth/auth.route");
const user_route_1 = require("../module/user/user.route");
const emi_route_1 = require("../utils/emiCalculator/emi.route");
const router = express_1.default.Router();
const moduleRouter = [
    {
        path: '/auth',
        route: auth_route_1.AuthRouter
    },
    {
        path: '/users',
        route: user_route_1.UserRouter
    },
    {
        path: '/bank',
        route: user_route_1.UserRouter
    },
    {
        path: '/public',
        route: emi_route_1.PublicRouter
    },
];
moduleRouter.forEach(item => router.use(item.path, item.route));
exports.RootRouter = router;
