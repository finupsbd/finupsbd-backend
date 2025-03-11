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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const app_1 = require("../../../app");
const sendImageToCloud_1 = require("../../utils/sendImageToCloud");
const createBlog = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const coverImage = yield (0, sendImageToCloud_1.sendImageToCloud)(file === null || file === void 0 ? void 0 : file.path);
    payload.coverImage = coverImage !== null && coverImage !== void 0 ? coverImage : undefined;
    const result = yield app_1.prisma.blog.create({ data: payload });
    return result;
});
const getAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.blog.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
            content: true,
            category: true,
            tags: true,
            coverImage: true,
        },
    });
    return result;
});
const updateBlog = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.blog.update({
        where: { id },
        data: payload,
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
exports.BlogService = {
    createBlog,
    updateBlog,
    getAllBlogs,
    deleteBlog,
};
