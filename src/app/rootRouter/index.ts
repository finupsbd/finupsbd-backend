import express from 'express'
import { AuthRouter } from '../module/auth/auth.route'
import { UserRouter } from '../module/user/user.route'
import { PublicRouter } from '../utils/emiCalculator/emi.route'
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
        path: '/bank', 
        route: UserRouter
    },
    {
        path: '/public', 
        route: PublicRouter
    },
]


moduleRouter.forEach(item => router.use(item.path, item.route))

export const RootRouter = router