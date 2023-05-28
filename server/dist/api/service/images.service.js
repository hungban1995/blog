"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.upload = exports.findImages = void 0;
const db_1 = require("../../configs/db");
const findImages = ({ id, uploadBy }, ids) => {
    let q = "SELECT id,url,alt,uploadBy FROM images order by createdAt DESC";
    let VALUES = [id, uploadBy];
    if (id || uploadBy) {
        q += " WHERE id = ? OR uploadBy = ?";
    }
    else if (id && uploadBy) {
        q += " WHERE id = ? AND uploadBy = ?";
    }
    else if (ids) {
        q = 'SELECT id,url,alt,uploadBy FROM images  WHERE id IN (?)', VALUES = ids;
    }
    return new Promise((resolve, rejects) => {
        db_1.db.query(q, [VALUES], (err, data) => {
            if (err)
                rejects(err);
            resolve(data);
        });
    });
};
exports.findImages = findImages;
const upload = (image) => {
    const q = "INSERT INTO images(`url`,`uploadBy`) VALUES (?)";
    return new Promise((resolve, reject) => {
        db_1.db.query(q, [[image.url, image.uploadBy]], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.upload = upload;
const deleteImage = (ids) => {
    const q = 'DELETE FROM images WHERE id IN (?)';
    return new Promise((resolve, rejects) => {
        db_1.db.query(q, [ids], (err, data) => {
            if (err)
                rejects(err);
            resolve(data);
        });
    });
};
exports.deleteImage = deleteImage;
