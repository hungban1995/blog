"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCatPost = exports.createCatPost = void 0;
const db_1 = require("../../configs/db");
const createCatPost = (postId, catIds) => {
    let q = 'INSERT INTO category_lookup (postId,categoryId) SELECT ? ,categories.id FROM categories WHERE id IN ? ';
    return new Promise((resolve, reject) => {
        db_1.db.query(q, [postId, [catIds]], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.createCatPost = createCatPost;
const deleteCatPost = (postId) => {
    let q = 'DELETE FROM category_lookup WHERE postId=?';
    return new Promise((resolve, reject) => {
        db_1.db.query(q, [postId], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.deleteCatPost = deleteCatPost;
