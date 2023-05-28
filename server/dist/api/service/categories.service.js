"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCat = exports.updateCat = exports.createCat = exports.getMultiCat = exports.getOneCat = void 0;
const db_1 = require("../../configs/db");
const getOneCat = (id, title) => {
    let q = 'SELECT categories.id,categories.title, categories.description, images.url AS image  FROM categories LEFT JOIN images ON categories.image = images.id';
    let values = [id, title];
    if (id || title)
        q += ' WHERE categories.id=? OR categories.title= ?';
    return new Promise((resolve, rejects) => {
        db_1.db.query(q, values, (error, data) => {
            if (error)
                rejects(error);
            resolve(data);
        });
    });
};
exports.getOneCat = getOneCat;
const getMultiCat = (ids) => {
    let q = 'SELECT categories.id,categories.title, categories.description, images.url AS image  FROM categories LEFT JOIN images ON categories.image = images.id';
    let values = '';
    if (ids) {
        q = 'SELECT id,url,alt,uploadBy FROM images  WHERE id IN (?)';
        values = ids;
    }
    return new Promise((resolve, rejects) => {
        db_1.db.query(q, values, (error, data) => {
            if (error)
                rejects(error);
            resolve(data);
        });
    });
};
exports.getMultiCat = getMultiCat;
const createCat = (category) => {
    const q = 'INSERT INTO categories(`title`,`description`) VALUES (?)';
    return new Promise((resolve, reject) => {
        db_1.db.query(q, [[category.title, category.description]], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.createCat = createCat;
const updateCat = (category, id) => {
    Object.keys(category).forEach((key) => {
        if (!category[key])
            delete category[key];
    });
    const q = 'UPDATE  categories SET  ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        db_1.db.query(q, [category, id], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.updateCat = updateCat;
const deleteCat = (ids) => {
    const q = 'DELETE FROM categories WHERE id IN (?)';
    return new Promise((resolve, rejects) => {
        db_1.db.query(q, [ids], (err, data) => {
            if (err)
                rejects(err);
            resolve(data);
        });
    });
};
exports.deleteCat = deleteCat;
