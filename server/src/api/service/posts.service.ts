import { db } from "../../configs/db.config"

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
    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.description,images.url AS image, users.username AS author, users_images.url AS author_avatar, ' +
        ' GROUP_CONCAT(categories.title) AS catList' +
        ' FROM posts LEFT JOIN images ON posts.image = images.id LEFT JOIN users ON posts.author= users.id ' +
        ' LEFT JOIN images AS users_images ON users.avatar = users_images.id ' +

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

export const getPostByCat = (id: string) => {
    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.description,images.url AS image, users.username AS author, users_images.url AS author_avatar ' +
        ' FROM posts ' +
        ' LEFT JOIN images ON posts.image = images.id' +
        ' LEFT JOIN users ON posts.author = users.id' +
        ' LEFT JOIN images AS users_images ON users.avatar = users_images.id' +
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
    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.content,posts.description,images.url AS image, users.username AS author,  users_images.url AS author_avatar, ' +

        ' GROUP_CONCAT(categories.title) AS catList' +
        ' FROM posts' +
        ' LEFT JOIN images ON posts.image = images.id LEFT JOIN users ON posts.author= users.id ' +
        ' LEFT JOIN images AS users_images ON users.avatar = users_images.id' +
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
export const getByAuthor = (authorId: string) => {
    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.description,images.url AS image, ' +
        ' users.username AS author,  users_images.url AS author_avatar, ' +
        ' GROUP_CONCAT(categories.title) AS catList' +
        ' FROM posts' +
        ' LEFT JOIN images ON posts.image = images.id LEFT JOIN users ON posts.author= users.id ' +
        ' LEFT JOIN images AS users_images ON users.avatar = users_images.id' +
        ' LEFT JOIN category_lookup ON posts.id = category_lookup.postId' +
        '  LEFT JOIN categories ON category_lookup.categoryId = categories.id' +
        ' WHERE posts.author = ?' +
        '  GROUP BY posts.id'
    return new Promise((resolve, reject) => {
        db.query(q, [authorId], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

export const getPostId = (id: string) => {
    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.content,posts.description,images.url AS image, users.username AS author, ' +
        ' GROUP_CONCAT(categories.id) AS catList' +
        ' FROM posts' +
        ' LEFT JOIN images ON posts.image = images.id LEFT JOIN users ON posts.author= users.id ' +
        ' LEFT JOIN category_lookup ON posts.id = category_lookup.postId ' +
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
export const updatePost = (id: string, post: any) => {
    Object.keys(post).forEach((key: any) => {
        if (!post[key]) delete post[key]
    })
    const q = 'UPDATE posts SET ? WHERE id=?'
    return new Promise((resolve, reject) => {
        db.query(q, [post, id], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

export const deletePost = (id: string) => {

    const q = 'DELETE FROM posts  WHERE id=?'
    return new Promise((resolve, reject) => {
        db.query(q, [id], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}