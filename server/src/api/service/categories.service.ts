import { db } from "../../configs/db"


export const findCat = (id?: number | null, title?: string, ids?: string) => {
    let q = 'SELECT * FROM categories'
    let values = [id, title] as any
    if (id || title) q += ' WHERE id=? OR title= ?'
    else if (ids) { q = 'SELECT id,url,alt,uploadBy FROM images  WHERE id IN (?)'; values = ids }
    return new Promise((resolve, rejects) => {
        db.query(q, values, (error, data) => {
            if (error) rejects(error)
            resolve(data)
        })
    })
}

export const create = (category: any) => {
    const q = 'INSERT INTO categories(`title`,`description`) VALUES (?)'
    return new Promise((resolve, reject) => {
        db.query(q, [[category.title, category.description]], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })

}