"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authDoc = authDoc;
const config_1 = require("../../config");
function authDoc(req, res, next) {
    const auth = req.query.s; // বা req.query.secret
    console.log(auth);
    if (!auth || auth !== config_1.ConfigFile.API_DOC_SECRET) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}
