import { functionType } from "../helpers/type"
import * as service from '../service/search.service'
export const searchData: functionType = async (req, res, next) => {
    try {
        const { q } = req.query
        const data = await service.searchData(q as string)
        res.status(200).json({ success: true, message: 'Get data success!', data })
    } catch (err) {
        next(err)
    }
}