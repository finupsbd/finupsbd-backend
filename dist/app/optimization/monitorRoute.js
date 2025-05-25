"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitorAndCount = monitorAndCount;
// holds counts per minute, e.g. { "2025-05-24T23:57": 42, … }
const perMinuteCounts = {};
// middleware to bump the counter
function monitorAndCount(req, res, next) {
    const now = new Date();
    // YYYY-MM-DDTHH:MM  (drops seconds)
    const minuteKey = now.toISOString().slice(0, 16);
    perMinuteCounts[minuteKey] = (perMinuteCounts[minuteKey] || 0) + 1;
    next();
}
// every 60s, log last minute’s count and clean it up
setInterval(() => {
    // figure out last full minute
    const last = new Date(Date.now() - 60000);
    const key = last.toISOString().slice(0, 16);
    const count = perMinuteCounts[key] || 0;
    console.log(`Requests to /eligiblityCheck in ${key}:00 → ${count}`);
    // optional: free memory
    delete perMinuteCounts[key];
}, 60000);
