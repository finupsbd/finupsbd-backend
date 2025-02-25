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
const os_1 = __importDefault(require("os"));
const app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient({
// log: ['query', 'info', 'warn', 'error'],
});
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true
}));
(0, DB_1.default)();
app.use(passport_1.default.initialize());
app.use('/api/v1', rootRouter_1.RootRouter);
app.get('/', (req, res) => {
    const currentTimestamp = new Date().toISOString();
    const uptimeSeconds = process.uptime();
    const memoryUsage = process.memoryUsage();
    const hostname = os_1.default.hostname();
    const loadAverage = os_1.default.loadavg();
    const cpuInfo = os_1.default.cpus();
    const nodeVersion = process.version;
    const platform = process.platform;
    const processId = process.pid;
    const arch = process.arch;
    const networkInterfaces = os_1.default.networkInterfaces();
    res.status(200).json({
        status: 'success',
        message: 'finupsBD server is fully operational and healthy.',
        timestamp: currentTimestamp,
        uptime: `${uptimeSeconds.toFixed(2)} seconds`,
        hostname,
        memoryUsage,
        loadAverage,
        // For each CPU, return its model, speed, and time spent in various states.
        cpuInfo: cpuInfo.map(cpu => ({
            model: cpu.model,
            speed: cpu.speed,
            times: cpu.times
        })),
        nodeVersion,
        platform,
        processId,
        arch,
        networkInterfaces,
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || 'unknown'
    });
});
app.use(globalErrorHandler_1.default); //  global Error handler 
app.use(notFound_1.default); //  user request route not found handler
exports.default = app;
