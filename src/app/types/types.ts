import { Prisma } from '@prisma/client';

export type TBlog = Prisma.BlogCreateInput & {
  user?: Prisma.UserCreateInput; // Use the full user input if you're passing user data
};