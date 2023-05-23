import { decodeType, functionType } from "../helpers/type";
import { verifyToken } from "../middleware/auth";
import * as service from '../service/categories.service'
export const create: functionType = async (req, res, next) => {
    try {
        const category = req.body
        const accessToken = req.headers.authorization as string
        const decode = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as decodeType
        if (decode.role !== 'admin') return next({ status: 403, message: "You don't have permission create category!" })
        const cats: any = await service.getOneCat(null, category.title)
        if (cats.length > 0) return next({ status: 404, message: 'Category name already exist!' })
        await service.createCat(category)
        res.status(200).json({ success: true, message: 'Create category success!' })

    } catch (error) {
        next(error)
    }
}

export const getAll: functionType = async (req, res, next) => {
    try {
        const categories: any = await service.getMultiCat()
        res.status(200).json({ success: true, message: 'Get categories success!', categories })
    } catch (error) {
        next(error)
    }
}
export const getId: functionType = async (req, res, next) => {
    try {
        const { id } = req.params
        const category: any = await service.getOneCat(Number(id))
        res.status(200).json({ success: true, message: 'Get categories success!', category })
    } catch (error) {
        next(error)

    }
}
export const getByName: functionType = async (req, res, next) => {
    try {
        const { title } = req.params
        const category: any = await service.getOneCat(null, title)
        res.status(200).json({ success: true, message: 'Get categories success!', category: category[0] })
    } catch (error) {
        next(error)

    }
}

export const updateCat: functionType = async (req, res, next) => {
    try {
        const { id } = req.params
        const catUpdate = req.body
        const category: any = await service.getOneCat(Number(id))
        const accessToken = req.headers.authorization as string
        const decode = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as decodeType
        if (decode.role !== 'admin' && decode.id !== category[0].author) {
            return next({ status: 403, message: "You don't have permission to update the category!" });
        }
        await service.updateCat(catUpdate, Number(id))
        res.status(200).json({ success: true, message: 'Update category success!' })
    } catch (error) {
        next(error)

    }
}
export const deleteCat: functionType = async (req, res, next) => {
    try {
        const ids = req.body
        await service.deleteCat(ids)
        res.status(200).json({ success: true, message: "Delete categories success!" })
    } catch (error) {
        next(error)
    }
}