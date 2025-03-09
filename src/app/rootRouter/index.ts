import express from 'express'
import { AuthRouter } from '../module/auth/auth.route'
import { UserRouter } from '../module/user/user.route'
import { PublicRouter } from '../utils/emiCalculator/emi.route'
import { NewsLetterRouter } from '../module/public/newsLetter/newsLetter.route'
import { ProfileRouter } from '../module/user/profile/profile.route'
import { BlogRouter } from '../module/blog/blog.route'
import { OpenAiRouter } from '../module/openai/openai.route'
import { ApplicationRouter } from '../module/applicationForm/applicationForm.route'
import { PersonalLoanRouter } from '../module/loans/personalLoan/personalLoan.route'
import { EligibilityCheckRouter } from '../module/eligibilityCheck/eligibilityCheck.route'
import { HomeLoanRouter } from '../module/loans/homeLoan/homeLoan.route'
import { CarLoanRouter } from '../module/loans/carLoan/carLoan.route'
import { SMELoanRouter } from '../module/loans/smeLoan/smeLoan.route'
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
        path: '/personal-loan', 
        route: PersonalLoanRouter
    },
    {
        path: '/home-loan', 
        route: HomeLoanRouter
    },
    {
        path: '/car-loan', 
        route: CarLoanRouter
    },
    {
        path: '/sme-loan', 
        route: SMELoanRouter
    },
]


moduleRouter.forEach(item => router.use(item.path, item.route))

export const RootRouter = router