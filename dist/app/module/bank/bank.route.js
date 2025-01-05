"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/');
router.get('/my-profile');
// router.get('/:id', )
// router.patch('/login',)
// router.delete('/login', )
exports.UserRouter = router;
