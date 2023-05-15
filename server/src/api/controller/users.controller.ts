import { UserType, decodeType, functionType } from '../helpers/type'
import * as service from '../service/users.service'
import bcrypt from 'bcryptjs'
import { createAccessToken, createRefreshToken } from '../helpers/generateToken'
import { verifyToken } from '../middleware/auth'

export const register: functionType = async (req, res, next) => {
    try {
        if (req.body.password !== req.body.retypePassword) return next({ status: 400, message: 'Password do not math!' })
        const user = req.body
        const findUser: any = await service.findUser(user)
        if (findUser.length > 0) return next({ status: 400, message: 'User already exist!' })
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        await service.register({ ...user, password: hash })
        res.status(200).json({ success: true, message: 'Create user success!' })
    } catch (error) {
        next(error)
    }
}
export const login: functionType = async (req, res, next) => {
    try {
        const user: any = await service.findUser({ email: req.body.email, password: req.body.password })
        if (user.length === 0) return next({ status: 404, message: 'User not found!' })
        const isMatch = bcrypt.compareSync(req.body.password, user[0].password)
        if (!isMatch) return next({ status: 404, message: 'Password do not match!' })
        const accessToken = await createAccessToken({ id: user[0].id, role: user[0].role }, process.env.ACCESS_TOKEN_SECRET as string)
        const refreshToken = await createRefreshToken({ id: user[0].id }, process.env.REFRESH_TOKEN_SECRET as string)
        const { password, createdAt, updatedAt, ...data } = user[0]
        res.status(200).json({ success: true, message: 'Login success!', user: data, accessToken, refreshToken })
    } catch (err) {
        next(err)
    }
}

export const getId: functionType = async (req, res, next) => {
    try {
        const { id } = req.params
        const accessToken = req.headers.authorization as string
        const decode = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as decodeType
        if (decode.id.toString() !== id && decode.role !== 'admin') return next({ status: 403, message: "You don't have permission view this!" })
        const user: any = await service.findUser({ id: Number(id) })
        if (user.length === 0) return next({ status: 404, message: 'User not found!' })
        const { password, createdAt, updatedAt, ...data } = user[0]
        res.status(200).json({ success: true, message: 'Get user success!', user: data })
    } catch (err) {
        next(err)
    }
}

export const update: functionType = async (req, res, next) => {
    try {
        const { id } = req.params
        const accessToken = req.headers.authorization as string
        const decode = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as decodeType
        if (decode.id.toString() !== id && decode.role !== 'admin') return next({ status: 403, message: "You don't have permission update this!" })
        const user: any = await service.findUser({ id: Number(id) })
        if (user.length === 0) return next({ status: 404, message: 'User not found!' })
        if (req.body.password !== req.body.retypePassword) return next({ status: 404, message: 'Password do not match!' })
        if (req.body?.password) {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body?.password, salt);
        } else delete req.body.password
        delete req.body.retypePassword
        await service.update({ ...req.body, id })
        res.status(200).json({ success: true, message: 'Update user success!' })
    } catch (err) {
        next(err)
    }
}
export const deleteUser: functionType = async (req, res, next) => {
    try {
        const { id } = req.params
        const accessToken = req.headers.authorization as string
        const decode = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as decodeType
        if (decode.id.toString() !== id && decode.role !== 'admin') return next({ status: 403, message: "You don't have permission delete this!" })
        const user: any = await service.findUser({ id: Number(id) })
        if (user.length === 0) return next({ status: 404, message: 'User not found!' })
        await service.deleteUser(Number(id))
        res.status(200).json({ success: true, message: "Delete user success!" })
    } catch (error) {
        next(error)
    }
}

export const getAll: functionType = async (req, res, next) => {
    try {
        const user: any = await service.findUser({})
        res.status(200).json({ success: true, message: 'Get user success!', user })
    } catch (err) {
        next(err)
    }
}
export const refreshToken: functionType = async (req, res, next) => {
    try {
        const refreshToken: string = req.body.refreshToken
        const decode = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as decodeType
        const accessToken = await createAccessToken({ id: decode.id, role: decode.role }, process.env.ACCESS_TOKEN_SECRET as string)
        res.status(200).json({ success: true, message: 'Refresh access-token success!', accessToken })
    } catch (error) {
        next(error)
    }
}
