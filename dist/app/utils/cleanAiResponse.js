"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cleanAiResponse(raw) {
    // 1. Trim whitespace and stray single-quotes
    let s = raw.trim()
        .replace(/^'+/, '') // remove leading single-quote(s)
        .replace(/'+$/, '') // remove trailing single-quote(s)
        .trim();
    // 2. Remove Markdown fences (``` or ```json) if present
    s = s.replace(/^```(?:json)?\s*/, '').replace(/```$/, '');
    // 3. Parse JSON
    let obj;
    try {
        obj = JSON.parse(s);
    }
    catch (err) {
        console.error("Failed to parse AI response:", err);
        throw err;
    }
    // 4. Convert escaped "\\n" sequences into real newlines
    obj.message = obj.message.replace(/\\n/g, "\n");
    return obj;
}
exports.default = cleanAiResponse;
