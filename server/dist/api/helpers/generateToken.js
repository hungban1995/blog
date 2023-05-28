"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//create access token
const createAccessToken = (payload, secretKey) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, secretKey, {
            expiresIn: "2d"
        }, (err, token) => {
            if (err)
                reject(err);
            resolve(token);
        });
    });
};
exports.createAccessToken = createAccessToken;
//create refresh token
const createRefreshToken = (payload, secretKey) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, secretKey, {
            expiresIn: "30d"
        }, (err, token) => {
            if (err)
                reject(err);
            resolve(token);
        });
    });
};
exports.createRefreshToken = createRefreshToken;
