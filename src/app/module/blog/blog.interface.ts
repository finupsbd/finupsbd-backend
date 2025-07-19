/* eslint-disable no-unused-vars */


export enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

// Blog Model Interface
export interface TBlog {
  title: string;
  slug: string;
  content: string;
  publishedDate?: Date | undefined;
  status: PostStatus.DRAFT;
  excerpt?: string;
  category: string;
  tags?: string[]; // Array of tags
  coverImage?: string;
  readingTime?: number; // in minutes
  metaTitle?: string;
  metaDescription?: string;
  attachments?: string[]; // Array of file URLs
  language?: string;
  permissions?: string;
  userId?: string
}
