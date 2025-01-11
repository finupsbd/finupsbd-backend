import { z } from "zod";




export const PostStatusSchema = z.enum([ "DRAFT" ,  "PUBLISHED" , "ARCHIVED"]).default("PUBLISHED");
    // Zod schema for Blog
export const BlogValidationSchema = z.object({
    title: z.string(),
    slug: z.string(),
    content: z.string(),
    userId: z.string(),
    publishedDate: z.date().optional(),
    status: PostStatusSchema,
    excerpt: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(), // Array of tags
    coverImage: z.string().optional(),
    readingTime: z.number().optional(), // in minutes
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    attachments: z.array(z.string()).optional(), // Array of file URLs
    language: z.string().optional(),
    permissions: z.string().optional(),
  });
  
  // Zod schema for Comment
//   export const CommentSchema = z.object({
//     id: z.number(),
//     content: z.string(),
//     blogId: z.number(),
//     blog: BlogValidationSchema, // Relationship with Blog
//     createdAt: z.date(),
//     updatedAt: z.date(),
//   });


export const BlogValidation = {
    BlogValidationSchema
}