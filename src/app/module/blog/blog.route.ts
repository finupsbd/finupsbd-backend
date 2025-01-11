import express from "express"
import { BlogController } from "./blog.controller"
import validateRequest from "../../middleware/validateRequest"
import { BlogValidation } from "./blog.validation"


const router = express.Router()



router.post('/', validateRequest(BlogValidation.BlogValidationSchema), BlogController.createBlog)
router.get('/', BlogController.getAllBlogs)
router.patch('/:id', validateRequest(BlogValidation.BlogValidationSchema), BlogController.updateBlog)




export const BlogRouter = router