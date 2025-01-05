import express from "express"
import { UserController } from "./user.controller"
import auth from "../../middleware/auth"

const router = express.Router()



router.get('/', auth("USER"), UserController.getAllUsers)
router.get('/my-profile', auth("USER", "ADMIN", "SUPER_USER"), UserController.meProfile)


export const UserRouter = router