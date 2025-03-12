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
const profile_route_1 = require("../module/user/profile/profile.route");
const blog_route_1 = require("../module/blog/blog.route");
const openai_route_1 = require("../module/openai/openai.route");
const applicationForm_route_1 = require("../module/applicationForm/applicationForm.route");
const personalLoan_route_1 = require("../module/loans/personalLoan/personalLoan.route");
const eligibilityCheck_route_1 = require("../module/eligibilityCheck/eligibilityCheck.route");
const homeLoan_route_1 = require("../module/loans/homeLoan/homeLoan.route");
const carLoan_route_1 = require("../module/loans/carLoan/carLoan.route");
const smeLoan_route_1 = require("../module/loans/smeLoan/smeLoan.route");
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
    },
    {
        path: '/application',
        route: applicationForm_route_1.ApplicationRouter
    },
    {
        path: '/eligibility-check',
        route: eligibilityCheck_route_1.EligibilityCheckRouter
    },
    {
        path: '/personal-loan',
        route: personalLoan_route_1.PersonalLoanRouter
    },
    {
        path: '/home-loan',
        route: homeLoan_route_1.HomeLoanRouter
    },
    {
        path: '/car-loan',
        route: carLoan_route_1.CarLoanRouter
    },
    {
        path: '/sme-loan',
        route: smeLoan_route_1.SMELoanRouter
    },
];
moduleRouter.forEach(item => router.use(item.path, item.route));
exports.RootRouter = router;
