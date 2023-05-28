"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.update = exports.register = exports.findUser = exports.getByAdmin = exports.getAll = void 0;
const db_1 = require("../../configs/db");
const getAll = () => {
    const q = "SELECT users.id, users.username, users.email, images.url AS avatar, users.role FROM users LEFT JOIN images ON users.avatar = images.id";
    return new Promise((resolve, reject) => {
        db_1.db.query(q, (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.getAll = getAll;
const getByAdmin = () => {
    const q = "SELECT users.id, users.username, users.email, images.url AS avatar, users.role FROM users LEFT JOIN images ON users.avatar = images.id WHERE users.role = 'admin'";
    return new Promise((resolve, reject) => {
        db_1.db.query(q, (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.getByAdmin = getByAdmin;
const findUser = ({ email, id, username }) => {
    let q;
    const params = { email, id, username };
    if (typeof params.email !== "undefined" || typeof params.id !== "undefined" || typeof params.username !== "undefined") {
        q = "SELECT users.password,users.id, users.username, users.email, images.url AS avatar, users.role FROM users LEFT JOIN images ON users.avatar = images.id WHERE users.email = ? OR users.username = ? OR users.id = ? ";
    }
    else {
        q = "SELECT users.password,users.id, users.username, users.email, images.url AS avatar, users.role FROM users LEFT JOIN images ON users.avatar = images.id ";
    }
    return new Promise((resolve, reject) => {
        db_1.db.query(q, [email, username, id], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.findUser = findUser;
const register = (user) => {
    const q = "INSERT INTO users(`username`,`email`, `password`) VALUES (?)";
    const values = [user.username, user.email, user.password];
    return new Promise((resolve, reject) => {
        db_1.db.query(q, [values], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.register = register;
const update = (user) => {
    const q = "UPDATE users SET ? WHERE `id` = ?";
    return new Promise((resolve, reject) => {
        db_1.db.query(q, [user, user.id], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.update = update;
const deleteUser = (id) => {
    const q = 'DELETE FROM users WHERE id = ?';
    return new Promise((resolve, rejects) => {
        db_1.db.query(q, id, (err, data) => {
            if (err)
                rejects(err);
            resolve(data);
        });
    });
};
exports.deleteUser = deleteUser;
