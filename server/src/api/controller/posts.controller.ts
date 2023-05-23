import { decodeType, functionType } from "../helpers/type";
import { verifyToken } from "../middleware/auth";
import { createCatLookup } from "../service/categoryLookup.service";
import * as services from '../service/posts.service'

export const createPost: functionType = async (req, res, next) => {
    try {
        const post = req.body
        const accessToken = req.headers.authorization as string
        const decode = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as decodeType
        if (decode.role !== 'admin') return next({ status: 403, message: "You don't have permission create post!" })
        const createPost: any = await services.createPost(post)
        const catId: number[] = post.catId
        if (catId.length === 0) {
            return next({ status: 404, message: "Need an category create post!" })
        }
        const postId = createPost.insertId
        let i
        for (i of catId) {
            await createCatLookup(postId, i)
        }
        res.status(200).json({ success: true, message: 'Create post success!' })
    } catch (error) {
        next(error)
    }
}
export const getAll: functionType = async (req, res, next) => {
    try {
        const posts: any = await services.getAll()
        // posts.forEach((post: any) => {
        //     post.category_array = post.categories_list.split(",")
        // })
        res.status(200).json({ success: true, message: 'Get posts success!', posts })
    } catch (error) {
        next(error)
    }
}
export const getPostId: functionType = async (req, res, next) => {
    try {
        const { id } = req.params
        const post: any = services.getPostId(Number(id))
        res.status(200).json({ success: true, message: 'Get post success!', post })

    } catch (error) {
        next(error)
    }
}
export const getByCat: functionType = async (req, res, next) => {
    try {
        const { id } = req.params
        const posts: any = await services.getPostByCat(Number(id))
        res.status(200).json({ success: true, message: 'Get post success!', posts })

    } catch (error) {
        next(error)
    }
}

export const getByUrl: functionType = async (req, res, next) => {
    try {
        const { url } = req.params
        const posts: any = await services.getByUrl(url)
        res.status(200).json({ success: true, message: 'Get post success!', post: posts[0] })

    } catch (error) {
        next(error)
    }
}