"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const app_1 = require("../../../app");
const blogQueryBuilder_1 = require("../../buidler/blogQueryBuilder");
const saveFileBlogs_1 = require("../../utils/file-uploads/saveFileBlogs");
const createBlog = (payload, file, user) => __awaiter(void 0, void 0, void 0, function* () {
    // const coverImage = await sendImageToCloud(file);
    var _a;
    const existingUser = yield app_1.prisma.user.findUnique({
        where: { id: user === null || user === void 0 ? void 0 : user.userId },
    });
    const coverImage = yield (0, saveFileBlogs_1.saveFileBlogs)(file.buffer, file.originalname, "blogs", (_a = existingUser === null || existingUser === void 0 ? void 0 : existingUser.userId) !== null && _a !== void 0 ? _a : "");
    payload.coverImage = coverImage !== null && coverImage !== void 0 ? coverImage : undefined;
    if (user.userId) {
        payload.userId = user.userId;
    }
    const result = yield app_1.prisma.blog.create({
        data: Object.assign({}, payload)
    });
    return result;
});
const getAllBlogs = (queryOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const builder = new blogQueryBuilder_1.BlogQueryBuilder(queryOptions);
    const queryArgs = builder.buildFindManyArgs();
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
    };
    queryArgs.select = select;
    const blogs = yield app_1.prisma.blog.findMany(queryArgs);
    return blogs;
});
const updateBlog = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    // Convert category string to Prisma enum if necessary
    const { category } = payload, restPayload = __rest(payload, ["category"]);
    const data = Object.assign(Object.assign({}, restPayload), (category ? { category: category } : {}));
    const result = yield app_1.prisma.blog.update({
        where: { id },
        data: data,
    });
    return result;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistBlog = yield app_1.prisma.blog.findFirst({
        where: { id },
    });
    if (!isExistBlog) {
        throw new Error('Delete Blog Already. thank you');
    }
    const result = yield app_1.prisma.blog.delete({ where: { id } });
    return result;
});
const commentBlog = (blogId, payload, parentId, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, user);
    const isExistBlog = yield app_1.prisma.blog.findFirst({
        where: { id: blogId },
    });
    if (!isExistBlog) {
        throw new Error('Blog not found. thank you');
    }
    const result = yield app_1.prisma.comment.create({
        data: {
            content: payload,
            blogId: blogId,
            userId: user === null || user === void 0 ? void 0 : user.userId,
            parentId: parentId
        },
    });
    console.log(result, 'result comment blog');
    return result;
});
const getSingleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ id });
    const result = yield app_1.prisma.blog.findUnique({
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
    });
    return result;
});
exports.BlogService = {
    createBlog,
    updateBlog,
    getAllBlogs,
    deleteBlog,
    commentBlog,
    getSingleBlog
};
