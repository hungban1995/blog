import { db } from "../../configs/db";
import { ImageType } from "../helpers/type";

export const findImages = ({ id, uploadBy }: ImageType) => {
    let q = "SELECT id,url,alt,uploadBy FROM images order by createdAt DESC";
    if (id || uploadBy) {
        q += " WHERE id = ? OR uploadBy = ?"
    } else if (id && uploadBy) {
        q += " WHERE id = ? AND uploadBy = ?"
    }
    return new Promise((resolve, rejects) => {
        db.query(q, [id, uploadBy], (err, data) => {
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
// export const update = () => {
//     const q = "UPDATE users SET ? WHERE `id` = ?";
//     return new Promise((resolve, reject) => {
//         db.query(q, [user, user.id], (err, data) => {
//             if (err) reject(err)
//             resolve(data)
//         })
//     })
// }    
export const deleteImage = (id: number) => {
    const q = 'DELETE FROM images WHERE id = ?'
    return new Promise((resolve, rejects) => {
        db.query(q, id, (err, data) => {
            if (err) rejects(err)
            resolve(data)
        })
    })
}