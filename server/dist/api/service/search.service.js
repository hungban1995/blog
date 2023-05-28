"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchData = void 0;
const db_1 = require("../../configs/db");
const searchData = (q) => {
    const query = "SELECT id, title, description, 'post' AS data_type FROM posts WHERE title LIKE ? OR description LIKE ? " +
        "UNION SELECT id, title, description, 'category' AS data_type FROM categories WHERE title LIKE ? OR description LIKE ? ";
    const searchValue = `%${q}%`;
    return new Promise((resolve, reject) => {
        db_1.db.query(query, [searchValue, searchValue, searchValue, searchValue], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.searchData = searchData;
