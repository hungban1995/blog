import { db } from "../../configs/db";
import { UserType } from "../helpers/type";

export const findUser = ({ email, id, username }: UserType) => {
    let q: string
    const params = { email, id, username }
    if (typeof params.email !== "undefined" || typeof params.id !== "undefined" || typeof params.username !== "undefined") {
        q = "SELECT users.password,users.id, users.username, users.email, images.url AS avatar, users.role FROM users LEFT JOIN images ON users.avatar = images.id WHERE users.email = ? OR users.username = ? OR users.id = ? ";
    } else {
        q = "SELECT users.password,users.id, users.username, users.email, images.url AS avatar, users.role FROM users LEFT JOIN images ON users.avatar = images.id ";
    }
    return new Promise((resolve, reject) => {
        db.query(q, [email, username, id], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

export const register = (user: UserType) => {
    const q = "INSERT INTO users(`username`,`email`, `password`) VALUES (?)";
    const values = [user.username, user.email, user.password];
    return new Promise((resolve, reject) => {
        db.query(q, [values], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
export const update = (user: UserType) => {

    const q = "UPDATE users SET ? WHERE `id` = ?";
    return new Promise((resolve, reject) => {
        db.query(q, [user, user.id], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
export const deleteUser = (id: number) => {
    const q = 'DELETE FROM users WHERE id = ?'
    return new Promise((resolve, rejects) => {
        db.query(q, id, (err, data) => {
            if (err) rejects(err)
            resolve(data)
        })
    })
}