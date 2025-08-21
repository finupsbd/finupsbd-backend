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
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://admin.finupsbd.com",
        "https://stage.finupsbd.com",
        "https://finupsbd.com",
        "https://api.finupsbd.com",
        "https://finupsbd-admin-dashboard.vercel.app",
        "https://finupsbd-fronend-developer.vercel.app"
    ],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "60mb" }));
app.use(express_1.default.urlencoded({ limit: '30mb', extended: true }));
// Note: Automatic seeding on every start is disabled.
// import seedSuperAdmin from './app/DB';
(0, DB_1.default)();
// Rate limiting: Allow 100 requests per 15 minutes from a single IP
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);
app.use(passport_1.default.initialize());
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
app.use('/api/v1', rootRouter_1.RootRouter);
app.use('/__nextjs_original-stack-frames', (req, res) => {
    res.status(204).end();
});
//henarate custom error 
// Simple server health-check endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'FinupsBD server is up and running smoothly.',
        developer: "Reza Shamim",
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
