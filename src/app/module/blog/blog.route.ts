import express from "express"
import { BlogController } from "./blog.controller"
import validateRequest from "../../middleware/validateRequest"
import { BlogValidation } from "./blog.validation"
import { upload } from "../../utils/sendImageToCloud"
import auth from "../../middleware/auth"


const router = express.Router()



router.post('/', auth("USER", "ADMIN", "SUPER_ADMIN"), upload.single("file"), BlogController.createBlog)
router.post('/comment/:id', auth("USER", "ADMIN", "SUPER_ADMIN"),BlogController.commentBlog)
router.get('/', BlogController.getAllBlogs)
router.patch('/:id',  validateRequest(BlogValidation.BlogValidationSchema), BlogController.updateBlog)
router.delete('/:id', BlogController.deleteBlog)




export const BlogRouter = router