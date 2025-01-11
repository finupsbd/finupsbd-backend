"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRouter = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.BlogValidationSchema), blog_controller_1.BlogController.createBlog);
router.get('/', blog_controller_1.BlogController.getAllBlogs);
router.patch('/:id', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.BlogValidationSchema), blog_controller_1.BlogController.updateBlog);
exports.BlogRouter = router;
