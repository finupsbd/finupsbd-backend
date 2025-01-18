"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverless_express_1 = __importDefault(require("@vendia/serverless-express"));
const app_1 = __importDefault(require("../app"));
const server = (0, serverless_express_1.default)({ app: app_1.default });
exports.default = (req, res) => server(req, res);
