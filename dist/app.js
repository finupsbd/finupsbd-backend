"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const rootRouter_1 = require("./app/rootRouter");
const DB_1 = __importDefault(require("./app/DB"));
const passport_1 = __importDefault(require("passport"));
const app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true
}));
(0, DB_1.default)();
app.use(passport_1.default.initialize());
app.use('/v1', rootRouter_1.RootRouter);
app.get('/', (req, res) => {
    res.send({ message: 'finupsBD server is running!' });
});
app.use(globalErrorHandler_1.default); //  global Error handler 
app.use(notFound_1.default); //  user request route not found handler
exports.default = app;
