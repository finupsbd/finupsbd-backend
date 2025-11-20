import express from "express"
import { BlogController } from "./blog.controller"
import validateRequest from "../../middleware/validateRequest"
import { BlogBaseSchema, quearyOprions } from "./blog.validation"

import auth from "../../middleware/auth"
import multer from "multer"



// 4️⃣ Export Multer instance

export const upload = multer({ storage: multer.memoryStorage() });



const router = express.Router()


router.post('/create-blog', auth("USER", "ADMIN", "SUPER_ADMIN"), upload.single("file"), BlogController.createBlog)
router.post('/comment', auth("USER", "ADMIN", "SUPER_ADMIN"), BlogController.commentBlog)

router.patch('/:id', validateRequest(BlogBaseSchema), BlogController.updateBlog)
router.get('/single-blog/:id', BlogController.getSingleBlog)

router.delete('/:id', BlogController.deleteBlog)
router.post('/all-blogs', validateRequest(quearyOprions), BlogController.getAllBlogs)




export const BlogRouter = router