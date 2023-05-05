import jwt from "jsonwebtoken";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string
type payloadType = { id: number }
//create access token
export const createAccessToken = (payload: payloadType) => {
    return jwt.sign(payload, accessTokenSecret, {
        expiresIn: "2d",
    });
};
//create refresh token
export const createRefreshToken = (payload: payloadType) => {
    return jwt.sign(payload, refreshTokenSecret, {
        expiresIn: "30d",
    });
}