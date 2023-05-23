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
export const getAll = () => {

    // , GROUP_CONCAT(categories.title SEPARATOR ",") AS categories_list, ' +
    // 'GROUP_CONCAT(categories.id SEPARATOR ",") AS categories_id FROM category_lookup ' +
    // 'CROSS JOIN posts ON postId = posts.id ' +
    // 'CROSS JOIN categories ON categoryId = categories.id GROUP BY posts.id ' +

    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.description,images.url AS image, users.username AS author ' +
        ' FROM posts LEFT JOIN images ON posts.image = images.id LEFT JOIN users ON posts.author= users.id ' +
        'ORDER BY posts.createdAt DESC'
    return new Promise((resolve, reject) => {
        db.query(q, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

export const getPostId = (id: number) => {
    const q = 'SELECT * FROM posts WHERE id=? order by createdAt DESC'
    return new Promise((resolve, reject) => {
        db.query(q, [id], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
export const getPostByCat = (id: number) => {
    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.description,images.url AS image, users.username AS author ' +
        ' FROM posts LEFT JOIN images ON posts.image = images.id LEFT JOIN users ON posts.author= users.id' +
        ' JOIN category_lookup  ON posts.id = category_lookup.postId  WHERE category_lookup.categoryId = ? ' +
        'ORDER BY posts.createdAt ASC'
    return new Promise((resolve, reject) => {
        db.query(q, [id], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

export const getByUrl = (url: string) => {
    const q = 'SELECT posts.id,posts.url,posts.createdAt, posts.title,posts.content,posts.description,images.url AS image, users.username AS author ' +
        ' FROM posts LEFT JOIN images ON posts.image = images.id LEFT JOIN users ON posts.author= users.id ' +
        'WHERE posts.url= ?'
    return new Promise((resolve, reject) => {
        db.query(q, [url], (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}