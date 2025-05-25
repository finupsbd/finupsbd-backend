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
exports.initRedis = initRedis;
// src/lib/redisClient.ts
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    username: 'default',
    password: process.env.REDIS_PASSWORD, // ← move creds into env!
    socket: {
        host: process.env.REDIS_HOST, // ← e.g. redis-12708.crce194…
        port: Number(process.env.REDIS_PORT), // ← e.g. 12708
    },
});
client.on('error', (err) => console.error('Redis Client Error', err));
// Connect once, at app startup
function initRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!client.isOpen) {
            yield client.connect();
            console.log('🔗 Connected to Redis');
        }
    });
}
exports.default = client;
