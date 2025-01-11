import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { BlogService } from "./blog.service";
import { BlogValidationSchema } from "./blog.validation";


const createBlog = catchAsync(async (req, res) => {
  const payload = BlogValidationSchema.parse(JSON.parse(req.body.data))
  const file = req.file


    const result = await BlogService.createBlog(payload, file)

    
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Blog create successfully',
      statusCode: StatusCodes.CREATED,
      data: result,
    });
  });

const getAllBlogs = catchAsync(async (req, res) => {
    const result = await BlogService.getAllBlogs()

    
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Blogs retrieve successfully',
      statusCode: StatusCodes.OK,
      data: result,
    });
  });

const updateBlog = catchAsync(async (req, res) => {
    const blogId = req.params?.id
    const result = await BlogService.updateBlog(req.body, blogId)


    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Update Blog Successfully',
      statusCode: StatusCodes.OK,
      data: result,
    });
  });

const deleteBlog = catchAsync(async (req, res) => {
    const blogId = req.params?.id
    await BlogService.deleteBlog(blogId)


    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Blog Deleted Successfully',
      statusCode: StatusCodes.OK,
      data: {},
    });
  });

  
export const BlogController = {
    createBlog,
    updateBlog, 
    getAllBlogs, 
    deleteBlog
  };
  