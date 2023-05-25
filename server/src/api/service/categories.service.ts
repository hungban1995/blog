import { db } from "../../configs/db"


export const getOneCat = (id?: string | null, title?: string) => {
    let q = 'SELECT categories.id,categories.title, categories.description, images.url AS image  FROM categories LEFT JOIN images ON categories.image = images.id'
    let values = [id, title] as any
    if (id || title) q += ' WHERE categories.id=? OR categories.title= ?'
    return new Promise((resolve, rejects) => {
        db.query(q, values, (error, data) => {
            if (error) rejects(error)
            resolve(data)
        })
    })
}

export const getMultiCat = (ids?: string) => {
    let q = 'SELECT categories.id,categories.title, categories.description, images.url AS image  FROM categories LEFT JOIN images ON categories.image = images.id'
    let values = ''
    if (ids) { q = 'SELECT id,url,alt,uploadBy FROM images  WHERE id IN (?)'; values = ids }
    return new Promise((resolve, rejects) => {
        db.query(q, values, (error, data) => {
            if (error) rejects(error)
            resolve(data)
        })
    })
}

export const createCat = (category: any) => {
    const q = 'INSERT INTO categories(`title`,`description`) VALUES (?)'
    return new Promise((resolve, reject) => {
        db.query(q, [[category.title, category.description]], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
export const updateCat = (category: any, id: string) => {
    Object.keys(category).forEach((key: any) => {
        if (!category[key]) delete category[key]
    })

    const q = 'UPDATE  categories SET  ? WHERE id = ?'
    return new Promise((resolve, reject) => {
        db.query(q, [category, id], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })

}
export const deleteCat = (ids: string) => {
    const q = 'DELETE FROM categories WHERE id IN (?)'
    return new Promise((resolve, rejects) => {
        db.query(q, [ids], (err, data) => {
            if (err) rejects(err)
            resolve(data)
        })
    })
}