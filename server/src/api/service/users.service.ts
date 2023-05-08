import { db } from "../../configs/db";
import { UserType } from "../helpers/type";

export const findUser = (user: UserType) => {
    let q = "SELECT * FROM users WHERE email = ? OR username = ? OR id = ?";
    return new Promise((resolve, reject) => {
        db.query(q, [user.email, user.username, user.id], (err, data) => {
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

    const q = "UPDATE users SET `username` = IFNULL(?,`username`), `password` = ?, `avatar` = ?, `role`= ? WHERE `id` = ?";
    const values = [user.username, user.password, user.avatar, user.role];
    return new Promise((resolve, reject) => {
        db.query(q, [...values, user.id], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}