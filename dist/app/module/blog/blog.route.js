"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRouter = exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const multer_1 = __importDefault(require("multer"));
// 4️⃣ Export Multer instance
exports.upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const router = express_1.default.Router();
router.post('/create-blog', (0, auth_1.default)("USER", "ADMIN", "SUPER_ADMIN"), exports.upload.single("file"), blog_controller_1.BlogController.createBlog);
router.post('/comment', (0, auth_1.default)("USER", "ADMIN", "SUPER_ADMIN"), blog_controller_1.BlogController.commentBlog);
router.patch('/:id', (0, validateRequest_1.default)(blog_validation_1.BlogValidationSchema), blog_controller_1.BlogController.updateBlog);
router.get('/single-blog/:id', blog_controller_1.BlogController.getSingleBlog);
router.delete('/:id', blog_controller_1.BlogController.deleteBlog);
router.post('/all-blogs', (0, validateRequest_1.default)(blog_validation_1.quearyOprions), blog_controller_1.BlogController.getAllBlogs);
exports.BlogRouter = router;
