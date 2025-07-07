"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const rootRouter_1 = require("./app/rootRouter");
const DB_1 = __importDefault(require("./app/DB"));
const os_1 = __importStar(require("os"));
const app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://admin.finupsbd.com",
        "https://stage.finupsbd.com",
        "https://wwww.finupsbd.com",
        "https://finupsbd-fronend-developer.vercel.app"
    ],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
// Note: Automatic seeding on every start is disabled.
// import seedSuperAdmin from './app/DB';
(0, DB_1.default)();
app.use(passport_1.default.initialize());
app.use('/api/v1', rootRouter_1.RootRouter);
// Simple server health-check endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'FinupsBD server is up and running smoothly.',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(), // in seconds
        server: {
            hostname: os_1.default.hostname(),
            platform: os_1.default.platform(),
            arch: os_1.default.arch(),
            nodeVersion: process.version,
        },
        application: {
            name: 'FinupsBD',
            environment: process.env.NODE_ENV || 'development',
            version: os_1.version,
        },
        request: {
            ip: req.ip,
            userAgent: req.get('User-Agent'),
        },
    });
});
// Middleware execution order corrected
app.use(notFound_1.default);
app.use(globalErrorHandler_1.default);
exports.default = app;
