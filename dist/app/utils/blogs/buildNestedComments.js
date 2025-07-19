"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNestedComments = void 0;
const buildNestedComments = (comments) => {
    const map = new Map();
    comments.forEach((c) => map.set(c.id, Object.assign(Object.assign({}, c), { replies: [] })));
    const roots = [];
    map.forEach(comment => {
        if (comment.parentId) {
            const parent = map.get(comment.parentId);
            if (parent) {
                parent.replies.push(comment);
            }
            else {
                // Orphaned comment with missing parent, treat as root
                roots.push(comment);
            }
        }
        else {
            roots.push(comment);
        }
    });
    return roots;
};
exports.buildNestedComments = buildNestedComments;
