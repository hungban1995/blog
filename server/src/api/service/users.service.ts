import { db } from "../../configs/db";
import bcrypt from 'bcryptjs'
export interface User {
    username: string,
    email: string,
    password: string
}
export const findUser = (user: User) => {

    let q = "SELECT * FROM users WHERE email = ? OR username = ?";

    return new Promise((resolve, reject) => {
        db.query(q, [user.email, user.password], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
export const register = (user: User) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    const q = "INSERT INTO users(`username`,`email`, `password`) VALUES (?)";
    const values = [user.username, user.email, hash];
    return new Promise((resolve, reject) => {
        db.query(q, [values], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}