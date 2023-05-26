import { decodeType, functionType } from "../helpers/type";
import { verifyToken } from "../middleware/auth";
import { createCatPost, deleteCatPost } from "../service/categoryLookup.service";
import * as services from '../service/posts.service'

export const createPost: functionType = async (req, res, next) => {
    try {
        const post = req.body
        const accessToken = req.headers.authorization as string
        const decode = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as decodeType
        if (decode.role !== 'admin') return next({ status: 403, message: "You don't have permission create post!" })
        const createPost: any = await services.createPost(post)
        if (post.catIds.length === 0) {
            return next({ status: 404, message: "Need an category create post!" })
        }
        const postId = createPost.insertId
        await createCatPost(postId, post.catIds)
        res.status(200).json({ success: true, message: 'Create post success!' })
    } catch (error) {
        next(error)
    }
}
export const getAll: functionType = async (req, res, next) => {
    try {
        const { page } = req.query
        const limit = 5;
        const offset = (Number(page) - 1) * limit;
        const posts: any = await services.getAll(limit, offset)
        res.status(200).json({ success: true, message: 'Get posts success!', posts })
    } catch (error) {
        next(error)
    }
}
export const getPostId: functionType = async (req, res, next) => {
    try {
        const { id } = req.params
        let post: any
        if (id && id !== undefined) {
            post = await services.getPostId(id)

        }
        return res.status(200).json({ success: true, message: 'Get post success!', post: post[0] })

    } catch (error) {
        next(error)
    }
}


export const updatePost: functionType = async (req, res, next) => {
    try {
        const { id } = req.params
        const postUpdate = req.body
        await deleteCatPost(id)
        await createCatPost(id, postUpdate.catIds)
        delete postUpdate.catIds
        await services.updatePost(id, postUpdate)
        res.status(200).json({ success: true, message: 'Update post success!' })

    } catch (error) {
        next(error)
    }
}

export const getByCat: functionType = async (req, res, next) => {
    try {
        const { id } = req.params
        const posts: any = await services.getPostByCat(id)
        res.status(200).json({ success: true, message: 'Get post success!', posts })
    } catch (error) {
        next(error)
    }
}

export const getByUrl: functionType = async (req, res, next) => {
    try {
        const { url } = req.params
        const post: any = await services.getByUrl(url)
        res.status(200).json({ success: true, message: 'Get post success!', post: post[0] })

    } catch (error) {
        next(error)
    }
}
export const deletePost: functionType = async (req, res, next) => {
    try {
        const { id } = req.params
        await deleteCatPost(id)
        await services.deletePost(id)
        res.status(200).json({ success: true, message: 'Delete post success!' })
    } catch (error) {
        next(error)
    }
}