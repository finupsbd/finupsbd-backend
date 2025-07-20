"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quearyOprions = exports.BlogValidationSchema = exports.PostStatusSchema = void 0;
const zod_1 = require("zod");
exports.PostStatusSchema = zod_1.z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED");
const CategoryEnum = zod_1.z.enum(["CREDIT_CARD", "LOAN", "CREDIT_SCORE", "CUSTOMER_SUCCESS"]);
const StatusEnum = zod_1.z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]);
// Zod schema for Blog
exports.BlogValidationSchema = zod_1.z.object({
    title: zod_1.z.string(),
    slug: zod_1.z.string(),
    content: zod_1.z.string(),
    publishedDate: zod_1.z.date().optional(),
    status: exports.PostStatusSchema,
    excerpt: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(), // Array of tags
    coverImage: zod_1.z.string().optional(),
    readingTime: zod_1.z.number().optional(), // in minutes
    metaTitle: zod_1.z.string().optional(),
    metaDescription: zod_1.z.string().optional(),
    attachments: zod_1.z.array(zod_1.z.string()).optional(), // Array of file URLs
    language: zod_1.z.string().optional(),
    permissions: zod_1.z.string().optional(),
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
exports.quearyOprions = zod_1.z.object({
    search: zod_1.z.string().optional(), // optional search string
    tags: zod_1.z.array(zod_1.z.string()).optional(), // array of tag strings
    category: CategoryEnum.optional(), // required enum
    status: StatusEnum.optional(), // required enum
    language: zod_1.z.string().length(2).optional(), // e.g., 'en', 'bn' etc.
    userId: zod_1.z.string().min(1).optional(), // must be a non-empty string
    permissions: zod_1.z.enum(["public", "private"]).optional(),
    fromDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid fromDate format",
    }).optional(),
    toDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid toDate format",
    }).optional(),
    sortBy: zod_1.z.enum(["title", "createdAt", "updatedAt"]).optional(),
    sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    includeUser: zod_1.z.boolean().optional(),
    includeCommentCount: zod_1.z.boolean().optional(),
    page: zod_1.z.number().min(1).optional(),
    limit: zod_1.z.number().min(1).max(100).optional(),
});
