import express from 'express'
import { AuthRouter } from '../module/auth/auth.route'
import { UserRouter } from '../module/user/user.route'
import { PublicRouter } from '../utils/emiCalculator/emi.route'
import { NewsLetterRouter } from '../module/public/newsLetter/newsLetter.route'
import { BankRouter } from '../module/bank/bank.route'
import { ProfileRouter } from '../module/user/profile/profile.route'
import { BlogRouter } from '../module/blog/blog.route'
import { OpenAiRouter } from '../module/openai/openai.route'
import { ApplicationRouter } from '../module/applicationForm/applicationForm.route'
const router = express.Router()



const moduleRouter = [
    {
        path: '/auth', 
        route: AuthRouter
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
        path: '/bank', 
        route: BankRouter
    },
    {
        path: '/application', 
        route: ApplicationRouter
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
    }
]


moduleRouter.forEach(item => router.use(item.path, item.route))

export const RootRouter = router