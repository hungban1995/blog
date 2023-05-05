import { db } from '../../configs/db'
import { functionType } from '../helpers/type'
import * as service from '../service/users.service'
// export const getUsers: functionType = (req, res, next) => {
//     try {
//         const q = 'SELECT * FROM users'
//         db.query(q, (err, data) => {
//             if (err) return next(err)
//             if (data.length === 0) return res.status(400).json('Users not found!')
//             return res.status(200).json({ users: data })
//         })
//     } catch (err) {
//         next(err)
//     }
// }
export const register: functionType = async (req, res, next) => {

    try {
        // CHECK EXISTING USER
        if (req.body.password !== req.body.retypePassword) return next({ status: 400, message: 'Password do not math!' })
        const { retypePassword, ...user } = req.body
        const findUser: any = await service.findUser(user)
        if (findUser.length) return next({ status: 400, message: 'User already exist!' })
        await service.register(user)

        res.status(200).json({ status: 200, message: 'Create user success!' })
    } catch (error) {
        next(error)
    }

}
export const login: functionType = (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}
export const logout: functionType = (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}
export const getId: functionType = (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}