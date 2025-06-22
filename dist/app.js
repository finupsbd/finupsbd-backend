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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const rootRouter_1 = require("./app/rootRouter");
const DB_1 = __importDefault(require("./app/DB"));
const passport_1 = __importDefault(require("passport"));
const os_1 = __importDefault(require("os"));
const config_1 = require("./config");
const app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient({
// log: ['query', 'info', 'warn', 'error'],
});
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "http://localhost:3001", "https://finupsbd-admin-dashboard.vercel.app", "https://finupsbd-fronend-developer.vercel.app"],
    credentials: true, // Allow cookies and authentication headers
}));
(0, DB_1.default)();
app.use(passport_1.default.initialize());
app.use('/api/v1', rootRouter_1.RootRouter);
// Production-grade health-check endpoint
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Timestamp and uptime
    const timestamp = new Date().toISOString();
    const uptime = `${Math.floor(process.uptime())}s`;
    // Memory usage summary in MB
    const { rss, heapUsed, heapTotal } = process.memoryUsage();
    const memory = {
        rss: `${(rss / 1024 / 1024).toFixed(1)} MB`,
        heapUsed: `${(heapUsed / 1024 / 1024).toFixed(1)} MB`,
        heapTotal: `${(heapTotal / 1024 / 1024).toFixed(1)} MB`,
    };
    // Load averages
    const [load1, load5, load15] = os_1.default.loadavg().map(n => n.toFixed(2));
    // Database connectivity
    let db = 'Not Connected';
    try {
        yield exports.prisma.$queryRaw `SELECT 1`;
        db = 'Connected';
    }
    catch (err) {
        console.error('DB health check failed:', err);
    }
    res.status(200).json({
        status: true,
        message: 'FinupsBD server is up and running smoothly.',
        timestamp,
        uptime,
        environment: config_1.ConfigFile.NODE_ENV || 'development',
        npmVersion: config_1.ConfigFile.npm_package_version || 'unknown',
        nodeVersion: config_1.ConfigFile.node_version,
        database: db,
        memory,
        loadAverage: { '1m': load1, '5m': load5, '15m': load15 },
        host: os_1.default.hostname(),
        arch: process.arch,
    });
}));
app.use(globalErrorHandler_1.default); //  global Error handler 
app.use(notFound_1.default); //  user request route not found handler
exports.default = app;
