import { db } from "../../configs/db.config";
import { P, UserType } from "../helpers/type";



export const getAll = () => {
    const q = "SELECT users.id, users.username, users.email, images.url AS avatar, users.role FROM users LEFT JOIN images ON users.avatar = images.id";
    return new Promise((resolve, reject) => {
        db.query(q, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

export const getByAdmin = () => {
    const q = "SELECT users.id, users.username, users.email, images.url AS avatar, users.role FROM users LEFT JOIN images ON users.avatar = images.id WHERE users.role = 'admin'";
    return new Promise((resolve, reject) => {
        db.query(q, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

export const getByUserName = (username: string) => {
    const q = "SELECT users.id, users.username, users.email, images.url AS avatar, users.role FROM users LEFT JOIN images ON users.avatar = images.id WHERE  users.username = ? ";
    return new Promise((resolve, rejects) => {
        db.query(q, [username], (error, data) => {
            if (error) rejects(error)
            resolve(data)
        })
    })
}

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
export const update = (user: UserType, id: string) => {
    Object.keys(user).forEach((key: string) => {
        if (!user[key as P]) delete user[key as P]
    })
    const q = "UPDATE users SET ? WHERE `id` = ?";
    return new Promise((resolve, reject) => {
        db.query(q, [user, id], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
export const deleteUser = (id: string) => {
    const q = 'DELETE FROM users WHERE id = ?'
    return new Promise((resolve, rejects) => {
        db.query(q, id, (err, data) => {
            if (err) rejects(err)
            resolve(data)
        })
    })
}