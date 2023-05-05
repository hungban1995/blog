import jwt from 'jsonwebtoken'
import { functionType } from '../helpers/type';

export const verifyAccessToken: functionType = (req, res, next) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
        return {
            status: 401,
            error: "Please login",
        };
    }
    const decode: any = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err, decode) => {
            if (err) {
                return {
                    err: err,
                };
            }
            return decode;
        }
    );
    if (decode.error) {
        if (decode.error.message === "jwt expired") {
            return {
                status: 401,
                error: decode.error.message,
            };
        }
        if (decode.error.message === "jwt not active") {
            return {
                status: 401,
                error: decode.error.message,
            };
        }
        if (decode.error.name === "JsonWebTokenError") {
            return {
                status: 401,
                error: "Invalid authentication",
            };
        }
    }

}