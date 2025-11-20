import express from 'express'
import { UserRouter } from '../module/user/user.route'
import { PublicRouter } from '../utils/emiCalculator/emi.route'
import { NewsLetterRouter } from '../module/public/newsLetter/newsLetter.route'
import { ProfileRouter } from '../module/user/profile/profile.route'
import { BlogRouter } from '../module/blog/blog.route'
import { OpenAiRouter } from '../module/openai/openai.route'
import { ApplicationRouter } from '../module/applicationForm/applicationForm.route'
import { EligibilityCheckRouter } from '../module/eligibilityCheck/eligibilityCheck.route'
import { UserBankAuthRouter } from '../module/bankProtal/userBankAuth/userBankAuth.route'
import { DashBoardSubRoutes } from './subRoute'
import { AuthRouterV2 } from '../module/authV2/auth.route'
import { CardsRouter } from '../module/cards/cards.route'
import { LoansRouter } from '../module/loans/loans.route'



const router = express.Router()



const moduleRouter = [
    // {
    //     path: '/auth',
    //     route: AuthRouter
    // },
    {
        path: '/auth',
        route: AuthRouterV2
    },
    {
        path: '/users',
        route: UserRouter
    },


    {
        path: '/profiles',
        route: ProfileRouter
    },
    {
        path: '/public',
        route: PublicRouter
    },
    {
        path: '/news-letter',
        route: NewsLetterRouter
    },
    {
        path: '/blogs',
        route: BlogRouter
    },
    {
        path: '/openai',
        route: OpenAiRouter
    },
    {
        path: '/application',
        route: ApplicationRouter
    },
    {
        path: '/eligibility-check',
        route: EligibilityCheckRouter
    },
    {
        path: '/bank-portal/auth',
        route: UserBankAuthRouter
    },
    {
        path: '/super-admin',
        route: DashBoardSubRoutes
    },

]


moduleRouter.forEach(item => router.use(item.path, item.route))

export const RootRouter = router