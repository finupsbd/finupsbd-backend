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
exports.getRequestContext = getRequestContext;
const ua_parser_js_1 = require("ua-parser-js");
const fast_geoip_1 = __importDefault(require("fast-geoip"));
function getRequestContext(req) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1) Parse IP address
        // The HTTP header "x-forwarded-for" is often set by proxies/load balancers
        const forwarded = req.headers["x-forwarded-for"];
        console.log(req.socket.remoteAddress);
        const ip = (forwarded === null || forwarded === void 0 ? void 0 : forwarded.split(",").shift()) || req.socket.remoteAddress || "Unknown IP";
        // 2) Parse the User-Agent to determine device & browser
        const parser = new ua_parser_js_1.UAParser(req.headers["user-agent"]);
        const deviceModel = parser.getDevice().model;
        const browserName = parser.getBrowser().name;
        const device = deviceModel || "Unknown device";
        const browser = browserName || "Unknown browser";
        // 3) Lookup approximate location by IP (optional, depends on your compliance policy)
        let location = "Unknown location";
        try {
            const geo = yield fast_geoip_1.default.lookup(ip);
            if (geo) {
                // E.g., "New York, US"
                location = `${geo.city || "Unknown City"}, ${geo.country || "Unknown Country"}`;
            }
        }
        catch (error) {
            console.error(error);
        }
        return { ip, device, browser, location };
    });
}
