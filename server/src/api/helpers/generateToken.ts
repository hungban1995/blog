import jwt from "jsonwebtoken";

// type functionType = (payload: { id: string }, secretKey: string) ;
//create access token
export const createAccessToken = (payload: { id: number, role: string }, secretKey: string) => {
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
export const createRefreshToken = (payload: { id: number }, secretKey: string) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, {
            expiresIn: "30d"
        }, (err, token) => {
            if (err) reject(err)
            resolve(token)
        });
    })
}