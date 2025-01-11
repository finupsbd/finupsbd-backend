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
const app_1 = require("../../../app");
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.blog.create({ data: payload });
    return result;
});
const getAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.blog.findMany({
        select: {
            title: true,
            slug: true,
            content: true,
            category: true,
            tags: true,
            coverImage: true
        }
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
exports.BlogService = {
    createBlog,
    updateBlog,
    getAllBlogs,
};
