/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../../app';
import { sendImageToCloud } from '../../utils/sendImageToCloud';
import { TBlog } from './blog.interface';

const createBlog = async (payload: TBlog, file: any) => {
  const coverImage = await sendImageToCloud(file?.path);
  payload.coverImage = coverImage?.secure_url;

  const result = await prisma.blog.create({ data: payload });
  return result;
};

const getAllBlogs = async () => {
  const result = await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      category: true,
      tags: true,
      coverImage: true,
    },
  });
  return result;
};

const updateBlog = async (payload: TBlog, id: string) => {
  const result = await prisma.blog.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteBlog = async (id: string) => {
  const isExistBlog = await prisma.blog.findFirst({
    where: { id },
  });
  if (!isExistBlog) {
    throw new Error('Delete Blog Already. thank you');
  }

  const result = await prisma.blog.delete({ where: { id } });
  return result;
};

export const BlogService = {
  createBlog,
  updateBlog,
  getAllBlogs,
  deleteBlog,
};
