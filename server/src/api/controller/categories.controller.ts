import { decodeType, functionType } from "../helpers/type";
import { verifyToken } from "../middleware/auth";
import * as service from '../service/categories.service'
export const create: functionType = async (req, res, next) => {
    try {
        const category = req.body
        const accessToken = req.headers.authorization as string
        const decode = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as decodeType
        if (decode.role !== 'admin') return next({ status: 403, message: "You don't have permission create category!" })
        const cats: any = await service.findCat(null, category.title)
        console.log(cats);

        if (cats.length > 0) return next({ status: 404, message: 'Category name already exist!' })
        await service.create(category)
        res.status(200).json({ success: true, message: 'Create category success!' })

    } catch (error) {
        next(error)
    }
}

export const getAll: functionType = async (req, res, next) => {
    try {
        const categories: any = await service.findCat()

        res.status(200).json({ success: true, message: 'Get categories success!', categories })

    } catch (error) {
        next(error)
    }
}
