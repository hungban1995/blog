import jwt from 'jsonwebtoken'
import { decodeType } from '../helpers/type'

export const verifyToken = (token: string, secretKey: string) => {
    return new Promise((resolve, rejects) => {
        jwt.verify(token, secretKey, (err, decode) => {
            if (err)
                rejects({
                    status: 401,
                    message: err.message
                })
            resolve(decode)
        })
    })
}
