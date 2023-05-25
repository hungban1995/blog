import { db } from "../../configs/db"

export const createPost = (post: any) => {
    const q = 'INSERT INTO posts(title,description,content,image,author,isDraft,url) VALUES(?)'
    const values = [post.title, post.description, post.content, post.image, post.author, post.isDraft, post.url]
    return new Promise((resolve, reject) => {
        db.query(q, [values], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
export const getAll = (limit: number, offset: number) => {
    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.description,images.url AS image, users.username AS author, ' +
        ' GROUP_CONCAT(categories.title) AS catList' +
        ' FROM posts LEFT JOIN images ON posts.image = images.id LEFT JOIN users ON posts.author= users.id ' +
        ' LEFT JOIN category_lookup  ON posts.id= category_lookup.postId ' +
        ' LEFT JOIN categories ON category_lookup.categoryId= categories.id ' +
        ' GROUP BY  posts.id' +
        ' ORDER BY posts.createdAt DESC LIMIT ? OFFSET ? '
    return new Promise((resolve, reject) => {
        db.query(q, [limit, offset], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

export const getPostByCat = (id: number) => {
    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.description,images.url AS image, users.username AS author ' +
        ' FROM posts ' +
        ' LEFT JOIN images ON posts.image = images.id' +
        ' LEFT JOIN users ON posts.author = users.id' +
        ' JOIN category_lookup ON posts.id = category_lookup.postId' +
        ' LEFT JOIN categories ON category_lookup.categoryId = categories.id ' +
        ' WHERE category_lookup.categoryId = ?' +
        '  ORDER BY posts.createdAt ASC'
    return new Promise((resolve, reject) => {
        db.query(q, [id], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

export const getByUrl = (url: string) => {
    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.content,posts.description,images.url AS image, users.username AS author, ' +
        ' GROUP_CONCAT(categories.title) AS catList' +
        ' FROM posts' +
        ' LEFT JOIN images ON posts.image = images.id LEFT JOIN users ON posts.author= users.id ' +
        ' LEFT JOIN category_lookup ON posts.id = category_lookup.postId' +
        '  LEFT JOIN categories ON category_lookup.categoryId = categories.id' +
        ' WHERE posts.url = ?' +
        '  GROUP BY posts.id'

    return new Promise((resolve, reject) => {
        db.query(q, [url], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

export const getPostId = (id: number) => {
    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.content,posts.description,images.url AS image, users.username AS author, ' +
        ' GROUP_CONCAT(categories.id) AS catList' +
        ' FROM posts' +
        ' LEFT JOIN images ON posts.image = images.id LEFT JOIN users ON posts.author= users.id ' +
        ' LEFT JOIN category_lookup ON posts.id = category_lookup.postId' +
        '  LEFT JOIN categories ON category_lookup.categoryId = categories.id' +
        ' WHERE posts.id = ?' +
        '  GROUP BY posts.id'
    return new Promise((resolve, reject) => {
        db.query(q, [id], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
export const updatePost = (id: number, post: any) => {
    const q = ''
    return new Promise((resolve, reject) => {
        db.query(q, [post, id], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}