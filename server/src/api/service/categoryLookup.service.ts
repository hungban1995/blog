import { db } from "../../configs/db.config"


export const createCatPost = (postId: string, catIds: string) => {
    let q = 'INSERT INTO category_lookup (postId,categoryId) SELECT ? ,categories.id FROM categories WHERE id IN ? '
    return new Promise((resolve, reject) => {
        db.query(q, [postId, [catIds]], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
export const deleteCatPost = (postId: string) => {
    let q = 'DELETE FROM category_lookup WHERE postId=?'
    return new Promise((resolve, reject) => {
        db.query(q, [postId], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
