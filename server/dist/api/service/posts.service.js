"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostId = exports.getByUrl = exports.getPostByCat = exports.getAll = exports.createPost = void 0;
const db_1 = require("../../configs/db");
const createPost = (post) => {
    const q = 'INSERT INTO posts(title,description,content,image,author,isDraft,url) VALUES(?)';
    const values = [post.title, post.description, post.content, post.image, post.author, post.isDraft, post.url];
    return new Promise((resolve, reject) => {
        db_1.db.query(q, [values], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.createPost = createPost;
const getAll = (limit, offset) => {
    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.description,images.url AS image, users.username AS author, ' +
        ' GROUP_CONCAT(categories.title) AS catList' +
        ' FROM posts LEFT JOIN images ON posts.image = images.id LEFT JOIN users ON posts.author= users.id ' +
        ' LEFT JOIN category_lookup  ON posts.id= category_lookup.postId ' +
        ' LEFT JOIN categories ON category_lookup.categoryId= categories.id ' +
        ' GROUP BY  posts.id' +
        ' ORDER BY posts.createdAt DESC LIMIT ? OFFSET ? ';
    return new Promise((resolve, reject) => {
        db_1.db.query(q, [limit, offset], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.getAll = getAll;
const getPostByCat = (id) => {
    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.description,images.url AS image, users.username AS author ' +
        ' FROM posts ' +
        ' LEFT JOIN images ON posts.image = images.id' +
        ' LEFT JOIN users ON posts.author = users.id' +
        ' JOIN category_lookup ON posts.id = category_lookup.postId' +
        ' LEFT JOIN categories ON category_lookup.categoryId = categories.id ' +
        ' WHERE category_lookup.categoryId = ?' +
        '  ORDER BY posts.createdAt ASC';
    return new Promise((resolve, reject) => {
        db_1.db.query(q, [id], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.getPostByCat = getPostByCat;
const getByUrl = (url) => {
    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.content,posts.description,images.url AS image, users.username AS author,  users_images.url AS author_avatar, ' +
        ' GROUP_CONCAT(categories.title) AS catList' +
        ' FROM posts' +
        ' LEFT JOIN images ON posts.image = images.id LEFT JOIN users ON posts.author= users.id ' +
        'LEFT JOIN images AS users_images ON users.avatar = users_images.id' +
        ' LEFT JOIN category_lookup ON posts.id = category_lookup.postId' +
        '  LEFT JOIN categories ON category_lookup.categoryId = categories.id' +
        ' WHERE posts.url = ?' +
        '  GROUP BY posts.id';
    return new Promise((resolve, reject) => {
        db_1.db.query(q, [url], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.getByUrl = getByUrl;
const getPostId = (id) => {
    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.content,posts.description,images.url AS image, users.username AS author, ' +
        ' GROUP_CONCAT(categories.id) AS catList' +
        ' FROM posts' +
        ' LEFT JOIN images ON posts.image = images.id LEFT JOIN users ON posts.author= users.id ' +
        ' LEFT JOIN category_lookup ON posts.id = category_lookup.postId' +
        '  LEFT JOIN categories ON category_lookup.categoryId = categories.id' +
        ' WHERE posts.id = ?' +
        '  GROUP BY posts.id';
    return new Promise((resolve, reject) => {
        db_1.db.query(q, [id], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.getPostId = getPostId;
const updatePost = (id, post) => {
    Object.keys(post).forEach((key) => {
        if (!post[key])
            delete post[key];
    });
    const q = 'UPDATE posts SET ? WHERE id=?';
    return new Promise((resolve, reject) => {
        db_1.db.query(q, [post, id], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.updatePost = updatePost;
const deletePost = (id) => {
    const q = 'DELETE FROM posts  WHERE id=?';
    return new Promise((resolve, reject) => {
        db_1.db.query(q, [id], (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.deletePost = deletePost;
