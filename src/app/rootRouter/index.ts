import express from 'express'
import { AuthRouter } from '../module/auth/auth.route'
import { UserRouter } from '../module/user/user.route'
import { PublicRouter } from '../utils/emiCalculator/emi.route'
import { NewsLetterRouter } from '../module/public/newsLetter/newsLetter.route'
import { BankRouter } from '../module/bank/bank.route'
import { ProfileRouter } from '../module/user/profile/profile.route'
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
        path: '/public', 
        route: PublicRouter
    },  
    {
        path: '/news-letter', 
        route: NewsLetterRouter
    }, 
]


moduleRouter.forEach(item => router.use(item.path, item.route))

export const RootRouter = router