/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../../app';
import { BlogQueryBuilder } from '../../buidler/blogQueryBuilder';
import { TMiddlewareUser, TMulterFile } from '../../types/commonTypes';
import { saveFileBlogs } from '../../utils/file-uploads/saveFileBlogs';
import { TBlog } from './blog.interface';
import { TQueryOptions } from './blog.validation';




const createBlog = async (payload: TBlog, file: TMulterFile, user: TMiddlewareUser) => {

  // const coverImage = await sendImageToCloud(file);

  const existingUser = await prisma.user.findUnique({
    where: { id: user?.userId },
  })


  const coverImage = await saveFileBlogs(file.buffer, file.originalname, "blogs", existingUser?.userId ?? "");
  payload.coverImage = coverImage ?? undefined;


  if (user.userId) {
    payload.userId = user.userId;
  }


  const result = await prisma.blog.create({
    data: {
      ...payload
    } as any
  })
  return result;
};

const getAllBlogs = async (queryOptions: TQueryOptions) => {

  const builder = new BlogQueryBuilder(queryOptions);
  const queryArgs = builder.buildFindManyArgs()

  const select = {
    id: true,
    title: true,
    slug: true,
    content: true,
    category: true,
    tags: true,
    coverImage: true,
    user: {
      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          select: { avatar: true },
        },
      },
    },
  }

  queryArgs.select = select

  const blogs = await prisma.blog.findMany(queryArgs);
  return blogs;
};

const updateBlog = async (payload: TBlog, id: string) => {
  // Convert category string to Prisma enum if necessary
  const { category, ...restPayload } = payload;
  const data = {
    ...restPayload,
    ...(category ? { category: category as any } : {}), // Replace 'any' with the actual enum type if imported
  };

  const result = await prisma.blog.update({
    where: { id },
    data: data,
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

const commentBlog = async (blogId: string, payload: string, parentId: string, user: TMiddlewareUser) => {

  console.log(payload, user)

  const isExistBlog = await prisma.blog.findFirst({
    where: { id: blogId },
  });


  if (!isExistBlog) {
    throw new Error('Blog not found. thank you');
  }


  const result = await prisma.comment.create(
    {
      data: {
        content: payload,
        blogId: blogId,
        userId: user?.userId,
        parentId: parentId
      },
    }
  );

  console.log(result, 'result comment blog');

  return result;
};

const getSingleBlog = async (id: string) => {

  console.log({ id })

  const result = await prisma.blog.findUnique(
    {
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        category: true,
        tags: true,
        coverImage: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profile: {
              select: { avatar: true },
            },
          },
        },
        // Fetch all comments, no parent filtering
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            parentId: true,
            user: {
              select: {
                id: true,
                name: true,
                profile: {
                  select: { avatar: true },
                },
              },
            },
          },
        },
      }
    },
  );

  return result;
};


export const BlogService = {
  createBlog,
  updateBlog,
  getAllBlogs,
  deleteBlog,
  commentBlog,
  getSingleBlog
};
