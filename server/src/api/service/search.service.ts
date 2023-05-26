import { db } from "../../configs/db"

export const searchData = (q: string) => {
    const query = "SELECT id, title, description, 'post' AS data_type FROM posts WHERE title LIKE ? " +
        "UNION SELECT id, title, description, 'category' AS data_type FROM categories WHERE title LIKE ?";
    const searchValue = `%${q}%`;
    return new Promise((resolve, reject) => {
        db.query(query, [searchValue, searchValue], (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};
