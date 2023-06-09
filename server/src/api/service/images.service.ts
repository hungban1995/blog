import { db } from "../../configs/db.config";
import { ImageType } from "../helpers/type";

export const findImages = ({ id, uploadBy }: ImageType, ids: string | null) => {
    let q = "SELECT id,url,alt,uploadBy FROM images order by createdAt DESC";
    let VALUES = [id, uploadBy] as any
    if (id || uploadBy) {
        q += " WHERE id = ? OR uploadBy = ?"
    } else if (id && uploadBy) {
        q += " WHERE id = ? AND uploadBy = ?"
    } else if (ids) { q = 'SELECT id,url,alt,uploadBy FROM images  WHERE id IN (?)', VALUES = ids }

    return new Promise((resolve, rejects) => {
        db.query(q, [VALUES], (err, data) => {
            if (err) rejects(err)
            resolve(data)
        })
    })
}

export const getAll = (limit: number, offset: number) => {
    const q = "SELECT id,url,alt,uploadBy FROM images "
        + ' ORDER BY images.createdAt DESC'
    const values = offset ? [limit, offset] : []
    return new Promise((resolve, rejects) => {
        db.query(q, values, (err, data) => {
            if (err) rejects(err)
            resolve(data)
        })
    })
}


export const upload = (image: ImageType) => {
    const q = "INSERT INTO images(`url`,`uploadBy`) VALUES (?)";
    return new Promise((resolve, reject) => {
        db.query(q, [[image.url, image.uploadBy]], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

export const deleteImage = (ids: string) => {
    const q = 'DELETE FROM images WHERE id IN (?)'
    return new Promise((resolve, rejects) => {
        db.query(q, [ids], (err, data) => {
            if (err) rejects(err)
            resolve(data)
        })
    })
}