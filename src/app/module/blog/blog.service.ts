/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../../app';
import { TMiddlewareUser } from '../../types/commonTypes';
import { sendImageToCloud } from '../../utils/sendImageToCloud';
import { TBlog } from './blog.interface';

const createBlog = async (payload: TBlog, file: any, user: TMiddlewareUser ) => {
  const coverImage = await sendImageToCloud(file);
  payload.coverImage = coverImage ?? undefined;
  payload.userId = user.userId ? user.userId : undefined;

  const result = await prisma.blog.create({ data: payload as any });
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
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: {
                select: {
                  avatar: true,
                },
              },
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profile: {
            select: {
              avatar: true,
            },
          }
        },
      }
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




const commentBlog = async (blogId: string, payload: {content: string}, user: TMiddlewareUser ) => {

  const isExistBlog = await prisma.blog.findFirst({
    where: { id : blogId },
  });
  if (!isExistBlog) {
    throw new Error('Blog not found. thank you');
  }


  const result = await prisma.comment.create(
    {
      data: {
        content: payload.content,
        blogId: blogId,
        userId: user.userId ? user.userId : undefined,
      },
    } as any
  );

  console.log(result, 'result comment blog');

  return result;


};

export const BlogService = {
  createBlog,
  updateBlog,
  getAllBlogs,
  deleteBlog,
  commentBlog
};
                      