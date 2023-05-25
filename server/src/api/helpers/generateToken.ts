import jwt from "jsonwebtoken";

//create access token
export const createAccessToken = (payload: { id: string, role: string }, secretKey: string) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, {
            expiresIn: "2d"
        }, (err, token) => {
            if (err) reject(err)
            resolve(token)
        });
    })
};
//create refresh token
export const createRefreshToken = (payload: { id: string, role: string }, secretKey: string) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, {
            expiresIn: "30d"
        }, (err, token) => {
            if (err) reject(err)
            resolve(token)
        });
    })
}