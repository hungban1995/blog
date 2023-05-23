import { db } from "../../configs/db"

export const createCatLookup = (postId: number, catId: number) => {
    let q = 'INSERT INTO category_lookup (postId,categoryId) VALUES(?)'
    return new Promise((resolve, reject) => {
        db.query(q, [[postId, catId]], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

