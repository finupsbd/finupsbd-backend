// src/lib/query/BlogQueryBuilder.ts
import { Prisma } from '@prisma/client';
import { TQueryOptions } from '../module/blog/blog.validation';

// interface BlogQueryOptions {
//   search?: string;
//   category?: Category;
//   tags?: string[];
//   status?: PostStatus;
//   language?: string;
//   userId?: string;
//   permissions?: string;
//   fromDate?: string;
//   toDate?: string;
//   sortBy?: keyof Prisma.BlogOrderByWithRelationInput;
//   sortOrder?: 'asc' | 'desc';
//   includeUser?: boolean;
//   includeCommentCount?: boolean;
//   page?: number;
//   limit?: number;
// }




export class BlogQueryBuilder {
    private where: Prisma.BlogWhereInput = {};
    private include: Prisma.BlogInclude = {};
    private orderBy: Prisma.BlogOrderByWithRelationInput = {};
    private skip = 0;
    private take = 10;

    constructor(private options: TQueryOptions) {
        this.buildWhere();
        this.buildInclude();
        this.buildSort();
        this.buildPagination();
    }

    private buildWhere() {
        const {
            search,
            category,
            tags,
            status,
            language,
            userId,
            permissions,
            fromDate,
            toDate,
        } = this.options;

        const conditions: Prisma.BlogWhereInput[] = [];

        if (search) {
            conditions.push({
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } },
                    { excerpt: { contains: search, mode: 'insensitive' } },
                ],
            });
        }

///// multiple categoty filter
        if (category) {
            if (Array.isArray(category)) {
                conditions.push({ category: { in: category } });
            } else {
                conditions.push({ category: { equals: category } });
            }
        }


        if (tags && tags.length > 0) conditions.push({ tags: { hasSome: tags } });
        if (status) conditions.push({ status });
        if (language) conditions.push({ language });
        if (permissions) conditions.push({ permissions });
        if (userId) conditions.push({ userId });

        if (fromDate || toDate) {
            const range: Prisma.DateTimeFilter = {};
            if (fromDate) range.gte = new Date(fromDate);
            if (toDate) range.lte = new Date(toDate);
            conditions.push({ publishedDate: range });
        }

        this.where = conditions.length ? { AND: conditions } : {};
    }

    private buildInclude() {
        const { includeUser, includeCommentCount } = this.options;

        if (includeUser) this.include.user = true;
        if (includeCommentCount) {
            this.include._count = {
                select: { comments: true },
            };
        }
    }

    private buildSort() {
        const { sortBy = 'publishedDate', sortOrder = 'desc' } = this.options;
        this.orderBy = { [sortBy]: sortOrder };
    }

    private buildPagination() {
        const { page = 1, limit = 10 } = this.options;
        this.skip = (page - 1) * limit;
        this.take = limit;
    }

    public buildFindManyArgs(): Prisma.BlogFindManyArgs {
        return {
            where: this.where,
            orderBy: this.orderBy,
            //   include: this.include,
            skip: this.skip,
            take: this.take,
        };
    }
}
