import express from "express"
import { AuthController } from "./auth.controller"
import validateRequest from "../../middleware/validateRequest"
import { UserValidation } from "../user/user.validation"
import auth from "../../middleware/auth"

const router = express.Router()



router.post('/signUp', validateRequest(UserValidation.createUserValidationSchema), AuthController.signUp)
router.post('/validate-pin', auth("USER", "ADMIN", "SUPER_ADMIN"), validateRequest(UserValidation.verifyPinValidationSchema), AuthController.validatePin)
router.post('/login', validateRequest(UserValidation.loginValidationSchema), AuthController.login)
router.post('/forget-password', auth("USER", "ADMIN", "SUPER_ADMIN"), validateRequest(UserValidation.forgetPasswordValidationSchema), AuthController.forgetPassword)
router.post('/reset-password', auth("USER", "ADMIN", "SUPER_ADMIN"), validateRequest(UserValidation.resetPasswordValidationSchema), AuthController.resetPassword)
router.post('/change-password', auth("USER", "ADMIN", "SUPER_ADMIN"), validateRequest(UserValidation.changePasswordValidationSchema), AuthController.changePassword)
router.post('/refresh-token', auth("USER", "ADMIN", "SUPER_ADMIN"), AuthController.refreshToken)
router.post('/logout', AuthController.logout)



export const AuthRouter = router  