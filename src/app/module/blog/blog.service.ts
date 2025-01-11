import { prisma } from '../../../app';
import { TBlog } from './blog.interface';

const createBlog = async (payload: TBlog) => {
  const result = await prisma.blog.create({ data: payload });
  return result;
};

const getAllBlogs = async () => {
  const result = await prisma.blog.findMany({
    select: {
      title: true, 
      slug: true, 
      content: true, 
      category: true, 
      tags: true, 
      coverImage: true
    }
  });
  return result;
};

const updateBlog = async (payload: TBlog, id: string) => {
  const result = await prisma.blog.update({
    where: { id },
    data: payload,
  },);
  return result;
};

export const BlogService = {
  createBlog,
  updateBlog,
  getAllBlogs,
};
