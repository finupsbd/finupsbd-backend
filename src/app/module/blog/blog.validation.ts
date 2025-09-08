import { z } from "zod";




export const PostStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED");

const CategoryEnum = z.enum(["CREDIT_CARD", "LOAN", "CREDIT_SCORE", "CUSTOMER_SUCCESS"]);

const StatusEnum = z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]);
// Zod schema for Blog
export const BlogValidationSchema = z.object({
    title: z.string(),
    slug: z.string(),
    content: z.string(),
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


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const quearyOprions = z.object({
    search: z.string().optional(), // optional search string
    tags: z.array(z.string()).optional(), // array of tag strings
    category: CategoryEnum.optional(), // required enum
    status: StatusEnum.optional(), // required enum
    language: z.string().length(2).optional(), // e.g., 'en', 'bn' etc.
    userId: z.string().min(1).optional(), // must be a non-empty string
    permissions: z.enum(["public", "private"]).optional(),
    fromDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid fromDate format",
    }).optional(),
    toDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid toDate format",
    }).optional(),
    sortBy: z.enum(["title", "createdAt", "updatedAt"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
    includeUser: z.boolean().optional(),
    includeCommentCount: z.boolean().optional(),
    page: z.number().min(1).optional(),
    limit: z.number().min(1).max(100).optional(),
});


export type TQueryOptions = z.infer<typeof quearyOprions>

