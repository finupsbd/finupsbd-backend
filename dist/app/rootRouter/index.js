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
const newsLetter_route_1 = require("../module/public/newsLetter/newsLetter.route");
const bank_route_1 = require("../module/bank/bank.route");
const profile_route_1 = require("../module/user/profile/profile.route");
const blog_route_1 = require("../module/blog/blog.route");
// import { ApplicationRouter } from '../module/applicationForm/applicationForm.route'
const openai_route_1 = require("../module/openai/openai.route");
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
        path: '/profiles',
        route: profile_route_1.ProfileRouter
    },
    {
        path: '/bank',
        route: bank_route_1.BankRouter
    },
    // {
    //     path: '/application-form', 
    //     route: ApplicationRouter
    // },
    {
        path: '/public',
        route: emi_route_1.PublicRouter
    },
    {
        path: '/news-letter',
        route: newsLetter_route_1.NewsLetterRouter
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRouter
    },
    {
        path: '/openai',
        route: openai_route_1.OpenAiRouter
    }
];
moduleRouter.forEach(item => router.use(item.path, item.route));
exports.RootRouter = router;
