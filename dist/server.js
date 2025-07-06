"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
let server;
function main() {
    server = app_1.default.listen(config_1.ConfigFile.PORT, () => {
        console.log(`Server is running on port ${config_1.ConfigFile.PORT}`);
    });
    server.on('error', (error) => {
        console.error('Server startup error:', error);
        process.exit(1);
    });
}
main();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shutdown = (reason, details) => {
    console.log(`${reason}! Shutting down the server...`);
    if (details) {
        console.log(details);
    }
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
    shutdown('Unhandled Promise Rejection', reason);
});
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    shutdown('Uncaught Exception', err);
});
