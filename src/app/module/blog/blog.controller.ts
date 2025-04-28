import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { BlogService } from "./blog.service";
import { BlogValidationSchema } from "./blog.validation";
import sendResponses from "../../utils/sendResponce";
import { TMiddlewareUser } from "../../types/commonTypes";


const createBlog = catchAsync(async (req, res) => {
  const payload = BlogValidationSchema.parse(JSON.parse(req.body.data))
  const file = req.file?.buffer
  const user = req.user as TMiddlewareUser;

  if (!user) {
    throw new Error("User is not authenticated");
  }
  console.log(user);

  const result = await BlogService.createBlog(payload, file, user);

    
    sendResponses(res, {
      success: true,
      message: 'Blog create successfully',
      statusCode: StatusCodes.CREATED,
      data: result,
    })
  });

const getAllBlogs = catchAsync(async (req, res) => {
    const result = await BlogService.getAllBlogs()


    sendResponses(res, {
      success: true,
      message: 'Blogs retrieve successfully',
      statusCode: StatusCodes.OK,
      data: result,
    })
  });

const updateBlog = catchAsync(async (req, res) => {
    const blogId = req.params?.id
    const result = await BlogService.updateBlog(req.body, blogId)


    sendResponses(res, {
      success: true,
      message: 'Update Blog Successfully',
      statusCode: StatusCodes.OK,
      data: result,
    })
  });

const deleteBlog = catchAsync(async (req, res) => {
    const blogId = req.params?.id
    await BlogService.deleteBlog(blogId)


    sendResponses(res, {
      success: true,
      message: 'Blog Deleted Successfully',
      statusCode: StatusCodes.OK,
      data: {},
    })

  });

  
export const BlogController = {
    createBlog,
    updateBlog, 
    getAllBlogs, 
    deleteBlog
  };
  