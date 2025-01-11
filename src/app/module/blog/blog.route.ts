import express from "express"
import { BlogController } from "./blog.controller"
import validateRequest from "../../middleware/validateRequest"
import { BlogValidation } from "./blog.validation"
import { upload } from "../../utils/sendImageToCloud"


const router = express.Router()



router.post('/', upload.single("file"), BlogController.createBlog)
router.get('/', BlogController.getAllBlogs)
router.patch('/:id', validateRequest(BlogValidation.BlogValidationSchema), BlogController.updateBlog)
router.delete('/:id', BlogController.deleteBlog)




export const BlogRouter = router