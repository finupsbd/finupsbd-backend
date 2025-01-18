

// Enum for Post Status
// export enum PostStatus {
//     DRAFT = "DRAFT",
//     PUBLISHED = "PUBLISHED",
//     ARCHIVED = "ARCHIVED",
//   }
  
  // Blog Model Interface
  export interface TBlog {
    id?: string;
    title: string;
    slug: string;
    content: string;
    userId: string;
    publishedDate?: Date | undefined;
    status: "DRAFT" |  "PUBLISHED" | "ARCHIVED";
    excerpt?: string;
    category?: string;
    tags?: string[]; // Array of tags
    coverImage?: string;
    readingTime?: number; // in minutes
    metaTitle?: string;
    metaDescription?: string;
    attachments?: string[]; // Array of file URLs
    language?: string;
    permissions?: string;
  }
