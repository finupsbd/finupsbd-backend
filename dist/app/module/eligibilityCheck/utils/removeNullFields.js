"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNullFields = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const removeNullFields = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== null));
};
exports.removeNullFields = removeNullFields;
