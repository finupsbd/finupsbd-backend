"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = exports.BlogValidationSchema = exports.PostStatusSchema = void 0;
const zod_1 = require("zod");
exports.PostStatusSchema = zod_1.z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED");
// Zod schema for Blog
exports.BlogValidationSchema = zod_1.z.object({
    title: zod_1.z.string(),
    slug: zod_1.z.string(),
    content: zod_1.z.string(),
    userId: zod_1.z.string(),
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
exports.BlogValidation = {
    BlogValidationSchema: exports.BlogValidationSchema
};
