import { db } from "../../configs/db"

export const searchData = (q: string) => {
    console.log(q);

    const query = 'SELECT * FROM posts, categories  WHERE title=?'
    return new Promise((resolve, reject) => {
        db.query(query, [q], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}